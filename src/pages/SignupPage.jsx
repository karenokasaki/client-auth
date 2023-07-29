import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupPage() {
   const [form, setForm] = useState({
      email: "",
      password: "",
      name: "",
      telefone: "",
   });

   const [isPasswordValid, setIsPasswordValid] = useState(true); // State para validação da senha

   const navigate = useNavigate();

   function handleChange(e) {
      setForm({ ...form, [e.target.name]: e.target.value });

      // Realiza a validação da senha em tempo real
      const passwordRegex =
         /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
      setIsPasswordValid(passwordRegex.test(e.target.value));
   }

   async function handleSubmit(event) {
      event.preventDefault();
      try {
         const response = await axios.post(
            "http://localhost:4000/user/signup",
            form
         );
         console.log(response);

         navigate("/login");
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div className="max-w-md mx-auto mt-8">
         <h1 className="text-2xl font-bold mb-4 text-center text-gray-500">
            Sign up
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
               {!isPasswordValid && (
                  <p className="text-red-500 text-xs">
                     Deve conter pelo menos 8 caracteres, 1 letra maiúscula, 1
                     letra minúscula, 1 número e 1 caractere especial.
                  </p>
               )}
            </div>
            <div className="mb-4">
               <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
               >
                  Name
               </label>
               <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:border-blue-500"
                  required
               />
            </div>
            <div className="mb-4">
               <label
                  htmlFor="telefone"
                  className="block text-gray-700 font-bold mb-2"
               >
                  Telefone
               </label>
               <input
                  type="tel"
                  name="telefone"
                  value={form.telefone}
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
                  Sign up
               </button>
            </div>
         </form>
      </div>
   );
}

export default SignupPage;
