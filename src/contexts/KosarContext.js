import { createContext, useState } from "react";

export const KosarContext = createContext("");

export const KosarProvider = ({ children }) => {
  const [kosar, setKosar] = useState([]);
  const [total, setTotal] = useState(0);

   function kosarba(termek) {
    const segedKosar = [...kosar];
    const vanIlyenTermek = segedKosar.find((elem) => elem.id === termek.id);

    if (vanIlyenTermek) {
      alert("Ez a termék már szerepel a kosárban.");
      return;
    } else {
      segedKosar.push(termek);
    }
    setKosar([...segedKosar]);
    osszeg();
  } 

   

  function torolTermek(id) {
    const segedKosar = kosar.filter((termek) => termek.id !== id); 
    setKosar([...segedKosar]);
    osszeg();
  }

     function osszeg() {
    const szum = kosar.reduce((sv, termek) => sv + termek.price, 0);
    setTotal(szum);
  } 

    

  return (
    <KosarContext.Provider value={{ kosarba, torolTermek, kosar, total }}>
      {children}
    </KosarContext.Provider>
  );
};
