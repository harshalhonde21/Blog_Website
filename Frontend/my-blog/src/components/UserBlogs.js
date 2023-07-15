import React, { useEffect, useState } from "react";
import axios from "axios";
import Blogseparate from "./Blogseparate";
import Loader from "./Loader";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

const Container = styled(Box)({
  display:"flex",
  flexWrap: "wrap",
  gap: "10px",
  margin: "80px 0 0 20px",
})

const UserBlogs = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    try {
      const res = await axios.get(`https://react-blog-il3c.onrender.com/api/blog/user/${id}`);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setUser(data.user);
      setLoading(false);
    });
  });

  return (
    <div>
      {loading ? (
        <Loader /> // Show loader component while loading
      ) : (
        <Container>
          {user &&
            user.blogs &&
            user.blogs.map((blog, index) => (
              <Blogseparate
                key={index}
                id={blog._id}
                isUser={true}
                title={blog.title}
                description={blog.description}
                imageURL={blog.image}
                userName={user.name}
              />
            ))}
        </Container>
      )}
    </div>
  );
};

export default UserBlogs;
