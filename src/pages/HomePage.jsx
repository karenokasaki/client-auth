import axios from "axios";
import { useEffect, useState } from "react";

export default function HomePage() {
   const [jobs, setJobs] = useState([]);
   const [search, setSearch] = useState("");
   const [selectedModel, setSelectedModel] = useState("");

   useEffect(() => {
      async function getJobs() {
         const response = await axios.get(
            "http://localhost:4000/job/all/open/public"
         );
         setJobs(response.data);
      }

      getJobs();
   }, []);

   function handleSearch(e) {
      setSearch(e.target.value);
   }

   function handleModelFilter(e) {
      setSelectedModel(e.target.value);
   }

   return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="mb-4 relative">
            <img
               className="h-24 w-full object-cover opacity-90 rounded-lg"
               src="https://images.twinkl.co.uk/tw1n/image/private/t_630/u/ux/florian-olivo-4hbj-eymz1o-unsplash_ver_1.jpg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
               {/* Aqui você pode adicionar o conteúdo de texto */}
               <p className="text-white text-center ">
                  Encontre seu lugar no mercado de trabalho.
               </p>
            </div>
         </div>

         <div className="mb-4">
            <input
               type="text"
               className="border border-gray-300 rounded px-3 py-2 w-full"
               placeholder="Buscar vagas"
               value={search}
               onChange={handleSearch}
            />
         </div>

         <div className="mb-4">
            <select
               value={selectedModel}
               onChange={handleModelFilter}
               className="border border-gray-300 rounded px-3 py-2 pr-8" 
               
            >
               <option value="">Todos os Modelos</option>
               <option value="REMOTO">Remoto</option>
               <option value="HIBRIDO">Híbrido</option>
               <option value="PRESENCIAL">Presencial</option>
            </select>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs
               .filter((job) =>
                  job.title.toLowerCase().includes(search.toLowerCase())
               )
               .filter((job) => {
                  if (!selectedModel) return true;
                  return job.model === selectedModel;
               })
               .map((job) => (
                  <div key={job._id} className="bg-white p-4 shadow rounded">
                     <h2 className="text-lg font-bold">{job.title}</h2>
                     <p className="text-gray-600">Salário: R$ {job.salary}</p>
                  </div>
               ))}
         </div>
      </main>
   );
}
