import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', business_name: '' });
  const [role, setRole] = useState('CUSTOMER');
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      await register({
        name: form.name,
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role,
        business_name: form.business_name,
      });
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Unable to create account');
    }
  };

  return (
    <div className="auth-page">
      <Navbar />
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-tabs">
            <Link to="/login" className="auth-tab">Log in</Link>
            <Link to="/register" className="auth-tab active">Sign up</Link>
          </div>

          <h1>Create account</h1>
          <p>Join KenaKata as a customer or seller</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="role-select">
              <button
                type="button"
                className={`role-option ${role === 'CUSTOMER' ? 'active' : ''}`}
                onClick={() => setRole('CUSTOMER')}
              >
                <strong>Customer</strong>
                <span>Shop local products</span>
              </button>
              <button
                type="button"
                className={`role-option ${role === 'VENDOR' ? 'active' : ''}`}
                onClick={() => setRole('VENDOR')}
              >
                <strong>Seller</strong>
                <span>Manage your own store</span>
              </button>
            </div>

            <div className="form-field">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>
            {role === 'VENDOR' && (
              <div className="form-field">
                <label>Business Name</label>
                <input
                  type="text"
                  name="business_name"
                  value={form.business_name}
                  onChange={handleChange}
                  placeholder="Your business name"
                  required
                />
              </div>
            )}
            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="form-field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                required
              />
            </div>
            <div className="form-field">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                placeholder="Repeat password"
                required
              />
            </div>
            {error && <div className="auth-error">{error}</div>}
            <button type="submit" className="auth-submit">Create Account</button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;