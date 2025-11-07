# Feedback Collection System - React Frontend

This is the React frontend for the Feedback Collection System. It provides a modern, responsive user interface for managing feedback entries.

## Features

- 📋 View all feedback with pagination
- 🔍 Filter feedback by name and rating
- ➕ Create new feedback entries
- ✏️ Edit existing feedback
- 🗑️ Delete feedback with confirmation
- 📱 Responsive design with Bootstrap 5
- ⚡ Fast and interactive UI

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Django backend running on `http://localhost:8000`

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

3. **Configure API URL (optional)**
   
   Create a `.env` file in the `frontend` directory:
   ```env
   REACT_APP_API_URL=http://localhost:8000/api
   ```

## Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build the app for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

## Project Structure

```
frontend/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── App.js              # Main app component with routing
│   ├── index.js            # Entry point
│   ├── index.css           # Global styles
│   ├── components/         # Reusable components
│   │   ├── Navbar.js       # Navigation bar
│   │   └── Footer.js       # Footer component
│   ├── pages/              # Page components
│   │   ├── FeedbackList.js      # List view with filters
│   │   ├── FeedbackDetail.js    # Detail view
│   │   ├── FeedbackForm.js      # Create/Edit form
│   │   └── FeedbackDelete.js    # Delete confirmation
│   └── services/           # API services
│       └── api.js          # API client
└── package.json            # Dependencies
```

## API Integration

The frontend communicates with the Django REST Framework API. All API calls are handled through the `services/api.js` module.

### API Service

```javascript
import { feedbackAPI } from './services/api';

// Get all feedback
const response = await feedbackAPI.getAll({ page: 1, rating: 5 });

// Get single feedback
const feedback = await feedbackAPI.getById(1);

// Create feedback
await feedbackAPI.create({ name, email, message, rating });

// Update feedback
await feedbackAPI.update(id, { name, email, message, rating });

// Delete feedback
await feedbackAPI.delete(id);
```

## Building for Production

1. **Build the app**
   ```bash
   npm run build
   ```

2. **The `build` folder contains the production-ready files**

3. **Deploy the `build` folder to your web server**

## Environment Variables

- `REACT_APP_API_URL` - API base URL (default: `http://localhost:8000/api`)

## Technologies

- **React 18.2** - UI library
- **React Router 6** - Routing
- **Axios** - HTTP client
- **Bootstrap 5** - CSS framework
- **Bootstrap Icons** - Icons

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

For backend setup, see the main [README.md](../README.md) file.

