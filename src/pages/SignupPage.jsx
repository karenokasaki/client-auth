import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";

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
      console.log("Botão de cadastrar foi clicado");
      try {
         // const url = chamada para api de upload
         console.log("Invocação da função para pegar a url");

         const url = await getUrl(photo);

         console.log("Upload feito. Url da foto: ", url);

         const formWithPhoto = {
            ...form,
            profilePicture: url,
         };

         console.log("Form com a url da foto adicionado");

         if (userType === "user") {
            await axios.post(
               "http://localhost:4000/user/signup",
               formWithPhoto
            );
         }
         if (userType === "business") {
            await axios.post(
               "http://localhost:4000/business/signup",
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

   function handleRadio(e) {
      setUserType(e.target.value);
   }

   return (
      <div>
         <div className="flex min-h-full flex-1 flex-col justify-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
               <div className="bg-white px-6 py-6 shadow sm:rounded-lg sm:px-12">
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
                           htmlFor="name"
                           className="block text-sm font-medium leading-6 text-gray-900"
                        >
                           Nome Completo
                        </label>
                        <input
                           type="text"
                           name="name"
                           value={form.name}
                           onChange={handleChange}
                           required
                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
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
                           htmlFor="telefone"
                           className="block text-sm font-medium leading-6 text-gray-900"
                        >
                           Telefone
                        </label>
                        <div className="mt-2">
                           <input
                              id="telefone"
                              name="telefone"
                              type="tel"
                              autoComplete="tel"
                              required
                              value={form.telefone}
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

                     <div className="mt-2 flex items-center justify-center">
                        <label
                           htmlFor="photo"
                           className="block text-sm font-medium leading-6 text-gray-900 mr-2"
                        >
                           Foto de perfil
                        </label>
                        <label className="bg-indigo-600 px-3 py-1.5 text-sm text-white rounded-md cursor-pointer hover:bg-indigo-500 focus:ring-indigo-600">
                           Selecionar Foto
                           <input
                              type="file"
                              accept="image/png, image/jpeg"
                              id="photo"
                              onChange={handlePhoto}
                              className="sr-only"
                           />
                        </label>
                     </div>

                     <div>
                        <button
                           type="submit"
                           className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                           CADASTRE-SE
                        </button>
                     </div>
                  </form>

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
      </div>
   );
}

export default SignupPage;
