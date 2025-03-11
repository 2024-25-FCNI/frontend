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
        // 🔹 ELŐSZÖR LEKÉRJÜK A CSRF COOKIET
        await myAxios.get("/sanctum/csrf-cookie");

        let imageBase64 = "";
        if (termek.image) {
            imageBase64 = await toBase64(termek.image);
        }

        const requestData = {
            cim: termek.title,
            ar: termek.price,
            leiras: termek.description,
            hozzaferesi_ido: termek.accessTime,
            kep: imageBase64, // 🔥 Base64-ként küldjük!
        };

        // 🔹 A CSRF COOKIE ELKÜLDÉSE AZ AUTENTIKÁLT KÉRÉSBEN
        const response = await myAxios.post("/api/termekek", requestData, {
            headers: {
                "Content-Type": "application/json",
                "X-XSRF-TOKEN": getCsrfToken(), // 🔥 CSRF token elküldése!
            },
            withCredentials: true, // 🔥 Cookie-k küldése engedélyezve
        });

        console.log("Sikeres feltöltés:", response.data);
        alert("Sikeres feltöltés!");
    } catch (error) {
        console.error("Hiba történt a feltöltés során:", error);
        alert("Hiba történt a feltöltés során.");
    }
}

// 🔹 CSRF TOKEN KIOLVASÁSA A COOKIE-BÓL
function getCsrfToken() {
    const name = "XSRF-TOKEN=";
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name)) {
            return decodeURIComponent(cookie.substring(name.length));
        }
    }
    return "";
}

// 🔹 Base64 átalakítás aszinkron funkcióval
const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
});



  // ✅ CSRF token lekérése a Laravel által beállított sütiből
  function getCsrfToken() {
    const name = "XSRF-TOKEN=";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return decodeURIComponent(cookie.substring(name.length, cookie.length));
      }
    }
    return "";
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Cím
        </label>
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
        <label htmlFor="description" className="form-label">
          Leírás
        </label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          value={termek.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Ár
        </label>
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
        <label htmlFor="accessTime" className="form-label">
          Hozzáférési idő (napban)
        </label>
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
        <label htmlFor="image" className="form-label">
          Kép feltöltése
        </label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          id="image"
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

      <div className="mb-3">
        <label htmlFor="video_url" className="form-label">
          Videó URL
        </label>
        <input
          type="text"
          className="form-control"
          id="video_url"
          placeholder="Illeszd be a videó URL-jét"
          value={termek.video_url}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Feltölt
      </button>
    </form>
  );
}

export default UjTermek;
