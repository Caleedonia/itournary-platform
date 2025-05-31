import { NextResponse } from 'next/server';

export async function GET(request) {
  // Parse the URL to get query parameters
  const { searchParams } = new URL(request.url);
  const experienceId = searchParams.get('experienceId');
  const objectId = searchParams.get('objectId');
  const objectType = searchParams.get('objectType');
  
  // Mock comments data
  const mockComments = [
    {
      id: '1',
      userId: 'user1',
      userName: 'Jane Doe',
      content: 'This looks good! Let\'s add more details to the budget section.',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      experienceId: 'mock-exp-1',
      replies: [
        {
          id: '1-1',
          userId: 'user2',
          userName: 'John Smith',
          content: 'I agree. We should break down the accommodation costs further.',
          timestamp: new Date(Date.now() - 1800000).toISOString(),
        }
      ]
    },
    {
      id: '2',
      userId: 'user3',
      userName: 'Alex Johnson',
      content: 'When are we planning to finalize the itinerary?',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      experienceId: 'mock-exp-1',
    },
  ];
  
  // Filter comments based on query parameters
  let filteredComments = [...mockComments];
  
  if (experienceId) {
    filteredComments = filteredComments.filter(comment => 
      comment.experienceId === experienceId || !comment.experienceId);
  }
  
  if (objectId && objectType) {
    filteredComments = filteredComments.filter(comment => 
      comment.objectId === objectId && comment.objectType === objectType);
  }
  
  return NextResponse.json({ comments: filteredComments });
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { experienceId, objectId, objectType, content, parentId } = data;
    
    // Create a new comment/reply
    const newComment = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'Current User',
      content,
      timestamp: new Date().toISOString(),
      experienceId,
      objectId,
      objectType,
    };
    
    // Return the created comment
    return NextResponse.json({ 
      success: true, 
      comment: newComment
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}
