import { User } from 'firebase/auth';
import { Search, Music, Play, Plus, Clock, Star, Flame, Volume2, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, type FormEvent } from 'react';
import { cn } from '../lib/utils';

interface Song {
  title: string;
  artist: string;
  mood: string;
  time: string;
  img: string;
  youtubeId?: string;
}

export default function Discover({ user, onPlay }: { user: User; onPlay: (song: Song) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMood, setSelectedMood] = useState('All');

  const genres = ['Pop', 'Electronic', 'Lo-Fi', 'Ambient', 'Classical', 'R&B', 'Rock', 'Jazz'];
  const moods = ['All', 'Happy', 'Calm', 'Energetic', 'Focus', 'Sad', 'Nostalgic'];

  const trending: Song[] = [
    { title: "Breathe", artist: "Telepopmusik", mood: "Focus", time: "4:39", img: "https://images.unsplash.com/photo-1514525253361-bee8d488f762?w=300", youtubeId: "m9LpMIn97kg" },
    { title: "Resonance", artist: "HOME", mood: "Nostalgic", time: "3:32", img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300", youtubeId: "8GW6sLrK40k" },
    { title: "Levitating", artist: "Dua Lipa", mood: "Happy", time: "3:23", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", youtubeId: "TUVcZfQe-Kw" },
    { title: "Glimpse of Us", artist: "Joji", mood: "Sad", time: "3:53", img: "https://images.unsplash.com/photo-1459749411177-042180ce673c?w=300", youtubeId: "FvOpPqXInF4" },
    { title: "Weightless", artist: "Marconi Union", mood: "Calm", time: "8:08", img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300", youtubeId: "UfcAVejslrU" },
    { title: "Midnight City", artist: "M83", mood: "Energetic", time: "4:03", img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300", youtubeId: "dX3k_HiQ5fE" },
  ];

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(`/api/search-music?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      const mappedResults: Song[] = data.map((item: any) => ({
        title: item.title,
        artist: item.artist,
        mood: 'Discovered',
        time: 'YouTube',
        img: item.thumbnail,
        youtubeId: item.youtubeId
      }));
      setSearchResults(mappedResults);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-12 pb-12">
      <div className="relative h-[400px] rounded-[3rem] overflow-hidden mood-gradient p-16 text-white flex flex-col justify-center items-start shadow-2xl">
        <div className="max-w-2xl space-y-6 relative z-10">
          <h2 className="text-6xl font-bold font-display tracking-tight leading-tight uppercase relative inline-block">
             Music for your Soul
             <motion.div 
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-10 -right-10 text-white/20"
             >
                <Sparkles size={80} />
             </motion.div>
          </h2>
          <p className="text-xl text-white/80 font-medium max-w-lg">
            Search for any mood or song. Powered by real-time YouTube intelligence.
          </p>
          <form onSubmit={handleSearch} className="relative w-full max-w-md group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white transition-colors" size={24} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want to listen to?" 
              className="w-full bg-white/10 backdrop-blur-md rounded-3xl py-5 pl-16 pr-6 outline-none border border-white/20 focus:bg-white/20 transition-all font-medium text-lg placeholder:text-white/40"
            />
            {isSearching && (
              <div className="absolute right-6 top-1/2 -translate-y-1/2">
                <Loader2 className="animate-spin text-white/50" size={20} />
              </div>
            )}
          </form>
          <div className="flex flex-wrap gap-2 pt-2">
            {moods.map((mood) => (
              <button 
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-bold transition-all",
                  selectedMood === mood ? "bg-white text-black shadow-lg" : "bg-white/10 text-white hover:bg-white/20"
                )}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {searchResults.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between px-2">
              <h3 className="text-3xl font-bold font-display flex items-center gap-3">
                 <Search className="text-primary" />
                 Search Results
              </h3>
              <button 
                onClick={() => setSearchResults([])}
                className="text-sm font-bold text-slate-400 hover:text-primary"
              >
                Clear Search
              </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-8">
               {searchResults.map((song, i) => (
                 <SongCard key={`search-${i}`} song={song} onPlay={onPlay} />
               ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <section className="space-y-8">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-3xl font-bold font-display flex items-center gap-3">
             <Star className="text-primary" fill="currentColor" />
             Recommended for You
          </h3>
          <button className="text-sm font-bold text-slate-400 hover:text-primary">See all</button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8">
           {trending.map((song, i) => (
             <SongCard key={i} song={song} onPlay={onPlay} />
           ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-3xl font-bold font-display flex items-center gap-3">
             <Flame className="text-orange-500" fill="currentColor" />
             Trending Now
          </h3>
          <button className="text-sm font-bold text-slate-400 hover:text-primary">See all</button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8">
           {[...trending].reverse().map((song, i) => (
             <SongCard key={i} song={song} onPlay={onPlay} />
           ))}
        </div>
      </section>

      <section className="space-y-8">
        <h3 className="text-3xl font-bold font-display flex items-center gap-3 px-2">
           <Volume2 className="text-secondary" />
           Explore Genres
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {genres.map((genre, i) => (
            <motion.button 
              key={genre}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "h-24 rounded-3xl text-white font-bold text-xl shadow-lg flex items-center justify-center",
                i % 4 === 0 && "bg-blue-500",
                i % 4 === 1 && "mood-gradient",
                i % 4 === 2 && "bg-rose-500",
                i % 4 === 3 && "bg-indigo-500",
              )}
            >
              {genre}
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}

function SongCard({ song, onPlay }: { song: Song; onPlay: (song: Song) => void; key?: string | number }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="space-y-4 group"
    >
      <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden relative shadow-xl">
        <img src={song.img} alt={song.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
           <button 
            onClick={() => onPlay(song)}
            className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
           >
             <Play size={24} fill="currentColor" />
           </button>
           <button className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
             <Plus size={24} />
           </button>
        </div>
      </div>
      <div className="px-2">
        <p className="font-bold text-lg truncate">{song.title}</p>
        <p className="text-sm text-slate-500 dark:text-zinc-500 font-medium truncate">{song.artist}</p>
        <div className="flex items-center gap-2 mt-3">
           <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 font-bold uppercase tracking-widest">{song.mood}</span>
           <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1 ml-auto">
             <Clock size={10} />
             {song.time}
           </span>
        </div>
      </div>
    </motion.div>
  );
}

function SparklesIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
