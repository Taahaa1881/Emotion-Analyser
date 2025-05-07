from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import cv2
from PIL import Image
import io
import tensorflow as tf
from model import load_model, preprocess_image, EMOTIONS

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = load_model()

@app.get("/")
async def read_root():
    return {"message": "Emotion Recognition API"}

@app.post("/predict")
async def predict_emotion(file: UploadFile = File(...)):
    
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    
    processed_image = preprocess_image(image)
    predictions = model.predict(processed_image)
    
    predicted_emotion_idx = np.argmax(predictions[0])
    predicted_emotion = EMOTIONS[predicted_emotion_idx]
    confidence = float(predictions[0][predicted_emotion_idx])
    
    # Create response with all emotion probabilities
    emotion_probs = {
        emotion: float(prob) 
        for emotion, prob in zip(EMOTIONS, predictions[0])
    }
    
    return {
        "predicted_emotion": predicted_emotion,
        "confidence": confidence,
        "all_emotions": emotion_probs
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 