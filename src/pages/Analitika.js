import React, { useContext } from "react";
import { AnalitikaContext } from "../contexts/AnalitikaContext";
import UserAnalitika from "../components/admin/UserAnalitika";
import VasarlasAnalitika from "../components/admin/VasarlasAnalitika";
import "../styles/Analitika.css";

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
    <div className="analitika-container">
      <div className="analitika-szekcio">
        <UserAnalitika
          felhasznalok={felhasznalok}
          torolFelhasznalo={torolFelhasznalo}
        />
      </div>

      <div className="analitika-szekcio">
        <VasarlasAnalitika />
      </div>
    </div>
  );
}

export default Analitika;
