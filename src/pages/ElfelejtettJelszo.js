import React, { useState } from "react";

export default function ElfelejtettJelszo() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Itt küldhetsz egy API kérést a jelszó visszaállításához
    console.log("Jelszó visszaállítás kérés elküldve:", email);

    setMessage("Ha az e-mail cím szerepel a rendszerünkben, küldtünk egy visszaállítási linket.");
  };

  return (
    <div className="m-auto" style={{ maxWidth: "400px" }}>
      <h1 className="text-center">Elfelejtett jelszó</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email címed:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="email"
            placeholder="Add meg az e-mail címed"
            name="email"
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100">
            Jelszó visszaállítása
          </button>
        </div>
      </form>
      {message && <p className="text-success text-center mt-3">{message}</p>}
    </div>
  );
}
