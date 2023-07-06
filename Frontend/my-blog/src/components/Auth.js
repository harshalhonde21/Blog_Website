import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Container = styled(Box)({
  border: "2px solid white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
  padding: "20px",
  width: "300px",
  margin: "150px 0 0 600px",
  boxShadow: "10px 10px 15px #ccc",
  borderRadius: "20px",
});

const Auth = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    try {
      let res = await axios.post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log("error while calling the api", error.message);
      return error.response;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Container>
          <Typography
            style={{
              marginBottom: "20px",
              fontWeight: "bolder",
              fontSize: "30px",
              color: "aqua",
            }}
          >
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              id="standard-basic"
              label="Name"
              variant="standard"
              style={{ marginBottom: "20px" }}
            />
          )}
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type={"email"}
            id="standard-basics"
            label="Email"
            variant="standard"
            style={{ marginBottom: "20px" }}
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type={"password"}
            id="standard-basic"
            label="Password"
            variant="standard"
            style={{ marginBottom: "20px" }}
          />
          <Button
            type="submit"
            style={{
              border: "2px solid aqua",
              marginBottom: "10px",
              borderRadius: "15px",
            }}
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            style={{
              border: "2px solid aqua",
              marginBottom: "5px",
              borderRadius: "15px",
            }}
          >
            Change To {isSignup ? "Login" : "Signup"}{" "}
          </Button>
        </Container>
      </form>
    </div>
  );
};

export default Auth;
