// export const markets = [
//   {
//     id: 1,
//     name: 'Dhanmondi Bazar',
//     location: 'Dhanmondi, Dhaka',
//     distance: '1.2 km',
//     image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800',
//     categories: ['Grocery', 'Fashion'],
//     hours: '8:00 AM – 10:00 PM'
//   },
//   {
//     id: 2,
//     name: 'Gulshan Avenue Market',
//     location: 'Gulshan, Dhaka',
//     distance: '3.5 km',
//     image: 'https://images.unsplash.com/photo-1525920980995-f7a91f73b013?w=800',
//     categories: ['Fashion', 'Electronics'],
//     hours: '9:00 AM – 9:00 PM'
//   },
//   {
//     id: 3,
//     name: 'Mirpur New Market',
//     location: 'Mirpur, Dhaka',
//     distance: '6.8 km',
//     image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800',
//     categories: ['Grocery', 'Home & Living'],
//     hours: '8:00 AM – 10:00 PM'
//   },
//   {
//     id: 4,
//     name: 'Uttara Central Market',
//     location: 'Uttara, Dhaka',
//     distance: '9.4 km',
//     image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800',
//     categories: ['Grocery', 'Home & Living'],
//     hours: '7:30 AM – 10:30 PM'
//   },
//   {
//     id: 5,
//     name: 'Banani Fresh Market',
//     location: 'Banani, Dhaka',
//     distance: '4.1 km',
//     image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800',
//     categories: ['Grocery'],
//     hours: '8:00 AM – 9:00 PM'
//   },
//   {
//     id: 6,
//     name: 'Mohammadpur Bazar',
//     location: 'Mohammadpur, Dhaka',
//     distance: '5.6 km',
//     image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
//     categories: ['Grocery', 'Home & Living'],
//     hours: '8:00 AM – 10:00 PM'
//   }
// ];

// export const stores = [
//   { id: 1, name: 'Urban Thread', category: 'Fashion', marketId: 1, location: 'Dhanmondi 27, Dhaka', rating: 4.8, image: 'https://images.unsplash.com/photo-1525920980995-f7a91f73b013?w=800' },
//   { id: 2, name: 'Fresh Corner', category: 'Grocery', marketId: 1, location: 'Dhanmondi 32, Dhaka', rating: 4.6, image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800' },
//   { id: 3, name: 'Daily Needs', category: 'Grocery', marketId: 1, location: 'Kalabagan, Dhaka', rating: 4.4, image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800' },
//   { id: 4, name: 'Tech Haven', category: 'Electronics', marketId: 2, location: 'Gulshan 1, Dhaka', rating: 4.9, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800' },
//   { id: 5, name: 'The Leather Co.', category: 'Fashion', marketId: 2, location: 'Gulshan 2, Dhaka', rating: 4.7, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800' },
//   { id: 6, name: 'Gadget Hub', category: 'Electronics', marketId: 2, location: 'Gulshan 1, Dhaka', rating: 4.5, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800' },
//   { id: 7, name: 'Mirpur Mart', category: 'Grocery', marketId: 3, location: 'Mirpur 10, Dhaka', rating: 4.3, image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800' },
//   { id: 8, name: 'Green Space', category: 'Home & Living', marketId: 3, location: 'Mirpur 7, Dhaka', rating: 4.6, image: 'https://images.unsplash.com/photo-1485955900659-3561bde0c203?w=800' },
//   { id: 9, name: 'Home Essentials', category: 'Home & Living', marketId: 4, location: 'Uttara Sector 7, Dhaka', rating: 4.7, image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800' },
//   { id: 10, name: 'Uttara Fresh', category: 'Grocery', marketId: 4, location: 'Uttara Sector 4, Dhaka', rating: 4.5, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800' },
//   { id: 11, name: 'Banani Organics', category: 'Grocery', marketId: 5, location: 'Banani 5, Dhaka', rating: 4.8, image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800' },
//   { id: 12, name: 'Bazar Basics', category: 'Home & Living', marketId: 6, location: 'Mohammadpur, Dhaka', rating: 4.2, image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800' }
// ];

// export function getMarkets() {
//   return markets;
// }

// export function getMarketById(id) {
//   return markets.find(m => m.id === Number(id));
// }

// export function getStores() {
//   return stores;
// }

// export function getStoresByMarket(marketId) {
//   return stores.filter(s => s.marketId === Number(marketId));
// }

// export function getStoreCount(marketId) {
//   return getStoresByMarket(marketId).length;
// }

// export function getStoreById(id) {
//   return stores.find(s => s.id === Number(id));
// }



// import api from './api';



// export async function getMarkets() {
//   const response = await api.get('/api/markets');
//   return response.data;
// }






// export async function getStoresByMarket(marketId) {
//   const response = await api.get(`/api/stores?market_id=${marketId}`);
//   return response.data;
// }

import api from './api';

export async function getMarkets() {
  const response = await api.get('/api/markets');
  return response.data;
}

export async function createMarket(marketName, location) {
  const response = await api.post('/api/markets', {
    market_name: marketName,
    location,
  });
  return response.data;
}

export async function getStores() {
  const response = await api.get('/api/stores');
  return response.data;
}

export async function getStoresByMarket(marketId) {
  const response = await api.get(`/api/stores?market_id=${marketId}`);
  return response.data;
}

export async function getVendorStore() {
  const response = await api.get('/api/stores/vendor/me');
  return response.data;
}

export async function createVendorStore(store) {
  const response = await api.post('/api/stores', store);
  return response.data;
}

export async function updateVendorStore(storeId, store) {
  const response = await api.patch(`/api/stores/${storeId}`, store);
  return response.data.store;
}

export async function getCategories() {
  const response = await api.get('/api/categories');
  return response.data;
}