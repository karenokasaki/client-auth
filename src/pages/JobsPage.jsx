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
         <h1 className="text-2xl font-bold mb-4">Vagas</h1>

         <div className="flex gap-4">
            {jobs.map((job) => {
               return (
                  <Link
                     key={job._id}
                     to={`/jobs/${job._id}`}
                     className="border w-1/3 rounded-lg shadow-sm flex flex-col p-2 bg-white hover:scale-105"
                  >
                     <h1 className="text-xl font-semibold mb-2">
                        {job.title}{" "}
                        <span className="text-xs inline-block bg-gray-300 text-white rounded-full px-2 py-1">
                           {job.model}
                        </span>
                     </h1>
                     <p className="text-xs">R${job.salary}</p>
                  </Link>
               );
            })}
         </div>
      </>
   );
}
