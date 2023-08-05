import { useNavigate } from "react-router-dom";

export default function ProtectRoute({ Component }) {
   const navigate = useNavigate();

   const token = localStorage.getItem("userToken");

   if (token) {
      //se o token existir vamos mostrar o componente
      return <Component />;
   } else {
      // se o token não existir, enviar o usuário para a tela de login
      navigate("/login");
   }
}
