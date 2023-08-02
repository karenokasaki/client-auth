import { useState, useEffect } from "react";
import api from "../axios/api";

function ProfilePage() {
   const [user, setUser] = useState({});

   useEffect(() => {
      async function getUser() {
         try {
            const response = await api.get("/user/profile");
            setUser(response.data);
         } catch (error) {
            console.log(error);
         }
      }

      getUser();
   }, []);

   console.log(user);

   return <div></div>;
}

export default ProfilePage;
