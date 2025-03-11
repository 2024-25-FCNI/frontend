import axios from "axios";



  export const myAxios = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',  // 🔥 Ezt add hozzá
    },
    withCredentials: true, // 🔥 Ez biztosítja, hogy a cookie-k elküldésre kerüljenek
});
