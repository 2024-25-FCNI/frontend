import { useContext } from "react";
import { ApiContext } from "../contexts/ApiContext";
import useAuthContext from "../contexts/AuthContext";

import TermekekAdmin from "../components/admin/TermekekAdmin";
import UjTermek from "../components/admin/UjTermek";

function Admin() {
  const { apiData } = useContext(ApiContext);
  const { logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Kijelentkezési hiba:", error);
    }
  };

  return (
    <main className="row g-5" style={{ margin: "20px" }}>
      <section style={{ marginBottom: "20px" }}>
        <UjTermek />
      </section>
      <article style={{ marginBottom: "20px", padding: "10px" }}>
        {apiData ? <TermekekAdmin termekek={apiData} /> : "Nincs adat"}
      </article>
      <footer className="mt-5" style={{ marginTop: "30px", textAlign: "center" }}>
        <button onClick={handleLogout} className="btn btn-danger">
          Kijelentkezés
        </button>
      </footer>
    </main>
  );
}

export default Admin;




/* import { useContext } from "react";
import { ApiContext } from "../contexts/ApiContext";
import useAuthContext from "../contexts/AuthContext";

import TermekekAdmin from "../components/admin/TermekekAdmin";
import UjTermek from "../components/admin/UjTermek";

function Admin() {
  const { apiData } = useContext(ApiContext);
  const { logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Kijelentkezési hiba:", error);
    }
  };

  return (
    <main className="row g-5">
      <section>
        <UjTermek />
      </section>
      <article>
        {apiData ? <TermekekAdmin termekek={apiData} /> : "Nincs adat"}
      </article>
      <footer className="mt-5">
        <button onClick={handleLogout} className="btn btn-danger">
          Kijelentkezés
        </button>
      </footer>
    </main>
  );
}

export default Admin;
 */