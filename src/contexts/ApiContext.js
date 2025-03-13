import { createContext, useEffect, useState } from "react";
import { myAxios } from "./MyAxios";

export const ApiContext = createContext("");

export const ApiProvider = ({ children }) => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  
  function getData(vegpont, fv) {
    setLoading(true);
    setError(null);
    myAxios
      .get(vegpont)
      .then((response) => {
        console.log("API válasz:", response.data);
        fv(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError("Hiba történt az adatok lekérésekor.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const postData = async (vegpont, data) => {
    setLoading(true);
    setError(null);
    try {
      // ✅ Megadjuk a `Content-Type: multipart/form-data` fejlécet
      const response = await myAxios.post(vegpont, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Sikeresen elküldött adat:", response.data);
    } catch (err) {
      setError("Hiba történt az adat elküldésekor.");
    } finally {
      setLoading(false);
    }
  };
  


  const sendEmail = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await myAxios.get("/send-mail");
      console.log("Email sikeresen elküldve:", response.data);
    } catch (error) {
      console.error("Hiba az email küldése közben:", error);
      setError("Hiba történt az email küldésekor.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getData("/api/termekek", setApiData); // Adatok automatikus lekérése
  }, []);


  return (
    <ApiContext.Provider value={{ getData, apiData, sendEmail, postData, loading, error }}>
      {children}
    </ApiContext.Provider>
  );
  
};
