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
from fastapi import FastAPI, File, HTTPException, Query, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from PIL import Image
from ultralytics import YOLO

from certificate import generate_certificate
from database import (
    clear_leaderboard,
    get_leaderboard,
    get_submission,
    get_total_legs,
    init_db,
    save_submission,
)

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


@app.post("/clear-leaderboard")
@app.delete("/leaderboard")
def clear_leaderboard_endpoint():
    """
    Clear all specimens from the archive.
    """
    clear_leaderboard()
    return {
        "status": "cleared",
        "entries": [],
        "total_legs": 0,
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


STATIC_DIR = os.environ.get("STATIC_DIR", os.path.join(os.path.dirname(__file__), "static"))

if os.path.isdir(STATIC_DIR) and os.path.exists(os.path.join(STATIC_DIR, "index.html")):
    assets_dir = os.path.join(STATIC_DIR, "assets")
    if os.path.isdir(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/")
    def serve_index():
        return FileResponse(os.path.join(STATIC_DIR, "index.html"))

    @app.get("/{full_path:path}")
    def serve_spa(full_path: str):
        file_path = os.path.join(STATIC_DIR, full_path)
        if full_path and os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(STATIC_DIR, "index.html"))
else:
    @app.get("/")
    def root(request: Request):
        accept = request.headers.get("accept", "")
        if "text/html" in accept:
            html_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Therattayude Kaal // API Gateway</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; background: #0c0d0e; color: #fff; padding: 40px 20px; line-height: 1.6; max-width: 750px; margin: 0 auto; }
        .card { border: 3px solid #00ff66; padding: 30px; box-shadow: 8px 8px 0px #00ff66; background: #141619; border-radius: 4px; }
        h1 { color: #fff; margin-top: 10px; font-size: 1.8rem; font-weight: 900; letter-spacing: -0.5px; }
        .tag { display: inline-block; background: #ff0055; color: white; padding: 4px 10px; font-weight: 800; font-size: 0.8rem; letter-spacing: 1px; }
        .box { background: #1b1e22; border-left: 5px solid #00e5ff; padding: 18px; margin: 24px 0; color: #e0e0e0; }
        code { background: #000; padding: 3px 8px; color: #00ff66; border-radius: 4px; font-family: monospace; font-size: 1rem; border: 1px solid #333; }
        .links a { color: #00e5ff; text-decoration: none; font-weight: bold; margin-right: 20px; border-bottom: 2px solid #00e5ff; }
        .links a:hover { color: #fff; border-color: #fff; }
    </style>
</head>
<body>
    <div class="card">
        <span class="tag">FASTAPI BACKEND GATEWAY // PORT 8000</span>
        <h1>🐛 തേരട്ടയുടെ കാൽ — Therattayude Kaal API</h1>
        <p style="color: #888; font-size: 0.95rem; margin-bottom: 20px;">Department of Absolutely Unnecessary Research — Kerala Division</p>
        
        <div class="box">
            <h3 style="margin-top: 0; color: #00e5ff;">⚠️ Notice for Browser Visitors</h3>
            <p>You have connected directly to the <strong>Backend AI API (Port 8000)</strong> instead of the <strong>Frontend Web Application (Port 80)</strong>.</p>
            
            <p><strong>To view the full interactive website:</strong></p>
            <ul>
                <li>If using <strong>Tailscale Funnel</strong> on your VPS, switch your funnel from port 8000 to port 80:
                    <br><br><code>tailscale funnel 80</code> (or <code>tailscale serve 80</code>)<br><br>
                </li>
                <li>Or visit your VPS IP address directly on Port 80.</li>
            </ul>
        </div>

        <div class="links">
            <a href="/docs">Interactive API Docs (/docs)</a>
            <a href="/leaderboard">View Leaderboard API (/leaderboard)</a>
        </div>
    </div>
</body>
</html>"""
            return HTMLResponse(content=html_content)

        return {
            "name": "Therattayude Kaal API",
            "department": "Department of Absolutely Unnecessary Research — Kerala Division",
            "status": "Operational. Unfortunately.",
            "motto": "Counting what nobody asked us to count since 2026.",
            "notice": "Interactive UI is hosted on Port 80. If using Tailscale Funnel, run 'tailscale funnel 80'."
        }
