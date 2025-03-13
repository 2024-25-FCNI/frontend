import React, { useState } from "react";
import { useAdminContext } from "../../contexts/AdminContext";
 
 
function UjTermek({ existingVideos = [] }) {
  const { postData } = useAdminContext();
 
  const [termek, setTermek] = useState({
    cim: "",
    ar: 10,
    leiras: "",
    hozzaferesi_ido: 30,
    kep: "",
    url: "",
  });
 
  const [useExistingVideos, setUseExistingVideos] = useState(false);
 
  function handleChange(event) {
    const { id, value, type, files } = event.target;

    setTermek((prevTermek) => ({
        ...prevTermek,
        [id]: id === "kep" ? files[0] : value, // 🔹 Fájlként tároljuk
    }));
}

 
  function handleCheckboxChange(event) {
    setUseExistingVideos(event.target.checked);
    if (event.target.checked) {
      setTermek((prevTermek) => ({ ...prevTermek, url: null }));
    }
  }
 
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(); // 🔹 FormData létrehozása
    formData.append("cim", termek.cim);
    formData.append("leiras", termek.leiras);
    formData.append("url", termek.url);
    formData.append("hozzaferesi_ido", termek.hozzaferesi_ido);
    formData.append("ar", termek.ar);
    formData.append("jelzes", termek.jelzes);
    
    if (termek.kep) {
        formData.append("kep", termek.kep); // 🔹 Fájl csatolása
    }

    if (postData) {
        postData("/api/termekek", formData);
    } else {
        console.error("postData nem elérhető az AdminContextből!");
    }
}

 
 
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="cim" className="form-label">
          Cím
        </label>
        <input
          type="text"
          className="form-control"
          id="cim"
          required
          placeholder="Termék címe"
          value={termek.cim}
          onChange={handleChange}
        />
      </div>
 
      <div className="mb-3">
        <label htmlFor="leiras" className="form-label">
          Leírás
        </label>
        <textarea
          className="form-control"
          id="leiras"
          rows="3"
          value={termek.leiras}
          onChange={handleChange}
        ></textarea>
      </div>
 
      <div className="mb-3">
        <label htmlFor="ar" className="form-label">
          Ár
        </label>
        <input
          type="number"
          min="10"
          max="100000"
          className="form-control"
          id="ar"
          required
          value={termek.ar}
          onChange={handleChange}
        />
      </div>
 
      <div className="mb-3">
        <label htmlFor="hozzaferesi_ido" className="form-label">
          Hozzáférési idő (napban)
        </label>
        <input
          type="number"
          min="1"
          max="365"
          className="form-control"
          id="hozzaferesi_ido"
          required
          value={termek.hozzaferesi_ido}
          onChange={handleChange}
        />
      </div>
 
      <div className="mb-3">
        <label htmlFor="kep" className="form-label">
          Kép feltöltése
        </label>
        <input
          type="file"
          accept="kep/*"
          className="form-control"
          id="kep"
          onChange={handleChange}
        />
      </div>
 
      <div className="mb-3">
        <label htmlFor="useExistingVideos" className="form-label">
          Csak meglévő videó használata
        </label>
        <input
          type="checkbox"
          id="useExistingVideos"
          checked={useExistingVideos}
          onChange={handleCheckboxChange}
        />
      </div>
 
      {!useExistingVideos && (
        <div className="mb-3">
          <label htmlFor="url" className="form-label">
            Videó feltöltése
          </label>
          <input
            type="text"
            className="form-control"
            id="url"
            placeholder="Videó linkje"
            value={termek.url}
            onChange={handleChange}
          />
        </div>
      )}
 
      {useExistingVideos && (
        <div className="mb-3">
          <label htmlFor="url" className="form-label">
            Válassz meglévő videót
          </label>
          <select
            className="form-select"
            id="url"
            value={termek.url || ""}
            onChange={handleChange}
          >
            <option value="">Válassz egy videót</option>
            {existingVideos.map((url, index) => (
              <option key={index} value={url}>
                {url}
              </option>
            ))}
          </select>
        </div>
      )}
 
      <button type="submit" className="btn btn-primary">
        Feltölt
      </button>
    </form>
  );
}
 
export default UjTermek;
 