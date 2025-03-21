import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS CSS importálása
import "../styles/Bemutatkozas.css";
import b1 from "./b1.jpg";
import b2 from "./b2.jpg";

export default function Bemutatkozas() {
  // 🔹 AOS inicializálás, hogy az animációk működjenek
  useEffect(() => {
    AOS.init({
      duration: 1000, // Az animáció időtartama (1 másodperc)
      once: true, // Az animáció csak egyszer fusson le
    });
  }, []);

  return (
    <div className="bemutatkozas-container">
      {/* 🔹 Első szekció */}
      <section className="bemutatkozas-section">
        <div className="bemutatkozas-content">
          <div className="bemutatkozas-image" data-aos="fade-right">
            <img src={b1} alt="Bemutatkozás" className="bemutatkozas-img" />
          </div>
          <div className="bemutatkozas-text" data-aos="fade-left">
            <h1>Bemutatkozás</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id
              pellentesque sapien. Donec in sapien eget leo efficitur pharetra
              at quis dui. Maecenas et purus sodales, egestas lectus sed,
              finibus massa.
            </p>
            <p>
              In viverra metus a arcu pretium iaculis. Vestibulum at nisl dolor.
              Fusce volutpat at tortor ac pretium.
            </p>
          </div>
        </div>
      </section>

      {/* 🔹 Második szekció */}
      <section className="bemutatkozas-section">
  <div className="bemutatkozas-content reverse">
    <div className="bemutatkozas-text" data-aos="fade-up">
      <h1>Könyv</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id
        pellentesque sapien. Donec in sapien eget leo efficitur pharetra
        at quis dui.
      </p>
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSclO4PQRtFGlEVtB1bKhMXO7Tab8j4LDbr8MwmYlOcKD8OBKw/viewform" 
         target="_blank" 
         rel="noopener noreferrer">
        <button className="btn-primary">Rendelés</button>
      </a>
    </div>
    <div className="bemutatkozas-image" data-aos="fade-up">
      <img src={b2} alt="Könyv" className="bemutatkozas-img" />
    </div>
  </div>
</section>

    </div>
  );
}
