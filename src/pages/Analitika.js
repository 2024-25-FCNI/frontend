import React, { useContext } from "react";
import { AnalitikaContext } from "../contexts/AnalitikaContext";
import UserAnalitika from "../components/admin/UserAnalitika";

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
    <UserAnalitika
      felhasznalok={felhasznalok}
      torolFelhasznalo={torolFelhasznalo}
    />
  );
}

export default Analitika;
