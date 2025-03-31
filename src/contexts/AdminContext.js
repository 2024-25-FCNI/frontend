import { createContext, useContext, useState, useEffect } from "react";
import { myAxios } from "./MyAxios"; // Helyes import
 
// Kontextus létrehozása
const AdminContext = createContext();
 
// Kontextus provider komponens
export function AdminProvider({ children }) {
  const [termekek, setTermekek] = useState([]);
 
  // Termékek betöltése az API-ból
  useEffect(() => {
    fetchTermekek();
  }, []);
 
  const fetchTermekek = async () => {
    try {
      const response = await myAxios.get("api/termekek");
      console.log("Backend válasz:", response.data);
      setTermekek(response.data);
    } catch (error) {
      console.error("Hiba a termékek betöltésekor:", error);
    }
  };
 
 
  const postData = async (url, ujTermek) => {
    try {
      // 🔹 Először kérd le a CSRF tokent
      await myAxios.get("/sanctum/csrf-cookie");
 
      // 🔹 Ezután küldd el a termék adatokat
      const response = await myAxios.post(url, ujTermek);
      console.log("Sikeres termékfeltöltés:", response.data);
 
      fetchTermekek(); // Frissítsük a termékek listáját
    } catch (error) {
      console.error("Hiba történt a termék feltöltésekor:", error);
    }
  };
 
 
 
 
  // **Termék törlése**
  const torol = async (id) => {
    if (!id) {
      console.error("Nincs termék ID megadva!");
      return;
    }
 
    try {
      console.log("Törlés ID:", id);
      await myAxios.delete(`api/termekek/${id}`);
 
      // Frissítjük a termékek listáját úgy, hogy kiszűrjük a törölt elemet
      setTermekek((prevTermekek) => prevTermekek.filter(termek => termek.termek_id !== id));
      //setTermekek((prev) => prev.filter(termek => termek.termek_id !== id));

     
    } catch (error) {
      console.error("Hiba történt a törlés során:", error);
    }
  };
 

  
 
 
  return (
    <AdminContext.Provider value={{ termekek, torol,  fetchTermekek, postData }}>
      {children}
    </AdminContext.Provider>
  );
}
 
// Hook az egyszerűbb használathoz
export function useAdminContext() {
  return useContext(AdminContext);
}