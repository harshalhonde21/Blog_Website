import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  maxWidth: 350,
  boxShadow: "5px 5px 5px #ccc",
  ":hover": {
    boxShadow: "12px 12px 20px #ccc",
  },
  cursor: "pointer",
});

const Blogseparate = ({
  title,
  description,
  imageURL,
  userName,
  isUser,
  id,
}) => {
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    const res = axios
      .delete(`https://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));

      return await res.data
  };

  const handleDelete = (e) => {
    deleteRequest().then(() => navigate("/")).then(() => navigate("/blogs"))
  };
  return (
    <div>
      <MyCard>
        <CardMedia sx={{ height: 140 }} image={imageURL} title="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>

          <Typography>
            {"Author  : "}
            <b>{userName}</b>
          </Typography>
        </CardActions>
        {isUser && (
          <>
            <Box
              style={{
                textAlign: "center",
                border: "2px solid #ccc",
                width: "150px",
                marginLeft: "15px",
                borderRadius: "20px",
                marginBottom: "20px",
              }}
            >
              <IconButton onClick={handleEdit} style={{ color: "green" }}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDelete} style={{ color: "red" }}>
                <DeleteOutlineIcon />
              </IconButton>
            </Box>
          </>
        )}
      </MyCard>
    </div>
  );
};

export default Blogseparate;
