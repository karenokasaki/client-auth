import { useState } from "react";
import axios from "axios";

function SignupPage() {
   const [form, setForm] = useState({
      name: "",
      email: "",
      telefone: "",
      password: "",
   });

   // controll input
   function handleChange(e) {
      setForm({ ...form, [e.target.name]: e.target.value });
   }

   async function handleSubmit(e) {
      e.preventDefault();
      try {
         //lógica de submit do form

         const response = await axios.post("http://localhost:4000/user/signup", form);

         console.log(response);
      } catch (error) {
         // lógico se der erro na requisição
      }
   }

   console.log(form);

   return (
      <div>
         <h1>Signup Page</h1>

         <form onSubmit={handleSubmit}>
            <div>
               <label>Nome Completo</label>
               <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
               />
            </div>

            <div>
               <label>Email</label>
               <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
               />
            </div>

            <div>
               <label>Telefone</label>
               <input
                  type="tel"
                  name="telefone"
                  value={form.telefone}
                  onChange={handleChange}
               />
            </div>

            <div>
               <label>Senha</label>
               <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
               />
            </div>

            <button>CADASTRE-SE</button>
         </form>
      </div>
   );
}

export default SignupPage;
