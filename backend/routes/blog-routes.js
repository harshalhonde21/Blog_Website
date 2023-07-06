import express from 'express';
import { addBlog, deleteBlog, getAllBlog, getById, getByUserId, updateBLog } from '../controllers/blog-controller.js';

const blogRouters = express.Router();

blogRouters.get("/", getAllBlog)  //get requests to add the blogs at cloud all add at a same time
blogRouters.post("/add",addBlog) //adding singal blog 
blogRouters.put("/update/:id",updateBLog) //updateblog when the user want to update with the help of userId
blogRouters.get("/:id",getById) //for geting user id
blogRouters.delete("/:id",deleteBlog) //delete the blog
blogRouters.get("/user/:id",getByUserId) //get id by user for various purposes

export default blogRouters
