"""
Therattayude Kaal — The World's Most Pointless Scientific Instrument
Backend API powered by FastAPI + YOLOv8
"""

import base64
import json
import os
import uuid
from io import BytesIO
from pathlib import Path

import cv2
import numpy as np
from fastapi import FastAPI, File, HTTPException, Query, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from PIL import Image
from ultralytics import YOLO

from certificate import generate_certificate
from database import get_leaderboard, get_submission, get_total_legs, init_db, save_submission

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
MODEL_PATH = os.environ.get(
    "MODEL_PATH",
    os.path.join(os.path.dirname(__file__), "best.pt")
)
DATA_DIR = os.environ.get("DATA_DIR", os.path.join(os.path.dirname(__file__), "data"))
UPLOAD_DIR = os.path.join(DATA_DIR, "uploads")
ANNOTATED_DIR = os.path.join(DATA_DIR, "annotated")

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(ANNOTATED_DIR, exist_ok=True)

# ---------------------------------------------------------------------------
# App setup
# ---------------------------------------------------------------------------
app = FastAPI(
    title="Therattayude Kaal API",
    description="Department of Absolutely Unnecessary Research — Kerala Division",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Startup
# ---------------------------------------------------------------------------
model: YOLO | None = None


@app.on_event("startup")
def startup():
    global model
    init_db()
    print(f"Loading YOLO model from {MODEL_PATH} ...")
    model = YOLO(MODEL_PATH)
    print("Model loaded. Ready to count legs nobody asked us to count.")


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _run_detection(image_path: str, conf: float = 0.15):
    """Run YOLO inference on an image. Returns (count, confidences, annotated_bgr)."""
    results = model.predict(source=image_path, conf=conf, save=False, verbose=False)
    result = results[0]

    # Count detections
    boxes = result.boxes
    leg_count = len(boxes)
    confidences = [round(float(c), 4) for c in boxes.conf] if leg_count > 0 else []

    # Get annotated image as numpy array (BGR)
    annotated = result.plot()

    return leg_count, confidences, annotated


def _image_to_base64(img_array: np.ndarray, max_width: int | None = None) -> str:
    """Convert a BGR numpy array to base64-encoded PNG."""
    if max_width and img_array.shape[1] > max_width:
        ratio = max_width / img_array.shape[1]
        new_h = int(img_array.shape[0] * ratio)
        img_array = cv2.resize(img_array, (max_width, new_h))
    _, buffer = cv2.imencode(".png", img_array)
    return base64.b64encode(buffer).decode("utf-8")


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@app.post("/detect")
async def detect(file: UploadFile = File(...)):
    """
    Accept an image, run YOLOv8 leg detection, return results.
    This is the moment of truth. The leg count nobody needed.
    """
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded yet. Patience is a virtue.")

    # Generate submission ID
    submission_id = str(uuid.uuid4())

    # Save uploaded image
    ext = Path(file.filename).suffix or ".png"
    image_filename = f"{submission_id}{ext}"
    image_path = os.path.join(UPLOAD_DIR, image_filename)

    contents = await file.read()
    with open(image_path, "wb") as f:
        f.write(contents)

    # Run detection
    leg_count, confidences, annotated = _run_detection(image_path, conf=0.15)

    # Save annotated image
    annotated_filename = f"{submission_id}_annotated.png"
    annotated_path = os.path.join(ANNOTATED_DIR, annotated_filename)
    cv2.imwrite(annotated_path, annotated)

    # Store in database
    timestamp = save_submission(
        submission_id=submission_id,
        leg_count=leg_count,
        image_path=image_path,
        annotated_image_path=annotated_path,
        confidence_scores=confidences,
    )

    # Convert annotated image to base64
    annotated_b64 = _image_to_base64(annotated)

    return {
        "submission_id": submission_id,
        "leg_count": leg_count,
        "confidences": confidences,
        "annotated_image_base64": annotated_b64,
        "timestamp": timestamp,
    }


@app.get("/leaderboard")
def leaderboard():
    """
    The Hall of Legs. Top 20 submissions ranked by sheer leg volume.
    """
    entries = get_leaderboard(limit=20)
    results = []
    for entry in entries:
        # Generate thumbnail from original image
        thumb_b64 = ""
        if os.path.exists(entry["image_path"]):
            img = cv2.imread(entry["image_path"])
            if img is not None:
                thumb_b64 = _image_to_base64(img, max_width=100)

        results.append({
            "submission_id": entry["id"],
            "leg_count": entry["leg_count"],
            "timestamp": entry["timestamp"],
            "thumbnail_base64": thumb_b64,
        })

    total_legs = get_total_legs()

    return {
        "entries": results,
        "total_legs": total_legs,
        "lives_improved": 0,
    }


@app.get("/certificate/{submission_id}")
def certificate(submission_id: str, name: str | None = Query(None)):
    """
    Generate and return an official Certificate of Useless Scientific Achievement.
    """
    submission = get_submission(submission_id)
    if submission is None:
        raise HTTPException(
            status_code=404,
            detail="Submission not found. Perhaps it transcended our database.",
        )

    buffer = generate_certificate(
        submission_id=submission["id"],
        leg_count=submission["leg_count"],
        timestamp=submission["timestamp"],
        annotated_image_path=submission.get("annotated_image_path"),
        recipient_name=name,
    )

    return StreamingResponse(
        buffer,
        media_type="image/png",
        headers={
            "Content-Disposition": f'attachment; filename="certificate_{submission_id[:8]}.png"'
        },
    )


@app.post("/recount/{submission_id}")
def recount(submission_id: str):
    """
    We don't trust our own results either.
    Re-runs detection 3 times at different confidence thresholds for dramatic effect.
    """
    submission = get_submission(submission_id)
    if submission is None:
        raise HTTPException(
            status_code=404,
            detail="Submission not found. The centipede has escaped.",
        )

    if not os.path.exists(submission["image_path"]):
        raise HTTPException(
            status_code=404,
            detail="Original image missing. The specimen has been lost to science.",
        )

    thresholds = [0.12, 0.15, 0.18]
    recount_results = []

    for conf in thresholds:
        count, confs, _ = _run_detection(submission["image_path"], conf=conf)
        recount_results.append({
            "confidence_threshold": conf,
            "leg_count": count,
            "confidences": confs,
        })

    # Democratic consensus: the mode (most common count)
    counts = [r["leg_count"] for r in recount_results]
    consensus = max(set(counts), key=counts.count)

    # Find the dissenting count (if any)
    dissenters = [c for c in counts if c != consensus]

    return {
        "submission_id": submission_id,
        "attempts": recount_results,
        "consensus": consensus,
        "dissenting_counts": list(set(dissenters)),
    }


@app.get("/certificate/{submission_id}")
def get_certificate(submission_id: str):
    """
    Generate and stream the official Neobrutalist diploma of useless scientific achievement.
    """
    submission = get_submission(submission_id)
    if submission is None:
        raise HTTPException(
            status_code=404,
            detail="Submission not found. The centipede has escaped.",
        )

    buf = generate_certificate(
        submission_id=submission_id,
        leg_count=submission["leg_count"],
        timestamp=submission["timestamp"],
        annotated_image_path=submission.get("annotated_image_path"),
    )

    return StreamingResponse(
        buf,
        media_type="image/png",
        headers={
            "Content-Disposition": f'inline; filename="certificate_{submission_id[:8]}.png"',
            "Cache-Control": "no-cache",
        },
    )


@app.get("/")
def root():
    return {
        "name": "Therattayude Kaal API",
        "department": "Department of Absolutely Unnecessary Research — Kerala Division",
        "status": "Operational. Unfortunately.",
        "motto": "Counting what nobody asked us to count since 2026.",
    }
