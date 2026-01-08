import express from "express";
import { getNews } from "../controller/news.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getNews);

export default router;
