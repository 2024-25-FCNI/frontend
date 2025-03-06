import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { KosarContext } from "../contexts/KosarContext";
import useAuthContext from "../contexts/AuthContext";

export default function Termek() {
  const { termekId } = useParams(); // URL-ből kinyert ID
  const [termek, setTermek] = useState(null);
  const { kosarba } = useContext(KosarContext);
  const { user } = useAuthContext();

  useEffect(() => {
    console.log("Lekérdezett termék ID:", termekId); // Debug log
    axios
      .get(`http://localhost:8000/api/termekek/${termekId}`) // Ellenőrizd az API URL-t
      .then((response) => {
        console.log("Termék adatok:", response.data); // Debug log
        setTermek(response.data);
      })
      .catch((error) => {
        console.error("Hiba a termék lekérdezésekor:", error);
      });
  }, [termekId]);

  if (!termek) {
    return <div>Betöltés...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>Termék részletek</h1>
      <div className="row">
        <div className="col-md-6">
          <img
            src={termek.kep}
            alt={termek.cim}
            className="img-fluid"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <h2>{termek.cim}</h2>
          <p>{termek.leiras}</p>
          <p>
            <strong>Ár:</strong> {termek.ar} Ft
          </p>
          <p>
            <strong>Hozzáférési idő:</strong> {termek.hozzaferesi_ido} nap
          </p>
          <button 
            className="btn btn-primary" onClick={() => kosarba(termek)} disabled={user && user.role === 0}>
            Kosárba
          </button>
        </div>
      </div>
    </div>
  );
}
