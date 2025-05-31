"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import ExportModal from '../Export/ExportModal';
import BudgetLoyaltyIntegration from './BudgetLoyaltyIntegration';

interface BudgetItem {
  id: string;
  name: string;
  description?: string;
  estimated: number;
  actual?: number;
  status?: 'planned' | 'booked' | 'paid';
  isSustainable?: boolean;
}

interface BudgetCategory {
  id: string;
  name: string;
  items: BudgetItem[];
}

interface BudgetContainerProps {
  experienceId: string;
  experienceName?: string;
  initialCategories?: BudgetCategory[];
  currency?: string;
}

const BudgetContainer: React.FC<BudgetContainerProps> = ({
  experienceId,
  experienceName = "Untitled Experience",
  initialCategories = [],
  currency = 'USD'
}) => {
  const [categories, setCategories] = useState<BudgetCategory[]>(initialCategories);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user?.id || '';
  
  // Initialize loyalty integration if user is authenticated
  const loyaltyIntegration = session ? 
    BudgetLoyaltyIntegration({ 
      userId, 
      experienceId, 
      experienceName 
    }) : null;

  // Mock data for demonstration
  const mockCategories: BudgetCategory[] = [
    {
      id: '1',
      name: 'Transportation',
      items: [
        {
          id: '101',
          name: 'Flights',
          description: 'Round-trip flights for 2 people',
          estimated: 1200,
          actual: 1350,
          status: 'paid'
        },
        {
          id: '102',
          name: 'Airport transfers',
          estimated: 100,
          status: 'planned'
        },
        {
          id: '103',
          name: 'Car rental',
          estimated: 350,
          actual: 325,
          status: 'booked',
          isSustainable: true
        }
      ]
    },
    {
      id: '2',
      name: 'Accommodation',
      items: [
        {
          id: '201',
          name: 'Hotel - Beach Resort',
          description: '5 nights, ocean view',
          estimated: 1500,
          actual: 1450,
          status: 'paid'
        },
        {
          id: '202',
          name: 'City Hotel',
          description: '2 nights',
          estimated: 400,
          status: 'booked',
          isSustainable: true
        }
      ]
    },
    {
      id: '3',
      name: 'Activities',
      items: [
        {
          id: '301',
          name: 'Guided tour',
          estimated: 200,
          status: 'planned'
        },
        {
          id: '302',
          name: 'Scuba diving',
          estimated: 300,
          status: 'planned'
        }
      ]
    }
  ];

  // If no initial categories were provided, use the mock data
  useEffect(() => {
    if (initialCategories.length === 0 && !isInitialized) {
      setCategories(mockCategories);
      setIsInitialized(true);
    }
  }, [initialCategories.length, isInitialized]);

  // Calculate budget statistics
  const calculateStats = () => {
    let totalEstimated = 0;
    let totalActual = 0;
    let totalPaid = 0;
    
    categories.forEach(category => {
      category.items.forEach(item => {
        totalEstimated += item.estimated;
        if (item.actual) totalActual += item.actual;
        if (item.status === 'paid' && item.actual) totalPaid += item.actual;
        else if (item.status === 'paid') totalPaid += item.estimated;
      });
    });
    
    return {
      totalEstimated,
      totalActual: totalActual || totalEstimated,
      totalPaid,
      remaining: totalEstimated - totalPaid,
      savingsPercentage: totalActual && totalEstimated ? 
        Math.max(0, ((totalEstimated - totalActual) / totalEstimated) * 100) : 0
    };
  };

  const stats = calculateStats();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };
  
  // Function to handle adding a budget item
  const handleAddBudgetItem = async (name: string, categoryId: string, estimated: number) => {
    // Add the item to the budget
    const newItem: BudgetItem = {
      id: Date.now().toString(),
      name,
      estimated,
      status: 'planned',
    };
    
    // Update the categories with the new item
    const updatedCategories = categories.map(category => 
      category.id === categoryId ? 
        { ...category, items: [...category.items, newItem] } : 
        category
    );
    
    setCategories(updatedCategories);
    
    // Award loyalty points if available
    if (loyaltyIntegration) {
      const category = categories.find(c => c.id === categoryId);
      if (category) {
        await loyaltyIntegration.awardBudgetItemPoints(name, category.name);
      }
    }
    
    return newItem;
  };
  
  // Function to handle completing a budget category
  const handleCategoryCompletion = async (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    
    if (category && loyaltyIntegration) {
      await loyaltyIntegration.awardCategoryCompletionPoints(category.name);
    }
  };
  
  // Function to handle sustainable budget choices
  const handleSustainableChoice = async (itemId: string, categoryId: string) => {
    // Find the item and update its sustainable status
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        const updatedItems = category.items.map(item => 
          item.id === itemId ? 
            { ...item, isSustainable: true } : 
            item
        );
        return { ...category, items: updatedItems };
      }
      return category;
    });
    
    setCategories(updatedCategories);
    
    // Find the item name for the points award
    let itemName = '';
    let categoryName = '';
    
    categories.forEach(category => {
      if (category.id === categoryId) {
        categoryName = category.name;
        category.items.forEach(item => {
          if (item.id === itemId) {
            itemName = item.name;
          }
        });
      }
    });
    
    // Award points for sustainable choice
    if (loyaltyIntegration && itemName) {
      await loyaltyIntegration.awardSustainableBudgetChoicePoints(
        itemName, 
        `Made sustainable choice for ${categoryName}`
      );
    }
  };
  
  // Function to check for budget savings and award points
  const checkBudgetSavings = async () => {
    const { savingsPercentage } = stats;
    
    if (savingsPercentage >= 5 && loyaltyIntegration) {
      await loyaltyIntegration.awardBudgetSavingsPoints(savingsPercentage);
      return true;
    }
    return false;
  };
  
  // Add a simple demo button to demonstrate loyalty points
  const demonstrateLoyaltyPoints = async () => {
    if (loyaltyIntegration) {
      // Simulate adding a budget item
      await handleAddBudgetItem('Eco-friendly Transport', '1', 150);
      
      // Simulate marking an item as sustainable
      setTimeout(async () => {
        await handleSustainableChoice('103', '1');
      }, 1500);
      
      // Simulate completing a category
      setTimeout(async () => {
        await handleCategoryCompletion('1');
      }, 3000);
      
      // Simulate checking for budget savings
      setTimeout(async () => {
        await checkBudgetSavings();
      }, 4500);
    } else {
      alert('Please sign in to earn loyalty points!');
    }
  };

  return (
    <div className="budget-container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Budget</h2>
        <div className="flex gap-2">
          {session && (
            <button
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded flex items-center gap-1"
              onClick={demonstrateLoyaltyPoints}
            >
              <span className="text-yellow-200">🏆</span>
              Demo Points
            </button>
          )}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setIsExportModalOpen(true)}
          >
            Export Budget
          </button>
        </div>
      </div>

      {/* Budget Summary */}
      <div className="budget-summary bg-white p-4 rounded shadow mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat">
          <div className="text-gray-600 text-sm">Total Budget</div>
          <div className="font-semibold text-xl">{formatCurrency(stats.totalEstimated)}</div>
        </div>
        <div className="stat">
          <div className="text-gray-600 text-sm">Actual Cost</div>
          <div className="font-semibold text-xl">{formatCurrency(stats.totalActual)}</div>
        </div>
        <div className="stat">
          <div className="text-gray-600 text-sm">Paid</div>
          <div className="font-semibold text-xl">{formatCurrency(stats.totalPaid)}</div>
        </div>
        <div className="stat">
          <div className="text-gray-600 text-sm">Remaining</div>
          <div className="font-semibold text-xl">{formatCurrency(stats.remaining)}</div>
        </div>
      </div>

      {/* Budget Categories */}
      <div className="budget-categories space-y-6">
        {categories.map(category => (
          <div key={category.id} className="category bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold">{category.name}</h3>
              {session && (
                <button 
                  className="text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 px-2 py-1 rounded"
                  onClick={() => handleCategoryCompletion(category.id)}
                >
                  Complete Category
                </button>
              )}
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">Item</th>
                  <th className="py-2">Estimated</th>
                  <th className="py-2">Actual</th>
                  <th className="py-2">Status</th>
                  {session && <th className="py-2 text-center">Eco</th>}
                </tr>
              </thead>
              <tbody>
                {category.items.map(item => (
                  <tr key={item.id} className="border-b">
                    <td className="py-2">
                      <div className="font-medium">{item.name}</div>
                      {item.description && (
                        <div className="text-sm text-gray-600">{item.description}</div>
                      )}
                    </td>
                    <td className="py-2">{formatCurrency(item.estimated)}</td>
                    <td className="py-2">{item.actual ? formatCurrency(item.actual) : '-'}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.status === 'paid' ? 'bg-green-100 text-green-800' : 
                        item.status === 'booked' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    {session && (
                      <td className="py-2 text-center">
                        {item.isSustainable ? (
                          <span className="text-green-500">✓</span>
                        ) : (
                          <button 
                            className="text-xs bg-green-100 hover:bg-green-200 text-green-700 px-2 py-0.5 rounded"
                            onClick={() => handleSustainableChoice(item.id, category.id)}
                          >
                            Mark
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Add item button */}
            <div className="mt-3">
              <button 
                onClick={() => handleAddBudgetItem(`New ${category.name} Item`, category.id, 100)}
                className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded flex items-center gap-1"
              >
                <span>+</span> Add Item
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Export Modal */}
      {isExportModalOpen && (
        <ExportModal
          experienceId={experienceId}
          exportType="budget"
          onClose={() => setIsExportModalOpen(false)}
          experienceName={experienceName}
        />
      )}
      
      {/* Loyalty Info */}
      {session && (
        <div className="mt-6 bg-gradient-to-r from-green-50 to-teal-50 p-3 rounded-lg border border-green-100">
          <p className="text-sm text-teal-800">
            <span className="font-medium">✨ Loyalty Rewards:</span> Earn points by adding budget items, making sustainable choices, and staying under budget.
          </p>
        </div>
      )}
      
      {/* Savings notification */}
      {stats.savingsPercentage > 0 && (
        <div className="mt-4 bg-green-100 p-3 rounded-lg border border-green-200">
          <p className="text-green-800">
            <span className="font-bold">Budget Achievement:</span> You're currently {stats.savingsPercentage.toFixed(1)}% under budget! 
            {stats.savingsPercentage >= 5 && session && (
              <span className="ml-1 text-purple-700">Eligible for loyalty points!</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default BudgetContainer;
