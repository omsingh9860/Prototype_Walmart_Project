// src/data/data.js
export const events = [
  {
    id: 1,
    event: "Heavy Rain in Pune",
    region: "Pune",
    event_type: "Weather Alert",
    timestamp: "2025-06-16T14:00:00Z",
    weather: {
      temperature: "28°C",
      condition: "Thunderstorm",
      forecast: "Heavy rainfall expected for 2 more days"
    },
    gpt_output: {
      stock_up: ["bottled water", "instant noodles", "raincoats"],
      avoid: ["fresh vegetables", "bread"],
      quick_reason: "Rain disrupts transport and delivery of perishables.",
      strategy: "Due to heavy rain, transportation delays are likely. Customers prefer shelf-stable goods. Avoid overstocking items with low shelf life."
    },
    region_info: {
      walmart_presence: "High",
      top_categories: ["Snacks", "FMCG", "Dairy"],
      import_dependency: "Low"
    },
    business_impact: {
      stockout_prevented: 3,
      revenue_loss_avoided: 24000,
      demand_shift: {
        "instant noodles": 30,
        "bottled water": 25,
        "raincoats": 15,
        "umbrellas": 20
      },
      current_inventory: {
        "instant noodles": 10,
        "bottled water": 18,
        "raincoats": 20,
        "umbrellas": 8
      },
      urgency_score: 8.7,
      projected_growth_percent: 6.2
    }
  },
  {
    id: 2,
    event: "Cricket World Cup Final",
    region: "Mumbai",
    event_type: "Sports Event",
    timestamp: "2025-06-18T19:00:00Z",
    weather: {
      temperature: "32°C",
      condition: "Clear",
      forecast: "Sunny weather expected"
    },
    gpt_output: {
      stock_up: ["snacks", "beverages", "electronics", "party supplies"],
      avoid: ["winter clothing", "school supplies"],
      quick_reason: "Major cricket event will drive massive demand for snacks, beverages, and electronics",
      strategy: "Stock up on party supplies, increase beverage inventory by 300%, prepare for electronics surge"
    },
    region_info: {
      walmart_presence: "High",
      top_categories: ["Groceries", "Electronics", "Clothing"],
      import_dependency: "Medium"
    },
    business_impact: {
      stockout_prevented: 85,
      revenue_loss_avoided: 2500000,
      demand_shift: {
        "snacks": 150,
        "beverages": 200,
        "electronics": 80,
        "party supplies": 120
      },
      current_inventory: {
        "snacks": 100,
        "beverages": 190,
        "electronics": 60,
        "party supplies": 90
      },
      urgency_score: 9.2,
      projected_growth_percent: 45
    }
  },
  {
    id: 3,
    event: "Monsoon Season Peak",
    region: "Kerala",
    event_type: "Weather Alert",
    timestamp: "2025-06-20T08:00:00Z",
    weather: {
      temperature: "24°C",
      condition: "Heavy Rain",
      forecast: "Continuous rainfall expected"
    },
    gpt_output: {
      stock_up: ["rain gear", "umbrellas", "indoor entertainment", "preserved foods"],
      avoid: ["outdoor equipment", "fresh produce"],
      quick_reason: "Monsoon season creates high demand for rain gear and indoor activities",
      strategy: "Focus on weather-appropriate items and indoor entertainment options"
    },
    region_info: {
      walmart_presence: "Medium",
      top_categories: ["Household", "Food", "Clothing"],
      import_dependency: "High"
    },
    business_impact: {
      stockout_prevented: 45,
      revenue_loss_avoided: 180000,
      demand_shift: {
        "rain gear": 90,
        "umbrellas": 75,
        "indoor games": 60,
        "preserved foods": 85
      },
      current_inventory: {
        "rain gear": 40,
        "umbrellas": 60,
        "indoor games": 50,
        "preserved foods": 70
      },
      urgency_score: 7.8,
      projected_growth_percent: 22
    }
  },
  {
    id: 4,
    event: "Winter Stock Arbitrage Alert",
    region: "Pan-India",
    event_type: "Procurement Opportunity",
    timestamp: "2025-07-10T00:00:00Z",
    weather: {
      temperature: "34°C",
      condition: "Hot",
      forecast: "High temperatures to continue till September"
    },
    gpt_output: {
      stock_up: ["blankets", "room heaters", "thermal innerwear", "hot water bags"],
      avoid: ["coolers", "summer T-shirts"],
      quick_reason: "Winter goods are off-season now, enabling cheaper bulk procurement.",
      strategy: "Secure winter stock before peak season inflation. Warehouse surplus for November distribution."
    },
    region_info: {
      walmart_presence: "High",
      top_categories: ["Clothing", "Electronics", "Home Essentials"],
      import_dependency: "High"
    },
    business_impact: {
      stockout_prevented: 78,
      revenue_loss_avoided: 570000,
      demand_shift: {
        "blankets": 120,
        "room heaters": 100,
        "thermal wear": 80
      },
      current_inventory: {
        "blankets": 60,
        "room heaters": 40,
        "thermal wear": 20
      },
      urgency_score: 8.4,
      projected_growth_percent: 14.1
    }
  },
  {
    id: 5,
    event: "Back to College Sales Spike",
    region: "Chennai",
    event_type: "Seasonal Trend",
    timestamp: "2025-06-20T00:00:00Z",
    weather: {
      temperature: "31°C",
      condition: "Partly Cloudy",
      forecast: "Hot and stable weather"
    },
    gpt_output: {
      stock_up: ["notebooks", "backpacks", "laptops", "stationery kits"],
      avoid: ["holiday kits", "beach gear"],
      quick_reason: "June-July marks college reopening season. Students are major consumers.",
      strategy: "Launch back-to-college combos. Offer student discounts on electronics and accessories."
    },
    region_info: {
      walmart_presence: "Medium",
      top_categories: ["Education", "Electronics", "Accessories"],
      import_dependency: "Medium"
    },
    business_impact: {
      stockout_prevented: 62,
      revenue_loss_avoided: 480000,
      demand_shift: {
        "notebooks": 150,
        "backpacks": 120,
        "laptops": 80
      },
      current_inventory: {
        "notebooks": 100,
        "backpacks": 90,
        "laptops": 70
      },
      urgency_score: 8.1,
      projected_growth_percent: 15.7
    }
  },
  {
    id: 6,
    event: "Raksha Bandhan Demand Spike",
    region: "Delhi NCR",
    event_type: "Historical Trend",
    timestamp: "2025-07-18T00:00:00Z",
    weather: {
      temperature: "33°C",
      condition: "Humid",
      forecast: "Typical monsoon weather"
    },
    gpt_output: {
      stock_up: ["rakhis", "sweets", "dry fruits", "grooming kits"],
      avoid: ["summer accessories", "beach towels"],
      quick_reason: "Last August saw a 70% surge in festive gifting in NCR due to Raksha Bandhan.",
      strategy: "Prepare for early buying behavior. Launch preorder system. Focus on premium packaging."
    },
    region_info: {
      walmart_presence: "High",
      top_categories: ["Gifts", "FMCG", "Personal Care"],
      import_dependency: "Low"
    },
    business_impact: {
      stockout_prevented: 94,
      revenue_loss_avoided: 730000,
      demand_shift: {
        "sweets": 160,
        "rakhis": 130,
        "grooming kits": 90
      },
      current_inventory: {
        "sweets": 140,
        "rakhis": 90,
        "grooming kits": 70
      },
      urgency_score: 9.0,
      projected_growth_percent: 18.9
    }
  }
];
