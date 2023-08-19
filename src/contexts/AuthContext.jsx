import { useState, useEffect, createContext } from "react";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [idUser, setIdUser] = useState(null);

   const location = useLocation(); //url da página

   useEffect(() => {
      const token = localStorage.getItem("userToken");
      const id_user = localStorage.getItem("userId");

      if (token) {
         setIsLoggedIn(true);
         setIdUser(id_user);
      } else {
         setIsLoggedIn(false);
         setIdUser(null);
      }
   }, [location]);

   return (
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, idUser }}>
         {children}
      </AuthContext.Provider>
   );
}
