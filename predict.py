import sys
import argparse
from pathlib import Path

def parse_args():
    parser = argparse.ArgumentParser(description="Test trained YOLOv8 centipede leg detection model")
    parser.add_argument(
        "--source",
        type=str,
        default=r"D:\USELESS_PROJECT\dataset\images\val",
        help="Path to an image or directory of images to test"
    )
    parser.add_argument(
        "--weights",
        type=str,
        default=r"D:\USELESS_PROJECT\runs\detect\centipede_legs\weights\best.pt",
        help="Path to best.pt weights"
    )
    parser.add_argument(
        "--conf",
        type=float,
        default=0.25,
        help="Confidence threshold (default: 0.25)"
    )
    parser.add_argument(
        "--save",
        action="store_true",
        default=True,
        help="Save annotated prediction images"
    )
    return parser.parse_args()

def main():
    args = parse_args()
    weights_path = Path(args.weights).resolve()
    if not weights_path.exists():
        print(f"Error: Weights file not found: {weights_path}")
        print("Please ensure training has completed and generated 'best.pt'.")
        sys.exit(1)

    from ultralytics import YOLO

    print(f"Loading weights from: {weights_path}")
    model = YOLO(str(weights_path))

    print(f"Running inference on: {args.source}")
    results = model.predict(
        source=args.source,
        conf=args.conf,
        save=args.save,
        project=r"D:\USELESS_PROJECT\runs\detect",
        name="predict_legs",
        exist_ok=True
    )

    print(f"\nInference complete! Results saved in: D:\\USELESS_PROJECT\\runs\\detect\\predict_legs")

if __name__ == "__main__":
    main()
