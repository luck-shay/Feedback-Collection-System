import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { feedbackAPI } from '../services/api';

const FeedbackForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      fetchFeedback();
    }
  }, [id]);

  const fetchFeedback = async () => {
    try {
      setLoadingFeedback(true);
      const response = await feedbackAPI.getById(id);
      const fb = response.data;
      setFormData({
        name: fb.name,
        email: fb.email,
        message: fb.message,
        rating: fb.rating.toString(),
      });
    } catch (err) {
      console.error(err);
      navigate('/');
    } finally {
      setLoadingFeedback(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    if (!formData.rating) {
      newErrors.rating = 'Rating is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      setLoading(true);
      const submitData = {
        ...formData,
        rating: parseInt(formData.rating),
      };

      if (isEdit) {
        await feedbackAPI.update(id, submitData);
      } else {
        await feedbackAPI.create(submitData);
      }
      navigate('/');
    } catch (err) {
      if (err.response?.data) {
        setErrors(err.response.data);
      } else {
        setErrors({ submit: 'Failed to save feedback. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const ratingOptions = [1, 2, 3, 4, 5];

  if (loadingFeedback) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-wrapper" style={{ minHeight: '80vh', paddingTop: '40px', paddingBottom: '40px' }}>
      <div className="feedback-card" style={{ maxWidth: '650px', width: '100%', margin: '0 auto', background: '#ffffff', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)', padding: '45px 50px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-120px', right: '-120px', width: '250px', height: '250px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '50%', opacity: 0.15 }}></div>
        
        <h2 className="feedback-title" style={{ fontWeight: 700, textAlign: 'center', color: '#2f2f6e', marginBottom: '30px', fontSize: '1.8rem' }}>
          {isEdit ? '✏️ Edit Feedback' : '💬 Add Feedback'}
        </h2>

        {errors.submit && (
          <div className="alert alert-danger" role="alert">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 600, color: '#333', marginBottom: '6px' }}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              style={{ borderRadius: '12px', padding: '12px 15px', border: '1.5px solid #d8d8e0', fontSize: '1rem', width: '100%', maxWidth: '520px', display: 'block', margin: '0 auto' }}
            />
            {errors.name && <div className="invalid-feedback d-block text-center">{errors.name}</div>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 600, color: '#333', marginBottom: '6px' }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              style={{ borderRadius: '12px', padding: '12px 15px', border: '1.5px solid #d8d8e0', fontSize: '1rem', width: '100%', maxWidth: '520px', display: 'block', margin: '0 auto' }}
            />
            {errors.email && <div className="invalid-feedback d-block text-center">{errors.email}</div>}
          </div>

          {/* Rating */}
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 600, color: '#333', marginBottom: '6px' }}>
              Rating
            </label>
            <select
              name="rating"
              className={`form-select ${errors.rating ? 'is-invalid' : ''}`}
              value={formData.rating}
              onChange={handleChange}
              style={{ borderRadius: '12px', padding: '12px 15px', border: '1.5px solid #d8d8e0', fontSize: '1rem', width: '100%', maxWidth: '520px', display: 'block', margin: '0 auto' }}
            >
              <option value="">Select a rating</option>
              {ratingOptions.map((r) => (
                <option key={r} value={r}>
                  {r} ⭐
                </option>
              ))}
            </select>
            {errors.rating && <div className="invalid-feedback d-block text-center">{errors.rating}</div>}
          </div>

          {/* Message */}
          <div className="mb-4">
            <label className="form-label" style={{ fontWeight: 600, color: '#333', marginBottom: '6px' }}>
              Message
            </label>
            <textarea
              name="message"
              className={`form-control ${errors.message ? 'is-invalid' : ''}`}
              rows="4"
              placeholder="Write your feedback here..."
              value={formData.message}
              onChange={handleChange}
              style={{ borderRadius: '12px', padding: '12px 15px', border: '1.5px solid #d8d8e0', fontSize: '1rem', width: '100%', maxWidth: '520px', display: 'block', margin: '0 auto', resize: 'none', minHeight: '120px' }}
            />
            {errors.message && <div className="invalid-feedback d-block text-center">{errors.message}</div>}
          </div>

          {/* Buttons */}
          <div className="btn-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '25px' }}>
            <Link to="/" className="btn btn-cancel" style={{ borderRadius: '10px', fontWeight: 500, border: '1.5px solid #ccc', padding: '10px 25px', textDecoration: 'none', color: '#333' }}>
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-submit"
              disabled={loading}
              style={{ background: 'linear-gradient(90deg, #667eea, #764ba2)', border: 'none', color: 'white', fontWeight: 600, padding: '10px 25px', borderRadius: '10px' }}
            >
              {loading ? 'Saving...' : isEdit ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;

