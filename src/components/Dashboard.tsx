import { User } from 'firebase/auth';
import { motion } from 'motion/react';
import { Play, Flame, Heart, Volume2, Plus } from 'lucide-react';
import { cn } from '../lib/utils';

interface DashboardProps {
  user: User;
  onTabChange: (tab: string) => void;
  onPlay: (song: any) => void;
}

export default function Dashboard({ user, onTabChange, onPlay }: DashboardProps) {
  const songs = [
    { title: "Midnight City", artist: "M83", mood: "Energetic", time: "4:03", img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300", youtubeId: "dX3k_HiQ5fE" },
    { title: "Weightless", artist: "Marconi Union", mood: "Calm", time: "8:08", img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300", youtubeId: "UfcAVejslrU" },
    { title: "Glimpse of Us", artist: "Joji", mood: "Sad", time: "3:53", img: "https://images.unsplash.com/photo-1459749411177-042180ce673c?w=300", youtubeId: "FvOpPqXInF4" },
    { title: "Levitating", artist: "Dua Lipa", mood: "Happy", time: "3:23", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", youtubeId: "TUVcZfQe-Kw" },
    { title: "Resonance", artist: "HOME", mood: "Nostalgic", time: "3:32", img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300", youtubeId: "8GW6sLrK40k" },
    { title: "Breathe", artist: "Telepopmusik", mood: "Focus", time: "4:39", img: "https://images.unsplash.com/photo-1514525253361-bee8d488f762?w=300", youtubeId: "m9LpMIn97kg" },
  ];

  return (
    <div className="space-y-10 pb-10">
      <header className="space-y-1">
        <h2 className="text-4xl font-bold font-display tracking-tight">Good morning, {user.displayName?.split(' ')[0]}</h2>
        <div className="flex items-center gap-2">
           <p className="text-slate-500 dark:text-zinc-400 font-medium">Your current detected mood is</p>
           <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">Focus</span>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="lg:col-span-2 relative h-[320px] rounded-[2.5rem] overflow-hidden mood-gradient p-12 text-white shadow-2xl shadow-primary/20"
        >
          <div className="absolute top-12 left-12 p-3 rounded-2xl bg-white/20 backdrop-blur-md">
            <Volume2 size={24} />
          </div>
          <div className="h-full flex flex-col justify-center max-w-sm space-y-4">
             <h3 className="text-4xl font-bold font-display">How are you feeling?</h3>
             <p className="text-white/80 font-medium text-lg leading-relaxed">
              Chat with <span className="font-bold">Moodify AI</span> to get personalized music recommendations based on your exact emotional state right now.
             </p>
             <button 
              onClick={() => onTabChange('chatbot')}
              className="group flex items-center gap-2 text-white font-bold transition-all hover:gap-3"
             >
                Start a conversation 
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-black group-hover:bg-primary group-hover:text-white transition-colors">
                  <Play size={10} fill="currentColor" />
                </span>
             </button>
          </div>
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-black/20 to-transparent" />
        </motion.div>

        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 space-y-6 shadow-sm border border-slate-100 dark:border-white/5 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary font-bold">
               <Flame size={20} />
               <span>Daily Mix</span>
            </div>
          </div>
          
          <div className="aspect-square w-full rounded-2xl overflow-hidden relative shadow-xl">
             <img src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=500" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Daily Mix" />
             <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-14 h-14 rounded-full mood-gradient flex items-center justify-center text-white shadow-lg">
                  <Play size={24} fill="currentColor" />
                </button>
             </div>
             <div className="absolute bottom-4 left-4 text-white">
                <p className="font-bold text-lg">Focus & Flow</p>
                <p className="text-xs font-medium text-white/70">Based on your morning routine</p>
             </div>
          </div>
        </div>
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold font-display tracking-tight">Made For You Today</h3>
          <button onClick={() => onTabChange('discover')} className="text-sm font-bold text-primary hover:underline">View all</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {songs.map((song, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="space-y-3 group"
            >
              <div className="aspect-square rounded-[2rem] overflow-hidden relative shadow-lg">
                <img src={song.img} alt={song.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                   <button 
                    onClick={() => onPlay(song)}
                    className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                   >
                     <Play size={16} fill="currentColor" />
                   </button>
                   <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center shadow-md">
                     <Plus size={16} />
                   </button>
                </div>
              </div>
              <div>
                <p className="font-bold truncate">{song.title}</p>
                <p className="text-xs text-slate-500 dark:text-zinc-500 font-medium">{song.artist}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider",
                    song.mood === 'Energetic' && "bg-orange-500/10 text-orange-500",
                    song.mood === 'Calm' && "bg-blue-500/10 text-blue-500",
                    song.mood === 'Sad' && "bg-slate-500/10 text-slate-500",
                    song.mood === 'Happy' && "bg-emerald-500/10 text-emerald-500",
                    song.mood === 'Nostalgic' && "bg-purple-500/10 text-purple-500",
                    song.mood === 'Focus' && "bg-primary/10 text-primary",
                  )}>
                    {song.mood}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{song.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
