import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function Navbar() {
   const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

   console.log("isLoggedIn", isLoggedIn);

   return (
      <nav className="bg-white shadow">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
               <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                     <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                     />
                     <Link to="/">
                        <span className="text-lg font-bold ml-2">
                           Dev Suport
                        </span>
                     </Link>
                  </div>
               </div>

               {isLoggedIn ? (
                  // Se estiver logado
                  <div className="flex items-center">
                     <Link
                        to="/profile"
                        className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                     >
                        Perfil
                     </Link>
                     <Link
                        to="/login"
                        className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                        onClick={() => {
                           localStorage.removeItem("userToken");
                           setIsLoggedIn(false);
                        }}
                     >
                        Logout
                     </Link>
                  </div>
               ) : (
                  // Se não estiver logado
                  <div className="flex items-center">
                     <Link
                        to="/signup"
                        className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                     >
                        Sign up
                     </Link>
                     <Link
                        to="/login"
                        className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                     >
                        Log in
                     </Link>
                  </div>
               )}
            </div>
         </div>
      </nav>
   );
}

export default Navbar;
