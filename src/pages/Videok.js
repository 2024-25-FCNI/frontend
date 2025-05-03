import { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Videok.css";
import useAuthContext from "../contexts/AuthContext";
import { ApiContext } from "../contexts/ApiContext";
import VideokPublic from "../components/public/VideokPublic";
import Kereso from "../components/public/Kereso";
 
export default function Videok() {
  const { getData } = useContext(ApiContext);
  const [termekek, setTermekek] = useState([]);
  const [filteredTermekek, setFilteredTermekek] = useState([]);
  const [activeTab, setActiveTab] = useState("videok");
 
  useEffect(() => {
    getData("/api/termekek", (adatok) => {
      setTermekek(adatok);
      setFilteredTermekek(adatok);
    });
  }, [getData]);
 
  return (
    <div className="container mt-4">
      {/* Tabs */}
      <ul className="nav nav-tabs border-0" style={{ position: "relative", zIndex: "2" }}>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "videok" ? "active" : ""}`}
            onClick={() => setActiveTab("videok")}
            style={{ backgroundColor: activeTab === "videok" ? "#FCEDE8" : "#FFFFFF", color: "black", borderRadius: "10px 10px 0 0", border: "none" }}
          >
            Videók
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "csomagok" ? "active" : ""}`}
            onClick={() => setActiveTab("csomagok")}
            style={{ backgroundColor: activeTab === "csomagok" ? "#FCEDE8" : "#FFFFFF", color: "black", borderRadius: "10px 10px 0 0", border: "none" }}
          >
            Csomagok
          </button>
        </li>
      </ul>
 
      {/* Content wrapper with background */}
      <div className="p-4 custom-wrapper">
        {/* Search bar centered */}
        <div className="d-flex justify-content-center my-3">
          <div className="w-50 search-container rounded-pill">
            <Kereso termekek={termekek} setFilteredTermekek={setFilteredTermekek} />
          </div>
        </div>
 
        {/* Termékek listázása */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 p-3">
          {filteredTermekek.map((termek) => (
            <VideokPublic termek={termek} key={termek.termek_id} />
          ))}
        </div>
      </div>
    </div>
  );
}