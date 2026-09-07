import api from './api';

export async function getVendorOrders() {
  const response = await api.get('/api/orders/vendor/me');
  return response.data;
}

export async function getVendorReservations() {
  const response = await api.get('/api/reservations/vendor/me');
  return response.data;
}