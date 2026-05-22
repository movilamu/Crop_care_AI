<div align="center">

<img src="https://img.shields.io/badge/CropCare-AI-2ea44f?style=for-the-badge&logo=leaf&logoColor=white" alt="CropCare AI"/>

# 🌾 CropCare AI
### *AI-Powered Crop Disease Detection & Treatment Recommendation System*

> Empowering farmers with instant, accurate crop disease diagnosis using the power of Artificial Intelligence — snap a photo, get a diagnosis, save your harvest.

<br/>

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.0+-EE4C2C?style=flat-square&logo=pytorch&logoColor=white)](https://pytorch.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Streamlit](https://img.shields.io/badge/Streamlit-1.25+-FF4B4B?style=flat-square&logo=streamlit&logoColor=white)](https://streamlit.io)
[![MLflow](https://img.shields.io/badge/MLflow-Tracking-0194E2?style=flat-square&logo=mlflow&logoColor=white)](https://mlflow.org)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white)](https://docker.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Claude API](https://img.shields.io/badge/Claude-Vision_API-CC785C?style=flat-square)](https://anthropic.com)

<br/>

[🚀 Live Demo](#-live-demo) · [📖 Documentation](#-documentation) · [🛠️ Installation](#️-installation) · [🤝 Contributing](#-contributing)

---

</div>

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Model Performance](#-model-performance)
- [Project Structure](#-project-structure)
- [Installation](#️-installation)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Screenshots](#-screenshots)
- [Dataset](#-dataset)
- [Design Patterns](#-design-patterns)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Team](#-team)
- [Acknowledgements](#-acknowledgements)

---

## 🌱 About the Project

India loses **₹50,000+ crore** worth of crops annually due to undetected plant diseases. CropCare AI bridges the gap between modern AI and grassroots farming by enabling **any farmer with a smartphone** to instantly identify crop diseases and receive expert-level treatment recommendations — completely free.

Built as part of an academic project aligned with **Smart India Hackathon (SIH)** themes around Agriculture and Rural Development, CropCare AI is designed to be lightweight, fast, and deployable even in low-bandwidth rural environments.

### 🎯 Problem Statement

- Farmers lack access to agronomists, especially in remote regions
- Disease identification requires expertise that most farmers don't have
- Delayed diagnosis leads to crop failure and financial loss
- Existing tools are either too complex, paid, or require internet speeds unavailable in rural India

### ✅ Our Solution

A mobile-friendly web application that:
1. Accepts a photo of a diseased crop leaf
2. Runs it through a fine-tuned CNN model (MobileNetV2 + ResNet50 ensemble)
3. Identifies the disease with confidence scoring and Grad-CAM visualization
4. Delivers structured treatment plans — organic, chemical, and preventive
5. Factors in live local weather data to assess disease risk

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🔍 **AI Disease Detection** | CNN model trained on 54,000+ images across 38 disease classes |
| 🌡️ **Live Weather Risk** | Real-time OpenWeatherMap integration for disease risk assessment |
| 🗺️ **Grad-CAM Heatmaps** | Visual explainability — see exactly what the model detected |
| 💊 **Treatment Engine** | Organic, chemical & preventive recommendations per disease |
| 📄 **PDF Reports** | Downloadable diagnosis report for every scan |
| 📱 **WhatsApp Share** | One-tap share of diagnosis summary |
| 📊 **Analytics Dashboard** | Track scan history, top diseases, and usage trends |
| 🔐 **Secure API** | JWT-authenticated FastAPI backend with rate limiting |
| 🐳 **Docker Ready** | Full containerized deployment with one command |
| 🌐 **Multilingual Ready** | Architecture supports regional language expansion |

---

## 🛠️ Tech Stack

### Machine Learning
```
PyTorch 2.0        → Model training & inference
MobileNetV2        → Primary lightweight model (mobile deployment)
ResNet50           → Benchmark accuracy model
Albumentations     → Advanced image augmentation pipeline
Grad-CAM           → Model explainability & heatmap visualization
MLflow             → Experiment tracking & model versioning
```

### Backend
```
FastAPI            → High-performance REST API
Pydantic           → Request/response validation
JWT (PyJWT)        → Authentication
Uvicorn            → ASGI server
```

### Frontend
```
Streamlit          → Interactive web application
Plotly             → Analytics charts
ReportLab/FPDF     → PDF report generation
```

### Infrastructure
```
Docker             → Containerization
Docker Compose     → Multi-service orchestration
Prometheus         → Metrics monitoring
GitHub Actions     → CI/CD pipeline
Hugging Face       → Model hosting & deployment
```

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CROPCARE AI SYSTEM                      │
└─────────────────────────────────────────────────────────────────┘

  ┌───────────────┐     ┌────────────────────────────────────────┐
  │  Farmer with  │────▶│          STREAMLIT FRONTEND            │
  │  Smartphone   │     │  Home │ Detect │ History │ Analytics   │
  └───────────────┘     └────────────────┬───────────────────────┘
                                         │ HTTP POST (image)
                                         ▼
                         ┌───────────────────────────┐
                         │       FASTAPI BACKEND      │
                         │  /predict  /history        │
                         │  /health   /metrics        │
                         │  JWT Auth + Rate Limiter   │
                         └──────────┬────────────────┘
                                    │
               ┌────────────────────┼────────────────────┐
               ▼                    ▼                     ▼
  ┌─────────────────┐  ┌─────────────────────┐  ┌──────────────────┐
  │   ML PIPELINE   │  │  RECOMMENDATION     │  │  WEATHER API     │
  │                 │  │     ENGINE          │  │                  │
  │ Preprocessing   │  │                     │  │ OpenWeatherMap   │
  │ → MobileNetV2   │  │ Knowledge Base JSON │  │ Live temp/humid  │
  │ → ResNet50      │  │ 38 disease classes  │  │ Disease risk     │
  │ → Ensemble      │  │ ICAR guidelines     │  │ calculation      │
  │ → Grad-CAM      │  │                     │  │                  │
  └────────┬────────┘  └─────────────────────┘  └──────────────────┘
           │
           ▼
  ┌─────────────────┐
  │   MLFLOW        │
  │  TRACKING       │
  │  Experiments    │
  │  Model Registry │
  └─────────────────┘
```

---

## 📊 Model Performance

| Model | Accuracy | F1 Score | Inference Time | Parameters |
|---|---|---|---|---|
| MobileNetV2 (fine-tuned) | 93.4% | 0.931 | ~45ms | 3.4M |
| ResNet50 (fine-tuned) | 94.8% | 0.945 | ~110ms | 25.6M |
| **Ensemble (final)** | **95.6%** | **0.953** | ~140ms | 29M |

> Evaluated on PlantVillage test set (15% stratified split, ~8,100 images)

### Supported Crops & Diseases

```
🍅 Tomato        → 9 classes  (Late Blight, Early Blight, Mosaic Virus...)
🥔 Potato        → 3 classes  (Late Blight, Early Blight, Healthy)
🌾 Rice          → 4 classes  (Blast, Brown Spot, Leaf Scald...)
🌿 Wheat         → 3 classes  (Yellow Rust, Brown Rust, Healthy)
🌽 Maize/Corn    → 4 classes  (Grey Leaf Spot, Common Rust, Blight...)
🍇 Grape         → 4 classes  (Black Rot, Esca, Leaf Blight...)
🌶️ Pepper        → 2 classes  (Bacterial Spot, Healthy)
🍎 Apple         → 4 classes  (Scab, Black Rot, Cedar Rust...)
🍑 Peach         → 2 classes  (Bacterial Spot, Healthy)
🍓 Strawberry    → 2 classes  (Leaf Scorch, Healthy)
                   ─────────────────────────────
                   38 total classes across 14 crops
```

---

## 📁 Project Structure

```
cropcare-ai/
├── 📂 data/
│   ├── raw/                     # Original PlantVillage dataset
│   ├── processed/               # Augmented & split data
│   └── external/                # Weather/soil API data
│
├── 📂 notebooks/
│   ├── 01_eda.ipynb             # Exploratory Data Analysis
│   ├── 02_preprocessing.ipynb   # Image preprocessing pipeline
│   ├── 03_model_training.ipynb  # Model training & evaluation
│   └── 04_explainability.ipynb  # Grad-CAM visualizations
│
├── 📂 src/
│   ├── data/                    # Dataset loader, augmentation, splitter
│   ├── models/                  # MobileNetV2, ResNet50, Ensemble
│   ├── training/                # Trainer, scheduler, early stopping
│   ├── evaluation/              # Metrics, confusion matrix, Grad-CAM
│   ├── recommendation/          # Treatment engine + knowledge base
│   └── utils/                   # Logger, config loader, helpers
│
├── 📂 app/
│   ├── main.py                  # Streamlit entry point
│   ├── pages/                   # Home, Detect, History, Analytics
│   └── components/              # Reusable UI components
│
├── 📂 api/
│   ├── main.py                  # FastAPI application
│   ├── routers/                 # predict, history, health endpoints
│   ├── schemas/                 # Pydantic request/response models
│   └── middleware/              # JWT auth, rate limiter
│
├── 📂 tests/
│   ├── unit/                    # Unit tests per module
│   └── integration/             # End-to-end pipeline tests
│
├── 📂 configs/
│   ├── model_config.yaml        # Model hyperparameters
│   ├── training_config.yaml     # Training configuration
│   └── app_config.yaml          # Application settings
│
├── 📂 docker/
│   ├── Dockerfile               # Multi-stage production build
│   └── docker-compose.yml       # Full stack orchestration
│
├── 📂 .github/workflows/
│   └── ci_cd.yml                # GitHub Actions CI/CD pipeline
│
├── requirements.txt
├── setup.py
├── .env.example
└── README.md
```

---

## ⚙️ Installation

### Prerequisites

- Python 3.10+
- pip or conda
- Docker & Docker Compose (optional but recommended)
- CUDA-compatible GPU (optional, for faster training)

---

### 🐳 Option 1: Docker (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/cropcare-ai.git
cd cropcare-ai

# 2. Copy environment variables
cp .env.example .env
# → Fill in your API keys in .env

# 3. Build and launch all services
docker-compose up --build

# Services will start at:
# Streamlit App  → http://localhost:8501
# FastAPI Docs   → http://localhost:8000/docs
# MLflow UI      → http://localhost:5000
# Prometheus     → http://localhost:9090
```

---

### 🐍 Option 2: Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/cropcare-ai.git
cd cropcare-ai

# 2. Create and activate virtual environment
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Set up environment variables
cp .env.example .env
# → Fill in your API keys in .env

# 5. Download the PlantVillage dataset
python src/data/download_dataset.py

# 6. Run preprocessing
python src/data/splitter.py

# 7. Train the model
python src/training/trainer.py --config configs/training_config.yaml

# 8. Launch the FastAPI backend
uvicorn api.main:app --host 0.0.0.0 --port 8000 --reload

# 9. Launch the Streamlit frontend (new terminal)
streamlit run app/main.py
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
# Groq API (for AI-powered recommendation layer)
GROQ_API_KEY=your_groq_api_key_here

# OpenWeatherMap (for live weather disease risk)
OPENWEATHER_API_KEY=your_openweathermap_api_key_here

# JWT Secret (for API authentication)
JWT_SECRET_KEY=your_super_secret_jwt_key_here
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=30

# Application
APP_ENV=development
LOG_LEVEL=INFO
MAX_UPLOAD_SIZE_MB=10
API_RATE_LIMIT=60

# MLflow
MLFLOW_TRACKING_URI=http://localhost:5000
```

> ⚠️ **Never commit your `.env` file.** It is already in `.gitignore`.

Get your free API keys:
- **Groq API** → [console.qroq.com](https://console.groq.com/home)
- **OpenWeatherMap** → [openweathermap.org/api](https://openweathermap.org/api)

---

## 📡 API Reference

### Base URL: `http://localhost:8000/api/v1`

---

#### `POST /predict`
Analyze a crop leaf image and return disease diagnosis.

**Request**
```bash
curl -X POST "http://localhost:8000/api/v1/predict" \
  -H "Authorization: Bearer <your_token>" \
  -F "image=@leaf_photo.jpg" \
  -F "crop_type=tomato"
```

**Response**
```json
{
  "disease_label": "Tomato___Late_blight",
  "disease_name": "Late Blight",
  "confidence": 94.7,
  "severity": "Severe",
  "severity_score": 8,
  "affected_area_percentage": 45,
  "symptoms_observed": [
    "Dark brown lesions on leaves",
    "White fungal growth on undersides",
    "Water-soaked appearance at leaf edges"
  ],
  "organic_treatments": ["Copper-based fungicide", "Neem oil spray"],
  "chemical_treatments": [
    { "product": "Mancozeb 75% WP", "dosage": "2.5g/L", "frequency": "Every 7 days" }
  ],
  "fertilizer_recommendation": "Potassium-rich fertilizer to boost plant immunity",
  "urgency": "Immediate",
  "yield_impact": "Up to 70% loss if untreated",
  "recovery_probability": "High with treatment",
  "gradcam_image_base64": "data:image/jpeg;base64,...",
  "weather_risk": {
    "temperature": 28.4,
    "humidity": 84,
    "risk_level": "HIGH — Fungal disease conditions"
  },
  "processing_time_ms": 143
}
```

---

#### `GET /history`
Retrieve past scan history for a user.

```bash
curl "http://localhost:8000/api/v1/history?user_id=abc123&limit=10" \
  -H "Authorization: Bearer <your_token>"
```

---

#### `GET /health`
Check API health status.

```bash
curl "http://localhost:8000/api/v1/health"
# → { "status": "healthy", "model_loaded": true, "uptime_seconds": 3842 }
```

---

#### `GET /metrics`
Prometheus-compatible metrics endpoint.

```bash
curl "http://localhost:8000/api/v1/metrics"
```

---


## 📦 Dataset

We use the **PlantVillage Dataset** — one of the largest open-source plant disease image datasets.

| Property | Value |
|---|---|
| Total Images | 54,306 |
| Disease Classes | 38 |
| Crops Covered | 14 |
| Image Format | JPG (256×256) |
| License | CC0 (Public Domain) |
| Source | Penn State University |

```python
# Download via TensorFlow Datasets
import tensorflow_datasets as tfds
ds = tfds.load('plant_village', split='train', shuffle_files=True)
```

Or download directly from: [Kaggle PlantVillage Dataset](https://www.kaggle.com/datasets/abdallahalidev/plantvillage-dataset)

---

## 🎨 Design Patterns Used

| Pattern | Where Used | Purpose |
|---|---|---|
| **Strategy** | Augmentation pipeline | Swap augmentation strategies without changing training code |
| **Factory** | Model selection | `ModelFactory.create('mobilenet')` returns the right model |
| **Observer** | MLflow tracking | Auto-log metrics on each epoch without coupling to trainer |
| **Singleton** | Config loader | Single config instance across the entire application |
| **Builder** | API response | Construct complex response objects step by step |
| **Facade** | Inference pipeline | Single `predict(image)` call hides all preprocessing complexity |

---

## 🧪 Testing

```bash
# Run all tests
pytest tests/ -v

# Run with coverage report
pytest tests/ --cov=src --cov-report=html

# Run only unit tests
pytest tests/unit/ -v

# Run only integration tests
pytest tests/integration/ -v
```

### Coverage Targets

| Module | Target |
|---|---|
| `src/models/` | ≥ 85% |
| `src/recommendation/` | ≥ 90% |
| `api/routers/` | ≥ 80% |
| `src/data/` | ≥ 80% |
| **Overall** | **≥ 80%** |

---



## 🤝 Contributing

We welcome contributions! Here's how to get started:

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/add-new-crop-support

# 3. Commit your changes (Conventional Commits format)
git commit -m "feat(model): add soybean disease detection support"

# 4. Push to your branch
git push origin feature/add-new-crop-support

# 5. Open a Pull Request
```

### Commit Message Convention

```
feat(scope):     New feature
fix(scope):      Bug fix
docs(scope):     Documentation update
refactor(scope): Code refactoring
test(scope):     Adding or updating tests
chore(scope):    Maintenance tasks
```

---

## 📋 Roadmap

- [x] MobileNetV2 + ResNet50 ensemble model
- [x] FastAPI REST backend with JWT auth
- [x] Streamlit frontend with 4 pages
- [x] Grad-CAM explainability
- [x] Weather risk integration
- [x] PDF report generation
- [ ] Android mobile app (React Native)
- [ ] Offline mode with TFLite model
- [ ] Voice output in regional languages (Hindi, Tamil, Telugu)
- [ ] SMS alert system for high-risk disease warnings
- [ ] Soil health integration (NPK sensor data)
- [ ] Drone image support for field-scale detection

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [PlantVillage Dataset](https://plantvillage.psu.edu/) — Penn State University
- [Anthropic Claude API](https://anthropic.com) — AI vision and recommendation layer
- [OpenWeatherMap API](https://openweathermap.org/api) — Live weather data
- [ICAR](https://icar.org.in) — Indian Council of Agricultural Research guidelines
- [Smart India Hackathon](https://www.sih.gov.in) — Problem statement inspiration
- [PyTorch](https://pytorch.org) — Deep learning framework
- [Streamlit](https://streamlit.io) — Rapid frontend development

---

<div align="center">

**Made with 💚 for Indian Farmers**

*"Technology in the hands of a farmer is not a luxury — it's a lifeline."*

⭐ **Star this repo if CropCare AI helped you!** ⭐

</div>
