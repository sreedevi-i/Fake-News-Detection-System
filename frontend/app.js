document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const navAnalyze = document.getElementById('nav-analyze');
    const navCompare = document.getElementById('nav-compare');
    const secAnalyze = document.getElementById('section-analyze');
    const secCompare = document.getElementById('section-compare');

    // Analyze Tab
    const textAnalyze = document.getElementById('analyze-text');
    const modelSelect = document.getElementById('analyze-model');
    const btnAnalyze = document.getElementById('btn-analyze');
    const resBoxAnalyze = document.getElementById('analyze-result-box');
    
    // Compare Tab
    const textCompare = document.getElementById('compare-text');
    const btnCompare = document.getElementById('btn-compare');
    const resBoxCompare = document.getElementById('compare-result-box');
    const compareList = document.getElementById('compare-results-list');

    // Shared Elements
    const loading = document.getElementById('loading');
    const errorMsg = document.getElementById('error-message');

    const API_URL = 'http://127.0.0.1:5000/analyze';

    // NAVIGATION LOGIC 
    navAnalyze.addEventListener('click', (e) => {
        e.preventDefault();
        navAnalyze.classList.add('active');
        navCompare.classList.remove('active');
        secAnalyze.classList.remove('hidden');
        secCompare.classList.add('hidden');
        hideFeedback();
    });

    navCompare.addEventListener('click', (e) => {
        e.preventDefault();
        navCompare.classList.add('active');
        navAnalyze.classList.remove('active');
        secCompare.classList.remove('hidden');
        secAnalyze.classList.add('hidden');
        hideFeedback();
    });

    // API CALL LOGIC
    async function fetchPrediction(text, model) {
        if (!text) {
            showError("Please paste an article text before analyzing.");
            return null;
        }
        hideFeedback();
        showLoading();

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ article_text: text, model: model })
            });

            if (!response.ok) throw new Error("Server error. Check Python backend.");
            const data = await response.json();
            return data.results;
        } catch (error) {
            showError(error.message);
            return null;
        } finally {
            hideLoading();
        }
    }

    //  ANALYZE SINGLE MODEL
    btnAnalyze.addEventListener('click', async () => {
        const results = await fetchPrediction(textAnalyze.value.trim(), modelSelect.value);
        if (results && results.length > 0) {
            const res = results[0];
            
            document.getElementById('res-model-name').textContent = res.model_name;
            
            const pill = document.getElementById('res-prediction');
            pill.textContent = res.prediction;
            pill.className = `pill ${res.prediction === 'Fake News' ? 'fake' : 'real'}`;
            
            document.getElementById('res-confidence').textContent = `${(res.confidence * 100).toFixed(0)}%`;
            
            resBoxAnalyze.classList.remove('hidden');
        }
    });

    // COMPARE ALL 
    btnCompare.addEventListener('click', async () => {
        //  run all 4 models
        const results = await fetchPrediction(textCompare.value.trim(), 'compare_all');
        if (results) {
            compareList.innerHTML = ''; 
            
            results.forEach(res => {
                const confPercent = (res.confidence * 100).toFixed(0);
                const pillClass = res.prediction === 'Fake News' ? 'fake' : 'real';
                
                const row = document.createElement('div');
                row.className = 'table-row';
                row.innerHTML = `
                    <div>${res.model_name}</div>
                    <div><span class="pill ${pillClass}">${res.prediction}</span></div>
                    <div class="conf-cell">
                        <span>${confPercent}%</span>
                        <div class="progress-bar-bg">
                            <div class="progress-bar-fill" style="width: ${confPercent}%"></div>
                        </div>
                    </div>
                `;
                compareList.appendChild(row);
            });
            
            resBoxCompare.classList.remove('hidden');
        }
    });

    // UTILITIES
    function showError(msg) { errorMsg.textContent = msg; errorMsg.classList.remove('hidden'); }
    function hideFeedback() { 
        errorMsg.classList.add('hidden'); 
        resBoxAnalyze.classList.add('hidden');
        resBoxCompare.classList.add('hidden');
    }
    function showLoading() { loading.classList.remove('hidden'); }
    function hideLoading() { loading.classList.add('hidden'); }
});