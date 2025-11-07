import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { feedbackAPI } from '../services/api';

const FeedbackDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
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

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`bi ${i < rating ? 'bi-star-fill text-warning' : 'bi-star text-secondary'}`}
      ></i>
    ));
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
      <div className="d-flex justify-content-center">
        <div className="card shadow-lg border-0 p-4" style={{ maxWidth: '700px', width: '100%', borderRadius: '15px' }}>
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
    <div className="d-flex justify-content-center">
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: '700px', width: '100%', borderRadius: '15px', animation: 'fadeIn 0.4s ease-in' }}>
        <div className="card-body">
          <h3 className="fw-semibold text-center mb-4">
            <i className="bi bi-chat-left-text-fill text-primary me-2"></i>
            Feedback from {feedback.name}
          </h3>

          <dl className="row mb-4">
            <dt className="col-sm-4 text-muted">👤 Name</dt>
            <dd className="col-sm-8 fw-medium text-dark">{feedback.name}</dd>

            <dt className="col-sm-4 text-muted">📧 Email</dt>
            <dd className="col-sm-8">
              <a href={`mailto:${feedback.email}`} className="text-decoration-none">
                {feedback.email}
              </a>
            </dd>

            <dt className="col-sm-4 text-muted">⭐ Rating</dt>
            <dd className="col-sm-8">{renderStars(feedback.rating)}</dd>

            <dt className="col-sm-4 text-muted">💬 Message</dt>
            <dd className="col-sm-8">
              <div className="p-3 bg-light border rounded">
                {feedback.message.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </dd>

            <dt className="col-sm-4 text-muted">🕒 Submitted On</dt>
            <dd className="col-sm-8">
              {new Date(feedback.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </dd>
          </dl>

          <div className="d-flex justify-content-center gap-3">
            <Link to={`/feedback/${feedback.id}/edit`} className="btn btn-primary px-4">
              <i className="bi bi-pencil-square me-1"></i> Edit
            </Link>
            <Link to={`/feedback/${feedback.id}/delete`} className="btn btn-danger px-4">
              <i className="bi bi-trash3-fill me-1"></i> Delete
            </Link>
            <Link to="/" className="btn btn-outline-secondary px-4">
              <i className="bi bi-arrow-left-circle me-1"></i> Back to List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetail;

