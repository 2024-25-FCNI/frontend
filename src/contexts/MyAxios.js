import axios from "axios";
 
//Saját myAxios példány létrehozása és configurálása
export const myAxios = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Accept": "application/json", // 🔹 JSON válasz fogadása
  },
});
 
  // 🔹 CSRF token kiolvasása és beállítása minden kéréshez
myAxios.interceptors.request.use((config) => {
  const token = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='));
  if (token) {
      config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token.split('=')[1]);
  }
  return config;
});


