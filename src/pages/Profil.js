import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import axios from "axios";
import "../styles/Profil.css";
 
export default function Profil() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [osszesTermek, setOsszesTermek] = useState([]);
  const [megvettTermekek, setMegvettTermekek] = useState([]);
  const [profilKep, setProfilKep] = useState(null);
 
  useEffect(() => {
    if (user?.id) {
      axios
        .get("http://localhost:8000/api/termekek")
        .then((response) => {
          const termekek = response.data;
          setOsszesTermek(termekek);
 
          const ellenorzesek = termekek.map((termek) =>
            axios
              .get(`http://localhost:8000/api/ellenoriz-vasarlas/${termek.termek_id}`, {
                withCredentials: true,
              })
              .then((res) => (res.data.megvette ? termek : null))
              .catch(() => null)
          );
 
          Promise.all(ellenorzesek).then((eredmenyek) => {
            setMegvettTermekek(eredmenyek.filter((t) => t !== null));
          });
        })
        .catch((error) => {
          console.error("Hiba a termékek lekérdezésekor:", error);
        });
    }
  }, [user]);
 
  const handleLogout = () => {
    logout();
    navigate("/");
  };
 
  const handleProfilKepValtas = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilKep(URL.createObjectURL(file));
    }
  };
 
  const handleTermekClick = (termekId) => {
    navigate(`/termek/${termekId}`);
  };
 
  if (!user) return <div>Nincs bejelentkezett felhasználó.</div>;
 
  return (
    <div className="profil-container">
      <div className="profil-tartalom">
        {/* Profilkártya */}
        <div className="profilkartya">
          <img
            src={profilKep || "/profil.png"}
            alt="Profilkép"
            className="profilkep"
            onError={(e) => (e.target.src = "/profil.png")}
          />
          <h5>{user.name}</h5>
          <p>{user.email}</p>
 
          <div className="custom-file-upload">
            <label htmlFor="file-upload">Profilkép feltöltése</label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleProfilKepValtas}
            />
          </div>
 
          <button onClick={handleLogout} className="custom-logout-button">
            Kijelentkezés
          </button>
        </div>
 
        {/* Videók szekció */}
        <div className="videoszekcio">
          <h1 className="videok-cim">Saját videóid</h1>
 
          <div className="videolista">
            {megvettTermekek.length > 0 ? (
              megvettTermekek.map((termek) => (
                <div
                  key={termek.termek_id}
                  className="videokartya"
                  onClick={() => handleTermekClick(termek.termek_id)}
                >
                  <img
                    src={`http://localhost:8000/kepek/${termek.kep}`}
                    alt={termek.cim}
                    onError={(e) => (e.target.src = "/placeholder.png")}
                  />
                  <div className="videokartya-content">
                    <div className="videokartya-title">{termek.cim}</div>
                    <div className="videokartya-description">{termek.bemutatas}</div>
                  </div>
                  <div className="videokartya-date">2025.08.20.</div>
                </div>
              ))
            ) : (
              <p>Még nincsenek vásárolt termékeid.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}