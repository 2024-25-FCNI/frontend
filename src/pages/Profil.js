import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import axios from "axios";

export default function Profil() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [osszesTermek, setOsszesTermek] = useState([]);
  const [megvettTermekek, setMegvettTermekek] = useState([]);
  const [profilKep, setProfilKep] = useState(null);

  useEffect(() => {
    if (user?.id) {
      // 🔹 1. Minden termék lekérése
      axios
        .get("http://localhost:8000/api/termekek")
        .then((response) => {
          const termekek = response.data;
          setOsszesTermek(termekek);

          // 🔹 2. Vásárlás ellenőrzés termékenként
          const ellenorzesek = termekek.map((termek) =>
            axios
              .get(`http://localhost:8000/api/ellenoriz-vasarlas/${termek.termek_id}`, { withCredentials: true })
              .then((res) => {
                if (res.data.megvette) {
                  return termek; // Csak a megvett termékeket adjuk vissza
                } else {
                  return null;
                }
              })
              .catch((error) => {
                console.error("Vásárlás ellenőrzés hiba:", error);
                return null;
              })
          );

          Promise.all(ellenorzesek).then((eredmenyek) => {
            const megvettek = eredmenyek.filter((termek) => termek !== null);
            setMegvettTermekek(megvettek);
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

  if (!user) {
    return <div>Nincs bejelentkezett felhasználó.</div>;
  }

  return (
    <div className="container mt-5">
      <h1>Saját fiók</h1>

      <div className="row">
        {/* Bal oldali rész: vásárolt termékek */}
        <div className="col-md-8">
         

          {megvettTermekek.length > 0 ? (
            megvettTermekek.map((termek) => (
              <div
                key={termek.termek_id}
                className="card mb-3"
                style={{ cursor: "pointer", borderRadius: "1em" }}
                onClick={() => handleTermekClick(termek.termek_id)}
              >
                <div className="row g-0 align-items-center">
                  <div className="col-md-3">
                    <img
                      src={`http://localhost:8000/kepek/${termek.kep}`}
                      alt={termek.cim}
                      className="img-fluid rounded-start"
                      onError={(e) => (e.target.src = "/placeholder.jpg")}
                      style={{ borderRadius: "1em 0 0 1em", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body">
                      <h5 className="card-title">{termek.cim}</h5>
                      <p className="card-text">{termek.bemutatas}</p>
                    </div>
                  </div>
                  <div className="col-md-3 text-end pe-4">
                    {/* Vásárlás dátum itt nem elérhető ebben a struktúrában */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Még nincsenek vásárolt termékeid.</p>
          )}
        </div>

        {/* Jobb oldali rész: profil adatok */}
        <div className="col-md-4 text-center">
          <div className="card p-3" style={{ borderRadius: "1em" }}>
            <div className="mb-3">
              <img
                src={profilKep || "/placeholder-profile.png"}
                alt="Profilkép"
                className="img-fluid rounded-circle"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </div>

            <h5>{user.name}</h5>
            <p>{user.email}</p>

            <input type="file" accept="image/*" onChange={handleProfilKepValtas} className="form-control mb-3" />

            <button onClick={handleLogout} className="btn btn-danger">
              Kijelentkezés
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
