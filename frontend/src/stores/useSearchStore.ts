import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

interface SearchStore {
    results: {
        songs: any[];
        albums: any[];
    };
    isLoading: boolean;
    error: string | null;
    search: (query: string) => Promise<void>;
}

export const useSearchStore = create<SearchStore>((set) => ({
    results: { songs: [], albums: [] },
    isLoading: false,
    error: null,

    search: async (query: string) => {
        if (!query.trim()) {
            set({ results: { songs: [], albums: [] } });
            return;
        }

        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get(`/search?query=${encodeURIComponent(query)}`);
            set({ results: response.data });
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to search" });
        } finally {
            set({ isLoading: false });
        }
    },
}));
