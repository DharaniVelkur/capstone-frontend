import React, { useState } from 'react'
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  let [from_name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [message, setMessage] = useState("");
  let submitHandler = (e) => {
    e.preventDefault();
    if (from_name == "" || email == "" || message == "") {
      alert("Fields cannot be empty!!!")
    } else {
      emailjs.send(
        "service_b35tj2g",
        "template_iib8xp8",
        {
          from_name: from_name,
          to_name: "Dharani",
          from_email: email,
          to_email: "dharanivelkur@gmail.com",
          message: message
        },
        "psrZqBG5o5Guo116H"
      );
      toast.success("Submitted Successfully!!!!");
      setName("");
      setEmail("");
      setMessage("");
    }
  }

  return (
    <div className='container d-flex flex-column justify-content-center align-items-center ' >
      <form onSubmit={submitHandler}>
        <div className='container d-flex flex-column justify-content-center align-items-center mt-4 contact'>
          <h1 className='text-danger'>CONTACT  US</h1><br />
          <div >
            <label htmlFor='name' className='p-0'>NAME :</label>
            <input type='text' className='size' value={from_name} id='name' placeholder='Enter name' onChange={e => setName(e.target.value)}></input>
          </div><br />
          <div>
            <label htmlFor='email' className='p-0'>Email :</label>
            <input type='email' className='size' id='email' value={email} placeholder='Enter email' onChange={e => setEmail(e.target.value)}></input>
          </div><br />
          <div>
            <label htmlFor='msg' className='p-0'>Message :</label>
            <textarea placeholder='Enter message...' value={message} className='size' id='msg' rows={4} onChange={e => setMessage(e.target.value)}></textarea>
          </div><br />
          <button className='btn' style={{ backgroundColor: "rgb(255,63,108)", width: "100%", fontWeight: '500', fontStyle: "Secular One, sans-serif", "color": "white" }} >Submit</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Contact