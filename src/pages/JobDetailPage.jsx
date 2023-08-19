import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../axios/api";

export default function JobDetailPage() {
   const params = useParams();
   // o id do job está em -> params.id_job

   const navigate = useNavigate();

   const [job, setJob] = useState({});

   useEffect(() => {
      async function getJob() {
         const response = await api.get(`/job/${params.id_job}`);
         setJob(response.data);
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

   console.log(job);

   return (
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

         <button
            onClick={handleApply}
            className="mt-4 bg-indigo-500 py-2 px-4 rounded-lg text-white hover:bg-indigo-600"
         >
            Me candidatar
         </button>
      </div>
   );
}
