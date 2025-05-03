import { useAdminContext } from "../contexts/AdminContext";
import useAuthContext from "../contexts/AuthContext";
import TermekekAdmin from "../components/admin/TermekekAdmin";
import UjTermek from "../components/admin/UjTermek";

function Admin() {
  const { termekek, postData } = useAdminContext(); // ⬅️ csak ezt használd
  const { logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("❌ Kijelentkezési hiba:", error);
    }
  };

  return (
    <main className="row g-5" style={{ margin: "20px" }}>
      <section style={{ marginBottom: "20px" }}>
        <UjTermek postData={postData} existingVideos={[]} />
      </section>

      <article style={{ marginBottom: "20px", padding: "10px" }}>
        {termekek.length > 0 ? <TermekekAdmin termekek={termekek} /> : "Nincs adat"}
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
