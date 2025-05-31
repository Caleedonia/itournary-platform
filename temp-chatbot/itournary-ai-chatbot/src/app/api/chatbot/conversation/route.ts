import { NextResponse } from 'next/server';

// Mock database for conversation storage
const conversations = new Map();
const messages = new Map();

export async function POST(request: Request) {
  try {
    const { message, conversationId } = await request.json();
    
    // Get or create conversation
    let conversation;
    
    if (conversationId && conversations.has(conversationId)) {
      conversation = conversations.get(conversationId);
    } else {
      // Create new conversation
      const newId = `conv_${Date.now()}`;
      conversation = {
        id: newId,
        userId: 'user_123', // In a real app, this would come from authentication
        startedAt: new Date(),
        status: 'active'
      };
      conversations.set(newId, conversation);
      
      // Initialize messages for this conversation
      messages.set(newId, []);
    }
    
    // Store user message
    const userMessageId = `msg_${Date.now()}`;
    const userMessage = {
      id: userMessageId,
      conversationId: conversation.id,
      role: 'user',
      content: message,
      timestamp: new Date()
    };
    
    const conversationMessages = messages.get(conversation.id) || [];
    conversationMessages.push(userMessage);
    messages.set(conversation.id, conversationMessages);
    
    // Generate AI response based on conversation context
    const aiResponse = await generateAIResponse(conversation.id, message, conversationMessages);
    
    // Store AI response
    const aiMessageId = `msg_${Date.now() + 1}`;
    const aiMessage = {
      id: aiMessageId,
      conversationId: conversation.id,
      role: 'assistant',
      content: aiResponse.content,
      timestamp: new Date()
    };
    
    conversationMessages.push(aiMessage);
    
    // Update conversation status if needed
    if (aiResponse.suggestedStatus) {
      conversation.status = aiResponse.suggestedStatus;
      conversations.set(conversation.id, conversation);
    }
    
    return NextResponse.json({
      conversationId: conversation.id,
      message: aiResponse.content,
      suggestedActions: aiResponse.suggestedActions || [],
      status: conversation.status
    });
  } catch (error) {
    console.error('Error in conversation API:', error);
    return NextResponse.json(
      { error: 'Failed to process conversation' },
      { status: 500 }
    );
  }
}

// Mock AI response generation
async function generateAIResponse(conversationId: string, message: string, conversationHistory: any[]) {
  // In a real implementation, this would call an LLM API
  // For now, we'll use simple keyword matching
  
  // Get user messages only
  const userMessages = conversationHistory.filter(msg => msg.role === 'user');
  
  // Simple response logic based on conversation progress
  if (userMessages.length === 1) {
    return {
      content: "Thanks for sharing! To help plan your perfect trip, I need a few more details. How many people will be traveling, and when are you thinking of going?",
      suggestedActions: ['specify_dates', 'specify_travelers'],
      suggestedStatus: 'active'
    };
  }
  
  if (userMessages.length === 2) {
    return {
      content: "Great! Now, what kind of experiences are you looking for on this trip? Are you interested in relaxation, adventure, cultural experiences, or something else?",
      suggestedActions: ['specify_interests'],
      suggestedStatus: 'active'
    };
  }
  
  if (userMessages.length === 3) {
    return {
      content: "That sounds wonderful! Do you have a specific destination in mind, or would you like some recommendations based on your preferences?",
      suggestedActions: ['specify_destination', 'request_recommendations'],
      suggestedStatus: 'active'
    };
  }
  
  if (userMessages.length === 4) {
    return {
      content: "Perfect! One last question - what's your approximate budget for this trip? This will help me suggest appropriate accommodations and activities.",
      suggestedActions: ['specify_budget'],
      suggestedStatus: 'active'
    };
  }
  
  if (userMessages.length >= 5) {
    return {
      content: "Thank you for providing all this information! I now have enough details to create a personalized itinerary for you. Would you like me to generate your itinerary now?",
      suggestedActions: ['generate_itinerary', 'ask_more_questions'],
      suggestedStatus: 'ready_for_itinerary'
    };
  }
  
  // Default response
  return {
    content: "I understand. Let me incorporate that into your travel plans. Is there anything else you'd like to share about your preferences?",
    suggestedStatus: 'active'
  };
}
