import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Brain, TrendingUp, Calendar, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function PricePredictor() {
  const [timeframe, setTimeframe] = useState('7days');
  
  const predictions = {
    '7days': [
      { date: 'Dec 10', actual: 22.50, predicted: 22.50, confidence: 95 },
      { date: 'Dec 11', predicted: 22.75, confidence: 92 },
      { date: 'Dec 12', predicted: 23.10, confidence: 88 },
      { date: 'Dec 13', predicted: 23.45, confidence: 85 },
      { date: 'Dec 14', predicted: 23.60, confidence: 82 },
      { date: 'Dec 15', predicted: 23.40, confidence: 78 },
      { date: 'Dec 16', predicted: 23.20, confidence: 75 },
    ],
    '14days': [
      { date: 'Dec 10', actual: 22.50, predicted: 22.50, confidence: 95 },
      { date: 'Dec 12', predicted: 23.10, confidence: 88 },
      { date: 'Dec 14', predicted: 23.60, confidence: 82 },
      { date: 'Dec 16', predicted: 23.20, confidence: 75 },
      { date: 'Dec 18', predicted: 22.80, confidence: 68 },
      { date: 'Dec 20', predicted: 22.50, confidence: 62 },
      { date: 'Dec 22', predicted: 22.90, confidence: 58 },
      { date: 'Dec 24', predicted: 24.50, confidence: 55 },
    ],
    '30days': [
      { date: 'Week 1', actual: 22.50, predicted: 22.50, confidence: 95 },
      { date: 'Week 2', predicted: 23.40, confidence: 80 },
      { date: 'Week 3', predicted: 22.80, confidence: 65 },
      { date: 'Week 4', predicted: 24.20, confidence: 50 },
    ],
  };

  const currentData = predictions[timeframe as keyof typeof predictions];
  const avgPredicted = currentData.reduce((sum, d) => sum + d.predicted, 0) / currentData.length;
  const maxPrice = Math.max(...currentData.map(d => d.predicted));
  const minPrice = Math.min(...currentData.map(d => d.predicted));

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
            <Brain className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl">AI Price Predictor</h2>
            <p className="text-purple-100 mt-1">Advanced machine learning forecasting</p>
          </div>
        </div>
      </motion.div>

      {/* Timeframe Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl text-gray-900">Forecast Period</h3>
          <div className="flex gap-2">
            {[
              { value: '7days', label: '7 Days' },
              { value: '14days', label: '14 Days' },
              { value: '30days', label: '30 Days' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setTimeframe(option.value)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  timeframe === option.value
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Prediction Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <p className="text-sm text-green-700">Predicted High</p>
            </div>
            <p className="text-3xl text-green-900">₱{maxPrice.toFixed(2)}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <p className="text-sm text-blue-700">Average Price</p>
            </div>
            <p className="text-3xl text-blue-900">₱{avgPredicted.toFixed(2)}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-orange-600" />
              <p className="text-sm text-orange-700">Predicted Low</p>
            </div>
            <p className="text-3xl text-orange-900">₱{minPrice.toFixed(2)}</p>
          </div>
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={currentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis domain={[20, 26]} stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="#10b981" 
              strokeWidth={3}
              name="Actual Price"
              dot={{ fill: '#10b981', r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              strokeDasharray="5 5"
              name="Predicted Price"
              dot={{ fill: '#8b5cf6', r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-xl mb-4 text-gray-900">AI Analysis & Recommendations</h3>
        <div className="space-y-4">
          <div className="flex gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="bg-purple-100 p-3 rounded-lg h-fit">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h4 className="text-purple-900 mb-1">Price Trend Prediction</h4>
              <p className="text-purple-700 text-sm">Based on historical data and market patterns, prices are expected to rise by 4.9% over the next week, peaking on December 14th at ₱23.60/kg.</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="bg-green-100 p-3 rounded-lg h-fit">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="text-green-900 mb-1">Optimal Selling Window</h4>
              <p className="text-green-700 text-sm">The best time to sell is between December 13-15, when prices are forecasted to be at their highest. Consider holding inventory if storage conditions permit.</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="bg-blue-100 p-3 rounded-lg h-fit">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="text-blue-900 mb-1">Confidence Level</h4>
              <p className="text-blue-700 text-sm">Our AI model has 85% confidence in the 7-day forecast. Predictions are based on weather patterns, market demand, supply data, and historical price movements.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
