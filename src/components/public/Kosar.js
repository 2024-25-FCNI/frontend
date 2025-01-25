import React, { useContext } from "react";
import { KosarContext } from "../../contexts/KosarContext";
import "./Kosar.css";
import { FaTimes } from "react-icons/fa"; 

function Kosar() {
  const { total, kosar, torolTermek } = useContext(KosarContext); 

  const handleRemove = (id) => {
    torolTermek(id); 
  };

  return (
    <div className="kosar-container">
      <ul className="list-group">
        {kosar.length > 0 ? (
          kosar.map((termek) => (
            <li className="row border p-2 align-items-center" key={termek.id}>
                
              <div className="col-sm-3">
                <img
                  src={termek.image}
                  alt={termek.title}
                  className="img-fluid"
                />
              </div>
              <div className="col-sm-5">
                <span>{termek.title}</span>
              </div>
              <div className="col-sm-2">
                <span>{termek.price} Ft</span>
              </div>
              <div className="col-sm-2 text-end">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemove(termek.id)}
                >
                  <FaTimes />
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-muted">A kosár üres.</p>
        )}
      </ul>
      {total > 0 && <p className="text-end mt-3">Fizetendő: {total} Ft</p>}
    </div>
  );
}

export default Kosar;