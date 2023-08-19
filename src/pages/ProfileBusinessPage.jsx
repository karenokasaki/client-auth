import { useState, useEffect } from "react";
import api from "../axios/api";
import { Tab } from "@headlessui/react";
import { Link } from "react-router-dom";

export default function ProfileBusinessPage() {
   const [business, setBusiness] = useState({});
   const [reload, setReload] = useState(true);
   const [formProfile, setFormProfile] = useState({
      name: "",
      telefone: "",
      description: "",
      email: "",
   });

   useEffect(() => {
      async function getProfile() {
         try {
            const response = await api.get("/business/profile");
            setBusiness(response.data);
            setFormProfile({ ...formProfile, ...response.data });
         } catch (error) {
            console.log(error);
         }
      }

      getProfile();
   }, [reload]);

   function handleChangeProfile(e) {
      setFormProfile({ ...formProfile, [e.target.name]: e.target.value });
   }

   async function handleSubmitProfile(e) {
      e.preventDefault();
      try {
         await api.put("/business/edit", formProfile);
         setReload(!reload);
      } catch (error) {
         console.log(error);
      }
   }

   console.log(business);

   return (
      <div className="flex flex-col gap-4">
         <Link
            to="/business/criar-vaga"
            className="bg-indigo-500 p-3 text-center text-white rounded-lg shadow-lg hover:bg-indigo-400"
         >
            Crie uma vaga
         </Link>

         <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
               <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 text-blue-100 hover:bg-white/[0.12] hover:text-white">
                  Vagas
               </Tab>
               <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 text-blue-100 hover:bg-white/[0.12] hover:text-white">
                  Profile
               </Tab>
            </Tab.List>
            <Tab.Panels className="mt-2">
               <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
                  <div>
                     {business.offers &&
                        business.offers.map((job) => {
                           return (
                              <div key={job._id}>
                                 <h2>
                                    {job.title} - {job.createdAt}
                                 </h2>
                              </div>
                           );
                        })}
                  </div>
               </Tab.Panel>

               <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400">
                  <form onSubmit={handleSubmitProfile}>
                     <div className="flex flex-col space-y-2 mb-2">
                        <label className="text-gray-600 font-semibold">
                           Email
                        </label>
                        <input
                           name="email"
                           value={formProfile.email}
                           className="text-gray-400 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
                           disabled
                           onChange={handleChangeProfile}
                        />
                     </div>

                     <div className="flex flex-col space-y-2 mb-2">
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

                     <div className="flex flex-col space-y-2 mb-2">
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

                     <div className="flex flex-col space-y-2 mb-2">
                        <label className="text-gray-600 font-semibold">
                           Descrição
                        </label>
                        <input
                           name="description"
                           value={formProfile.description}
                           onChange={handleChangeProfile}
                           className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
                        />
                     </div>

                     <button className="mt-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                        Salvar alterações
                     </button>
                  </form>
               </Tab.Panel>
            </Tab.Panels>
         </Tab.Group>
      </div>
   );
}
