export const reservations = [
  {
    id: 'RES-101',
    product: 'Smart Watch Pro',
    store: 'Tech Haven',
    price: 5490,
    date: 'Aug 12, 2026',
    time: '5:00 PM',
    notes: 'Want to check the strap options',
    status: 'Confirmed'
  },
  {
    id: 'RES-102',
    product: '4K Action Camera',
    store: 'Tech Haven',
    price: 6990,
    date: 'Aug 15, 2026',
    time: '12:30 PM',
    notes: '',
    status: 'Pending'
  },
  {
    id: 'RES-097',
    product: 'Gaming Console X',
    store: 'Tech Haven',
    price: 8990,
    date: 'Jul 28, 2026',
    time: '4:00 PM',
    notes: 'Demo before purchase',
    status: 'Completed'
  },
  {
    id: 'RES-090',
    product: 'Smart Watch Pro',
    store: 'Tech Haven',
    price: 5490,
    date: 'Jul 20, 2026',
    time: '6:00 PM',
    notes: '',
    status: 'Cancelled'
  }
];

export function getReservations() {
  return reservations;
}