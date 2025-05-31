import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Loyalty API is working',
    status: 'success',
    timestamp: new Date().toISOString()
  });
}
