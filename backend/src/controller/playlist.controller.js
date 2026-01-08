import { Playlist } from "../models/playlist.model.js";

export const createPlaylist = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.auth.userId;

        const playlist = await Playlist.create({
            title,
            description,
            userId,
            imageUrl: "/cover-placeholder.png"
        });

        res.status(201).json(playlist);
    } catch (error) {
        console.error("Error creating playlist", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getUserPlaylists = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const playlists = await Playlist.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(playlists);
    } catch (error) {
        console.error("Error fetching user playlists", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const addSongToPlaylist = async (req, res) => {
    try {
        const { playlistId, songId } = req.body;
        const userId = req.auth.userId;

        const playlist = await Playlist.findOne({ _id: playlistId, userId });
        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found or access denied" });
        }

        if (playlist.songs.includes(songId)) {
            return res.status(400).json({ message: "Song already in playlist" });
        }

        playlist.songs.push(songId);
        await playlist.save();

        res.status(200).json(playlist);
    } catch (error) {
        console.error("Error adding song to playlist", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getPlaylistById = async (req, res) => {
    try {
        const { id } = req.params;
        const playlist = await Playlist.findById(id).populate("songs");

        if (!playlist) return res.status(404).json({ message: "Playlist not found" });

        res.status(200).json(playlist);
    } catch (error) {
        console.error("Error fetching playlist", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
