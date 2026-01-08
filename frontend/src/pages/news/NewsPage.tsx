import { useEffect, useState } from "react";
import { useNewsStore } from "@/stores/useNewsStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

const NewsPage = () => {
    const { news, isLoading, error, fetchNews } = useNewsStore();
    const [activeCategory, setActiveCategory] = useState<"music" | "football">("music");

    useEffect(() => {
        fetchNews(activeCategory);
    }, [activeCategory, fetchNews]);

    return (
        <div className='rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900'>
            <ScrollArea className='h-full'>
                <div className='p-6'>
                    <header className='flex items-center justify-between mb-6'>
                        <h1 className='text-3xl font-bold text-white'>Headlines</h1>
                        <div className='flex gap-2 bg-zinc-800/50 p-1 rounded-lg'>
                            <Button
                                variant={activeCategory === "music" ? "secondary" : "ghost"}
                                onClick={() => setActiveCategory("music")}
                                className='text-sm'
                            >
                                Music
                            </Button>
                            <Button
                                variant={activeCategory === "football" ? "secondary" : "ghost"}
                                onClick={() => setActiveCategory("football")}
                                className='text-sm'
                            >
                                Football
                            </Button>
                        </div>
                    </header>

                    {isLoading ? (
                        <div className='h-[50vh] flex items-center justify-center'>
                            <Loader className='size-8 text-emerald-500 animate-spin' />
                        </div>
                    ) : error ? (
                        <div className='h-[50vh] flex items-center justify-center text-red-500'>
                            {error}
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {news.map((article) => (
                                <div
                                    key={article.article_id}
                                    className='bg-zinc-800/40 group rounded-xl overflow-hidden hover:bg-zinc-800/60 transition-colors border border-white/5'
                                >
                                    <div className='aspect-video overflow-hidden relative'>
                                        {article.image_url ? (
                                            <img
                                                src={article.image_url}
                                                alt={article.title}
                                                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                                            />
                                        ) : (
                                            <div className='w-full h-full bg-zinc-700 flex items-center justify-center text-zinc-500'>
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                    <div className='p-4'>
                                        <h3 className='font-bold text-lg mb-2 line-clamp-2 text-white'>
                                            {article.title}
                                        </h3>
                                        <p className='text-zinc-400 text-sm mb-4 line-clamp-3'>
                                            {article.description || "No description available."}
                                        </p>
                                        <div className='flex items-center justify-between mt-auto'>
                                            <span className='text-xs text-zinc-500'>
                                                {new Date(article.pubDate).toLocaleDateString()}
                                            </span>
                                            <a
                                                href={article.link}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='text-emerald-400 hover:text-emerald-300 text-sm font-medium'
                                            >
                                                Read more
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {news.length === 0 && !isLoading && (
                                <div className="col-span-full text-center text-zinc-500 py-10">
                                    No news found.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
};

export default NewsPage;
