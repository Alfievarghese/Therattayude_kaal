FROM python:3.11-slim

WORKDIR /app

# Install system dependencies required for OpenCV and graphics rendering
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Install lightweight CPU-only PyTorch to optimize image size on VPS
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir torch==2.5.1+cpu torchvision==0.20.1+cpu --index-url https://download.pytorch.org/whl/cpu

# Install backend dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy model weights, application code, fonts, and assets
COPY . .

# Create persistent storage mount point for SQLite database and uploads
RUN mkdir -p /app/data

ENV DATA_DIR=/app/data
ENV MODEL_PATH=/app/best.pt

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
