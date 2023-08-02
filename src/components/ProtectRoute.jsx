import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectRoute({ Component }) {
   const navigate = useNavigate();

   const token = localStorage.getItem("user");

   useEffect(() => {
      if (!token) {
         navigate("/login");
      }
   }, [token, navigate]);

   return <Component />;
}
