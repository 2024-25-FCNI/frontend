import React from 'react';
import TermekPublic from './VideoPublic';

function TermekekPublic(props) {
  return (
    <div className="row cols-1 row-cols-sm-2 row-cols-md-3 g-4">
      {props.termekek.map((termek) => {
        console.log("Termék objektum:", termek); // Ellenőrzés: Megnézzük, mit kap a komponens
        return <TermekPublic termek={termek} key={termek.termek_id} />; // Módosítás: termek_id használata
      })}
    </div>
  );
}

export default TermekekPublic;
