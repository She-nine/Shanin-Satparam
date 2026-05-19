import { User } from 'firebase/auth';
import { History, Clock, MapPin, Play, Heart, MoreHorizontal, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function HistoryPage({ user, onPlay }: { user: User; onPlay: (song: any) => void }) {
  const stats = [
    { label: 'Total Listens', value: '1,284', change: '+12% this week', color: 'text-primary' },
    { label: 'Top Mood', value: 'Focus', change: '34% of listening time', color: 'text-secondary' },
    { label: 'Listening Time', value: '42h 15m', change: 'This month', color: 'text-accent' },
    { label: 'Current Streak', value: '14 Days', change: 'Personal best!', color: 'text-emerald-500' },
  ];

  const history = [
    { title: "Midnight City", artist: "M83", mood: "Energetic", time: "10:30 AM", date: "Today", img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300", activity: "MORNING WORKOUT", youtubeId: "dX3k_HiQ5fE" },
    { title: "Breathe", artist: "Telepopmusik", mood: "Focus", time: "9:15 AM", date: "Today", img: "https://images.unsplash.com/photo-1514525253361-bee8d488f762?w=300", activity: "DEEP WORK SESSION", youtubeId: "m9LpMIn97kg" },
    { title: "Weightless", artist: "Marconi Union", mood: "Calm", time: "11:45 PM", date: "Yesterday", img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300", activity: "SLEEP PREPARATION", youtubeId: "UfcAVejslrU" },
    { title: "Resonance", artist: "HOME", mood: "Nostalgic", time: "8:22 PM", date: "Yesterday", img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300", activity: "EVENING DRIVE", youtubeId: "8GW6sLrK40k" },
    { title: "Levitating", artist: "Dua Lipa", mood: "Happy", time: "2:10 PM", date: "Yesterday", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", activity: "AFTERNOON BOOST", youtubeId: "TUVcZfQe-Kw" },
  ];

  return (
    <div className="space-y-12">
      <header className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-primary shadow-sm">
           <History size={28} />
        </div>
        <div>
           <h2 className="text-3xl font-bold font-display tracking-tight">Listening History</h2>
           <p className="text-slate-500 dark:text-zinc-400 font-medium">Relive your sonic journey through emotion.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass p-6 rounded-[2rem] space-y-2 border border-slate-100 dark:border-white/5">
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">{stat.label}</p>
            <p className={cn("text-3xl font-bold font-display", stat.color)}>{stat.value}</p>
            <p className="text-[10px] font-bold text-slate-500">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-white/10 -translate-x-1/2 hidden md:block" />
        
        <div className="space-y-16 relative">
          {['Today', 'Yesterday'].map((date) => (
            <div key={date} className="space-y-12">
               <div className="flex justify-center sticky top-0 z-10 py-4">
                  <span className="px-6 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 font-bold text-xs uppercase tracking-[0.2em] shadow-sm">
                    {date}
                  </span>
               </div>
               
               <div className="space-y-8">
                {history.filter(h => h.date === date).map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={cn(
                      "flex flex-col md:flex-row items-center gap-8",
                      i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    )}
                  >
                    <div className="flex-1 w-full md:w-auto flex justify-end">
                       {i % 2 === 0 ? (
                         <EventCard item={item} align="right" onPlay={onPlay} />
                       ) : (
                         <div className="hidden md:block w-full" />
                       )}
                    </div>
                    
                    <div className="relative flex items-center justify-center shrink-0">
                       <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border-4 border-slate-100 dark:border-zinc-950 flex items-center justify-center shadow-lg z-10">
                          <div className={cn(
                            "w-3 h-3 rounded-full",
                            item.mood === 'Energetic' && "bg-orange-400",
                            item.mood === 'Calm' && "bg-blue-400",
                            item.mood === 'Sad' && "bg-slate-400",
                            item.mood === 'Happy' && "bg-rose-400",
                            item.mood === 'Focus' && "bg-primary",
                            item.mood === 'Nostalgic' && "bg-purple-400",
                          )} />
                       </div>
                    </div>

                    <div className="flex-1 w-full md:w-auto">
                       {i % 2 !== 0 ? (
                         <EventCard item={item} align="left" onPlay={onPlay} />
                       ) : (
                         <div className="hidden md:block w-full" />
                       )}
                    </div>
                  </motion.div>
                ))}
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EventCard({ item, align, onPlay }: { item: any, align: 'left' | 'right', onPlay: (song: any) => void }) {
  return (
    <div className={cn(
      "w-full max-w-sm glass p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-white/5 space-y-4 group hover:shadow-xl hover:scale-[1.02] transition-all",
      align === 'right' ? "md:mr-4" : "md:ml-4"
    )}>
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-2 text-slate-400">
            <Clock size={14} />
            <span className="text-xs font-bold font-mono">{item.time}</span>
         </div>
         <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.activity}</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-[1.25rem] overflow-hidden shadow-lg shrink-0">
           <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
        <div className="flex-1 min-w-0">
           <h4 className="font-bold truncate">{item.title}</h4>
           <p className="text-xs text-slate-500 dark:text-zinc-500 font-medium truncate">{item.artist}</p>
        </div>
        <button 
          onClick={() => onPlay(item)}
          className="w-10 h-10 rounded-full mood-gradient text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0"
        >
           <Play size={16} fill="currentColor" />
        </button>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
         <span className={cn(
            "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest",
            item.mood === 'Energetic' && "bg-orange-400/10 text-orange-400",
            item.mood === 'Calm' && "bg-blue-400/10 text-blue-400",
            item.mood === 'Sad' && "bg-slate-400/10 text-slate-400",
            item.mood === 'Happy' && "bg-rose-400/10 text-rose-400",
            item.mood === 'Focus' && "bg-primary/10 text-primary",
            item.mood === 'Nostalgic' && "bg-purple-400/10 text-purple-400",
          )}>
            {item.mood}
          </span>
          <div className="flex items-center gap-2">
             <button className="text-slate-400 hover:text-rose-500 transition-colors"><Heart size={16} /></button>
             <button className="text-slate-400 hover:text-primary transition-colors"><MoreHorizontal size={16} /></button>
          </div>
      </div>
    </div>
  );
}
