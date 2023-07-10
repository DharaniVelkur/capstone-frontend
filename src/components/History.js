import React, { useState } from "react";
import Badge from '@mui/material/Badge';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {NavLink} from 'react-router-dom'


const History = ({mode}) => {
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem("result")).suggestion_history);
  const mystyle = {
    "width": "315px",
    "height": "400px",
    "max-width": "100%",
    "boxShadow": `0 0 5px ${mode === 'light' ? 'black' : `lightGold`}`,
}

  return (
    <>
      <h1 className="text-center pt-3">Your suggestion history</h1>
      {history ?
        Object.keys(history)?.map(key =>(
            <>
            <h3 className="text-center" style={{color:"red"}}>  On '{key}'</h3>
            <div className='d-flex flex-wrap justify-content-center'>
                {
                    history[key].map(suggestion=> {
                        return <>
                        <div className={'col col-12 mb-4 text-center ' + (history[key].length === 1 ? 'col-lg-6' : 'col-lg-4 ')}>
                            <Badge className='badge' sx={{
                                "& .MuiBadge-badge": {
                                    color: "black",
                                    backgroundColor: "pink",
                                    right: "30px",
                                    top: "5px",
                                }
                            }} badgeContent={`${suggestion[Object.keys(suggestion)[0]].liked_users.length} users liked`}>
                                <img src={suggestion[Object.keys(suggestion)[0]].image} style={mystyle} alt='' />
                            </Badge>
                            <div className=' justify-content-center'>
                                <div className='badge mt-2' style={{ backgroundColor: "pink", color: "black" }} >{suggestion[Object.keys(suggestion)[0]].colors[0].name}</div><br />
                                <span className='badge mb-2' style={{ backgroundColor: "pink", color: "black" }} target='_blank'><a href={suggestion[Object.keys(suggestion)[0]].image_url} target='blank' style={{ textDecoration: "none", color: "black" }} >Shop it Now <OpenInNewIcon fontSize='40px' /> </a></span><br />
                                </div>
                            </div>
                            </>
                    })
                }
                </div>
            </>
        )) :<>
        <p className="text-center">Your suggestion history is empty</p>
       <p className="text-center"> <NavLink to={'/'}>Go back to Home page </NavLink></p>
        </>
    }
    
    </>
  );
};

export default History;
