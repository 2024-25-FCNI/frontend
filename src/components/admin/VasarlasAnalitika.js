import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

export default function VasarlasAnalitika() {
  const [termekek, setTermekek] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rendezes, setRendezes] = useState("desc"); // "desc" = legtöbbet vásárolt elöl, "asc" = legkevesebbet vásárolt elöl

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:8000/api/vasarlasok-analitika");
        console.log("API válasz:", response.data);
        setTermekek(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Nem sikerült lekérni a vásárlási adatokat:", error);
        setError("Nem sikerült betölteni az adatokat.");
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Rendezési funkció
  const rendezesModositas = (irany) => {
    const rendezettTermekek = [...termekek].sort((a, b) => {
      return irany === "asc"
        ? a.darabszam - b.darabszam
        : b.darabszam - a.darabszam;
    });
    setTermekek(rendezettTermekek);
    setRendezes(irany);
  };

  // Összbevétel kiszámítása
  const teljesBevetel = termekek.reduce((osszeg, termek) => osszeg + (termek.osszBevetel || 0), 0);

  if (loading) {
    return <div>Betöltés...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1>Vásárlási Analitika</h1>

      {/* Rendezés választó */}
      <div className="mb-3">
        <label className="form-label">Rendezés:</label>
        <select
          className="form-select"
          value={rendezes}
          onChange={(e) => rendezesModositas(e.target.value)}
        >
          <option value="desc">Legtöbbet vásárolt elöl</option>
          <option value="asc">Legkevesebbet vásárolt elöl</option>
        </select>
      </div>

      {/* Termékek táblázata */}
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Termék</th>
            <th>Darabszám</th>
            <th>Összbevétel (Ft)</th>
          </tr>
        </thead>
        <tbody>
          {termekek.map((termek, index) => (
            <tr key={index}>
              <td>{termek.cim}</td>
              <td>{termek.darabszam} db</td>
              <td>{(termek.osszBevetel || 0).toLocaleString()} Ft</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Összes bevétel */}
      <div className="alert alert-primary text-center">
        <h4>Teljes bevétel: {teljesBevetel.toLocaleString()} Ft</h4>
      </div>
    </div>
  );
}
