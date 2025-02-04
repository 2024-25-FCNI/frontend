import React from "react";
import TermekAdmin from "./TermekAdmin";
import TablaFejlec from "./TablaFejlec";

function TermekekAdmin(props) {
  console.log(props)
  return (
    <table className="table table-stripped">
      <thead>
        <TablaFejlec termek={props.termekek[0]} />
      </thead>
      <tbody>
        {props.termekek.map((termek) => {
          return <TermekAdmin termek={termek} key={termek.id} />;
        })}
      </tbody>
    </table>
  );
}

export default TermekekAdmin;