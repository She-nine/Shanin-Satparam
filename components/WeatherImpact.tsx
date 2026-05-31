import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function WeatherImpact() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const currentWeather = {
    temp: 28,
    condition: 'Partly Cloudy',
    humidity: 72,
    windSpeed: 15,
    rainfall: 0,
    icon: Cloud
  };

  const weeklyForecast = [
    { day: 'Today\nDec 10', condition: 'Partly Cloudy', temp: 28, rain: 10, impact: 'Low', icon: Cloud, color: 'blue' },
    { day: 'Thu\nDec 11', condition: 'Sunny', temp: 30, rain: 0, impact: 'None', icon: Sun, color: 'yellow' },
    { day: 'Fri\nDec 12', condition: 'Light Rain', temp: 26, rain: 40, impact: 'Medium', icon: CloudRain, color: 'blue' },
    { day: 'Sat\nDec 13', condition: 'Heavy Rain', temp: 24, rain: 80, impact: 'High', icon: CloudRain, color: 'red' },
    { day: 'Sun\nDec 14', condition: 'Rain', temp: 25, rain: 60, impact: 'High', icon: CloudRain, color: 'orange' },
    { day: 'Mon\nDec 15', condition: 'Cloudy', temp: 27, rain: 20, impact: 'Low', icon: Cloud, color: 'blue' },
    { day: 'Tue\nDec 16', condition: 'Sunny', temp: 29, rain: 5, impact: 'None', icon: Sun, color: 'yellow' },
  ];

  const priceImpact = [
    { date: 'Dec 10', price: 22.50, weather: 'Cloudy' },
    { date: 'Dec 11', price: 22.75, weather: 'Sunny' },
    { date: 'Dec 12', price: 23.20, weather: 'Light Rain' },
    { date: 'Dec 13', price: 24.10, weather: 'Heavy Rain' },
    { date: 'Dec 14', price: 23.80, weather: 'Rain' },
    { date: 'Dec 15', price: 23.30, weather: 'Cloudy' },
    { date: 'Dec 16', price: 22.90, weather: 'Sunny' },
  ];

  const WeatherIcon = currentWeather.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
            <CloudRain className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl">Weather Impact Analysis</h2>
            <p className="text-cyan-100 mt-1">7-day forecast and market impact predictions</p>
          </div>
        </div>
      </motion.div>

      {/* Current Weather */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl text-gray-900">Current Weather - Albay</h3>
          <p className="text-sm text-gray-500">
            Updated: {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-4">
              <WeatherIcon className="w-16 h-16" />
              <div>
                <div className="text-5xl">{currentWeather.temp}°C</div>
                <p className="text-blue-100 mt-2">{currentWeather.condition}</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-5 h-5 text-blue-600" />
              <p className="text-sm text-blue-700">Humidity</p>
            </div>
            <p className="text-2xl text-blue-900">{currentWeather.humidity}%</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Wind className="w-5 h-5 text-green-600" />
              <p className="text-sm text-green-700">Wind Speed</p>
            </div>
            <p className="text-2xl text-green-900">{currentWeather.windSpeed} km/h</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <CloudRain className="w-5 h-5 text-purple-600" />
              <p className="text-sm text-purple-700">Rainfall</p>
            </div>
            <p className="text-2xl text-purple-900">{currentWeather.rainfall} mm</p>
          </div>
        </div>
      </motion.div>

      {/* 7-Day Forecast */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-xl mb-4 text-gray-900">7-Day Weather Forecast</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {weeklyForecast.map((day, index) => {
            const Icon = day.icon;
            return (
              <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow">
                <p className="text-sm text-gray-600 text-center mb-2 whitespace-pre-line">{day.day}</p>
                <div className="flex justify-center mb-2">
                  <Icon className={`w-10 h-10 ${
                    day.color === 'yellow' ? 'text-yellow-500' :
                    day.color === 'blue' ? 'text-blue-500' :
                    day.color === 'orange' ? 'text-orange-500' :
                    'text-red-500'
                  }`} />
                </div>
                <p className="text-2xl text-center text-gray-900 mb-1">{day.temp}°C</p>
                <p className="text-xs text-center text-gray-600 mb-2">{day.condition}</p>
                <div className="flex items-center justify-center gap-1">
                  <CloudRain className="w-3 h-3 text-blue-500" />
                  <p className="text-xs text-blue-600">{day.rain}%</p>
                </div>
                <div className={`mt-2 px-2 py-1 rounded text-xs text-center ${
                  day.impact === 'None' ? 'bg-green-100 text-green-700' :
                  day.impact === 'Low' ? 'bg-blue-100 text-blue-700' :
                  day.impact === 'Medium' ? 'bg-orange-100 text-orange-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {day.impact} Impact
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Weather Impact on Prices */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-xl mb-4 text-gray-900">Weather Impact on Rice Prices</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={priceImpact}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis domain={[22, 25]} stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-800 text-sm">
            <strong>Analysis:</strong> Heavy rainfall on Dec 13-14 is expected to disrupt transportation and reduce market activity, causing prices to spike by 7.1%. Prices will normalize as weather clears.
          </p>
        </div>
      </motion.div>

      {/* Weather Alerts & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
            <h3 className="text-xl text-gray-900">Weather Alerts</h3>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <CloudRain className="w-5 h-5 text-red-600" />
                <p className="text-red-900">Heavy Rainfall Warning</p>
              </div>
              <p className="text-red-700 text-sm">Expected on Dec 13-14. Transport delays likely. Plan deliveries accordingly.</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <Wind className="w-5 h-5 text-yellow-600" />
                <p className="text-yellow-900">Strong Winds Advisory</p>
              </div>
              <p className="text-yellow-700 text-sm">Wind speeds up to 25 km/h on Dec 12. Secure outdoor storage.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-5 h-5 text-blue-600" />
                <p className="text-blue-900">High Humidity Notice</p>
              </div>
              <p className="text-blue-700 text-sm">Humidity above 70%. Monitor storage conditions to prevent moisture damage.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-xl mb-4 text-gray-900">Weather-Based Recommendations</h3>
          <div className="space-y-3">
            <div className="flex gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <TrendingUp className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <h4 className="text-green-900 mb-1">Sell Before Rain</h4>
                <p className="text-green-700 text-sm">Heavy rain forecasted Dec 13-14. Consider selling Dec 11-12 to avoid transport issues and capitalize on pre-rain price surge.</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Droplets className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="text-blue-900 mb-1">Storage Protection</h4>
                <p className="text-blue-700 text-sm">High humidity expected. Ensure proper ventilation and use moisture absorbers in storage areas.</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <TrendingDown className="w-6 h-6 text-purple-600 flex-shrink-0" />
              <div>
                <h4 className="text-purple-900 mb-1">Post-Rain Opportunity</h4>
                <p className="text-purple-700 text-sm">After Dec 15, weather clears and prices normalize. Good time to buy if you need inventory.</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <Sun className="w-6 h-6 text-orange-600 flex-shrink-0" />
              <div>
                <h4 className="text-orange-900 mb-1">Optimal Transport Days</h4>
                <p className="text-orange-700 text-sm">Best weather for transport: Dec 11 and Dec 16. Plan bulk deliveries on these days.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
