// function Footer() {
//   return (
//     <footer className="footer">
//       <div className="footer-main">
//         <div className="footer-brand">
//           <div className="logo">
//             Kena<span>Kata</span>
//           </div>
//           <p>
//             Your local marketplace for discovering products, stores and
//             markets around you.
//           </p>
//         </div>

//         <div className="footer-column">
//           <h4>Marketplace</h4>
//           <a href="#">Products</a>
//           <a href="#">Markets</a>
//           <a href="#">Stores</a>
//           <a href="#">Categories</a>
//         </div>

//         <div className="footer-column">
//           <h4>Account</h4>
//           <a href="#">Login</a>
//           <a href="#">Register</a>
//           <a href="#">Orders</a>
//           <a href="#">Wishlist</a>
//         </div>

//         <div className="footer-column">
//           <h4>Company</h4>
//           <a href="#">About</a>
//           <a href="#">Contact</a>
//           <a href="#">Privacy</a>
//           <a href="#">Terms</a>
//         </div>
//       </div>

//       <div className="footer-bottom">
//         <p>© 2026 KenaKata. All rights reserved.</p>
//         <p>Made for local commerce.</p>
//       </div>
//     </footer>
//   );
// }

// export default Footer;

import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="logo">
            Kena<span>Kata</span>
          </Link>
          <p>
            Your local marketplace for discovering products, stores and
            markets around you.
          </p>
        </div>

        <div className="footer-column">
          <h4>Marketplace</h4>
          <Link to="/products">Products</Link>
          <Link to="/markets">Markets</Link>
          <Link to="/stores">Stores</Link>
          <Link to="/products">Categories</Link>
        </div>

        <div className="footer-column">
          <h4>Account</h4>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>

        <div className="footer-column">
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 KenaKata. All rights reserved.</p>
        <p>Made for local commerce.</p>
      </div>
    </footer>
  );
}

export default Footer;