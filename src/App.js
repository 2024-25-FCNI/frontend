import { BrowserRouter, Route, Routes } from "react-router-dom";
import Kezdolap from "./pages/Kezdolap";
import Bejelentkezes from "./pages/Bejelentkezes";
import Regisztracio from "./pages/Regisztracio";
import VendegLayout from "./layouts/VendegLayout";
import Admin from "./pages/Admin";
import Profil from "./pages/Profil";
import Fizetes from "./pages/Fizetes";
import Termek from "./pages/Termek";
import Bemutatkozas from "./pages/Bemutatkozas";
import Konyv from "./pages/Konyv";
import Analitika from "./pages/Analitika";
import ElfelejtettJelszo from "./pages/ElfelejtettJelszo";
import Videok from "./pages/Videok";
import UjJelszo from "./pages/UjJelszo";

function App() {
    return (
      
        <Routes>
            <Route path="/" element={<VendegLayout />}>
                {/* <Route index element={<Kezdolap />} /> */}
                <Route path="/reset-password" element={<UjJelszo />} />        
                <Route index element={<Kezdolap />} />
                <Route path="/videok" element={<Videok />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="bejelentkezes" element={<Bejelentkezes />} />
                <Route path="regisztracio" element={<Regisztracio />} />
                <Route path="admin" element={<Admin />} />
                <Route path="/fizetes" element={<Fizetes />} />
                <Route path="/termek/:termekId" element={<Termek />} />
                <Route path="/bemutatkozas" element={<Bemutatkozas />} />
                <Route path="/konyv" element={<Konyv />} />
                <Route path="/analitika" element={<Analitika />} />
                <Route path="/elfelejtett-jelszo" element={<ElfelejtettJelszo />} />
                
            </Route>
        </Routes>
      
    );
}

export default App;