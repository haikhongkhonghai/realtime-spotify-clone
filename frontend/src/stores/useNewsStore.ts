import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

interface NewsArticle {
    article_id: string;
    title: string;
    description: string | null;
    link: string;
    image_url: string | null;
    pubDate: string;
    source_id: string;
}

interface NewsStore {
    news: NewsArticle[];
    isLoading: boolean;
    error: string | null;
    fetchNews: (category?: string) => Promise<void>;
}

export const useNewsStore = create<NewsStore>((set) => ({
    news: [],
    isLoading: false,
    error: null,

    fetchNews: async (category = "music") => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get(`/news?category=${category}`);
            // NewsData.io returns { status: 'success', totalResults: number, results: [...] }
            set({ news: response.data.results });
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to fetch news" });
        } finally {
            set({ isLoading: false });
        }
    },
}));
