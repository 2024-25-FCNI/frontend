import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import { KosarContext } from "../contexts/KosarContext"; // KosarContext helyes importálása
import Kosar from "../components/public/Kosar"; // Kosar helyes importálása
import "../components/public/Kosar.css"; // Kosar.css helyes importálása

export default function Navigacio() {
  const { user, logout } = useAuthContext();
  const { kosar } = useContext(KosarContext);
  const [isKosarOpen, setKosarOpen] = useState(false);

  const toggleKosar = () => {
    setKosarOpen(!isKosarOpen);
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
                        <>
                            <li className="navbar-item">
                                <button className="nav-link" onClick={()=>{logout()}}>
                                    Kijelentkezés
                                </button>
                            </li>
                        </>
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
                        <Link className="nav-link" to="/admin">
                            Admin
                        </Link>
                    </li>

                
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
          {/* Változtatás: Kosár komponens */}
          {kosar ? (
            <Kosar kosar={kosar} />
          ) : (
            <p className="text-muted">A kosár üres.</p>
          )}
          <button onClick={toggleKosar} className="btn btn-primary mt-3">
            Bezárás
          </button>
        </div>
      </div>
    </>
    
    );
}

