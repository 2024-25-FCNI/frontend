import React, { useContext } from "react";
import { AnalitikaContext } from "../contexts/AnalitikaContext";
import UserAnalitika from "../components/admin/UserAnalitika";
import VasarlasAnalitika from "../components/admin/VasarlasAnalitika";

function Analitika() {
  const { felhasznalok, loading, error, torolFelhasznalo } =
    useContext(AnalitikaContext);

  if (loading) {
    return <div className="text-center mt-5">Betöltés...</div>;
  }

  if (error) {
    return <div className="text-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1>Admin Analitika</h1>

      {/* Felhasználói Analitika */}
      <div className="mb-5">
        <h2>Felhasználói Analitika</h2>
        <UserAnalitika
          felhasznalok={felhasznalok}
          torolFelhasznalo={torolFelhasznalo}
        />
      </div>

      {/* Vásárlási Analitika */}
      <div className="mt-5">
        <h2>Vásárlási Analitika</h2>
        <VasarlasAnalitika />
      </div>
    </div>
  );
}

export default Analitika;
