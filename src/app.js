import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import UserRouter from "./routes/user.routes.js";
import comparisonRouter from "./routes/CompsrisonRoutes.js"
import bookRouter from "./routes/Books.routes.js"
import scientistRouter from "./routes/Scientist.routes.js";

import { comparision } from "./models/comparision.model.js";
import { CallTracker } from "assert";
import { Scientist } from "./models/Scientist.model.js";
import { AncientBook } from "./models/Book.model.js";
import { title } from "process";
import { log } from "console";
import { getSingleScientist } from "./controllers/Scientist.controller.js";
import { User } from "./models/user.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// View Engine Setup (EJS)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


// Sample route
app.get("/", async (req, res) => {
  const comparisons = await comparision.find();
  const scientists = await Scientist.find();
  const Books = await AncientBook.find();
  const user = await User.find()
  
  // console.log("comparison: ", comparisons)
  // console.log("sci : ", scientists);
  // console.log("book :", Books);
  // console.log("user :", user);

  res.render("UTindex", {
    title: "Universaltruth",
    comparisons: comparisons,
    scientists: scientists,
    Books: Books,
    user: user,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

// Contact Page Route
app.get('/contact', (req, res) => {
  res.render('contact');
});

// Contact Form Submission (Optional)
app.post('/contact/submit', (req, res) => {
  const { name, email, message } = req.body;
  // Process the form data (e.g., send an email or save it in the database)
  res.send('Thank you for contacting us!');
});

console.log(Scientist);

// API Routes

app.use("/api/users", UserRouter);
app.use('/api/comparisons', comparisonRouter);
app.use("/api/Books", bookRouter);
app.use('/api/scientists', scientistRouter);


// Exporting app
export { app };