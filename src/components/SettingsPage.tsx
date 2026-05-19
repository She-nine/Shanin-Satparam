import { User } from 'firebase/auth';
import { 
  Settings, 
  User as UserIcon, 
  Moon, 
  Sun, 
  Bell, 
  Shield, 
  Volume2, 
  Camera,
  ChevronRight,
  Monitor,
  Zap,
  Check,
  Activity
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { auth } from '../lib/firebase';

interface SettingsProps {
  user: User;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export default function SettingsPage({ user, isDarkMode, setIsDarkMode }: SettingsProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-primary shadow-sm">
           <Settings size={28} />
        </div>
        <div>
           <h2 className="text-3xl font-bold font-display tracking-tight">Settings</h2>
           <p className="text-slate-500 dark:text-zinc-400 font-medium">Manage your sonic environment.</p>
        </div>
      </header>

      <div className="space-y-6">
        {/* Profile Section */}
        <section className="glass rounded-[3rem] p-10 space-y-10 border border-slate-100 dark:border-white/5">
           <div className="flex items-center gap-3 text-primary">
              <UserIcon size={20} />
              <h3 className="font-bold text-lg">Profile</h3>
           </div>

           <div className="flex items-center gap-10">
              <div className="relative group">
                 <img 
                  src={user.photoURL || ''} 
                  className="w-32 h-32 rounded-[2.5rem] object-cover ring-4 ring-primary/10 shadow-2xl transition-transform group-hover:scale-105" 
                  alt="Avatar" 
                 />
                 <button className="absolute bottom-2 right-2 p-2.5 rounded-2xl bg-white dark:bg-zinc-800 text-primary shadow-lg border border-slate-100 dark:border-white/10 hover:scale-110 active:scale-95 transition-all">
                    <Camera size={18} />
                 </button>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Display Name</label>
                    <input 
                      type="text" 
                      defaultValue={user.displayName || ''} 
                      className="w-full bg-slate-50 dark:bg-zinc-800/50 rounded-2xl py-3.5 px-6 border border-slate-200 dark:border-white/5 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" 
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Email</label>
                    <input 
                      type="email" 
                      readOnly
                      defaultValue={user.email || ''} 
                      className="w-full bg-slate-100 dark:bg-zinc-800/20 rounded-2xl py-3.5 px-6 border border-slate-200 dark:border-white/5 outline-none font-medium text-slate-400" 
                    />
                 </div>
              </div>
           </div>
        </section>

        {/* Appearance Section */}
        <section className="glass rounded-[3rem] p-10 space-y-10 border border-slate-100 dark:border-white/5">
           <div className="flex items-center gap-3 text-secondary">
              <Monitor size={20} />
              <h3 className="font-bold text-lg">Appearance</h3>
           </div>

           <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 dark:bg-zinc-800/30 border border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-4">
                 <div className="p-3 rounded-2xl bg-white dark:bg-zinc-800 shadow-sm text-secondary">
                    {isDarkMode ? <Moon size={24} /> : <Sun size={24} />}
                 </div>
                 <div>
                    <h4 className="font-bold">Dark Mode</h4>
                    <p className="text-sm text-slate-500 font-medium">Toggle the dark theme for the application.</p>
                 </div>
              </div>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={cn(
                  "w-16 h-9 rounded-full relative transition-colors duration-300 flex items-center px-1",
                  isDarkMode ? "bg-primary" : "bg-slate-200 dark:bg-zinc-700"
                )}
              >
                <div className={cn(
                  "w-7 h-7 rounded-full bg-white shadow-md transition-transform duration-300",
                  isDarkMode ? "translate-x-7" : "translate-x-0"
                )} />
              </button>
           </div>
        </section>

        {/* Audio Section */}
        <section className="glass rounded-[3rem] p-10 space-y-10 border border-slate-100 dark:border-white/5">
           <div className="flex items-center gap-3 text-accent">
              <Volume2 size={20} />
              <h3 className="font-bold text-lg">Audio & Playback</h3>
           </div>

           <div className="space-y-4">
              {[
                { title: 'High Quality Audio', desc: 'Stream music in the highest available bitrate.', icon: Zap, active: true },
                { title: 'Mood Transitions', desc: 'Automatically crossfade when your mood changes.', icon: Activity, active: true },
                { title: 'Smart Volume', desc: 'Normalize volume across all songs.', icon: Volume2, active: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 dark:bg-zinc-800/30 border border-slate-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-zinc-800/50 transition-all group">
                   <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-white dark:bg-zinc-800 shadow-sm text-slate-400 group-hover:text-primary transition-colors">
                         <item.icon size={24} />
                      </div>
                      <div>
                         <h4 className="font-bold">{item.title}</h4>
                         <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                      </div>
                   </div>
                   <div className={cn(
                     "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                     item.active ? "bg-primary border-primary text-white" : "border-slate-300 dark:border-zinc-600"
                   )}>
                      {item.active && <Check size={14} strokeWidth={4} />}
                   </div>
                </div>
              ))}
           </div>
        </section>
      </div>

      <div className="flex justify-end pt-4 pb-20">
         <button 
          onClick={() => auth.signOut()}
          className="px-8 py-4 rounded-2xl bg-red-500/10 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10"
         >
           Logout Account
         </button>
      </div>
    </div>
  );
}
