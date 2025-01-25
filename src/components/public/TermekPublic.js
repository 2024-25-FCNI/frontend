import React, { useContext } from "react";
import { KosarContext } from "../../contexts/KosarContext";

export function TermekPublic(props) {
  const {kosarba} =useContext(KosarContext)
  return (
    <div className="col">
      <div className="card h-100">
        <div className="card-header bg-transparent border-success">
          <h5 className="card-title ">{props.termek.cim}</h5>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              {" "}
              <img src={props.termek.kep} alt="" className="card-img-top" />
            </li>
            <li className="list-group-item">{props.termek.leiras}</li>
          </ul>
        </div>
         <div className="card-footer">
          <button className="btn btn-primary card-link" onClick={()=>{kosarba(props.termek)}}>Kosárba</button>
          <b className="card-link ">{props.termek.ar} €</b>
        </div> 
      </div>
    </div>
  );
}

export default TermekPublic;