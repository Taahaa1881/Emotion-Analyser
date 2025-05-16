import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const analyzeEmotion = async (imageBlob: Blob) => {
    const formData = new FormData();
    formData.append('file', imageBlob, 'image.jpg');

    const response = await axios.post(`${API_URL}/predict`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};