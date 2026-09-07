// const API_URL = "http://localhost:5000";

// export async function getMarkets() {
//   const response = await fetch(`${API_URL}/api/markets`);

//   if (!response.ok) {
//     throw new Error("Failed to fetch markets");
//   }

//   return response.json();
// }

// export async function createMarket(marketName, location) {
//   const response = await fetch(`${API_URL}/api/markets`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       market_name: marketName,
//       location: location
//     })
//   });

//   if (!response.ok) {
//     throw new Error("Failed to create market");
//   }

//   return response.json();
// }

// export async function createProduct(product){
// const response = await fetch(
//   `${API_URL}/api/products`,
// {
//   method :"POST",
//   headers : {"Content-Type":"application/json" },
//   body : JSON.stringify(product)
// }
// );
//  if (!response.ok) {
//     throw new Error("Failed to create product");
//   }

//   return response.json();
// }

// export async function getStores(marketId) {

//   const response = await fetch(
//     `${API_URL}/api/stores?market_id=${marketId}`
//   );


//   if (!response.ok) {

//     throw new Error("Failed to fetch stores");

//   }


//   return response.json();

// }



import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function createProduct(product) {
  const response = await api.post('/api/products', product);
  return response.data;
}

export default api;