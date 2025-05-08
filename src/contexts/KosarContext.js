import { createContext, useState } from "react";

export const KosarContext = createContext("");

export const KosarProvider = ({ children }) => {
  const [kosar, setKosar] = useState([]);
  const [total, setTotal] = useState(0);

  function kosarba(termek) {
    const segedKosar = [...kosar];
    const vanIlyenTermek = segedKosar.find(
      (elem) => elem.termek_id === termek.termek_id
    );

    if (vanIlyenTermek) {
      alert("Ez a termék már szerepel a kosárban.");
      return;
    } else {
      segedKosar.push(termek);
    }

    setKosar([...segedKosar]);
    osszeg(segedKosar); // Az aktuális kosarat adjuk át az összegzéshez
  }

  function torolTermek(termek_id) {
    const segedKosar = kosar.filter((termek) => termek.termek_id !== termek_id);
    setKosar([...segedKosar]);
    osszeg(segedKosar);
  }

  function osszeg(aktualisKosar) {
    const szum = aktualisKosar.reduce((sv, termek) => sv + termek.ar, 0);
    setTotal(szum);
  }

  function uritKosar() {
    setKosar([]); // Kosár teljes kiürítése
    setTotal(0); // Teljes ár nullázása
  }

  return (
    <KosarContext.Provider
      value={{ kosarba, torolTermek, uritKosar, kosar, total }}
    >
      {children}
    </KosarContext.Provider>
  );
};
