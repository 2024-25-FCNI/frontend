import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Kezdolap from "./pages/Kezdolap";
import Bejelentkezes from "./pages/Bejelentkezes";
import Regisztracio from "./pages/Regisztracio";
import VendegLayout from "./layouts/VendegLayout";
import Admin from "./pages/Admin";
import Profil from "./pages/Profil";
import Fizetes from "./pages/Fizetes";
import Termek from "./pages/Termek";
import Bemutatkozas from "./pages/Bemutatkozas";
import Analitika from "./pages/Analitika";
import ElfelejtettJelszo from "./pages/ElfelejtettJelszo";
import Videok from "./pages/Videok";
import UjJelszo from "./pages/UjJelszo";
import Loader from "./components/public/Loader";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600); // Időtartam: 0.6s
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading && <Loader />}

      <Routes>
        <Route path="/" element={<VendegLayout />}>
          <Route path="/reset-password" element={<UjJelszo />} />
          <Route index element={<Kezdolap />} />
          <Route path="/videok" element={<Videok />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/bejelentkezes" element={<Bejelentkezes />} />
          <Route path="/regisztracio" element={<Regisztracio />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/fizetes" element={<Fizetes />} />
          <Route path="/termek/:termekId" element={<Termek />} />
          <Route path="/bemutatkozas" element={<Bemutatkozas />} />
          <Route path="/analitika" element={<Analitika />} />
          <Route path="/elfelejtett-jelszo" element={<ElfelejtettJelszo />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
