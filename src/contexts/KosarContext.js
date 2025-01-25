import { createContext, useState } from "react";

export const KosarContext = createContext("");

export const KosarProvider = ({ children }) => {
  //a kosaram állapotát a kosar lista és a total (összár ) változók fogják leírni, létrehozom a stateket
  const [kosar, setKosar] = useState([]);
  const [total, setTotal] = useState(0);

  function kosarba(termek) {
    //kosárba teszem a terméket. 
    const segedKosar = [...kosar];
    //Megnézem van-e már ilyen termék a kosárban
    const vanIlyenTermek = segedKosar.find((elem) => elem.id === termek.id);
    if (vanIlyenTermek === undefined) {
      //ha nincs beállítom a termék darabszámát 1-re
      termek.db = 1;
      segedKosar.push(termek);
    } else {
      // ha van, akkor csak a darabszámot növelem.
      vanIlyenTermek.db++;
    }
    // a beállítófüggvénnyel frissítem a kosarat
    setKosar([...segedKosar]);
    console.log(kosar)
    osszeg()
  }
  function dbModosit(id, db){
    // adott termék darabszámának módosítása
    const segedKosar = [...kosar];
    const vanIlyenTermek = segedKosar.find((elem) => elem.id === id);    
    vanIlyenTermek.db = db;  
    // ha a darabszám 0, akkor tölöm a kosárból.   
    if (db===0){
      let termekIndex=segedKosar.indexOf(vanIlyenTermek)
      segedKosar.splice(termekIndex,1)
      
    }
    setKosar([...segedKosar]);
    osszeg()
  }
  function osszeg(){
    //fizetendő összár számítása
    let szum=kosar.reduce((sv,termek)=>{return sv+termek.price*termek.db;},0)
    setTotal(szum)
  }
  return (
    <KosarContext.Provider value={{ kosarba, kosar, dbModosit, total }}>
      {children}
    </KosarContext.Provider>
  );
};