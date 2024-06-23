import express from "express";

const router = express.Router();

router.get("/", (req, ress) => {
  ress.render("UTindex");
});

export default router;
