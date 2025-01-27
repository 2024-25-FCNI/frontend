import { createContext, useContext, useState } from "react";
import { myAxios } from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const csrf = () => myAxios.get("/sanctum/csrf-cookie");

  //bejelentkezett felhasználó adatainak lekérdezése
  const getUser = async () => {
    const { data } = await myAxios.get("/api/user");
    console.log(data)
    setUser(data);
  };
  /* const logout = async () => {
    await csrf();

    myAxios.post("/logout").then((resp) => {
      setUser(null);
      console.log(resp);
    });
  }; */

  const logout = async () => {
    await csrf();
  
    try {
      await myAxios.post("/logout");
      setUser(null);
      navigate("/"); // Kijelentkezés után a bejelentkezési oldalra irányít
    } catch (error) {
      console.error("Hiba történt a kijelentkezés során:", error);
      if (error.response && error.response.status === 401) {
        // Ha a szerver 401-es hibát ad vissza, töröljük a felhasználói állapotot
        setUser(null);
        navigate("/");
      }
    }
  };

  const loginReg = async ({ ...adat }, vegpont) => {
    //lekérjük a csrf tokent
    await csrf();
    console.log(adat,vegpont);

    try {
      await myAxios.post(vegpont, adat);
      console.log("siker");
      //sikeres bejelentkezés/regisztráció esetén
      //Lekérdezzük a usert
      //await getUser();
      //elmegyünk  a kezdőlapra
      getUser()
      navigate("/");
      
    } catch (error) {
      console.log(error);
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ logout, loginReg, errors, getUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};
export default function useAuthContext() {
  return useContext(AuthContext);
}