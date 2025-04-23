import { useContext } from "react";
import { ApiContext } from "../contexts/ApiContext";
import useAuthContext from "../contexts/AuthContext";
 
import TermekekAdmin from "../components/admin/TermekekAdmin";
import UjTermek from "../components/admin/UjTermek";
 
function Admin() {
  const { apiData, fetchData } = useContext(ApiContext); // Ha szükséges frissítés
  const { logout } = useAuthContext();
  // ✅ `postData` függvény fájlfeltöltéssel
  const postData = async (url, data, isFormData = false) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api${url}`, {
        method: "POST",
        body: data,
        headers: isFormData
          ? { "Accept": "application/json" } // FormData esetén ne legyen "Content-Type", csak "Accept"
          : { "Content-Type": "application/json", "Accept": "application/json" },
      });
  
      if (!response.ok) {
        throw new Error("Hiba történt a feltöltés során");
      }
  
      const result = await response.json();
      console.log("✅ Sikeres feltöltés:", result);
  
    } catch (error) {
      console.error("❌ Feltöltési hiba:", error);
    }
  };
  
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
        {/* ✅ `postData` átadása a `UjTermek` komponensnek */}
        <UjTermek postData={postData} existingVideos={[]} />
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
