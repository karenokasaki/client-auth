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
   const [picture, setPicture] = useState(null); // State para armazenar a imagem do usuário

   const navigate = useNavigate();

   function handleChange(e) {
      setForm({ ...form, [e.target.name]: e.target.value });
   }

   async function handleUpload(e) {
      const file = e.target.files[0];
      console.log(file);
      // Cria um objeto do tipo FormData
      const formData = new FormData();

      formData.append("picture", file);
      // Envia o arquivo para o servidor
      const response = await axios.post(
         "http://localhost:4000/upload/image",
         formData
      );

      setPicture(response.data.url);
   }

   async function handleSubmit(event) {
      event.preventDefault();
      try {
         const response = await axios.post(
            "http://localhost:4000/user/signup",
            {
               ...form,
               profilePicture: picture,
            }
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
            <div className="mb-4">
               <label
                  htmlFor="profilePicture"
                  className="block text-gray-700 font-bold mb-2"
               >
                  Profile Picture
               </label>
               <div className="flex items-center justify-center bg-grey-lighter">
                  <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue">
                     <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                     >
                        <path
                           fillRule="evenodd"
                           d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                           clipRule="evenodd"
                        />
                        <path
                           fillRule="evenodd"
                           d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-6a6 6 0 100 12 6 6 0 000-12z"
                           clipRule="evenodd"
                        />
                     </svg>
                     <span className="mt-2 text-base leading-normal">
                        Select a file
                     </span>
                     <input
                        type="file"
                        name="profilePicture"
                        onChange={handleUpload}
                        className="hidden"
                     />
                  </label>
               </div>
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
