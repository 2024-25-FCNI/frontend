import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { KosarContext } from "../../contexts/KosarContext";
import useAuthContext from "../../contexts/AuthContext";

const VideokPublic = (props) => {
  const { kosarba } = useContext(KosarContext);
  const { user } = useAuthContext();

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex">
      <div className="card border-0 shadow-sm videok-card p-3 d-flex flex-column w-100">
        <Link
          to={`/termek/${props.termek.termek_id}`}
          className="text-decoration-none text-dark"
        >
          <div className="position-relative">
            <img
              src={props.termek.kep}
              alt={props.termek.cim}
              className="card-img-top rounded"
            />
          </div>

          <div className="card-body d-flex flex-column text-start flex-grow-1">
            <h6
              className="card-title text-wrap"
              style={{ fontSize: "1.1em", minHeight: "2.4em" }}
            >
              {props.termek.cim}
            </h6>
            <p
              className="small text-wrap flex-grow-1"
              style={{ fontSize: "0.9em", minHeight: "3.6em", overflow: "hidden" }}
            >
              {props.termek.leiras}
            </p>
          </div>
        </Link>

        <div className="d-flex justify-content-between align-items-center px-2 pb-2">
          <span className="fw-bold" style={{ fontSize: "1.1em" }}>
            {props.termek.ar}€
          </span>

          <button
            className="border-0 bg-transparent d-flex align-items-center justify-content-center kosar-gomb"
            onClick={() => kosarba(props.termek)}
            disabled={user && user.role === 0}
          >
            <i className="bi bi-cart3"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideokPublic;
