import React from "react";

export function TermekAdmin(props) {
  console.log(props);

  function torol(id) {
    console.log("Törlés ID:", id);
  }

  function modosit(id) {
    console.log("Módosítás ID:", id);
  }

  // Dátum formázó függvény (csak YYYY-MM-DD HH:mm)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16).replace("T", " "); // Formázás: YYYY-MM-DD HH:mm
  };

  return (
    <tr>
      {Object.entries(props.termek).map(([kulcs, value]) => {
        if (kulcs === "image") {
          return (
            <td key={kulcs}>
              <img className="admintermekkep" src={value} alt="" />
            </td>
          );
        } else if (kulcs === "price") {
          return <td key={kulcs}>{value} Ft</td>; // Ft hozzáadása csak az árhoz
        } else if (kulcs === "created_at" || kulcs === "updated_at") {
          return <td key={kulcs}>{formatDate(value)}</td>; // Formázott dátum megjelenítése
        } else if (kulcs !== "rating") {
          return <td key={kulcs}>{value}</td>;
        } else {
          return null;
        }
      })}

      <td>
        <button className="btn btn-outline-danger" onClick={() => torol(props.termek.id)}>
          ✘
        </button>
      </td>
      <td>
        <button className="btn btn-outline-primary" onClick={() => modosit(props.termek.id)}>
          ✎
        </button>
      </td>
    </tr>
  );
}

export default TermekAdmin;
