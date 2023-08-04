import api from "../axios/api";
import { useState, useEffect } from "react";

function ProfilePage() {
   const [user, setUser] = useState();

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

 
   return (
      <div>
         <h1>Profile Page</h1>

         <h1>Olá, {user.name}</h1>

         <p>Email: {user.email}</p>

         <img src={user.profilePicture} width={100} />
      </div>
   );
}

export default ProfilePage;
