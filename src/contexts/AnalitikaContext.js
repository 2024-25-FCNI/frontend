import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AnalitikaContext = createContext();

export const AnalitikaProvider = ({ children }) => {
  const [felhasznalok, setFelhasznalok] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Felhasználók lekérése az API-tól
  useEffect(() => {
    fetchFelhasznalok();
  }, []);

  const fetchFelhasznalok = async () => {
    setLoading(true);
    try {
      console.log("Felhasználók lekérése...");
      const response = await axios.get("http://localhost:8000/api/felhasznalok");
      console.log("API válasz:", response.data);
      setFelhasznalok(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Nem sikerült betölteni a felhasználókat:", error);
      setError("Nem sikerült betölteni a felhasználókat.");
      setLoading(false);
    }
  };
  

  // Felhasználó törlése
  const torolFelhasznalo = async (id) => {
    if (!id) {
      console.error("HIBA: A törlendő felhasználó ID-je undefined!");
      return;
    }
  
    try {
      console.log(`Felhasználó törlése: ${id}`);
  
      const response = await axios.delete(`http://localhost:8000/api/felhasznalok/${id}`, {
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
      });
  
      if (response.status === 200) {
        console.log("Felhasználó sikeresen törölve.");
  
        // Frissítjük az állapotot, hogy eltűnjön a táblázatból is
        setFelhasznalok((prevFelhasznalok) =>
          prevFelhasznalok.filter((felhasznalo) => felhasznalo.user_id !== id)
        );
      } else {
        console.error("Nem sikerült törölni a felhasználót.");
      }
    } catch (error) {
      console.error("Hiba történt a törlés során:", error);
    }
  };

  // Vásárlások lekérése felhasználó szerint
  const fetchVasarlasok = async (id) => {
    try {
      const response = await axios.get(`/api/felhasznalok/${id}/vasarlasok`);
      return response.data; // Visszaadjuk a vásárlásokat
    } catch (error) {
      console.error("Nem sikerült lekérni a vásárlásokat:", error);
      return [];
    }
  };

  return (
    <AnalitikaContext.Provider
      value={{
        felhasznalok,
        loading,
        error,
        torolFelhasznalo,
        fetchVasarlasok,
      }}
    >
      {children}
    </AnalitikaContext.Provider>
  );
};
