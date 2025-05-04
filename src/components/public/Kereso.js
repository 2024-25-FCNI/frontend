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

    if (value.trim() === "") {
      setFilteredTermekek(termekek);
    }
  };

  const handleKeyPress = (e) => {
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
        onKeyDown={handleKeyPress}
      />
      <button className="search-button" type="button" onClick={handleSearch}>
        <FaSearch />
      </button>
    </div>
  );
}
