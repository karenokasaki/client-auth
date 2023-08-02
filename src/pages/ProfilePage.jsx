import api from "../axios/api";
import { useState, useEffect } from "react";

function ProfilePage() {
   const [user, setUser] = useState({});

   useEffect(() => {
      async function getProfile() {
         try {
            const response = await api.get("/user/profile");
            setUser(response.data);
         } catch (error) {
            console.log(error);
         }
      }

      getProfile();
   }, []);

   console.log(user);

   // Nome
   // Telefone
   // Foto
   return (
      <div>
         <h1>Profile Page</h1>
      </div>
   );
}

export default ProfilePage;
