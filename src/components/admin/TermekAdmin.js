import React from "react";
import { useAdminContext } from "../../contexts/AdminContext";
import { useNavigate } from "react-router-dom";

export function TermekAdmin({ termek }) {
  const { torol } = useAdminContext();
  const navigate = useNavigate();

  const handleDelete = (termek_id) => {
    if (window.confirm("Biztosan törölni szeretnéd ezt a videót?")) {
      torol(termek_id);
    }
  };

  /*  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16).replace("T", " ");
  }; */

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("hu-HU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <tr
      onClick={() => navigate(`/termek/${termek.termek_id}`)}
      style={{ cursor: "pointer" }}
    >
      <td>{termek.cim}</td>
      <td>{termek.bemutatas}</td>

      <td className="admincell">{termek.leiras}</td>

      <td>{termek.ar} Ft</td>
      <td>{termek.hozzaferesi_ido} nap</td>
      {/* <td>{Array.isArray(termek.cimkek) ? termek.cimkek.join(", ") : ""}</td> */}
      <td>
        {Array.isArray(termek.cimkek)
          ? termek.cimkek
              .map((cimke) =>
                typeof cimke === "string"
                  ? cimke
                  : cimke?.elnevezes ?? JSON.stringify(cimke)
              )
              .join(", ")
          : ""}
      </td>

      <td>
        <img
          src={
            termek.kep && termek.kep.trim() !== ""
              ? `http://localhost:8000/kepek/${termek.kep}`
              : "/placeholder.png"
          }
          alt={termek.cim}
          className="admintermekkep"
          style={{ maxWidth: "80px", maxHeight: "80px", objectFit: "cover" }}
          onError={(e) => {
            e.target.src = "/placeholder.png";
          }}
        />
      </td>
      <td className="admincell">{termek.url}</td>
      <td>{formatDate(termek.created_at)}</td>
      <td>
        <button
          className="btn btn-outline-danger"
          onClick={(e) => {
            e.stopPropagation(); // ne navigáljon törlésre kattintva
            handleDelete(termek.termek_id);
          }}
        >
          ✘
        </button>
      </td>
    </tr>
  );
}

export default TermekAdmin;
