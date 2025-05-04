import React, { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/Analitika.css";

export default function VasarlasAnalitika() {
  const [termekek, setTermekek] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rendezes, setRendezes] = useState("desc");
  const [kezdodatum, setKezdodatum] = useState(null);
  const [vegdatum, setVegdatum] = useState(null);

  useEffect(() => {
    fetchData();
  }, [kezdodatum, vegdatum]);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/vasarlasok-analitika",
        {
          params: {
            kezdodatum: kezdodatum
              ? kezdodatum.toISOString().split("T")[0]
              : "",
            vegdatum: vegdatum ? vegdatum.toISOString().split("T")[0] : "",
          },
        }
      );
      setTermekek(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Nem sikerült lekérni a vásárlási adatokat:", error);
      setError("Nem sikerült betölteni az adatokat.");
      setLoading(false);
    }
  }

  const rendezesModositas = (irany) => {
    const rendezettTermekek = [...termekek].sort((a, b) => {
      return irany === "asc"
        ? a.darabszam - b.darabszam
        : b.darabszam - a.darabszam;
    });
    setTermekek(rendezettTermekek);
    setRendezes(irany);
  };

  const teljesBevetel = termekek.reduce(
    (osszeg, termek) => osszeg + (termek.osszBevetel || 0),
    0
  );

  const exportCSV = () => {
    const csvData = ["Termék,Név,Darabszám,Összbevétel (Ft)"];
    termekek.forEach((termek) => {
      csvData.push(
        `${termek.termek_id},${termek.cim},${termek.darabszam},${termek.osszBevetel}`
      );
    });
    const csvString = csvData.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "vasarlas_analitika.csv");
  };

  const data = {
    labels: termekek.map((t) => t.cim),
    datasets: [
      {
        label: "Eladások száma",
        data: termekek.map((t) => t.darabszam),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  if (loading) return <div>Betöltés...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Vásárlási Analitika</h1>

      {/* Dátumszűrés */}
      <div className="szures-mezok">
        <label className="me-2">Szűrés időszak szerint:</label>
        <DatePicker
          selected={kezdodatum}
          onChange={(date) => setKezdodatum(date)}
          selectsStart
          startDate={kezdodatum}
          endDate={vegdatum}
          maxDate={new Date()}
          className="form-control me-2"
          placeholderText="Kezdő dátum"
        />
        <DatePicker
          selected={vegdatum}
          onChange={(date) => {
            if (date) date.setHours(23, 59, 59, 999);
            setVegdatum(date);
          }}
          selectsEnd
          startDate={kezdodatum}
          endDate={vegdatum}
          minDate={kezdodatum}
          maxDate={new Date()}
          className="form-control me-2"
          placeholderText="Vég dátum"
        />
        <button
          className="btn btn-secondary szures-torlese-btn"
          onClick={() => {
            setKezdodatum(null);
            setVegdatum(null);
          }}
        >
          Szűrés törlése
        </button>
      </div>

      {/* Rendezés */}
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

      {/* Grafikon */}
      <div className="mb-3">
        <h3>Eladások grafikonon</h3>
        <Bar data={data} />
      </div>

      {/* Táblázat */}
      <div className="reszponziv-tabla">
        <table className="ana-table table-striped mt-3">
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
      </div>

      {/* Összbevétel + export */}
      <div className="alert alert-primary text-center">
        <h4>Teljes bevétel: {teljesBevetel.toLocaleString()} Ft</h4>
      </div>
      <button className="btn btn-secondary" onClick={exportCSV}>
        📥 Exportálás CSV-be
      </button>
    </div>
  );
}
