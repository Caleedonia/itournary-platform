import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { experienceId } = params;
    
    // Mock data for a specific experience
    const mockExperience = {
      _id: experienceId,
      experienceName: "Sample Experience",
      occasionTypeName: "Destination Weddings",
      destination: "Bali, Indonesia",
      startDate: new Date(2025, 7, 15).toISOString(),
      endDate: new Date(2025, 7, 22).toISOString(),
      notes: "This is a sample experience for testing purposes.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items: [
        { type: "venue", name: "Beach Resort", notes: "Beachfront venue with capacity for 100 guests" },
        { type: "vendor", name: "Island Catering", notes: "Local cuisine options available" },
        { type: "activity", name: "Welcome Dinner", notes: "Sunset dinner on the beach for all guests" }
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

export async function PUT(request, { params }) {
  try {
    const { experienceId } = params;
    const data = await request.json();
    
    // In a real app, we'd update the experience in the database
    // Here we just return the updated data
    return NextResponse.json({ 
      experience: {
        _id: experienceId,
        ...data,
        updatedAt: new Date().toISOString()
      },
      success: true 
    });
    
  } catch (error) {
    console.error("Update experience error:", error);
    return NextResponse.json(
      { error: "Failed to update experience" }, 
      { status: 500 }
    );
  }
}
