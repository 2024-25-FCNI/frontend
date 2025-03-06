import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { myAxios } from "../api/axios";

export default function UjJelszo() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Token kinyerése az URL-ből
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await myAxios.post("/api/reset-password", {
        email,
        password,
        password_confirmation: passwordConfirm,
        token,
      });

      setMessage(response.data.message);
    } catch (err) {
      setError("Hiba történt a jelszó visszaállításakor.");
    }
  };

  return (
    <div className="m-auto" style={{ maxWidth: "400px" }}>
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
            placeholder="Adja meg az új jelszót"
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
      {message && <p className="text-success text-center mt-3">{message}</p>}
      {error && <p className="text-danger text-center mt-3">{error}</p>}
    </div>
  );
}
