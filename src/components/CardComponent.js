import React, { useState, useEffect } from 'react';
import './cardcomponent.css';
import { CircularProgress, Divider, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const CardComponent = ({mode}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [storedOptions, setStoredOptions] = useState([]);
  const [skeleton,setSkeleton] = useState(true);
  let[spin,setSpin]=useState(false);


  let navigate = useNavigate();
  const questions = [
    {
      number: 'Question-1',
      question: 'Select all the full length colors that you have in your cupboard '
    },
    {
      number: 'Question-2',
      question: 'Select all the colors of your tops'
    },
    {
      number: 'Question-3',
      question: 'Select all the colors of your bottoms'
    },
  ];


  // console.log(selectedOptions);
  // console.log(storedOptions);

  const getallcolors = async () => {
    const data = await fetch('https://capstone-backend-xuan.onrender.com/allcolors', {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': true,
        "Content-Type": "application/json"
      }
    });
    const allcolors = await data.json();
    if(data.status===200){
      setSkeleton(false);
      setOptions(allcolors);
    } 
  }


  useEffect(() => {
    getallcolors();
  }, [])

  const handleOptionSelect = (option) => {
    const updatedOptions = [...selectedOptions];

    if (updatedOptions.includes(option)) {
      // Deselect the option if already selected
      const index = updatedOptions.indexOf(option);
      updatedOptions.splice(index, 1);
    } else {
      // Select the option if not already selected
      updatedOptions.push(option);
    }
    setSelectedOptions(updatedOptions);
  };

  const handleNextClick = () => {
    const updatedStoredOptions = [...storedOptions];
    updatedStoredOptions[currentQuestionIndex] = selectedOptions;
    setStoredOptions(updatedStoredOptions);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptions([]);
    }
  };

  const handleSubmitClick = async () => {
    setSpin(true);
    let token = localStorage.getItem('usertoken');
    const updatedStoredOptions = [...storedOptions];
    updatedStoredOptions[currentQuestionIndex] = selectedOptions;

    const data = await fetch('https://capstone-backend-xuan.onrender.com/selectedcolors', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': true,
        'Content-Type': 'application/json',
        Authorization: token,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        storedOptions: updatedStoredOptions
      })
    })
    const response = await data.json();
    localStorage.setItem('result',JSON.stringify(response))
    console.log(response)
    if (response.bottomcolors_liked.length === 0 || response.colors_liked.length === 0 || response.topcolors_liked.length === 0) {
      setSpin(false);
      navigate('/dashboard');
    } else if (!response.payment) {
      setSpin(false);
      navigate('/dashboard');
    } else {
      setSpin(false);
      navigate('/dashboard');
    }
  };
console.log(storedOptions);
  const currentQuestion = questions[currentQuestionIndex];
  return (<div className='hi'>
    <div className={`card   ${(mode==='light') ?'light-mode':'dark-mode'} `} >
      <h2>{currentQuestion.number}</h2>
      <Divider />
      <p>{currentQuestion.question}</p>
     
      <Box sx={{ width: 300 }} style={{ "overflowY": "scroll" }}>
        {skeleton && <>
        <Skeleton sx={{backgroundColor:(mode==='light')?"":"white"}}/>
        <Skeleton sx={{backgroundColor:(mode==='light')?"":"white"}}/>
        <Skeleton sx={{backgroundColor:(mode==='light')?"":"white"}}/>
        <Skeleton sx={{backgroundColor:(mode==='light')?"":"white"}}/>
        <Skeleton sx={{backgroundColor:(mode==='light')?"":"white"}}/>
        </>}
      <ul >
        {options.map((option, index) => (
          <li key={index} >
            <label>
              <input className='checkbox'
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionSelect(option)}
              />
              {option.name}
            </label>
          </li>
        ))}
      </ul>
      </Box>
      <div className="button-container">
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleNextClick} style={{backgroundColor:"rgb(255,63,108)",width:"100%",fontWeight:'500',border:'none',fontStyle:"Secular One, sans-serif"}}
          disabled={(selectedOptions.length<1)? true : false } >Next</button>
        ) :( !spin ? (
          <button onClick={() => { handleSubmitClick() }} style={{backgroundColor:"rgb(255,63,108)",width:"100%",border:'none',fontWeight:'500',color:"white",borderRadius:"5px",fontStyle:"Secular One, sans-serif"}} disabled={(selectedOptions.length<1)? true : false }>Submit</button>
        ) :          <button onClick={() => { handleSubmitClick() }} style={{backgroundColor:"rgb(255,63,108)",width:"100%",border:'none',fontWeight:'500',color:"white",borderRadius:"5px"}} disabled={(selectedOptions.length<1)? true : false }><CircularProgress style={{'color': 'white'}} size="1rem"/></button>
        )}
      </div>
    </div>
  </div>
  );
};

export default CardComponent;
