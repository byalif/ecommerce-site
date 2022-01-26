import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Authrouter from "./route/userRoute.js";
import path from "path";
import fileUpload from "express-fileupload";

const __dirname = path.resolve();

dotenv.config();

const app = express();
app.use(fileUpload());
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((client) => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

const port = process.env.PORT || 5000;

//auth route
app.use("/auth", Authrouter);

app.listen(port, () => {
  console.log("app is up and running");
});
