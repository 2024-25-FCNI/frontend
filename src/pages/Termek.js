import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { KosarContext } from "../contexts/KosarContext";
import useAuthContext from "../contexts/AuthContext";
import "../styles/Termek.css";

export default function Termek() {
  const { termekId } = useParams();
  const [termek, setTermek] = useState(null);
  const [vasarolt, setVasarolt] = useState(false);
  const { kosarba } = useContext(KosarContext);
  const { user } = useAuthContext();

  useEffect(() => {
    // Termék betöltés
    axios
      .get(`http://localhost:8000/api/termekek/${termekId}`)
      .then((response) => {
        console.log("Termék adatok:", response.data);
        setTermek(response.data);
      })
      .catch((error) => {
        console.error("Hiba a termék lekérdezésekor:", error);
      });

    // Vásárlás ellenőrzés csak ha van bejelentkezett felhasználó
    if (user?.id) {
      axios
        .get(`http://localhost:8000/api/ellenoriz-vasarlas/${termekId}`, {
          withCredentials: true,
        })
        .then((response) => {
          setVasarolt(response.data.megvette);
        })
        .catch((error) => {
          console.error("Vásárlás ellenőrzés hiba:", error);
        });
    } else {
      // 🔹 Ha nincs user, alapértelmezés szerint nincs jogosultság
      setVasarolt(false);
    }
  }, [termekId, user]);

  // 🔹 Ha az API még nem töltötte be az adatokat, jelenítsünk meg egy "Betöltés..." üzenetet
  if (!termek) {
    return <div>Betöltés...</div>;
  }

  // 🔹 Ellenőrizzük, hogy a `termek.kep` létezik-e, mielőtt használjuk
  const imageUrl = termek.kep
    ? `http://localhost:8000/kepek/${termek.kep}`
    : "/placeholder.png";

  return (
    <div className="termek-container">
      <div className="termek-card">
        <img
          src={imageUrl}
          alt={termek.cim}
          className="termek-kep"
          onError={(e) => (e.target.src = "/placeholder.png")}
        />

        <div className="termek-leiras">
          <h2>{termek.cim}</h2>

          {user?.role === 0 ? (
            <>
              <p>
                <strong>Bemutatás:</strong> {termek.bemutatas}
              </p>
              <p>
                <strong>Leírás:</strong> {termek.leiras}
              </p>
            </>
          ) : (
            <p>{vasarolt ? termek.leiras : termek.bemutatas}</p>
          )}

          <p className="ar">Ár: {termek.ar} Ft</p>
          <p>Hozzáférési idő: {termek.hozzaferesi_ido} nap</p>

          {user?.role !== 0 && !vasarolt && (
            <button className="btn" onClick={() => kosarba(termek)}>
              Kosárba
            </button>
          )}
        </div>
      </div>

      <div className="termek-video">
        {user?.role === 0 || vasarolt ? (
          <video
            src={`http://localhost:8000/videok/${termek.url}`}
            controls
            controlsList="nodownload"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
          />
        ) : (
          <p>A videó csak vásárlás után érhető el.</p>
        )}
      </div>
    </div>
  );
}
