import { NextResponse } from 'next/server';

// Mock database for itinerary storage
const itineraries = new Map();

export async function POST(request: Request) {
  try {
    const { conversationId } = await request.json();
    
    if (!conversationId) {
      return NextResponse.json(
        { error: 'Conversation ID is required' },
        { status: 400 }
      );
    }
    
    // In a real implementation, this would retrieve the conversation history
    // and use an AI service to generate a structured itinerary
    
    // For now, we'll create a mock itinerary
    const itinerary = generateMockItinerary(conversationId);
    
    // Store the itinerary
    itineraries.set(itinerary.id, itinerary);
    
    return NextResponse.json({
      success: true,
      itineraryId: itinerary.id,
      itinerary
    });
  } catch (error) {
    console.error('Error in itinerary generation API:', error);
    return NextResponse.json(
      { error: 'Failed to generate itinerary' },
      { status: 500 }
    );
  }
}

// Mock itinerary generation
function generateMockItinerary(conversationId: string) {
  const itineraryId = `itin_${Date.now()}`;
  
  return {
    id: itineraryId,
    conversationId,
    title: "Your Custom Travel Itinerary",
    destination: "Bali, Indonesia",
    duration: 7,
    travelers: 2,
    budget: "mid-range",
    createdAt: new Date(),
    days: [
      {
        day: 1,
        date: "2025-06-15",
        title: "Arrival & Relaxation",
        description: "Welcome to paradise! Today is all about settling in and unwinding after your journey.",
        activities: [
          {
            id: "act_1",
            time: "14:00",
            title: "Check-in at Beachside Resort",
            description: "Arrive at your beautiful beachfront accommodation and enjoy a welcome drink.",
            location: "Seminyak",
            duration: 60,
            type: "accommodation",
            price: 0,
            booked: false
          },
          {
            id: "act_2",
            time: "16:00",
            title: "Sunset Beach Walk",
            description: "Take a leisurely stroll along Seminyak Beach and witness a spectacular Balinese sunset.",
            location: "Seminyak Beach",
            duration: 90,
            type: "relaxation",
            price: 0,
            booked: false
          },
          {
            id: "act_3",
            time: "19:00",
            title: "Dinner at Seasalt Restaurant",
            description: "Enjoy fresh seafood and Balinese specialties with ocean views.",
            location: "Seminyak",
            duration: 120,
            type: "dining",
            price: 85,
            booked: false
          }
        ]
      },
      {
        day: 2,
        date: "2025-06-16",
        title: "Cultural Exploration",
        description: "Immerse yourself in Balinese culture with temple visits and traditional arts.",
        activities: [
          {
            id: "act_4",
            time: "08:00",
            title: "Breakfast at Hotel",
            description: "Start your day with a delicious breakfast buffet featuring local and international options.",
            location: "Hotel Restaurant",
            duration: 60,
            type: "dining",
            price: 0,
            booked: true
          },
          {
            id: "act_5",
            time: "10:00",
            title: "Tanah Lot Temple Tour",
            description: "Visit the iconic sea temple perched on a rock formation, one of Bali's most important landmarks.",
            location: "Tabanan",
            duration: 180,
            type: "cultural",
            price: 45,
            booked: false
          },
          {
            id: "act_6",
            time: "14:00",
            title: "Lunch at Organic Cafe",
            description: "Enjoy healthy, locally-sourced cuisine in a beautiful garden setting.",
            location: "Canggu",
            duration: 90,
            type: "dining",
            price: 30,
            booked: false
          },
          {
            id: "act_7",
            time: "16:00",
            title: "Traditional Batik Workshop",
            description: "Learn the ancient art of batik from local artisans and create your own piece to take home.",
            location: "Ubud",
            duration: 120,
            type: "cultural",
            price: 35,
            booked: false
          },
          {
            id: "act_8",
            time: "19:30",
            title: "Dinner & Dance Performance",
            description: "Experience traditional Balinese dance while enjoying a royal feast.",
            location: "Ubud Palace",
            duration: 150,
            type: "entertainment",
            price: 65,
            booked: false
          }
        ]
      },
      {
        day: 3,
        date: "2025-06-17",
        title: "Nature & Adventure",
        description: "Explore Bali's natural beauty with exciting outdoor activities.",
        activities: [
          {
            id: "act_9",
            time: "07:30",
            title: "Breakfast at Hotel",
            description: "Fuel up for an adventurous day ahead.",
            location: "Hotel Restaurant",
            duration: 60,
            type: "dining",
            price: 0,
            booked: true
          },
          {
            id: "act_10",
            time: "09:00",
            title: "Ubud Monkey Forest Visit",
            description: "Walk through a sacred nature reserve and temple complex home to over 700 Balinese long-tailed macaques.",
            location: "Ubud",
            duration: 120,
            type: "nature",
            price: 25,
            booked: false
          },
          {
            id: "act_11",
            time: "12:00",
            title: "Lunch at Jungle Restaurant",
            description: "Dine in a unique restaurant overlooking the lush jungle and river valley.",
            location: "Ubud",
            duration: 90,
            type: "dining",
            price: 40,
            booked: false
          },
          {
            id: "act_12",
            time: "14:00",
            title: "White Water Rafting",
            description: "Experience an exhilarating rafting adventure down the Ayung River, navigating through stunning rainforest scenery.",
            location: "Ayung River",
            duration: 180,
            type: "adventure",
            price: 75,
            booked: false
          },
          {
            id: "act_13",
            time: "18:30",
            title: "Relaxing Spa Treatment",
            description: "Unwind with a traditional Balinese massage and flower bath.",
            location: "Luxury Spa",
            duration: 120,
            type: "wellness",
            price: 95,
            booked: false
          },
          {
            id: "act_14",
            time: "21:00",
            title: "Dinner at Local Warung",
            description: "Enjoy authentic Balinese cuisine at a family-run restaurant.",
            location: "Ubud Center",
            duration: 90,
            type: "dining",
            price: 25,
            booked: false
          }
        ]
      }
    ],
    accommodation: {
      name: "Beachside Resort & Spa",
      location: "Seminyak, Bali",
      type: "Resort",
      rating: 4.5,
      pricePerNight: 185,
      totalPrice: 1295,
      amenities: ["Pool", "Spa", "Restaurant", "Beach Access", "Free Breakfast"],
      image: "beachside_resort.jpg"
    },
    transportation: {
      arrival: {
        type: "Flight",
        from: "International Airport",
        to: "Denpasar International Airport",
        date: "2025-06-15",
        time: "12:30",
        details: "Direct flight, 4 hours"
      },
      departure: {
        type: "Flight",
        from: "Denpasar International Airport",
        to: "International Airport",
        date: "2025-06-22",
        time: "15:45",
        details: "Direct flight, 4 hours"
      },
      local: [
        {
          type: "Private Driver",
          description: "Available for the duration of your stay",
          pricePerDay: 45,
          totalPrice: 315
        }
      ]
    },
    budget: {
      accommodation: 1295,
      transportation: 315,
      activities: 520,
      food: 350,
      miscellaneous: 200,
      total: 2680
    },
    notes: [
      "All activities can be customized or rescheduled based on your preferences.",
      "June is the dry season in Bali with pleasant temperatures around 27-30°C (80-86°F).",
      "We've included a mix of pre-booked activities and free time for spontaneous exploration."
    ]
  };
}
