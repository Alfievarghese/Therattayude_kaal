from ultralytics import YOLO

def main():
    model_path = 'D:/USELESS_PROJECT/runs/detect/centipede_legs_v8s_final/weights/best.pt'
    print(f"Loading final trained model from: {model_path}")
    model = YOLO(model_path)

    # Validation metrics
    print("\n--- Validation on final_dataset ---")
    metrics = model.val(data='D:/USELESS_PROJECT/final_dataset/data.yaml', verbose=False)
    print(f"mAP50:     {metrics.box.map50:.4f}")
    print(f"mAP50-95:  {metrics.box.map:.4f}")
    print(f"Precision: {metrics.box.p[0]:.4f}")
    print(f"Recall:    {metrics.box.r[0]:.4f}")

    # Test image
    image = 'D:/USELESS_PROJECT/test_centipede.png'
    print(f"\n--- Testing on test_centipede.png ---")
    for conf in [0.15, 0.25]:
        res = model.predict(image, conf=conf, verbose=False)[0]
        print(f"conf={conf} | Detected: {len(res.boxes)} legs")

    # Save visualization
    model.predict(image, conf=0.15, save=True,
                  project='D:/USELESS_PROJECT/runs/detect',
                  name='test_v8s_final', exist_ok=True)
    print("\nAnnotated verification image saved to: D:/USELESS_PROJECT/runs/detect/test_v8s_final")

if __name__ == '__main__':
    main()
