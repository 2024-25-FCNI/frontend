import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Kereso({ termekek, setFilteredTermekek }) {
  const [kereses, setKereses] = useState("");

  const handleSearch = () => {
    const filtered = termekek.filter((termek) =>
      [termek.cim, termek.leiras]
        .join(" ")
        .toLowerCase()
        .includes(kereses.toLowerCase())
    );
    setFilteredTermekek(filtered);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setKereses(value);

    // Ha a keresőmezőt törlik, az összes terméket visszaállítjuk
    if (value.trim() === "") {
      setFilteredTermekek(termekek);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Megakadályozza az űrlap elküldését
      handleSearch();
    }
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Keresés termék cím, címke vagy leírás alapján..."
        value={kereses}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress} // Frissítve onKeyPress helyett
      />
      <button
        className="btn btn-primary"
        type="button"
        onClick={handleSearch}
      >
        <FaSearch />
      </button>
    </div>
  );
}
