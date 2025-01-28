import React, { useContext } from "react";
import { KosarContext } from "../../contexts/KosarContext";
import "./Kosar.css";
import { FaTimes } from "react-icons/fa";

function Kosar({ toggleKosar }) {
  const { total, kosar, torolTermek } = useContext(KosarContext);

  const handleRemove = (termek_id) => {
    torolTermek(termek_id);
  };

  return (
    <div className="kosar-container">
      {/* X ikon a bezáráshoz */}
      <button className="close-btn" onClick={toggleKosar}>
        <FaTimes />
      </button>

      {/* Kosár címsor */}
      <h3 className="kosar-title">Kosár</h3>

      <ul className="list-group kosar-list">
        {kosar.length > 0 ? (
          kosar.map((termek) => (
            <li className="row border p-2 align-items-center kosar-item" key={termek.termek_id}>
              <div className="col-3">
                <img src={termek.kep} alt={termek.cim} className="img-fluid rounded" />
              </div>
              <div className="col-5">
                <span className="termek-cim">{termek.cim}</span>
              </div>
              <div className="col-2">
                <span className="termek-ar">{termek.ar} Ft</span>
              </div>
              <div className="col-2 text-end">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemove(termek.termek_id)}
                >
                  <FaTimes />
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-muted text-center mt-3">A kosár üres.</p>
        )}
      </ul>

      {total > 0 && <p className="text-end mt-3 fizetendo">Fizetendő: {total} Ft</p>}
    </div>
  );
}

export default Kosar;
