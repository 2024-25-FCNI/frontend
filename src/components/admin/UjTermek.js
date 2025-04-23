import React, { useState, useEffect } from "react";
import { useAdminContext } from "../../contexts/AdminContext";
import "../../styles/UjTermek.css";

function UjTermek({ existingVideos = [] }) {
  const { postData } = useAdminContext();

  const [termek, setTermek] = useState({
    cim: "",
    bemutatas: "",
    ar: 10,
    leiras: "",
    hozzaferesi_ido: 30,
    jelzes: "alap",
    kep: null,
    video: null,
    cimkek: [],
  });

  const [useExistingVideos, setUseExistingVideos] = useState(false);
  const [ujCimke, setUjCimke] = useState("");
  const [elerhetoCimkek, setElerhetoCimkek] = useState([]);

  useEffect(() => {
    fetch("/api/cimkek")
      .then((res) => res.ok && res.json())
      .then((data) => Array.isArray(data) && setElerhetoCimkek(data))
      .catch((error) => console.error("Címkék betöltési hiba:", error));
  }, []);

  function handleChange(event) {
    const { id, value, files } = event.target;
    setTermek((prev) => ({
      ...prev,
      [id]: (id === "kep" || id === "video") && files ? files[0] : value,
    }));
  }

  function handleCheckboxChange(event) {
    setUseExistingVideos(event.target.checked);
    setTermek((prev) => ({
      ...prev,
      video: event.target.checked ? "" : null,
    }));
  }

  function hozzaadCimket() {
    const cimke = ujCimke.trim();
    if (cimke && !termek.cimkek.includes(cimke)) {
      setTermek((prev) => ({ ...prev, cimkek: [...prev.cimkek, cimke] }));
      if (!elerhetoCimkek.includes(cimke)) {
        setElerhetoCimkek((prev) => [...prev, cimke]);
      }
      setUjCimke("");
    }
  }

  function torolCimket(index) {
    setTermek((prev) => {
      const cimkek = [...prev.cimkek];
      cimkek.splice(index, 1);
      return { ...prev, cimkek };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("cim", termek.cim);
    formData.append("bemutatas", termek.bemutatas);
    formData.append("leiras", termek.leiras);
    formData.append("hozzaferesi_ido", termek.hozzaferesi_ido);
    formData.append("ar", termek.ar);
    formData.append("jelzes", termek.jelzes);
    formData.append("cimkek", JSON.stringify(termek.cimkek));
    if (termek.kep) formData.append("kep", termek.kep);
    if (useExistingVideos && termek.video) {
      formData.append("video_existing", termek.video);
    } else if (!useExistingVideos && termek.video) {
      formData.append("video", termek.video);
    }

    postData("/api/termekek", formData).then(() => {
      setTermek({
        cim: "",
        bemutatas: "",
        ar: 10,
        leiras: "",
        hozzaferesi_ido: 30,
        jelzes: "alap",
        kep: null,
        video: null,
        cimkek: [],
      });
    });
  }

  return (
    <form onSubmit={handleSubmit} className="video-form">
      <h2 className="form-title">Új termék feltöltése</h2>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cim">Cím</label>
          <input type="text" id="cim" required value={termek.cim} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="bemutatas">Bemutatás</label>
          <input type="text" id="bemutatas" value={termek.bemutatas} onChange={handleChange} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="leiras">Leírás</label>
        <textarea id="leiras" rows="3" value={termek.leiras} onChange={handleChange}></textarea>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="ar">Ár</label>
          <input type="number" id="ar" min="10" max="100000" required value={termek.ar} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="hozzaferesi_ido">Hozzáférési idő (napban)</label>
          <input type="number" id="hozzaferesi_ido" min="1" max="365" required value={termek.hozzaferesi_ido} onChange={handleChange} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="cimkek-select">Címkék</label>
        <select id="cimkek-select" value="" onChange={(e) => {
          const valasztott = e.target.value;
          if (valasztott && !termek.cimkek.includes(valasztott)) {
            setTermek((prev) => ({ ...prev, cimkek: [...prev.cimkek, valasztott] }));
          }
        }}>
          <option value="">Válassz meglévő címkét...</option>
          {elerhetoCimkek.map((tag, index) => (
            <option key={index} value={tag}>{tag}</option>
          ))}
        </select>

        <div className="tag-list">
          {termek.cimkek.map((tag, index) => (
            <span className="tag" key={index}>{tag}
              <button type="button" onClick={() => torolCimket(index)}>×</button>
            </span>
          ))}
        </div>

        <div className="tag-input-wrapper">
          <input type="text" value={ujCimke} onChange={(e) => setUjCimke(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); hozzaadCimket(); } }}
            placeholder="Új címke hozzáadása" />
          <button type="button" onClick={hozzaadCimket}>Hozzáad</button>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="kep">Fotó feltöltése</label>
        <div className="file-input-wrapper">
          <input type="text" readOnly value={termek.kep?.name || ""} placeholder="Nincs fájl kiválasztva" />
          <label htmlFor="kep" className="upload-button">Tallózás</label>
          <input type="file" id="kep" accept="image/*" onChange={handleChange} />
        </div>
      </div>

      <div className="form-group checkbox-group">
        <input type="checkbox" id="useExistingVideos" checked={useExistingVideos} onChange={handleCheckboxChange} />
        <label htmlFor="useExistingVideos">Csak meglévő videó használata</label>
      </div>

      {useExistingVideos ? (
        <div className="form-group">
          <label htmlFor="video">Válassz meglévő videót</label>
          <select id="video" value={termek.video || ""} onChange={handleChange}>
            <option value="">Válassz egy videót</option>
            {existingVideos.map((video, index) => (
              <option key={index} value={video}>{video}</option>
            ))}
          </select>
        </div>
      ) : (
        <div className="form-group">
          <label htmlFor="video">Videó feltöltése</label>
          <div className="file-input-wrapper">
            <input type="text" readOnly value={termek.video?.name || ""} placeholder="Nincs fájl kiválasztva" />
            <label htmlFor="video" className="upload-button">Tallózás</label>
            <input type="file" id="video" accept="video/*" onChange={handleChange} />
          </div>
        </div>
      )}

      <div className="form-footer">
        <button type="submit" className="upload-button">Feltöltés</button>
      </div>
    </form>
  );
}

export default UjTermek;
