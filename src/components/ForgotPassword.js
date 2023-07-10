import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

const ForgotPassword = () => {
    let navigate = useNavigate()
    const { id, token } = useParams();
    const [password, setPassword] = useState("");
    let [message, setMessage] = useState(false);
    let [spin,setSpin]=useState(false);

    const uservalid = async () => {
        const response = await fetch(`https://capstone-backend-xuan.onrender.com/forgotpassword/${id}/${token}`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": true,
                "Content-Type": "application/json"
            }
        });
        const data = await response.json()
        // console.log(data)
        if (data.status === 200) {
            console.log("user valid");
        } else {
            navigate("*");
        }

    };

    let sendpassword = async (e) => {
        setSpin(true);
        e.preventDefault();
        if (password === "") {
            setSpin(false);
            toast.error("Password is required!!")
        }
        else {
            const res = await fetch(`https://capstone-backend-xuan.onrender.com/${id}/${token}`, {
                method: "POST",
                headers: {
                    "Access-Control-Allow-Origin": true,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password: password
                })
            });
            const data = await res.json();
            if (data.status === 200) {
            setSpin(false);
                setPassword("");
                setMessage(true)
            }
            else {
            setSpin(false);
                toast.error("Token expired,generate a new link")
            }
        }


    };

    useEffect(() => {
        uservalid();
    }, []);

    return (
        <>
            <div className="container d-flex flex-column justify-content-center align-items-center ">
                <form
                    className="mt-5  p-5"
                    style={{ boxShadow: "0 0 8px grey", borderRadius: "15px" }}
                >
                    <h2 className="text-center pb-2">Enter New Password</h2>
                    {message ? (<p className='text-success' style={{ "fontWeight": "bold" }}>Password Updated Successfully!!</p>) : ""}
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            aria-describedby="emailHelp"
                            placeholder="Enter new password"
                        />
                    </div>
                    {
                        !spin ? <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={sendpassword} style={{width:"100%",backgroundColor:"rgb(255,63,108)"}}>
                        
                        Reset
                    </button> :
                     <button
                     type="submit"
                     className="btn btn-primary"
                     onClick={sendpassword}
                     style={{width:"100%",backgroundColor:"rgb(255,63,108)"}}>
                     <CircularProgress size={"1rem"}/>
                 </button>
                    }
                   
                </form>
                <ToastContainer />
            </div>
        </>
    );
};

export default ForgotPassword;