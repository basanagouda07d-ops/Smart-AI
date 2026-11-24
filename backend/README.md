# AgriAI Onion Disease Detection Backend API (Python FastAPI)

This is the lightweight backend service providing deep vision inference endpoints for the AgriAI React application.

---

## 🚀 Setup & Execution

1. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv .venv
   .\.venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Launch the FastAPI server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

4. The API endpoints will be accessible at:
   - Root Health: `http://localhost:8000/`
   - Interactive Swagger Docs: `http://localhost:8000/docs`
   - Predict Endpoint: `POST http://localhost:8000/api/predict`
