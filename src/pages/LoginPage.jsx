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
         const userId = response.data.user._id;
         const userRole = response.data.user.role;

         localStorage.setItem("userToken", token);
         localStorage.setItem("userId", userId);
         localStorage.setItem("userRole", userRole);

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
         <div className="flex min-h-full flex-1 flex-col justify-center py-6 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
               <img
                  className="mx-auto h-10 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
               />
               <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Entre na sua conta
               </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
               <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                  <form onSubmit={handleSubmit} className="space-y-6">
                     <div className="flex gap-6 justify-evenly">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                           Candidato
                           <input
                              type="radio"
                              name="userType"
                              value="user"
                              onChange={handleRadio}
                              className="form-radio h-4 w-4 text-indigo-600 ms-2"
                           />
                        </label>

                        <label className="block text-sm font-medium leading-6 text-gray-900">
                           Empresa
                           <input
                              type="radio"
                              name="userType"
                              value="business"
                              onChange={handleRadio}
                              className="form-radio h-4 w-4 text-indigo-600 ms-2"
                           />
                        </label>
                     </div>

                     <div>
                        <label
                           htmlFor="email"
                           className="block text-sm font-medium leading-6 text-gray-900"
                        >
                           Email
                        </label>
                        <div className="mt-2">
                           <input
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              required
                              value={form.email}
                              onChange={handleChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           />
                        </div>
                     </div>

                     <div>
                        <label
                           htmlFor="password"
                           className="block text-sm font-medium leading-6 text-gray-900"
                        >
                           Senha
                        </label>
                        <div className="mt-2">
                           <input
                              id="password"
                              name="password"
                              type="password"
                              autoComplete="current-password"
                              required
                              value={form.password}
                              onChange={handleChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           />
                        </div>
                     </div>

                     <div>
                        <button
                           type="submit"
                           className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                           Sign in
                        </button>
                     </div>
                  </form>
               </div>

               {/* Adicionar whatsapp */}
               <p className="mt-10 text-center text-sm text-gray-500">
                  Não conseguiu se cadastrar?{" "}
                  <a
                     href="https://wa.me/+5511981860227/?text=Não%20consegui%20me%20cadastrar%20no%20site"
                     className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     Entre em contato com a gente!
                  </a>
               </p>
            </div>
         </div>
      </div>
   );
}

export default LoginPage;
