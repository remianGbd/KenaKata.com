import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import { useCart } from '../context/CartContext';
import { createOrder, createOrderItem } from '../services/orderService';
import './Checkout.css';

function Checkout() {
  const navigate = useNavigate();
  const { items, cartTotal, clearCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    area: '',
    city: 'Dhaka',
    notes: '',
    payment: 'cod'
  });

  const DELIVERY_FEE = 60;
  const total = cartTotal + DELIVERY_FEE;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.address || !form.area) {
      setToastMsg('Please fill in all required shipping fields');
      setShowToast(true);
      return;
    }
    try {
      const order = await createOrder(total);
      await Promise.all(items.map((item) => createOrderItem({
        order_id: order.order_id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price,
      })));
      clearCart();
      navigate('/orders');
    } catch (error) {
      setToastMsg(error.response?.data?.message || 'Unable to place order');
      setShowToast(true);
    }
  };

  const [toastMsg, setToastMsg] = useState('');

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <Navbar />
        <div className="checkout-container">
          <div className="checkout-empty">
            <h2>Your cart is empty</h2>
            <p>Add some items before checking out.</p>
            <Link to="/products" className="shop-btn">Browse Products</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Navbar />

      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <p>Complete your order details</p>
        </div>

        <form className="checkout-layout" onSubmit={handleSubmit}>
          <div className="checkout-form">
            <section className="form-section">
              <h2>Shipping Information</h2>
              <div className="form-grid">
                <div className="form-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Rahim Uddin"
                  />
                </div>
                <div className="form-field">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                  />
                </div>
                <div className="form-field full">
                  <label>Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="House 12, Road 5"
                  />
                </div>
                <div className="form-field">
                  <label>Area</label>
                  <input
                    type="text"
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                    placeholder="Dhanmondi"
                  />
                </div>
                <div className="form-field">
                  <label>City</label>
                  <select name="city" value={form.city} onChange={handleChange}>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Khulna">Khulna</option>
                  </select>
                </div>
                <div className="form-field full">
                  <label>Delivery Notes (optional)</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Any special instructions for delivery..."
                    rows="3"
                  />
                </div>
              </div>
            </section>

            <section className="form-section">
              <h2>Payment Method</h2>
              <div className="payment-options">
                <label className={`payment-option ${form.payment === 'cod' ? 'active' : ''}`}>
                  <input type="radio" name="payment" value="cod" checked={form.payment === 'cod'} onChange={handleChange} />
                  <div className="payment-info">
                    <strong>Cash on Delivery</strong>
                    <span>Pay when you receive your order</span>
                  </div>
                  <div className="payment-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                  </div>
                </label>
                <label className={`payment-option ${form.payment === 'bkash' ? 'active' : ''}`}>
                  <input type="radio" name="payment" value="bkash" checked={form.payment === 'bkash'} onChange={handleChange} />
                  <div className="payment-info">
                    <strong>bKash</strong>
                    <span>Mobile banking payment</span>
                  </div>
                  <div className="payment-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="5" y="2" width="14" height="20" rx="2"></rect>
                      <line x1="12" y1="18" x2="12" y2="18"></line>
                    </svg>
                  </div>
                </label>
                <label className={`payment-option ${form.payment === 'card' ? 'active' : ''}`}>
                  <input type="radio" name="payment" value="card" checked={form.payment === 'card'} onChange={handleChange} />
                  <div className="payment-info">
                    <strong>Credit / Debit Card</strong>
                    <span>Visa, Mastercard accepted</span>
                  </div>
                  <div className="payment-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                      <line x1="2" y1="10" x2="22" y2="10"></line>
                    </svg>
                  </div>
                </label>
              </div>
            </section>
          </div>

          <aside className="checkout-summary">
            <h2>Order Summary</h2>
            <div className="summary-items">
              {items.map(item => (
                <div key={item.id} className="summary-item">
                  <div className="summary-item-image">
                    <img src={item.image} alt={item.name} />
                    <span className="summary-item-qty">{item.quantity}</span>
                  </div>
                  <div className="summary-item-info">
                    <p className="summary-item-name">{item.name}</p>
                    <p className="summary-item-store">{item.store}</p>
                  </div>
                  <span className="summary-item-price">৳{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>৳{cartTotal}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>৳{DELIVERY_FEE}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>৳{total}</span>
              </div>
            </div>

            <button type="submit" className="place-order-btn">
              Place Order
            </button>
            <Link to="/cart" className="back-cart">← Back to Cart</Link>
          </aside>
        </form>
      </div>

      <Footer />
      <Toast show={showToast} message={toastMsg} onHide={() => setShowToast(false)} />
    </div>
  );
}

export default Checkout;