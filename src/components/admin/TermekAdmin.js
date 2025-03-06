import React from "react";
import { useAdminContext } from "../../contexts/AdminContext"; // Importáljuk az admin kontextust

export function TermekAdmin({ termek }) { // ✅ props helyett közvetlenül destrukturáljuk a `termek`-et
  const { torol, modosit } = useAdminContext(); // ✅ Helyes függvénynevek az AdminContextből

  // Dátum formázás
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16).replace("T", " ");
  };

  return (
    <tr>
      {Object.entries(termek).map(([kulcs, value]) => {
        if (kulcs === "image") {
          return (
            <td key={kulcs}>
              <img className="admintermekkep" src={value} alt="" />
            </td>
          );
        } else if (kulcs === "price") {
          return <td key={kulcs}>{value} Ft</td>;
        } else if (kulcs === "created_at" || kulcs === "updated_at") {
          return <td key={kulcs}>{formatDate(value)}</td>;
        } else if (kulcs !== "rating") {
          return <td key={kulcs}>{value}</td>;
        } else {
          return null;
        }
      })}
      <td>
        <button className="btn btn-outline-danger" onClick={() => torol(termek?.id)}>
          ✘
        </button>
      </td>
      <td>
        <button 
          className="btn btn-outline-primary" 
          onClick={() => modosit(termek.id, { name: "Új név", price: 9999 })}
        >
          ✎
        </button>
      </td>
    </tr>
  );
}

export default TermekAdmin;
