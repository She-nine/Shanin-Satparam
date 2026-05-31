import { Calendar, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function OptimalTiming() {
  const sellingWindows = [
    {
      period: 'This Week (Dec 10-16)',
      recommendation: 'Sell Now - Excellent',
      price: '₱22.50 - ₱23.60',
      confidence: 92,
      reason: 'Rising demand, favorable weather, peak market activity',
      color: 'green'
    },
    {
      period: 'Next Week (Dec 17-23)',
      recommendation: 'Hold - Good',
      price: '₱22.80 - ₱23.20',
      confidence: 78,
      reason: 'Moderate demand, stable prices expected',
      color: 'blue'
    },
    {
      period: 'Week of Dec 24-30',
      recommendation: 'Sell - Very Good',
      price: '₱24.00 - ₱25.50',
      confidence: 68,
      reason: 'Holiday season peak demand, prices expected to surge',
      color: 'green'
    },
    {
      period: 'Early January',
      recommendation: 'Wait - Fair',
      price: '₱21.50 - ₱22.50',
      confidence: 55,
      reason: 'Post-holiday drop expected, lower buying activity',
      color: 'orange'
    },
  ];

  const dailyRecommendations = [
    { day: 'Monday', activity: 'High', avgPrice: '₱22.80', status: 'Good to sell' },
    { day: 'Tuesday', activity: 'Very High', avgPrice: '₱23.10', status: 'Best day' },
    { day: 'Wednesday', activity: 'High', avgPrice: '₱22.90', status: 'Good to sell' },
    { day: 'Thursday', activity: 'Medium', avgPrice: '₱22.50', status: 'Average' },
    { day: 'Friday', activity: 'High', avgPrice: '₱23.00', status: 'Good to sell' },
    { day: 'Saturday', activity: 'Very High', avgPrice: '₱23.20', status: 'Best day' },
    { day: 'Sunday', activity: 'Low', avgPrice: '₱22.20', status: 'Avoid' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-6 text-white shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
            <Calendar className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl">Optimal Timing</h2>
            <p className="text-emerald-100 mt-1">Find the best selling windows to maximize profit</p>
          </div>
        </div>
      </motion.div>

      {/* Current Recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-xl"
      >
        <div className="flex items-start gap-4">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <p className="text-green-100 text-sm">Current Recommendation</p>
            <h3 className="text-3xl mt-1">SELL NOW</h3>
            <p className="text-green-100 mt-2">Market conditions are favorable. Prices are expected to rise 4.9% this week before stabilizing.</p>
            <div className="flex gap-4 mt-4">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="text-green-100 text-sm">Best Time</p>
                <p className="text-white">Dec 13-15</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="text-green-100 text-sm">Expected Price</p>
                <p className="text-white">₱23.40-₱23.60</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="text-green-100 text-sm">Confidence</p>
                <p className="text-white">92%</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Selling Windows */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-xl mb-4 text-gray-900">Weekly Selling Windows</h3>
        <div className="space-y-4">
          {sellingWindows.map((window, index) => (
            <div
              key={index}
              className={`p-5 rounded-xl border-2 ${
                window.color === 'green' ? 'bg-green-50 border-green-300' :
                window.color === 'blue' ? 'bg-blue-50 border-blue-300' :
                'bg-orange-50 border-orange-300'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className={`${
                    window.color === 'green' ? 'text-green-900' :
                    window.color === 'blue' ? 'text-blue-900' :
                    'text-orange-900'
                  }`}>
                    {window.period}
                  </h4>
                  <p className={`text-sm mt-1 ${
                    window.color === 'green' ? 'text-green-700' :
                    window.color === 'blue' ? 'text-blue-700' :
                    'text-orange-700'
                  }`}>
                    {window.recommendation}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-lg ${
                  window.color === 'green' ? 'bg-green-200 text-green-800' :
                  window.color === 'blue' ? 'bg-blue-200 text-blue-800' :
                  'bg-orange-200 text-orange-800'
                }`}>
                  {window.confidence}% confident
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className={`text-sm ${
                    window.color === 'green' ? 'text-green-600' :
                    window.color === 'blue' ? 'text-blue-600' :
                    'text-orange-600'
                  }`}>
                    Expected Price Range
                  </p>
                  <p className={`text-xl ${
                    window.color === 'green' ? 'text-green-900' :
                    window.color === 'blue' ? 'text-blue-900' :
                    'text-orange-900'
                  }`}>
                    {window.price}
                  </p>
                </div>
                <div>
                  <p className={`text-sm ${
                    window.color === 'green' ? 'text-green-600' :
                    window.color === 'blue' ? 'text-blue-600' :
                    'text-orange-600'
                  }`}>
                    Reason
                  </p>
                  <p className={`text-sm ${
                    window.color === 'green' ? 'text-green-800' :
                    window.color === 'blue' ? 'text-blue-800' :
                    'text-orange-800'
                  }`}>
                    {window.reason}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Daily Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-6 h-6 text-gray-700" />
          <h3 className="text-xl text-gray-900">Best Days to Sell</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
          {dailyRecommendations.map((day, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${
                day.status === 'Best day' ? 'bg-green-50 border-green-300' :
                day.status === 'Good to sell' ? 'bg-blue-50 border-blue-300' :
                day.status === 'Average' ? 'bg-gray-50 border-gray-300' :
                'bg-red-50 border-red-300'
              }`}
            >
              <p className="text-gray-900 text-sm mb-2">{day.day}</p>
              <p className={`text-xs mb-1 ${
                day.status === 'Best day' ? 'text-green-700' :
                day.status === 'Good to sell' ? 'text-blue-700' :
                day.status === 'Average' ? 'text-gray-700' :
                'text-red-700'
              }`}>
                {day.activity} Activity
              </p>
              <p className="text-gray-900">{day.avgPrice}</p>
              <p className={`text-xs mt-2 ${
                day.status === 'Best day' ? 'text-green-800' :
                day.status === 'Good to sell' ? 'text-blue-800' :
                day.status === 'Average' ? 'text-gray-800' :
                'text-red-800'
              }`}>
                {day.status}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl text-gray-900">Timing Tips</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-900 mb-2">🌅 Early Morning Sales</p>
            <p className="text-blue-700 text-sm">Markets are most active 6-9 AM. Early sellers often get better prices.</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-purple-900 mb-2">📅 Avoid Mondays</p>
            <p className="text-purple-700 text-sm">Weekend carryover creates lower demand on Mondays.</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-green-900 mb-2">🎄 Holiday Premium</p>
            <p className="text-green-700 text-sm">Prices surge 10-15% during Christmas and New Year weeks.</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-orange-900 mb-2">🌧️ Weather Watch</p>
            <p className="text-orange-700 text-sm">Rainy days reduce buyer turnout. Check weather before transport.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
