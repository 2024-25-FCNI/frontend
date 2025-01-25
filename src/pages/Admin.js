import { useContext } from "react";
import { ApiContext } from "../contexts/ApiContext";

import TermekekAdmin from "../components/admin/TermekekAdmin";
import UjTermek from "../components/admin/UjTermek";

function Admin() {
  const { apiData } = useContext(ApiContext);
  return (
    <main className="row g-5">
      <section>
        <UjTermek />
      </section>
      <article>
        {apiData ? <TermekekAdmin termekek={apiData} /> : "Nincs adat"}
      </article>
    </main>
  );
}

export default Admin;