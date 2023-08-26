import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../axios/api";
import dataFormater from "../utils/dataFormater";
import axios from "axios";

export default function PublicJobDetailPage() {
   const params = useParams();

   const [job, setJob] = useState({});

   useEffect(() => {
      async function getJob() {
         try {
            const response = await axios.get(
               `http://localhost:4000/job/${params.id_job}/public`
            );
            setJob(response.data);
         } catch (error) {
            console.log(error);
         }
      }

      getJob();
   }, [params.id_job]);

   return (
      <>
         <div className="border border-indigo-100 mb-4 bg-indigo-50 px-4 py-2 rounded-lg">
            <Link
               to="/signup"
               className="text-2xl font-semibold tracking-wider text-center text-gray-700 hover:text-gray-900"
            >
               <h1>Gostou da vaga? Faça seu cadastro e candidate-se!</h1>
            </Link>
         </div>

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

            <div className="mt-4 border-y py-4 flex gap-10">
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
         </div>
      </>
   );
}
