import styled from "@emotion/styled";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OuterBody = styled(Box)({
  border: "1px solid #ccc",
  width: "50%",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "30%",
  left: "25%",
  borderRadius: "50px",
  boxShadow: "10px 10px 20px #ccc",
});

const TextValue = styled(TextField)({
  margin: "10px 20px 30px 20px",
});

const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios.post("http://localhost:5000/api/blog/add",{
      title:inputs.title,
      description:inputs.description,
      image:inputs.imageURL,
      user:localStorage.getItem("userId")
    }).catch(err => console.log(err))
    return res.data
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(data => console.log(data)).then(() => navigate("/blogs"))
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <OuterBody>
          <Typography
            style={{
              margin: "10px 0 0 0",
              fontSize: "30px",
              fontWeight: "bolder",
              color: "aqua",
            }}
          >
            Create Blog
          </Typography>
          <TextValue
            name="title"
            onChange={handleChange}
            value={inputs.title}
            label="Title"
            variant="standard"
          />
          <TextValue
            name="description"
            onChange={handleChange}
            value={inputs.description}
            label="Description"
            variant="standard"
          />
          <TextValue
            name="imageURL"
            onChange={handleChange}
            value={inputs.imageURL}
            label="Image Url"
            variant="standard"
          />
          <Button
            type="submit"
            style={{
              border: "2px solid aqua",
              marginBottom: "30px",
              width: "44rem",
              marginLeft: "2rem",
              color: "aqua",
              borderRadius: "20px",
              ":hover": {
                boxShadow: "5px 5px 10px aqua",
              },
              
            }}
          >
            Submite
          </Button>
        </OuterBody>
      </form>
    </div>
  );
};

export default AddBlog;
