import React from "react";
import TermekAdmin from "./TermekAdmin";
import TablaFejlec from "./TablaFejlec";

function TermekekAdmin({ termekek }) {  // Destructuring props
  if (!termekek || termekek.length === 0) {
    return <p>Nincsenek termékek.</p>;
  }

  return (
    <table className="table table-striped">
      <thead>
        <TablaFejlec key="tabla-fejlec" termek={termekek[0]} />
      </thead>
      <tbody>
        {termekek.map((termek) => (
          <TermekAdmin key={termek.termek_id || termek.id} termek={termek} />
        ))}
      </tbody>
    </table>
  );
}

export default TermekekAdmin;
