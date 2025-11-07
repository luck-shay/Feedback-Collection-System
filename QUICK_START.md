# Quick Start Guide

## Prerequisites
- Python 3.9+ installed
- Node.js 16+ and npm installed
- MySQL (or use SQLite for development)

## Step-by-Step Setup

### Option 1: Using Setup Scripts (Windows)

1. **Setup Backend:**
   ```bash
   setup_backend.bat
   ```

2. **Setup Frontend:**
   ```bash
   setup_frontend.bat
   ```

3. **Start Backend (Terminal 1):**
   ```bash
   start_backend.bat
   ```

4. **Start Frontend (Terminal 2):**
   ```bash
   start_frontend.bat
   ```

### Option 2: Manual Setup

#### Backend Setup

1. **Create virtual environment:**
   ```bash
   python -m venv .venv
   ```

2. **Activate virtual environment:**
   - Windows: `.venv\Scripts\activate`
   - Mac/Linux: `source .venv/bin/activate`

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure database (optional - defaults to MySQL):**
   
   For SQLite (easier for development), edit `feedback_project/settings.py`:
   ```python
   DATABASES = {
       "default": {
           "ENGINE": "django.db.backends.sqlite3",
           "NAME": BASE_DIR / "db.sqlite3",
       }
   }
   ```

5. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

6. **Start Django server:**
   ```bash
   python manage.py runserver
   ```
   
   Backend will run at: `http://localhost:8000`
   API available at: `http://localhost:8000/api/feedback/`

#### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start React development server:**
   ```bash
   npm start
   ```
   
   Frontend will open at: `http://localhost:3000`

## Verify Installation

1. **Test Backend API:**
   - Open browser: `http://localhost:8000/api/feedback/`
   - Should see: `{"count":0,"next":null,"previous":null,"results":[]}`

2. **Test Frontend:**
   - Open browser: `http://localhost:3000`
   - Should see the Feedback Portal homepage

3. **Test Full Flow:**
   - Click "Submit Feedback"
   - Fill out the form
   - Submit
   - Should see your feedback in the list

## Common Issues

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed solutions.

### Quick Fixes:

**Backend not starting?**
- Check if port 8000 is available
- Run: `python manage.py check`

**Frontend not starting?**
- Delete `node_modules` and run `npm install` again
- Check Node.js version: `node --version` (should be 16+)

**API connection errors?**
- Make sure Django is running
- Check CORS settings in `settings.py`
- Verify API URL in `frontend/src/services/api.js`

## Next Steps

- Create a superuser: `python manage.py createsuperuser`
- Access admin panel: `http://localhost:8000/admin/`
- Start developing!

