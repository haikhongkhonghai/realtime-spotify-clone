import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchStore } from "@/stores/useSearchStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SearchPage = () => {
    const [query, setQuery] = useState("");
    const { results, isLoading, search } = useSearchStore();
    const { playAlbum, currentSong } = usePlayerStore();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query) {
                search(query);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query, search]);

    const handlePlaySong = (song: any) => {
        playAlbum([song], 0);
    }

    return (
        <div className='h-full rounded-md bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden'>
            <ScrollArea className='h-full'>
                <div className='p-6'>
                    <h1 className='text-3xl font-bold mb-6 text-white'>Search</h1>
                    <Input
                        placeholder='What do you want to listen to?'
                        className='bg-zinc-800 border-zinc-700 text-white mb-8 focus-visible:ring-emerald-500'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    {isLoading && <div className='text-zinc-400'>Searching...</div>}

                    {!isLoading && !results.songs.length && !results.albums.length && query && (
                        <div className='text-center text-zinc-500'>No results found for "{query}"</div>
                    )}
                    {!isLoading && !results.songs.length && !results.albums.length && !query && (
                        <div className='text-center text-zinc-500'>Type to search for songs or albums</div>
                    )}

                    <div className='space-y-8'>
                        {/* Songs Section */}
                        {results.songs.length > 0 && (
                            <div>
                                <h2 className='text-2xl font-bold mb-4 text-white'>Songs</h2>
                                <div className='space-y-2'>
                                    {results.songs.map((song) => (
                                        <div
                                            key={song._id}
                                            className='flex items-center gap-3 p-2 rounded hover:bg-white/5 group cursor-pointer'
                                            onClick={() => handlePlaySong(song)}
                                        >
                                            <div className='relative'>
                                                <img src={song.imageUrl} alt={song.title} className='size-12 rounded object-cover' />
                                                <div className='absolute inset-0 items-center justify-center bg-black/40 hidden group-hover:flex rounded'>
                                                    <Play className='size-6 text-white' fill="white" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className={`font-medium ${currentSong?._id === song._id ? 'text-green-500' : 'text-white'}`}>{song.title}</div>
                                                <div className='text-sm text-zinc-400'>{song.artist}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Albums Section */}
                        {results.albums.length > 0 && (
                            <div>
                                <h2 className='text-2xl font-bold mb-4 text-white'>Albums</h2>
                                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                                    {results.albums.map((album) => (
                                        <Link
                                            to={`/albums/${album._id}`}
                                            key={album._id}
                                            className='p-4 bg-zinc-800/50 hover:bg-zinc-800 rounded-md transition-all group'
                                        >
                                            <div className='relative mb-4'>
                                                <img
                                                    src={album.imageUrl}
                                                    alt={album.title}
                                                    className='w-full aspect-square object-cover rounded-md shadow-lg'
                                                />
                                                <div
                                                    className='absolute right-2 bottom-2 bg-green-500 p-3 rounded-full 
                                                opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                                                transition-all shadow-lg'
                                                >
                                                    <Play className='size-5 text-black' fill='black' />
                                                </div>
                                            </div>
                                            <h3 className='font-bold text-white truncate'>{album.title}</h3>
                                            <p className='text-sm text-zinc-400 truncate'>Album • {album.artist}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};

export default SearchPage;
