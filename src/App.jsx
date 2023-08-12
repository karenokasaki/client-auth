import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import ProtectRoute from "./components/ProtectRoute";
import ProfileBusinessPage from "./pages/ProfileBusinessPage";

function App() {
   return (
      <div className="bg-gray-100 min-h-screen">
         <Navbar />
         <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
               {/* Rotas que não devem ser protegidas */}
               <Route path="/" element={<SignupPage />} />
               <Route path="/login" element={<LoginPage />} />

               {/* Rota protegida */}
               <Route
                  path="/profile"
                  element={<ProtectRoute Component={ProfilePage} />}
               />
               <Route
                  path="/profile-business"
                  element={<ProtectRoute Component={ProfileBusinessPage} />}
               />
            </Routes>
         </div>
      </div>
   );
}

export default App;
