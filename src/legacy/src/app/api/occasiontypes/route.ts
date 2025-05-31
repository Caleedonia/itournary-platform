import { NextResponse } from 'next/server';

// Mock data for testing
const mockOccasionTypes = [
  {
    _id: "occ-001",
    name: "Destination Weddings",
    slug: { current: "destination-weddings" },
    description: "Plan your dream wedding at a beautiful destination.",
    sortOrder: 1,
    templateDetails: {
      templateChecklistItems: [
        { itemName: "Choose wedding location", itemDescription: "Research and select the perfect destination", defaultItemType: "decision", isCritical: true },
        { itemName: "Book venue", itemDescription: "Secure your wedding venue with a deposit", defaultItemType: "task", isCritical: true },
        { itemName: "Send invitations", itemDescription: "Create and send out wedding invitations", defaultItemType: "task", isCritical: true }
      ],
      sampleTimelineStructure: [
        { phaseName: "12 Months Before", phaseDescription: "Start planning", suggestedDuration: "4 weeks" },
        { phaseName: "6 Months Before", phaseDescription: "Finalize details", suggestedDuration: "4 weeks" },
        { phaseName: "1 Month Before", phaseDescription: "Final preparations", suggestedDuration: "4 weeks" }
      ],
      templateBudgetCategories: [
        { categoryName: "Venue", estimatedCost: "5000", categoryNotes: "Includes rental fee and basic setup" },
        { categoryName: "Catering", estimatedCost: "3000", categoryNotes: "Based on 50 guests" },
        { categoryName: "Photography", estimatedCost: "2000", categoryNotes: "Includes 8 hours of coverage" }
      ]
    }
  },
  {
    _id: "occ-002",
    name: "Corporate Retreats",
    slug: { current: "corporate-retreats" },
    description: "Organize team building and strategic planning retreats.",
    sortOrder: 2,
    templateDetails: {
      templateChecklistItems: [
        { itemName: "Define retreat goals", itemDescription: "Clarify the purpose of the retreat", defaultItemType: "decision", isCritical: true },
        { itemName: "Book meeting spaces", itemDescription: "Secure appropriate venues for meetings", defaultItemType: "task", isCritical: true },
        { itemName: "Plan activities", itemDescription: "Schedule team building activities", defaultItemType: "task", isCritical: false }
      ],
      sampleTimelineStructure: [
        { phaseName: "3 Months Before", phaseDescription: "Initial planning", suggestedDuration: "2 weeks" },
        { phaseName: "1 Month Before", phaseDescription: "Finalize agenda", suggestedDuration: "2 weeks" },
        { phaseName: "1 Week Before", phaseDescription: "Final preparations", suggestedDuration: "1 week" }
      ],
      templateBudgetCategories: [
        { categoryName: "Accommodation", estimatedCost: "4000", categoryNotes: "Based on 10 attendees" },
        { categoryName: "Transportation", estimatedCost: "1500", categoryNotes: "Group transportation" },
        { categoryName: "Meals & Activities", estimatedCost: "2500", categoryNotes: "All meals and team activities" }
      ]
    }
  }
];

export async function GET() {
  try {
    return NextResponse.json(mockOccasionTypes);
  } catch (error) {
    console.error("Occasion types API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch occasion types" }, 
      { status: 500 }
    );
  }
}
