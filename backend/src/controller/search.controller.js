import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";

export const searchAll = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        // Case-insensitive regex search
        const searchRegex = new RegExp(query, "i");

        const songs = await Song.find({
            $or: [{ title: { $regex: searchRegex } }, { artist: { $regex: searchRegex } }],
        }).limit(10);

        const albums = await Album.find({
            $or: [{ title: { $regex: searchRegex } }, { artist: { $regex: searchRegex } }],
        }).limit(10);

        res.status(200).json({ songs, albums });
    } catch (error) {
        console.error("Error in searchAll", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
