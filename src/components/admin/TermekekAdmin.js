import React from "react";
import TermekAdmin from "./TermekAdmin";
import TablaFejlec from "./TablaFejlec";
import "../../styles/TermekekTablazatAdmin.css"; 

function TermekekAdmin({ termekek }) {
  if (!termekek || termekek.length === 0) {
    return <p>Nincsenek termékek.</p>;
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <TablaFejlec key="tabla-fejlec" termek={termekek[0]} />
        </thead>
        <tbody>
          {termekek.map((termek) => (
            <TermekAdmin key={termek.termek_id || termek.id} termek={termek} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TermekekAdmin;
