import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import { KosarContext } from "../contexts/KosarContext";
import Kosar from "../components/public/Kosar";
import { FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
import logo from "./wvlogo.png"; // 📌 Logó elérési útja
import "../styles/Navigacio.css";

export default function Navigacio() {
  const { user } = useAuthContext();
  const { kosar } = useContext(KosarContext);
  const [isKosarOpen, setKosarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleKosar = () => {
    setKosarOpen(!isKosarOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="custom-navbar">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          
          {/* 🔹 Bal oldali tartalom: Logó és Bemutatkozás + Videók */}
          <div className="left-nav d-flex align-items-center">
            <Link to="/" className="navbar-brand">
              <img src={logo} alt="Weszky Dance" className="logo-img" />
            </Link>
            <ul className="navbar-nav nav-left">
              <li className="nav-item">
                <Link className="nav-link" to="/bemutatkozas">
                  Bemutatkozás
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/videok">
                  Videók
                </Link>
              </li>
            </ul>
          </div>

          {/* 🔹 Jobb oldali tartalom: Bejelentkezés és Kosár */}
          <div className="right-nav d-flex align-items-center">
            <ul className="navbar-nav nav-right">
              {user ? (
                user.role === 0 ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin">
                        Admin
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/analitika">
                        Analitika
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link" to="/profil">
                      {user.name}
                    </Link>
                  </li>
                )
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/bejelentkezes">
                    Bejelentkezés
                  </Link>
                </li>
              )}

              {/* 🔹 Kosár ikon */}
              <li className="nav-item">
                <button className="nav-link kosar-btn" onClick={toggleKosar}>
                  <FaShoppingBag className="kosar-icon" /> ({kosar.length})
                </button>
              </li>
            </ul>
          </div>

          {/* 🔹 Mobil navigáció: Hamburger ikon + Kosár */}
          <div className="mobile-nav">
            <button className="hamburger-btn" onClick={toggleMenu}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
            <button className="nav-link kosar-btn" onClick={toggleKosar}>
              <FaShoppingBag className="kosar-icon" /> ({kosar.length})
            </button>
          </div>
        </div>

        {/* 🔹 Mobil navigáció lenyíló menüje */}
        {menuOpen && (
          <div className="mobile-menu">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/bemutatkozas" onClick={toggleMenu}>
                  Bemutatkozás
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/videok" onClick={toggleMenu}>
                  Videók
                </Link>
              </li>
              {user ? (
                user.role === 0 ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin" onClick={toggleMenu}>
                        Admin
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/analitika" onClick={toggleMenu}>
                        Analitika
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link" to="/profil" onClick={toggleMenu}>
                      {user.name}
                    </Link>
                  </li>
                )
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/bejelentkezes" onClick={toggleMenu}>
                    Bejelentkezés
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
