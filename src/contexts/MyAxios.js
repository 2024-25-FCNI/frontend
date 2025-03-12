import axios from "axios";

export const myAxios = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: true, // 🔥 Sütik küldése engedélyezve
});

// 🔹 CSRF token kiolvasása és beállítása minden kéréshez
myAxios.interceptors.request.use((config) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='));
    if (token) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token.split('=')[1]);
    }
    return config;
});

