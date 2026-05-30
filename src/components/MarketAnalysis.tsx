import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Users, TrendingUp, Package } from 'lucide-react';
import { motion } from 'motion/react';

export function MarketAnalysis() {
  const supplyData = [
    { month: 'Jun', supply: 850, demand: 920 },
    { month: 'Jul', supply: 900, demand: 880 },
    { month: 'Aug', supply: 920, demand: 950 },
    { month: 'Sep', supply: 880, demand: 910 },
    { month: 'Oct', supply: 950, demand: 980 },
    { month: 'Nov', supply: 1000, demand: 1050 },
    { month: 'Dec', supply: 1100, demand: 1200 },
  ];

  const marketShare = [
    { name: 'Legazpi City', value: 35, color: '#10b981' },
    { name: 'Libon', value: 25, color: '#8b5cf6' },
    { name: 'Tabaco', value: 20, color: '#f59e0b' },
    { name: 'Ligao', value: 12, color: '#3b82f6' },
    { name: 'Others', value: 8, color: '#6b7280' },
  ];

  const varietyPrices = [
    { variety: 'Jasmine', price: 24.50, demand: 'Very High' },
    { variety: 'Dinorado', price: 28.00, demand: 'High' },
    { variety: 'Sinandomeng', price: 22.50, demand: 'Very High' },
    { variety: 'RC160', price: 20.00, demand: 'Medium' },
    { variety: 'Angelica', price: 23.00, demand: 'High' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl">Market Analysis</h2>
            <p className="text-blue-100 mt-1">Real-time market insights and trends</p>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Market Activity', value: 'High', icon: Activity, color: 'green', detail: 'Active trading' },
          { label: 'Total Buyers', value: '342', icon: Users, color: 'blue', detail: '+12 today' },
          { label: 'Price Volatility', value: 'Low', icon: TrendingUp, color: 'purple', detail: '±1.2%' },
          { label: 'Stock Level', value: '1,245T', icon: Package, color: 'orange', detail: '82% capacity' },
        ].map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-5 shadow-lg border border-gray-100"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="text-gray-500 text-sm">{metric.label}</p>
                <div className={`p-2 rounded-lg ${
                  metric.color === 'green' ? 'bg-green-100' :
                  metric.color === 'blue' ? 'bg-blue-100' :
                  metric.color === 'purple' ? 'bg-purple-100' :
                  'bg-orange-100'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    metric.color === 'green' ? 'text-green-600' :
                    metric.color === 'blue' ? 'text-blue-600' :
                    metric.color === 'purple' ? 'text-purple-600' :
                    'text-orange-600'
                  }`} />
                </div>
              </div>
              <p className="text-2xl text-gray-900">{metric.value}</p>
              <p className="text-sm text-gray-500 mt-1">{metric.detail}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Supply vs Demand Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-xl mb-4 text-gray-900">Supply vs Demand Trend (tons)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={supplyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            />
            <Bar dataKey="supply" fill="#10b981" radius={[8, 8, 0, 0]} name="Supply" />
            <Bar dataKey="demand" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Demand" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-amber-800 text-sm">
            <strong>Insight:</strong> Demand exceeds supply by 9.1% this month. Prices are likely to remain elevated. Consider selling now if you have inventory.
          </p>
        </div>
      </motion.div>

      {/* Market Share & Variety Prices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Share */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-xl mb-4 text-gray-900">Market Share by Location</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={marketShare}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {marketShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {marketShare.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Rice Variety Prices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-xl mb-4 text-gray-900">Price by Rice Variety</h3>
          <div className="space-y-3">
            {varietyPrices.map((variety, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                  <p className="text-gray-900">{variety.variety}</p>
                  <span className={`inline-block text-xs px-2 py-1 rounded mt-1 ${
                    variety.demand === 'Very High' ? 'bg-red-100 text-red-700' :
                    variety.demand === 'High' ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {variety.demand} Demand
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xl text-gray-900">₱{variety.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">per kg</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
