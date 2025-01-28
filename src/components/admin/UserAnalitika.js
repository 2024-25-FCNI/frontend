import React from "react";
import { FaTimes } from "react-icons/fa";

function UserAnalitika({ felhasznalok, torolFelhasznalo }) {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Regisztrált Felhasználók</h1>
      {felhasznalok.length === 0 ? (
        <p>Nincsenek regisztrált felhasználók.</p>
      ) : (
        <table className="table table-striped">
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
            {felhasznalok.map((felhasznalo) => (
              <tr key={felhasznalo.user_id}>
                <td>{felhasznalo.user_id}</td>
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
                      console.log("Kiválasztott felhasználó:", felhasznalo); // Debug log
                      console.log("Felhasználó törlési ID:", felhasznalo.user_id); // Ellenőrizd az ID-t

                      if (!felhasznalo.user_id) {
                        console.error("HIBA: Nincs user_id!");
                        return;
                      }

                      const confirmed = window.confirm(
                        `Biztosan törölni szeretnéd ${felhasznalo.name} felhasználót?`
                      );

                      if (confirmed) {
                        torolFelhasznalo(felhasznalo.user_id);
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
      )}
    </div>
  );
}

export default UserAnalitika;
