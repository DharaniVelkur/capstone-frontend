// ImageUploadForm.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Skeleton } from "@mui/material";
import Confetti from "./Confetti";


const ImageUploadForm = ({mode}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [dressType, setDressType] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [spin, setSpin] = useState(false);
  const [product_link, setProductLink] = useState("");
  const [addedproduct, setAddedProduct] = useState(false);
  const [skeleton,setSkeleton] = useState(true);


  let navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setSpin(true);
    let token = localStorage.getItem("usertoken");
    const formData = new FormData();
    formData.append("image", image);
    formData.append("dress_type", dressType);
    formData.append("colors", JSON.stringify(selectedOptions));
    formData.append("image_url", product_link);
    try {
      const response = await axios.post(
        "https://capstone-backend-xuan.onrender.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      setImageUrl(response.data.imageUrl);
      setSelectedOptions([]);
      setImageUrl("");
      setSpin(false);
      setAddedProduct(true);
      setProductLink('');
      setDressType('');
      setIsVisible(true);
      // navigate('/addanother')
    } catch (error) {
      setSpin(false);
      console.error(error);
      setAddedProduct(false);
    }
  };

  const handleDressTypeChange = (e) => {
    setDressType(e.target.value);
  };

  const getallcolors = async () => {
    const data = await fetch("https://capstone-backend-xuan.onrender.com/allcolors", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json",
      },
    });
    const allcolors = await data.json();
    if(data.status==200){
      setSkeleton(false);
      setOptions(allcolors);
    }
    else{
      setSkeleton(false);
      navigate('/*')
    }
  };
  useEffect(() => {
    getallcolors();
  }, []);

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

  return (
    <>
    
      {!addedproduct ? (
        <div className="hi">
          <div className={`card ${(mode==='light') ?'light-mode':'dark-mode'} `} style={{ height: "500px", top: "5vh"  }}>
            <form onSubmit={handleFormSubmit}>
              <h5>Upload an image</h5>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <br />
              <br />
              <h5>Add product link</h5>
              <input
                type="text"
                value={product_link}
                onChange={(e) => setProductLink(e.target.value)}
              ></input>
              <br />
              <br />

              <h5>Type of dress You want to add?</h5>
              <div className="d-flex">
                <label>
                  <input
                    type="radio"
                    value="tops"
                    checked={dressType === "tops"}
                    onChange={handleDressTypeChange}
                  />
                  Tops
                </label>
                <label>
                  <input
                    type="radio"
                    value="bottoms"
                    checked={dressType === "bottoms"}
                    onChange={handleDressTypeChange}
                  />
                  Bottoms
                </label>
                <label>
                  <input
                    type="radio"
                    value="fulllength"
                    checked={dressType === "fulllength"}
                    onChange={handleDressTypeChange}
                  />
                  Full length
                </label>
                <br />
                <br />
              </div>
              <h5>What is the color of the dress? </h5>
              <Box sx={{ width: 300 }}>
        {skeleton && <>
        <Skeleton sx={{backgroundColor:(mode==='light')?"":"white"}}/>
        <Skeleton sx={{backgroundColor:(mode==='light')?"":"white"}}/>
        <Skeleton sx={{backgroundColor:(mode==='light')?"":"white"}}/>
        <Skeleton sx={{backgroundColor:(mode==='light')?"":"white"}}/>
        <Skeleton sx={{backgroundColor:(mode==='light')?"":"white"}}/>
        </>}
              <ul style={{ height: "125px", overflowY: "scroll" }}>
                {options.map((option, index) => (
                  <li key={index}>
                    <label>
                      <input
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
              {!spin ? (
                <button
                  type="submit"
                  style={{
                    backgroundColor: "rgb(255,63,108)",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    width: "100%",
                    fontWeight: "600",
                  }}
                  disabled={(!image || !selectedOptions ||!product_link ||!dressType) ? true : false }
                >
                  Upload
                </button>
              ) : (
                <button
                  style={{
                    backgroundColor: "rgb(255,63,108)",
                    width: "100%",
                    fontWeight: "500",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  <CircularProgress style={{ color: "white" }} size={"1rem"} />
                </button>
              )}
            </form>
          </div>
        </div>
      ) : ( 
        <div
          className="text-center "
          style={{
            height: "30vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isVisible && <Confetti/>}
          <h4 className="text-success">
            You have successfully added the product!!
          </h4>
          <button
            onClick={() =>{ setAddedProduct(false); setIsVisible(false); }}
            style={{
              backgroundColor: "rgb(255,63,108)",
              border: "none",
              borderRadius: "3px",
              padding: "10px",
              color: "white",
            }}
          >
            Add another
          </button>
        </div>
      )}
    </>
  );
};

export default ImageUploadForm;
