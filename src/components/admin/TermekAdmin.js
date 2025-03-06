import React from "react";
import { useAdminContext } from "../../contexts/AdminContext";

export function TermekAdmin({ termek }) { 
  const { torolVideo } = useAdminContext(); 
  

  // Törlés megerősítése és végrehajtása
  const handleDelete = (id) => {
    if (window.confirm("Biztosan törölni szeretnéd ezt a videót?")) {
      torolVideo(id);
    }
  };

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
        <button 
          className="btn btn-outline-danger" 
          onClick={() => handleDelete(termek?.termek_id)}
        >
          ✘
        </button>
      </td>
    </tr>
  );
}

export default TermekAdmin;
