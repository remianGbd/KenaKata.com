import { useEffect } from 'react';
import './Toast.css';

function Toast({ show, message, onHide }) {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => onHide(), 2500);
    return () => clearTimeout(timer);
  }, [show, onHide]);

  if (!show) return null;

  return (
    <div className="toast">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
      <span>{message}</span>
    </div>
  );
}

export default Toast;