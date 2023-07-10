import axios from 'axios';
import React, { useEffect, useState } from 'react'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Badge from '@mui/material/Badge';
import './realdashboard.css';
import { Skeleton } from '@mui/material';

const RealDashboard = ({ mode }) => {
    const mystyle = {
        "width": "315px",
        "height": "400px",
        "max-width": "100%",
        "boxShadow": `0 0 5px ${mode === 'light' ? 'black' : `lightGold`}`,
    }
    const [suggestions, setSuggestions] = useState([]);
    const [likedProducts, setLikedProducts] = useState([]);
    const [skeleton,setSkeleton]=useState(true);
    const get_dress = () => {
        let token = localStorage.getItem('usertoken');
        axios.get('http://localhost:8001/suggestion', {
            headers: {
                'Access-Control-Allow-Origin': true,
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then((response) => {
            setSkeleton(false);
            setSuggestions(response.data.suggestionArray);
            localStorage.setItem('result', JSON.stringify(response.data.finduser));
        }).catch((error) => console.log(error))
    }

    const handlelike = async (product_id) => {
        let token = localStorage.getItem('usertoken');
        let userid = JSON.parse(localStorage.getItem('result'))._id;

        const response = await fetch(`http://localhost:8001/like`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': true,
                'Content-Type': 'application/json',
                Authorization: token,
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                product_id: product_id,
                user_id: userid
            })
        })
        const data = await response.json();
        if (response.status === 200) {
            const isLiked = likedProducts.includes(product_id);
            let updatedLikedProducts;
            if (!isLiked) {
                updatedLikedProducts = [...likedProducts, product_id];
            }
            setLikedProducts(updatedLikedProducts);
            localStorage.setItem('likedProducts', JSON.stringify(updatedLikedProducts));
        }
    }

    useEffect(() => {
       get_dress();
    }, []);
    

    useEffect(() => {
        const likedProductsFromLocalStorage = JSON.parse(localStorage.getItem('likedProducts') || '[]');
        setLikedProducts(likedProductsFromLocalStorage);
    }, []);

    return (
        <>
            <h1 className={`text-center p-3 ${(mode === 'light') ? 'lightstyle' : 'headingstyle'} `} >Your Premium suggestion for today</h1>
            <div className='d-flex flex-wrap justify-content-center'>
                {
                    suggestions?.map(suggestion => {
                        return <div className={'col col-12 text-center ' + (suggestions.length === 1 ? 'col-lg-6' : 'col-lg-4 ')}>
                            <Badge className='badge' sx={{
                                "& .MuiBadge-badge": {
                                    color: "black",
                                    backgroundColor: "pink",
                                    right: "30px",
                                    top: "5px",
                                }
                            }} badgeContent={`${suggestion[Object.keys(suggestion)[0]].liked_users.length} users liked`}>
                                {skeleton ? <Skeleton variant='rectangular' width={315} height={400} sx={{backgroundColor:(mode==='light')?"":"grey"}}/> :
                                <img src={suggestion[Object.keys(suggestion)[0]].image} style={mystyle} alt='' />}
                            </Badge>
                            <div className=' justify-content-center'>
                                <div className='badge mt-2' style={{ backgroundColor: "pink", color: "black" }} >{suggestion[Object.keys(suggestion)[0]].colors[0].name}</div><br />
                                <span className='badge mb-2' style={{ backgroundColor: "pink", color: "black" }} target='_blank'><a href={suggestion[Object.keys(suggestion)[0]].image_url} target='blank' style={{ textDecoration: "none", color: "black" }} >Shop it Now <OpenInNewIcon fontSize='40px' /> </a></span><br />
                                <div className='badge mb-3' style={{ backgroundColor: "pink", color: "black", cursor: 'pointer' }} onClick={() => { handlelike(suggestion[Object.keys(suggestion)[0]]._id) }}>
                                    {likedProducts.includes(suggestion[Object.keys(suggestion)[0]]._id) ? <span disabled={true}><FavoriteIcon fontSize='' style={{ color: "red" }} /> liked</span> : <span ><FavoriteBorderIcon fontSize='' /> I like this</span>}
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </>
    )
}

export default RealDashboard
