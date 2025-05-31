import { NextResponse } from 'next/server';

// Mock weather data service
// In a real implementation, this would connect to a weather API
const getWeatherData = async (location: string, date: string) => {
  // Mock weather data for popular destinations
  const weatherDatabase = {
    'bali': {
      'summer': { temp: '27-30°C', condition: 'Sunny', humidity: '80%', rainfall: 'Low', description: 'Warm and sunny with occasional brief showers in the afternoon.' },
      'fall': { temp: '26-29°C', condition: 'Partly Cloudy', humidity: '85%', rainfall: 'Moderate', description: 'Warm with increasing rainfall as the wet season approaches.' },
      'winter': { temp: '25-28°C', condition: 'Rainy', humidity: '90%', rainfall: 'High', description: 'Warm with frequent rainfall, typically short but intense showers.' },
      'spring': { temp: '26-29°C', condition: 'Partly Cloudy', humidity: '85%', rainfall: 'Moderate', description: 'Gradually decreasing rainfall with sunny periods becoming more frequent.' }
    },
    'paris': {
      'summer': { temp: '18-25°C', condition: 'Sunny', humidity: '65%', rainfall: 'Low', description: 'Pleasant and warm with long daylight hours, occasional brief showers.' },
      'fall': { temp: '10-18°C', condition: 'Partly Cloudy', humidity: '75%', rainfall: 'Moderate', description: 'Cooling temperatures with colorful foliage and increasing rainfall.' },
      'winter': { temp: '2-8°C', condition: 'Cloudy', humidity: '80%', rainfall: 'Moderate', description: 'Cold with occasional frost and rain, rare snowfall.' },
      'spring': { temp: '8-16°C', condition: 'Changeable', humidity: '70%', rainfall: 'Moderate', description: 'Gradually warming with blooming gardens and occasional showers.' }
    },
    'new york': {
      'summer': { temp: '22-30°C', condition: 'Sunny', humidity: '70%', rainfall: 'Moderate', description: 'Warm to hot and humid with occasional thunderstorms.' },
      'fall': { temp: '10-20°C', condition: 'Partly Cloudy', humidity: '65%', rainfall: 'Low', description: 'Cooling temperatures with spectacular fall foliage, generally pleasant.' },
      'winter': { temp: '-5-5°C', condition: 'Snowy', humidity: '60%', rainfall: 'Moderate', description: 'Cold with snowfall and occasional freezing temperatures.' },
      'spring': { temp: '5-18°C', condition: 'Changeable', humidity: '65%', rainfall: 'Moderate', description: 'Gradually warming with blooming trees and occasional rain showers.' }
    },
    'tokyo': {
      'summer': { temp: '25-30°C', condition: 'Humid', humidity: '80%', rainfall: 'High', description: 'Hot and humid with frequent rainfall, typhoon season.' },
      'fall': { temp: '15-25°C', condition: 'Sunny', humidity: '70%', rainfall: 'Low', description: 'Pleasant temperatures with clear skies and beautiful autumn colors.' },
      'winter': { temp: '2-10°C', condition: 'Sunny', humidity: '60%', rainfall: 'Low', description: 'Cold but generally clear and sunny with rare snowfall.' },
      'spring': { temp: '10-20°C', condition: 'Pleasant', humidity: '65%', rainfall: 'Moderate', description: 'Mild temperatures with cherry blossoms, occasional rain showers.' }
    }
  };

  // Determine season from date
  const dateObj = new Date(date);
  const month = dateObj.getMonth();
  let season;
  
  if (month >= 2 && month <= 4) season = 'spring';
  else if (month >= 5 && month <= 7) season = 'summer';
  else if (month >= 8 && month <= 10) season = 'fall';
  else season = 'winter';
  
  // Normalize location name for lookup
  const normalizedLocation = location.toLowerCase();
  
  // Find closest match in database
  let weatherData;
  for (const key in weatherDatabase) {
    if (normalizedLocation.includes(key)) {
      weatherData = weatherDatabase[key][season];
      break;
    }
  }
  
  // Default data if no match found
  if (!weatherData) {
    weatherData = {
      temp: '15-25°C',
      condition: 'Varied',
      humidity: '70%',
      rainfall: 'Moderate',
      description: 'Weather patterns vary for this destination. Consider checking closer to your travel date.'
    };
  }
  
  return {
    location,
    date,
    season,
    ...weatherData
  };
};

// Mock destination information service
// In a real implementation, this would connect to a travel information API
const getDestinationInfo = async (destination: string) => {
  // Mock destination database
  const destinationDatabase = {
    'bali': {
      country: 'Indonesia',
      language: 'Indonesian, Balinese',
      currency: 'Indonesian Rupiah (IDR)',
      timeZone: 'GMT+8',
      visaRequirements: 'Visa-free for many countries for stays up to 30 days',
      bestTimeToVisit: 'April to October (dry season)',
      highlights: ['Sacred Monkey Forest', 'Tanah Lot Temple', 'Ubud Art Market', 'Rice Terraces', 'Mount Batur'],
      localTips: 'Respect temple dress codes, bargain at markets but remain respectful, try local warungs for authentic food.'
    },
    'paris': {
      country: 'France',
      language: 'French',
      currency: 'Euro (EUR)',
      timeZone: 'GMT+1',
      visaRequirements: 'Schengen visa required for many non-EU citizens',
      bestTimeToVisit: 'April to June, September to October',
      highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Montmartre', 'Seine River Cruise'],
      localTips: 'Learn basic French phrases, explore beyond tourist areas, use the Metro for transportation, be aware of pickpockets in tourist areas.'
    },
    'new york': {
      country: 'United States',
      language: 'English',
      currency: 'US Dollar (USD)',
      timeZone: 'GMT-5',
      visaRequirements: 'ESTA or visa required for most foreign visitors',
      bestTimeToVisit: 'April to June, September to November',
      highlights: ['Central Park', 'Statue of Liberty', 'Times Square', 'Metropolitan Museum of Art', 'Broadway Shows'],
      localTips: 'Use the subway for efficient transportation, explore different neighborhoods, expect to tip 15-20% at restaurants.'
    },
    'tokyo': {
      country: 'Japan',
      language: 'Japanese',
      currency: 'Japanese Yen (JPY)',
      timeZone: 'GMT+9',
      visaRequirements: 'Visa required for many nationalities, visa waiver for some',
      bestTimeToVisit: 'March to May, September to November',
      highlights: ['Meiji Shrine', 'Tokyo Skytree', 'Shibuya Crossing', 'Senso-ji Temple', 'Tsukiji Fish Market'],
      localTips: 'Learn basic Japanese phrases, carry cash as many places don\'t accept cards, be respectful of local customs and etiquette.'
    }
  };
  
  // Normalize destination name for lookup
  const normalizedDestination = destination.toLowerCase();
  
  // Find closest match in database
  let destinationData;
  for (const key in destinationDatabase) {
    if (normalizedDestination.includes(key)) {
      destinationData = destinationDatabase[key];
      break;
    }
  }
  
  // Default data if no match found
  if (!destinationData) {
    destinationData = {
      country: 'Information not available',
      language: 'Information not available',
      currency: 'Information not available',
      timeZone: 'Information not available',
      visaRequirements: 'Please check official sources for visa requirements',
      bestTimeToVisit: 'Information not available',
      highlights: ['Information not available'],
      localTips: 'Research local customs and regulations before your trip.'
    };
  }
  
  return {
    destination,
    ...destinationData
  };
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const location = searchParams.get('location');
  const date = searchParams.get('date');
  
  if (!type || !location) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }
  
  try {
    let data;
    
    if (type === 'weather' && date) {
      data = await getWeatherData(location, date);
    } else if (type === 'destination') {
      data = await getDestinationInfo(location);
    } else {
      return NextResponse.json(
        { error: 'Invalid request type or missing parameters' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in contextual data API:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve contextual data' },
      { status: 500 }
    );
  }
}
