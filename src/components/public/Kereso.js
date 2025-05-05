import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Kereso({ termekek, setFilteredTermekek }) {
  const [kereses, setKereses] = useState("");

  const handleSearch = () => {
    const keresesLower = kereses.toLowerCase();
  
    const filtered = termekek.filter((termek) => {
      const cim = termek.cim?.toLowerCase() || "";
      const leiras = termek.leiras?.toLowerCase() || "";
      const cimkekSzoveg = (termek.cimkek || [])
        .map((c) => c.nev?.toLowerCase() || "")
        .join(" ");
  
      return [cim, leiras, cimkekSzoveg].join(" ").includes(keresesLower);
    });
  
    setFilteredTermekek(filtered);
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setKereses(value);

    if (value.trim() === "") {
      setFilteredTermekek(termekek);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // biztos ami biztos
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Keresés termékek és címkék között..."
        value={kereses}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className="search-button"
        type="button"
        onClick={handleSearch}
      >
        <FaSearch />
      </button>
    </div>
  );
}
