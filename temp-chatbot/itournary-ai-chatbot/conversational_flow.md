# iTournary AI Chatbot Conversational Flow

## Conversation States

The AI chatbot will guide users through a structured yet natural conversation flow with the following states:

### 1. Welcome & Introduction
- Greet user and introduce the AI assistant
- Explain the purpose of the conversation (building a personalized itinerary)
- Set expectations for the conversation process
- Ask if the user is ready to begin planning

### 2. Basic Trip Parameters
- **Number of Travelers**
  - Ask about total number of travelers
  - Follow-up on specific needs (children, seniors, accessibility requirements)
  
- **Trip Dates**
  - Ask about preferred travel dates
  - Provide immediate feedback on seasonal considerations
  - Suggest alternative dates if appropriate (peak/off-peak, weather, events)
  
- **Trip Duration**
  - Confirm length of stay
  - Suggest optimal duration based on destination (if known)

### 3. Occasion & Purpose Exploration
- Identify the primary occasion or purpose of the trip
  - Celebration (birthday, anniversary, graduation)
  - Family vacation
  - Adventure/exploration
  - Relaxation/wellness
  - Cultural immersion
  - Business with leisure extension
  
- Explore emotional significance of the trip
  - Special milestones or memories to be created
  - Desired feelings and experiences

### 4. Destination Discovery
- If destination is known:
  - Confirm destination choice
  - Provide relevant destination insights
  
- If destination is undecided:
  - Ask about geographical preferences (continent, country, climate)
  - Explore desired experiences (beach, mountains, city, countryside)
  - Suggest destinations based on occasion, traveler profile, and preferences
  - Help narrow down options with pros/cons

### 5. Experience Preferences
- Activity level preferences (relaxed vs. active)
- Interest categories:
  - Culinary experiences
  - Cultural activities
  - Outdoor adventures
  - Wellness/relaxation
  - Shopping
  - Entertainment
  
- Must-have experiences or bucket list items
- Balance between structured activities and free time

### 6. Accommodation Preferences
- Preferred accommodation types:
  - Hotels (luxury, boutique, budget)
  - Vacation rentals
  - Resorts
  - Unique stays (treehouses, glamping, etc.)
  
- Important amenities and features
- Location preferences (beachfront, city center, secluded)

### 7. Budget Considerations
- Overall budget range for the trip
- Spending priorities (where to splurge vs. save)
- Interest in special experiences regardless of cost

### 8. Itinerary Refinement
- Preferred pace of travel (busy days vs. relaxed schedule)
- Balance of guided vs. independent activities
- Special meals or dining experiences
- Transportation preferences

### 9. Final Confirmation
- Summarize key details collected
- Confirm readiness to generate itinerary
- Ask if any important aspects were missed

### 10. Itinerary Presentation
- Present the generated itinerary
- Explain how to customize further
- Transition to the itinerary editor interface

## Contextual Logic

The AI will maintain context throughout the conversation and apply the following contextual logic:

### Weather & Seasonal Context
- When dates are provided, automatically include:
  - Typical weather patterns for the destination
  - Seasonal considerations (peak/off-peak)
  - Local events or festivals during that time
  - Potential weather-related activity adjustments

### Traveler Profile Context
- Adjust recommendations based on:
  - Group composition (couples, families with children, seniors)
  - Accessibility needs
  - First-time vs. returning visitors
  - Special occasions being celebrated

### Budget-Aware Context
- Tailor suggestions within stated budget range
- Highlight exceptional experiences worth considering
- Provide alternative options at different price points

### Destination Knowledge Context
- Incorporate destination-specific insights:
  - Local customs and etiquette
  - Transportation options
  - Safety considerations
  - Hidden gems and local favorites

### Time-Aware Context
- Consider trip duration when suggesting activities
- Account for travel time between locations
- Build in appropriate rest days for longer trips
- Consider jet lag recovery for international travel

## Conversation Techniques

### Progressive Disclosure
- Begin with broad, essential questions
- Gradually increase specificity based on previous answers
- Reveal relevant options only when appropriate

### Contextual Suggestions
- Offer suggestions based on accumulated knowledge
- Example: "Since you mentioned loving food and culture, you might enjoy a cooking class in the local market."

### Empathetic Responses
- Acknowledge emotional aspects of trip planning
- Celebrate special occasions appropriately
- Express understanding of concerns or constraints

### Educational Elements
- Provide interesting facts about destinations
- Explain why certain experiences are recommended
- Share insider knowledge that enhances the trip

### Clarification & Confirmation
- Periodically summarize understanding
- Seek confirmation on important details
- Offer opportunities to revise previous inputs

## Fallback Strategies

### Ambiguity Handling
- When user input is unclear, offer specific choices
- Use examples to clarify questions
- Confirm understanding before proceeding

### Topic Transitions
- Smooth transitions between conversation topics
- Clear signposting of new conversation sections
- Ability to return to previous topics when needed

### Conversation Repair
- Recognize and recover from misunderstandings
- Provide options to restart specific sections
- Maintain overall progress despite local issues

## Sample Conversation Snippets

### Welcome & Introduction
```
AI: Welcome to iTournary! I'm your AI travel assistant, here to help you create the perfect itinerary for your upcoming trip. I'll ask you some questions about your travel plans, and together we'll build an itinerary tailored just for you. Ready to get started?

User: Yes, I'm ready!

AI: Great! Let's start planning your perfect trip. First, I'd like to know how many people will be traveling?
```

### Weather Context Example
```
User: We're thinking of going to Bali in November.

AI: Bali in November is a great choice! That's during the early rainy season, so you can expect some afternoon showers, but they typically don't last long. Temperatures will be warm (around 27-30°C or 80-86°F) with humidity around 80%. The upside is fewer crowds and lush, green landscapes. Would you like me to suggest some activities that work well during this season?
```

### Occasion-Based Recommendation
```
User: It's our 10th wedding anniversary.

AI: Congratulations on your 10th anniversary! That's a wonderful milestone to celebrate. For such a special occasion, I'd recommend including at least one truly memorable experience - perhaps a private sunset dinner on the beach, a couples' spa treatment, or even a renewal of vows ceremony if that interests you. Would any of these appeal to you, or did you have something specific in mind to mark this special occasion?
```
