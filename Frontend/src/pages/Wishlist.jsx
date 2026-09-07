// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import Toast from '../components/Toast';
// import { useCart } from '../context/CartContext';
// // import { getWishlistProducts } from '../services/productService';
// import { getWishlistProducts } from '../services/productService';
// import './Wishlist.css';

// function Wishlist() {
//   const { addToCart } = useCart();
//   const [items, setItems] = useState(getWishlistProducts());
//   const [showToast, setShowToast] = useState(false);
//   const [toastMsg, setToastMsg] = useState('');

//   const removeItem = (id) => {
//     const item = items.find(p => p.id === id);
//     setItems(prev => prev.filter(p => p.id !== id));
//     setToastMsg(`${item.name} removed from wishlist`);
//     setShowToast(true);
//   };

//   const moveToCart = (product) => {
//     addToCart(product);
//     setToastMsg(`${product.name} added to cart`);
//     setShowToast(true);
//   };

//   return (
//     <div className="wishlist-page">
//       <Navbar />

//       <div className="wishlist-container">
//         <div className="wishlist-header">
//           <h1>My Wishlist</h1>
//           <p>{items.length} saved {items.length === 1 ? 'item' : 'items'}</p>
//         </div>

//         {items.length === 0 ? (
//           <div className="wishlist-empty">
//             <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//               <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
//             </svg>
//             <h2>Your wishlist is empty</h2>
//             <p>Save products you love and come back to them later.</p>
//             <Link to="/products" className="shop-btn">Browse Products</Link>
//           </div>
//         ) : (
//           <div className="wishlist-grid">
//             {items.map(p => (
//               <div key={p.id} className="wishlist-card">
//                 <Link to={`/products/${p.id}`} className="wishlist-card-image">
//                   <img src={p.image} alt={p.name} />
//                 </Link>
//                 <div className="wishlist-card-body">
//                   <span className="wishlist-category">{p.category}</span>
//                   <h3>
//                     <Link to={`/products/${p.id}`}>{p.name}</Link>
//                   </h3>
//                   <p className="wishlist-store">{p.store}</p>
//                   <div className="wishlist-card-footer">
//                     <span className="wishlist-price">৳{p.price}</span>
//                     <div className="wishlist-actions">
//                       <button className="wishlist-move-btn" onClick={() => moveToCart(p)}>
//                         Add to Cart
//                       </button>
//                       <button className="wishlist-remove-btn" onClick={() => removeItem(p.id)}>
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <Footer />
//       <Toast show={showToast} message={toastMsg} onHide={() => setShowToast(false)} />
//     </div>
//   );
// }

// export default Wishlist;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import { useCart } from '../context/CartContext';
import { getWishlistProducts } from '../services/productService';
import './Wishlist.css';

function Wishlist() {
  const { addToCart } = useCart();
  const [items, setItems] = useState([]); // শুরুতেই খালি অ্যারে
  const [loading, setLoading] = useState(true); // লোডিং স্টেট
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // এখানে useEffect বসানো হয়েছে ডেটা লোড করার জন্য
  useEffect(() => {
    async function loadWishlist() {
      try {
        const data = await getWishlistProducts();
        setItems(data);
      } catch (error) {
        console.error("Error loading wishlist:", error);
      } finally {
        setLoading(false);
      }
    }
    loadWishlist();
  }, []);

  const removeItem = (id) => {
    const item = items.find(p => p.id === id);
    setItems(prev => prev.filter(p => p.id !== id));
    setToastMsg(`${item.name} removed from wishlist`);
    setShowToast(true);
  };

  const moveToCart = (product) => {
    addToCart(product);
    setToastMsg(`${product.name} added to cart`);
    setShowToast(true);
  };

  if (loading) return <div className="loading">Loading wishlist...</div>;

  return (
    <div className="wishlist-page">
      <Navbar />

      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          <p>{items.length} saved {items.length === 1 ? 'item' : 'items'}</p>
        </div>

        {items.length === 0 ? (
          <div className="wishlist-empty">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <h2>Your wishlist is empty</h2>
            <p>Save products you love and come back to them later.</p>
            <Link to="/products" className="shop-btn">Browse Products</Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {items.map(p => (
              <div key={p.id} className="wishlist-card">
                <Link to={`/products/${p.id}`} className="wishlist-card-image">
                  <img src={p.image} alt={p.name} />
                </Link>
                <div className="wishlist-card-body">
                  <span className="wishlist-category">{p.category}</span>
                  <h3>
                    <Link to={`/products/${p.id}`}>{p.name}</Link>
                  </h3>
                  <p className="wishlist-store">{p.store}</p>
                  <div className="wishlist-card-footer">
                    <span className="wishlist-price">৳{p.price}</span>
                    <div className="wishlist-actions">
                      <button className="wishlist-move-btn" onClick={() => moveToCart(p)}>
                        Add to Cart
                      </button>
                      <button className="wishlist-remove-btn" onClick={() => removeItem(p.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
      <Toast show={showToast} message={toastMsg} onHide={() => setShowToast(false)} />
    </div>
  );
}

export default Wishlist;