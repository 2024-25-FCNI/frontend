import { useContext, useState, useEffect } from "react";
import useAuthContext from "../contexts/AuthContext";
import { ApiContext } from "../contexts/ApiContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Kezdolap.css";
import viviImg from "../kepek/vivi.jpeg";
import f from "../kepek/f.png";
import v from "../kepek/v.jpg";
import i from "../kepek/i.png";

export default function Kezdolap() {
  const { user } = useAuthContext();
  const { getData } = useContext(ApiContext);
  const [termekek, setTermekek] = useState([]);
  const [filteredTermekek, setFilteredTermekek] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const productsSection = document.querySelector(".products-section");
      if (!productsSection) return;
      const sectionTop = productsSection.getBoundingClientRect().top;
      const triggerPoint = window.innerHeight * 0.8;

      if (sectionTop < triggerPoint) {
        productsSection.classList.add("scroll-animate");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToKonyv = () => {
    navigate("/bemutatkozas", { state: { scrollTo: "konyv-szekcio" } });
  };

  return (
    <div className="kezdolap-container">
      <section className="hero-section container-fluid">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12 text-container animate-left">
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
                <img src={f} alt="Facebook" className="social-icon-small" />
                <span>Wehowszky Vivien</span>
              </a>
              <a href="https://instagram.com" target="_blank" className="social-link">
                <img src={i} alt="Instagram" className="social-icon-small" />
                <span>wehovivi</span>
              </a>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 image-container animate-right">
            <img src={viviImg} alt="Wehowszky Vivien" className="hero-image" />
          </div>
        </div>
      </section>

      <section className="products-section container-fluid scroll-animate">
        <h2 className="animate-up">
          Mozgás, Erő, Szenvedély –<br /> Minden, ami a fejlődésedhez kell!
        </h2>
        <div className="row">
          <div className="col-md-4 col-sm-12 product-card animate-up delay-1">
            <Link to="/videok" style={{ textDecoration: "none", color: "black" }}>
              <div className="product-box">
                <img src={v} alt="videok" className="book-image" />
                <h3>Videók</h3>
                <p>Fejleszd hajlékonyságod és erőnléted szakértői útmutatással!</p>
              </div>
            </Link>
          </div>
          <div className="col-md-4 col-sm-12 product-card animate-up delay-2">
            <Link to="/videok" style={{ textDecoration: "none", color: "black" }}>
              <div className="product-box">
                <img src={v} alt="csomagok" className="book-image" />
                <h3>Videós csomagok</h3>
                <p>Komplex edzésprogramok a rugalmasság és erő fejlesztéséhez!</p>
              </div>
            </Link>
          </div>
          <div className="col-md-4 col-sm-12 product-card animate-up delay-3">
            <div onClick={handleScrollToKonyv} style={{ cursor: "pointer" }}>
              <div className="product-box">
                <img src={v} alt="konyv" className="book-image" />
                <h3>Könyv</h3>
                <p>Egy sportoló útja: kitartás, küzdelem és szenvedély a sikerért!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
