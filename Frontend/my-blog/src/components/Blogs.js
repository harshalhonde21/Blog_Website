import React, { useEffect, useState } from "react";
import axios from "axios";
import Blogseparate from "./Blogseparate";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import Loader from "./Loader"; // Import the loader component

const Container = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  margin: "80px 0 0 20px",
});

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const [loading, setLoading] = useState(true); // Add loading state

  const sendRequest = async () => {
    try {
      let res = await axios.get("https://react-blog-il3c.onrender.com/api/blog");
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setBlogs(data.blogs);
      setLoading(false); // Set loading state to false after receiving the response
    });
  }, []);

  return (
    <div>
      {loading ? (
        <Loader /> // Show loader component while loading
      ) : (
        <Container>
          {blogs &&
            blogs.map((blog, index) => (
              <Blogseparate
                key={blog._id} // Add a unique key prop for each blog
                id={blog._id}
                isUser={localStorage.getItem("userId") === blog.user._id}
                title={blog.title}
                description={blog.description}
                imageURL={blog.image}
                userName={blog.user.name}
              />
            ))}
        </Container>
      )}
    </div>
  );
};

export default Blogs;
