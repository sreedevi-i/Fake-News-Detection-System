from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re
import os

app = Flask(__name__)
CORS(app) # Allows your frontend to talk to this backend

# --- MODEL DIRECTORY CONFIG ---
MODEL_DIR = 'models'
VECTORIZER_PATH = os.path.join(MODEL_DIR, 'tfidf_vectorizer.pkl')

models_dict = {
    'logistic_regression': {'name': 'Logistic Regression', 'file': 'logistic_regression.pkl'},
    'decision_tree': {'name': 'Decision Tree', 'file': 'decision_tree.pkl'},
    'gradient_boost': {'name': 'Gradient Boost', 'file': 'gradient_boost.pkl'},
    'random_forest': {'name': 'Random Forest', 'file': 'random_forest.pkl'}
}

loaded_models = {}
vectorizer = None

# --- ATTEMPT TO LOAD MODELS ---
try:
    print("Loading ML models into memory...")
    vectorizer = joblib.load(VECTORIZER_PATH)
    for key, info in models_dict.items():
        model_path = os.path.join(MODEL_DIR, info['file'])
        loaded_models[key] = {
            'name': info['name'],
            'model': joblib.load(model_path)
        }
    print("Success: All models loaded!")
except FileNotFoundError as e:
    print(f"\n[WARNING] Missing model files! The API is running, but predictions will fail. \nError: {e}\n")


def clean_text(text):
    """Matches the exact text cleaning from Phase 1"""
    text = text.lower()
    text = re.sub(r'\W', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text

@app.route('/analyze', methods=['POST'])
def analyze_article():
    # 1. Safety check
    if not vectorizer or not loaded_models:
        return jsonify({"error": "Server is waiting on ML models. Please add .pkl files to backend/models/"}), 503

    data = request.json
    article_text = data.get('article_text', '')
    selected_model = data.get('model', 'compare_all')

    if not article_text:
        return jsonify({"error": "No article text provided"}), 400

    try:
        # 2. Process text
        cleaned_text = clean_text(article_text)
        vectorized_text = vectorizer.transform([cleaned_text])

        results = []
        
        # 3. Determine models to run
        models_to_run = loaded_models.keys() if selected_model == 'compare_all' else [selected_model]

        # 4. Predict
        for model_key in models_to_run:
            if model_key in loaded_models:
                model_info = loaded_models[model_key]
                model = model_info['model']
                
                prediction_val = model.predict(vectorized_text)[0]
                prediction_label = "Real News" if prediction_val == 1 else "Fake News"
                
                probabilities = model.predict_proba(vectorized_text)[0]
                confidence = float(max(probabilities)) 

                results.append({
                    "model_name": model_info['name'],
                    "prediction": prediction_label,
                    "confidence": round(confidence, 4)
                })

        return jsonify({"results": results}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)