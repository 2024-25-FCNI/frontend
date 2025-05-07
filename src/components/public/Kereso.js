import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Kereso({ termekek, setFilteredTermekek, setNincsTalalat }) {
  const [kereses, setKereses] = useState("");

  const handleSearch = () => {
    const keresesLower = kereses.toLowerCase();

    const filtered = termekek.filter((termek) => {
      const cim = termek.cim?.toLowerCase() || "";
      const leiras = termek.leiras?.toLowerCase() || "";
      const bemutatas = termek.bemutatas?.toLowerCase() || "";

      // címkék nem objektumok, hanem stringek
      const cimkekSzoveg = (termek.cimkek || [])
      .map((c) => (typeof c === "string" ? c : c.elnevezes || ""))
      .map((s) => s.toLowerCase())
      .join(" ");

      return [cim, leiras, bemutatas, cimkekSzoveg]
        .join(" ")
        .includes(keresesLower);
    });

    setFilteredTermekek(filtered);

    // állítsuk be, ha nincs találat
    setNincsTalalat(filtered.length === 0);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setKereses(value);

    if (value.trim() === "") {
      setFilteredTermekek(termekek);
      setNincsTalalat(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder=""
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
