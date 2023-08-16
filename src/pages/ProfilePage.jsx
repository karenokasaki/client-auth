import api from "../axios/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";

function ProfilePage() {
   const [user, setUser] = useState({});
   const [formProfile, setFormProfile] = useState({
      name: "",
      telefone: "",
      curriculo: "",
   });

   const [reload, setReload] = useState(true);

   const navigate = useNavigate();

   useEffect(() => {
      async function getProfile() {
         try {
            const response = await api.get("/user/profile");
            setUser(response.data);
            setFormProfile(response.data);
         } catch (error) {
            console.log(error);
         }
      }

      getProfile();
   }, [reload]);

   function handleChangeProfile(e) {
      setFormProfile({ ...formProfile, [e.target.name]: e.target.value });
   }

   function handleLogout(e) {
      e.preventDefault();
      localStorage.removeItem("userToken");
      navigate("/login");
   }

   function classNames(...classes) {
      return classes.filter(Boolean).join(" ");
   }

   async function handleSubmitProfile(e) {
      e.preventDefault();
      try {
         const response = await api.put("/user/edit", formProfile);
         setReload(!reload);
      } catch (error) {
         console.log(error);
      }
   }

   console.log(formProfile);

   return (
      <div>
         <h1>Olá, {user.name}</h1>

         <p>Email: {user.email}</p>

         <p>Telefone: {user.telefone}</p>

         <img src={user.profilePicture} width={100} />

         <button onClick={handleLogout}>Logout</button>

         <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
               <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 text-blue-100 hover:bg-white/[0.12] hover:text-white">
                  Profile
               </Tab>
               <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 text-blue-100 hover:bg-white/[0.12] hover:text-white">
                  Currículo
               </Tab>
               <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 text-blue-100 hover:bg-white/[0.12] hover:text-white">
                  Histórico
               </Tab>
            </Tab.List>
            <Tab.Panels className="mt-2">
               <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
                  <form onSubmit={handleSubmitProfile}>
                     <div className="flex flex-col space-y-2">
                        <label className="text-gray-600 font-semibold">
                           Nome
                        </label>
                        <input
                           name="name"
                           value={formProfile.name}
                           onChange={handleChangeProfile}
                           className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
                        />
                     </div>

                     <div className="flex flex-col space-y-2">
                        <label className="text-gray-600 font-semibold">
                           Telefone
                        </label>
                        <input
                           name="telefone"
                           value={formProfile.telefone}
                           onChange={handleChangeProfile}
                           className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
                        />
                     </div>

                     <button className="mt-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                        Salvar alterações
                     </button>
                  </form>
               </Tab.Panel>
               <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
                  <form onSubmit={handleSubmitProfile}>
                     <div className="flex flex-col space-y-2">
                        <label className="text-gray-600 font-semibold">
                           Curriculo
                        </label>
                        <textarea
                           rows={10}
                           name="curriculo"
                           value={formProfile.curriculo}
                           onChange={handleChangeProfile}
                           className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
                        />
                     </div>

                     <button className="mt-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                        Salvar alterações
                     </button>
                  </form>
               </Tab.Panel>
               <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
                  LISTAR OS JOBS
               </Tab.Panel>
            </Tab.Panels>
         </Tab.Group>
      </div>
   );
}

export default ProfilePage;
