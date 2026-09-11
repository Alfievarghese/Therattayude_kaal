from ultralytics import YOLO

def main():
    print("=== YOLOv8n (old) ===")
    old = YOLO('D:/USELESS_PROJECT/runs/detect/centipede_legs/weights/best.pt')
    old_metrics = old.val(data='D:/USELESS_PROJECT/dataset/data.yaml', verbose=False)
    print(f"mAP50: {old_metrics.box.map50:.3f}")
    print(f"mAP50-95: {old_metrics.box.map:.3f}")

    print("\n=== YOLOv8s (new) ===")
    new = YOLO('D:/USELESS_PROJECT/runs/detect/centipede_legs_v8s/weights/best.pt')
    new_metrics = new.val(data='D:/USELESS_PROJECT/dataset/data.yaml', verbose=False)
    print(f"mAP50: {new_metrics.box.map50:.3f}")
    print(f"mAP50-95: {new_metrics.box.map:.3f}")

if __name__ == '__main__':
    main()
