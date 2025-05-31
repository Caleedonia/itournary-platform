import React, { useEffect } from 'react';
import { ActionType } from '@/app/api/loyalty/schema';

// This hook integrates loyalty points with any component
export const useLoyaltyIntegration = (userId: string) => {
  // Function to award points for user actions
  const awardPoints = async (
    actionType: ActionType,
    metadata: Record<string, any> = {}
  ) => {
    try {
      const response = await fetch('/api/loyalty/points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          actionType,
          metadata,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Show a non-intrusive notification
        showPointsNotification(data.transaction.totalPoints, data.transaction.description);
        return data;
      } else {
        console.error('Failed to award points:', data.error);
        return null;
      }
    } catch (error) {
      console.error('Error awarding points:', error);
      return null;
    }
  };

  // Function to show a points notification
  const showPointsNotification = (points: number, description: string) => {
    // Create a notification element
    const notification = document.createElement('div');
    notification.className = 'loyalty-points-notification';
    notification.innerHTML = `
      <div class="loyalty-points-icon">+${points}</div>
      <div class="loyalty-points-text">${description}</div>
    `;

    // Add styles
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'rgba(46, 204, 113, 0.9)';
    notification.style.color = 'white';
    notification.style.padding = '12px 16px';
    notification.style.borderRadius = '8px';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.gap = '10px';
    notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    notification.style.zIndex = '9999';
    notification.style.transition = 'all 0.3s ease';
    notification.style.transform = 'translateY(100px)';
    notification.style.opacity = '0';

    // Style the points icon
    const pointsIcon = notification.querySelector('.loyalty-points-icon');
    if (pointsIcon) {
      pointsIcon.setAttribute('style', `
        font-weight: bold;
        font-size: 1.2rem;
      `);
    }

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateY(0)';
      notification.style.opacity = '1';
    }, 10);

    // Remove after delay
    setTimeout(() => {
      notification.style.transform = 'translateY(100px)';
      notification.style.opacity = '0';
      
      // Remove from DOM after animation completes
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  // Function to check tier eligibility
  const checkTierEligibility = async () => {
    try {
      const response = await fetch(`/api/loyalty/tiers?userId=${userId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking tier eligibility:', error);
      return null;
    }
  };

  // Function to upgrade tier if eligible
  const upgradeTier = async () => {
    try {
      const response = await fetch('/api/loyalty/tiers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          action: 'upgrade',
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error upgrading tier:', error);
      return null;
    }
  };

  // Check tier eligibility on mount and after point transactions
  useEffect(() => {
    const checkEligibility = async () => {
      const eligibility = await checkTierEligibility();
      if (eligibility?.isEligible) {
        // Auto-upgrade or notify user they're eligible
        // For this implementation, we'll auto-upgrade
        await upgradeTier();
      }
    };

    checkEligibility();
  }, [userId]);

  return {
    awardPoints,
    checkTierEligibility,
    upgradeTier,
  };
};

export default useLoyaltyIntegration;
