// import { Route } from "react-router-dom";
import {  Routes, Route } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import './App.css'
import AdminUser from "./Component/usersDetails";
import Orderdet from "./Component/Order";
import ClientProduct from "./Component/ClientProduct";
import AdminSignup from "./AdminAuther/Signup";
import AdminLogin from "./AdminAuther/Login";
import ProfileAdmin from "./Profile/AdminProfile";

function App() {
  return (
    
    <>
      <AdminNavbar />
      <Routes>
        <Route path="/AdminUser" element={<AdminUser/>} />
        <Route path="/Orderdet" element={<Orderdet/>} />
        <Route path="/ClientProduct" element={<ClientProduct/>} />
        <Route path="/AdminSignup" element={<AdminSignup/>} />
        <Route path="/AdminLogin" element={<AdminLogin/>} />
        <Route path="/ProfileAdmin" element={<ProfileAdmin/>} />
      </Routes>
    
    </>
  )
}

export default App
