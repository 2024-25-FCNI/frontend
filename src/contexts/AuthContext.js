import { createContext, useContext, useState, useEffect } from "react";
import { myAxios } from "../api/axios";
import { useNavigate } from "react-router-dom";

import { KosarContext } from "./KosarContext";

 
const AuthContext = createContext();
 
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const { uritKosar } = useContext(KosarContext);
  
 
  // CSRF token beszerzése
  const csrf = async () => {
    try {
      await myAxios.get("/sanctum/csrf-cookie", { withCredentials: true });
    } catch (error) {
      console.error("CSRF token lekérése sikertelen:", error);
    }
};
 
 
  // Bejelentkezett felhasználó adatainak lekérdezése
  const getUser = async () => {
    try {
      const { data } = await myAxios.get("/api/user");
      console.log("Bejelentkezett felhasználó:", data);
      setUser(data);
    } catch (error) {
      console.error("Nem sikerült lekérdezni a felhasználót:", error);
      setUser(null);
    }
  };
 
  // Kijelentkezés
  const logout = async () => {
    await csrf();
 
    try {
      await myAxios.post("/logout");
      setUser(null);
      uritKosar();
      navigate("/"); // Kijelentkezés után átirányítás
    } catch (error) {
      console.error("Hiba történt a kijelentkezés során:", error);
      if (error.response?.status === 401) {
        setUser(null);
        navigate("/");
      }
    }
  };
 
  // Bejelentkezés / Regisztráció
  const loginReg = async (adat, vegpont) => {
    await csrf();
    setErrors({}); // Hibaüzenetek törlése az új próbálkozás előtt
 
    try {
      const response = await myAxios.post(vegpont, adat, { withCredentials: true });
      console.log("Sikeres művelet:", response.data);
      await getUser(); // User adatainak frissítése
      navigate("/"); // Sikeres bejelentkezés vagy regisztráció után átirányítás
    } catch (error) {
      console.error("Hiba történt:", error);
 
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
      } else {
        setErrors({ general: "Ismeretlen hiba történt, próbáld újra." });
      }
    }
  };
 
  // Bejelentkezett felhasználó lekérdezése, ha nincs beállítva
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);  
  

  /* useEffect(() => {
    getUser(); // mindig lekéri frissen, ha betölt
  }, []);  */
 
  return (
    <AuthContext.Provider value={{ logout, loginReg, errors, getUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};
 
export default function useAuthContext() {
  return useContext(AuthContext);
}
 