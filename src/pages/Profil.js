import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";

export default function Profil() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Kijelentkezés után a kezdőlapra irányít
  };

  return (
    <div className="container mt-5">
      <h1>Profil</h1>
      <p>Üdvözlünk a profilod oldalán!</p>
      <button onClick={handleLogout} className="btn btn-danger mt-3">
        Kijelentkezés
      </button>
    </div>
  );
}
