import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function HomePage() {
   const [jobs, setJobs] = useState([]);

   useEffect(() => {
      async function getJobs() {
         const response = await axios.get(
            "http://localhost:4000/job/all/open/public"
         );
         setJobs(response.data);
      }

      getJobs();
   }, []);

   return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <h1 className="text-2xl font-bold mb-4">Vagas</h1>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
               <Link
                  key={job._id}
                  className="lg:col-start-3 lg:row-end-1 rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5 hover:ring-2 ring-offset-2 p-4 transform hover:scale-105 transition-transform duration-300"
                  to={`/jobs/${job._id}`}
               >
                  <h2 className="text-lg font-bold">{job.title}</h2>
                  <p className="text-sm">Local: {job.city}</p>
                  <div className="flex items-center mt-2">
                     <p className="bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 rounded-md mr-2">
                        {job.model}
                     </p>
                     <p className="bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 rounded-md">
                        Salário: R$ {job.salary}
                     </p>
                  </div>
                  <div className="mt-3 border-t border-gray-900/5 px-3 py-3">
                     <Link
                        to={`/jobs/${job._id}`}
                        className="text-sm font-semibold leading-6 text-gray-900 hover:underline"
                     >
                        Ver detalhes &rarr;
                     </Link>
                  </div>
               </Link>
            ))}
         </div>
      </main>
   );
}
