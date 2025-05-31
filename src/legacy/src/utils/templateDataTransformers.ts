import { OccasionTemplate, ChecklistItem, TimelinePhase, BudgetCategory } from '@/types/templates';

/**
 * Transforms occasion types data to include template information
 * @param occasionTypes Array of occasion types from API
 * @returns Enhanced occasion types with template information
 */
export const enhanceOccasionTypesWithTemplates = (occasionTypes: any[]): Array<{
  _id: string;
  name: string;
  description?: string;
  template?: OccasionTemplate;
}> => {
  return occasionTypes.map(ot => {
    // Check if this occasion type has template details
    if (ot.templateDetails) {
      const { templateChecklistItems, sampleTimelineStructure, templateBudgetCategories } = ot.templateDetails;
      
      // Create template object if template details exist
      const template: OccasionTemplate = {
        id: `template-${ot._id}`,
        name: `${ot.name} Template`,
        slug: ot.slug?.current || ot._id,
        description: ot.templateDetails.introduction || `Planning template for ${ot.name}`,
        image: `/images/templates/${ot.slug?.current || 'default'}.jpg`,
        checklistItemCount: templateChecklistItems?.length || 0,
        timelinePhaseCount: sampleTimelineStructure?.length || 0,
        budgetCategoryCount: templateBudgetCategories?.length || 0,
        popularityScore: Math.floor(Math.random() * 10) + 1, // Mock data
        isFeatured: Math.random() > 0.7, // Mock data
        estimatedTimeSavings: '5-10 hours',
        expertCurated: true,
        successCount: Math.floor(Math.random() * 100) + 50, // Mock data
        
        // Detailed content
        checklistItems: templateChecklistItems,
        timelinePhases: sampleTimelineStructure,
        budgetCategories: templateBudgetCategories
      };
      
      return {
        ...ot,
        template
      };
    }
    
    // Return occasion type without template if no template details
    return ot;
  });
};

/**
 * Transforms template items into experience items for API submission
 * @param template The template to transform
 * @returns Array of experience items ready for API
 */
export const transformTemplateToExperienceItems = (template: OccasionTemplate) => {
  const items = [];
  
  // Transform checklist items
  if (template.checklistItems && template.checklistItems.length > 0) {
    template.checklistItems.forEach(item => {
      items.push({
        itemType: "note",
        name: item.taskName,
        description: `${item.description || ""}${item.category ? ` (Category: ${item.category})` : ""}`,
        status: item.isCompleted ? "confirmed" : "planned",
        isTemplateItem: true
      });
    });
  }
  
  // Transform timeline phases
  if (template.timelinePhases && template.timelinePhases.length > 0) {
    template.timelinePhases.forEach(phase => {
      items.push({
        itemType: "note",
        name: phase.phaseName,
        description: `${phase.description || ""}${phase.tasks.length > 0 ? `\nTasks: ${phase.tasks.join(", ")}` : ""}`,
        status: "planned",
        isTemplateItem: true
      });
    });
  }
  
  // Transform budget categories
  if (template.budgetCategories && template.budgetCategories.length > 0) {
    template.budgetCategories.forEach(category => {
      items.push({
        itemType: "note",
        name: `Budget: ${category.categoryName}`,
        description: `${category.notes || ""}${category.estimatedPercentage ? ` (Est. ${category.estimatedPercentage}%)` : ""}`,
        status: "planned",
        isTemplateItem: true
      });
    });
  }
  
  return items;
};

/**
 * Creates mock template data for development and testing
 * @returns Array of mock templates
 */
export const createMockTemplates = (): OccasionTemplate[] => {
  return [
    {
      id: "template-destination-wedding",
      name: "Destination Wedding",
      slug: "destination-wedding",
      description: "Plan your dream destination wedding with our comprehensive template covering all aspects from venue selection to guest accommodations.",
      image: "/images/templates/destination-wedding.jpg",
      checklistItemCount: 15,
      timelinePhaseCount: 5,
      budgetCategoryCount: 8,
      popularityScore: 9,
      isFeatured: true,
      estimatedTimeSavings: "10-15 hours",
      expertCurated: true,
      successCount: 120,
      
      checklistItems: [
        { _key: "dw_chk1", taskName: "Set Wedding Budget", description: "Determine your overall budget and allocations", category: "Finance", isCompleted: false },
        { _key: "dw_chk2", taskName: "Choose Destination & Venue", description: "Research and select your dream location", category: "Venue", isCompleted: false },
        { _key: "dw_chk3", taskName: "Book Accommodations", description: "Reserve room blocks for guests", category: "Logistics", isCompleted: false },
        { _key: "dw_chk4", taskName: "Hire Wedding Planner", description: "Find a planner with destination experience", category: "Vendors", isCompleted: false },
        { _key: "dw_chk5", taskName: "Send Save-the-Dates", description: "Give guests plenty of advance notice", category: "Communication", isCompleted: false }
      ],
      
      timelinePhases: [
        { 
          _key: "dw_time1", 
          phaseName: "12-18 Months Before", 
          durationEstimate: "6 months",
          tasks: ["Set budget", "Choose destination", "Book venue", "Secure wedding date"] 
        },
        { 
          _key: "dw_time2", 
          phaseName: "9-12 Months Before", 
          durationEstimate: "3 months",
          tasks: ["Book accommodations", "Hire planner", "Send save-the-dates"] 
        },
        { 
          _key: "dw_time3", 
          phaseName: "6-9 Months Before", 
          durationEstimate: "3 months",
          tasks: ["Book photographer", "Choose attire", "Plan welcome events"] 
        }
      ],
      
      budgetCategories: [
        { _key: "dw_bud1", categoryName: "Venue & Ceremony", estimatedPercentage: 40, notes: "Includes venue rental, ceremony setup, and decor" },
        { _key: "dw_bud2", categoryName: "Food & Beverage", estimatedPercentage: 25, notes: "Includes reception dinner, welcome party, and farewell brunch" },
        { _key: "dw_bud3", categoryName: "Travel & Accommodations", estimatedPercentage: 15, notes: "For wedding couple and wedding party" }
      ]
    },
    
    {
      id: "template-corporate-retreat",
      name: "Corporate Retreat",
      slug: "corporate-retreat",
      description: "Organize a productive and engaging corporate retreat that balances team building, strategic planning, and relaxation.",
      image: "/images/templates/corporate-retreat.jpg",
      checklistItemCount: 12,
      timelinePhaseCount: 4,
      budgetCategoryCount: 6,
      popularityScore: 8,
      isFeatured: false,
      estimatedTimeSavings: "8-12 hours",
      expertCurated: true,
      successCount: 85,
      
      checklistItems: [
        { _key: "cr_chk1", taskName: "Define Retreat Objectives", description: "Clarify goals and expected outcomes", category: "Planning", isCompleted: false },
        { _key: "cr_chk2", taskName: "Select Venue & Location", description: "Find a location that matches your objectives", category: "Venue", isCompleted: false },
        { _key: "cr_chk3", taskName: "Plan Agenda & Activities", description: "Balance work sessions with team building", category: "Programming", isCompleted: false }
      ],
      
      timelinePhases: [
        { 
          _key: "cr_time1", 
          phaseName: "3-4 Months Before", 
          durationEstimate: "4-6 weeks",
          tasks: ["Set objectives", "Determine budget", "Research venues"] 
        },
        { 
          _key: "cr_time2", 
          phaseName: "2-3 Months Before", 
          durationEstimate: "4 weeks",
          tasks: ["Book venue", "Plan agenda", "Arrange transportation"] 
        }
      ],
      
      budgetCategories: [
        { _key: "cr_bud1", categoryName: "Venue & Accommodations", estimatedPercentage: 45, notes: "Includes meeting spaces and guest rooms" },
        { _key: "cr_bud2", categoryName: "Food & Beverage", estimatedPercentage: 20, notes: "All meals and refreshments" },
        { _key: "cr_bud3", categoryName: "Activities & Team Building", estimatedPercentage: 15, notes: "Facilitated sessions and experiences" }
      ]
    }
  ];
};
