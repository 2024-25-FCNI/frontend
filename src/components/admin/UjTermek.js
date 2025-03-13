import React, { useState } from "react";
import { myAxios } from "../../contexts/MyAxios"; // ✅ Axios konfiguráció importálása


function UjTermek({ existingVideos = [] }) {
  const [termek, setTermek] = useState({
    title: "",
    price: 10,
    description: "",
    accessTime: 30,
    image: null,
    video_url: "",
  });

  const [useExistingVideos, setUseExistingVideos] = useState(false);

  function handleChange(event) {
    const { id, value, type, files } = event.target;
    setTermek((prevTermek) => ({
      ...prevTermek,
      [id]: type === "file" ? files[0] : value,
    }));
  }

  function handleCheckboxChange(event) {
    setUseExistingVideos(event.target.checked);
    if (event.target.checked) {
      setTermek((prevTermek) => ({ ...prevTermek, video_url: "" }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // ✅ Laravel CSRF-cookie lekérése (kötelező, hogy ne legyen 419-es hiba)
      await myAxios.get("/sanctum/csrf-cookie");

      // ✅ FormData objektumba töltjük be az adatokat
      const formData = new FormData();
      formData.append("cim", termek.title);
      formData.append("ar", termek.price);
      formData.append("leiras", termek.description);
      formData.append("hozzaferesi_ido", termek.accessTime);

      if (termek.image) {
        formData.append("kep", termek.image); // ✅ Kép feltöltése támogatott
      }

      if (!useExistingVideos) {
        formData.append("video_url", termek.video_url); // ✅ Videó URL hozzáadása
      } else if (useExistingVideos && termek.video_url) {
        formData.append("video_url", termek.video_url);
      }

      // ✅ Adat elküldése a backendnek
      const response = await myAxios.post("/termekek", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Sikeres feltöltés:", response.data);
      alert("Sikeres feltöltés!");
    } catch (error) {
      console.error("Hiba történt a feltöltés során:", error);
      alert("Hiba történt a feltöltés során.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Cím</label>
        <input
          type="text"
          className="form-control"
          id="title"
          required
          placeholder="Termék címe"
          value={termek.title}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Leírás</label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          value={termek.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="price" className="form-label">Ár</label>
        <input
          type="number"
          min="10"
          max="100000"
          className="form-control"
          id="price"
          required
          value={termek.price}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="accessTime" className="form-label">Hozzáférési idő (napban)</label>
        <input
          type="number"
          min="1"
          max="365"
          className="form-control"
          id="accessTime"
          required
          value={termek.accessTime}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="image" className="form-label">Kép feltöltése</label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          id="image"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="useExistingVideos" className="form-label">Csak meglévő videó használata</label>
        <input
          type="checkbox"
          id="useExistingVideos"
          checked={useExistingVideos}
          onChange={handleCheckboxChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="video_url" className="form-label">Videó URL</label>
        <input
          type="text"
          className="form-control"
          id="video_url"
          placeholder="Illeszd be a videó URL-jét"
          value={termek.video_url}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">Feltölt</button>
    </form>
  );
}

export default UjTermek;
