<img width="1280" height="640" alt="git (1)" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />

# Therattayude Kaal (തേരട്ടയുടെ കാൽ) 🎯

### *The World's Most Pointless Computer Vision Podiatric Instrument*

---

## Basic Details

### Team Name: Mandi Masala

### Team Members
- Team Lead: Alfie Varghese - St. Joseph's College of Engineering and Technology, Palai
- Member 2: S Tippu Sahib - St. Joseph's College of Engineering and Technology, Palai

### Project Description
An over-engineered industrial podiatric telemetry platform trained on custom YOLOv8s deep vision to isolate, track, and count every single individual leg on centipede specimens (പഴുതാര). Because counting centipede legs is the single most useless and unnecessary task conceivable in Kerala folklore, we built an AI-driven scientific instrument to do exactly that with 46.2% mAP50 precision.

### The Problem (that doesn't exist)
In everyday Kerala culture, *"തേരട്ടയുടെ കാൽ എണ്ണൽ"* (counting a centipede's legs) is an age-old Malayalam proverb denoting the absolute pinnacle of futile, time-wasting, and pointless human endeavors. Nobody in the history of biological science has ever needed to know the exact leg count of an agitated centipede crawling across their veranda floorboards at 3:00 AM.

### The Solution (that nobody asked for)
We built a declassified, government-grade computer vision apparatus that:
- Ingests photographs of centipedes via a tactile neobrutalist telemetry cockpit.
- Deploys a custom-trained YOLOv8s neural network (11.1M parameters, 150 epochs) featuring an optical radar reticle scanner to identify, isolate, and tally every outward-facing leg.
- Convenes a democratic **Disputed Specimen Tribunal** allowing users to demand high-drama recounts across confidence thresholds (`0.10`, `0.15`, `0.20`) when they inevitably distrust the computer's verdict.
- Generates an official, high-resolution, downloadable Royal Diploma of Useless Achievement signed by *Dr. Kaalu Vettichu* and *Prof. Mandi Masala*.
- Archives all audited specimens into a global **Hall of Legs** leaderboard.

---

## Technical Details

### Technologies/Components Used

For Software:
- **Languages used**: Python 3.11, JavaScript (ES2024 / JSX), HTML5, CSS3
- **Frameworks used**: FastAPI (Backend API), React 19 + Vite (Frontend SPA), Tailwind CSS v4 (Industrial Design System)
- **Libraries used**: Ultralytics YOLOv8s (Deep Learning Inference), Pillow / PIL (High-Resolution Diploma Generator), Lucide React (Tactical Iconography), SQLite (Telemetry Persistence), Web Audio API (Procedural Telemetry Fanfare & Reticle Clicks)
- **Tools used**: Docker & Docker Compose, Vercel (Edge Client Hosting), Tailscale Funnel (Hybrid Edge-to-Backend Tunneling), Git & GitHub

For Hardware:
- *None (Software / Deep Vision Pipeline)*

---

### Implementation

For Software:

# Installation

1. **Clone the repository**:
```bash
git clone https://github.com/AlfieVarghese/USELESS_PROJECT_3.0.git
cd USELESS_PROJECT_3.0
```

2. **Backend Setup**:
```bash
cd backend
python -m venv venv

# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
```

3. **Frontend Setup**:
```bash
cd ../frontend
npm install
```

# Run

### Option A: Local Development

1. **Start the FastAPI Backend**:
```bash
# In backend/ with active venv:
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

2. **Start the Vite Frontend**:
```bash
# In frontend/:
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Option B: Docker Compose (Production / VPS)

Run the entire full-stack stack with a single command:
```bash
docker compose up -d --build
```
Access the application on [http://localhost](http://localhost) (Port 80).

---

### Project Documentation

For Software:

# Screenshots

### 1. Neobrutalist Telemetry Command Center
![Command Center](screenshots/hero_section.png)
*High-contrast declassified interface with live warning ticker, official stamp badges, interactive audio seal, and realistic crawling Kerala Scolopendra.*

---

### 2. Biometric Optical Radar Audit & Leg Tally
![Optical Radar Audit](screenshots/optical_radar_audit.png)
*Automated podiatric audit executing YOLOv8s inference with real-time rotating radar reticle, leg isolation detection pings, and high-voltage tally readout.*

---

### 3. Disputed Specimen Tribunal (Recount Consensus)
![Disputed Specimen Tribunal](screenshots/recount_tribunal.png)
*Committee recount engine re-running the neural model across multiple confidence thresholds to establish democratic majority consensus.*

---

### 4. Official Royal Diploma of Useless Achievement
![Royal Certificate](screenshots/certificate.png)
*Official high-resolution diplomatic parchment certifying completed podiatric audit, complete with gold embossed seals and official signatures.*

---

### 5. Global Hall of Legs (Leaderboard)
![Leaderboard](screenshots/leaderboard.png)
*Public audit archive logging total appendages cataloged, record-holding specimens, and 0 lives improved.*

---

# Diagrams

### System Architecture & Workflow

```
                               ┌────────────────────────┐
                               │     Browser Client     │
                               │  (Vite + React 19)     │
                               └───────────┬────────────┘
                                           │
                        HTTPS API Requests │ (Tailscale / Vercel Edge)
                                           ▼
┌────────────────────────────────────────────────────────────────────────┐
│ FastAPI Backend Server (Python 3.11)                                   │
│                                                                        │
│   ┌────────────────────────────┐    ┌──────────────────────────────┐   │
│   │ YOLOv8s Inference Engine   │    │ PIL Certificate Engine       │   │
│   │ - 150 Epochs Calibrated    │    │ - Dynamic High-Res Diploma   │   │
│   │ - 46.2% mAP50 Precision    │    │ - Authentic Royal Signatures │   │
│   │ - Multi-Threshold Recounts │    │ - Gold Foil Embossed Seal    │   │
│   └─────────────┬──────────────┘    └──────────────┬───────────────┘   │
│                 │                                  │                   │
│                 └─────────────────┬────────────────┘                   │
│                                   ▼                                    │
│                     ┌───────────────────────────┐                      │
│                     │ SQLite Telemetry Database │                      │
│                     │ - Audit Records & Counts  │                      │
│                     │ - Global Leaderboard      │                      │
│                     └───────────────────────────┘                      │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Project Demo

# Additional Demos

- **Live Production Deployment**: [https://therattayudekaal.vercel.app/](https://therattayudekaal.vercel.app/)

---

## Team Contributions

- **Alfie Varghese**: Fullstack development & cloud deployment (React 19 neobrutalist client, Vercel edge deployment, Docker containerization, and Tailscale backend funneling).
- **S Tippu Sahib**: Computer vision modeling, dataset labeling & evaluation (YOLOv8s model training, 150-epoch podiatric calibration, accuracy benchmarks, and data augmentation).

---

Made with ❤️ at TinkerHub Useless Projects 

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)
