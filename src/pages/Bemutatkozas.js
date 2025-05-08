import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/Bemutatkozas.css";
import b1 from "../kepek/b1.jpg";
import b2 from "../kepek/b2.jpg";

export default function Bemutatkozas() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="bemutatkozas-container">
      {/* Első szekció */}
      <section className="bemutatkozas-section">
        <div className="bemutatkozas-content">
          <div className="bemutatkozas-image" data-aos="fade-right">
            <img src={b1} alt="Bemutatkozás" className="bemutatkozas-img" />
          </div>
          <div className="bemutatkozas-text" data-aos="fade-left">
            <h1>Bemutatkozás</h1>
            <p>
              Szeretettel köszöntök mindenkit az online ritmikus gimnasztika
              feladatok exkluzív tárházában! <br /> <br />
              A nevem Wehovszky Vivien, egykori ritmikus gimnasztika válogatott
              tag és csapatkapitány. Pályafutásom során 18 éven át
              elkötelezetten műveltem ezt a kifinomult sportágat, majd a Magyar
              Testnevelési és Sporttudományi Egyetemen szereztem szakedzői
              diplomát ritmikus gimnasztikában – alap- és mesterképzés keretében
              egyaránt. Jelenleg a doktori iskola hallgatójaként folytatom
              tudományos munkámat. <br /> <br />
              Célom, hogy ez a platform inspirációt, szakmai támogatást és
              fejlődési lehetőséget biztosítson mindazoknak, akik a ritmikus
              gimnasztika művészetére nyitottak, és szeretnék azt magasabb
              szintre emelni. <br /> <br />
              Üdvözlöm Önöket az RG elegáns világában – fejlődjünk együtt,
              határok nélkül!{" "}
            </p>
          </div>
        </div>
      </section>

      {/* Második szekció – Könyv */}
      <section id="konyv-szekcio" className="bemutatkozas-section">
        <div className="bemutatkozas-content reverse">
          <div className="bemutatkozas-text" data-aos="fade-up">
            <h1>Könyv</h1>
            <p>
              Az RG Mindörökké című könyvem révén számos egyesülethez
              eljutottam, ahol a sport iránti szenvedélyt és elhivatottságot
              tapasztalva született meg az elhatározás: létrehozni egy olyan
              kifinomult online tudástárat, amely lehetőséget nyújt a ritmikus
              gimnasztika világához való hozzáférésre bárki számára – legyen szó
              edzőről, fiatal tehetségről vagy támogató szülőről.
              <br />
              <br />
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSclO4PQRtFGlEVtB1bKhMXO7Tab8j4LDbr8MwmYlOcKD8OBKw/viewform"
              target="_blank"
              rel="noopener noreferrer"
            >
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
