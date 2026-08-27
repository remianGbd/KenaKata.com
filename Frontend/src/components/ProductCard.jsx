import { useState } from 'react';
import { Link } from 'react-router-dom';
import Toast from './Toast';
import BookingButton from './BookingButton';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setShowToast(true);
  };

  return (
    <>
      <Link to={`/products/${product.id}`} className="product-card">
        <div className="product-card-image">
          <img src={product.image} alt={product.name} />
          {product.tag && <span className="product-tag">{product.tag}</span>}
          <button
            className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
            onClick={handleWishlistToggle}
            aria-label="Add to wishlist"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? '#11120f' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
        <div className="product-card-content">
          <div className="product-meta">
            <span className="product-category">{product.category}</span>
            <span className="product-store">{product.store}</span>
          </div>
          <h3 className="product-name">{product.name}</h3>
          <div className="product-footer">
            <span className="product-price">৳{product.price}</span>
            <div className="product-actions">
              {product.price > 5000 && (
                <BookingButton storeName={product.store} productName={product.name} />
              )}
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Link>
      <Toast
        show={showToast}
        message={`${product.name} added to cart`}
        onHide={() => setShowToast(false)}
      />
    </>
  );
}

export default ProductCard;