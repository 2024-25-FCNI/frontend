import { useContext, useEffect, useState } from "react";
import useAuthContext from "../contexts/AuthContext";
import { ApiContext } from "../contexts/ApiContext";
import TermekekPublic from "../components/public/TermekekPublic";

export default function Kezdolap() {
  const { user } = useAuthContext();
  const { getData } = useContext(ApiContext); 
  const [termekek, setTermekek] = useState([]); 

  useEffect(() => {
    getData("/api/termekek", (adatok) => {
      setTermekek(adatok); 
    });
  }, [getData]);


  return (
    <div>
      <h1>Kezdőlap</h1>
      <p>
        Bejelentkezett felhasználó:{" "}
        {user == null ? "Nincs bejelentkezett felhasználó!" : user.name}
      </p>
      <TermekekPublic termekek={termekek} />
    </div>
  );

  
}





/* import { useContext } from "react";
import useAuthContext from "../contexts/AuthContext";
import { ApiContext } from "../contexts/ApiContext";
import TermekekPublic from "../components/public/TermekekPublic";

export default function Kezdolap() {
  const { user } = useAuthContext();
  const { apiData } = useContext(ApiContext);

  return (
    <div>
      <h1>Kezdőlap</h1>
      <p>
        Bejelentkezett felhasználó:{" "}
        {user == null ? "Nincs bejelentkezett felhasználó!" : user.name}
      </p>

      <article>
                {apiData ? <TermekekPublic termekek={apiData} /> : "Nincs adat"}
      </article> 
     
    </div>
  );
} */

