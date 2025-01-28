import React, { useContext, useEffect, useState } from "react";
import { AnalitikaContext } from "../../contexts/AnalitikaContext";
import axios from "axios";

export default function VasarlasAnalitika() {
  const { loading, error } = useContext(AnalitikaContext);
  const [termekek, setTermekek] = useState([]);
  const [osszesBevetel, setOsszesBevetel] = useState(0);

  useEffect(() => {
    fetchVasarlasiAdatok();
  }, []);

  const fetchVasarlasiAdatok = async () => {
    try {
      const response = await axios.get("/api/vasarlasok"); // API végpont a vásárlási adatokhoz
      const vasarlasok = response.data;

      // Termékek vásárlási adatai
      const termekStat = {};

      vasarlasok.forEach((vasarlas) => {
        vasarlas.termekek.forEach((termek) => {
          if (!termekStat[termek.termek_id]) {
            termekStat[termek.termek_id] = {
              ...termek,
              vasarlasokSzama: 0,
            };
          }
          termekStat[termek.termek_id].vasarlasokSzama += 1;
        });
      });

      // Összes bevétel kiszámítása
      const bevetel = Object.values(termekStat).reduce(
        (sum, termek) => sum + termek.ar * termek.vasarlasokSzama,
        0
      );

      setTermekek(Object.values(termekStat));
      setOsszesBevetel(bevetel);
    } catch (error) {
      console.error("Hiba a vásárlási adatok lekérésekor:", error);
    }
  };

  if (loading) {
    return <div>Betöltés...</div>;
  }

  if (error) {
    return <div>Hiba történt: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1>Vásárlási Analitika</h1>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Termék</th>
            <th>Ár (Ft)</th>
            <th>Vásárlások száma</th>
            <th>Bevétel (Ft)</th>
          </tr>
        </thead>
        <tbody>
          {termekek.map((termek) => (
            <tr key={termek.termek_id}>
              <td>{termek.termek_id}</td>
              <td>{termek.cim}</td>
              <td>{termek.ar} Ft</td>
              <td>{termek.vasarlasokSzama}</td>
              <td>{termek.ar * termek.vasarlasokSzama} Ft</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="text-end mt-3">Összes bevétel: {osszesBevetel} Ft</h3>
    </div>
  );
}
