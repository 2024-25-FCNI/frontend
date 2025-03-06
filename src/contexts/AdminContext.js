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
      const response = await myAxios.get("/termekek");
      console.log("Backend válasz:", response.data);
      setTermekek(response.data);
    } catch (error) {
      console.error("Hiba a termékek betöltésekor:", error);
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
      await myAxios.delete(`/termekek/${id}`);
  
      // Frissítjük a termékek listáját úgy, hogy kiszűrjük a törölt elemet
      setTermekek((prevTermekek) => prevTermekek.filter(termek => termek.id !== id));
      
    } catch (error) {
      console.error("Hiba történt a törlés során:", error);
    }
  };

  // **Termék módosítása**
  const modosit = async (id, ujAdatok) => {
    if (!id) {
      console.error("Nincs termék ID megadva a módosításhoz!");
      return;
    }

    try {
      console.log("Módosítás ID:", id, "Új adatok:", ujAdatok);
      await myAxios.put(`/termekek/${id}`, ujAdatok);
      fetchTermekek(); // Frissítjük az adatokat módosítás után
    } catch (error) {
      console.error("Hiba történt a módosítás során:", error);
    }
  };

  return (
    <AdminContext.Provider value={{ termekek, torol, modosit, fetchTermekek }}>
      {children}
    </AdminContext.Provider>
  );
}

// Hook az egyszerűbb használathoz
export function useAdminContext() {
  return useContext(AdminContext);
}
