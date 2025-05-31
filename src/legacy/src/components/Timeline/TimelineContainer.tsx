"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import ExportModal from '../Export/ExportModal';
import TimelineLoyaltyIntegration from './TimelineLoyaltyIntegration';

interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: 'pending' | 'in-progress' | 'completed';
  assignedTo?: string;
}

interface TimelinePhase {
  id: string;
  title: string;
  items: TimelineItem[];
}

interface TimelineContainerProps {
  experienceId: string;
  experienceName?: string;
  initialPhases?: TimelinePhase[];
}

const TimelineContainer: React.FC<TimelineContainerProps> = ({
  experienceId,
  experienceName = "Untitled Experience",
  initialPhases = []
}) => {
  const [phases, setPhases] = useState<TimelinePhase[]>(initialPhases);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user?.id || '';
  
  // Initialize loyalty integration if user is authenticated
  const loyaltyIntegration = session ? 
    TimelineLoyaltyIntegration({ 
      userId, 
      experienceId, 
      experienceName 
    }) : null;

  // Mock data for demonstration
  const mockPhases: TimelinePhase[] = [
    {
      id: '1',
      title: 'Planning Phase',
      items: [
        {
          id: '101',
          title: 'Research destinations',
          description: 'Look into potential destinations that match our interests',
          startDate: '2025-06-01',
          endDate: '2025-06-07',
          status: 'completed',
          assignedTo: 'Jane'
        },
        {
          id: '102',
          title: 'Set budget',
          description: 'Determine overall budget and allocations',
          startDate: '2025-06-08',
          endDate: '2025-06-10',
          status: 'completed',
          assignedTo: 'John'
        }
      ]
    },
    {
      id: '2',
      title: 'Booking Phase',
      items: [
        {
          id: '201',
          title: 'Book flights',
          description: 'Find and book the best flight deals',
          startDate: '2025-06-15',
          endDate: '2025-06-16',
          status: 'in-progress',
          assignedTo: 'Jane'
        },
        {
          id: '202',
          title: 'Reserve accommodation',
          description: 'Book hotels or vacation rentals',
          startDate: '2025-06-17',
          endDate: '2025-06-18',
          status: 'pending',
          assignedTo: 'John'
        }
      ]
    }
  ];

  // If no initial phases were provided, use the mock data
  useEffect(() => {
    if (initialPhases.length === 0 && !isInitialized) {
      setPhases(mockPhases);
      setIsInitialized(true);
    }
  }, [initialPhases.length, isInitialized]);
  
  // Function to handle adding a new timeline item
  const handleAddTimelineItem = async (title: string, phaseId: string) => {
    // Add the item to the timeline
    const newItem: TimelineItem = {
      id: Date.now().toString(),
      title,
      status: 'pending',
    };
    
    // Update the phases with the new item
    const updatedPhases = phases.map(phase => 
      phase.id === phaseId ? 
        { ...phase, items: [...phase.items, newItem] } : 
        phase
    );
    
    setPhases(updatedPhases);
    
    // Award loyalty points if available
    if (loyaltyIntegration) {
      await loyaltyIntegration.awardTimelineItemPoints(title);
    }
    
    return newItem;
  };
  
  // Function to handle completing a timeline item
  const handleCompleteItem = async (itemId: string, phaseId: string) => {
    // Find the item and update its status
    const updatedPhases = phases.map(phase => {
      if (phase.id === phaseId) {
        const updatedItems = phase.items.map(item => 
          item.id === itemId ? 
            { ...item, status: 'completed' } : 
            item
        );
        return { ...phase, items: updatedItems };
      }
      return phase;
    });
    
    setPhases(updatedPhases);
    
    // Check if all items in the phase are completed
    const completedPhase = updatedPhases.find(p => p.id === phaseId);
    const allItemsCompleted = completedPhase?.items.every(item => item.status === 'completed');
    
    // If all items are completed, award phase completion points
    if (allItemsCompleted && loyaltyIntegration && completedPhase) {
      await loyaltyIntegration.awardPhaseCompletionPoints(completedPhase.title);
    }
    
    // Check if all phases are completed
    const allPhasesCompleted = updatedPhases.every(phase => 
      phase.items.every(item => item.status === 'completed')
    );
    
    // If all phases are completed, award experience completion points
    if (allPhasesCompleted && loyaltyIntegration) {
      await loyaltyIntegration.awardExperienceCompletionPoints();
    }
  };
  
  // Function to handle marking an emotional milestone
  const handleEmotionalMilestone = async (itemId: string, emotionType: string) => {
    // Find the item
    let itemName = '';
    phases.forEach(phase => {
      phase.items.forEach(item => {
        if (item.id === itemId) {
          itemName = item.title;
        }
      });
    });
    
    // Award points for documenting an emotional milestone
    if (loyaltyIntegration && itemName) {
      await loyaltyIntegration.awardEmotionalMilestonePoints(itemName, emotionType);
    }
  };
  
  // Add a simple demo button to demonstrate loyalty points
  const demonstrateLoyaltyPoints = async () => {
    if (loyaltyIntegration) {
      // Simulate adding a timeline item
      await handleAddTimelineItem('Visit Local Museum', '1');
      
      // Simulate completing an item
      setTimeout(async () => {
        await handleCompleteItem('101', '1');
      }, 1500);
      
      // Simulate an emotional milestone
      setTimeout(async () => {
        await handleEmotionalMilestone('101', 'excitement');
      }, 3000);
    } else {
      alert('Please sign in to earn loyalty points!');
    }
  };

  return (
    <div className="timeline-container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Timeline</h2>
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
            Export Timeline
          </button>
        </div>
      </div>

      {/* Simple Timeline Display */}
      <div className="timeline-phases space-y-6">
        {phases.map(phase => (
          <div key={phase.id} className="phase bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-3">{phase.title}</h3>
            <div className="phase-items space-y-3">
              {phase.items.map(item => (
                <div key={item.id} className="item border border-gray-200 p-3 rounded">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{item.title}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      item.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  )}
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>
                      {item.startDate && item.endDate ? (
                        <>
                          {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                        </>
                      ) : item.startDate ? (
                        <>From {new Date(item.startDate).toLocaleDateString()}</>
                      ) : item.endDate ? (
                        <>Until {new Date(item.endDate).toLocaleDateString()}</>
                      ) : null}
                    </span>
                    {item.assignedTo && <span>Assigned to: {item.assignedTo}</span>}
                  </div>
                  
                  {/* Item actions including complete */}
                  {item.status !== 'completed' && (
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={() => handleCompleteItem(item.id, phase.id)}
                        className="text-xs bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                      >
                        Mark Complete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Phase actions */}
            <div className="mt-3">
              <button
                onClick={() => handleAddTimelineItem('New Item', phase.id)}
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
          exportType="timeline"
          onClose={() => setIsExportModalOpen(false)}
          experienceName={experienceName}
        />
      )}
      
      {/* Loyalty Info */}
      {session && (
        <div className="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 p-3 rounded-lg border border-purple-100">
          <p className="text-sm text-purple-800">
            <span className="font-medium">✨ Loyalty Rewards:</span> Earn points by adding timeline items, completing phases, and documenting your journey.
          </p>
        </div>
      )}
    </div>
  );
};

export default TimelineContainer;
