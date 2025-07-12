import React, { useState } from "react";
import { MapPin, Cloud, Sun, CloudRain, Snowflake, Wind, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Users, DollarSign, Package, Zap, Star, ChevronDown, ChevronUp, Eye, Share2, Bookmark, MoreHorizontal, Box, BarChart3, Activity } from "lucide-react";

export default function EventCard({ event, onViewDetails, onShare, onBookmark, isBookmarked = false, darkMode = true }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const { event: title, region, event_type, weather, gpt_output, region_info, business_impact } = event;

  // Theme classes
  const theme = {
    card: darkMode ? 'bg-gray-900 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300',
    text: {
      primary: darkMode ? 'text-white' : 'text-gray-900',
      secondary: darkMode ? 'text-gray-300' : 'text-gray-600',
      muted: darkMode ? 'text-gray-400' : 'text-gray-500'
    },
    bg: {
      primary: darkMode ? 'bg-gray-900' : 'bg-white',
      secondary: darkMode ? 'bg-gray-800' : 'bg-gray-50',
      tertiary: darkMode ? 'bg-gray-700' : 'bg-gray-100'
    },
    button: darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600',
    border: darkMode ? 'border-gray-700' : 'border-gray-200'
  };

  // Get weather icon based on condition
  const getWeatherIcon = (condition) => {
    const icons = {
      'sunny': <Sun className="w-4 h-4 text-yellow-500" />,
      'clear': <Sun className="w-4 h-4 text-yellow-500" />,
      'cloudy': <Cloud className="w-4 h-4 text-gray-500" />,
      'rain': <CloudRain className="w-4 h-4 text-blue-500" />,
      'heavy rain': <CloudRain className="w-4 h-4 text-blue-600" />,
      'thunderstorm': <CloudRain className="w-4 h-4 text-purple-600" />,
      'snow': <Snowflake className="w-4 h-4 text-blue-300" />,
      'windy': <Wind className="w-4 h-4 text-gray-600" />,
      'hot': <Sun className="w-4 h-4 text-orange-500" />,
      'humid': <Cloud className="w-4 h-4 text-cyan-500" />,
      'partly cloudy': <Cloud className="w-4 h-4 text-gray-400" />
    };
    return icons[condition.toLowerCase()] || <Cloud className="w-4 h-4 text-gray-500" />;
  };

  // Get urgency color and styling
  const getUrgencyStyle = (score) => {
    if (score >= 8) return {
      bg: 'bg-red-500',
      text: 'text-red-400',
      bgLight: darkMode ? 'bg-red-900/30' : 'bg-red-50',
      border: darkMode ? 'border-red-800' : 'border-red-200',
      pulse: 'animate-pulse'
    };
    if (score >= 6) return {
      bg: 'bg-yellow-500',
      text: 'text-yellow-400',
      bgLight: darkMode ? 'bg-yellow-900/30' : 'bg-yellow-50',
      border: darkMode ? 'border-yellow-800' : 'border-yellow-200',
      pulse: ''
    };
    return {
      bg: 'bg-green-500',
      text: 'text-green-400',
      bgLight: darkMode ? 'bg-green-900/30' : 'bg-green-50',
      border: darkMode ? 'border-green-800' : 'border-green-200',
      pulse: ''
    };
  };

  const urgencyStyle = getUrgencyStyle(business_impact.urgency_score);

  // Get event type styling
  const getEventTypeStyle = (type) => {
    const styles = {
      'Weather Alert': darkMode ? 'bg-blue-900/50 text-blue-300 border-blue-800' : 'bg-blue-100 text-blue-800 border-blue-200',
      'Sports Event': darkMode ? 'bg-purple-900/50 text-purple-300 border-purple-800' : 'bg-purple-100 text-purple-800 border-purple-200',
      'Festival': darkMode ? 'bg-orange-900/50 text-orange-300 border-orange-800' : 'bg-orange-100 text-orange-800 border-orange-200',
      'Economic Event': darkMode ? 'bg-green-900/50 text-green-300 border-green-800' : 'bg-green-100 text-green-800 border-green-200',
      'Emergency': darkMode ? 'bg-red-900/50 text-red-300 border-red-800' : 'bg-red-100 text-red-800 border-red-200',
      'Seasonal Trend': darkMode ? 'bg-cyan-900/50 text-cyan-300 border-cyan-800' : 'bg-cyan-100 text-cyan-800 border-cyan-200',
      'Procurement Opportunity': darkMode ? 'bg-indigo-900/50 text-indigo-300 border-indigo-800' : 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Historical Trend': darkMode ? 'bg-pink-900/50 text-pink-300 border-pink-800' : 'bg-pink-100 text-pink-800 border-pink-200'
    };
    return styles[type] || (darkMode ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-gray-100 text-gray-800 border-gray-200');
  };

  // Calculate inventory status
  const getInventoryStatus = (currentStock, demandIncrease) => {
    const ratio = (currentStock / demandIncrease) * 100;
    if (ratio >= 80) return { status: 'Good', color: 'text-green-500', bg: darkMode ? 'bg-green-900/30' : 'bg-green-50' };
    if (ratio >= 50) return { status: 'Fair', color: 'text-yellow-500', bg: darkMode ? 'bg-yellow-900/30' : 'bg-yellow-50' };
    return { status: 'Low', color: 'text-red-500', bg: darkMode ? 'bg-red-900/30' : 'bg-red-50' };
  };

  // Calculate time ago (mock implementation)
  const getTimeAgo = () => {
    const hours = 3;
    return `${hours}h ago`;
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-6`}>
      <div 
        className={`shadow-2xl rounded-2xl border transition-all duration-300 hover:shadow-3xl overflow-hidden ${theme.card} ${
          isHovered ? 'transform scale-[1.02]' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className={`text-xl font-bold line-clamp-1 ${theme.text.primary}`}>{title}</h2>
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getEventTypeStyle(event_type)}`}>
                  {event_type}
                </div>
              </div>
              <div className={`flex items-center gap-4 text-sm ${theme.text.secondary}`}>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{region}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{getTimeAgo()}</span>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => onBookmark && onBookmark(event)}
                className={`p-2 rounded-full transition-colors ${
                  isBookmarked ? 'bg-yellow-500/20 text-yellow-400' : theme.button
                }`}
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <button
                onClick={() => onShare && onShare(event)}
                className={`p-2 rounded-full transition-colors ${theme.button}`}
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button className={`p-2 rounded-full transition-colors ${theme.button}`}>
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weather Info */}
          <div className={`flex items-center gap-4 mb-4 p-3 rounded-lg ${theme.bg.secondary}`}>
            <div className="flex items-center gap-2">
              {getWeatherIcon(weather.condition)}
              <span className={`font-medium ${theme.text.primary}`}>{weather.condition}</span>
              <span className={theme.text.secondary}>{weather.temperature}</span>
            </div>
            <div className={`text-sm flex-1 ${theme.text.secondary}`}>
              {weather.forecast}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className={`p-4 rounded-lg border ${darkMode ? 'bg-green-900/30 border-green-800' : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'}`}>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                <span className={`text-sm font-medium ${darkMode ? 'text-green-300' : 'text-green-800'}`}>Revenue Impact</span>
              </div>
              <div className={`text-2xl font-bold ${darkMode ? 'text-green-200' : 'text-green-900'}`}>
                ₹{(business_impact.revenue_loss_avoided / 1000).toFixed(0)}K
              </div>
              <div className={`flex items-center gap-1 text-sm ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                <TrendingUp className="w-4 h-4" />
                <span>{business_impact.projected_growth_percent}% growth</span>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg border ${urgencyStyle.bgLight} ${urgencyStyle.border}`}>
              <div className="flex items-center gap-2 mb-2">
                <Zap className={`w-5 h-5 ${urgencyStyle.text} ${urgencyStyle.pulse}`} />
                <span className={`text-sm font-medium ${urgencyStyle.text}`}>Urgency Score</span>
              </div>
              <div className={`text-2xl font-bold ${urgencyStyle.text}`}>
                {business_impact.urgency_score}/10
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Package className={`w-4 h-4 ${urgencyStyle.text}`} />
                <span className={urgencyStyle.text}>{business_impact.stockout_prevented} stockouts prevented</span>
              </div>
            </div>
          </div>

          {/* Inventory Status Overview */}
          <div className={`p-4 rounded-lg border mb-4 ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center gap-2 mb-3">
              <Box className={`w-5 h-5 ${theme.text.primary}`} />
              <h4 className={`font-semibold ${theme.text.primary}`}>Inventory Status</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(business_impact.current_inventory).slice(0, 4).map(([item, stock]) => {
                const demand = business_impact.demand_shift[item] || 0;
                const inventoryStatus = getInventoryStatus(stock, demand);
                const ratio = demand > 0 ? (stock / demand) * 100 : 100;
                
                return (
                  <div key={item} className={`p-3 rounded-lg ${inventoryStatus.bg}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${theme.text.primary}`}>{item}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${inventoryStatus.color} ${inventoryStatus.bg}`}>
                        {inventoryStatus.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Package className="w-3 h-3" />
                        <span className={theme.text.secondary}>{stock} units</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        <span className={theme.text.secondary}>+{demand}%</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            ratio >= 80 ? 'bg-green-500' : ratio >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(ratio, 100)}%` }}
                        />
                      </div>
                      <div className={`text-xs mt-1 ${theme.text.muted}`}>
                        {ratio.toFixed(0)}% coverage
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Reason */}
          <div className={`rounded-lg p-4 mb-4 ${darkMode ? 'bg-blue-900/30 border-blue-800' : 'bg-blue-50 border-blue-200'} border`}>
            <div className="flex items-start gap-2">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <p className={`font-medium mb-1 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>AI Analysis</p>
                <p className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>{gpt_output.quick_reason}</p>
              </div>
            </div>
          </div>

          {/* Stock Recommendations */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <h4 className={`font-semibold flex items-center gap-2 ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                <CheckCircle className="w-4 h-4" />
                Stock Up
              </h4>
              <div className="space-y-1">
                {gpt_output.stock_up.slice(0, 3).map((item, i) => (
                  <div key={i} className={`px-3 py-1 rounded-full text-sm font-medium inline-block mr-2 mb-1 ${
                    darkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800'
                  }`}>
                    {item}
                  </div>
                ))}
                {gpt_output.stock_up.length > 3 && (
                  <div className={`text-xs ${theme.text.muted}`}>+{gpt_output.stock_up.length - 3} more</div>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className={`font-semibold flex items-center gap-2 ${darkMode ? 'text-red-400' : 'text-red-700'}`}>
                <AlertTriangle className="w-4 h-4" />
                Avoid
              </h4>
              <div className="space-y-1">
                {gpt_output.avoid.slice(0, 3).map((item, i) => (
                  <div key={i} className={`px-3 py-1 rounded-full text-sm font-medium inline-block mr-2 mb-1 ${
                    darkMode ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-800'
                  }`}>
                    {item}
                  </div>
                ))}
                {gpt_output.avoid.length > 3 && (
                  <div className={`text-xs ${theme.text.muted}`}>+{gpt_output.avoid.length - 3} more</div>
                )}
              </div>
            </div>
          </div>

          {/* Expandable Details */}
          <div className={`border-t pt-4 ${theme.border}`}>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex items-center justify-between w-full p-2 rounded-lg transition-colors ${theme.bg.secondary} hover:${theme.bg.tertiary}`}
            >
              <span className={`font-medium ${theme.text.primary}`}>
                {isExpanded ? 'Hide Details' : 'Show More Details'}
              </span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {isExpanded && (
              <div className="mt-4 space-y-4 animate-fadeIn">
                {/* Complete Inventory Analysis */}
                <div className={`p-4 rounded-lg ${theme.bg.secondary}`}>
                  <h5 className={`font-medium mb-3 flex items-center gap-2 ${theme.text.primary}`}>
                    <BarChart3 className="w-4 h-4" />
                    Complete Inventory Analysis
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(business_impact.current_inventory).map(([item, stock]) => {
                      const demand = business_impact.demand_shift[item] || 0;
                      const inventoryStatus = getInventoryStatus(stock, demand);
                      const ratio = demand > 0 ? (stock / demand) * 100 : 100;
                      
                      return (
                        <div key={item} className={`p-3 rounded-lg border ${inventoryStatus.bg} ${
                          darkMode ? 'border-gray-700' : 'border-gray-200'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`font-medium ${theme.text.primary}`}>{item}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${inventoryStatus.color} ${inventoryStatus.bg}`}>
                              {inventoryStatus.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className={`text-xs ${theme.text.muted}`}>Current Stock</div>
                              <div className={`font-semibold ${theme.text.primary}`}>{stock} units</div>
                            </div>
                            <div>
                              <div className={`text-xs ${theme.text.muted}`}>Demand Increase</div>
                              <div className={`font-semibold ${theme.text.primary}`}>+{demand}%</div>
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                              <div 
                                className={`h-2 rounded-full transition-all duration-300 ${
                                  ratio >= 80 ? 'bg-green-500' : ratio >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${Math.min(ratio, 100)}%` }}
                              />
                            </div>
                            <div className={`text-xs mt-1 ${theme.text.muted}`}>
                              Coverage: {ratio.toFixed(0)}%
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Strategy */}
                <div className={`p-4 rounded-lg ${theme.bg.secondary}`}>
                  <h5 className={`font-medium mb-2 ${theme.text.primary}`}>Strategy</h5>
                  <p className={`text-sm ${theme.text.secondary}`}>{gpt_output.strategy}</p>
                </div>
                
                {/* Region Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h5 className={`font-medium ${theme.text.primary}`}>Region Details</h5>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className={theme.text.secondary}>Walmart Presence:</span>
                        <span className={`font-medium ${theme.text.primary}`}>{region_info.walmart_presence}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={theme.text.secondary}>Import Dependency:</span>
                        <span className={`font-medium ${theme.text.primary}`}>{region_info.import_dependency}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className={`font-medium ${theme.text.primary}`}>Top Categories</h5>
                    <div className="flex flex-wrap gap-1">
                      {region_info.top_categories.map((category, i) => (
                        <span key={i} className={`px-2 py-1 rounded text-xs ${
                          darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Additional Business Metrics */}
                <div className={`p-4 rounded-lg border ${
                  darkMode ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-800' : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'
                }`}>
                  <h5 className={`font-medium mb-3 flex items-center gap-2 ${
                    darkMode ? 'text-purple-300' : 'text-purple-900'
                  }`}>
                    <Star className="w-4 h-4" />
                    Performance Metrics
                  </h5>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-500" />
                      <span className={darkMode ? 'text-purple-200' : 'text-purple-800'}>Customer Impact: High</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-purple-500" />
                      <span className={darkMode ? 'text-purple-200' : 'text-purple-800'}>Inventory Turnover: +{business_impact.projected_growth_percent}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className={`px-6 py-4 border-t flex items-center justify-between ${theme.bg.secondary} ${theme.border}`}>
          <div className={`flex items-center gap-4 text-sm ${theme.text.secondary}`}>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>View Analytics</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              <span>Track Performance</span>
            </div>
          </div>
          
          <button
            onClick={() => onViewDetails && onViewDetails(event)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <span>View Details</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}