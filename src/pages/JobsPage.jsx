import { useState, useEffect } from "react";
import api from "../axios/api";
import { Link } from "react-router-dom";

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
         <h1>Vagas</h1>

         <div className="flex gap-4">
            {jobs.map((job) => {
               return (
                  <Link
                     key={job._id}
                     className="border rounded-lg shadow-sm flex flex-col items-start p-2 bg-white w-1/3 hover:scale-105 gap-1"
                     to={`/jobs/${job._id}`}
                  >
                     <h1>{job.title}</h1>
                     <p className="text-sm">Local: {job.city}</p>
                     <p className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                        {job.model}
                     </p>
                  </Link>
               );
            })}
         </div>
      </>
   );
}
