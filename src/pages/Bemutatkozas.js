import React from "react";
import { Link } from "react-router-dom";

export default function Bemutatkozas() {
  return (
    <div className="container mt-5">
      <h1>Bemutatkozás</h1>
      <p>Üdvözlünk az oldalunkon!</p>
      <p>
        Szöveg, szöveg, szöveg, szöveg, szöveg, szöveg, szöveg, szöveg, szöveg, szöveg, szöveg
      </p>
      <div className="mt-4">
        <Link to="/konyv">
          <button className="btn btn-primary">Könyv</button>
        </Link>
      </div>
    </div>
  );
}
