import React, { useState } from "react";
import { myAxios } from "../api/axios"; // 🔥 Axios importálása az API híváshoz
import "../styles/UjJelszo.css";


export default function ElfelejtettJelszo() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await myAxios.post("/api/forgot-password", { email });
      setMessage(response.data.message);
    } catch (err) {
      setError("Hiba történt a jelszó visszaállításakor.");
    }
  };

  return (
    <div className=" ujjelszo m-auto" style={{ maxWidth: "400px" }}>
      <h1 className="text-center">Elfelejtett jelszó</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email címed:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="email"
            placeholder="Add meg az e-mail címed"
            name="email"
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100">
            Jelszó visszaállítása
          </button>
        </div>
      </form>
      {message && <p className="text-success text-center mt-3">{message}</p>}
      {error && <p className="text-danger text-center mt-3">{error}</p>}
    </div>
  );
}
