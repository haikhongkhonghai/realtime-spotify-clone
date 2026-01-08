import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { usePlaylistStore } from "@/stores/usePlaylistStore";
import { Plus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const PlaylistDialog = () => {
    const { createPlaylist, isLoading } = usePlaylistStore();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) return;

        await createPlaylist(title, description);
        toast.success("Playlist created!");
        setOpen(false);
        setTitle("");
        setDescription("");
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant='ghost' size='icon' className='hover:bg-zinc-800 text-white'>
                    <Plus className='size-5' />
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 border-zinc-700">
                <DialogHeader>
                    <DialogTitle>Create Playlist</DialogTitle>
                    <DialogDescription>Add a new playlist to your library.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="My Awesome Playlist"
                            className="bg-zinc-800 border-zinc-700 focus-visible:ring-emerald-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description (Optional)</label>
                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Chill vibes only"
                            className="bg-zinc-800 border-zinc-700 focus-visible:ring-emerald-500"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isLoading} className="bg-emerald-500 hover:bg-emerald-600">
                            {isLoading ? "Creating..." : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default PlaylistDialog;
