import React, { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver"; // CSV/PDF exporthoz
import { Bar } from "react-chartjs-2"; // Grafikonokhoz
import "chart.js/auto"; // Chart.js automatikus beállítása

export default function VasarlasAnalitika() {
  const [termekek, setTermekek] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rendezes, setRendezes] = useState("desc");
  const [kezdodatum, setKezdodatum] = useState(""); // Szűrés kezdő dátuma
  const [vegdatum, setVegdatum] = useState(""); // Szűrés vége dátuma

  useEffect(() => {
    fetchData();
  }, [kezdodatum, vegdatum]);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/vasarlasok-analitika", {
        params: { kezdodatum, vegdatum }, // Küldjük a szűrési feltételeket
      });
      setTermekek(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Nem sikerült lekérni a vásárlási adatokat:", error);
      setError("Nem sikerült betölteni az adatokat.");
      setLoading(false);
    }
  }

  // Rendezés módosítása
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

  // **CSV Exportálás**
  const exportCSV = () => {
    const csvData = ["Termék,Név,Darabszám,Összbevétel (Ft)"];
    termekek.forEach(termek => {
      csvData.push(`${termek.termek_id},${termek.cim},${termek.darabszam},${termek.osszBevetel}`);
    });
    const csvString = csvData.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "vasarlas_analitika.csv");
  };

  // **Grafikon beállítások**
  const data = {
    labels: termekek.map(t => t.cim),
    datasets: [
      {
        label: "Eladások száma",
        data: termekek.map(t => t.darabszam),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  if (loading) return <div>Betöltés...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h1>Vásárlási Analitika</h1>

      {/* **Dátumszűrés** */}
      <div className="mb-3">
        <label>Kezdő dátum:</label>
        <input type="date" className="form-control" value={kezdodatum} onChange={(e) => setKezdodatum(e.target.value)} />
        <label className="mt-2">Vég dátum:</label>
        <input type="date" className="form-control" value={vegdatum} onChange={(e) => setVegdatum(e.target.value)} />
      </div>

      {/* **Rendezés** */}
      <div className="mb-3">
        <label className="form-label">Rendezés:</label>
        <select className="form-select" value={rendezes} onChange={(e) => rendezesModositas(e.target.value)}>
          <option value="desc">Legtöbbet vásárolt elöl</option>
          <option value="asc">Legkevesebbet vásárolt elöl</option>
        </select>
      </div>

      {/* **Grafikon** */}
      <div className="mb-3">
        <h3>Eladások grafikonon</h3>
        <Bar data={data} />
      </div>

      {/* **Táblázat** */}
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

      {/* **Összes bevétel és export gombok** */}
      <div className="alert alert-primary text-center">
        <h4>Teljes bevétel: {teljesBevetel.toLocaleString()} Ft</h4>
      </div>
      <button className="btn btn-secondary" onClick={exportCSV}>📥 Exportálás CSV-be</button>
    </div>
  );
}
