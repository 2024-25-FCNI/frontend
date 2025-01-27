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
      const response = await axios.get("/api/felhasznalok");
      setFelhasznalok(response.data);
      setLoading(false);
    } catch (error) {
      setError("Nem sikerült betölteni a felhasználókat.");
      setLoading(false);
    }
  };

  // Felhasználó törlése
  const torolFelhasznalo = async (id) => {
    try {
      await axios.delete(`/api/felhasznalok/${id}`);
      // Frissítsük a felhasználók listáját a törlés után
      setFelhasznalok(felhasznalok.filter((felhasznalo) => felhasznalo.id !== id));
    } catch (error) {
      console.error("Nem sikerült törölni a felhasználót:", error);
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
