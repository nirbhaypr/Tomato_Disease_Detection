# Tomato_Disease_Detection

Tomato Disease Detection is a machine learning project designed to identify diseases in tomato plants based on leaf images. This application can detect multiple types of tomato leaf diseases and display the disease prediction along with the confidence score, allowing farmers or agricultural specialists to take necessary action in maintaining crop health.

## Features
* Upload an image of a tomato plant leaf.\
* Detect up to 10 different tomato leaf diseases, including cases where the plant is healthy.\
* Confidence score for the predicted disease.\
* FastAPI-based backend for image processing and prediction.\
* React-based frontend with support for drag-and-drop image uploads.\
* Mobile-responsive user interface with custom background and footer.\

## Demo
You can check out the live demo of the application [here](https://tomato-disease-detect.up.railway.app/)

## Table of Contents
* [Model Overview](#model-overview)
  
* [Installation](#installation)
  * [Backend Setup](#backend-setup)
  * [Frontend Setup](#frontend-setup)
  * [Usage](#usage)

* [Deployment](#deployment)
  
* [Contributing](#contributing)
  
* [License](#license)

## Model Overview
The model for disease detection was trained using TensorFlow. It was built to classify tomato leaf diseases by learning from images of tomato plant leaves that belong to different disease categories. The dataset consists of multiple disease categories including:

Bacterial Spot\
Early Blight\
Late Blight\
Leaf Mold\
Septoria Leaf Spot\
Spider Mites (Two-Spotted Spider Mite)\
Target Spot\
Tomato Mosaic Virus\
Tomato Yellow Leaf Curl Virus\
Healthy

### Training Details
* Framework: TensorFlow 2.x
* Model: Convolutional Neural Networks (CNN)
* Accuracy: Achieved high validation accuracy on the test set.
* Notebook: The model training and evaluation can be found in the [Model.ipynb](Model.ipynb).

## Installation
### Backend Setup
1. Clone this repository:
   ```bash
   git clone https://github.com/nirbhaypr/Tomato_Disease_Detection.git
   cd Tomato_Disease_Detection/api
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI server:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```

### Frontend Setup
1. Navigate to the src folder:
   ```bash
   cd ../src
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

### Usage
1. Go to http://localhost:3000 to access the frontend interface.
2. Upload a tomato leaf image to predict the disease.
3. View the prediction and confidence score.

## Deployment
The backend and frontend are deployed on Railway, making the app available for public access. You can also deploy the project to platforms like Heroku for the backend and Vercel/Netlify for the frontend.

## Contributing
Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Commit your changes (git commit -m 'Add feature').
4. Push to the branch (git push origin feature-branch).
5. Open a Pull Request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
