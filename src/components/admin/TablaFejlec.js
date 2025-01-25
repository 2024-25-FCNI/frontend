import React from "react";

function TablaFejlec(props) {
  return (
    <tr>
      {Object.entries(props.termek).map(([kulcs, value]) => {
        if (kulcs !== "rating") {
          return <th key={kulcs}>{kulcs}</th>
        } else {
          return (null)
        }
      })}
      <th></th>
      <th></th>
    </tr>
  );
}

export default TablaFejlec;