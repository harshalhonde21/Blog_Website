import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogRouters from "./routes/blog-routes.js";
import cors from 'cors';
const app = express();


app.use(cors());
app.use(express.json());
app.use("/api/user", router); // this shows my routes user populate
app.use("/api/blog", blogRouters); // blog api for fetching the data

//successfully tested with postman tester

mongoose
  .connect(
    "mongodb+srv://harshalhonde17:harshal%40123@cluster0.b0mwyen.mongodb.net/Blogs?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() => console.log("connected database at 5000"))
  .catch((error) => console.log(`${error}is error`));

// app.listen(5000);
