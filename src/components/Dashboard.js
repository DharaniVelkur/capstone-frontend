import React, { useContext, useEffect, useState } from "react";
import {   useNavigate } from "react-router-dom";
import RealDashboard from "./realdashboard/RealDashboard";

const Dashboard = ({mode}) => {
  let [userdetails, setUserdetails] = useState(JSON.parse(localStorage.getItem('result')));
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(JSON.parse(localStorage.getItem('result')).payment)

  let navigate = useNavigate();



const handlesurvey=()=>{
  navigate('/card')
}

  useEffect(() => {
    if (isPaymentSuccess) {
    let token = localStorage.getItem("usertoken");
      const check= fetch('http://localhost:8001/checkout',{
        method: 'POST',
        headers:{
          "Access-Control-Allow-Origin":true,
          'Content-Type': 'application/json',
          Authorization: token,
        Accept: "application/json"
        },
        body:JSON.stringify({
          payment:isPaymentSuccess
        })
      }).then(async(res)=>{
        let result = await res.json();
        // console.log(jujuk);
        const target={};
        Object.assign(target,userdetails);
        target.payment=true;
        setUserdetails(target);
        localStorage.setItem('result',JSON.stringify(target))
      })
    }
  },[isPaymentSuccess]);

  const handlePaymentSuccess = (paymentResponse) => {
    setIsPaymentSuccess(true);
  };
  const handlePayment =  () => {
    const options = {
      key: "rzp_test_tX1XoeHDlWZgAt",
      amount:39900,
      currency: 'INR',
      name: 'Equipment Rental',
      description: 'Equipment Rental Payment',
      handler: handlePaymentSuccess,
      prefill: {
        email: 'test71@gmail.com', // Replace with customer email address
        contact: '6567890909', // Replace with customer contact number
      },
      
      notes: {
        rentalItem: JSON.stringify({ "greeting": "hello" }), // Replace with additional item details
      },
      theme: {
        color: '#528FF0', // Replace with your preferred color theme
      }
    };
    const razorpay=new window.Razorpay(options);
    razorpay.open();
};

return <>
  {
    (
      !userdetails?.bottomcolors_liked?.length ||
      !userdetails?.colors_liked?.length ||
      !userdetails?.topcolors_liked?.length
    ) && !userdetails.payment && <div className="hi">
    <div className={`card text-center card1  ${(mode==='light') ?'light-mode':'dark-mode'} `}>
      <h2 className="card-header">
        WELCOME {userdetails?.name?.toUpperCase()}
      </h2>
      <div className="card-body">
        <h5 className="card-title">Fill out the survey form to Continue with our services</h5>
       <br/>
       <br/>
       <button className="btn " onClick={handlesurvey} style={{width:"100%",backgroundColor:"rgb(255,63,108)",color:"black",border:"none"}}>Continue</button>
      </div>
    </div>
  </div>
  }
  {
    !userdetails.payment && (
      userdetails?.bottomcolors_liked?.length &&
      userdetails?.colors_liked?.length &&
      userdetails?.topcolors_liked?.length
    ) && <div className="hi">
    <div className={`card text-center card1  ${(mode==='light') ?'light-mode':'dark-mode'} `}>
      <h2 className="card-header">
        Hello , {userdetails?.name?.toUpperCase()}
      </h2>
      <p className="text-success">Thank you for filling out the survey form!!</p>
      <div className="card-body">
        <h5 className="card-title">Subscribe to the app to avail all our services just for &#8377;399/year  </h5>
       <br/>
       <br/>
       <button className="btn" onClick={()=>{handlePayment()}} style={{width:"100%",backgroundColor:"rgb(255,63,108)",color:"black",border:"none"}}>Subscribe</button>
      </div>
    </div>
  </div>
  }
  {
    userdetails.payment && <RealDashboard mode={mode}/>
  }
</>
};

export default Dashboard;
