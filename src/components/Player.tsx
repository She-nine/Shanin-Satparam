import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  Shuffle, 
  Volume2, 
  VolumeX,
  Maximize2,
  X,
  Music2
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface PlayerProps {
  currentSong: any;
  onClose: () => void;
}

export default function Player({ currentSong, onClose }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 0.1));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  if (!currentSong) return null;

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 h-24 glass border-t border-slate-100 dark:border-white/5 z-50 flex items-center px-8 gap-8"
    >
      {/* YouTube Hidden Embed for calculation / state handling if needed */}
      {/* In a real app, I'd use react-player, but let's stick to the UI for now or use an iframe if we want real music */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 dark:bg-white/5">
         <motion.div 
          className="h-full mood-gradient" 
          style={{ width: `${progress}%` }}
         />
      </div>

      <div className="flex items-center gap-4 w-72">
        <div className="w-14 h-14 rounded-xl overflow-hidden shadow-lg shrink-0 bg-slate-100 dark:bg-zinc-800 flex items-center justify-center">
           {currentSong.thumbnail ? (
             <img src={currentSong.thumbnail} className="w-full h-full object-cover" alt={currentSong.title} />
           ) : (
             <Music2 className="text-slate-400" />
           )}
        </div>
        <div className="min-w-0">
           <h4 className="font-bold truncate text-sm">{currentSong.title}</h4>
           <p className="text-[10px] text-slate-500 dark:text-zinc-500 font-medium truncate">{currentSong.artist}</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center gap-2">
        <div className="flex items-center gap-6">
           <button className="text-slate-400 hover:text-primary transition-colors"><Shuffle size={18} /></button>
           <button className="text-slate-400 hover:text-primary transition-colors"><SkipBack size={20} fill="currentColor" /></button>
           <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full mood-gradient text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all"
           >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
           </button>
           <button className="text-slate-400 hover:text-primary transition-colors"><SkipForward size={20} fill="currentColor" /></button>
           <button className="text-slate-400 hover:text-primary transition-colors"><Repeat size={18} /></button>
        </div>
      </div>

      <div className="flex items-center gap-6 w-72 justify-end">
         {/* Mini YouTube Video Preview */}
         <div className="w-32 h-18 rounded-xl overflow-hidden shadow-xl bg-black border border-white/10 hidden lg:block group relative">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${currentSong.youtubeId}?autoplay=1&controls=0&mute=${isMuted ? 1 : 0}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:opacity-0 transition-opacity flex items-center justify-center">
               <Music2 size={16} className="text-white/50" />
            </div>
         </div>

         <div className="flex items-center gap-3 w-24">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="text-slate-400 hover:text-primary transition-colors"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <div className="flex-1 h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
               <div className="w-2/3 h-full bg-primary rounded-full" />
            </div>
         </div>
         <button className="text-slate-400 hover:text-primary transition-colors"><Maximize2 size={18} /></button>
         <button 
          onClick={onClose}
          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-colors"
         >
           <X size={20} />
         </button>
      </div>
    </motion.div>
  );
}
