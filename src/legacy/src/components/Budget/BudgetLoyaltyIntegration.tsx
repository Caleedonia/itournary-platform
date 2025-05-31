import React from 'react';
import { ActionType } from '@/app/api/loyalty/schema';
import { useLoyaltyIntegration } from '../Loyalty/useLoyaltyIntegration';

// This component integrates loyalty points with Budget features
const BudgetLoyaltyIntegration: React.FC<{
  userId: string;
  experienceId: string;
  experienceName: string;
}> = ({ userId, experienceId, experienceName }) => {
  const { awardPoints } = useLoyaltyIntegration(userId);

  // Function to award points for adding a budget item
  const awardBudgetItemPoints = async (itemName: string, category: string) => {
    return await awardPoints(ActionType.ADD_BUDGET_ITEM, {
      experienceId,
      experienceName,
      itemName,
      category
    });
  };

  // Function to award points for completing a budget category
  const awardCategoryCompletionPoints = async (categoryName: string) => {
    return await awardPoints(ActionType.COMPLETE_CHECKLIST, {
      experienceId,
      experienceName,
      categoryName,
      budgetRelated: true
    });
  };

  // Function to award points for staying under budget
  const awardBudgetSavingsPoints = async (savingsPercentage: number) => {
    // Only award points if savings are significant (e.g., at least 5%)
    if (savingsPercentage >= 5) {
      return await awardPoints(ActionType.COMPLETE_CHECKLIST, {
        experienceId,
        experienceName,
        savingsPercentage,
        budgetSavings: true
      });
    }
    return null;
  };

  // Function to award points for sustainable budget choices
  const awardSustainableBudgetChoicePoints = async (choiceName: string, impactDescription: string) => {
    return await awardPoints(ActionType.SHARE_SUSTAINABILITY_CHOICE, {
      experienceId,
      experienceName,
      choiceName,
      impactDescription,
      budgetRelated: true
    });
  };

  return {
    awardBudgetItemPoints,
    awardCategoryCompletionPoints,
    awardBudgetSavingsPoints,
    awardSustainableBudgetChoicePoints
  };
};

export default BudgetLoyaltyIntegration;
