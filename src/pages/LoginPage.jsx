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

   async function handleSubmit(event) {
      event.preventDefault();
      try {
         const response = await axios.post(
            "http://localhost:4000/user/login",
            form
         );

         //guardar o token que vem da resposta do servidor
         console.log(response);

         navigate("/profile"); // Redirecionar para a página de dashboard após o login bem-sucedido
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div className="max-w-md mx-auto mt-8">
         <h1 className="text-2xl font-bold mb-4 text-center text-gray-500">
            Login
         </h1>
         <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="mb-4">
               <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
               >
                  Email
               </label>
               <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:border-blue-500"
                  required
               />
            </div>
            <div className="mb-4">
               <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold mb-2"
               >
                  Password
               </label>
               <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:border-blue-500"
                  required
               />
            </div>
            <div className="flex justify-center">
               <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none shadow"
               >
                  Login
               </button>
            </div>
         </form>
      </div>
   );
}

export default LoginPage;
