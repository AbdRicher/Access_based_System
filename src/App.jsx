import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from "./pages/login"
import RegisterForm from "./pages/register"
import AdminLogin from './pages/adminlogin';
import Admindashboard from './pages/admindashboard';
import UserHomePage from "./pages/home"


function App() {


  return (
    <>
     <BrowserRouter> 
      <Routes > 
        // <Route path="/" element={<Login/>} /> 
        // <Route path="/register" element={<RegisterForm/>} /> 
        // <Route path="/adminlogin" element={<AdminLogin/>} /> 
        // <Route path="/admindashboard" element={<Admindashboard/>} /> 
        // <Route path="/home" element={<UserHomePage/>} />



      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
