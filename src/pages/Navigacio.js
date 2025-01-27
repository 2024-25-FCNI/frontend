import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import { KosarContext } from "../contexts/KosarContext";
import Kosar from "../components/public/Kosar";
import "../components/public/Kosar.css";

export default function Navigacio() {
  const { user, logout } = useAuthContext();
  const { kosar } = useContext(KosarContext);
  const [isKosarOpen, setKosarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleKosar = () => {
    setKosarOpen(!isKosarOpen);
  };

  const handleFizetes = () => {
    if (!user) {
      navigate("/bejelentkezes"); // Ha nincs bejelentkezett felhasználó, irány a bejelentkezés
    } else {
      navigate("/fizetes"); // Ha van, irány a vásárlás oldal
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm bg-light">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="navbar-item">
              <Link className="nav-link" to="/">
                Kezdőlap
              </Link>
            </li>
            {user ? (
              user.role === 0 ? (
                <li className="navbar-item">
                  <Link className="nav-link" to="/admin">
                    Admin
                  </Link>
                </li>
              ) : (
                <li className="navbar-item">
                  <Link className="nav-link" to="/profil">
                    Profil
                  </Link>
                </li>
              )
            ) : (
              <>
                <li className="navbar-item">
                  <Link className="nav-link" to="/bejelentkezes">
                    Bejelentkezés
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link className="nav-link" to="/regisztracio">
                    Regisztráció
                  </Link>
                </li>
              </>
            )}

            <li className="navbar-item">
              <button className="nav-link" onClick={toggleKosar}>
                Kosár ({kosar.length})
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Slide-in kosár panel */}
      <div
        className={`kosar-panel ${isKosarOpen ? "open" : ""}`}
        onClick={toggleKosar}
      >
        <div className="kosar-content" onClick={(e) => e.stopPropagation()}>
          <h3>Kosár Tartalma</h3>
          {kosar ? (
            <Kosar kosar={kosar} />
          ) : (
            <p className="text-muted">A kosár üres.</p>
          )}
          <button onClick={handleFizetes} className="btn btn-primary mt-3">
            Tovább a fizetéshez
          </button>
        </div>
      </div>
    </>
  );
}
