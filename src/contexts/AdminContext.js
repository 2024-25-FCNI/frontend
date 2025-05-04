import { createContext, useContext, useEffect, useState } from "react";
import { myAxios } from "../api/axios";
const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [termekek, setTermekek] = useState([]);

  // 🔄 Termékek lekérése az API-ból
  const fetchTermekek = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/termekek");
      if (!res.ok) throw new Error("Hiba a termékek lekérdezésekor");
      const data = await res.json();
      setTermekek(data);
    } catch (err) {
      console.error("❌ Nem sikerült lekérni a termékeket:", err);
    }
  };

  // ✅ Használható postData, ami frissíti is a terméklistát
  const postData = async (url, data, isFormData = false) => {
    try {
      // ✅ Sanctum CSRF cookie – fontos Laravelhez
      await myAxios.get("/sanctum/csrf-cookie");
  
      const response = await myAxios.post(url, data, {
        headers: isFormData
          ? { Accept: "application/json" } // FormData esetén nem kell Content-Type
          : {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
        withCredentials: true, // fontos a hitelesítéshez
      });
  
      console.log("✅ Feltöltve:", response.data);
  
      // 🔄 Terméklista frissítése
      await fetchTermekek();
    } catch (error) {
      console.error("❌ Feltöltési hiba:", error);
      throw error;
    }
  };

  // 🔁 Betöltéskor automatikusan lekéri az adatokat
  useEffect(() => {
    fetchTermekek();
  }, []);

  return (
    <AdminContext.Provider value={{ termekek, postData, fetchTermekek }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
