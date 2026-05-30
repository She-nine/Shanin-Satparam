import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { PricePredictor } from './components/PricePredictor';
import { MarketAnalysis } from './components/MarketAnalysis';
import { OptimalTiming } from './components/OptimalTiming';
import { LossCalculator } from './components/LossCalculator';
import { PostHarvestLoss } from './components/PostHarvestLoss';
import { WeatherImpact } from './components/WeatherImpact';
import { TodaysInsights } from './components/TodaysInsights';

import {
  BarChart3,
  TrendingUp,
  Calendar,
  Calculator,
  Wheat,
  CloudRain,
  Lightbulb
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'predictor', label: 'Price Predictor', icon: TrendingUp },
    { id: 'analysis', label: 'Market Analysis', icon: BarChart3 },
    { id: 'timing', label: 'Optimal Timing', icon: Calendar },
    { id: 'loss', label: 'Loss Calculator', icon: Calculator },
    { id: 'harvest', label: 'Post-Harvest Loss', icon: Wheat },
    { id: 'weather', label: 'Weather Impact', icon: CloudRain },
    { id: 'insights', label: "Today's Insights", icon: Lightbulb },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-white border-b border-green-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2.5 rounded-xl shadow-lg">
                <Wheat className="w-7 h-7 text-white" />
              </div>

              <div>
                <h1 className="text-green-900">
                  AI Rice Market Advisory
                </h1>

                <p className="text-sm text-green-600">
                  Albay Region - Smart Farming Insights
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>

              <span className="text-sm text-green-700">
                Live Market Data
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-green-100 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />

                  <span className="text-sm">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'predictor' && <PricePredictor />}
        {activeTab === 'analysis' && <MarketAnalysis />}
        {activeTab === 'timing' && <OptimalTiming />}
        {activeTab === 'loss' && <LossCalculator />}
        {activeTab === 'harvest' && <PostHarvestLoss />}
        {activeTab === 'weather' && <WeatherImpact />}
        {activeTab === 'insights' && <TodaysInsights />}
      </main>
    </div>
  );
}