# Emotion Recognition Web Application

A web application that detects human emotions from images using a deep learning model. The application supports both webcam capture and image upload functionality.

## Features

- Real-time emotion detection from webcam
- Image upload support (JPG/PNG)
- 7 emotion classifications: Angry, Disgust, Fear, Happy, Sad, Surprise, Neutral
- Confidence visualization with charts
- Modern, responsive UI with dark/light mode support
- Mobile-friendly design

## Project Structure

```
emotion-recognizer/
├── backend/           # FastAPI backend
│   ├── app.py        # Main FastAPI application
│   ├── model.py      # Model loading and prediction
│   └── requirements.txt
├── frontend/         # React TypeScript frontend
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

## Setup Instructions

### Backend Setup

1. Create a virtual environment (Python 3.10.9 recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

3. Start the backend server:
```bash
uvicorn app:app --reload
```

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm start
```

## Technologies Used

- Backend:
  - FastAPI
  - TensorFlow
  - Python 3.10.9
  - OpenCV

- Frontend:
  - React
  - TypeScript
  - Chart.js
  - Tailwind CSS
  - React Webcam 