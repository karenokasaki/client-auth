import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import api from "../axios/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function JobDetailPage() {
   const { id_job } = useParams();
   const navigate = useNavigate();
   const { idUser } = useContext(AuthContext);

   const [job, setJob] = useState({});
   const [apply, setApply] = useState(false);

   useEffect(() => {
      async function getJob() {
         const response = await api.get(`/job/${id_job}`);
         setJob(response.data);
      }

      getJob();
   }, [id_job]);

   useEffect(() => {
      const alreadyApply = job.candidates?.find((user) => user._id === idUser);

      if (alreadyApply) setApply(true); // se achou o user é porq ele já se aplicou a vaga
      if (!alreadyApply) setApply(false);
   }, [job]);

   async function handleApply() {
      try {
         await api.post(`/job/apply/${id_job}`);
         navigate("/profile");
      } catch (error) {
         console.log(error);
      }
   }

   console.log(job);

   return (
      <div className="p-4 bg-white rounded-lg shadow-md">
         <h1 className="text-2xl font-semibold mb-2">{job.title}</h1>
         <pre className="text-gray-600 mb-4  font-sans whitespace-pre-line">
            {job.description}
         </pre>
         <p className="text-sm font-semibold">Salário: R${job.salary}</p>
         <p className="text-sm">
            Cidade: {job.city}, {job.state}
         </p>
         <p className="text-sm">Modelo: {job.model}</p>
         <p className="text-sm">Status: {job.status}</p>
         <h2 className="text-lg font-semibold mt-4">
            Empresa: {job.business?.name}
         </h2>
         <p className="text-sm">
            Descrição da Empresa: {job.business?.description}
         </p>
         <p className="text-sm">Email: {job.business?.email}</p>
         <p className="text-sm">Telefone: {job.business?.telefone}</p>

         {apply === false && (
            <button
               className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg"
               onClick={handleApply}
            >
               Candidatar-se
            </button>
         )}
         {apply === true && (
            <button className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg">
               Você já se aplicou para essa vaga. Boa sorte!
            </button>
         )}
      </div>
   );
}
