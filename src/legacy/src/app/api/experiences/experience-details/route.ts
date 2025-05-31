import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Extract the experienceId from the URL parameters
    const url = new URL(request.url);
    const experienceId = url.searchParams.get('id');
    
    if (!experienceId) {
      return NextResponse.json(
        { error: "Experience ID is required" },
        { status: 400 }
      );
    }
    
    // Mock data for a specific experience with template items
    const mockExperience = {
      _id: experienceId,
      experienceName: "Sample Destination Wedding",
      occasionTypeName: "Destination Weddings",
      destination: "Bali, Indonesia",
      startDate: new Date(2025, 7, 15).toISOString(),
      endDate: new Date(2025, 7, 22).toISOString(),
      notes: "This is a sample experience for testing purposes.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items: [
        // Checklist items
        {
          type: 'checklist',
          name: "Choose wedding location",
          notes: "Research and select the perfect destination for your wedding",
          metadata: {
            itemType: "decision",
            isCritical: true,
            fromTemplate: true,
            status: 'pending'
          }
        },
        {
          type: 'checklist',
          name: "Book venue",
          notes: "Secure your wedding venue with a deposit",
          metadata: {
            itemType: "task",
            isCritical: true,
            fromTemplate: true,
            status: 'pending'
          }
        },
        // Timeline items
        {
          type: 'timeline',
          name: "12-18 Months Before",
          notes: "Start planning, research destinations, set budget",
          metadata: {
            duration: "6 months",
            fromTemplate: true
          }
        },
        {
          type: 'timeline',
          name: "9-12 Months Before",
          notes: "Book venue, hire planner, send save-the-dates",
          metadata: {
            duration: "3 months",
            fromTemplate: true
          }
        },
        // Budget items
        {
          type: 'budget',
          name: "Venue",
          notes: "Includes ceremony and reception spaces",
          metadata: {
            estimatedCost: "5000",
            actualCost: "0",
            fromTemplate: true
          }
        },
        {
          type: 'budget',
          name: "Travel & Accommodations",
          notes: "For couple and wedding party",
          metadata: {
            estimatedCost: "3000",
            actualCost: "0",
            fromTemplate: true
          }
        }
      ]
    };
    
    return NextResponse.json({ experience: mockExperience });
    
  } catch (error) {
    console.error("Get experience error:", error);
    return NextResponse.json(
      { error: "Failed to fetch experience details" }, 
      { status: 500 }
    );
  }
}
