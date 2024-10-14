import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from '@mui/material';

const App = React.memo(() => {  // Wrap component with React.memo
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [prediction, setPrediction] = useState('');
  const [confidence, setConfidence] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);

    // Create a preview URL for the selected image
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview('');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  });

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setPrediction('');
    setConfidence('');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('https://tomato-backend-production.up.railway.app/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const predictionText = response.data.prediction === "Healthy"
        ? "This plant is Healthy"
        : `Predicted Disease: ${response.data.prediction}`; 
      setPrediction(predictionText);
      setConfidence(response.data.confidence);
    } catch (error) {
      setError('An error occurred while processing the file.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedFile]);  // Add selectedFile as a dependency

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Paper elevation={3} style={{ padding: '20px', color: '#003300', backgroundColor: 'rgba(93, 111, 161, 0.3)' }}>
        <Typography variant="h4" align="center" paddingBottom={'10px'} gutterBottom>
          Tomato Plant Disease Detection
        </Typography>

        <div {...getRootProps()} style={{
          border: '2px dashed #888',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
          marginBottom: '20px',
          backgroundColor: isDragActive ? '#f1f1f1' : 'rgba(153, 255, 153, 0.5)',
          color: '#666666',
          borderRadius: '8px'
        }}>
          <input {...getInputProps()} />
          <Typography variant="body1">
            {isDragActive ? 'Drop the image here ...' : 'Drag and drop an image here, or click to select a file'}
          </Typography>
        </div>

        {imagePreview && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <img
              src={imagePreview}
              alt="Uploaded"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        )}

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          disabled={loading || !selectedFile}
          fullWidth
          style={{ marginTop: '20px', padding: '12px 24px', fontSize: '16px' }}
        >
          {loading ? <CircularProgress size={24} /> : 'Detect Disease'}
        </Button>

        {loading && <Typography color='cyan'>Processing your image, please wait...</Typography>}

        {prediction && (
          <div style={{ marginTop: '20px', color: 'white' }}>
            <Typography variant="h6">{prediction}</Typography>
            <Typography variant="body1">Confidence: {confidence}</Typography>
          </div>
        )}
        {error && <Typography color="error" style={{ marginTop: '20px' }}>{error}</Typography>}
      </Paper>
    </Container>
  );
});

export default App;
