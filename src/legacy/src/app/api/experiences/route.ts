import { NextResponse } from 'next/server';

// Use a simple array that persists during the server session
let mockExperiences = [
  {
    _id: "mock-exp-1",
    experienceName: "Sample Destination Wedding",
    occasionTypeName: "Destination Weddings",
    destination: "Cancun, Mexico",
    startDate: new Date(2025, 7, 15).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "mock-exp-2",
    experienceName: "Team Building Retreat",
    occasionTypeName: "Corporate Retreats",
    destination: "Lake Tahoe, USA",
    startDate: new Date(2025, 9, 10).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// GET handler for listing experiences
export async function GET() {
  try {
    return NextResponse.json({ 
      experiences: mockExperiences,
      success: true 
    });
  } catch (error) {
    console.error("Experiences API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch experiences" }, 
      { status: 500 }
    );
  }
}

// POST handler for creating experiences
export async function POST(request) {
  try {
    const data = await request.json();
    
    // Create a mock experience with the submitted data
    const newExperience = {
      _id: `mock-exp-${Date.now()}`,
      experienceName: data.experienceName || "Untitled Experience",
      occasionTypeName: data.occasionTypeName || "General Experience",
      destination: data.destination || undefined,
      startDate: data.startDate || undefined,
      endDate: data.endDate || undefined,
      notes: data.notes || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Add to our mock experiences
    mockExperiences.push(newExperience);
    
    return NextResponse.json({ 
      experience: newExperience,
      success: true 
    }, { status: 201 });
    
  } catch (error) {
    console.error("Create experience error:", error);
    return NextResponse.json(
      { error: "Failed to create experience" }, 
      { status: 500 }
    );
  }
}
