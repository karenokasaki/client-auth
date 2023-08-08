export default function HomePage() {
   return (
      <div>
         <div className="flex justify-evenly mb-5">
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
               Oferecer vaga
            </button>
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
               Procurar por vaga
            </button>
         </div>
         <div className=" bg-indigo-100 h-60">hero imagem</div>
         <div className="flex justify-evenly gap-20 p-10">
            <div className="h-36 bg-black w-1/3">Primeiro card</div>
            <div className="h-36 bg-black w-1/3">Segundo card</div>
            <div className="h-36 bg-black w-1/3">Terceiro card</div>
         </div>
      </div>
   );
}
