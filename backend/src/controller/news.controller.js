import axios from "axios";

export const getNews = async (req, res) => {
    try {
        const { category = "music" } = req.query;
        const apiKey = process.env.NEWSDATA_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ message: "Missing NewsData API Key" });
        }

        // Map generic categories to specific keywords or categories supported by NewsData.io if needed.
        // For now, we use the query 'q' for specific topics like 'music' or 'football' 
        // or use 'category' param if NewsData supports it directly.
        // NewsData 'category' param allows: business, entertainment, environment, food, health, politics, science, sports, technology, top, tourism, world.
        // 'music' is not a standard category, so we likely need to use 'q' (keywords).
        // 'football' fits under 'sports' but 'q=football' is more specific.

        let params = {
            apikey: apiKey,
            language: "en", // Default to English content or 'vi' if available/preferred
        };

        if (category.toLowerCase() === 'football') {
            params.category = 'sports';
            params.q = 'football';
        } else if (category.toLowerCase() === 'music') {
            params.category = 'entertainment';
            params.q = 'music';
        } else {
            params.q = category;
        }

        const response = await axios.get("https://newsdata.io/api/1/news", { params });

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error fetching news:", error.response?.data || error.message);
        res.status(500).json({ message: "Failed to fetch news", error: error.message });
    }
};
