import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
   const navigate = useNavigate();

   const [form, setForm] = useState({
      email: "",
      password: "",
   });

   const [userType, setUserType] = useState("user");

   function handleChange(e) {
      setForm({ ...form, [e.target.name]: e.target.value });
   }

   async function handleSubmit(e) {
      e.preventDefault();
      try {
         //lógica de submit do form
         let response;

         if (userType === "user") {
            response = await axios.post(
               "http://localhost:4000/user/login",
               form
            );
         }

         if (userType === "business") {
            response = await axios.post(
               "http://localhost:4000/business/login",
               form
            );
         }

         //GUARDAR O TOKEN
         const token = response.data.token;
         localStorage.setItem("userToken", token);
         localStorage.setItem("userId", response.data.user._id);

         if (userType === "user") navigate("/profile");
         if (userType === "business") navigate("/profile-business");
      } catch (error) {
         // lógica se der erro na requisição
         console.log(error);
      }
   }

   function handleRadio(e) {
      setUserType(e.target.value);
   }

   return (
      <div>
         <h1>Login Page</h1>

         <form onSubmit={handleSubmit}>
            <div>
               <label>
                  Usuário
                  <input
                     type="radio"
                     name="userType"
                     value="user"
                     onChange={handleRadio}
                  />
               </label>

               <label>
                  Empresa
                  <input
                     type="radio"
                     name="userType"
                     value="business"
                     onChange={handleRadio}
                  />
               </label>
            </div>

            <div>
               <label>Email</label>
               <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
               />
            </div>

            <div>
               <label>Senha</label>
               <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
               />
            </div>

            <button>LOGIN</button>
         </form>
      </div>
   );
}

export default LoginPage;
