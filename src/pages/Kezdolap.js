import { useContext } from "react";
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

      {/* <article>
                {apiData ? <TermekekPublic termekek={apiData} /> : "Nincs adat"}
            </article> */}

      <article>
        {apiData && apiData.length > 0 ? (
          <TermekekPublic termekek={apiData} />
        ) : (
          <p>Nincs adat vagy betöltés alatt...</p>
        )}
      </article>

      
    </div>
  );
}
