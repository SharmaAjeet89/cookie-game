// Please don't change the pre-written code
// Import the necessary modules here

import express from "express";
import session from 'express-session';

import cookieParser from "cookie-parser";
import { auth } from './middleware/auth.js'; 
import { generateRandomNumber } from "./middleware/generateRandomNumber.js"; // Import the auth middleware

import {
  handleGame,
  handleLogin,
  handlePost,
  handleSignUp,
  renderLogin,
  renderSignUp,
} from "./user.controller.js";


const app = express();

// Implement the necessary Express Session here
app.use(session({
  secret: 'randomNumber',  // Replace 'yourSecretKey' with a more secure and complex string
  resave: false,            // Do not resave session if it is unmodified
  saveUninitialized: false, // Don't save a session unless it is modified (e.g., login)
  cookie: {
     // 1 day in milliseconds (adjust as needed)
    secure: false,               // Set to true if using HTTPS, makes cookie secure
                 // Prevents client-side JavaScript from accessing the cookie
  }
}));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", auth, generateRandomNumber, handleGame);
app.post("/guess", handlePost);

app.get("/login", renderLogin);
app.get("/signup", renderSignUp);

app.post("/login", handleLogin);
app.post("/signup", handleSignUp);

export default app;
