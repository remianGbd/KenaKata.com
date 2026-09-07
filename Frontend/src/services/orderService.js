// export const orders = [
//   {
//     id: 'ORD-1024',
//     date: 'Aug 2, 2026',
//     status: 'Delivered',
//     payment: 'Cash on Delivery',
//     total: 3200,
//     items: [
//       { name: 'Premium Oversized Tee', quantity: 1, price: 1290, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500' },
//       { name: 'Classic Leather Wallet', quantity: 1, price: 1850, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500' }
//     ]
//   },
//   {
//     id: 'ORD-1031',
//     date: 'Aug 8, 2026',
//     status: 'Processing',
//     payment: 'bKash',
//     total: 3550,
//     items: [
//       { name: 'Wireless Headphones', quantity: 1, price: 3490, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' }
//     ]
//   },
//   {
//     id: 'ORD-1036',
//     date: 'Aug 9, 2026',
//     status: 'Pending',
//     payment: 'Cash on Delivery',
//     total: 1840,
//     items: [
//       { name: 'Organic Green Basket', quantity: 2, price: 890, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500' }
//     ]
//   },
//   {
//     id: 'ORD-1012',
//     date: 'Jul 25, 2026',
//     status: 'Cancelled',
//     payment: 'Card',
//     total: 2350,
//     items: [
//       { name: 'Cotton Bedsheet Set', quantity: 1, price: 2290, image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500' }
//     ]
//   }
// ];

// export function getOrders() {
//   return orders;
// }

// export function getOrderById(id) {
//   return orders.find(o => o.id === id);
// }

import api from './api';

export async function getOrders() {
  const response = await api.get('/api/orders');
  return response.data.map((order) => ({
    ...order,
    id: order.order_id,
    total: order.total_amount,
    date: order.created_at || order.order_date || '',
  }));
}

export async function createOrder(totalAmount) {
  const response = await api.post('/api/orders', { total_amount: totalAmount });
  return response.data;
}

export async function createOrderItem(item) {
  const response = await api.post('/api/order-items', item);
  return response.data;
}