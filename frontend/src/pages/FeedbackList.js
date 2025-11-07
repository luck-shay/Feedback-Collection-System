import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { feedbackAPI } from '../services/api';

const FeedbackList = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ name: '', rating: '' });
  const [pagination, setPagination] = useState({ page: 1, count: 0, next: null, previous: null });

  useEffect(() => {
    fetchFeedback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.name, filters.rating, pagination.page]);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        ...(filters.name && { name: filters.name }),
        ...(filters.rating && { rating: filters.rating }),
      };
      const response = await feedbackAPI.getAll(params);
      setFeedbackList(response.data.results || response.data);
      setPagination({
        page: pagination.page,
        count: response.data.count || response.data.length,
        next: response.data.next,
        previous: response.data.previous,
      });
      setError(null);
    } catch (err) {
      setError('Failed to load feedback. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleReset = () => {
    setFilters({ name: '', rating: '' });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const ratingOptions = [1, 2, 3, 4, 5];

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-semibold text-primary mb-0">
          <i className="bi bi-chat-left-dots-fill me-2"></i> User Feedback
        </h3>
        <Link to="/feedback/add" className="btn btn-success">
          <i className="bi bi-plus-circle me-1"></i> Add Feedback
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setError(null)}
          ></button>
        </div>
      )}

      {/* Filters */}
      <form onSubmit={handleFilterSubmit} className="row g-2 align-items-center mb-4">
        <div className="col-md-6">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Search by name"
            value={filters.name}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-3">
          <select
            name="rating"
            className="form-select"
            value={filters.rating}
            onChange={handleFilterChange}
          >
            <option value="">All ratings</option>
            {ratingOptions.map((r) => (
              <option key={r} value={r}>
                {r} ⭐
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3 d-flex">
          <button type="submit" className="btn btn-primary me-2">
            Filter
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      {/* Feedback Cards */}
      {feedbackList.length > 0 ? (
        <>
          <div className="row g-4">
            {feedbackList.map((fb) => (
              <div key={fb.id} className="col-md-6 col-lg-4">
                <Link to={`/feedback/${fb.id}`} className="text-decoration-none">
                  <div className="card h-100 border-0 shadow-sm feedback-card p-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="fw-semibold text-dark mb-1">{fb.name}</h5>
                        <p className="text-muted small mb-2">{fb.email}</p>
                      </div>
                      <span className="badge bg-primary rounded-pill px-3 py-2">
                        ⭐ {fb.rating}
                      </span>
                    </div>
                    <p className="text-muted small mb-3">
                      {fb.message.length > 100 ? `${fb.message.substring(0, 100)}...` : fb.message}
                    </p>
                    <div className="text-end">
                      <small className="text-secondary">
                        <i className="bi bi-clock me-1"></i>
                        {new Date(fb.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </small>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {(pagination.next || pagination.previous) && (
            <nav aria-label="Page navigation" className="mt-4">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${!pagination.previous ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => pagination.previous && handlePageChange(pagination.page - 1)}
                    disabled={!pagination.previous}
                  >
                    <i className="bi bi-arrow-left"></i> Previous
                  </button>
                </li>
                <li className="page-item disabled">
                  <span className="page-link">
                    Page {pagination.page} of {Math.ceil(pagination.count / 10)}
                  </span>
                </li>
                <li className={`page-item ${!pagination.next ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => pagination.next && handlePageChange(pagination.page + 1)}
                    disabled={!pagination.next}
                  >
                    Next <i className="bi bi-arrow-right"></i>
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      ) : (
        <div className="text-center py-5">
          <i className="bi bi-inbox text-secondary" style={{ fontSize: '3rem' }}></i>
          <p className="text-muted mb-2 mt-3">No feedback yet.</p>
          <Link to="/feedback/add" className="btn btn-outline-primary">
            <i className="bi bi-plus-circle me-1"></i> Add the first feedback
          </Link>
        </div>
      )}
    </div>
  );
};

export default FeedbackList;

