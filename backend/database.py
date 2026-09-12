import sqlite3
import json
import os
from datetime import datetime, timezone
DATA_DIR = os.environ.get("DATA_DIR", os.path.join(os.path.dirname(__file__), "data"))
os.makedirs(DATA_DIR, exist_ok=True)
DB_PATH = os.path.join(DATA_DIR, "therattayude_kaal.db")

# Migrate existing local database if present and destination doesn't exist
_old_db = os.path.join(os.path.dirname(__file__), "therattayude_kaal.db")
if os.path.exists(_old_db) and not os.path.exists(DB_PATH) and _old_db != DB_PATH:
    import shutil
    try:
        shutil.copy2(_old_db, DB_PATH)
    except Exception:
        pass


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Create the submissions table if it doesn't exist."""
    conn = get_connection()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS submissions (
            id TEXT PRIMARY KEY,
            timestamp TEXT NOT NULL,
            leg_count INTEGER NOT NULL,
            image_path TEXT NOT NULL,
            annotated_image_path TEXT NOT NULL,
            confidence_scores TEXT NOT NULL DEFAULT '[]'
        )
    """)
    conn.commit()
    conn.close()


def save_submission(
    submission_id: str,
    leg_count: int,
    image_path: str,
    annotated_image_path: str,
    confidence_scores: list[float],
):
    """Save a new submission to the database."""
    conn = get_connection()
    timestamp = datetime.now(timezone.utc).isoformat()
    conn.execute(
        """
        INSERT INTO submissions (id, timestamp, leg_count, image_path, annotated_image_path, confidence_scores)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            submission_id,
            timestamp,
            leg_count,
            image_path,
            annotated_image_path,
            json.dumps(confidence_scores),
        ),
    )
    conn.commit()
    conn.close()
    return timestamp


def get_submission(submission_id: str) -> dict | None:
    """Get a single submission by ID."""
    conn = get_connection()
    row = conn.execute(
        "SELECT * FROM submissions WHERE id = ?", (submission_id,)
    ).fetchone()
    conn.close()
    if row is None:
        return None
    return dict(row)


def get_leaderboard(limit: int = 20) -> list[dict]:
    """Get top submissions sorted by leg count descending."""
    conn = get_connection()
    rows = conn.execute(
        "SELECT * FROM submissions ORDER BY leg_count DESC, timestamp ASC LIMIT ?",
        (limit,),
    ).fetchall()
    conn.close()
    return [dict(r) for r in rows]


def get_total_legs() -> int:
    """Get the sum of all legs ever counted."""
    conn = get_connection()
    result = conn.execute(
        "SELECT COALESCE(SUM(leg_count), 0) as total FROM submissions"
    ).fetchone()
    conn.close()
    return int(result["total"]) if result else 0


def clear_leaderboard() -> None:
    """Clear all submissions and purge the archive."""
    conn = get_connection()
    conn.execute("DELETE FROM submissions")
    conn.commit()
    conn.execute("VACUUM")
    conn.commit()
    conn.close()

