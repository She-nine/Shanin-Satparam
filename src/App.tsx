import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, signInWithGoogle } from './lib/firebase';
import { 
  Home, 
  MessageSquare, 
  Music, 
  History, 
  BarChart3, 
  Settings, 
  LogOut, 
  Moon, 
  Sun,
  Search,
  Bell,
  Play,
  Heart,
  Volume2,
  Mic,
  Send,
  LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// Pages
import Dashboard from './components/Dashboard';
import ChatBot from './components/ChatBot';
import Discover from './components/Discover';
import HistoryPage from './components/HistoryPage';
import Analytics from './components/Analytics';
import SettingsPage from './components/SettingsPage';
import PlaylistPage from './components/PlaylistPage';
import Player from './components/Player';
import LoginPage from './components/LoginPage';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentSong, setCurrentSong] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!user) {
    return <LoginPage onLogin={signInWithGoogle} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Dashboard user={user} onTabChange={setActiveTab} onPlay={setCurrentSong} />;
      case 'chatbot': return <ChatBot user={user} onPlay={setCurrentSong} />;
      case 'discover': return <Discover user={user} onPlay={setCurrentSong} />;
      case 'playlist': return <PlaylistPage user={user} onPlay={setCurrentSong} />;
      case 'history': return <HistoryPage user={user} onPlay={setCurrentSong} />;
      case 'analytics': return <Analytics user={user} />;
      case 'settings': return <SettingsPage user={user} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      default: return <Dashboard user={user} onTabChange={setActiveTab} onPlay={setCurrentSong} />;
    }
  };

  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'chatbot', icon: MessageSquare, label: 'Chatbot' },
    { id: 'discover', icon: Music, label: 'Discover Music' },
    { id: 'playlist', icon: LayoutGrid, label: 'My Playlist' },
    { id: 'history', icon: History, label: 'Listening History' },
    { id: 'analytics', icon: BarChart3, label: 'Mood Analytics' },
  ];

  const generalItems = [
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="h-screen flex bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-72 border-r border-slate-200 dark:border-white/5 flex flex-col p-6 glass dark:bg-zinc-950">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl mood-gradient flex items-center justify-center text-white">
            <Volume2 size={24} />
          </div>
          <h1 className="text-2xl font-bold font-display tracking-tight text-primary">Moodify</h1>
        </div>

        <nav className="flex-1 space-y-8">
          <section>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-4 px-4">Menu</p>
            <div className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn("sidebar-item w-full", activeTab === item.id && "active")}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </section>

          <section>
             <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-4 px-4">General</p>
             <div className="space-y-1">
              {generalItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn("sidebar-item w-full", activeTab === item.id && "active")}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </section>
        </nav>

        <button 
          onClick={() => auth.signOut()}
          className="sidebar-item w-full mt-auto text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-20 border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-8 bg-white/50 dark:bg-transparent backdrop-blur-sm z-10">
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search for songs, artists, or moods..." 
                className="w-full bg-slate-100 dark:bg-white/5 rounded-2xl py-2.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-zinc-400 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-zinc-400 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white dark:border-zinc-950" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-white/5">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">{user.displayName}</p>
                <p className="text-[10px] text-slate-400 font-medium">Premium</p>
              </div>
              <img 
                src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} 
                alt="Avatar" 
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-primary/20 shadow-lg"
              />
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className={cn("flex-1 overflow-y-auto p-8 custom-scrollbar", currentSong && "pb-32")}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {currentSong && (
            <Player 
              currentSong={currentSong} 
              onClose={() => setCurrentSong(null)} 
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
