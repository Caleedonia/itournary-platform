'use client';

import React from 'react';
import MainLayout from '../../../../components/Layout/MainLayout';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function TripDetails({ params }: { params: { tripId: string } }) {
  const pathname = usePathname();
  const tripId = params.tripId;

  // This would fetch real trip data in production
  const tripData = {
    id: tripId,
    title: `Trip #${tripId}`,
    destination: 'Sample Destination',
    startDate: '2023-06-01',
    endDate: '2023-06-07',
    travelers: 2,
    activities: ['Sightseeing', 'Beach day', 'Local cuisine tour'],
    notes: 'This is a sample trip for demonstration purposes.'
  };

  return (
    <MainLayout>
      <div style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/dashboard" style={{ color: 'var(--primary-600)' }}>
            &larr; Back to Dashboard
          </Link>
        </div>

        <h1 style={{ marginBottom: '1.5rem' }}>{tripData.title}</h1>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            padding: '1.5rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px'
          }}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Trip Details</h2>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Destination:</strong> {tripData.destination}
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Dates:</strong> {tripData.startDate} to {tripData.endDate}
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Travelers:</strong> {tripData.travelers}
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Notes:</strong> {tripData.notes}
            </div>
          </div>
          
          <div style={{
            padding: '1.5rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px'
          }}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Activities</h2>
            <ul>
              {tripData.activities.map((activity, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>{activity}</li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'flex-end'
        }}>
          <button style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--primary-600)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Edit Trip
          </button>
          <button style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'white',
            color: 'var(--primary-600)',
            border: '1px solid var(--primary-600)',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Share Trip
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
