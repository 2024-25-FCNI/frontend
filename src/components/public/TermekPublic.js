import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { KosarContext } from "../../contexts/KosarContext";

export function TermekPublic(props) {
  const { kosarba } = useContext(KosarContext);

  return (
    <div className="col">
      <div className="card h-100">
        <Link
          to={`/termek/${props.termek.termek_id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="card-header bg-transparent border-success">
            <h5 className="card-title">{props.termek.cim}</h5>
          </div>
          <div className="card-body">
            <img
              src={props.termek.kep}
              alt={props.termek.cim}
              className="card-img-top"
            />
            <p>{props.termek.leiras}</p>
          </div>
        </Link>
        <div className="card-footer">
          <button
            className="btn btn-primary card-link"
            onClick={() => kosarba(props.termek)}
          >
            Kosárba
          </button>
          <b className="card-link">{props.termek.ar} Ft</b>
        </div>
      </div>
    </div>
  );
}

export default TermekPublic;
