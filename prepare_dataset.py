import os
import sys
import shutil
import random
import argparse
from pathlib import Path

# Supported image extensions
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".webp", ".tif", ".tiff"}

def parse_args():
    parser = argparse.ArgumentParser(
        description="Match images with YOLO labels, split into train/val, and generate data.yaml"
    )
    parser.add_argument(
        "--images-dir",
        type=str,
        default=r"D:\USELESS_PROJECT\yolo_dataset\images",
        help="Path to folder containing images"
    )
    parser.add_argument(
        "--labels-dir",
        type=str,
        default=r"D:\USELESS_PROJECT\yolo_dataset\labels",
        help="Path to folder containing YOLO .txt annotations"
    )
    parser.add_argument(
        "--output-dir",
        type=str,
        default=r"D:\USELESS_PROJECT\dataset",
        help="Destination directory for organized YOLO dataset"
    )
    parser.add_argument(
        "--train-ratio",
        type=float,
        default=0.8,
        help="Ratio of data for training (default: 0.8 for 80%% train, 20%% val)"
    )
    parser.add_argument(
        "--seed",
        type=int,
        default=42,
        help="Random seed for reproducible train/val split"
    )
    parser.add_argument(
        "--class-name",
        type=str,
        default="leg",
        help="Name of the detected class (default: 'leg')"
    )
    parser.add_argument(
        "--normalize-to-single-class",
        action="store_true",
        default=True,
        help="Map all annotations to class ID 0 (useful if AnyLabeling generated multiple class IDs like ']' and 'leg')"
    )
    return parser.parse_args()

def process_label_content(txt_path: Path, normalize: bool = True) -> str:
    """Reads label file and optionally normalizes all class IDs to 0."""
    if not txt_path.exists() or txt_path.stat().st_size == 0:
        return ""
    
    with open(txt_path, "r", encoding="utf-8", errors="ignore") as f:
        lines = f.read().splitlines()
    
    processed_lines = []
    for line in lines:
        line = line.strip()
        if not line:
            continue
        parts = line.split()
        if len(parts) >= 5:
            if normalize:
                # Force class index to 0
                parts[0] = "0"
            processed_lines.append(" ".join(parts))
            
    return "\n".join(processed_lines) + ("\n" if processed_lines else "")

def main():
    args = parse_args()
    images_dir = Path(args.images_dir).resolve()
    labels_dir = Path(args.labels_dir).resolve()
    output_dir = Path(args.output_dir).resolve()

    print("=" * 60)
    print(" YOLOv8 Dataset Preparation & Split Pipeline")
    print("=" * 60)
    print(f"Images Directory: {images_dir}")
    print(f"Labels Directory: {labels_dir}")
    print(f"Output Directory: {output_dir}")
    print(f"Train / Val Split: {int(args.train_ratio * 100)}% / {int((1 - args.train_ratio) * 100)}%")
    print(f"Random Seed:      {args.seed}")
    print(f"Target Class:     0: {args.class_name}")

    if not images_dir.exists():
        print(f"Error: Images directory does not exist: {images_dir}")
        sys.exit(1)
    if not labels_dir.exists():
        print(f"Error: Labels directory does not exist: {labels_dir}")
        sys.exit(1)

    # Gather all image files
    all_images = {}
    for f in images_dir.iterdir():
        if f.is_file() and f.suffix.lower() in IMAGE_EXTENSIONS:
            all_images[f.stem] = f

    # Gather all label files
    all_labels = {}
    for f in labels_dir.iterdir():
        if f.is_file() and f.suffix.lower() == ".txt":
            all_labels[f.stem] = f

    print(f"\nFound {len(all_images)} total images.")
    print(f"Found {len(all_labels)} total label (.txt) files.")

    # Find matched pairs
    matched_stems = sorted(list(set(all_images.keys()) & set(all_labels.keys())))
    unmatched_images = set(all_images.keys()) - set(all_labels.keys())
    unmatched_labels = set(all_labels.keys()) - set(all_images.keys())

    print(f"Matched Image-Label pairs: {len(matched_stems)}")
    if unmatched_images:
        print(f"Images without labels (skipped): {len(unmatched_images)}")
    if unmatched_labels:
        print(f"Labels without images (skipped): {len(unmatched_labels)}")

    if not matched_stems:
        print("Error: No matching image-label pairs found! Please verify file names.")
        sys.exit(1)

    # Shuffle with fixed seed
    random.seed(args.seed)
    random.shuffle(matched_stems)

    # Train / Val Split
    n_total = len(matched_stems)
    n_train = int(n_total * args.train_ratio)
    train_stems = matched_stems[:n_train]
    val_stems = matched_stems[n_train:]

    print(f"\nSplit distribution:")
    print(f" - Train set: {len(train_stems)} samples ({len(train_stems)/n_total*100:.1f}%)")
    print(f" - Val set:   {len(val_stems)} samples ({len(val_stems)/n_total*100:.1f}%)")

    # Prepare directory layout
    dirs = {
        "train_img": output_dir / "images" / "train",
        "val_img": output_dir / "images" / "val",
        "train_lbl": output_dir / "labels" / "train",
        "val_lbl": output_dir / "labels" / "val",
    }
    for d in dirs.values():
        d.mkdir(parents=True, exist_ok=True)

    # Copy files
    def copy_subset(stems, img_dest, lbl_dest, subset_name):
        print(f"Writing {subset_name} files...")
        box_count = 0
        for stem in stems:
            # Copy Image
            src_img = all_images[stem]
            dest_img = img_dest / src_img.name
            shutil.copy2(src_img, dest_img)

            # Process & Write Label
            src_lbl = all_labels[stem]
            dest_lbl = lbl_dest / f"{stem}.txt"
            content = process_label_content(src_lbl, normalize=args.normalize_to_single_class)
            with open(dest_lbl, "w", encoding="utf-8") as out_f:
                out_f.write(content)
            
            if content.strip():
                box_count += len(content.strip().splitlines())
        print(f" - Copied {len(stems)} images and labels ({box_count} total leg bounding boxes in {subset_name}).")
        return box_count

    total_train_boxes = copy_subset(train_stems, dirs["train_img"], dirs["train_lbl"], "train")
    total_val_boxes = copy_subset(val_stems, dirs["val_img"], dirs["val_lbl"], "val")

    # Generate data.yaml
    yaml_content = f"""# Centipede Leg Detection YOLOv8 Dataset Configuration
path: {output_dir.as_posix()}  # Dataset root dir
train: images/train            # Train images (relative to 'path')
val: images/val                # Val images (relative to 'path')

# Classes
nc: 1
names:
  0: {args.class_name}
"""
    dataset_yaml_path = output_dir / "data.yaml"
    with open(dataset_yaml_path, "w", encoding="utf-8") as yf:
        yf.write(yaml_content)

    # Also save a copy in the workspace root
    root_yaml_path = Path(r"D:\USELESS_PROJECT\data.yaml")
    with open(root_yaml_path, "w", encoding="utf-8") as yf:
        yf.write(yaml_content)

    print("\n" + "=" * 60)
    print(" SUCCESS: Dataset preparation complete!")
    print("=" * 60)
    print(f"YOLO Dataset Path: {output_dir}")
    print(f"data.yaml Path:    {dataset_yaml_path}")
    print(f"Root data.yaml:    {root_yaml_path}")
    print(f"Total Bounding Boxes: {total_train_boxes + total_val_boxes} ({total_train_boxes} train, {total_val_boxes} val)")
    print("\ndata.yaml contents:")
    print("-" * 30)
    print(yaml_content.strip())
    print("-" * 30)

if __name__ == "__main__":
    main()
