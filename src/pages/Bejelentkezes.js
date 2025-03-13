import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Bejelentkezes.css"; // 📌 Új CSS fájl a formázásokhoz

export default function Bejelentkezes() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loginReg, errors } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adat = {
      email: email,
      password: password,
    };

    loginReg(adat, "/login");
  };

  return (
    <div className="bejelentkezes-container">
      <div className="login-box">
      <h1 className="title text-center">Bejelentkezés</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              id="email"
              placeholder=""
              name="email"
            />
          </div>
          {errors.email && <span className="error-text">{errors.email[0]}</span>}

          <div className="input-group">
            <label htmlFor="pwd">Jelszó</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                id="pwd"
                placeholder=""
                name="pwd"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          {errors.password && <span className="error-text">{errors.password[0]}</span>}

          <div className="button-container">
            <button type="submit" className="login-button">Bejelentkezés</button>
          </div>

          <div className="extra-links">
            <p>Még nincs fiókja? <Link to="/regisztracio" className="register-link">Regisztráció</Link></p>
            <p><Link to="/elfelejtett-jelszo" className="forgot-password">Elfelejtettem a jelszavam</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
