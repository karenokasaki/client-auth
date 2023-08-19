import { useState, useEffect } from "react";
import api from "../axios/api";

export default function JobsPage() {
   const [jobs, setJobs] = useState([]);

   useEffect(() => {
      async function getJobs() {
         const response = await api.get("/job/all/open");
         setJobs(response.data);
      }

      getJobs();
   }, []);

   console.log(jobs);

   return (
      <>
         <h1>Ache uma vaga para você!!</h1>

         <div className="flex gap-4">
            {jobs.map((job) => {
               return (
                  <div
                     key={job._id}
                     className="border rounded-lg shadow-sm flex flex-col p-2"
                  >
                     <h1>{job.title}</h1>
                     <p className="text-sm">Modelo de Trabalho: {job.model}</p>
                     <p className="text-sm">Local: {job.city}</p>
                  </div>
               );
            })}
         </div>
      </>
   );
}
