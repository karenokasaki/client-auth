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
         // const url = chamada para api de upload
         const url = await getUrl(photo);

         const formWithPhoto = {
            ...form,
            profilePicture: url,
         };

         console.log(formWithPhoto);

         await axios.post("http://localhost:4000/user/signup", formWithPhoto);

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
   }

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
