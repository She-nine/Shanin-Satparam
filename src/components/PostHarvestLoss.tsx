import { useState } from 'react';
import { Wheat, Package, Thermometer, Droplets, Bug, Wind } from 'lucide-react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export function PostHarvestLoss() {
  const [harvestAmount, setHarvestAmount] = useState('2000');
  const [storageType, setStorageType] = useState('warehouse');
  const [storageDays, setStorageDays] = useState('30');
  const [temperature, setTemperature] = useState('25');
  const [humidity, setHumidity] = useState('65');

  const calculateLoss = () => {
    const amount = parseFloat(harvestAmount) || 0;
    const days = parseFloat(storageDays) || 0;
    const temp = parseFloat(temperature) || 25;
    const humid = parseFloat(humidity) || 65;

    // Loss factors
    let baseLoss = 0;
    if (storageType === 'warehouse') baseLoss = 1.5;
    else if (storageType === 'silo') baseLoss = 0.8;
    else if (storageType === 'outdoor') baseLoss = 4.0;
    else baseLoss = 3.0; // bags

    // Temperature factor (ideal: 15-20°C)
    const tempFactor = temp > 30 ? 1.5 : temp > 25 ? 1.2 : 1.0;
    
    // Humidity factor (ideal: 60-65%)
    const humidFactor = humid > 80 ? 1.8 : humid > 70 ? 1.3 : humid < 50 ? 1.2 : 1.0;

    // Time factor
    const timeFactor = days / 30;

    const totalLossPercent = baseLoss * tempFactor * humidFactor * timeFactor;
    const lossAmount = (amount * totalLossPercent) / 100;
    const remainingAmount = amount - lossAmount;

    return {
      lossPercent: totalLossPercent.toFixed(2),
      lossAmount: lossAmount.toFixed(2),
      remainingAmount: remainingAmount.toFixed(2),
      moistureLoss: (lossAmount * 0.4).toFixed(2),
      pestLoss: (lossAmount * 0.3).toFixed(2),
      spillageLoss: (lossAmount * 0.2).toFixed(2),
      qualityLoss: (lossAmount * 0.1).toFixed(2),
    };
  };

  const results = calculateLoss();

  const lossBreakdown = [
    { name: 'Moisture', value: parseFloat(results.moistureLoss), color: '#3b82f6' },
    { name: 'Pest', value: parseFloat(results.pestLoss), color: '#ef4444' },
    { name: 'Spillage', value: parseFloat(results.spillageLoss), color: '#f59e0b' },
    { name: 'Quality', value: parseFloat(results.qualityLoss), color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
            <Wheat className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl">Post-Harvest Loss Calculator</h2>
            <p className="text-amber-100 mt-1">Estimate and prevent storage losses</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-xl mb-4 text-gray-900">Storage Parameters</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Harvest Amount (kg)</label>
              <input
                type="number"
                value={harvestAmount}
                onChange={(e) => setHarvestAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                placeholder="Total harvest in kg"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Storage Type</label>
              <select
                value={storageType}
                onChange={(e) => setStorageType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
              >
                <option value="warehouse">Modern Warehouse</option>
                <option value="silo">Grain Silo</option>
                <option value="bags">Traditional Bags</option>
                <option value="outdoor">Outdoor Storage</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Storage Duration (days)</label>
              <input
                type="number"
                value={storageDays}
                onChange={(e) => setStorageDays(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                placeholder="Days in storage"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Temperature (°C)</label>
              <div className="flex items-center gap-3">
                <Thermometer className="w-5 h-5 text-gray-500" />
                <input
                  type="number"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                  placeholder="Storage temperature"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Ideal: 15-20°C</p>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Humidity (%)</label>
              <div className="flex items-center gap-3">
                <Droplets className="w-5 h-5 text-gray-500" />
                <input
                  type="number"
                  value={humidity}
                  onChange={(e) => setHumidity(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                  placeholder="Relative humidity"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Ideal: 60-65%</p>
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {/* Loss Summary */}
          <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-xl p-6 shadow-lg text-white">
            <h3 className="text-xl mb-4">Estimated Loss</h3>
            <div className="text-5xl mb-2">{results.lossPercent}%</div>
            <p className="text-red-100 mb-4">{results.lossAmount} kg out of {harvestAmount} kg</p>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-red-100 text-sm">Remaining Quantity</p>
              <p className="text-3xl mt-1">{results.remainingAmount} kg</p>
            </div>
          </div>

          {/* Loss Breakdown Chart */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl mb-4 text-gray-900">Loss Breakdown</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={lossBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {lossBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {lossBreakdown.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}: {item.value.toFixed(2)} kg</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Prevention Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-xl mb-4 text-gray-900">Loss Prevention Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-5 h-5 text-blue-600" />
              <h4 className="text-blue-900">Moisture Control</h4>
            </div>
            <p className="text-blue-700 text-sm">Keep rice at 13-14% moisture content. Use dehumidifiers if needed.</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <Bug className="w-5 h-5 text-red-600" />
              <h4 className="text-red-900">Pest Management</h4>
            </div>
            <p className="text-red-700 text-sm">Regular inspection and fumigation. Keep storage clean and sealed.</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="w-5 h-5 text-orange-600" />
              <h4 className="text-orange-900">Temperature</h4>
            </div>
            <p className="text-orange-700 text-sm">Maintain 15-20°C. Avoid direct sunlight and heat sources.</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Wind className="w-5 h-5 text-green-600" />
              <h4 className="text-green-900">Ventilation</h4>
            </div>
            <p className="text-green-700 text-sm">Ensure proper air circulation to prevent mold and moisture buildup.</p>
          </div>
        </div>
      </motion.div>

      {/* Storage Quality Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-xl mb-4 text-gray-900">Current Storage Conditions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg border-2 ${
            parseFloat(temperature) <= 20 ? 'bg-green-50 border-green-300' :
            parseFloat(temperature) <= 25 ? 'bg-yellow-50 border-yellow-300' :
            'bg-red-50 border-red-300'
          }`}>
            <h4 className={`mb-2 ${
              parseFloat(temperature) <= 20 ? 'text-green-900' :
              parseFloat(temperature) <= 25 ? 'text-yellow-900' :
              'text-red-900'
            }`}>
              Temperature
            </h4>
            <p className={`${
              parseFloat(temperature) <= 20 ? 'text-green-700' :
              parseFloat(temperature) <= 25 ? 'text-yellow-700' :
              'text-red-700'
            }`}>
              {parseFloat(temperature) <= 20 ? '✓ Optimal' :
               parseFloat(temperature) <= 25 ? '⚠ Acceptable' :
               '✗ Too High'}
            </p>
          </div>
          <div className={`p-4 rounded-lg border-2 ${
            parseFloat(humidity) >= 60 && parseFloat(humidity) <= 65 ? 'bg-green-50 border-green-300' :
            parseFloat(humidity) >= 50 && parseFloat(humidity) <= 70 ? 'bg-yellow-50 border-yellow-300' :
            'bg-red-50 border-red-300'
          }`}>
            <h4 className={`mb-2 ${
              parseFloat(humidity) >= 60 && parseFloat(humidity) <= 65 ? 'text-green-900' :
              parseFloat(humidity) >= 50 && parseFloat(humidity) <= 70 ? 'text-yellow-900' :
              'text-red-900'
            }`}>
              Humidity
            </h4>
            <p className={`${
              parseFloat(humidity) >= 60 && parseFloat(humidity) <= 65 ? 'text-green-700' :
              parseFloat(humidity) >= 50 && parseFloat(humidity) <= 70 ? 'text-yellow-700' :
              'text-red-700'
            }`}>
              {parseFloat(humidity) >= 60 && parseFloat(humidity) <= 65 ? '✓ Optimal' :
               parseFloat(humidity) >= 50 && parseFloat(humidity) <= 70 ? '⚠ Acceptable' :
               '✗ Out of Range'}
            </p>
          </div>
          <div className={`p-4 rounded-lg border-2 ${
            storageType === 'silo' ? 'bg-green-50 border-green-300' :
            storageType === 'warehouse' ? 'bg-blue-50 border-blue-300' :
            storageType === 'bags' ? 'bg-yellow-50 border-yellow-300' :
            'bg-red-50 border-red-300'
          }`}>
            <h4 className={`mb-2 ${
              storageType === 'silo' ? 'text-green-900' :
              storageType === 'warehouse' ? 'text-blue-900' :
              storageType === 'bags' ? 'text-yellow-900' :
              'text-red-900'
            }`}>
              Storage Type
            </h4>
            <p className={`${
              storageType === 'silo' ? 'text-green-700' :
              storageType === 'warehouse' ? 'text-blue-700' :
              storageType === 'bags' ? 'text-yellow-700' :
              'text-red-700'
            }`}>
              {storageType === 'silo' ? '✓ Best' :
               storageType === 'warehouse' ? '✓ Good' :
               storageType === 'bags' ? '⚠ Fair' :
               '✗ Poor'}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
