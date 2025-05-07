import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { myAxios } from "../api/axios";

export const AnalitikaContext = createContext();

export const AnalitikaProvider = ({ children }) => {
  const [felhasznalok, setFelhasznalok] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const csrf = () => myAxios.get("/sanctum/csrf-cookie");
  // Felhasználók lekérése az API-tól
  useEffect(() => {
    fetchFelhasznalok();
  }, []);

  const fetchFelhasznalok = async () => {
    setLoading(true);
    try {
      console.log("Felhasználók lekérése...");
      const response = await axios.get(
        "http://localhost:8000/api/felhasznalok"
      );
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
    await csrf();
    try {
      console.log(`Felhasználó törlése: ${id}`);

      const response = await myAxios.delete(`/api/felhasznalok/${id}`, {});

      if (response.status === 200) {
        setFelhasznalok((prevFelhasznalok) =>
          prevFelhasznalok.filter((felhasznalo) => felhasznalo.id !== id)
        );
        console.log("Felhasználó sikeresen törölve.");
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
