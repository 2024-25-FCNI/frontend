import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Bejelentkezes() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { loginReg, errors } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adat = {
      email: email,
      password: password,
    };
    console.log(adat);

    loginReg(adat, "/login");
  };

  return (
    <div className="m-auto" style={{ maxWidth: "400px" }}>
      <h1 className="text-center">Bejelentkezés</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="email"
            placeholder="email"
            name="email"
          />
        </div>
        <div>
          {errors.email && <span className="text-danger">{errors.email[0]}</span>}
        </div>
        <div className="mb-3 position-relative">
          <label htmlFor="pwd" className="form-label">
            Jelszó:
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="pwd"
              placeholder="jelszó"
              name="pwd"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div>
            {errors.password && <span className="text-danger">{errors.password[0]}</span>}
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          <p>
            Még nincs felhasználóneve?{" "}
            <Link className="nav-link text-info" to="/regisztracio">
              Regisztráció
            </Link>
          </p>
          <p>
            <Link className="nav-link text-danger" to="/elfelejtett-jelszo">
              Elfelejtettem a jelszavam
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
