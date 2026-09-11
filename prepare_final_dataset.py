import os
import shutil
import random
from pathlib import Path

def main():
    src_images_dir = Path(r"D:\USELESS_PROJECT\yolo_dataset\images")
    src_labels_dir = Path(r"D:\USELESS_PROJECT\yolo_dataset\labels")
    out_dir = Path(r"D:\USELESS_PROJECT\final_dataset")

    print(f"Source Images: {src_images_dir}")
    print(f"Source Labels: {src_labels_dir}")
    print(f"Output Dataset: {out_dir}")

    # Supported image extensions
    valid_exts = {".jpg", ".jpeg", ".png", ".bmp", ".webp"}

    # Find all images
    all_images = [f for f in src_images_dir.iterdir() if f.is_file() and f.suffix.lower() in valid_exts]
    print(f"Total raw images found: {len(all_images)}")

    # Find all labels
    all_labels = [f for f in src_labels_dir.iterdir() if f.is_file() and f.suffix.lower() == ".txt"]
    print(f"Total raw labels found: {len(all_labels)}")

    # Match pairs by stem (case-insensitive mapping)
    label_stems = {f.stem.lower(): f for f in all_labels}

    matched_pairs = []
    for img_path in all_images:
        stem = img_path.stem.lower()
        if stem in label_stems:
            matched_pairs.append((img_path, label_stems[stem]))

    print(f"\nMatched Image-Label Pairs: {len(matched_pairs)}")

    # Shuffle and split 80% train, 20% val
    random.seed(42)
    random.shuffle(matched_pairs)

    split_idx = int(0.8 * len(matched_pairs))
    train_pairs = matched_pairs[:split_idx]
    val_pairs = matched_pairs[split_idx:]

    print(f"Split Count: {len(train_pairs)} Train (80%), {len(val_pairs)} Val (20%)")

    # Clean / recreate final_dataset directory
    if out_dir.exists():
        shutil.rmtree(out_dir)

    for split in ["train", "val"]:
        (out_dir / "images" / split).mkdir(parents=True, exist_ok=True)
        (out_dir / "labels" / split).mkdir(parents=True, exist_ok=True)

    def process_and_copy(pairs, split_name):
        total_boxes = 0
        for img_path, lbl_path in pairs:
            # Copy image
            dest_img = out_dir / "images" / split_name / img_path.name
            shutil.copy2(img_path, dest_img)

            # Normalize labels to class 0
            dest_lbl = out_dir / "labels" / split_name / f"{img_path.stem}.txt"
            normalized_lines = []

            with open(lbl_path, "r", encoding="utf-8", errors="ignore") as f:
                for line in f:
                    parts = line.strip().split()
                    if len(parts) >= 5:
                        # parts: class_id, x_center, y_center, width, height
                        # Normalize class to 0
                        coords = parts[1:5]
                        normalized_lines.append(f"0 {' '.join(coords)}\n")
                        total_boxes += 1

            with open(dest_lbl, "w", encoding="utf-8") as f:
                f.writelines(normalized_lines)

        return total_boxes

    train_boxes = process_and_copy(train_pairs, "train")
    val_boxes = process_and_copy(val_pairs, "val")

    print(f"\nProcessing Complete:")
    print(f" - Train images: {len(train_pairs)}, annotations: {train_boxes}")
    print(f" - Val images:   {len(val_pairs)}, annotations: {val_boxes}")
    print(f" - Total annotations: {train_boxes + val_boxes}")

    # Generate data.yaml
    yaml_content = f"""path: D:/USELESS_PROJECT/final_dataset
train: images/train
val: images/val
nc: 1
names:
  0: leg
"""
    yaml_path = out_dir / "data.yaml"
    with open(yaml_path, "w", encoding="utf-8") as f:
        f.write(yaml_content)
    print(f"\nGenerated data.yaml at {yaml_path}")

if __name__ == "__main__":
    main()
