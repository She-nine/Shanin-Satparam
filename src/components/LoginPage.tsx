import { Volume2, MessageSquare, Music, Heart, Eye, EyeOff, User as UserIcon, Mail, Lock } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [isRegistering, setIsRegistering] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-slate-50 dark:bg-zinc-950 transition-colors duration-500 overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Side Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-12"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl mood-gradient flex items-center justify-center text-white shadow-lg shadow-primary/25">
              <Volume2 size={36} />
            </div>
            <h1 className="text-4xl font-bold font-display text-primary tracking-tight">Moodify</h1>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-7xl font-bold font-display leading-[1.05] tracking-tight text-zinc-900 dark:text-white">
              Music that <span className="text-primary italic relative">feels<span className="absolute bottom-1 left-0 w-full h-2 bg-primary/20 -z-10" /></span> what you feel.
            </h2>
            <p className="text-slate-500 dark:text-zinc-400 text-xl leading-relaxed max-w-lg font-medium">
              Moodify reads your emotional state in real-time and curates the perfect soundtrack for the moment you're in.
            </p>
          </div>

          <div className="space-y-6 pt-4">
            {[
              { icon: MessageSquare, text: "AI-powered mood detection" },
              { icon: Music, text: "Millions of tracks, instantly matched" },
              { icon: Heart, text: "Build playlists for every feeling" }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-primary shadow-sm">
                  <feature.icon size={18} />
                </div>
                <span className="text-lg font-semibold text-slate-700 dark:text-zinc-300 tracking-tight">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          <p className="text-xs text-slate-400 dark:text-zinc-500 font-medium">
            © 2026 Moodify. All rights reserved.
          </p>
        </motion.div>

        {/* Right Side Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-[3rem] blur opacity-10" />
          <div className="bg-white dark:bg-zinc-900/60 backdrop-blur-3xl p-10 lg:p-14 rounded-[3rem] shadow-2xl border border-white dark:border-white/5 space-y-10 relative">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold font-display tracking-tight text-zinc-900 dark:text-white">
                {isRegistering ? 'Create account' : 'Welcome back'}
              </h3>
              <p className="text-slate-500 dark:text-zinc-400 font-medium">
                {isRegistering ? 'Start your emotional music journey today.' : 'Sign in to continue your sonic journey.'}
              </p>
            </div>

            <div className="space-y-5">
              {isRegistering && (
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 px-1">Full Name</label>
                  <div className="relative group">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                      type="text" 
                      placeholder="Alex Chen" 
                      className="w-full bg-slate-100 dark:bg-white/5 border-2 border-transparent focus:border-primary/20 dark:focus:border-primary/40 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-medium text-zinc-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 px-1">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                  <input 
                    type="email" 
                    placeholder="alex@example.com" 
                    className="w-full bg-slate-100 dark:bg-white/5 border-2 border-transparent focus:border-primary/20 dark:focus:border-primary/40 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-medium text-zinc-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 px-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="At least 8 characters" 
                    className="w-full bg-slate-100 dark:bg-white/5 border-2 border-transparent focus:border-primary/20 dark:focus:border-primary/40 rounded-2xl py-4 pl-12 pr-12 outline-none transition-all font-medium text-zinc-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600"
                  />
                  <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                className="w-full mood-gradient text-white py-4.5 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                {isRegistering ? 'Create Account' : 'Sign In'}
                <motion.span 
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >→</motion.span>
              </button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-[#0c0c0d] px-4 text-slate-400 font-bold tracking-widest">or</span>
                </div>
              </div>

              <button 
                onClick={onLogin}
                className="w-full bg-white dark:bg-white/5 border-2 border-slate-100 dark:border-white/10 text-slate-700 dark:text-white py-4 rounded-2xl font-bold text-lg shadow-sm hover:border-slate-200 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-3 group"
              >
                <div className="w-6 h-6 flex items-center justify-center bg-white rounded-full p-1 shadow-sm">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </div>
                Continue with Google
              </button>
            </div>

            <p className="text-center text-xs text-slate-400 font-medium">
              By signing up, you agree to our <span className="text-primary font-bold hover:underline cursor-pointer">Terms</span> and <span className="text-primary font-bold hover:underline cursor-pointer">Privacy Policy</span>.
            </p>

            <div className="text-center pt-2">
              <p className="text-sm font-medium text-slate-600 dark:text-zinc-400">
                {isRegistering ? 'Already have an account?' : 'New to Moodify?'} 
                <button 
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="text-primary font-bold hover:underline ml-2"
                >
                  {isRegistering ? 'Sign in' : 'Create an account'}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
