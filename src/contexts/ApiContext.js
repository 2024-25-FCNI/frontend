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
      .then(function (response) {
        console.log("API válasz:", response.data);
        fv(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setError("Hiba történt az adatok lekérésekor.");
      })
      .finally(function () {
        setLoading(false);
      });
  }

  

  const postData = async (vegpont, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await myAxios.post(vegpont, data);
      console.log("Sikeresen elküldött adat:", response.data);
    } catch (err) {
      setError("Hiba történt az adat elküldésekor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData("/termekek", setApiData); // Adatok automatikus lekérése
  }, []);


  return (
    <ApiContext.Provider value={{ getData, apiData, postData, loading, error }}>
      {children}
    </ApiContext.Provider>
  );
  
};
