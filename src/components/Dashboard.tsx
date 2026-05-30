import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';

export function Dashboard() {
  const [currentPrice, setCurrentPrice] = useState(22.50);
  const [priceData, setPriceData] = useState([
    { time: '6:00', price: 22.10 },
    { time: '8:00', price: 22.30 },
    { time: '10:00', price: 22.45 },
    { time: '12:00', price: 22.50 },
    { time: '14:00', price: 22.55 },
    { time: '16:00', price: 22.50 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const variation = (Math.random() - 0.5) * 0.1;
      setCurrentPrice(prev => Math.max(20, Math.min(25, prev + variation)));
      
      setPriceData(prev => {
        const newData = [...prev];
        newData.shift();
        const now = new Date();
        const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        newData.push({ time: timeStr, price: Math.max(20, Math.min(25, prev[prev.length - 1].price + variation)) });
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      label: 'Current Price',
      value: `₱${currentPrice.toFixed(2)}`,
      change: '+2.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      label: 'Weekly Average',
      value: '₱22.15',
      change: '+1.8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'blue'
    },
    {
      label: 'Market Volume',
      value: '1,245 tons',
      change: '-5.2%',
      trend: 'down',
      icon: TrendingDown,
      color: 'orange'
    },
    {
      label: 'Storage Alert',
      value: 'Medium Risk',
      change: 'Moderate',
      trend: 'neutral',
      icon: AlertTriangle,
      color: 'yellow'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Live Price Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm">Real-Time Rice Price (per kg)</p>
            <h2 className="text-5xl mt-2">₱{currentPrice.toFixed(2)}</h2>
            <p className="text-green-100 mt-2">Last updated: just now</p>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
            <TrendingUp className="w-5 h-5" />
            <span>+2.3% today</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <h3 className="text-2xl mt-2 text-gray-900">{stat.value}</h3>
                  <p className={`text-sm mt-2 ${
                    stat.trend === 'up' ? 'text-green-600' : 
                    stat.trend === 'down' ? 'text-red-600' : 
                    'text-yellow-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${
                  stat.color === 'green' ? 'bg-green-100' :
                  stat.color === 'blue' ? 'bg-blue-100' :
                  stat.color === 'orange' ? 'bg-orange-100' :
                  'bg-yellow-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'orange' ? 'text-orange-600' :
                    'text-yellow-600'
                  }`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Live Price Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-xl mb-4 text-gray-900">Live Price Movement</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={priceData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="time" stroke="#9ca3af" />
            <YAxis domain={[20, 25]} stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#10b981" 
              strokeWidth={3}
              fill="url(#colorPrice)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Regional Prices */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-xl mb-4 text-gray-900">Albay Regional Prices</h3>
        <div className="space-y-3">
          {[
            { location: 'Libon Public Market', price: 23.50, trend: 'up', volume: 'High' },
            { location: 'Legazpi City Market', price: 22.80, trend: 'up', volume: 'Very High' },
            { location: 'Tabaco Market', price: 22.20, trend: 'down', volume: 'Medium' },
            { location: 'Ligao City Market', price: 22.50, trend: 'neutral', volume: 'Medium' },
            { location: 'Polangui Market', price: 21.90, trend: 'down', volume: 'Low' },
          ].map((market, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-1">
                <p className="text-gray-900">{market.location}</p>
                <p className="text-sm text-gray-500">Volume: {market.volume}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xl text-gray-900">₱{market.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">per kg</p>
                </div>
                {market.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-600" />}
                {market.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-600" />}
                {market.trend === 'neutral' && <div className="w-5 h-0.5 bg-gray-400"></div>}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
