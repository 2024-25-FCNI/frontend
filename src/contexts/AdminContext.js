import { createContext, useContext, useEffect, useState } from "react";

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
      const response = await fetch(`http://localhost:8000${url}`, {
        method: "POST",
        body: data,
        headers: isFormData
          ? { Accept: "application/json" }
          : {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
      });

      if (!response.ok) {
        throw new Error("Hiba a feltöltés során");
      }

      const result = await response.json();
      console.log("✅ Feltöltve:", result);

      // 🔄 Terméklista frissítése
      await fetchTermekek();
    } catch (error) {
      console.error("❌ Feltöltési hiba:", error);
      throw error; // fontos: így az UjTermek.js is tudja, ha hiba történt
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
