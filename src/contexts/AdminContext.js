import { createContext, useContext, useState, useEffect } from "react";
import { myAxios } from "./MyAxios"; 

// Kontextus létrehozása
const AdminContext = createContext();

// Kontextus provider komponens
export function AdminProvider({ children }) {
  const [termekek, setTermekek] = useState([]);

  // CSRF token biztosítása
  const csrf = () => myAxios.get("/sanctum/csrf-cookie");
  

  // Termékek betöltése az API-ból
  useEffect(() => {
    fetchTermekek();
  }, []);

  const fetchTermekek = async () => {
    try {
      console.log("Termékek lekérése...");
      const response = await myAxios.get("/api/termekek"); // Ellenőrizd, hogy 'api/' kell-e
      console.log("API válasz:", response.data);
      setTermekek(response.data);
    } catch (error) {
      console.error("Hiba a termékek betöltésekor:", error);
    }
  };

  const torolVideo = async (id) => {
    try {
      await myAxios.get("/sanctum/csrf-cookie"); 
      console.log(`Videó törlése: ${id}`);
  
      const response = await myAxios.delete(`/api/termekek/${id}`, {
        withCredentials: true, 
      });
  
      if (response.status === 200) {
        setTermekek((prevTermekek) =>
          prevTermekek.filter((termek) => termek.termek_id !== id)
        );
        console.log("Videó sikeresen törölve.");
      } else {
        console.error("Nem sikerült törölni a videót.");
      }
    } catch (error) {
      console.error("Hiba történt a törlés során:", error);
    }
  };

  return (
    <AdminContext.Provider value={{ termekek, torolVideo, fetchTermekek }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminContext() {
  return useContext(AdminContext);
}
