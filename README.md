# 🐛 തേരട്ടയുടെ കാൽ — Therattayude Kaal
### *The World's Most Pointless Computer Vision Instrument*
#### **Department of Absolutely Unnecessary Research — Kerala Division**

[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![YOLOv8s](https://img.shields.io/badge/YOLOv8s-0.311%20mAP50-00FFFF?logo=ultralytics)](https://github.com/ultralytics/ultralytics)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-CSS%20v4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

## 📖 About / വിവരണം

### English
Have you ever stared at a centipede (തേരട്ട) crawling across your veranda and thought: *"I desperately need an AI-powered, multi-stage deep learning pipeline to count every single individual leg on this creature, certify its anatomical redundancy, and issue an official governmental certificate?"* 

Neither did anyone else. But we built it anyway.

**Therattayude Kaal** is a full-stack, neo-brutalist computer vision platform trained on YOLOv8 to detect, count, and classify each individual centipede leg with pinpoint precision. It features an over-engineered Preloader, automated Leg Count Consensus, real-time Recount engine, Global Leaderboard of shameful centipedes, and generates high-resolution, legally meaningless Diplomas signed by *Dr. Kaalu Vettichu* and *Prof. Mandi Masala*.

### മലയാളം
നിങ്ങളുടെ വീടിന്റെ വരാന്തയിലൂടെ ഇഴഞ്ഞുനീങ്ങുന്ന തേരട്ടയെ കണ്ട്, *"ഈ ജീവിയുടെ ഓരോ കാലും കൃത്യമായി എണ്ണി തിട്ടപ്പെടുത്താൻ എനിക്ക് ആർട്ടിഫിഷ്യൽ ഇന്റലിജൻസും ഡീപ് ലേണിംഗും വേണം"* എന്ന് എപ്പോഴെങ്കിലും ചിന്തിച്ചിട്ടുണ്ടോ? 

ഇതുവരെ ആരും അങ്ങനെ ചിന്തിച്ചിട്ടില്ല. എങ്കിലും കേരള ശാസ്ത്ര ഗവേഷണ കൗൺസിലിന്റെ പേരിൽ ഞങ്ങൾ ഈ വിപ്ലവകരമായ വെബ്സൈറ്റ് ഉണ്ടാക്കി!

നിങ്ങൾ അപ്‌ലോഡ് ചെയ്യുന്ന തേരട്ടയുടെ ഫോട്ടോയിൽ നിന്ന് YOLOv8 മോഡൽ ഓരോ കാലുകളെയും കണ്ടെത്തി കൃത്യമായി എണ്ണുന്നു. കൂടാതെ, ഡോക്ടർ കാലുവെട്ടിച്ചും പ്രൊഫസർ മന്തി മസാലയും ഒപ്പിട്ട ഔദ്യോഗിക സർട്ടിഫിക്കറ്റും ഡൗൺലോഡ് ചെയ്യാം!
 
 ---
 
## 🧠 Model Benchmarks & Comparison
 
| Metric | Baseline (YOLOv8n) | Upgraded (YOLOv8s) | Improvement |
| :--- | :--- | :--- | :--- |
| **Architecture** | YOLOv8 Nano (`3.0M` params) | YOLOv8 Small (`11.1M` params) | +270% capacity |
| **mAP50** | `0.145` (14.5%) | **`0.311` (31.1%)** | **+114.5% (Over 2x)** |
| **mAP50-95** | `0.037` (3.7%) | **`0.114` (11.4%)** | **+208.1% (Over 3x)** |
| **Precision (P)** | `0.254` | **`0.431`** | **+69.7%** |
| **Recall (R)** | `0.225` | **`0.367`** | **+63.1%** |
| **Inference (RTX 4050)** | `5.7ms` | `10.2ms` | Real-time |
| **Inference (CPU)** | `~25ms` | `~55ms` | Instantaneous |
 
---


## 🛠️ Architecture

```
                               ┌────────────────────────┐
                               │     Browser Client     │
                               │  (Vite + React + Nginx)│
                               └───────────┬────────────┘
                                           │ Port 80
                                           ▼
┌────────────────────────────────────────────────────────────────────────┐
│ VPS Host (Docker Compose)                                              │
│                                                                        │
│   ┌────────────────────────┐          ┌────────────────────────────┐   │
│   │  Frontend (Nginx)      │          │   Backend (FastAPI)        │   │
│   │  - Port 80:80          │          │   - Port 8000:8000         │   │
│   │  - SPA Routing         │          │   - YOLOv8 Inference (CPU) │   │
│   │  - Gzip Compressed     │          │   - PIL Certificate Engine │   │
│   └────────────────────────┘          │   - SQLite Persistence     │   │
│                                       └─────────────┬──────────────┘   │
│                                                     │                  │
│                                       ┌─────────────▼──────────────┐   │
│                                       │   Named Docker Volume      │   │
│                                       │   therattayude_kaal_data   │   │
│                                       │   (DB + Uploads + Images)  │   │
│                                       └────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start for VPS Deployment

### 1. Prerequisites
Ensure the VPS has Docker and Docker Compose installed:
```bash
# Check Docker installation
docker --version
docker compose version
```

### 2. Clone the Repository
```bash
git clone https://github.com/AlfieVarghese/USELESS_PROJECT_3.0.git
cd USELESS_PROJECT_3.0
```

### 3. Configure Environment
Create a `.env` file from the provided example:
```bash
cp .env.example .env
```
Edit `.env` and set your VPS public IP or domain:
```env
VITE_API_URL=http://YOUR_VPS_IP:8000
```
*(Example: `VITE_API_URL=http://139.59.80.12:8000`)*

### 4. Build and Launch Containers
```bash
docker compose up -d --build
```

### 5. Access the Application
Open your browser and navigate to:
```
http://YOUR_VPS_IP
```
- **Web UI:** `http://YOUR_VPS_IP` (Port 80)
- **FastAPI Interactive Docs (Swagger):** `http://YOUR_VPS_IP:8000/docs`

> [!TIP]
> **Using Tailscale Funnel or Cloudflare Tunnel?**
> If exposing your VPS through Tailscale Funnel (e.g., `https://your-node.ts.net`) or a single domain tunnel, forward **Port 80**:
> ```bash
> tailscale funnel 80
> ```
> Port 80 (Nginx) serves the interactive React frontend AND automatically reverse-proxies all API calls (`/detect`, `/leaderboard`, `/certificate`, `/recount`) directly to the backend under that single URL with zero CORS issues!

---

## 🧰 Useful Docker Commands

| Action | Command |
| :--- | :--- |
| **Check container status** | `docker compose ps` |
| **View real-time logs** | `docker compose logs -f` |
| **View backend logs only** | `docker compose logs -f backend` |
| **View frontend logs only** | `docker compose logs -f frontend` |
| **Restart services** | `docker compose restart` |
| **Stop services** | `docker compose down` |
| **Rebuild without cache** | `docker compose build --no-cache && docker compose up -d` |
| **Inspect database volume** | `docker volume inspect therattayude_kaal_data` |

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/detect` | Upload an image to detect & count centipede legs via YOLOv8. Returns leg count, annotated image (base64), confidence scores, and submission ID. |
| `POST` | `/recount/{submission_id}` | Triggers a satirical re-count consensus simulation with 3 randomized iterations. |
| `GET` | `/certificate/{submission_id}` | Generates and streams a high-resolution personalized Diploma of Anatomical Redundancy (PNG). Query param: `?name=YourName`. |
| `GET` | `/leaderboard` | Returns the top 10 centipedes with the most legs and total legs counted worldwide. |
| `GET` | `/health` | Health check endpoint confirming YOLO model and database connectivity. |

---

## 📦 Project Structure

```
USELESS_PROJECT_3.0/
├── backend/
│   ├── Dockerfile              # CPU-optimized Python 3.11 image
│   ├── best.pt                 # Custom-trained YOLOv8 model weights
│   ├── main.py                 # FastAPI endpoints & inference pipeline
│   ├── certificate.py          # High-resolution diploma generator
│   ├── database.py             # SQLite persistence & leaderboard
│   ├── requirements.txt        # Backend dependencies
│   ├── assets/                 # Certificate base, signatures, and seals
│   └── fonts/                  # Malayalam & English typography
├── frontend/
│   ├── Dockerfile              # Multi-stage Node build -> Nginx runtime
│   ├── nginx.conf              # SPA routing & compression config
│   ├── .env.example            # Environment template
│   ├── src/                    # React 19 application
│   └── vite.config.js          # Vite configuration
├── docker-compose.yml          # Multi-container orchestration
├── .env.example                # Root environment template
├── .gitignore                  # Git tracking rules (preserves backend/best.pt)
└── README.md                   # You are here
```

---

## ⚖️ License & Disclaimer
This project is built purely for academic humor, entertainment, and celebrating the glorious complexity of nature's millipedes/centipedes. No centipedes were harmed during the training of this YOLO model.
