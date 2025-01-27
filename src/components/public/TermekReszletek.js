import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { KosarContext } from "../../contexts/KosarContext";

export default function TermekReszletek() {
  const { termekId } = useParams(); // Az URL-ből kinyert termék ID
  const [termek, setTermek] = useState(null);
  const { kosarba } = useContext(KosarContext); // Kosárba helyezés függvény

  useEffect(() => {
    // API hívás a termék adatainak lekérdezéséhez
    axios
      .get(`/api/termekek/${termekId}`)
      .then((response) => {
        setTermek(response.data);
      })
      .catch((error) => {
        console.error("Hiba a termék adatainak lekérdezésekor:", error);
      });
  }, [termekId]);

  if (!termek) {
    return <div>Betöltés...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>{termek.cim}</h1>
      <img src={termek.kep} alt={termek.cim} style={{ maxWidth: "100%" }} />
      <p>{termek.leiras}</p>
      <p>Ár: {termek.ar} Ft</p>
      <p>Hozzáférési idő: {termek.hozzaferesi_ido} nap</p>
      <button
        className="btn btn-primary mt-3"
        onClick={() => kosarba(termek)} // Kosárba helyezés
      >
        Kosárba
      </button>
    </div>
  );
}
