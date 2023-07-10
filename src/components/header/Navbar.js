import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Menu } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = ({ mode, handletoggle }) => {
    const [isChecked, setIsChecked] = useState(false);
    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        "& .MuiSwitch-switchBase": {
            margin: 1,
            padding: 0,
            transform: "translateX(6px)",
            "&.Mui-checked": {
                color: "#fff",
                transform: "translateX(22px)",
                "& .MuiSwitch-thumb:before": {
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                        "#fff"
                    )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
                },
                "& + .MuiSwitch-track": {
                    opacity: 1,
                    backgroundColor:
                        theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
                },
            },
        },
        "& .MuiSwitch-thumb": {
            backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
            width: 32,
            height: 32,
            "&:before": {
                content: "''",
                position: "absolute",
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    "#fff"
                )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
            },
        },
        "& .MuiSwitch-track": {
            opacity: 1,
            backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
            borderRadius: 20 / 2,
        },
    }));

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    let navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = async () => {
        let token = localStorage.getItem("usertoken");
        const logoutuser = await fetch("http://localhost:8001/logout", {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": true,
                "Content-Type": "application/json",
                Authorization: token,
            },
        });
        const data = await logoutuser.json();
        if (data.status === 200) {
            localStorage.removeItem("usertoken");
            localStorage.removeItem("result");
            localStorage.removeItem('likedProducts')

            navigate("/");
        } else {
            navigate("/*");
        }
    };

    const handleProfile = ()=>{
        if(JSON.parse(localStorage.getItem('result')).email==='admin@gmail.com'){
            navigate('/admin/addproducts')
        }else{
            navigate('/profile');
        }
    }

    const handlewheel=()=>{
        if(JSON.parse(localStorage.getItem('result')).email==='admin@gmail.com'){
            navigate('/admin/addproducts')
        }else{
            navigate('/dashboard');
        }
    }

    return (
        <>
            <header
                style={{ backgroundColor: mode === "light" ? "rgb(240, 238, 238)" : " rgb(33,37,41)" }}>
                <nav>
                    <img src={require("../../images/color-wheel.png")} onClick={() => {handlewheel() }} style={{ cursor: "pointer" }} ></img>
                    <div className="d-flex ">
                        <FormControlLabel
                            checked={isChecked}
                            onClick={() => { handletoggle(setIsChecked) }}
                            control={<MaterialUISwitch sx={{ m: 1 }}  />}
                        />
                        <div className="avtar">
                            <Avatar
                                id="basic-button"
                                style={{ backgroundColor: "pink" }}
                                onClick={handleClick}
                            />
                        </div>
                    </div>
                    {localStorage.getItem('usertoken') && localStorage.getItem('result') &&
                        <>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                }}
                            >
                                <MenuItem onClick={() => { handleClose(); handleProfile(); }} >Profile</MenuItem>
                                <MenuItem onClick={()=>{ handleClose(); navigate('/contact')}}>Contact</MenuItem>
                                <MenuItem onClick={()=>{handleClose(); navigate('/history')}}>History</MenuItem>
                                <MenuItem onClick={() => { handleClose(); handleLogout(); }} >
                                    <LogoutIcon />Logout
                                </MenuItem>
                                
                            </Menu>
                        </>
                    }
                </nav>
            </header>
        </>
    );
};

export default Navbar;
