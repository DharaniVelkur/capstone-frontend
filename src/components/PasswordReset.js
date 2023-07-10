import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import { NavLink } from 'react-router-dom';

const PasswordReset = () => {
    let [email, setEmail] = useState("");
    let [message, setMessage] = useState(false);
    let [spin,setSpin]=useState(false);
    const sendLink = async (e) => {
        setSpin(true);
        e.preventDefault();
        const res = await fetch('https://capstone-backend-xuan.onrender.com/sendpasswordlink', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email })
        })
        let data = await res.json();
        if (data.status === 200) {
            setSpin(false);
            setEmail("");
            setMessage(true);
        } else {
            setSpin(false);
            toast.error(data.error)
        }
    }

    return (
        <>
            <div className='container d-flex flex-column justify-content-center align-items-center '>

                <form className='mt-5  p-5' style={{ boxShadow: "0 0 8px grey", borderRadius: "15px" }} >
                    <h2 className='text-center pb-2'>Enter Your Email Address</h2>
                    {message ? (<p className='text-success' style={{ "fontWeight": "bold" }}>Resent Link sent successfully in Your email</p>) : ""}
                    <div className="mb-3">
                        <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} aria-describedby="emailHelp" placeholder='Enter email' />
                    </div>
                    {!spin ?
                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: "rgb(255,63,108)", width: "100%" }} onClick={sendLink}>Send </button>
                    :
                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: "rgb(255,63,108)", width: "100%" }} onClick={sendLink}> <CircularProgress size="1rem"/> </button>
                    }
                   <p className='text-center pt-3'> <NavLink to={'/'} >Back to Login</NavLink></p>
                </form>
                <ToastContainer />
            </div>
        </>
    )
}

export default PasswordReset;