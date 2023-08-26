import api from "../axios/api";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";

function ProfilePage() {
   const [user, setUser] = useState({});
   const [formProfile, setFormProfile] = useState({
      name: "",
      telefone: "",
      curriculo: "",
   });

   const [reload, setReload] = useState(true);

   const id_user = localStorage.getItem("userId");

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

   return (
      <>
         <div className="text-center flex items-center gap-12">
            <div>
               <h1 className="text-2xl font-bold mb-4 text-gray-500">
                  Olá, {user.name}.
               </h1>
            </div>
         </div>

         <Link
            to="/jobs"
            className="mb-4 text-center bg-purple-400 hover:bg-purple-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 block"
         >
            PROCURE SUA VAGA DE EMPREGO
         </Link>

         <div className=" p-4 bg-white shadow-lg rounded-lg">
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
                  <Tab.Panel className="rounded-xl flex justify-evenly bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none ">
                     <form onSubmit={handleSubmitProfile} className="w-4/5">
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

                        <button
                           type="submit"
                           className="mt-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                        >
                           Salvar alterações
                        </button>
                     </form>
                     <div>
                        <img
                           src={user.profilePicture}
                           alt="Profile"
                           className="mx-auto mt-4 rounded-3xl w-40 h-40"
                        />
                     </div>
                  </Tab.Panel>
                  <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none ">
                     <form onSubmit={handleSubmitProfile}>
                        <div className="flex flex-col space-y-2">
                           <textarea
                              rows={10}
                              name="curriculo"
                              value={formProfile.curriculo}
                              onChange={handleChangeProfile}
                              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
                           />
                        </div>

                        <button
                           type="submit"
                           className="mt-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                        >
                           Salvar alterações
                        </button>
                     </form>
                  </Tab.Panel>
                  <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
                     <div>
                        {user.history_jobs?.map((job) => (
                           <Link
                              to={`/jobs/${job._id}`}
                              key={job._id}
                              className="flex justify-between"
                           >
                              <p>{job.title}</p>
                              <p>{job.status}</p>

                              {id_user === job.select_candidate && (
                                 <p>Você foi escolhido!</p>
                              )}
                           </Link>
                        ))}
                     </div>
                  </Tab.Panel>
               </Tab.Panels>
            </Tab.Group>
         </div>
         <button
            onClick={handleLogout}
            className="mt-4 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 w-full"
         >
            Logout
         </button>
      </>
   );
}

export default ProfilePage;
