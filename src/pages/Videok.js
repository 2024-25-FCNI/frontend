import { useContext, useEffect, useState } from "react";
import useAuthContext from "../contexts/AuthContext";
import { ApiContext } from "../contexts/ApiContext";
import TermekekPublic from "../components/public/VideokPublic";
import Kereso from "../components/public/Kereso";

export default function Videok() {
  const { getData } = useContext(ApiContext);
  const [termekek, setTermekek] = useState([]); // Az összes termék
  const [filteredTermekek, setFilteredTermekek] = useState([]); // Szűrt termékek

  useEffect(() => {
    getData("/api/termekek", (adatok) => {
      setTermekek(adatok); // Az összes termék betöltése
      setFilteredTermekek(adatok); // Kezdetben a szűrt termékek az összeset tartalmazzák
    });
  }, [getData]);

  return (
    <div>
      <h1>Videók</h1>
      <Kereso termekek={termekek} setFilteredTermekek={setFilteredTermekek} />
      <TermekekPublic termekek={filteredTermekek} />
    </div>
  );
}
