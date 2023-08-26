import { useEffect, useState } from "react";
import axios from "axios";
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
   console.log(jobs);
   return (
      <main>
         <div className="relative">
            <img
               className="h-32 w-full object-cover rounded-md"
               src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2669&q=80"
            />

            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-70 rounded-md">
               <p className="text-white text-3xl font-mono text-center">
                  Encontre aqui sua próxima vaga de emprego no mundo da
                  tecnologia.
               </p>
            </div>
         </div>

         <div>{/* AQUI VAI O SEARCH BAR E O FILTRO */}</div>

         {/* aqui vai mostrar os cards */}
         <div>
            {jobs.map((job) => {
               return (
                  <div key={job._id}>
                     <h2>{job.title}</h2>
                  </div>
               );
            })}
         </div>
      </main>
   );
}
