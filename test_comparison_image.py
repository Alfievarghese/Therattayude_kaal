from ultralytics import YOLO

def main():
    image = 'D:/USELESS_PROJECT/test_centipede.png'

    old = YOLO('D:/USELESS_PROJECT/runs/detect/centipede_legs/weights/best.pt')
    new = YOLO('D:/USELESS_PROJECT/runs/detect/centipede_legs_v8s/weights/best.pt')

    for conf in [0.15, 0.25]:
        old_count = len(old.predict(image, conf=conf, verbose=False)[0].boxes)
        new_count = len(new.predict(image, conf=conf, verbose=False)[0].boxes)
        print(f"conf={conf} | v8n: {old_count} legs | v8s: {new_count} legs")

    new.predict(image, conf=0.15, save=True,
        project='D:/USELESS_PROJECT/runs/detect',
        name='test_v8s', exist_ok=True)
    print("Annotated image saved")

if __name__ == '__main__':
    main()
