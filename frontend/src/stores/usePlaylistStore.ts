import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

interface Playlist {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    songs: any[];
}

interface PlaylistStore {
    playlists: Playlist[];
    currentPlaylist: Playlist | null;
    isLoading: boolean;
    error: string | null;
    fetchPlaylists: () => Promise<void>;
    createPlaylist: (title: string, description?: string) => Promise<void>;
    fetchPlaylistById: (id: string) => Promise<void>;
}

export const usePlaylistStore = create<PlaylistStore>((set) => ({
    playlists: [],
    currentPlaylist: null,
    isLoading: false,
    error: null,

    fetchPlaylists: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/playlists");
            set({ playlists: response.data });
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to fetch playlists" });
        } finally {
            set({ isLoading: false });
        }
    },

    createPlaylist: async (title: string, description?: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.post("/playlists", { title, description });
            set((state) => ({
                playlists: [response.data, ...state.playlists],
            }));
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to create playlist" });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchPlaylistById: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get(`/playlists/${id}`);
            set({ currentPlaylist: response.data });
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to fetch playlist" });
        } finally {
            set({ isLoading: false });
        }
    }
}));
