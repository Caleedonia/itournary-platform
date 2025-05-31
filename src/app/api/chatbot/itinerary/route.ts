import { NextResponse } from "next/server";

// Mock itinerary templates for different destinations
const itineraryTemplates = {
  "paris": {
    title: "Romantic Paris Getaway",
    destination: "Paris, France",
    duration: "5 days",
    overview: "Experience the charm and romance of the City of Light with this carefully curated itinerary covering the iconic landmarks and hidden gems of Paris.",
    days: [
      {
        day: 1,
        title: "Iconic Landmarks",
        activities: [
          "Morning: Visit the Eiffel Tower early to avoid crowds",
          "Lunch: Enjoy a picnic at Champ de Mars",
          "Afternoon: Explore the Louvre Museum (focus on Mona Lisa and Venus de Milo)",
          "Evening: Seine River cruise at sunset"
        ]
      },
      {
        day: 2,
        title: "Historic Paris",
        activities: [
          "Morning: Notre Dame Cathedral and Île de la Cité",
          "Lunch: Traditional French cuisine at a local bistro",
          "Afternoon: Sainte-Chapelle and Conciergerie",
          "Evening: Explore the Latin Quarter"
        ]
      },
      {
        day: 3,
        title: "Artistic Paris",
        activities: [
          "Morning: Montmartre and Sacré-Cœur Basilica",
          "Lunch: Café terrace experience in Montmartre",
          "Afternoon: Musée d'Orsay for impressionist art",
          "Evening: Moulin Rouge show (optional)"
        ]
      },
      {
        day: 4,
        title: "Royal Paris",
        activities: [
          "Morning: Palace of Versailles (day trip)",
          "Lunch: Garden picnic at Versailles",
          "Afternoon: Explore the gardens and Marie Antoinette's Estate",
          "Evening: Return to Paris, dinner at Saint-Germain-des-Prés"
        ]
      },
      {
        day: 5,
        title: "Parisian Lifestyle",
        activities: [
          "Morning: Luxembourg Gardens and Pantheon",
          "Lunch: Food tour in Le Marais",
          "Afternoon: Shopping on Champs-Élysées",
          "Evening: Farewell dinner with Eiffel Tower views"
        ]
      }
    ],
    tips: [
      "Purchase a Paris Museum Pass to save money on attractions",
      "Learn a few basic French phrases to enhance your experience",
      "Use the Metro for efficient transportation around the city",
      "Many museums are free on the first Sunday of each month",
      "Make dinner reservations in advance, especially for popular restaurants"
    ]
  },
  "tokyo": {
    title: "Tokyo Cultural Exploration",
    destination: "Tokyo, Japan",
    duration: "7 days",
    overview: "Discover the fascinating blend of ultramodern and traditional in Japan's vibrant capital city, from skyscrapers to ancient temples.",
    days: [
      {
        day: 1,
        title: "Modern Tokyo",
        activities: [
          "Morning: Shibuya Crossing and Hachiko Statue",
          "Lunch: Conveyor belt sushi experience",
          "Afternoon: Shopping in Shibuya and Harajuku",
          "Evening: Shinjuku nightlife and Tokyo Metropolitan Government Building for night views"
        ]
      },
      {
        day: 2,
        title: "Historic Tokyo",
        activities: [
          "Morning: Meiji Shrine and Yoyogi Park",
          "Lunch: Traditional Japanese set meal",
          "Afternoon: Imperial Palace Gardens",
          "Evening: Ginza district exploration"
        ]
      },
      {
        day: 3,
        title: "Cultural Immersion",
        activities: [
          "Morning: Senso-ji Temple in Asakusa",
          "Lunch: Street food at Nakamise Shopping Street",
          "Afternoon: Tokyo National Museum",
          "Evening: Sumida River cruise"
        ]
      }
    ],
    tips: [
      "Get a Suica or Pasmo card for easy transportation",
      "Be mindful of subway rush hours (7:30-9:00 AM and 5:30-7:30 PM)",
      "Many restaurants display plastic food models to help with ordering",
      "Tipping is not customary in Japan",
      "Download a translation app to help with communication"
    ]
  },
  "default": {
    title: "Custom Travel Itinerary",
    destination: "Your Dream Destination",
    duration: "Custom Trip",
    overview: "This personalized itinerary outline can be further customized based on your specific interests, pace of travel, and accommodation preferences.",
    days: [
      {
        day: 1,
        title: "Arrival & Orientation",
        activities: [
          "Morning: Arrive and check in to accommodation",
          "Lunch: Try local cuisine near your accommodation",
          "Afternoon: Orientation walk around the neighborhood",
          "Evening: Early dinner and rest to recover from travel"
        ]
      },
      {
        day: 2,
        title: "Major Attractions",
        activities: [
          "Morning: Visit the most iconic landmark",
          "Lunch: Dining with a view",
          "Afternoon: Explore main museums or cultural sites",
          "Evening: Local entertainment or night views"
        ]
      },
      {
        day: 3,
        title: "Local Experiences",
        activities: [
          "Morning: Local market or neighborhood exploration",
          "Lunch: Street food tasting",
          "Afternoon: Unique local activity or workshop",
          "Evening: Dinner at highly-rated local restaurant"
        ]
      }
    ],
    tips: [
      "Research local customs and basic phrases before your trip",
      "Check if a city transit pass would be economical for your stay",
      "Keep digital and physical copies of important documents",
      "Stay hydrated and pace yourself, especially when adjusting to a new climate",
      "Allow for flexibility in your schedule for unexpected discoveries"
    ]
  }
};

export async function POST(request: Request) {
  try {
    const { destination, duration, interests } = await request.json();
    
    // Convert destination to lowercase for matching
    const destinationLower = destination?.toLowerCase() || "";
    
    // Select template based on destination or use default
    let template;
    if (destinationLower.includes("paris")) {
      template = itineraryTemplates.paris;
    } else if (destinationLower.includes("tokyo")) {
      template = itineraryTemplates.tokyo;
    } else {
      template = itineraryTemplates.default;
      
      // Customize the default template with the provided destination
      if (destination) {
        template.title = `${destination} Adventure`;
        template.destination = destination;
      }
      
      // Customize duration if provided
      if (duration) {
        template.duration = duration;
      }
    }
    
    // Simulate a delay for a more realistic experience
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return NextResponse.json({ itinerary: template });
    
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return NextResponse.json(
      { error: "There was an error generating your itinerary" },
      { status: 500 }
    );
  }
}
