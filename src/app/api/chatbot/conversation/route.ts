import { NextResponse } from "next/server";

// In-memory storage for conversations (would be a database in production)
const conversations = new Map<string, { messages: any[] }>();

// Mock travel knowledge base for responses
const travelKnowledge = {
  greetings: [
    "Hello! I'm your iTournary AI travel assistant. How can I help plan your trip today?",
    "Welcome to iTournary! I can help you create the perfect travel itinerary. Where would you like to go?",
    "Hi there! Ready to plan an amazing trip? Tell me what kind of vacation you're looking for."
  ],
  destinations: {
    "paris": "Paris is known as the City of Light and is famous for the Eiffel Tower, Louvre Museum, and exquisite cuisine. The best time to visit is April-June or September-November to avoid crowds.",
    "tokyo": "Tokyo is a vibrant metropolis blending ultramodern and traditional. Visit during spring for cherry blossoms or fall for autumn colors. Don't miss Tokyo Tower, Shibuya Crossing, and the historic temples.",
    "new york": "New York City offers iconic attractions like Times Square, Central Park, and the Statue of Liberty. It's great to visit in spring or fall when the weather is mild.",
    "rome": "Rome, the Eternal City, is home to the Colosseum, Vatican City, and incredible Italian cuisine. Spring and fall offer the best weather for exploring.",
    "bali": "Bali is a tropical paradise with beautiful beaches, lush rice terraces, and spiritual temples. The dry season from April to October is ideal for visiting."
  },
  activities: {
    "beach": ["relaxing on the shore", "swimming in crystal clear waters", "snorkeling to explore marine life", "sunset beach walks"],
    "hiking": ["exploring scenic trails", "climbing to panoramic viewpoints", "forest trekking", "mountain expeditions"],
    "food": ["culinary tours", "cooking classes", "visiting local markets", "dining at authentic restaurants"],
    "cultural": ["museum visits", "historical site tours", "attending local festivals", "architecture exploration"],
    "adventure": ["zip-lining", "white water rafting", "bungee jumping", "scuba diving"]
  },
  accommodation: ["luxury hotels", "boutique guesthouses", "vacation rentals", "eco-friendly resorts", "budget hostels"],
  duration: {
    "weekend": "For a weekend trip, I recommend focusing on 1-2 key attractions and enjoying local cuisine.",
    "week": "A week gives you enough time to explore major attractions and take a day trip to nearby areas.",
    "twoweek": "Two weeks allows for an in-depth exploration of a region or visiting multiple cities."
  }
};

// Helper function to determine response based on user message
function generateMockResponse(userMessage: string) {
  const message = userMessage.toLowerCase();
  
  // Check for greetings
  if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
    return travelKnowledge.greetings[Math.floor(Math.random() * travelKnowledge.greetings.length)];
  }
  
  // Check for destination inquiries
  for (const [destination, info] of Object.entries(travelKnowledge.destinations)) {
    if (message.includes(destination)) {
      return info;
    }
  }
  
  // Check for activity interests
  for (const [activity, options] of Object.entries(travelKnowledge.activities)) {
    if (message.includes(activity)) {
      return `For ${activity} activities, I recommend ${options.join(", ")}. These are popular choices among travelers!`;
    }
  }
  
  // Check for duration mentions
  if (message.includes("weekend") || message.includes("2 days") || message.includes("3 days")) {
    return travelKnowledge.duration.weekend;
  } else if (message.includes("week") || message.includes("7 days")) {
    return travelKnowledge.duration.week;
  } else if (message.includes("two weeks") || message.includes("14 days")) {
    return travelKnowledge.duration.twoweek;
  }
  
  // Check for itinerary requests
  if (message.includes("itinerary") || message.includes("plan") || message.includes("schedule")) {
    return "I'd be happy to help create an itinerary! To get started, could you tell me where you want to go, when you're planning to travel, and what kinds of activities interest you?";
  }
  
  // Check for accommodation questions
  if (message.includes("hotel") || message.includes("stay") || message.includes("accommodation") || message.includes("where to stay")) {
    const options = travelKnowledge.accommodation;
    return `For accommodations, you might consider ${options.join(", ")}. The best choice depends on your budget and preferences.`;
  }
  
  // Default responses for other queries
  const defaultResponses = [
    "That's an interesting question about travel! Could you provide more details about what you're looking for?",
    "I'd love to help with your travel plans. Could you tell me more about your destination and interests?",
    "Great question! To give you the best advice, I need to know more about your travel preferences and destination.",
    "I can help with that! To provide personalized recommendations, could you share more about your trip plans?"
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

export async function POST(request: Request) {
  try {
    const { conversationId, message } = await request.json();
    
    // Create conversation if it doesn't exist
    if (!conversations.has(conversationId)) {
      conversations.set(conversationId, { messages: [] });
    }
    
    const conversation = conversations.get(conversationId)!;
    
    // Add user message to conversation
    conversation.messages.push({
      role: "user",
      content: message
    });
    
    // Generate a mock response
    const responseContent = generateMockResponse(message);
    
    // Add assistant response to conversation
    conversation.messages.push({
      role: "assistant",
      content: responseContent
    });
    
    return NextResponse.json({ 
      response: responseContent,
      conversationId 
    });
    
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "There was an error processing your request" },
      { status: 500 }
    );
  }
}
