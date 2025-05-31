import { NextResponse } from 'next/server';

export async function GET(request) {
  // Parse the URL to get experienceId
  const { searchParams } = new URL(request.url);
  const experienceId = searchParams.get('experienceId');
  
  // Mock activities data with valid userName values
  const mockActivities = [
    {
      id: '1',
      type: 'comment',
      userId: 'user1',
      userName: 'Jane Doe',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      details: {
        itemType: 'timeline',
        itemName: 'Day 1 Schedule',
        message: 'Let\'s add more activities for the morning.'
      }
    },
    {
      id: '2',
      type: 'update',
      userId: 'user2',
      userName: 'John Smith',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      details: {
        itemType: 'budget',
        itemName: 'Accommodation',
        oldValue: '$1200',
        newValue: '$1500'
      }
    },
    {
      id: '3',
      type: 'join',
      userId: 'user3',
      userName: 'Alex Johnson',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      details: {}
    },
  ];
  
  // Filter by experienceId if provided
  const filteredActivities = experienceId 
    ? mockActivities.filter(activity => activity.experienceId === experienceId || !activity.experienceId) 
    : mockActivities;
    
  return NextResponse.json({ activities: filteredActivities });
}
