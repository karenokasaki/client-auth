import api from "../axios/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tab } from "@headlessui/react";
import dataFormater from "../utils/dataFormater";

function ProfilePage() {
   const [user, setUser] = useState({});
   const [formProfile, setFormProfile] = useState({
      name: "",
      telefone: "",
      curriculo: "",
      email: "",
   });

   const [reload, setReload] = useState(true);

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

   async function handleSubmitProfile(e) {
      e.preventDefault();
      try {
         await api.put("/user/edit", formProfile);
         setReload(!reload);
      } catch (error) {
         console.log(error);
      }
   }

   console.log(formProfile);

   async function handleUnapply(id_job) {
      try {
         await api.put(`/job/unapply/${id_job}`);
         setReload(!reload);
      } catch (error) {
         console.log(error);
      }
   }

   console.log(user);

   return (
      <div>
         <h1 className="mb-4 text-lg tracking-wide">Olá, {user.name}</h1>

         <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-purple-400 p-1">
               <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-purple-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2 text-purple-100 hover:bg-white/[0.12] hover:text-white">
                  Profile
               </Tab>
               <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-purple-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2 text-purple-100 hover:bg-white/[0.12] hover:text-white">
                  Currículo
               </Tab>
               <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-purple-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2 text-purple-100 hover:bg-white/[0.12] hover:text-white">
                  Histórico
               </Tab>
            </Tab.List>
            <Tab.Panels className="mt-2">
               <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ">
                  <form onSubmit={handleSubmitProfile}>
                     <div className="flex justify-center items-center">
                        <div className="w-full mr-6">
                           <div className="flex flex-col space-y-1 mb-2">
                              <label className="text-gray-600 font-semibold">
                                 Email
                              </label>
                              <input
                                 name="email"
                                 value={formProfile.email}
                                 onChange={handleChangeProfile}
                                 className="px-4 py-2 border border-gray-300 bg-gray-200 rounded-lg "
                                 disabled
                              />
                           </div>
                           <div className="flex flex-col space-y-1 mb-2">
                              <label className="text-gray-600 font-semibold">
                                 Nome
                              </label>
                              <input
                                 name="name"
                                 value={formProfile.name}
                                 onChange={handleChangeProfile}
                                 className="px-4 py-2 border border-gray-300 rounded-lg "
                              />
                           </div>

                           <div className="flex flex-col space-y-1 mb-2">
                              <label className="text-gray-600 font-semibold">
                                 Telefone
                              </label>
                              <input
                                 name="telefone"
                                 value={formProfile.telefone}
                                 onChange={handleChangeProfile}
                                 className="px-4 py-2 border border-gray-300 rounded-lg "
                              />
                           </div>
                        </div>
                        <img
                           src={user.profilePicture}
                           className="rounded-lg shadow-sm h-48"
                        />
                     </div>

                     <button className="mt-2  bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                        Salvar alterações
                     </button>
                  </form>
               </Tab.Panel>
               <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ">
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
               <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                     <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                           <tr>
                              <th
                                 scope="col"
                                 className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                              >
                                 Vaga
                              </th>
                              <th
                                 scope="col"
                                 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                 Criada
                              </th>
                              <th
                                 scope="col"
                                 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                 Status
                              </th>

                              <th
                                 scope="col"
                                 className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                              >
                                 <span className="sr-only">Edit</span>
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                           {user.history_jobs &&
                              user.history_jobs.map((job) => (
                                 <tr key={job._id}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                       <Link to={`/jobs/${job._id}`}>
                                          {job.title}
                                       </Link>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                       {dataFormater(job.createdAt).onlyDate}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                       {job.status}
                                    </td>

                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                       <button
                                          onClick={() => handleUnapply(job._id)}
                                          className="text-red-600 hover:text-red-900"
                                       >
                                          Desistir da vaga
                                       </button>
                                    </td>
                                 </tr>
                              ))}
                        </tbody>
                     </table>
                  </div>
               </Tab.Panel>
            </Tab.Panels>
         </Tab.Group>
      </div>
   );
}

export default ProfilePage;
