import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import api from "../axios/api";
import { AuthContext } from "../contexts/AuthContext";

export default function JobDetailPage() {
   const params = useParams();

   const { isLoggedIn, role } = useContext(AuthContext);

   const [alreadyApply, setAlreadyApply] = useState(false);

   const id = localStorage.getItem("userId");

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
   }, []);

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
         // /job/approved-candidate/:id_job/:id_user

         await api.post(`/job/approved-candidate/${params.id_job}/${id_user}`);
         navigate("/profile-business");
      } catch (error) {
         console.log(error);
      }
   }

   console.log(job);

   return (
      <>
         <div className="border rounded-lg shadow-sm p-4 bg-white">
            <h1 className="text-2xl font-semibold">{job.title}</h1>
            <p className="text-sm">
               Local: {job.city}, {job.state}
            </p>
            <p className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
               {job.model}
            </p>
            <pre className="mt-4 whitespace-pre-line font-sans">
               {job.description}
            </pre>
            <p className="mt-2"> R$ {job.salary}</p>
            <p className="mt-2">Status: {job.status}</p>
            <div className="mt-4">
               <h2 className="text-lg font-semibold">Empresa</h2>
               <p className="text-sm">{job.business?.name}</p>
               <p className="text-sm">{job.business?.description}</p>
               <p className="text-sm">
                  Contato: {job.business?.email}, {job.business?.telefone}
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

         <div>
            {/* informações que só poderão ser vistas pelo dono da vaga */}
            {id === job.business?._id && (
               <div className="border rounded-lg shadow-sm p-4 bg-white mt-4">
                  {job.select_candidate && (
                     <h1>Candidato selecionado: {job.select_candidate.name}</h1>
                  )}

                  {job.candidates?.map((candidate) => {
                     return (
                        <div key={candidate._id}>
                           <h1>
                              {candidate.name} - {candidate.email} -{" "}
                              {candidate.telefone}
                           </h1>
                           <pre className="mt-4 whitespace-pre-line font-sans">
                              {candidate.curriculo}
                           </pre>

                           {!job.select_candidate && (
                              <button
                                 onClick={() => handleApprove(candidate._id)}
                                 className="bg-indigo-500 px-4 py-2 mt-2 text-center text-white rounded-lg shadow-lg hover:bg-indigo-400"
                              >
                                 Selecionar Candidato
                              </button>
                           )}
                        </div>
                     );
                  })}
               </div>
            )}
         </div>
      </>
   );
}
