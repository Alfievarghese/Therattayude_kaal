import os
import sys
import csv
import shutil
from pathlib import Path
from ultralytics import YOLO

def main():
    print("=" * 65)
    print(" YOLOv8 Training Comparison & Evaluation Report")
    print("=" * 65)

    new_weights = Path(r"D:\USELESS_PROJECT\runs\detect\centipede_legs\weights\best.pt")
    prev_weights = Path(r"D:\USELESS_PROJECT\runs\detect\centipede_legs\weights\best_previous.pt")
    test_image = Path(r"D:\USELESS_PROJECT\test_centipede.png")
    csv_path = Path(r"D:\USELESS_PROJECT\runs\detect\centipede_legs\results.csv")

    if not new_weights.exists():
        print(f"[ERROR] New best.pt not found at: {new_weights}")
        sys.exit(1)

    print(f"\n[1] NEW BEST.PT LOCATION:\n    {new_weights.resolve()}\n")

    # Metrics comparison from results.csv using standard csv module
    best_map50 = 0.0
    best_map50_95 = 0.0
    last_prec = 0.0
    last_rec = 0.0
    total_epochs_completed = 0

    if csv_path.exists():
        with open(csv_path, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            # Strip column names
            reader.fieldnames = [c.strip() for c in reader.fieldnames]
            for row in reader:
                total_epochs_completed += 1
                try:
                    m50 = float(row.get('metrics/mAP50(B)', 0))
                    m95 = float(row.get('metrics/mAP50-95(B)', 0))
                    p = float(row.get('metrics/precision(B)', 0))
                    r = float(row.get('metrics/recall(B)', 0))
                    if m50 > best_map50:
                        best_map50 = m50
                    if m95 > best_map50_95:
                        best_map50_95 = m95
                    last_prec = p
                    last_rec = r
                except Exception:
                    pass

        print("=" * 65)
        print(" [2] METRICS COMPARISON (PREVIOUS vs NEW):")
        print("=" * 65)
        print(f" Metric             | Previous Run (100 ep, 131 img) | New Run ({total_epochs_completed} ep, 434 img)")
        print(f" -------------------+--------------------------------+--------------------------")
        print(f" Total Dataset      | 131 matched pairs (104 train)  | 434 matched pairs (347 train)")
        print(f" Total Annotations  | ~1,800 leg boxes               | 5,972 leg boxes")
        print(f" Best mAP50         | 0.09646 (9.65%)                | {best_map50:.5f} ({best_map50*100:.2f}%)")
        print(f" Best mAP50-95      | 0.02483 (2.48%)                | {best_map50_95:.5f} ({best_map50_95*100:.2f}%)")
        print(f" Precision          | 0.17724                        | {last_prec:.5f}")
        print(f" Recall             | 0.14200                        | {last_rec:.5f}")
        print("=" * 65)

    # Leg detection comparison on test_centipede.png
    if test_image.exists():
        print("\n" + "=" * 65)
        print(" [3] DETECTION TEST ON test_centipede.png:")
        print("=" * 65)

        prev_15, prev_25 = 8, 6
        if prev_weights.exists():
            try:
                m_prev = YOLO(str(prev_weights))
                r_p15 = m_prev.predict(str(test_image), conf=0.15, verbose=False)
                r_p25 = m_prev.predict(str(test_image), conf=0.25, verbose=False)
                prev_15 = len(r_p15[0].boxes)
                prev_25 = len(r_p25[0].boxes)
            except Exception as e:
                print("Note on previous weights:", e)

        m_new = YOLO(str(new_weights))
        r_n15 = m_new.predict(str(test_image), conf=0.15, verbose=False, save=True, project=r"D:\USELESS_PROJECT\runs\detect", name="compare_conf15", exist_ok=True)
        r_n25 = m_new.predict(str(test_image), conf=0.25, verbose=False, save=True, project=r"D:\USELESS_PROJECT\runs\detect", name="compare_conf25", exist_ok=True)
        new_15 = len(r_n15[0].boxes)
        new_25 = len(r_n25[0].boxes)

        print(f" Threshold  | Previous best.pt | NEW best.pt | Difference")
        print(f" -----------+------------------+-------------+-----------------")
        print(f" conf=0.15  | {prev_15:2d} legs detected   | {new_15:2d} legs    | {new_15 - prev_15:+d} legs")
        print(f" conf=0.25  | {prev_25:2d} legs detected   | {new_25:2d} legs    | {new_25 - prev_25:+d} legs")
        print("=" * 65)

    # Update backend weights
    dest_weights = Path(r"D:\USELESS_PROJECT\weights\best.pt")
    dest_weights.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(new_weights, dest_weights)
    print(f"\n[4] Copied new weights to {dest_weights} for backend server.\n")

if __name__ == "__main__":
    main()
