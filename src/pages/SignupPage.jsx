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
         <h1>Signup Page</h1>

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
               <label>Nome Completo</label>
               <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
               />
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
               <label>Telefone</label>
               <input
                  type="tel"
                  name="telefone"
                  value={form.telefone}
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

            <div>
               <label>Foto de perfil</label>
               <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handlePhoto}
               />
            </div>

            <button>CADASTRE-SE</button>
         </form>
      </div>
   );
}

export default SignupPage;
