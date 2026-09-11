from ultralytics import YOLO

def main():
    model = YOLO('yolov8s.pt')

    results = model.train(
        data='D:/USELESS_PROJECT/final_dataset/data.yaml',
        epochs=150,
        imgsz=640,
        batch=8,
        device=0,
        patience=30,
        project='D:/USELESS_PROJECT/runs/detect',
        name='centipede_legs_v8s_final',
        optimizer='AdamW',
        lr0=0.001,
        augment=True,
        flipud=0.3,
        fliplr=0.5,
        mosaic=1.0,
        workers=2,
        exist_ok=True,
    )

if __name__ == '__main__':
    main()
