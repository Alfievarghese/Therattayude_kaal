<img width="1280" height="640" alt="git (1)" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />

# Therattayude Kaal (തേരട്ടയുടെ കാൽ)

### The World's Most Pointless Centipede Leg Counter

---

## Basic Details

### Team Name: Mandi Masala

### Team Members
- Team Lead: Alfie Varghese - St. Joseph's College of Engineering and Technology, Palai
- Member 2: S Tippu Sahib - St. Joseph's College of Engineering and Technology, Palai

### Project Description
In Malayalam, when someone wastes time doing something completely pointless, people say *"തേരട്ടയുടെ കാൽ എണ്ണുവാണോ?"* (Are you counting a centipede's legs?). We took that literally. 

This is a web app powered by a custom YOLOv8s model trained on over 5,000 hand-annotated centipede legs. You upload a photo of a centipede (പഴുതാര), the model spots and counts every visible leg, prints an official diploma of useless achievement, and logs your count to a global leaderboard.

### The Problem (that doesn't exist)
Centipedes run around at night with somewhere between 15 and 40 visible legs. Nobody in Kerala, or anywhere else on Earth, has ever needed an exact inventory of how many legs were on the centipede under their bed. People just want it out of the room.

### The Solution (that nobody asked for)
Instead of grabbing a broom, you can now take a photo and run it through a full computer vision pipeline:
- Upload any photo of a centipede.
- A custom-trained YOLOv8s model detects every individual leg with bounding boxes and confidence scores.
- If you disagree with the count, the Recount Tribunal runs the model three times at different thresholds (0.10, 0.15, 0.20) so you can argue with the algorithm.
- Once you accept the number, the system prints a high-res Royal Diploma signed by *Dr. Kaalu Vettichu* and *Prof. Mandi Masala*.
- The results go straight to the Hall of Legs leaderboard, which proudly tracks total legs counted and zero lives improved.

---

## Technical Details

### Technologies/Components Used

For Software:
- Languages used: Python 3.11, JavaScript (ES2024 / React JSX), HTML5, CSS3
- Frameworks used: FastAPI for the backend, React 19 + Vite for the frontend, Tailwind CSS for styling
- Libraries used: Ultralytics YOLOv8s, Pillow / PIL for diploma generation, Lucide React for icons, SQLite for data persistence, Web Audio API for telemetry beeps
- Tools used: Docker, Docker Compose, Vercel, Tailscale Funnel, Git

For Hardware:
- None. Built and trained locally on an NVIDIA RTX 4050 GPU.

---

### Implementation

For Software:

# Installation

1. Clone the repository:
```bash
git clone https://github.com/AlfieVarghese/USELESS_PROJECT_3.0.git
cd USELESS_PROJECT_3.0
```

2. Set up the backend:
```bash
cd backend
python -m venv venv

# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
```

3. Set up the frontend:
```bash
cd ../frontend
npm install
```

# Run

### Local development

1. Start FastAPI:
```bash
# inside backend/ with venv active
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

2. Start the Vite dev server:
```bash
# inside frontend/
npm run dev
```
Open http://localhost:5173 in your browser.

### Docker Compose (production)

Run the full stack with one command:
```bash
docker compose up -d --build
```
Open http://localhost on port 80.

---

### Project Documentation

For Software:

# Screenshots

### 1. Telemetry dashboard
![Command Center](screenshots/hero_section.png)
*Tactical neobrutalist header with real-time ticker and animated centipede crawler.*

---

### 2. Neural leg detection
![Optical Radar Audit](screenshots/optical_radar_audit.png)
*YOLOv8s isolating and tallying individual centipede legs with bounding boxes.*

---

### 3. Recount tribunal
![Disputed Specimen Tribunal](screenshots/recount_tribunal.png)
*Multi-threshold recount view when you do not trust the initial count.*

---

### 4. Official diploma of useless achievement
![Royal Certificate](screenshots/certificate.png)
*High-resolution printable diploma complete with gold seal and official signatures.*

---

### 5. Global hall of legs
![Leaderboard](screenshots/leaderboard.png)
*Leaderboard tracking top podiatric counts and zero lives improved.*

---

# Diagrams

### Architecture

```
                    +------------------------+
                    |     Browser Client     |
                    |  (React 19 + Vite SPA) |
                    +-----------+------------+
                                |
             REST API Calls     | (Vercel Edge / Tailscale Funnel)
                                v
+---------------------------------------------------------------+
| FastAPI Backend Server (Python 3.11)                          |
|                                                               |
|   +--------------------------+    +-----------------------+   |
|   | YOLOv8s Inference Engine |    | PIL Diploma Generator |   |
|   | - 150 epochs trained     |    | - Custom layout       |   |
|   | - 46.2% mAP50            |    | - Signatures & seals  |   |
|   | - Multi-threshold recount|    | - PNG stream output   |   |
|   +-------------+------------+    +-----------+-----------+   |
|                 |                             |               |
|                 +--------------+--------------+               |
|                                |                              |
|                                v                              |
|                  +--------------------------+                 |
|                  | SQLite Database          |                 |
|                  | - Submissions & counts   |                 |
|                  | - Leaderboard registry   |                 |
|                  +--------------------------+                 |
+---------------------------------------------------------------+
```

---

### Project Demo

# Additional Demos

- Live website: [https://therattayudekaal.vercel.app/](https://therattayudekaal.vercel.app/)

---

## Team Contributions

- Alfie Varghese: Built the React 19 frontend, handled Vercel deployment, configured Docker services, and set up Tailscale funneling.
- S Tippu Sahib: Curated the dataset, labeled over 5,000 centipede legs in AnyLabeling, and trained/evaluated the YOLOv8s model for 150 epochs.

---

Made with ❤️ at TinkerHub Useless Projects

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)
