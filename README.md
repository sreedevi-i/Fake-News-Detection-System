# Fake-News-Detection-System
## Project Overview
This repository contains the Phase 4 implementation of the Fake News Detection System for CSCE 5214 Group 18. The project transitions a machine learning pipeline into a functional web application. It uses a Client Server architecture to separate the user interface from the prediction engine. The system evaluates news articles using four machine learning models: Logistic Regression, Decision Tree, Gradient Boost, and Random Forest.

## Repository Structure
The project uses a monolithic repository structure divided into three main workspaces.

backend: Contains the Flask application and the machine learning API.

frontend: Contains the HTML, CSS, and Vanilla JavaScript files for the web interface.

developer_tools: Contains the Jupyter Notebook for data visualization and trend analysis.

## Setup Instructions
Follow these steps to run the project locally.

Clone the repository to your local machine.

Navigate into the backend folder.

Create and activate a Python virtual environment.

Install the required dependencies using pip and the requirements text file.

Place the exported machine learning model files and the TFIDF vectorizer file directly into the backend models directory.

## Running the Web Application
You need to run the backend and frontend simultaneously.

Open a terminal and navigate to the backend folder.

Activate your virtual environment.

Execute the app.py file using Python to start the Flask server.

Open a file explorer and navigate to the frontend folder.

Open the index.html file in any modern web browser.

Paste an article into the text box and select a model to see the prediction and confidence score.

## Running the Developer Trend Analysis
The trend analysis component is isolated for developer use only.

Navigate to the developer_tools folder.

Ensure the True and Fake CSV datasets are located in this folder.

Open the Phase 4 Developer Dashboard notebook using Jupyter.

Run the code cell to generate the visualization comparing publication volume over time.
