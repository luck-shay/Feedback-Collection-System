# Troubleshooting Guide

## Common Terminal Errors and Solutions

### Backend (Django) Issues

#### 1. ModuleNotFoundError: No module named 'rest_framework'
**Solution:**
```bash
pip install -r requirements.txt
```

#### 2. django.core.exceptions.ImproperlyConfigured: mysqlclient
**Solution:**
- For Windows, you may need to install MySQL client libraries
- Or switch to SQLite for development (see settings.py)

#### 3. django.db.utils.OperationalError: no such table
**Solution:**
```bash
python manage.py migrate
```

#### 4. Port 8000 already in use
**Solution:**
```bash
# Use a different port
python manage.py runserver 8001
```

#### 5. CORS errors in browser console
**Solution:**
- Make sure `corsheaders` is in INSTALLED_APPS
- Check CORS_ALLOWED_ORIGINS in settings.py includes your frontend URL

### Frontend (React) Issues

#### 1. 'react-scripts' is not recognized
**Solution:**
```bash
cd frontend
npm install
```

#### 2. Port 3000 already in use
**Solution:**
- Press 'Y' when prompted to use a different port
- Or set PORT environment variable: `set PORT=3001 && npm start`

#### 3. Network Error or CORS errors
**Solution:**
- Make sure Django backend is running on port 8000
- Check that CORS is properly configured in Django settings
- Verify API URL in `frontend/src/services/api.js`

#### 4. Cannot find module errors
**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

#### 5. npm ERR! code ELIFECYCLE
**Solution:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Make sure Node.js version is 16 or higher

### Database Issues

#### SQLite (Recommended for Development)
If you're having MySQL connection issues, switch to SQLite:

In `feedback_project/settings.py`:
```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}
```

Then run:
```bash
python manage.py migrate
```

### Quick Fix Commands

**Backend:**
```bash
# Reinstall dependencies
pip install -r requirements.txt --upgrade

# Reset database (SQLite)
del db.sqlite3
python manage.py migrate

# Check for errors
python manage.py check
```

**Frontend:**
```bash
cd frontend

# Clean install
rm -rf node_modules package-lock.json
npm install

# Clear cache
npm start -- --reset-cache
```

### Verification Steps

1. **Check Django is running:**
   - Visit `http://localhost:8000/api/feedback/`
   - Should return JSON (empty list if no data)

2. **Check React is running:**
   - Visit `http://localhost:3000`
   - Should see the Feedback Portal page

3. **Check API connection:**
   - Open browser DevTools (F12)
   - Check Network tab for API calls
   - Should see requests to `http://localhost:8000/api/feedback/`

### Still Having Issues?

1. Make sure Python 3.9+ is installed: `python --version`
2. Make sure Node.js 16+ is installed: `node --version`
3. Check that both servers are running in separate terminals
4. Verify firewall isn't blocking ports 3000 and 8000

