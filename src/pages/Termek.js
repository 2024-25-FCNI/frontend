import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { KosarContext } from "../contexts/KosarContext";
import useAuthContext from "../contexts/AuthContext";

export default function Termek() {
  const { termekId } = useParams();
  const [termek, setTermek] = useState(null);
  const [vasarolt, setVasarolt] = useState(false);
  const { kosarba } = useContext(KosarContext);
  const { user } = useAuthContext();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/termekek/${termekId}`)
      .then((response) => {
        console.log("Termék adatok:", response.data);
        setTermek(response.data);
      })
      .catch((error) => {
        console.error("Hiba a termék lekérdezésekor:", error);
      });

    if (user) {
      axios.get(`http://localhost:8000/api/ellenoriz-vasarlas/${termekId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      })
      .then((response) => {
        setVasarolt(response.data.megvette);
      })
      .catch((error) => {
        console.error("Hiba a vásárlás ellenőrzésekor:", error);
      });
    }
  }, [termekId, user]); // 🔹 Biztosítja, hogy ne legyen végtelen renderelés!

  if (!termek) {
    return <div>Betöltés...</div>;
  }

  // 🔹 Kép URL átalakítása (Google Drive és relatív útvonal támogatás)
  let imageUrl = termek.kep;
  if (imageUrl.includes("drive.google.com")) {
    const driveFileId = imageUrl.match(/[-\w]{25,}/); // Google Drive fájlazonosító kivétele
    if (driveFileId) {
      imageUrl = `https://drive.google.com/uc?export=view&id=${driveFileId[0]}`;
    }
  } else if (!imageUrl.startsWith("http")) {
    imageUrl = `http://localhost:8000${imageUrl}`; // Relatív URL-ek esetén
  }

  return (
    <div className="container mt-5">
      <h1>Termék részletek</h1>
      <div className="row">
        <div className="col-md-6">
          {/* 🔹 Ha a user nem vásárolta meg, mutassuk a képet */}
          {!vasarolt && termek.kep && (
            <img
              src={imageUrl}
              alt={termek.cim}
              className="img-fluid"
              style={{ maxHeight: "400px", objectFit: "cover" }}
              onError={(e) => e.target.src = "/placeholder.jpg"} // Ha nem található, helyettesítjük egy alapértelmezett képpel
            />
          )}
        </div>
        <div className="col-md-6">
          <h2>{termek.cim}</h2>
          <p>{termek.leiras}</p>
          <p><strong>Ár:</strong> {termek.ar} Ft</p>
          <p><strong>Hozzáférési idő:</strong> {termek.hozzaferesi_ido} nap</p>

          <button
            className="btn btn-primary"
            onClick={() => kosarba(termek)}
            disabled={user && user.role === 0}
          >
            Kosárba
          </button>
        </div>
      </div>

      {/* 🔹 Videó csak akkor jelenjen meg, ha a felhasználó megvette */}
      <div className="mt-4">
        <h3>Termék videó</h3>
        {vasarolt ? (
          <iframe
            src={termek.url}
            width="640"
            height="360"
            allowFullScreen
          ></iframe>
        ) : (
          <p>Vásárlás után lesz elérhető a videó.</p>
        )}
      </div>
    </div>
  );
}
