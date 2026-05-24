# Fake-News-Detection-System
## Project Overview
This repository contains the Phase 4 implementation of the Fake News Detection System for CSCE 5214 Group 18. The project transitions a machine learning pipeline into a functional web application. It uses a Client Server architecture to separate the user interface from the prediction engine. The system evaluates news articles using four machine learning models: Logistic Regression, Decision Tree, Gradient Boost, and Random Forest. It is deployed at: https://fake-news-detection-system-kohl.vercel.app/

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

## Example News Article To Test
MOSCOW (Reuters) - Russiaâ€™s former ambassador to Washington, Sergei Kislyak, said on Saturday his conversations with former White House national security adviser Michael Flynn had been transparent and focused on matters of U.S.-Russia cooperation. Kislyak ended his tenure in Washington in July but remains a key figure in ongoing U.S. investigations into Moscowâ€™s alleged meddling in the 2016 presidential election. Flynn was forced to resign in February after it became known that he had failed to disclose the content of conversations he had with Kislyak and misled U.S. Vice-President Mike Pence about their meetings. â€œWe only spoke about the most simple things ... but the communication was completely correct, calm, absolutely transparent. In any case, there were no secrets on our side,â€ Kislyak said during a panel discussion on Russian television. â€œThere are a number of issues which are important for cooperation between Russia and the United States - most of all, terrorism. And that was one of the things we discussed.
