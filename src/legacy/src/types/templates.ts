export interface ChecklistItem {
  _key: string;
  taskName: string;
  description?: string;
  category?: string;
  isCompleted: boolean;
}

export interface TimelinePhase {
  _key: string;
  phaseName: string;
  description?: string;
  durationEstimate?: string;
  tasks: string[];
}

export interface BudgetCategory {
  _key: string;
  categoryName: string;
  estimatedPercentage?: number;
  notes?: string;
}

export interface OccasionTemplate {
  id: string;
  name: string;
  slug?: string;
  description: string;
  image?: string;
  checklistItemCount: number;
  timelinePhaseCount: number;
  budgetCategoryCount: number;
  popularityScore: number;
  isFeatured: boolean;
  estimatedTimeSavings?: string;
  expertCurated?: boolean;
  successCount?: number;
  
  // Detailed content for preview
  checklistItems?: ChecklistItem[];
  timelinePhases?: TimelinePhase[];
  budgetCategories?: BudgetCategory[];
}
