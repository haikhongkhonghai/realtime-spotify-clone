import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { usePlaylistStore } from "@/stores/usePlaylistStore";
import { Clock, Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const PlaylistPage = () => {
    const { id } = useParams();
    const { fetchPlaylistById, currentPlaylist, isLoading } = usePlaylistStore();
    const { playAlbum, currentSong, isPlaying, togglePlay } = usePlayerStore();

    useEffect(() => {
        if (id) fetchPlaylistById(id);
    }, [id, fetchPlaylistById]);

    if (isLoading) return <div className="h-full flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div></div>;
    if (!currentPlaylist) return <div className="h-full flex items-center justify-center">Playlist not found</div>;

    const handlePlay = () => {
        if (currentPlaylist.songs.length === 0) return;

        // Check if we are currently playing this playlist (logic might be tricky if we don't track contexts, 
        // but checking if the current song is in this playlist is a decent approximation)
        const isCurrentPlaylistPlaying = currentPlaylist.songs.some(song => song._id === currentSong?._id);

        if (isCurrentPlaylistPlaying) {
            togglePlay();
        } else {
            // Treat playlist like an album for the player
            playAlbum(currentPlaylist.songs, 0);
        }
    };

    const handlePlaySong = (index: number) => {
        playAlbum(currentPlaylist.songs, index);
    };

    return (
        <div className='h-full rounded-md bg-zinc-900 overflow-hidden'>
            <ScrollArea className='h-full'>
                {/* Main Content */}
                <div className='relative min-h-full'>
                    {/* Gradient Background */}
                    <div
                        className='absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none'
                        aria-hidden='true'
                    />

                    {/* Content */}
                    <div className='relative z-10 p-6'>
                        <div className='flex p-6 gap-6 pb-8'>
                            <img
                                src={currentPlaylist.imageUrl || "/cover-placeholder.png"}
                                alt={currentPlaylist.title}
                                className='w-[240px] h-[240px] shadow-xl rounded'
                            />
                            <div className='flex flex-col justify-end'>
                                <p className='text-sm font-medium'>Playlist</p>
                                <h1 className='text-7xl font-bold my-4'>{currentPlaylist.title}</h1>
                                <div className='flex items-center gap-2 text-sm text-zinc-100'>
                                    <span>{currentPlaylist.description}</span>
                                    <span className='mx-2'>•</span>
                                    <span className='font-medium'>{currentPlaylist.songs.length} songs</span>
                                </div>
                            </div>
                        </div>

                        {/* Play Button */}
                        <div className='px-6 pb-4 flex items-center gap-6'>
                            <Button
                                onClick={handlePlay}
                                size='icon'
                                className='w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all'
                            >
                                {isPlaying && currentPlaylist.songs.some((song) => song._id === currentSong?._id) ? (
                                    <Pause className='h-7 w-7 text-black' />
                                ) : (
                                    <Play className='h-7 w-7 text-black' />
                                )}
                            </Button>
                        </div>

                        {/* Table Section */}
                        <div className='bg-black/20 backdrop-blur-sm'>
                            {/* Table Header */}
                            <div
                                className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm 
                                            text-zinc-400 border-b border-white/5'
                            >
                                <div>#</div>
                                <div>Title</div>
                                <div>Album</div>
                                <div>
                                    <Clock className='h-4 w-4' />
                                </div>
                            </div>

                            {/* Songs List */}
                            <div className='px-6'>
                                <div className='space-y-2 py-4'>
                                    {currentPlaylist.songs.map((song, index) => {
                                        const isCurrentSong = currentSong?._id === song._id;
                                        return (
                                            <div
                                                key={song._id}
                                                onClick={() => handlePlaySong(index)}
                                                className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm 
                                                text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer
                                                `}
                                            >
                                                <div className='flex items-center justify-center'>
                                                    {isCurrentSong && isPlaying ? (
                                                        <div className='size-4 text-green-500'>♫</div>
                                                    ) : (
                                                        <span className='group-hover:hidden'>{index + 1}</span>
                                                    )}
                                                    {!isCurrentSong && (
                                                        <Play className='h-4 w-4 hidden group-hover:block' />
                                                    )}
                                                </div>

                                                <div className='flex items-center gap-3'>
                                                    <img src={song.imageUrl} alt={song.title} className='size-10' />
                                                    <div>
                                                        <div className={`font-medium truncate ${isCurrentSong ? "text-green-500" : "text-white"}`}>
                                                            {song.title}
                                                        </div>
                                                        <div className='text-xs text-zinc-400'>{song.artist}</div>
                                                    </div>
                                                </div>
                                                <div className='flex items-center'>{song.albumId?.title || "Single"}</div>
                                                <div className='flex items-center'>{formatDuration(song.duration)}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}

export default PlaylistPage;
