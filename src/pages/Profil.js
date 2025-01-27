import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";

export default function Profil() {
  const { user, logout } = useAuthContext(); // Lekérjük a user objektumot
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Kijelentkezés után a kezdőlapra irányít
  };

  return (
    <div className="container mt-5">
      {user ? ( // Ellenőrizzük, hogy van-e bejelentkezett felhasználó
        <>
          <h1>{user.name}</h1>
          <p>Üdvözlünk a profilod oldalán!</p>
          <button onClick={handleLogout} className="btn btn-danger mt-3">
            Kijelentkezés
          </button>
        </>
      ) : (
        <p>Nincs bejelentkezett felhasználó.</p>
      )}
    </div>
  );
}
