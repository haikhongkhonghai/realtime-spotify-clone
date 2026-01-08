import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        imageUrl: {
            type: String,
            required: false,
            default: "/cover-placeholder.png" // We might need a real placeholder image
        },
        userId: {
            type: String,
            required: true, // Clerk ID
        },
        songs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Song",
            },
        ],
    },
    { timestamps: true }
);

export const Playlist = mongoose.model("Playlist", playlistSchema);
