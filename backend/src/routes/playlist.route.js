import express from "express";
import { createPlaylist, getUserPlaylists, addSongToPlaylist, getPlaylistById } from "../controller/playlist.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, createPlaylist);
router.get("/", protectRoute, getUserPlaylists);
router.post("/add-song", protectRoute, addSongToPlaylist); // or /:id/songs
router.get("/:id", protectRoute, getPlaylistById);

export default router;
