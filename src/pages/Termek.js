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
    : "/placeholder.jpg";

  return (
    <div className="container mt-5">
      <h1>Termék részletek</h1>
      <div className="row">
        <div className="col-md-6">
          {termek.kep && (
            <img
              src={imageUrl}
              alt={termek.cim}
              className="img-fluid"
              style={{ maxHeight: "400px", objectFit: "cover" }}
              onError={(e) => (e.target.src = "/placeholder.jpg")}
            />
          )}
        </div>
        <div className="col-md-6">
          <h2>{termek.cim}</h2>
          <p>{vasarolt ? termek.leiras : termek.bemutatas}</p>
          <p>
            <strong>Ár:</strong> {termek.ar} Ft
          </p>
          <p>
            <strong>Hozzáférési idő:</strong> {termek.hozzaferesi_ido} nap
          </p>

          <button
            className="btn btn-primary"
            onClick={() => kosarba(termek)}
            disabled={user && user.role === 0}
          >
            Kosárba
          </button>
        </div>
      </div>

      <div className="mt-4">
        {vasarolt ? (
          <video
            src={`http://localhost:8000/videok/${termek.url}`}
            width="640"
            height="360"
            controls
            controlsList="nodownload"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            style={{ borderRadius: "1em" }}
          />
        ) : (
          <p>A videó csak vásárlás után érhető el.</p>
        )}
      </div>
    </div>
  );
}
