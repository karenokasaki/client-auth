import api from "../axios/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
   const [user, setUser] = useState({});

   const navigate = useNavigate();

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

   function handleLogout(e) {
      e.preventDefault();
      localStorage.removeItem("userToken");
      navigate("/login");
   }

   return (
      <div>
         <h1>Profile Page</h1>

         <h1>Olá, {user.name}</h1>

         <p>Email: {user.email}</p>

         <img src={user.profilePicture} width={100} />

         <button onClick={handleLogout}>Logout</button>
      </div>
   );
}

export default ProfilePage;
