import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import { KosarContext } from "../contexts/KosarContext";
import Kosar from "../components/public/Kosar";
import "../components/public/Kosar.css";
import { FaHome } from "react-icons/fa";

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
      navigate("/bejelentkezes");
    } else {
      navigate("/fizetes");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm bg-light">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="navbar-item">
              <Link className="nav-link" to="/">
                <FaHome />
              </Link>
            </li>
            <li className="navbar-item">
              <Link className="nav-link" to="/bemutatkozas">
                Bemutatkozás
              </Link>
            </li>
            <li className="navbar-item">
              <Link className="nav-link" to="/videok">
                Videók
              </Link>
            </li>           
            {user ? (
              user.role === 0 ? (
                <>
                  <li className="navbar-item">
                    <Link className="nav-link" to="/admin">
                      Admin
                    </Link>
                  </li>
                  <li className="navbar-item">
                    <Link className="nav-link" to="/analitika">
                      Analitika
                    </Link>
                  </li>
                </>
              ) : (
                <li className="navbar-item">
                  <Link className="nav-link" to="/profil">
                    {user.name}
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
                {/* <li className="navbar-item">
                  <Link className="nav-link" to="/regisztracio">
                    Regisztráció
                  </Link>
                </li> */}
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

      {/* Slide-in kosár overlay háttér */}
      {isKosarOpen && (
        <div className="kosar-overlay" onClick={toggleKosar}>
          <div
            className="kosar-panel open"
            onClick={(e) => e.stopPropagation()} // Megakadályozza a bezárást ha a kosárra kattintanak
          >
            <Kosar toggleKosar={toggleKosar} />
            {/* <button onClick={handleFizetes} className="btn btn-primary mt-3">
              Tovább a fizetéshez
            </button> */}
          </div>
        </div>
      )}
    </>
  );
}
