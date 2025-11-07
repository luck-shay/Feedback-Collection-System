import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FeedbackList from './pages/FeedbackList';
import FeedbackDetail from './pages/FeedbackDetail';
import FeedbackForm from './pages/FeedbackForm';
import FeedbackDelete from './pages/FeedbackDelete';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Navbar />
        <main className="container my-5 flex-grow-1">
          <Routes>
            <Route path="/" element={<FeedbackList />} />
            <Route path="/feedback/add" element={<FeedbackForm />} />
            <Route path="/feedback/:id" element={<FeedbackDetail />} />
            <Route path="/feedback/:id/edit" element={<FeedbackForm />} />
            <Route path="/feedback/:id/delete" element={<FeedbackDelete />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

