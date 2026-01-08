import express from "express";
import { searchAll } from "../controller/search.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Search is generally public in many apps, but let's keep it authenticated if preferred. 
// However, typically Spotify allows searching without login on web? No, usually login required.
// Let's use protectRoute to be safe given the "professional" requirement usually implies auth.
router.get("/", protectRoute, searchAll);

export default router;
