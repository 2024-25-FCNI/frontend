import React from "react";
//import "./Admin.css";

export function TermekAdmin(props) {
  function torol() {
    console.log(torol);
  }
  function modosit() {
    console.log(modosit);
  }
  return (
    <tr>
      {Object.entries(props.termek).map(([kulcs, value]) => {
        if (kulcs === "image") {
          return (
            <td key={kulcs}>
              <img className="admintermekkep" src={value} alt="" />
            </td>
          );
        } else if (kulcs !== "rating") {
          return <td key={kulcs}> {value}€</td>;
        } else if (kulcs === "price") {
          return <td key={kulcs}> {value}</td>;
        } else {
          return null;
        }
      })}

      <td>
        <button
          className="btn btn-outline-danger"
          onClick={() => {
            torol(props.termek.id);
          }}
        >
          ✘
        </button>
      </td>
      <td>
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            modosit(props.termek.id);
          }}
        >
          ✎
        </button>
      </td>
    </tr>
  );
}

export default TermekAdmin;