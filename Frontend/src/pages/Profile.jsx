import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const initials = user.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const links = [
    { to: '/orders', label: 'My Orders', desc: 'Track your orders' },
    { to: '/wishlist', label: 'Wishlist', desc: 'Saved products' },
    { to: '/reservations', label: 'Reservations', desc: 'Store visit bookings' },
    { to: '/cart', label: 'Cart', desc: 'Items in your cart' },
    { to:'/admin/dashboard', label:'Manage Markets',  desc:'Add and manage marketplace locations'},

  ];

  return (
    <div className="profile-page">
      <Navbar />

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-avatar">{initials}</div>
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <span className="profile-role">{user.role}</span>
          </div>
          <button className="profile-logout" onClick={handleLogout}>Logout</button>
        </div>

        <div className="profile-links">
          {links.map(l => (
            <Link to={l.to} key={l.to} className="profile-link-card">
              <strong>{l.label}</strong>
              <span>{l.desc}</span>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;