import React from "react";
import { Link } from "react-router-dom";

const VideokPublic = ({ termek }) => {
  return (
    <div className="col">
      <div className="card border-0 shadow-sm videok-card p-3">
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
          </div>
        </Link>

        {/* Ár és kosár ikon a jobb alsó sarokban */}
        <div className="d-flex justify-content-end align-items-center px-2 pb-2">
          <span className="fw-bold me-2">{termek.ar}€</span>
          <i className="bi bi-cart3"></i> {/* Bootstrap kosár ikon */}
        </div>
      </div>
    </div>
  );
};

export default VideokPublic;
