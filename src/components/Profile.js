import React, { useEffect, useState } from 'react';
import './profile.css';
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CardUpdateComponent from './CardUpdateComponent';
import { Skeleton } from '@mui/material';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  m:0
};

const Profile = ({mode}) => {
  let navigate = useNavigate();
  const [userdetails, setUserdetails] = useState('');
  const [skeleton,setSkeleton]=useState(true);

  const profiledata = async () => {
    let token = localStorage.getItem('usertoken');
    const data = await fetch('https://capstone-backend-xuan.onrender.com/user', {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': true,
        'Authorization': token,
        'Accept': 'application/json'
      }
    });
    const response = await data.json();
    // console.log(response);
    if (data.status === 200) {
      setSkeleton(false);
      setUserdetails(response.user);
      navigate('/profile');
    } else {
      navigate('/dashboard');
    }
  }
  // console.log(userdetails)
  useEffect(() => {
    profiledata();
  }, [localStorage.getItem('result')])
  // console.log(userdetails.colors_liked[0]);

  let full = [];
  let bottoms = [];
  let tops = [];
  userdetails?.bottomcolors_liked?.map(value => bottoms.push(value.name));
  userdetails?.topcolors_liked?.map(value => tops.push(value.name));
  userdetails?.colors_liked?.map(value => full.push(value.name));
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <form className='d-flex flex-column justify-content-center align-items-center user_details  '>
        <h1>User Information</h1>
        <div >
          <label htmlFor='name' className='p-0'  >Name :</label>
          {skeleton ? <Skeleton sx={{height:"50px",width:"60vw",backgroundColor:(mode==='light')?"":"grey"}}/> :
          <input type='text' className='size' id='name' value={userdetails?.name} /> }
        </div><br />
        <div >
          <label htmlFor='email' className='p-0'>Email :</label>
          {skeleton ? <Skeleton sx={{height:"50px",width:"60vw",backgroundColor:(mode==='light')?"":"grey"}}/> :
          <input type='email' className='size' id='email' value={userdetails?.email} />}
        </div><br />
        <div>
          <label htmlFor='full' className='p-0'>Colors selected :</label>
          {skeleton ? <Skeleton sx={{height:"50px",width:"60vw",backgroundColor:(mode==='light')?"":"grey"}}/> :
          <input type='text' className='size' id='full' value={full.join(',')} />}
        </div><br />
        <div>
          <label htmlFor='tops' className='p-0'>Colors For Tops :</label>
          {skeleton ? <Skeleton sx={{height:"50px",width:"60vw",backgroundColor:(mode==='light')?"":"grey"}}/> :
          <input type='text' className='size' id='tops' value={tops.join(',')} />}
        </div><br />
        <div>
          <label htmlFor='bottoms' className='p-0'>Colors for bottoms :</label>
          {skeleton ? <Skeleton sx={{height:"50px",width:"60vw",backgroundColor:(mode==='light')?"":"grey"}}/> :
          <input type='text' className='size' id='bottoms' value={bottoms.join(',')} />}
        </div><br />
        <Button  onClick={handleOpen} className='submitbtn p-2'>Edit & Update</Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-describedby="modal-modal-description" >
        <Box sx={style}>
          <Typography id="modal-modal-description" >
            <CardUpdateComponent mode={mode} setOpen={setOpen}/>
          </Typography>
        </Box>
      </Modal>
      </form>
    </>
  )
}

export default Profile

