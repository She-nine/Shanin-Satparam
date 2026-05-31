import { useState } from 'react';
import { Calculator, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function LossCalculator() {
  const [quantity, setQuantity] = useState('1000');
  const [buyPrice, setBuyPrice] = useState('22.00');
  const [sellPrice, setSellPrice] = useState('22.50');
  const [storageDays, setStorageDays] = useState('7');
  const [qualityLoss, setQualityLoss] = useState('2');

  const calculateResults = () => {
    const qty = parseFloat(quantity) || 0;
    const buy = parseFloat(buyPrice) || 0;
    const sell = parseFloat(sellPrice) || 0;
    const days = parseFloat(storageDays) || 0;
    const loss = parseFloat(qualityLoss) || 0;

    const storageCostPerDay = 0.05; // ₱0.05 per kg per day
    const totalStorageCost = qty * storageCostPerDay * days;
    
    const lossQty = (qty * loss) / 100;
    const salableQty = qty - lossQty;
    
    const totalCost = (qty * buy) + totalStorageCost;
    const totalRevenue = salableQty * sell;
    const netProfit = totalRevenue - totalCost;
    const profitMargin = (netProfit / totalCost) * 100;

    return {
      totalCost: totalCost.toFixed(2),
      totalRevenue: totalRevenue.toFixed(2),
      netProfit: netProfit.toFixed(2),
      profitMargin: profitMargin.toFixed(2),
      storageCost: totalStorageCost.toFixed(2),
      lossQty: lossQty.toFixed(2),
      salableQty: salableQty.toFixed(2),
      isProfit: netProfit > 0
    };
  };

  const results = calculateResults();

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
            <Calculator className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl">Loss Calculator</h2>
            <p className="text-orange-100 mt-1">Calculate and minimize your losses</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-xl mb-4 text-gray-900">Input Your Data</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Quantity (kg)</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
                placeholder="Enter quantity in kg"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Buy Price (₱/kg)</label>
              <input
                type="number"
                step="0.01"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
                placeholder="Your purchase price"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Expected Sell Price (₱/kg)</label>
              <input
                type="number"
                step="0.01"
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
                placeholder="Expected selling price"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Storage Days</label>
              <input
                type="number"
                value={storageDays}
                onChange={(e) => setStorageDays(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
                placeholder="Days in storage"
              />
              <p className="text-xs text-gray-500 mt-1">Storage cost: ₱0.05 per kg per day</p>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Quality Loss (%)</label>
              <input
                type="number"
                step="0.1"
                value={qualityLoss}
                onChange={(e) => setQualityLoss(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
                placeholder="Expected quality loss percentage"
              />
              <p className="text-xs text-gray-500 mt-1">Average: 2-5% for proper storage</p>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {/* Profit/Loss Summary */}
          <div className={`rounded-xl p-6 shadow-lg ${
            results.isProfit 
              ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
              : 'bg-gradient-to-br from-red-500 to-rose-600'
          } text-white`}>
            <div className="flex items-center gap-3 mb-4">
              {results.isProfit ? (
                <CheckCircle className="w-8 h-8" />
              ) : (
                <AlertTriangle className="w-8 h-8" />
              )}
              <div>
                <p className="text-sm opacity-90">Net Result</p>
                <h3 className="text-3xl">
                  {results.isProfit ? 'Profit' : 'Loss'}
                </h3>
              </div>
            </div>
            <div className="text-5xl mb-2">₱{Math.abs(parseFloat(results.netProfit)).toFixed(2)}</div>
            <p className="opacity-90">Profit Margin: {results.profitMargin}%</p>
          </div>

          {/* Detailed Breakdown */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl mb-4 text-gray-900">Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Total Cost</span>
                <span className="text-gray-900">₱{results.totalCost}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Storage Cost</span>
                <span className="text-red-600">-₱{results.storageCost}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Quality Loss</span>
                <span className="text-red-600">-{results.lossQty} kg</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Salable Quantity</span>
                <span className="text-green-600">{results.salableQty} kg</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-blue-900">Total Revenue</span>
                <span className="text-blue-900">₱{results.totalRevenue}</span>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl mb-4 text-gray-900">Recommendations</h3>
            {parseFloat(results.profitMargin) > 5 ? (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-900 mb-2">✓ Good profit margin</p>
                <p className="text-green-700 text-sm">Your current strategy is profitable. Consider selling during peak price windows for even better margins.</p>
              </div>
            ) : parseFloat(results.profitMargin) > 0 ? (
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-yellow-900 mb-2">⚠ Low profit margin</p>
                <p className="text-yellow-700 text-sm">Profit margin is low. Consider reducing storage time or waiting for better market prices.</p>
              </div>
            ) : (
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-900 mb-2">✗ Loss situation</p>
                <p className="text-red-700 text-sm">Current parameters result in a loss. Consider selling immediately or improving storage conditions to reduce quality loss.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
