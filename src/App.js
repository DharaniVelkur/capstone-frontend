import "./App.css";
import {  Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Navbar from "./components/header/Navbar";
import PasswordReset from "./components/PasswordReset";
import Error from "./components/Error";
import ForgotPassword from "./components/ForgotPassword";
import CardComponent from "./components/CardComponent";
import Dashboard from "./components/Dashboard";
import ImageUploadForm from "./components/ImageUploadForm";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";
import { useState } from "react";
import Profile from "./components/Profile";
import Contact from "./components/Contact";
import History from "./components/History";


function App() {
  const [mode,setMode] = useState('light');
  const handletoggle =(setIsChecked)=>{
    setIsChecked(prev=>!prev)
    if(mode==='light'){
      setMode('dark');
      document.body.style.background='black';
      document.body.style.color='white';

    }else{
      setMode('light');
      document.body.style.background='linear-gradient(90deg, rgb(253,238,241) 0%, rgb(244, 227, 230) 21%, rgb(249, 239, 241) 100%)';
      document.body.style.color='black'
    }
  }
  

  return (
    <>
    <Navbar mode={mode} handletoggle={handletoggle}/>
    
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/password-reset" element={<PasswordReset/>}></Route>
        <Route exact path='/forgotpassword/:id/:token' element={<ForgotPassword/>}/>
        <Route exact path="/card" element={<CardComponent mode={mode}/>}/>
        <Route exact path="/dashboard" element={<UserRoute  mode={mode}><Dashboard/></UserRoute>}/>
        <Route exact path="/admin/addproducts" element={<AdminRoute  mode={mode}><ImageUploadForm /></AdminRoute>}/> 
        <Route exact path="/profile" element={<Profile mode={mode}/>}/>
        <Route exact path="/contact" element={<Contact/>}/>
        <Route exact path="/history" element={<History mode={mode}/>}/>
        <Route exact path='/*' element={<Error/>}/>
      </Routes>
      </>
  );
}

export default App;
