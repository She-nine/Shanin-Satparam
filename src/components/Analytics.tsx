import { User } from 'firebase/auth';
import { BarChart3, TrendingUp, PieChart, Activity, Calendar, Download } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart as RePieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function Analytics({ user }: { user: User }) {
  const moodData = [
    { day: 'Mon', Happy: 40, Focus: 24, Energetic: 30 },
    { day: 'Tue', Happy: 30, Focus: 40, Energetic: 45 },
    { day: 'Wed', Happy: 60, Focus: 30, Energetic: 25 },
    { day: 'Thu', Happy: 45, Focus: 50, Energetic: 35 },
    { day: 'Fri', Happy: 55, Focus: 45, Energetic: 60 },
    { day: 'Sat', Happy: 80, Focus: 20, Energetic: 70 },
    { day: 'Sun', Happy: 70, Focus: 15, Energetic: 50 },
  ];

  const distribution = [
    { name: 'Happy', value: 35, color: '#FF3BFF' },
    { name: 'Focus', value: 25, color: '#00D1FF' },
    { name: 'Energetic', value: 20, color: '#FFB800' },
    { name: 'Calm', value: 15, color: '#10B981' },
    { name: 'Sad', value: 5, color: '#94A3B8' },
  ];

  const activityData = [
    { time: '8AM', count: 12 },
    { time: '10AM', count: 28 },
    { time: '12PM', count: 45 },
    { time: '2PM', count: 32 },
    { time: '4PM', count: 58 },
    { time: '6PM', count: 75 },
    { time: '8PM', count: 92 },
    { time: '10PM', count: 64 },
  ];

  return (
    <div className="space-y-10 pb-10">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-primary shadow-sm">
             <BarChart3 size={28} />
          </div>
          <div>
             <h2 className="text-3xl font-bold font-display tracking-tight">Mood Analytics</h2>
             <p className="text-slate-500 dark:text-zinc-400 font-medium">Insights into your emotional harmony.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 font-bold text-sm shadow-sm transition-all hover:bg-slate-50">
             <Calendar size={18} />
             Last 7 Days
          </button>
          <button className="p-2.5 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all">
             <Download size={20} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass p-8 rounded-[2.5rem] space-y-6">
           <div className="flex justify-between items-start">
              <div>
                 <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Emotional Vitality</p>
                 <h4 className="text-4xl font-bold font-display mt-1">84<span className="text-slate-300 text-lg">/100</span></h4>
              </div>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center gap-1 text-[10px] font-bold">
                 <TrendingUp size={12} />
                 +5%
              </div>
           </div>
           <p className="text-slate-500 text-sm font-medium">Your mood has been increasingly positive this week compared to last week.</p>
        </div>

        <div className="glass p-8 rounded-[2.5rem] space-y-6">
           <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Dominant State</p>
              <h4 className="text-4xl font-bold font-display mt-1 text-primary">Happy</h4>
              <p className="text-slate-500 text-sm font-medium mt-2">35% of your listening time matches this mood.</p>
           </div>
        </div>

        <div className="glass p-8 rounded-[2.5rem] space-y-6">
           <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Mood Shifts</p>
              <h4 className="text-4xl font-bold font-display mt-1">12</h4>
              <p className="text-slate-500 text-sm font-medium mt-2">Detected transitions between emotional states this week.</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="glass p-8 rounded-[2.5rem] space-y-8">
           <h3 className="text-xl font-bold font-display flex items-center gap-2">
              <TrendingUp className="text-primary" />
              Weekly Mood Trends
           </h3>
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94A3B8' }} />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                      labelStyle={{ fontWeight: 'bold', color: '#0F172A' }}
                    />
                    <Line type="monotone" dataKey="Happy" stroke="#FF3BFF" strokeWidth={4} dot={false} />
                    <Line type="monotone" dataKey="Focus" stroke="#00D1FF" strokeWidth={4} dot={false} />
                    <Line type="monotone" dataKey="Energetic" stroke="#FFB800" strokeWidth={4} dot={false} />
                 </LineChart>
              </ResponsiveContainer>
           </div>
           <div className="flex justify-center gap-6">
              {['Happy', 'Focus', 'Energetic'].map((mood, i) => (
                 <div key={i} className="flex items-center gap-2">
                    <div className={cn(
                      "w-3 h-3 rounded-full",
                      mood === 'Happy' ? "bg-[#FF3BFF]" : mood === 'Focus' ? "bg-[#00D1FF]" : "bg-[#FFB800]"
                    )} />
                    <span className="text-xs font-bold text-slate-500">{mood}</span>
                 </div>
              ))}
           </div>
        </section>

        <section className="glass p-8 rounded-[2.5rem] space-y-8">
           <h3 className="text-xl font-bold font-display flex items-center gap-2">
              <PieChart className="text-secondary" />
              Emotion Distribution
           </h3>
           <div className="h-[300px] w-full flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                 <RePieChart>
                    <Pie
                      data={distribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {distribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                 </RePieChart>
              </ResponsiveContainer>
              <div className="w-1/3 space-y-4">
                 {distribution.map((d, i) => (
                    <div key={i} className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                          <span className="text-xs font-medium text-slate-500">{d.name}</span>
                       </div>
                       <span className="text-xs font-bold">{d.value}%</span>
                    </div>
                 ))}
              </div>
           </div>
        </section>
      </div>

      <section className="glass p-8 rounded-[3rem] space-y-8">
         <h3 className="text-xl font-bold font-display flex items-center gap-2">
            <Activity className="text-accent" />
            Listening Activity by Time
         </h3>
         <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={activityData}>
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94A3B8' }} />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                  <Bar dataKey="count" radius={[10, 10, 10, 10]}>
                    {activityData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={`url(#barGradient)`} />
                    ))}
                  </Bar>
                  <defs>
                     <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF3BFF" />
                        <stop offset="100%" stopColor="#00D1FF" />
                     </linearGradient>
                  </defs>
               </BarChart>
            </ResponsiveContainer>
         </div>
      </section>
    </div>
  );
}
