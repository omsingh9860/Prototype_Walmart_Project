import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, AreaChart, Area } from 'recharts';
import { Clock, Download, MapPin, ArrowLeft, Bell, TrendingUp, AlertTriangle, CheckCircle, Zap, Target, Brain, DollarSign, Package, Users, Star, Filter, Search, RefreshCw, Activity, Shield, Eye } from 'lucide-react';
import { events } from './data/data';
import EventCard from './components/EventCard'; 

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'];
const orderData = {
  totalOrders: 24567,
  returnedOrders: 1234,
  cancelledOrders: 567,
  orderGrowth: 8.5,
  returnRate: 5.02,
  cancelRate: 2.31
};

// Sample data structure matching your format


export default function Dashboard() {
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [darkMode, setDarkMode] = useState(true);

const returnReasons = [
              { name: 'Defective Product', value: 35, color: '#EF4444' },
              { name: 'Wrong Size/Color', value: 28, color: '#F59E0B' },
              { name: 'Damaged in Transit', value: 18, color: '#8B5CF6' },
              { name: 'Not as Described', value: 12, color: '#10B981' },
              { name: 'Changed Mind', value: 7, color: '#06B6D4' },
            ];

            const topReturnedProducts = [
              { name: 'Great Value Wireless Earbuds', returns: 245, cancellations: 89, aiPrediction: 'High Risk' },
              { name: 'Mainstays Bedsheet Set', returns: 198, cancellations: 134, aiPrediction: 'Medium Risk' },
              { name: 'Equate Vitamin D3', returns: 156, cancellations: 67, aiPrediction: 'Low Risk' },
              { name: 'Better Homes Garden Lamp', returns: 134, cancellations: 198, aiPrediction: 'High Risk' },
              { name: 'Great Value Protein Powder', returns: 123, cancellations: 45, aiPrediction: 'Low Risk' }
            ];

            const weeklyOrderTrends = [
              { week: 'Week 1', orders: 5200, returns: 260, cancellations: 104 },
              { week: 'Week 2', orders: 5450, returns: 272, cancellations: 109 },
              { week: 'Week 3', orders: 5678, returns: 284, cancellations: 125 },
              { week: 'Week 4', orders: 5890, returns: 295, cancellations: 118 },
              { week: 'Week 5', orders: 6100, returns: 305, cancellations: 122 },
              { week: 'Week 6', orders: 6234, returns: 312, cancellations: 137 }
            ];

            const aiPredictions = [
              { 
                product: 'Great Value Organic Honey', 
                orderVolume: 1200, 
                predictedReturns: 84, 
                predictedCancellations: 36,
                confidence: 89,
                reason: 'Seasonal demand decline + quality concerns'
              },
              { 
                product: 'Mainstays Coffee Maker', 
                orderVolume: 890, 
                predictedReturns: 125, 
                predictedCancellations: 67,
                confidence: 92,
                reason: 'High return rate pattern + defect reports'
              },
              { 
                product: 'Equate Hand Sanitizer', 
                orderVolume: 2100, 
                predictedReturns: 42, 
                predictedCancellations: 21,
                confidence: 85,
                reason: 'Low risk based on historical data'
              }
            ];

  const selectedEvent = events.find(ev => ev.id === selectedEventId);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate combined metrics
  const combinedDemandShift = events.reduce((acc, ev) => {
    Object.entries(ev.business_impact.demand_shift).forEach(([key, value]) => {
      acc[key] = (acc[key] || 0) + value;
    });
    return acc;
  }, {});

  const totalRevenueSaved = events.reduce((acc, ev) => acc + ev.business_impact.revenue_loss_avoided, 0);
  const totalStockoutsPrevented = events.reduce((acc, ev) => acc + ev.business_impact.stockout_prevented, 0);
  const avgUrgencyScore = events.reduce((acc, ev) => acc + ev.business_impact.urgency_score, 0) / events.length;

  // Filter events
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || event.event_type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const getUrgencyColor = (score) => {
    if (score >= 8) return 'text-red-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getUrgencyBg = (score) => {
    if (score >= 8) return 'bg-red-500/20 border-red-500/30';
    if (score >= 6) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-green-500/20 border-green-500/30';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white transition-all duration-300">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-blue-400 animate-pulse" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Walmart AI Regional Inventory Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-2 text-sm bg-gray-700 px-3 py-1 rounded-full">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-green-400">Live</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{currentTime.toLocaleTimeString()}</span>
            </div>
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              {notifications > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {notifications}
                </span>
              )}
            </div>
            <button 
              onClick={handleRefresh}
              className={`p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {selectedEventId === null ? (
          <>
            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events or regions..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Events</option>
                  <option value="Weather Alert">Weather Alerts</option>
                  <option value="Sports Event">Sports Events</option>
                  <option value="Festival">Festivals</option>
                </select>
              </div>
            </div>

            {/* Key Metrics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Revenue Saved</p>
                    <p className="text-2xl font-bold text-white">₹{(totalRevenueSaved / 1000000).toFixed(1)}M</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue-200" />
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-300 mr-1" />
                  <span className="text-green-300 text-sm">+12.5% from last week</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Stockouts Prevented</p>
                    <p className="text-2xl font-bold text-white">{totalStockoutsPrevented}</p>
                  </div>
                  <Package className="w-8 h-8 text-green-200" />
                </div>
                <div className="mt-4 flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-300 mr-1" />
                  <span className="text-green-300 text-sm">98% accuracy rate</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Avg Urgency Score</p>
                    <p className="text-2xl font-bold text-white">{avgUrgencyScore.toFixed(1)}/10</p>
                  </div>
                  <Zap className="w-8 h-8 text-purple-200" />
                </div>
                <div className="mt-4 flex items-center">
                  <AlertTriangle className="w-4 h-4 text-yellow-300 mr-1" />
                  <span className="text-yellow-300 text-sm">High priority alerts</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Active Events</p>
                    <p className="text-2xl font-bold text-white">{events.length}</p>
                  </div>
                  <Activity className="w-8 h-8 text-orange-200" />
                </div>
                <div className="mt-4 flex items-center">
                  <Eye className="w-4 h-4 text-orange-300 mr-1" />
                  <span className="text-orange-300 text-sm">Real-time monitoring</span>
                </div>
              </div>
            </div>

                        
            
        
            {/* Order Analytics Dashboard */}
            <div><h2 className="w-15 h-5 mr-2 text-purple-400" >Order Return and Cancellations</h2></div>
            <div className="mt-8 space-y-6">
              {/* Order Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-indigo-100 text-sm">Total Orders</p>
                      <p className="text-2xl font-bold text-white">{orderData.totalOrders.toLocaleString()}</p>
                    </div>
                    <Package className="w-8 h-8 text-indigo-200" />
                  </div>
                  <div className="mt-4 flex items-center">
                    <TrendingUp className="w-4 h-4 text-green-300 mr-1" />
                    <span className="text-green-300 text-sm">+{orderData.orderGrowth}% this month</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-600 to-red-700 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-100 text-sm">Returned Orders</p>
                      <p className="text-2xl font-bold text-white">{orderData.returnedOrders.toLocaleString()}</p>
                    </div>
                    <RefreshCw className="w-8 h-8 text-red-200" />
                  </div>
                  <div className="mt-4 flex items-center">
                    <AlertTriangle className="w-4 h-4 text-yellow-300 mr-1" />
                    <span className="text-yellow-300 text-sm">{orderData.returnRate}% return rate</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Cancelled Orders</p>
                      <p className="text-2xl font-bold text-white">{orderData.cancelledOrders.toLocaleString()}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-orange-200" />
                  </div>
                  <div className="mt-4 flex items-center">
                    <Shield className="w-4 h-4 text-orange-300 mr-1" />
                    <span className="text-orange-300 text-sm">{orderData.cancelRate}% cancel rate</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-100 text-sm">Success Rate</p>
                      <p className="text-2xl font-bold text-white">{(100 - orderData.returnRate - orderData.cancelRate).toFixed(1)}%</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-emerald-200" />
                  </div>
                  <div className="mt-4 flex items-center">
                    <Star className="w-4 h-4 text-emerald-300 mr-1" />
                    <span className="text-emerald-300 text-sm">Above target</span>
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Return Reasons Chart */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <RefreshCw className="w-5 h-5 mr-2 text-red-400" />
                    Return Reasons Analysis
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={returnReasons}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {returnReasons.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Weekly Trends */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
                    Weekly Order Trends
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weeklyOrderTrends}>
                      <XAxis dataKey="week" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                      <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }} 
                      />
                      <Line type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={3} animationDuration={13000000}  />
                      <Line type="monotone" dataKey="returns" stroke="#EF4444" strokeWidth={2} animationDuration={13000000} />
                      <Line type="monotone" dataKey="cancellations" stroke="#F59E0B" strokeWidth={2} animationDuration={13000000} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* AI Predictions Section */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-6 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-purple-400" />
                  AI Risk Predictions - Next 7 Days
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {aiPredictions.map((prediction, index) => (
                    <div key={index} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-white text-sm">{prediction.product}</h4>
                        <div className={`px-2 py-1 rounded text-xs ${
                          prediction.confidence >= 90 ? 'bg-green-500/20 text-green-400' :
                          prediction.confidence >= 80 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {prediction.confidence}% confidence
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-red-400">{prediction.predictedReturns}</div>
                          <div className="text-xs text-gray-400">Predicted Returns</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-orange-400">{prediction.predictedCancellations}</div>
                          <div className="text-xs text-gray-400">Predicted Cancellations</div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-300 mb-2">
                        <span className="font-medium">Order Volume:</span> {prediction.orderVolume.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-400 italic">
                        {prediction.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Returned Products Table */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-6 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
                  Top Returned Products This Month
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left py-3 px-4 text-gray-300">Product</th>
                        <th className="text-center py-3 px-4 text-gray-300">Returns</th>
                        <th className="text-center py-3 px-4 text-gray-300">Cancellations</th>
                        <th className="text-center py-3 px-4 text-gray-300">AI Risk Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topReturnedProducts.map((product, index) => (
                        <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/50">
                          <td className="py-3 px-4 text-white font-medium">{product.name}</td>
                          <td className="text-center py-3 px-4 text-red-400">{product.returns}</td>
                          <td className="text-center py-3 px-4 text-orange-400">{product.cancellations}</td>
                          <td className="text-center py-3 px-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                              product.aiPrediction === 'High Risk' ? 'bg-red-500/20 text-red-400' :
                              product.aiPrediction === 'Medium Risk' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {product.aiPrediction}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {filteredEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onViewDetails={() => setSelectedEventId(event.id)}
                  onShare={(ev) => console.log("Share clicked", ev)}
                  onBookmark={(ev) => console.log("Bookmark clicked", ev)}
                  isBookmarked={false} // or pass actual bookmark state
                />
              ))}
            </div>


            {/* Combined Analytics */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="font-bold text-xl mb-6 flex items-center">
                <Target className="w-6 h-6 mr-2 text-blue-400" />
                Combined Analytics Dashboard
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-lg mb-4 text-gray-300">Demand Shift Forecast</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={Object.entries(combinedDemandShift).map(([name, value]) => ({ name, value }))}>
                      <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                      <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }} 
                      />
                      <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-4 text-gray-300">Product Category Distribution</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={Object.entries(combinedDemandShift).map(([name, value]) => ({ name, value }))}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {Object.entries(combinedDemandShift).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#F9FAFB'
                          }} 
                          labelStyle={{ color: '#F9FAFB' }} 
                          itemStyle={{ color: '#F9FAFB' }}
                        />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Back Button */}
            <button 
              onClick={() => setSelectedEventId(null)} 
              className="mb-6 flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>

            {/* Event Details */}
            <div className="space-y-6">
              {/* Event Header */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedEvent.event}</h2>
                    <p className="text-gray-400 mb-4">{selectedEvent.gpt_output.quick_reason}</p>
                    <p className="text-gray-300">{selectedEvent.gpt_output.strategy}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-lg border ${getUrgencyBg(selectedEvent.business_impact.urgency_score)}`}>
                    <div className="text-center">
                      <div className="text-sm text-gray-400">Urgency</div>
                      <div className={`text-2xl font-bold ${getUrgencyColor(selectedEvent.business_impact.urgency_score)}`}>
                        {selectedEvent.business_impact.urgency_score}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2">✅ Stock Up</h4>
                    <div className="space-y-2">
                      {selectedEvent.gpt_output.stock_up.map((item, index) => (
                        <div key={index} className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm inline-block mr-2">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-400 mb-2">❌ Avoid</h4>
                    <div className="space-y-2">
                      {selectedEvent.gpt_output.avoid.map((item, index) => (
                        <div key={index} className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-sm inline-block mr-2">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Region & Weather Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                    Region Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400">Location:</span>
                      <span className="text-white ml-2">{selectedEvent.region}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Weather:</span>
                      <span className="text-white ml-2">{selectedEvent.weather.condition}, {selectedEvent.weather.temperature}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Forecast:</span>
                      <span className="text-white ml-2">{selectedEvent.weather.forecast}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Walmart Presence:</span>
                      <span className="text-white ml-2">{selectedEvent.region_info.walmart_presence}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Top Categories:</span>
                      <span className="text-white ml-2">{selectedEvent.region_info.top_categories.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                    Business Impact
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{selectedEvent.business_impact.stockout_prevented}</div>
                      <div className="text-sm text-gray-400">Stockouts Prevented</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">₹{(selectedEvent.business_impact.revenue_loss_avoided / 1000).toFixed(0)}K</div>
                      <div className="text-sm text-gray-400">Revenue Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{selectedEvent.business_impact.projected_growth_percent}%</div>
                      <div className="text-sm text-gray-400">Growth Forecast</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getUrgencyColor(selectedEvent.business_impact.urgency_score)}`}>
                        {selectedEvent.business_impact.urgency_score}/10
                      </div>
                      <div className="text-sm text-gray-400">Urgency Score</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-4">Demand Shift Analysis</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={Object.entries(selectedEvent.business_impact.demand_shift).map(([name, value]) => ({ name, value }))}>
                      <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                      <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }} 
                      />
                      <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-4">Product Focus Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={Object.entries(selectedEvent.business_impact.demand_shift).map(([name, value]) => ({ name, value }))}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {Object.entries(selectedEvent.business_impact.demand_shift).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}