# Feedback Collection System

A modern full-stack application for collecting, managing, and analyzing user feedback. Built with Django REST Framework backend and React frontend.

![Django](https://img.shields.io/badge/Django-4.2+-092E20?style=flat-square&logo=django)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)
![Python](https://img.shields.io/badge/Python-3.9+-3776ab?style=flat-square&logo=python)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## Features

✨ **Core Functionality**
- Create, read, update, and delete feedback entries
- Collect user details (name, email, rating 1-5, message)
- Paginated feedback list for easy browsing
- Filter by name and rating
- RESTful API with Django REST Framework
- Modern React frontend with React Router

🎨 **User Experience**
- Clean, intuitive interface with Bootstrap 5
- Mobile-friendly responsive layout
- Form validation and error handling
- Confirmation dialogs for destructive actions
- Smooth animations and transitions

## Project Structure

```
Feedback-Collection-System/
├── manage.py                          # Django management script
├── requirements.txt                   # Python dependencies
├── feedback_project/                  # Django project configuration
│   ├── settings.py                    # Project settings
│   ├── urls.py                        # URL routing
│   └── wsgi.py                        # WSGI application
├── feedback_app/                      # Django application
│   ├── models.py                      # Database models
│   ├── views.py                       # Template-based views (legacy)
│   ├── api_views.py                   # REST API viewsets
│   ├── serializers.py                 # API serializers
│   ├── api_urls.py                    # API URL routing
│   ├── urls.py                        # Template URL patterns
│   └── migrations/                    # Database migrations
└── frontend/                          # React frontend application
    ├── package.json                   # Node.js dependencies
    ├── public/                        # Static files
    │   └── index.html                 # HTML template
    └── src/                           # React source code
        ├── App.js                     # Main app component
        ├── index.js                   # Entry point
        ├── index.css                  # Global styles
        ├── components/                # Reusable components
        │   ├── Navbar.js
        │   └── Footer.js
        ├── pages/                     # Page components
        │   ├── FeedbackList.js
        │   ├── FeedbackDetail.js
        │   ├── FeedbackForm.js
        │   └── FeedbackDelete.js
        └── services/                  # API services
            └── api.js
```

## Quick Start

### Prerequisites
- Python 3.9+
- Node.js 16+ and npm
- MySQL (or SQLite for development)
- pip and virtualenv

### Backend Setup (Django)

1. **Clone the repository**
   ```bash
   git clone https://github.com/Akanksha-Saini-11/Feedback-Collection-System.git
   cd Feedback-Collection-System
   ```

2. **Create and activate a virtual environment**
   
   **Windows (PowerShell):**
   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```
   
   **macOS/Linux:**
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure the database**
   
   Update `feedback_project/settings.py` with your database credentials. For development, you can use SQLite:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.sqlite3',
           'NAME': BASE_DIR / 'db.sqlite3',
       }
   }
   ```

5. **Run migrations**
   ```bash
   python manage.py migrate
   ```

6. **Create a superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start the Django development server**
   ```bash
   python manage.py runserver
   ```
   
   The API will be available at `http://127.0.0.1:8000/api/`

### Frontend Setup (React)

1. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Start the React development server**
   ```bash
   npm start
   ```
   
   The React app will open at `http://localhost:3000`

4. **Configure API URL (if needed)**
   
   Create a `.env` file in the `frontend` directory:
   ```env
   REACT_APP_API_URL=http://localhost:8000/api
   ```

## API Endpoints

The Django REST Framework provides the following endpoints:

- `GET /api/feedback/` - List all feedback (with pagination, filtering, and search)
- `GET /api/feedback/{id}/` - Get a specific feedback entry
- `POST /api/feedback/` - Create a new feedback entry
- `PUT /api/feedback/{id}/` - Update a feedback entry
- `DELETE /api/feedback/{id}/` - Delete a feedback entry

### Query Parameters

- `page` - Page number for pagination
- `name` - Filter by name (partial match)
- `rating` - Filter by rating (exact match)
- `search` - Search in name, email, and message fields
- `ordering` - Order by field (e.g., `-created_at`, `rating`, `name`)

### Example API Calls

```bash
# Get all feedback
curl http://localhost:8000/api/feedback/

# Filter by rating
curl http://localhost:8000/api/feedback/?rating=5

# Search by name
curl http://localhost:8000/api/feedback/?name=John

# Create feedback
curl -X POST http://localhost:8000/api/feedback/ \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","message":"Great service!","rating":5}'
```

## Development

### Running Both Servers

You need to run both the Django backend and React frontend:

**Terminal 1 - Django:**
```bash
python manage.py runserver
```

**Terminal 2 - React:**
```bash
cd frontend
npm start
```

### Code Quality

**Python:**
```bash
pip install flake8 pylint
flake8 .
pylint feedback_app/
```

**JavaScript/React:**
```bash
cd frontend
npm run build  # Check for build errors
```

## Production Deployment

### Backend

1. **Security Settings**
   ```python
   DEBUG = False
   SECRET_KEY = os.environ.get('SECRET_KEY')
   ALLOWED_HOSTS = ['yourdomain.com']
   CORS_ALLOWED_ORIGINS = ['https://yourdomain.com']
   ```

2. **Static Files**
   ```bash
   python manage.py collectstatic --noinput
   ```

3. **Use Gunicorn**
   ```bash
   pip install gunicorn
   gunicorn feedback_project.wsgi:application --bind 0.0.0.0:8000
   ```

### Frontend

1. **Build the React app**
   ```bash
   cd frontend
   npm run build
   ```

2. **Serve with Nginx or serve the `build` folder with your web server**

3. **Update API URL**
   Set `REACT_APP_API_URL` environment variable to your production API URL

## Configuration

### Database Setup

**SQLite (development):**
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

**MySQL:**
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'feedback_db',
        'USER': 'your_user',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

### Environment Variables

Create a `.env` file for sensitive data:

```bash
DJANGO_SECRET_KEY=your-secret-key
DJANGO_DB_NAME=feedback_db
DJANGO_DB_USER=root
DJANGO_DB_PASSWORD=password
DJANGO_DB_HOST=localhost
DJANGO_DB_PORT=3306
```

## Technologies Used

### Backend
- **Django 4.2+** - Web framework
- **Django REST Framework** - REST API framework
- **django-cors-headers** - CORS handling
- **MySQL/SQLite** - Database

### Frontend
- **React 18.2** - UI library
- **React Router 6** - Client-side routing
- **Axios** - HTTP client
- **Bootstrap 5** - CSS framework
- **Bootstrap Icons** - Icon library

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## Support

Found a bug or have a suggestion? Please open an [issue](https://github.com/Akanksha-Saini-11/Feedback-Collection-System/issues) on GitHub.

---

**Built with ❤️ using Django REST Framework and React**
