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

         if (userType === "user") {
            const response = await axios.post(
               "http://localhost:4000/user/login",
               form
            );

            //GUARDAR O TOKEN
            const token = response.data.token;
            localStorage.setItem("userToken", token);

            navigate("/profile-user");
         } else {
            const response = await axios.post(
               "http://localhost:4000/business/login",
               form
            );

            //GUARDAR O TOKEN
            const token = response.data.token;
            localStorage.setItem("userToken", token);

            navigate("/profile-business");
         }
      } catch (error) {
         // lógico se der erro na requisição
         console.log(error);
      }
   }

   return (
      <div className="flex justify-center items-center bg-gray-100">
         <div className="bg-white p-8 shadow-md rounded-md w-96">
            <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
            <div className="flex items-center space-x-2">
               <label>
                  <input
                     type="radio"
                     name="userType"
                     value="user"
                     checked={userType === "user"}
                     onChange={() => setUserType("user")}
                     className="mr-1"
                  />
                  Usuário
               </label>
               <label>
                  <input
                     type="radio"
                     name="userType"
                     value="company"
                     checked={userType === "company"}
                     onChange={() => setUserType("company")}
                     className="mr-1"
                  />
                  Empresa
               </label>
            </div>
            <form onSubmit={handleSubmit}>
               <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                     Email
                  </label>
                  <input
                     type="email"
                     name="email"
                     value={form.email}
                     onChange={handleChange}
                     className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-md focus:ring focus:ring-indigo-300 focus:border-indigo-300 focus:outline-none"
                     required
                  />
               </div>
               <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                     Senha
                  </label>
                  <input
                     type="password"
                     name="password"
                     value={form.password}
                     onChange={handleChange}
                     className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-md focus:ring focus:ring-indigo-300 focus:border-indigo-300 focus:outline-none"
                     required
                  />
               </div>
               <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-opacity-50"
               >
                  LOGIN
               </button>
            </form>
         </div>
      </div>
   );
}

export default LoginPage;
