import React from "react";
import { Link } from "react-router-dom";

const VideokPublic = ({ termek }) => {
  return (
    <div className="col">
      <div className="card border-0 shadow-sm p-3" style={{ borderRadius: "20px", background: "#FBEAE5" }}>
        <Link to={`/termek/${termek.termek_id}`} className="text-decoration-none text-dark">
          <div className="position-relative">
            <img src={termek.kep} alt={termek.cim} className="card-img-top rounded" />
            <div className="position-absolute top-50 start-50 translate-middle">
              <button className="btn btn-danger rounded-circle">
                <i className="bi bi-play-fill"></i>
              </button>
            </div>
          </div>
          <div className="card-body text-center">
            <h6 className="card-title">{termek.cim}</h6>
            <p className="small">{termek.leiras}</p>
            <div className="d-flex justify-content-between align-items-center">
              <span className="fw-bold">{termek.ar}€</span>
              <i className="bi bi-bag"></i>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default VideokPublic;
