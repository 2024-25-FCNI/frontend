import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/Analitika.css";

function UserAnalitika({ felhasznalok, torolFelhasznalo }) {
  const [rendezes, setRendezes] = useState("desc");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const today = new Date();

  const szurtFelhasznalok = felhasznalok
    .filter((felhasznalo) => {
      if (!startDate && !endDate) return true;
      const regDatum = new Date(felhasznalo.created_at);
      return (
        (!startDate || regDatum >= startDate) &&
        (!endDate || regDatum <= endDate)
      );
    })
    .sort((a, b) => {
      const datumA = new Date(a.created_at);
      const datumB = new Date(b.created_at);
      return rendezes === "asc" ? datumA - datumB : datumB - datumA;
    });

  return (
    <div className="container mt-5">
      <h1 className="mb-4">
        Regisztrált Felhasználók ({szurtFelhasznalok.length})
      </h1>

      {/* Dátumszűrés */}
      <div className="szures-mezok">
        <label className="me-2">Szűrés időszak szerint:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={today}
          className="form-control me-2"
          placeholderText="Kezdő dátum"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => {
            if (date) {
              date.setHours(23, 59, 59, 999);
            }
            setEndDate(date);
          }}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={today}
          className="form-control me-2"
          placeholderText="Vég dátum"
        />
        <button
          className="btn btn-secondary szures-torlese-btn"
          onClick={() => {
            setStartDate(null);
            setEndDate(null);
          }}
        >
          Szűrés törlése
        </button>
      </div>

      {/* Rendezés gomb */}
      <button
        className="rend-btn btn-primary mb-3"
        onClick={() => setRendezes(rendezes === "asc" ? "desc" : "asc")}
      >
        {rendezes === "asc" ? "Legújabb elöl" : "Legrégebbi elöl"}
      </button>

      {/* Felhasználói lista */}
      {szurtFelhasznalok.length === 0 ? (
        <p>Nincsenek megfelelő felhasználók.</p>
      ) : (
        <div className="reszponziv-tabla">
          <table className="ana-table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Név</th>
                <th>Email</th>
                <th>Regisztráció dátuma</th>
                <th>Jogosultság</th>
                <th>Művelet</th>
              </tr>
            </thead>
            <tbody>
              {szurtFelhasznalok.map((felhasznalo) => (
                <tr key={felhasznalo.id}>
                  <td>{felhasznalo.id}</td>
                  <td>{felhasznalo.name}</td>
                  <td>{felhasznalo.email}</td>
                  <td>
                    {felhasznalo.created_at
                      ? new Date(felhasznalo.created_at).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>{felhasznalo.role === 0 ? "Admin" : "Felhasználó"}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Biztosan törölni szeretnéd ${felhasznalo.name} felhasználót?`
                          )
                        ) {
                          torolFelhasznalo(felhasznalo.id);
                        }
                      }}
                    >
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserAnalitika;
