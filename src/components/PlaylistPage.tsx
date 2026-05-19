import { User } from 'firebase/auth';
import { LayoutGrid, Plus, MoreVertical, Music2, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function PlaylistPage({ user, onPlay }: { user: User; onPlay: (song: any) => void }) {
  const playlists = [
    { title: "Chill Vibes", count: 42, mood: "Calm", img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400", song: { title: "Weightless", artist: "Marconi Union", youtubeId: "UfcAVejslrU", thumbnail: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400" } },
    { title: "Study Focus", count: 28, mood: "Focus", img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400", song: { title: "Breathe", artist: "Telepopmusik", youtubeId: "m9LpMIn97kg", thumbnail: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400" } },
    { title: "Happy Energy", count: 56, mood: "Happy", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400", song: { title: "Levitating", artist: "Dua Lipa", youtubeId: "TUVcZfQe-Kw", thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400" } },
    { title: "Late Night Drive", count: 34, mood: "Nostalgic", img: "https://images.unsplash.com/photo-1494735738372-19fa44655bb0?w=400", song: { title: "Resonance", artist: "HOME", youtubeId: "8GW6sLrK40k", thumbnail: "https://images.unsplash.com/photo-1494735738372-19fa44655bb0?w=400" } },
  ];

  return (
    <div className="space-y-12">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-primary shadow-sm">
             <LayoutGrid size={28} />
          </div>
          <div>
             <h2 className="text-3xl font-bold font-display tracking-tight">Your Library</h2>
             <p className="text-slate-500 dark:text-zinc-400 font-medium">Playlists created by you and Moodify AI.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-slate-400 mr-2">Filter</span>
          <button className="px-6 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 font-bold text-sm shadow-sm flex items-center gap-2">
            Sort by: Recent
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {/* Create New Card */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          className="aspect-[4/5] rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-white/10 flex flex-col items-center justify-center gap-4 group hover:border-primary transition-colors"
        >
          <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
            <Plus size={32} />
          </div>
          <div className="text-center">
            <p className="font-bold text-lg">Create Playlist</p>
            <p className="text-xs text-slate-400 font-medium">Build your own mood</p>
          </div>
        </motion.button>

        {playlists.map((pl, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden relative shadow-xl mb-4">
              <img src={pl.img} alt={pl.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <button 
                  onClick={() => onPlay(pl.song)}
                  className="w-16 h-16 rounded-full mood-gradient text-white flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform hover:scale-110 active:scale-95"
                 >
                   <Music2 size={24} />
                 </button>
              </div>
            </div>
            <div className="px-2 flex items-start justify-between">
              <div>
                <h4 className="font-bold text-lg">{pl.title}</h4>
                <p className="text-sm text-slate-400 font-medium">{pl.count} songs</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest",
                    pl.mood === 'Calm' && "bg-blue-500/10 text-blue-500",
                    pl.mood === 'Focus' && "bg-primary/10 text-primary",
                    pl.mood === 'Happy' && "bg-rose-500/10 text-rose-500",
                    pl.mood === 'Nostalgic' && "bg-purple-500/10 text-purple-500",
                  )}>
                    {pl.mood}
                  </span>
                </div>
              </div>
              <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
