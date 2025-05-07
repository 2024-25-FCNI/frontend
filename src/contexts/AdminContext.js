import { createContext, useContext, useEffect, useState } from "react";
import { myAxios } from "../api/axios";
const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [termekek, setTermekek] = useState([]);

  // Termékek lekérése az API-ból
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

  //Használható postData, ami frissíti is a terméklistát
  const postData = async (url, data, isFormData = false) => {
    try {
      await myAxios.get("/sanctum/csrf-cookie");

      const response = await myAxios.post(url, data, {
        headers: isFormData
          ? { Accept: "application/json" }
          : {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
        withCredentials: true,
      });

      console.log("✅ Feltöltve:", response.data);

      //Terméklista frissítése
      await fetchTermekek();
    } catch (error) {
      console.error("❌ Feltöltési hiba:", error);
      throw error;
    }
  };

  const torol = async (termekId) => {
    try {
      await myAxios.delete(`/api/termekek/${termekId}`, {
        withCredentials: true,
      });
      console.log("✅ Termék törölve:", termekId);
      await fetchTermekek(); // frissítjük a listát törlés után
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("⚠️ A termék már meg lett vásárolva, nem törölhető.");
      } else {
        console.error("❌ Törlési hiba:", error);
        // NEM dob alertet, ha más típusú hiba lép fel
      }
    }
  };

  // Betöltéskor automatikusan lekéri az adatokat
  useEffect(() => {
    fetchTermekek();
  }, []);

  return (
    <AdminContext.Provider value={{ termekek, postData, fetchTermekek, torol }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
