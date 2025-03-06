import React, { useContext, useState } from "react";
import { KosarContext } from "../contexts/KosarContext";
import { myAxios } from "../api/axios";
import { FaTimes } from "react-icons/fa";

export default function Fizetes() {
  const { kosar, total, torolTermek, uritKosar } = useContext(KosarContext);
  const [sikeresVasarlas, setSikeresVasarlas] = useState(false);

  const handlePayment = async (event) => {
    event.preventDefault();

    try {
      await myAxios.get("/sanctum/csrf-cookie"); // CSRF token kérés

      const response = await myAxios.post("/api/send-payment-confirmation", {
        kosar,
        total,
      });

      console.log("Sikeres fizetés:", response.data.message); // 🔍 Debug log

      // 🔥 Kosár kiürítése és sikeres állapot beállítása
      uritKosar();
      setSikeresVasarlas(true);
    } catch (error) {
      console.error("Hiba történt a fizetés során:", error);
      alert("Nem sikerült elküldeni a visszaigazoló e-mailt.");
    }
  };

  // 🔥 Ha sikeres volt a vásárlás, akkor csak ezt jelenítsük meg
  if (sikeresVasarlas) {
    return (
      <div className="container mt-5 text-center">
        <h1 className="text-success">Sikeres vásárlás!</h1>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1>Fizetés</h1>

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Termék</th>
            <th>Leírás</th>
            <th>Ár (Ft)</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {kosar.length > 0 ? (
            kosar.map((termek) => (
              <tr key={termek.termek_id}>
                <td>
                  <img
                    src={termek.kep}
                    alt={termek.cim}
                    style={{
                      width: "50px",
                      height: "50px",
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

      {/* Fizetendő végösszeg */}
      {total > 0 && (
        <div className="text-end mb-4">
          <h4>Fizetendő végösszeg: {total} Ft</h4>
        </div>
      )}

      {/* Fizetési űrlap */}
      <form onSubmit={handlePayment}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Teljes név</label>
          <input type="text" className="form-control" id="name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="cardNumber" className="form-label">Kártyaszám</label>
          <input type="text" className="form-control" id="cardNumber" required />
        </div>
        <div className="mb-3">
          <label htmlFor="expirationDate" className="form-label">Lejárati dátum</label>
          <input type="text" className="form-control" id="expirationDate" required />
        </div>
        <div className="mb-3">
          <label htmlFor="cvv" className="form-label">CVV</label>
          <input type="text" className="form-control" id="cvv" required />
        </div>
        <button type="submit" className="btn btn-success">Fizetés</button>
      </form>
    </div>
  );
}
