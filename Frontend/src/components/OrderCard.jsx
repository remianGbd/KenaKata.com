import './OrderCard.css';

function OrderCard({ order }) {
  const statusClass = order.status.toLowerCase();

  return (
    <div className="order-card">
      <div className="order-card-header">
        <div>
          <span className="order-id">{order.id}</span>
          <span className="order-date">{order.date}</span>
        </div>
        <span className={`order-status ${statusClass}`}>{order.status}</span>
      </div>

      <div className="order-items">
        {order.items.map((item, idx) => (
          <div key={idx} className="order-item">
            <img src={item.image} alt={item.name} />
            <div className="order-item-info">
              <p>{item.name}</p>
              <span>Qty {item.quantity}</span>
            </div>
            <span className="order-item-price">৳{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="order-card-footer">
        <span className="order-payment">{order.payment}</span>
        <span className="order-total">Total ৳{order.total}</span>
      </div>
    </div>
  );
}

export default OrderCard;