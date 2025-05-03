import React, { useContext, useState, useEffect } from "react";
import { KosarContext } from "../contexts/KosarContext";
import { myAxios } from "../api/axios";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/Fizetes.css";

export default function Fizetes() {
  const { kosar, total, torolTermek, uritKosar } = useContext(KosarContext);
  const [sikeresVasarlas, setSikeresVasarlas] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async (event) => {
    event.preventDefault();

    let folyamat = "Kezdés"; // Állapot követés

    try {
      folyamat = "CSRF cookie lekérése";
      await myAxios.get("/sanctum/csrf-cookie");

      folyamat = "Vásárlási adatok mentése";
      const vasarlasValasz = await myAxios.post("/api/vasarlas", {
        vasarlas: {
          osszeg: total,
          datum: new Date().toISOString().split("T")[0],
        },
        tetelek: kosar.map((termek) => ({
          termek_id: termek.termek_id,
        })),
      });

      if (vasarlasValasz.status !== 201) {
        throw new Error(
          "A vásárlás mentése nem sikerült (nem 201-es státuszkód)."
        );
      }

      folyamat = "E-mail küldés";
      await myAxios.post("/api/send-payment-confirmation", {
        kosar,
        total,
      });

      folyamat = "Kosár ürítése és sikeres vásárlás jelzése";
      uritKosar();
      setSikeresVasarlas(true);
    } catch (error) {
      console.error(
        `❌ Hiba történt a fizetés során. Folyamat: ${folyamat}`,
        error
      );
      alert(
        `Hiba történt a következő lépésnél: ${folyamat}. Kérlek, próbáld újra!`
      );
    }
  };

  useEffect(() => {
    if (sikeresVasarlas) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [sikeresVasarlas, navigate]);

  if (sikeresVasarlas) {
    return (
      <div className="container mt-5 text-center">
        <h1 className="text-success">Sikeres vásárlás!</h1>
        <p>Átirányítás a kezdőlapra...</p>
      </div>
    );
  }

  return (
    <div className="fizetes-container">
      <div className="fizetes-box">
        <h1>Fizetés</h1>

        <div className="fizetes-table-wrapper">
          <table className="table table-bordered mt-4 fizetes-table">
            <thead>
              <tr>
                <th>Termék</th>
                <th>Cím</th>
                <th>Ár (Ft)</th>
                <th>Törlés</th>
              </tr>
            </thead>
            <tbody>
              {kosar.length > 0 ? (
                kosar.map((termek) => (
                  <tr
                    key={termek.termek_id}
                    onClick={() => navigate(`/termek/${termek.termek_id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>
                      <img
                        src={
                          termek.kep
                            ? `http://localhost:8000/kepek/${termek.kep}`
                            : "/placeholder.png"
                        }
                        alt={termek.cim}
                        style={{
                          width: "4em",
                          height: "3em",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td>{termek.cim}</td>
                    <td>{termek.ar}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => torolTermek(termek.termek_id)}
                      >
                        <FaTimes />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    A kosár üres.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {total > 0 && (
          <div className="vegosszeg">Fizetendő végösszeg: {total} Ft</div>
        )}

        <form onSubmit={handlePayment} className="fizetesi-urlap">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Teljes név
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              pattern="[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]{2,}(?: [A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]{2,})+"
              title="Adj meg legalább két nevet, pl. Kiss Béla"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label">
              Kártyaszám
            </label>
            <input
              type="text"
              className="form-control"
              id="cardNumber"
              required
              pattern="\d{16}"
              title="Adj meg 16 számjegyet szóköz nélkül"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="expirationDate" className="form-label">
              Lejárati dátum
            </label>
            <input
              type="text"
              className="form-control"
              id="expirationDate"
              required
              pattern="(0[1-9]|1[0-2])\/\d{2}"
              title="Formátum: MM/YY, pl. 08/25"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cvv" className="form-label">
              CVV
            </label>
            <input
              type="text"
              className="form-control"
              id="cvv"
              required
              pattern="\d{3,4}"
              title="3 vagy 4 számjegy"
            />
          </div>
          <button type="submit" className="btn btn-success">
            Fizetés
          </button>
        </form>
      </div>
    </div>
  );
}
