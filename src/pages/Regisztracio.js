import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Regisztracio.css"; // 📌 Új CSS fájl a formázásokhoz

export default function Regisztracio() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const { loginReg, errors } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adat = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    };

    loginReg(adat, "/register");
  };

  return (
    <div className="regisztracio-container">
      <div className="register-box">
      <h1 className="title text-center">Regisztráció</h1>
        <form onSubmit={handleSubmit}>
          {/* 📌 Név mező */}
          <div className="input-group">
            <label htmlFor="name">Név:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              id="name"
              name="name"
            />
          </div>
          {errors.name && <span className="error-text">{errors.name[0]}</span>}

          {/* 📌 Email mező */}
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              id="email"
              name="email"
            />
          </div>
          {errors.email && <span className="error-text">{errors.email[0]}</span>}

          {/* 📌 Jelszó mező */}
          <div className="input-group">
            <label htmlFor="pwd">Jelszó:</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                id="pwd"
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

          {/* 📌 Jelszó újra mező */}
          <div className="input-group">
            <label htmlFor="pwd2">Jelszó újra:</label>
            <div className="password-container">
              <input
                type={showPasswordConfirmation ? "text" : "password"}
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="input-field"
                id="pwd2"
                name="pwd2"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
              >
                {showPasswordConfirmation ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          {errors.password_confirmation && <span className="error-text">{errors.password_confirmation[0]}</span>}

          {/* 📌 Regisztráció gomb */}
          <div className="button-container">
            <button type="submit" className="register-button">Regisztrálok</button>
          </div>

          {/* 📌 Extra linkek */}
          <div className="extra-links">
            <p>Már van profilja? <Link to="/bejelentkezes" className="login-link">Bejelentkezés</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
