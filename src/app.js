import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import UserRouter from "./routes/user.routes.js";
import "ejs";
import comparisonRouter from "./routes/CompsrisonRoutes.js";
import { title } from "process";
import { comparision } from "./models/comparision.model.js";
// import { title } from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// View Engine Setup (EJS)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Sample route

app.get("/", async (req, res) => {
  const cards = await comparision.find();

  if (!cards) {
    throw ApiError(500, "Comparison not found");
  }

  // const cards = [
  //   {
  //     id: 1,
  //     title: "Maharshi Panini",
  //     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //     image:
  //       "https://elibrary.thearyasamaj.org/attachment/view/ZUxpYnJhcnk%3DMTI1/person",
  //   },
  //   {
  //     id: 2,
  //     title: "Morden compare",
  //     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //     image:
  //       "https://elibrary.thearyasamaj.org/attachment/view/ZUxpYnJhcnk%3DMTI1/person",
  //   },
  //   {
  //     id: 3,
  //     title: "Morden with ancient",
  //     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //     images: "/images/image1.png",
  //   },
  //   {
  //     id: 3,
  //     title: "Morden with ancient",
  //     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //     images: "/images/image1.png",
  //   },

  //   // Add more card objects as needed
  // ];

  const scientists = [
    {
      id: 1,
      name: "Albert Einstein",
      contribution: "Theory of Relativity",
      image: "einstein.png",
    },
    {
      id: 2,
      name: "Marie Curie",
      contribution: "Radioactivity",
      image: "curie.png",
    },
    // Add more scientist objects as needed
  ];
  const books = [
    { id: 1, title: "Book Title 1", author: "Author 1", image: "book1.png" },
    { id: 2, title: "Book Title 2", author: "Author 2", image: "book2.png" },
    // Add more book objects as needed
  ];

  res.render("UTindex", {
    title: "Universaltruth",
    cards: cards,
    scientists: scientists,
    books: books,
  });

  console.log("GET / route hit, rendering UTindex");
});

app.get("/card/:id", async (req, res) => {
  const cardId = req.params.id;
  const card = await comparision.findById(cardId);
  console.log({ cardId, card });

  if (card) {
    res.render("card", { card });
  } else {
    res.status(404).send("Card not found");
  }
});

// API Routes
app.use("/api/v1/users", UserRouter);
// Comparison Router
app.use("/api/v1/comparisons", comparisonRouter);

// Exporting app
export { app };
