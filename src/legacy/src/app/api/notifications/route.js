import { NextResponse } from 'next/server';

export async function GET(request) {
  // Parse the URL to get experienceId
  const { searchParams } = new URL(request.url);
  const experienceId = searchParams.get('experienceId');
  
  // Mock collaborators
  const mockCollaborators = [
    {
      id: '1',
      name: 'You (Current User)',
      email: 'you@example.com',
      role: 'Owner',
      avatar: null,
      experienceId: 'mock-exp-1',
    },
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      role: 'Editor',
      avatar: null,
      experienceId: 'mock-exp-1',
    },
    {
      id: '3',
      name: 'John Smith',
      email: 'john@example.com',
      role: 'Viewer',
      avatar: null,
      isPending: true,
      experienceId: 'mock-exp-1',
    },
  ];
  
  // Filter by experienceId if provided
  const filteredCollaborators = experienceId 
    ? mockCollaborators.filter(collaborator => collaborator.experienceId === experienceId) 
    : mockCollaborators;
    
  return NextResponse.json({ collaborators: filteredCollaborators });
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { email, role, experienceId } = data;
    
    // Create a new collaborator
    const newCollaborator = {
      id: Date.now().toString(),
      name: email.split('@')[0],
      email,
      role: role || 'Viewer',
      avatar: null,
      isPending: true,
      experienceId,
    };
    
    return NextResponse.json({ 
      success: true, 
      collaborator: newCollaborator
    });
  } catch (error) {
    console.error('Error adding collaborator:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add collaborator' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing collaborator ID' },
        { status: 400 }
      );
    }
    
    // Mock success response
    return NextResponse.json({ 
      success: true, 
      message: `Collaborator ${id} removed successfully`
    });
  } catch (error) {
    console.error('Error removing collaborator:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to remove collaborator' },
      { status: 500 }
    );
  }
}