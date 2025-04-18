import React, { useContext } from "react";
import { KosarContext } from "../../contexts/KosarContext";
import { Link, useNavigate } from "react-router-dom";
import "./Kosar.css";
import { FaTimes } from "react-icons/fa";
import useAuthContext from "../../contexts/AuthContext";

function Kosar({ toggleKosar }) {
  const { total, kosar, torolTermek } = useContext(KosarContext);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleRemove = (termek_id) => {
    torolTermek(termek_id);
  };

  const handleCheckout = () => {
    toggleKosar(); // Bezárja a kosarat
    if (user) {
      navigate("/fizetes"); // Ha van bejelentkezett user, a fizetés oldalra megy
    } else {
      navigate("/bejelentkezes"); // Ha nincs, a bejelentkezés oldalra megy
    }
  };

  return (
    <div className="kosar-container open">
      <button className="close-btn" onClick={toggleKosar}>
        <FaTimes />
      </button>

      {/* Kosár címsor */}
      <h3 className="kosar-title">Kosár</h3>

      <ul className="list-group kosar-list">
        {kosar.length > 0 ? (
          kosar.map((termek) => (
            <li className="kosar-item" key={termek.termek_id}>
              <div className="kosar-img-container">
                <img src={termek.kep} alt={termek.cim} className="kosar-img" />
              </div>
              <div className="kosar-info">
                <span className="termek-cim">{termek.cim}</span>
                <span className="termek-ar">{termek.ar} Ft</span>
              </div>
              <button className="remove-btn" onClick={() => handleRemove(termek.termek_id)}>
                <FaTimes />
              </button>
            </li>
          ))
        ) : (
          <p className="text-muted text-center mt-3">A kosár üres.</p>
        )}
      </ul>

      {total > 0 && (
        <>
          <p className="fizetendo">Fizetendő: <span>{total} Ft</span></p>
          <button 
            className="checkout-btn" 
            onClick={handleCheckout}
            disabled={user && user.role === 0}
          >
            Tovább a fizetésre
          </button>
        </>
      )}
    </div>
  );
}

export default Kosar;
