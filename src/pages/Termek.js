import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { KosarContext } from "../contexts/KosarContext";

export default function Termek() {
  const { termekId } = useParams(); // Az URL-ből kinyert termék ID
  const [termek, setTermek] = useState(null); // Az aktuális termék adatai
  const { kosarba } = useContext(KosarContext); // Kosárba helyezés függvény

  useEffect(() => {
    // API hívás a termék adatainak lekérdezéséhez
    axios
      .get(`/api/termekek/${termekId}`) // Az API végpont a termék adatokhoz
      .then((response) => {
        setTermek(response.data); // A termék adatai mentése
      })
      .catch((error) => {
        console.error("Hiba a termék adatainak lekérdezésekor:", error);
      });
  }, [termekId]);

  if (!termek) {
    return <div>Betöltés...</div>; // Betöltési állapot
  }

  return (
    <div className="container mt-5">
      <h1>Termék részletek</h1>
      <div className="row">
        <div className="col-md-6">
          {/* Termék kép */}
          <img
            src={termek.kep}
            alt={termek.cim}
            className="img-fluid"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          {/* Termék adatok */}
          <h2>{termek.cim}</h2>
          <p>{termek.leiras}</p>
          <p>
            <strong>Ár:</strong> {termek.ar} Ft
          </p>
          <p>
            <strong>Hozzáférési idő:</strong> {termek.hozzaferesi_ido} nap
          </p>
          {/* Kosárba helyezés gomb */}
          <button
            className="btn btn-primary"
            onClick={() => kosarba(termek)}
          >
            Kosárba
          </button>
        </div>
      </div>
    </div>
  );
}
