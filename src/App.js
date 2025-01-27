import { BrowserRouter, Route, Routes } from "react-router-dom";
import Kezdolap from "./pages/Kezdolap";
import Bejelentkezes from "./pages/Bejelentkezes";
import Regisztracio from "./pages/Regisztracio";
import VendegLayout from "./layouts/VendegLayout";
import Admin from "./pages/Admin";
import Profil from "./pages/Profil";

function App() {
    return (
      
        <Routes>
            <Route path="/" element={<VendegLayout />}>
                {/* <Route index element={<Kezdolap />} /> */}
                <Route index element={<Kezdolap />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="bejelentkezes" element={<Bejelentkezes />} />
                <Route path="regisztracio" element={<Regisztracio />} />
                <Route path="admin" element={<Admin />} />
            </Route>
        </Routes>
      
    );
}

export default App;