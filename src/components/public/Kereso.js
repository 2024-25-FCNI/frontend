import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Kereso({ termekek, setFilteredTermekek }) {
  const [kereses, setKereses] = useState("");

  const handleSearch = () => {
    const keresesLower = kereses.toLowerCase();

    const filtered = termekek.filter((termek) => {
      const cim = termek.cim?.toLowerCase() || "";
      const leiras = termek.leiras?.toLowerCase() || "";

      // Ha a termékhez tartoznak címkék (pl. [{ nev: "zene" }, ...])
      const cimkekSzoveg = (termek.cimkek || [])
        .map((c) => c.nev.toLowerCase())
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

  return (
    <form
      className="search-container"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <input
        type="text"
        className="search-input"
        placeholder="Keresés termékek és címkék között..."
        value={kereses}
        onChange={handleInputChange}
      />
      <button className="search-button" type="submit">
        <FaSearch />
      </button>
    </form>
  );
}
