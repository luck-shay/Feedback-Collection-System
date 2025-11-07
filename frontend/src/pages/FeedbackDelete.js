import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { feedbackAPI } from '../services/api';

const FeedbackDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeedback();
  }, [id]);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const response = await feedbackAPI.getById(id);
      setFeedback(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load feedback. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await feedbackAPI.delete(id);
      navigate('/');
    } catch (err) {
      setError('Failed to delete feedback. Please try again.');
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !feedback) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="card shadow-lg border-0 p-4" style={{ maxWidth: '500px', width: '100%', borderRadius: '15px' }}>
          <div className="card-body text-center">
            <p className="text-danger">{error || 'Feedback not found'}</p>
            <Link to="/" className="btn btn-primary">
              Back to List
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: '500px', width: '100%', borderRadius: '15px', animation: 'fadeIn 0.4s ease-in' }}>
        <div className="card-body text-center">
          <h3 className="fw-semibold text-danger mb-3">
            <i className="bi bi-exclamation-triangle-fill me-2"></i> Confirm Deletion
          </h3>
          <p className="mb-4 text-muted">
            Are you sure you want to permanently delete feedback from{' '}
            <strong className="text-dark">{feedback.name}</strong> (Rating:{' '}
            <span className="text-warning fw-semibold">{feedback.rating}</span>)?
          </p>

          {error && (
            <div className="alert alert-danger mb-3" role="alert">
              {error}
            </div>
          )}

          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-danger px-4"
              type="button"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Deleting...
                </>
              ) : (
                <>
                  <i className="bi bi-trash3-fill me-1"></i> Yes, Delete
                </>
              )}
            </button>
            <Link to={`/feedback/${feedback.id}`} className="btn btn-outline-secondary px-4">
              <i className="bi bi-x-circle me-1"></i> Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDelete;

