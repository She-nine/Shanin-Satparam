import { useState, useRef, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  Mic, 
  Send, 
  Volume2, 
  RefreshCcw, 
  Music, 
  Plus, 
  Play,
  BrainCircuit,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { db } from '../lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, limit, serverTimestamp } from 'firebase/firestore';

interface ChatBotProps {
  user: User;
  onPlay: (song: any) => void;
}

interface Message {
  id: string;
  userId: string;
  message: string;
  response: string;
  sentiment: string;
  emotion: string;
  tokens: string[];
  keywords: string[];
  spectrum: Record<string, number>;
  recommendations: any[];
  createdAt: any;
}

export default function ChatBot({ user, onPlay }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState<Message | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'users', user.uid, 'chats'),
      orderBy('createdAt', 'desc'),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message)).reverse();
      setMessages(msgs);
      if (msgs.length > 0) {
        setSelectedAnalysis(msgs[msgs.length - 1]);
      } else {
        // Only add welcome message if it's truly empty and it's the first load
        // But better to just let the user start the convo or have a static welcome
      }
    });

    return () => unsubscribe();
  }, [user.uid]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string = inputText) => {
    if (!text.trim()) return;
    const msg = text;
    setInputText('');
    setIsTyping(true);

    // Prepare history for context - take up to 10 previous messages for better context
    const history = messages.slice(-10).map(m => ([
      { role: 'user', text: m.message },
      { role: 'model', text: m.response }
    ])).flat();

    try {
      const response = await fetch('/api/analyze-mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: msg,
          history: history
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Server Error Data:', errorData);
        throw new Error(errorData.details || errorData.error || 'Failed to fetch AI response');
      }
      
      const analysis = await response.json();

      if (analysis.error) throw new Error(analysis.error);

      // Add temporarily to local state for instant feedback if Firestore is slow
      // But we rely on onSnapshot for the source of truth

      await addDoc(collection(db, 'users', user.uid, 'chats'), {
        userId: user.uid,
        message: msg,
        response: analysis.explanation || "I'm here for you, though I couldn't generate a specific response just now. What's on your mind?",
        sentiment: analysis.sentiment || 'Neutral',
        emotion: analysis.emotion || 'Neutral',
        tokens: analysis.tokens || [],
        keywords: analysis.keywords || [],
        spectrum: analysis.spectrum || {},
        recommendations: analysis.recommendations || [],
        createdAt: serverTimestamp()
      });

      // Simple Text to Speech
      if (window.speechSynthesis && analysis.explanation) {
        const utterance = new SpeechSynthesisUtterance(analysis.explanation);
        utterance.rate = 1.1; // Slightly faster for modern feel
        window.speechSynthesis.speak(utterance);
      }

    } catch (error: any) {
      console.error('Chat Error:', error);
      // Fallback message on error
      await addDoc(collection(db, 'users', user.uid, 'chats'), {
        userId: user.uid,
        message: msg,
        response: error.message?.includes('Later') 
          ? "I'm a bit busy right now, but I'll be back in a second! Can you try sending that again?" 
          : "I'm having a little trouble connecting right now, but I'm still listening. Want to try again?",
        sentiment: 'Neutral',
        emotion: 'Neutral',
        tokens: [],
        keywords: [],
        spectrum: {},
        recommendations: [],
        createdAt: serverTimestamp()
      });
    } finally {
      setIsTyping(false);
    }
  };

  const startSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setInputText(text);
      handleSendMessage(text);
    };
    recognition.start();
  };

  const speakText = (text: string) => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="h-full flex gap-8">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col glass rounded-[2.5rem] overflow-hidden shadow-sm relative">
        <header className="px-8 py-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between bg-white/50 dark:bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl mood-gradient flex items-center justify-center text-white">
                <BrainCircuit size={24} />
             </div>
             <div>
                <h3 className="font-bold font-display">Moodify AI</h3>
                <div className="flex items-center gap-1.5">
                   <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Online & Listening</span>
                </div>
             </div>
          </div>
          <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-primary transition-colors">
            <Volume2 size={16} />
            <span>Speak Responses</span>
          </button>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
          <div className="space-y-10">
            {messages.length === 0 && !isTyping && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center text-center py-20 space-y-6"
              >
                <div className="w-20 h-20 rounded-[2rem] mood-gradient flex items-center justify-center text-white shadow-2xl shadow-primary/20">
                  <BrainCircuit size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-display tracking-tight">I'm listening.</h3>
                  <p className="text-slate-500 max-w-sm mx-auto font-medium">How are you feeling today? Share your mood, a thought, or a recent event, and I'll find the perfect soundtrack for it.</p>
                </div>
              </motion.div>
            )}
            {messages.map((m) => (
               <div key={m.id} className="space-y-8">
                  {/* User Message */}
                  <div className="flex justify-end pr-2">
                     <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="max-w-[80%] px-6 py-4 rounded-3xl rounded-tr-none bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white shadow-sm font-medium border border-slate-200 dark:border-white/5"
                     >
                        {m.message}
                     </motion.div>
                  </div>
                  
                  {/* AI Message */}
                  <div className="flex justify-start items-start gap-4">
                     <div className="w-10 h-10 rounded-2xl mood-gradient flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
                        <Sparkles size={20} />
                     </div>
                     <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      onClick={() => setSelectedAnalysis(m)}
                      className="max-w-[85%] space-y-4 group cursor-pointer"
                     >
                        <div className="relative">
                          <div className="px-6 py-4 rounded-3xl rounded-tl-none bg-white dark:bg-zinc-800/80 backdrop-blur-sm shadow-md border border-slate-100 dark:border-white/10 text-slate-800 dark:text-zinc-100 text-[1.05rem] leading-relaxed">
                             {m.response}
                             <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-100 dark:border-white/5">
                               <button 
                                onClick={(e) => { e.stopPropagation(); speakText(m.response); }} 
                                className="text-primary hover:text-primary/80 text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5 transition-colors"
                               >
                                 <Volume2 size={12} /> Listen
                               </button>
                               <span className="text-[10px] text-slate-300 dark:text-zinc-600 font-bold uppercase tracking-widest">
                                 {selectedAnalysis?.id === m.id ? 'Analyzing Now' : 'Click to Analyze'}
                               </span>
                             </div>
                          </div>
                          {/* Visual Indicator for currently selected analysis */}
                          {selectedAnalysis?.id === m.id && (
                            <div className="absolute -left-1 top-0 bottom-0 w-1 bg-primary rounded-full" />
                          )}
                        </div>

                        {/* Song Previews in Chat */}
                        {m.recommendations && m.recommendations.length > 0 && (
                          <div className="flex gap-4 overflow-x-auto pb-4 pt-2 -mx-2 px-2 custom-scrollbar no-scrollbar">
                             {m.recommendations.map((song, i) => (
                                <motion.div 
                                  key={i} 
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="min-w-[240px] p-5 rounded-[2rem] bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-slate-100 dark:border-white/5 flex items-center gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group/song"
                                >
                                   <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 shadow-md">
                                      {song.thumbnail ? (
                                        <img src={song.thumbnail} className="w-full h-full object-cover" alt={song.title} />
                                      ) : (
                                        <div className="w-full h-full mood-gradient flex items-center justify-center text-white">
                                          <Music size={24} />
                                        </div>
                                      )}
                                   </div>
                                   <div className="flex-1 min-w-0">
                                      <p className="text-sm font-bold truncate group-hover/song:text-primary transition-colors">{song.title}</p>
                                      <p className="text-[11px] text-slate-500 font-medium truncate uppercase tracking-wider">{song.artist}</p>
                                   </div>
                                   <button 
                                    onClick={(e) => { e.stopPropagation(); onPlay(song); }}
                                    className="w-10 h-10 rounded-full mood-gradient text-white flex items-center justify-center shadow-lg shadow-primary/20 scale-90 group-hover/song:scale-110 active:scale-95 transition-all"
                                   >
                                      <Play size={14} fill="currentColor" />
                                   </button>
                                </motion.div>
                             ))}
                          </div>
                        )}
                     </motion.div>
                  </div>
               </div>
            ))}
            {isTyping && (
               <div className="flex justify-start items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl mood-gradient flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
                    <Sparkles size={20} />
                  </div>
                  <div className="px-6 py-5 rounded-3xl rounded-tl-none bg-white dark:bg-zinc-800 shadow-sm border border-slate-100 dark:border-white/5 flex gap-1.5 items-center">
                     <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                     <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                     <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  </div>
               </div>
            )}
          </div>
        </div>

        <footer className="p-8 bg-white/50 dark:bg-white/5 backdrop-blur-md">
           <div className="relative group">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="How are you feeling right now?" 
                className="w-full bg-slate-100 dark:bg-white/5 rounded-3xl py-5 pl-8 pr-32 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-lg"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                 <button 
                  onClick={startSpeechRecognition}
                  className={cn(
                    "p-3 rounded-full transition-all",
                    isRecording ? "bg-red-500 text-white animate-pulse" : "bg-white dark:bg-zinc-800 text-slate-400 hover:text-primary"
                  )}
                 >
                    <Mic size={20} />
                 </button>
                 <button 
                  onClick={() => handleSendMessage()}
                  className="p-3 rounded-full mood-gradient text-white shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all"
                 >
                    <Send size={20} />
                 </button>
              </div>
           </div>
        </footer>
      </div>

      {/* Analysis Sidebar */}
      <div className="w-96 space-y-6">
        <AnimatePresence mode="wait">
          {selectedAnalysis ? (
            <motion.div 
              key={selectedAnalysis.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Emotion Spectrum */}
              <div className="glass p-8 rounded-[2.5rem] shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-lg flex items-center gap-2">
                    <Sparkles className="text-primary" size={20} />
                    Emotion Spectrum
                  </h4>
                  <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-widest">{selectedAnalysis.emotion}</span>
                </div>
                
                <div className="space-y-5">
                  {Object.entries(selectedAnalysis.spectrum || {}).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                        <span>{key}</span>
                        <span>{value}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                          transition={{ duration: 1 }}
                          className={cn(
                            "h-full rounded-full",
                            key === 'Anxious' && "bg-orange-400",
                            key === 'Sad' && "bg-blue-400",
                            key === 'Tired' && "bg-slate-400",
                            key === 'Energetic' && "bg-emerald-400",
                            key === 'Happy' && "bg-rose-400",
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* NLP Tokenization */}
              <div className="glass p-8 rounded-[2.5rem] shadow-sm space-y-6">
                <h4 className="font-bold text-lg flex items-center gap-2">
                  <BrainCircuit className="text-primary" size={20} />
                  NLP Tokenization
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAnalysis.tokens?.map((token, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-600 dark:text-zinc-300">
                      {token}
                    </span>
                  ))}
                </div>
              </div>

              {/* Keyword Extraction */}
              <div className="glass p-8 rounded-[2.5rem] shadow-sm space-y-6">
                 <h4 className="font-bold text-lg flex items-center gap-2">
                  <MessageSquare className="text-primary" size={20} />
                  Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAnalysis.keywords?.map((kw, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-xl mood-gradient text-white text-xs font-bold shadow-md">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-[500px] flex flex-col items-center justify-center text-center p-8 glass rounded-[2.5rem] space-y-4">
               <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary">
                  <Sparkles size={32} />
               </div>
               <p className="text-slate-400 font-medium">Select a message to see the detailed emotional analysis.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
