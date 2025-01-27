import React from "react";
import { FaTimes } from "react-icons/fa"; 

function UserAnalitika({ felhasznalok, torolFelhasznalo }) {
  return (
    <div className="container mt-5">
      <h1>Regisztrált Felhasználók</h1>
      <table className="table table-striped mt-3">
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
            <tr key={felhasznalo.id}>
              <td>{felhasznalo.id}</td>
              <td>{felhasznalo.name}</td>
              <td>{felhasznalo.email}</td>
              <td>{new Date(felhasznalo.created_at).toLocaleDateString()}</td>
              <td>{felhasznalo.role === 0 ? "Admin" : "Felhasználó"}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => torolFelhasznalo(felhasznalo.id)}
                >
                  <FaTimes />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserAnalitika;
