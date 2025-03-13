import { useContext, useState } from "react";
import useAuthContext from "../contexts/AuthContext";
import { ApiContext } from "../contexts/ApiContext";
import { Link } from "react-router-dom";
import "../styles/Kezdolap.css";
import viviImg from "./vivi.jpeg";
import v from "./v.jpg";
import i from "./i.png";
import f from "./f.png";

export default function Kezdolap() {
  const { user } = useAuthContext();
  const { getData } = useContext(ApiContext);
  const [termekek, setTermekek] = useState([]); // Összes termék
  const [filteredTermekek, setFilteredTermekek] = useState([]); // Szűrt termékek

  return (
    <div className="kezdolap-container">
      <section className="hero-section container-fluid">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12 text-container">
            <h1>
              Álomból Valóság –<br /> A Sikered Itt Kezdődik!
            </h1>
            <p>
              Fejlődj tudatosan, inspirálódj, és hozd ki magadból a maximumot!
            </p>
            <div className="social-links">
              <a
                href="https://www.facebook.com/profile.php?id=61553682524743"
                target="_blank"
                className="social-link"
              >
                <img src={f} alt="Facebook" className="social-icon" />
                <i className="fab fa-facebook"></i> Wehowszky Vivien
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                className="social-link"
              >
                <img src={i} alt="Instagram" className="social-icon" />
                <i className="fab fa-instagram"></i> wehovivi
              </a>
            </div>
          </div>

          {/* 📌 Jobb oldali kép */}
          <div className="col-lg-6 col-md-12 image-container">
            <img src={viviImg} alt="Wehowszky Vivien" className="hero-image" />
          </div>
        </div>
      </section>

      {/* 🔹 Második szekció - termékek */}
      <section className="products-section container-fluid">
        <h2>
          Mozgás, Erő, Szenvedély –<br /> Minden, ami a fejlődésedhez kell!
        </h2>
        <div className="row">
          <div className="col-md-4 col-sm-12 product-card">
            <Link to="/videok">
              <div className="product-box">
                <img src={v} alt="konyv" className="book-image" />
                <h3>Videók</h3>
                <p>
                  Fejleszd hajlékonyságod és erőnléted szakértői útmutatással!
                </p>
              </div>
            </Link>
          </div>

          <div className="col-md-4 col-sm-12 product-card">
            <Link to="/videok">
              <div className="product-box">
                <img src={v} alt="konyv" className="book-image" />
                <h3>Videós csomagok</h3>
                <p>
                  Komplex edzésprogramok a rugalmasság, koordináció és erő
                  fejlesztéséhez!
                </p>
              </div>
            </Link>
          </div>

          <div className="col-md-4 col-sm-12 product-card">
            <Link to="/konyv">
              <div className="product-box ">
                <img src={v} alt="konyv" className="book-image" />
                <h3>Könyv</h3>
                <p>
                  Egy sportoló útja: kitartás, küzdelem és szenvedély a
                  sikerért!
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
