import React from 'react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../login/login.css';
import CircularProgress from '@mui/material/CircularProgress';


const Register = () => {
  let [name, setName] = useState("")
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [cpassword, setCpassword] = useState("")
  let [passwordType, setPasswordType] = useState("password");
  let[spin,setSpin]=useState(false);
  let navigate=useNavigate();


  const togglePassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }

  const addUserData = async (e) => {
    e.preventDefault();
    setSpin(true);


    if (name === "" && email === "" && password === "" && cpassword === "") {
    setSpin(false);

      alert('Empty fields are not allowed!!!')
    }
    else if (name === "") {
      setSpin(false);
      alert("Please enter your Name");
    } else if (email === "") {
      setSpin(false);
      alert("Please enter your email");
    } else if (!email.includes("@")) {
      setSpin(false);
      alert("Enter valid email");
    }
    else if (password === "") {
      setSpin(false);

      alert("Please enter your Password");
    } else if (cpassword === "") {
      setSpin(false);

      alert("Please enter confirm password");
    } else if (password !== cpassword) {
      setSpin(false);

      alert("password doesn't match");
    } else {
      const data = await fetch('https://capstone-backend-xuan.onrender.com/register', {
        method: 'POST',
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          cpassword: cpassword
        })
      });
      const response = await data.json();
      if (response.status === 200) {
        setSpin(false)
        toast.success('User registration done');
        navigate('/');
        setName("");
        setEmail("");
        setPassword("");
        setCpassword("");
      } 
      else {
        setSpin(false)
        toast.error(response.error);
        setName("");
        setPassword("");
        setCpassword("");
        setEmail("");
      }
    }
  }

  return (
    <div className='hello'>
      <div className='container d-flex flex-column justify-content-center align-items-center ' style={{ "top": "5px", "position": "relative" }}>
        <form className='mt-4  p-5' style={{ boxShadow: "0 0 10px grey", borderRadius: "15px" }}>
          <h1 className='text-center text-danger'>SIGN UP</h1>
          <div className="mb-3">
            <label htmlFor="name" className="form-label p-0">Name</label>
            <input type="text" className="form-control" id="name" value={name} onChange={e => setName(e.target.value)} placeholder='Enter Name' />
          </div>
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
                <button className="btn " style={{ backgroundColor: "white" }} onClick={togglePassword}>
                  {passwordType === "password" ? <i className="fa-solid fa-eye-slash text-black"></i> : <i className="fa-solid fa-eye text-black  "></i>}
                </button>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label p-0">Confirm Password</label>
            <input type="password" className="form-control" value={cpassword} onChange={e => setCpassword(e.target.value)} placeholder='Confirm password' id="cpassword" />
          </div>
          <div className='text-center'>
            {!spin?<button type="submit" className="btn text-white" style={{backgroundColor:"rgb(255,63,108)",width:"100%",fontWeight:'500',fontStyle:"Secular One, sans-serif"}}  onClick={addUserData} >Sign Up</button> :
            <button type="submit" className="btn text-white" style={{backgroundColor:"rgb(255,63,108)",width:"100%",fontWeight:'500',fontStyle:"Secular One, sans-serif"}} ><CircularProgress size={'1rem'} style={{'color': 'white'}}/></button>}
            <p className='pt-2'>Already have an account?<NavLink to={'/'}> Log In</NavLink></p>
          </div>
        </form>
        <ToastContainer/>
      </div>

    </div>
  )
}

export default Register
