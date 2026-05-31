import { TrendingUp, TrendingDown, MapPin, AlertTriangle, Activity, DollarSign, Users, Package } from 'lucide-react';
import { motion } from 'motion/react';

export function TodaysInsights() {
  const marketActivity = {
    status: 'High Activity',
    priceStatus: 'Moderate Prices',
    statusColor: 'green',
    description: 'Rice prices are currently at moderate levels with high buyer activity. Market conditions are favorable for selling.',
    currentPrice: 22.50,
    avgPrice: 22.15,
    difference: 1.6
  };

  const priceTrend = {
    direction: 'Rising',
    percentage: 2.3,
    forecast: 'Upward',
    trendColor: 'green',
    description: 'Prices have increased by 2.3% today and are expected to continue rising over the next 3-5 days.',
  };

  const bestBuyers = [
    { location: 'Libon Public Market', price: 23.50, volume: 'High', demand: 'Very High', distance: '0 km' },
    { location: 'Legazpi City Market', price: 22.80, volume: 'Very High', demand: 'High', distance: '15 km' },
    { location: 'Tabaco Market', price: 22.20, volume: 'Medium', demand: 'Medium', distance: '25 km' },
  ];

  const storageRisk = {
    level: 'Medium',
    color: 'yellow',
    factors: [
      { factor: 'Temperature', status: 'Good', risk: 'Low' },
      { factor: 'Humidity', status: 'Moderate', risk: 'Medium' },
      { factor: 'Pest Activity', status: 'Low', risk: 'Low' },
      { factor: 'Weather Forecast', status: 'Rain Expected', risk: 'High' },
    ],
    recommendation: 'Monitor humidity levels closely. Rain expected in 3 days may increase moisture risk.'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl">Today's Insights</h2>
            <p className="text-indigo-100 mt-1">December 10, 2025 - Real-time market intelligence</p>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Current Price', value: '₱22.50', change: '+2.3%', icon: DollarSign, color: 'green' },
          { label: 'Market Activity', value: 'High', change: 'Active', icon: Activity, color: 'blue' },
          { label: 'Active Buyers', value: '342', change: '+12 today', icon: Users, color: 'purple' },
          { label: 'Storage Risk', value: 'Medium', change: 'Monitor', icon: AlertTriangle, color: 'yellow' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-5 shadow-lg border border-gray-100"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <div className={`p-2 rounded-lg ${
                  stat.color === 'green' ? 'bg-green-100' :
                  stat.color === 'blue' ? 'bg-blue-100' :
                  stat.color === 'purple' ? 'bg-purple-100' :
                  'bg-yellow-100'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'purple' ? 'text-purple-600' :
                    'text-yellow-600'
                  }`} />
                </div>
              </div>
              <p className="text-2xl text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Market Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-3 rounded-xl ${
            marketActivity.statusColor === 'green' ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <Activity className={`w-6 h-6 ${
              marketActivity.statusColor === 'green' ? 'text-green-600' : 'text-red-600'
            }`} />
          </div>
          <div>
            <h3 className="text-xl text-gray-900">Market Activity</h3>
            <p className={`text-sm ${
              marketActivity.statusColor === 'green' ? 'text-green-600' : 'text-red-600'
            }`}>
              {marketActivity.status} • {marketActivity.priceStatus}
            </p>
          </div>
        </div>
        <p className="text-gray-700 mb-4">{marketActivity.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700 mb-1">Current Price</p>
            <p className="text-2xl text-blue-900">₱{marketActivity.currentPrice.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-700 mb-1">Weekly Average</p>
            <p className="text-2xl text-green-900">₱{marketActivity.avgPrice.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-700 mb-1">Above Average</p>
            <p className="text-2xl text-purple-900">+{marketActivity.difference}%</p>
          </div>
        </div>
      </motion.div>

      {/* Price Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-3 rounded-xl ${
            priceTrend.trendColor === 'green' ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {priceTrend.direction === 'Rising' ? (
              <TrendingUp className="w-6 h-6 text-green-600" />
            ) : (
              <TrendingDown className="w-6 h-6 text-red-600" />
            )}
          </div>
          <div>
            <h3 className="text-xl text-gray-900">Price Trend</h3>
            <p className={`text-sm ${
              priceTrend.trendColor === 'green' ? 'text-green-600' : 'text-red-600'
            }`}>
              {priceTrend.direction} • {priceTrend.forecast} Forecast
            </p>
          </div>
        </div>
        <p className="text-gray-700 mb-4">{priceTrend.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-5 rounded-lg border-2 ${
            priceTrend.trendColor === 'green' ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {priceTrend.direction === 'Rising' ? (
                <TrendingUp className="w-5 h-5 text-green-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-600" />
              )}
              <p className={`${
                priceTrend.trendColor === 'green' ? 'text-green-900' : 'text-red-900'
              }`}>
                Today's Movement
              </p>
            </div>
            <p className={`text-3xl ${
              priceTrend.trendColor === 'green' ? 'text-green-900' : 'text-red-900'
            }`}>
              +{priceTrend.percentage}%
            </p>
            <p className={`text-sm mt-1 ${
              priceTrend.trendColor === 'green' ? 'text-green-700' : 'text-red-700'
            }`}>
              Positive trend
            </p>
          </div>
          <div className="p-5 bg-blue-50 rounded-lg border-2 border-blue-300">
            <p className="text-blue-900 mb-2">📈 Action Recommendation</p>
            <p className="text-blue-700 text-sm">
              {priceTrend.direction === 'Rising' 
                ? 'Hold inventory if possible. Prices are expected to rise further. Best selling window: Dec 13-15.'
                : 'Consider selling now before prices drop further. Market demand is weakening.'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Best Buyers in Albay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-orange-100 rounded-xl">
            <MapPin className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h3 className="text-xl text-gray-900">Best Buyers in Albay</h3>
            <p className="text-sm text-gray-600">Highest paying markets today</p>
          </div>
        </div>
        <div className="space-y-3">
          {bestBuyers.map((buyer, index) => (
            <div
              key={index}
              className={`p-5 rounded-xl border-2 ${
                index === 0 ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-300' :
                'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-5 h-5 ${index === 0 ? 'text-orange-600' : 'text-gray-600'}`} />
                    <h4 className={`${index === 0 ? 'text-orange-900' : 'text-gray-900'}`}>
                      {buyer.location}
                    </h4>
                    {index === 0 && (
                      <span className="px-2 py-1 bg-orange-200 text-orange-800 text-xs rounded">
                        Best Price
                      </span>
                    )}
                  </div>
                  <p className={`text-sm mt-1 ${index === 0 ? 'text-orange-700' : 'text-gray-600'}`}>
                    Distance from Libon: {buyer.distance}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl ${index === 0 ? 'text-orange-900' : 'text-gray-900'}`}>
                    ₱{buyer.price.toFixed(2)}
                  </p>
                  <p className={`text-sm ${index === 0 ? 'text-orange-700' : 'text-gray-600'}`}>per kg</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-2 rounded-lg ${index === 0 ? 'bg-orange-100' : 'bg-gray-100'}`}>
                  <p className={`text-xs ${index === 0 ? 'text-orange-700' : 'text-gray-600'}`}>Volume</p>
                  <p className={`text-sm ${index === 0 ? 'text-orange-900' : 'text-gray-900'}`}>{buyer.volume}</p>
                </div>
                <div className={`p-2 rounded-lg ${index === 0 ? 'bg-orange-100' : 'bg-gray-100'}`}>
                  <p className={`text-xs ${index === 0 ? 'text-orange-700' : 'text-gray-600'}`}>Demand</p>
                  <p className={`text-sm ${index === 0 ? 'text-orange-900' : 'text-gray-900'}`}>{buyer.demand}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-800 text-sm">
            <strong>💡 Tip:</strong> Libon Public Market offers the best price today at ₱23.50/kg, which is 4.4% above the regional average. High demand makes it the optimal selling location.
          </p>
        </div>
      </motion.div>

      {/* Storage Risk */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-3 rounded-xl ${
            storageRisk.color === 'green' ? 'bg-green-100' :
            storageRisk.color === 'yellow' ? 'bg-yellow-100' :
            'bg-red-100'
          }`}>
            <AlertTriangle className={`w-6 h-6 ${
              storageRisk.color === 'green' ? 'text-green-600' :
              storageRisk.color === 'yellow' ? 'text-yellow-600' :
              'text-red-600'
            }`} />
          </div>
          <div>
            <h3 className="text-xl text-gray-900">Storage Risk Level</h3>
            <p className={`text-sm ${
              storageRisk.color === 'green' ? 'text-green-600' :
              storageRisk.color === 'yellow' ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {storageRisk.level} Risk
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {storageRisk.factors.map((factor, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${
                factor.risk === 'Low' ? 'bg-green-50 border-green-200' :
                factor.risk === 'Medium' ? 'bg-yellow-50 border-yellow-200' :
                'bg-red-50 border-red-200'
              }`}
            >
              <p className={`text-sm mb-1 ${
                factor.risk === 'Low' ? 'text-green-700' :
                factor.risk === 'Medium' ? 'text-yellow-700' :
                'text-red-700'
              }`}>
                {factor.factor}
              </p>
              <p className={`mb-2 ${
                factor.risk === 'Low' ? 'text-green-900' :
                factor.risk === 'Medium' ? 'text-yellow-900' :
                'text-red-900'
              }`}>
                {factor.status}
              </p>
              <span className={`text-xs px-2 py-1 rounded ${
                factor.risk === 'Low' ? 'bg-green-200 text-green-800' :
                factor.risk === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                'bg-red-200 text-red-800'
              }`}>
                {factor.risk} Risk
              </span>
            </div>
          ))}
        </div>
        <div className={`p-4 rounded-lg border-2 ${
          storageRisk.color === 'green' ? 'bg-green-50 border-green-200' :
          storageRisk.color === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
          'bg-red-50 border-red-200'
        }`}>
          <p className={`${
            storageRisk.color === 'green' ? 'text-green-900' :
            storageRisk.color === 'yellow' ? 'text-yellow-900' :
            'text-red-900'
          }`}>
            <strong>Recommendation:</strong> {storageRisk.recommendation}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
