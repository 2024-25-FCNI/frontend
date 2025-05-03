import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { KosarContext } from "../../contexts/KosarContext";
import useAuthContext from "../../contexts/AuthContext";
 
export function TermekPublic(props) {
  const { kosarba } = useContext(KosarContext);
  const { user } = useAuthContext();
 
  // Ellenőrzés: Kiírjuk a termék ID-t a konzolba
  console.log("Termék adatok a TermekPublic komponensben:", props.termek);
  console.log("Navigációs útvonal:", `/termek/${props.termek.termek_id}`);
 
  // 📸 Helyes képútvonal kialakítása
  const kepUrl = props.termek.kep
    ? `/kepek/${props.termek.kep}`
    : "/placeholder.png";
 
  return (
    <div className="col">
      <div className="card h-200">
        <Link
          to={`/termek/${props.termek.termek_id}`}
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={() =>
            console.log("Navigálás a termékhez, ID:", props.termek.termek_id)
          }
        >
          <div className="card-header bg-transparent border-success">
            <h5 className="card-title">{props.termek.cim}</h5>
          </div>
          <div className="card-body">
            {/* <img
              src={kepUrl}
              alt={props.termek.cim}
              className="card-img-top"
              style={{ maxHeight: "200px", objectFit: "cover" }}
            /> */}
            <p>{props.termek.leiras}</p>
          </div>
        </Link>
        <div className="card-footer">
          <button
            className="btn btn-primary card-link"
            onClick={() => kosarba(props.termek)}
            disabled={user && user.role === 0}
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