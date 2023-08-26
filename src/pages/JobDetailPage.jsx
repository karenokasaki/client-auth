import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import api from "../axios/api";
import { AuthContext } from "../contexts/AuthContext";
import dataFormater from "../utils/dataFormater";

export default function JobDetailPage() {
   const params = useParams();

   const { role } = useContext(AuthContext);

   const [alreadyApply, setAlreadyApply] = useState(false);
   const [reload, setReload] = useState(false);

   const id = localStorage.getItem("userId");

   // o id do job está em -> params.id_job

   const navigate = useNavigate();

   const [job, setJob] = useState({});

   useEffect(() => {
      async function getJob() {
         const response = await api.get(`/job/${params.id_job}`);
         setJob(response.data);

         //conferindo se o id do user que está logado, existe dentro da array de candidatos para essa vaga
         const job = response.data.candidates.find((candidate) => {
            return candidate._id === id;
         });

         if (job) {
            setAlreadyApply(true);
         } else {
            setAlreadyApply(false);
         }
      }

      getJob();
   }, [reload]);

   async function handleApply() {
      try {
         await api.post(`/job/apply/${params.id_job}`);
         navigate("/profile");
      } catch (error) {
         console.log(error);
      }
   }

   async function handleApprove(id_user) {
      try {
         await api.post(`/job/approved-candidate/${params.id_job}/${id_user}`);
         setReload(!reload);
      } catch (error) {
         console.log(error);
      }
   }

   console.log(job);

   return (
      <>
         <div className="border rounded-lg shadow-sm p-4 bg-white">
            <h1 className="text-2xl font-semibold tracking-wider">
               {job.title}
            </h1>

            <div className="flex justify-between">
               <p className="text-sm text-gray-500">
                  Local: {job.city}, {job.state}
               </p>
               <p className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                  {job.model}
               </p>
            </div>

            <p className="text-sm text-gray-500 text-right">
               Vaga criada dia {dataFormater(job.createdAt).onlyDate}
            </p>

            <div className="mt-4 border-y py-4 flex gap-10 ">
               <h2 className="text-md font-semibold">Empresa</h2>
               <div>
                  <p className="text-lg font-bold ">{job.business?.name}</p>
                  <p className="text-sm italic">{job.business?.description}</p>
                  <p className="text-sm">Dúvidas: {job.business?.email}</p>
               </div>
            </div>

            <pre className="mt-4 whitespace-pre-line font-sans p-3 border rounded-lg bg-gray-50 text-gray-700">
               {job.description}
            </pre>

            <div className="flex justify-around">
               <p className="mt-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg ">
                  Salário: R${job.salary},00
               </p>
               <p className="mt-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg ">
                  Status: {job.status}
               </p>
            </div>

            {/* Mostrar o botão de candidatar-se apenas se for USER */}
            {role === "USER" && alreadyApply === false && (
               <button
                  onClick={handleApply}
                  className="mt-4 bg-indigo-500 py-2 px-4 rounded-lg text-white hover:bg-indigo-600"
               >
                  Me candidatar
               </button>
            )}
            {role === "USER" && alreadyApply === true && (
               <button
                  className="mt-4 bg-indigo-500 py-2 px-4 rounded-lg text-white hover:bg-indigo-600"
                  disabled
               >
                  Você já se candidatou! Boa sorte!
               </button>
            )}
         </div>

         {/* Candidato já foi selecionado */}
         <div>
            {job.select_candidate && (
               <div className="mt-6 flex flex-col ">
                  <h1 className="text-lg p-1 tracking-wider pl-3">
                     Candidato Selecionado
                  </h1>
                  <div className="border rounded-lg shadow-sm p-4 bg-white">
                     <div className="flex justify-between">
                        <div>
                           <h1 className="font-bold text-lg">
                              {job.select_candidate.name}
                           </h1>
                           <p className="text-gray-400 text-sm">
                              {job.select_candidate.email} -{" "}
                              {job.select_candidate.telefone}
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </div>

         {id === job.business?._id && (
            <div className="mt-6 flex flex-col ">
               <h1 className="text-lg p-1 tracking-wider pl-3">Candidatos</h1>
               {job.candidates?.length === 0 && (
                  <p className="text-center text-gray-500">
                     Nenhum candidato ainda
                  </p>
               )}
               <div>
                  {job.candidates?.map((candidate) => {
                     return (
                        <div
                           key={candidate._id}
                           className="border rounded-lg shadow-sm p-4 bg-white"
                        >
                           <div className="flex justify-between">
                              <div>
                                 <h1 className="font-bold text-lg">
                                    {candidate.name}
                                 </h1>
                                 <p className="text-gray-400 text-sm">
                                    {candidate.email} - {candidate.telefone}
                                 </p>
                              </div>

                              <button
                                 onClick={() => handleApprove(candidate._id)}
                                 className="rounded px-4 py-2 bg-indigo-700 text-white"
                              >
                                 Selecionar Candidato
                              </button>
                           </div>

                           <pre className="mt-4 whitespace-pre-line font-sans p-3 border rounded-lg bg-gray-50 text-gray-700">
                              {candidate.curriculo}
                           </pre>
                        </div>
                     );
                  })}
               </div>
            </div>
         )}
      </>
   );
}
