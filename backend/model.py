import tensorflow as tf
import numpy as np
from PIL import Image
import cv2
import os

# Define emotion labels
EMOTIONS = ['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral']

def load_model():
    """Load the trained emotion recognition model."""
    model_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'emotion_model.keras')
    return tf.keras.models.load_model(model_path)

def preprocess_image(image):
    """
    Preprocess the input image for the model.
    
    Args:
        image: PIL Image object
        
    Returns:
        Preprocessed image array ready for model prediction
    """
    # Convert to grayscale if not already
    if image.mode != 'L':
        image = image.convert('L')
    
    # Resize to 48x48
    image = image.resize((48, 48), Image.Resampling.LANCZOS)
    
    # Convert to numpy array
    image_array = np.array(image)
    
    # Apply histogram equalization for better contrast
    image_array = cv2.equalizeHist(image_array)
    
    # Normalize pixel values
    image_array = image_array.astype('float32') / 255.0
    
    # Reshape for model input (batch_size, height, width, channels)
    image_array = image_array.reshape(1, 48, 48, 1)
    
    return image_array 