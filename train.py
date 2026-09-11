import os
import sys
from pathlib import Path
import torch

def main():
    print("=" * 65)
    print(" YOLOv8 Centipede Leg Detection Training")
    print("=" * 65)

    # 1. Verify CUDA & Device
    print(f"PyTorch Version: {torch.__version__}")
    cuda_available = torch.cuda.is_available()
    print(f"CUDA Available:  {cuda_available}")

    if not cuda_available:
        print("\n[WARNING] CUDA is not available. Training will be extremely slow on CPU!")
        device = "cpu"
    else:
        device = 0
        gpu_name = torch.cuda.get_device_name(0)
        gpu_mem = torch.cuda.get_device_properties(0).total_memory / (1024 ** 3)
        print(f"GPU Device 0:    {gpu_name} ({gpu_mem:.1f} GB VRAM)")

    # 2. Verify data.yaml
    data_yaml = Path(r"D:\USELESS_PROJECT\data.yaml").resolve()
    if not data_yaml.exists():
        # Check dataset folder
        alt_yaml = Path(r"D:\USELESS_PROJECT\dataset\data.yaml").resolve()
        if alt_yaml.exists():
            data_yaml = alt_yaml
        else:
            print(f"\n[ERROR] data.yaml not found at {data_yaml}!")
            print("Please run 'prepare_dataset.py' first to prepare the dataset.")
            sys.exit(1)

    print(f"Dataset YAML:    {data_yaml}")

    # 3. Import Ultralytics
    try:
        from ultralytics import YOLO
    except ImportError:
        print("\n[ERROR] Ultralytics YOLO is not installed.")
        print("Run: py -3.11 -m pip install ultralytics")
        sys.exit(1)

    # 4. Initialize YOLOv8n (nano detection model)
    print("\nLoading pre-trained YOLOv8n backbone...")
    model = YOLO("yolov8n.pt")

    # 5. Training Hyperparameters as requested:
    # 100 epochs, image size 640, batch size 16, GPU device 0
    project_dir = Path(r"D:\USELESS_PROJECT\runs\detect").resolve()
    experiment_name = "centipede_legs"

    print("\nStarting training with configuration:")
    print(f" - Model:       yolov8n.pt")
    print(f" - Epochs:      150")
    print(f" - Image Size:  640")
    print(f" - Batch Size:  16")
    print(f" - Device:      {device}")
    print(f" - Patience:    30")
    print(f" - Workers:     2 (Windows optimized)")
    print(f" - Output Dir:  {project_dir / experiment_name}")
    print("=" * 65 + "\n")

    results = model.train(
        data=str(data_yaml),
        epochs=150,
        imgsz=640,
        batch=16,
        patience=30,
        device=device,
        workers=2,
        project=str(project_dir),
        name=experiment_name,
        exist_ok=True,
        save=True,
        verbose=True,
    )

    # 6. Locate final weights
    weights_dir = project_dir / experiment_name / "weights"
    best_pt = weights_dir / "best.pt"
    last_pt = weights_dir / "last.pt"

    print("\n" + "=" * 65)
    print(" TRAINING COMPLETED SUCCESSFULLY!")
    print("=" * 65)
    if best_pt.exists():
        print(f"\n>>> BEST WEIGHTS FILE FOUND AT:\n    {best_pt}\n")
    else:
        print(f"\n>>> Weights directory:\n    {weights_dir}\n")

    if last_pt.exists():
        print(f">>> Last checkpoint weights:\n    {last_pt}\n")

    print(f"Training curves, confusion matrices & results saved in:")
    print(f"    {project_dir / experiment_name}")
    print("=" * 65)

if __name__ == "__main__":
    main()
