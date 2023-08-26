import { useState, useEffect } from "react";
import api from "../axios/api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditOffer() {
   const params = useParams();

   const [job, setJob] = useState({
      title: "",
      description: "",
      salary: "",
      city: "",
      state: "",
      model: "REMOTO",
   });

   useEffect(() => {
      async function getJob() {
         try {
            const response = await api.get(`/job/${params.id_job}`);
            setJob(response.data);
         } catch (error) {
            console.log(error);
         }
      }

      getJob();
   }, []);
   console.log(job);
   const navigate = useNavigate();

   function handleChange(e) {
      setJob({ ...job, [e.target.name]: e.target.value });
   }

   async function handleSubmit(e) {
      e.preventDefault();
      try {
         await api.put(`/job/edit/${params.id_job}`, job);

         setJob({
            title: "",
            description: "",
            salary: "",
            city: "",
            state: "",
            model: "",
         });

         navigate(`/jobs/${params.id_job}`);
      } catch (error) {
         console.log(error);
      }
   }

   async function handleDelete(e) {
      e.preventDefault();
      try {
         await api.delete(`/job/delete/${params.id_job}`);
         navigate("/profile-business");
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-2 mb-2">
               <label className="text-gray-600 font-semibold">Título</label>
               <input
                  name="title"
                  value={job.title}
                  onChange={handleChange}
                  className="text-gray-400 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
               />
            </div>

            <div className="flex flex-col space-y-2 mb-2">
               <label className="text-gray-600 font-semibold">
                  Descrição da vaga
               </label>
               <textarea
                  rows={10}
                  name="description"
                  value={job.description}
                  onChange={handleChange}
                  className="text-gray-400 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
               />
            </div>

            <div className="flex flex-col space-y-2 mb-2">
               <label className="text-gray-600 font-semibold">Salário</label>
               <input
                  type="number"
                  name="salary"
                  value={job.salary}
                  onChange={handleChange}
                  className="text-gray-400 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
               />
            </div>

            <div className="flex flex-col space-y-2 mb-2">
               <label className="text-gray-600 font-semibold">Cidade</label>
               <input
                  name="city"
                  value={job.city}
                  onChange={handleChange}
                  className="text-gray-400 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
               />
            </div>

            <div className="flex flex-col space-y-2 mb-2">
               <label className="text-gray-600 font-semibold">Estado</label>
               <input
                  name="state"
                  value={job.state}
                  onChange={handleChange}
                  className="text-gray-400 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
               />
            </div>

            <div className="flex flex-col space-y-2 mb-2">
               <label className="text-gray-600 font-semibold">
                  Modelo de trabalho
               </label>
               <select
                  name="model"
                  onChange={handleChange}
                  className="text-gray-400 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
               >
                  <option value="REMOTO">Remoto</option>
                  <option value="PRESENCIAL">Presencial</option>
                  <option value="HIBRIDO">Híbrido</option>
               </select>
            </div>

            {job.status !== "CANCELADA" && (
               <div className="flex justify-between">
                  <button className="bg-indigo-500 p-3 text-center text-white rounded-lg shadow-lg hover:bg-indigo-400">
                     Atualizar vaga
                  </button>

                  <button
                     onClick={handleDelete}
                     className="bg-red-500 p-3 text-center text-white rounded-lg shadow-lg hover:bg-red-400"
                  >
                     Cancelar vaga
                  </button>
               </div>
            )}
         </form>
      </div>
   );
}
