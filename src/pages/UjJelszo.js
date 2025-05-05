import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { myAxios } from "../api/axios";
import "../styles/UjJelszo.css";


export default function UjJelszo() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await myAxios.post("/api/reset-password", {
        email,
        password,
        password_confirmation: passwordConfirm,
        token,
      });

      alert("Sikeres jelszócsere! Jelentkezz be az új jelszóval.");
      navigate("/bejelentkezes");
    } catch (err) {
      console.error("Hiba a jelszó visszaállításkor:", err);
      setError("Hiba történt a jelszó visszaállításakor. Ellenőrizd az adatokat.");
    }
  };

  return (
    <div className="ujjelszo m-auto" style={{ maxWidth: "400px" }}>
      <h1 className="text-center">Új jelszó beállítása</h1>
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
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Új jelszó:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="password"
            placeholder="Írd be az új jelszavad"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordConfirm" className="form-label">Jelszó megerősítése:</label>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="form-control"
            id="passwordConfirm"
            placeholder="Írd be újra a jelszavad"
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100">
            Jelszó visszaállítása
          </button>
        </div>
      </form>

      {error && <p className="text-danger text-center mt-3">{error}</p>}
    </div>
  );
}
