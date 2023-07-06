import React from "react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  styled,
  Tabs,
  Tab,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import PersonIcon from '@mui/icons-material/Person';

const NavbarButton = styled(Box)({
  marginLeft: "auto",
  color: "whitesmoke",
});

const MyButton = styled(Button)({
  border: "1px solid whitesmoke",
  color: "whitesmoke",
  marginRight: "20px",
  borderRadius: "30px",
});

const Header = () => {
  const copyright = String.fromCodePoint(0x00a9);
  const year = "2023";
  const myName = `Harshal Honde || All Right Reserved !`;

  const dispath = useDispatch();
  const [value, setValue] = useState();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <>
      <AppBar style={{ position: "fixed", backgroundColor: "aqua" }}>
        <Toolbar>
          <Typography variant="h5" style={{ color: "black" }}>
            Harshal's BlogsApps
          </Typography>
          {isLoggedIn && (
            <Box>
              <Tabs
                style={{ marginLeft: "100px" }}
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab
                  style={{ fontWeight: "bold" }}
                  LinkComponent={Link}
                  to="/blogs"
                  label="All Blogs"
                />
                <Tab
                  style={{ fontWeight: "bold" }}
                  LinkComponent={Link}
                  to="/myBlogs"
                  label="My Blogs"
                />
                <Tab
                  style={{ fontWeight: "bold" }}
                  LinkComponent={Link}
                  to="/blogs/add"
                  label="Add Blog"
                />
              </Tabs>
            </Box>
          )}
          <NavbarButton>
            {!isLoggedIn && (
              <>
                {" "}
                <MyButton LinkComponent={Link} to="/auth" variant="contained">
                  Login
                </MyButton>
                {/* <MyButton LinkComponent={Link} to="/auth" variant="contained">
                Signup
              </MyButton> */}
              </>
            )}
            {isLoggedIn && (
              <MyButton
                onClick={() => dispath(authActions.logout())}
                LinkComponent={Link}
                to="/auth"
                variant="contained"
              >
                Log Out
              </MyButton>
            )}
          </NavbarButton>
        </Toolbar>
      </AppBar>
      <AppBar style={{ marginTop: "42.5rem", backgroundColor: "aqua", position:'fixed' }}>
      {/* my footer start here */}
        <Toolbar style={{gap:'60rem'}}>
          <Typography variant="h5" style={{ color: "black" }}>
            {`${copyright} ${year} ${myName}`}
          </Typography>
          <Typography>
            <a href="https://harshalhonde.netlify.app">
              <PersonIcon style={{border:'2px solid black', borderRadius:'50%', color:'black'}} />
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
