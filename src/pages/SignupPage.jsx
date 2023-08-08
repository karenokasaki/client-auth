import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";
import InputMask from "react-input-mask";

function SignupPage() {
   const navigate = useNavigate();

   const [form, setForm] = useState({
      name: "",
      email: "",
      telefone: "",
      password: "",
   });
   const [photo, setPhoto] = useState();
   const [userType, setUserType] = useState("user");
   // controll input
   function handleChange(e) {
      setForm({ ...form, [e.target.name]: e.target.value });
   }

   async function getUrl(photo) {
      //photo = state com a foto guardada
      try {
         const multiPartForm = new FormData();

         multiPartForm.append("picture", photo);

         const response = await api.post("/upload/file", multiPartForm);

         console.log(response);

         return response.data.url;
      } catch (error) {
         console.log(error);
      }
   }

   async function handleSubmit(e) {
      //lógica de submit do form
      e.preventDefault();
      try {
         const url = await getUrl(photo);

         const formWithPhoto = {
            ...form,
            profilePicture: url,
         };

         if (userType === "user") {
            await axios.post(
               "http://localhost:4000/user/signup-user",
               formWithPhoto
            );
         } else {
            await axios.post(
               "http://localhost:4000/user/signup-business",
               formWithPhoto
            );
         }

         navigate("/login");
      } catch (error) {
         // lógico se der erro na requisição
         alert("Erro ao cadastrar usuário");
         console.log(error);
      }
   }

   function handlePhoto(e) {
      //  console.log(e.target.files[0]); -> onde a foto está guardada
      setPhoto(e.target.files[0]);
      console.log("Foto foi escolhida");
   }

   console.log(form);

   return (
      <div className="md:flex items-center justify-center bg-gray-100 gap-10">
         <div className="bg-white mb-8 p-8 shadow-md rounded-md md:w-2/3">
            <h2 className="text-2xl font-semibold mb-4 text-center">
               Cadastre-se
            </h2>

            <form onSubmit={handleSubmit}>
               <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                     Nome Completo
                  </label>
                  <input
                     type="text"
                     name="name"
                     value={form.name}
                     onChange={handleChange}
                     className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-md focus:ring focus:ring-indigo-300 focus:border-indigo-300 focus:outline-none"
                     required
                  />
               </div>
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
                     Telefone
                  </label>
                  <InputMask
                     mask="(99) 99999-9999"
                     maskChar=" "
                     type="tel"
                     name="telefone"
                     value={form.telefone}
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
               <div className="mb-4 flex items-center justify-around">
                  <label className="block text-sm font-medium text-gray-700">
                     Foto de perfil
                  </label>
                  <div className="mt-1 flex items-center space-x-2">
                     <label>
                        <span className="inline-block bg-gray-100 px-4 py-2 rounded-md text-gray-500 hover:bg-gray-200 hover:text-gray-700 cursor-pointer">
                           Escolher arquivo
                        </span>
                        <input
                           type="file"
                           accept="image/png, image/jpeg"
                           onChange={handlePhoto}
                           className="hidden"
                        />
                     </label>
                  </div>
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
               </div>

               <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-opacity-50"
               >
                  CADASTRE-SE
               </button>
            </form>
         </div>

         <div className="md:w-1/3 flex flex-col gap-5 ">
            <div className="bg-white p-4 rounded-md shadow-md hover:bg-indigo-100">
               <h1 className="text-lg font-semibold mb-2">
                  Se inscreva para vagas de emprego que realmente existem!
               </h1>
               <p className="text-gray-600">
                  Encontre oportunidades reais e alavanque sua carreira.
                  Junte-se a nós para ter acesso a empregos autênticos e
                  relevantes.
               </p>
            </div>

            <div className="bg-white p-4 rounded-md shadow-md hover:bg-indigo-100">
               <h1 className="text-lg font-semibold mb-2">
                  Encontre empregos rapidamente com o Dev Suport!
               </h1>
               <p className="text-gray-600">
                  Navegue por uma ampla variedade de oportunidades de carreira e
                  garanta uma busca eficiente por empregos autênticos. Junte-se
                  a nós para acelerar sua jornada profissional.
               </p>
            </div>
         </div>
      </div>
   );
}

export default SignupPage;
