import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
   const navigate = useNavigate();

   const [form, setForm] = useState({
      email: "",
      password: "",
   });

   function handleChange(e) {
      setForm({ ...form, [e.target.name]: e.target.value });
   }

   async function handleSubmit(e) {
      e.preventDefault();
      try {
         //lógica de submit do form

         const response = await axios.post(
            "http://localhost:4000/user/login",
            form
         );

         //GUARDAR O TOKEN
         const token = response.data.token;
         localStorage.setItem("userToken", token);

         navigate("/profile");
      } catch (error) {
         // lógico se der erro na requisição
         console.log(error);
      }
   }

   return (
      <div>
         <h1>Login Page</h1>

         <form onSubmit={handleSubmit}>
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
