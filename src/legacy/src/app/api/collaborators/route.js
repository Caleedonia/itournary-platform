import { NextResponse } from 'next/server';

export async function GET(request) {
  const mockCollaborators = [
    {
      id: '1',
      name: 'Jane Doe',
      email: 'jane@example.com',
      role: 'Editor',
      avatar: null,
    },
    {
      id: '2',
      name: 'John Smith',
      email: 'john@example.com',
      role: 'Viewer',
      avatar: null,
    },
  ];
  
  return NextResponse.json({ collaborators: mockCollaborators });
}

export async function POST(request) {
  const data = await request.json();
  return NextResponse.json({ success: true, collaborator: { ...data, id: Date.now().toString() } });
}
