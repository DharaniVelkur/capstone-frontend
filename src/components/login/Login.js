import React, { useEffect, useState } from 'react'
import './login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import jwt_decode from 'jwt-decode';

const Login = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [passwordType, setPasswordType] = useState("password");
  let[spin,setSpin]=useState(false);
  let navigate=useNavigate();

  const togglePassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password");
  }

  const loginUser=async (e)=>{
    setSpin(true);
    e.preventDefault();
    if(email===""&& password===""){
      setSpin(false);
      alert("Empty fields are not allowed!!");
  }else if(email===""){
    setSpin(false);
      alert("Please enter Email")
  }else if(!email.includes("@")){
    setSpin(false);
      alert("Enter valid email")
  }else if(password===""){
    setSpin(false);
      alert("Enter password")
  }else{
    const data=await fetch('http://localhost:8001/login',{
      method:"POST",
      headers:{
        "Access-Control-Allow-Origin": true,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:email,
        password:password
      })
    });
    const response=await data.json();
    console.log(response)
    if(response.status===200){
      setSpin(false);
      localStorage.setItem('usertoken',response.result.token);
      localStorage.setItem('result',JSON.stringify(response.result.uservalid));
      localStorage.setItem('likedProducts',JSON.stringify(response.result.uservalid.liked_products))
      toast.success("Logged In Successfully!!");
     if(response.result.uservalid.email==="admin@gmail.com"){
      navigate('/admin/addproducts');
      setEmail("");
      setPassword("");
     } else {
      navigate('/dashboard');
      setEmail("");
      setPassword("");
     }
    }
    else{
      toast.error(response.error);
      setSpin(false)
      setEmail("");
      setPassword("");
    }

  }
  }

  useEffect(()=>{
    let token = localStorage.getItem('usertoken');
    try {
      let decodedToken=jwt_decode(token);
      if(decodedToken.email!=='admin@gmail.com'){
        console.log(decodedToken.email);
        navigate('/dashboard');
      } else {
        navigate('/admin/addproducts');
      }
    } catch (e) {
        localStorage.removeItem('usertoken');
        localStorage.removeItem('result');
        localStorage.removeItem('likedProducts')
        navigate('/');
    };
  },[])

  return (
    <div className='hello'>
      <div className='container d-flex flex-column justify-content-center align-items-center ' style={{ "top": "40px", "position": "relative" }}>
        <form className=' p-5' style={{ boxShadow: "0 0 10px grey", borderRadius: "15px" }}>
          <h1 className='text-center pb-4 text-danger'>LOGIN FORM</h1>
          <div className="mb-3">
            <label htmlFor="email" className="form-label p-0">Email address</label>
            <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} aria-describedby="emailHelp" placeholder='Enter email' />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label p-0">Password</label>
            <div className="input-group ">
              <input type={passwordType} className="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder='Enter password' id="password" />
              <div className="input-group-btn">
                <button className="btn" style={{ backgroundColor: "white" }} onClick={togglePassword}>
                  {passwordType === "password" ? <i className="fa-solid fa-eye-slash text-black "></i> : <i className="fa-solid fa-eye text-black"></i>}
                </button>
              </div>
            </div>
          </div>
          {!spin?
           <button type="submit" className="btn text-white" style={{backgroundColor:"rgb(255,63,108)",width:"100%",fontWeight:'500',fontStyle:"Secular One, sans-serif"}} onClick={loginUser} >Log in</button>
          :
          <button type="submit" className="btn" style={{backgroundColor:"rgb(255,63,108)",width:"100%",fontWeight:'500',fontStyle:"Secular One, sans-serif"}} onClick={loginUser} ><CircularProgress style={{'color': 'white'}} size="1rem"/></button>}
         
          <p className="text-center pt-3">Don't have an account?<NavLink to={'/register'}> Sign Up</NavLink></p>
          <p className="text-center " >Forgot Password?<NavLink to={'/password-reset'}> Click Here</NavLink></p>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Login
