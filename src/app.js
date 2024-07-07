import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import UserRouter from "./routes/user.routes.js";
import comparisonRouter from "./routes/CompsrisonRoutes.js"
// import scientistRouter from "./routes/Scientist.routes.js"
import bookRouter from "./routes/Books.routes.js"
import scientistRouter from "./routes/Scientist.routes.js";

// import { getAllScientists } from "./controllers/Scientist.controller.js";
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
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// View Engine Setup (EJS)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// const cards = [
//   { _id: 1, title: "Maharshi Panini", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", image: "https://elibrary.thearyasamaj.org/attachment/view/ZUxpYnJhcnk%3DMTI1/person" },
//   { _id: 2, title: "Modern compare", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", image: "https://elibrary.thearyasamaj.org/attachment/view/ZUxpYnJhcnk%3DMTI1/person" },
//   { _id: 3, title: "Modern with ancient", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", image: "/images/image1.png" },
//   { _id: 4, title: "Modern with ancient", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", image: "/images/image1.png" },
//   // Add more card objects as needed
// ];

// const scientists = [
//   { _id: 1, name: "Albert Einstein", contribution: "Theory of Relativity", image: "einstein.png" },
//   { _id: 2, name: "Marie Curie", contribution: "Radioactivity", image: "curie.png" },
//   // Add more scientist objects as needed
// ];

// const books = [
//   { _id: 1, title: "Book Title 1", text: "This is book written by ancient india", image: "book1.png" },
//   { _id: 2, title: "Book Title 1", text: "This is book written by ancient india", image: "book1.png" },
//   { _id: 3, title: "Book Title 2", text: "", image: "book2.png" },
//   { _id: 4, title: "Book Title 2", text: "", image: "book2.png" },
//   // Add more book objects as needed
// ];

// Sample route
app.get("/", async (req, res) => {
  const comparisons = await comparision.find();
  const scientists = await Scientist.find();
  const Books = await AncientBook.find();
  const user = await User.find()
  console.log("comparison: ", comparisons)
  console.log("sci : ", scientists);
  console.log("book :", Books);
  console.log("user :", user);

  res.render("UTindex", {
    title: "Universaltruth",
    comparisons: comparisons,
    scientists: scientists,
    Books: Books,
    user: user,
  });
});



console.log(Scientist);

// API Routes
app.use("/api/users", UserRouter);
app.use('/api/comparisons', comparisonRouter);
app.use("/api/Books", bookRouter);
app.use('/api/scientists', scientistRouter);


// Exporting app
export { app };