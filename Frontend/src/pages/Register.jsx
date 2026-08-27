import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [role, setRole] = useState('CUSTOMER');
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }
    const user = register({ name: form.name, email: form.email, password: form.password, role });
    if (user) {
      navigate('/');
    } else {
      setError('An account with this email already exists');
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
                className={`role-option ${role === 'SELLER' ? 'active' : ''}`}
                onClick={() => setRole('SELLER')}
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