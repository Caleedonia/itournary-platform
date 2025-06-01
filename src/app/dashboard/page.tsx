'use client';

import React from 'react';
import Link from 'next/link';
import MainLayout from '../../components/Layout/MainLayout';
import { useGuest } from '../../context/GuestContext';

export default function Dashboard() {
  const { isGuest, promptSignUp } = useGuest();
  
  // Sample trip data
  const trips = [
    { id: 1, title: 'Summer Vacation', destination: 'Bali, Indonesia', startDate: '2023-07-15', endDate: '2023-07-25' },
    { id: 2, title: 'Weekend Getaway', destination: 'Miami, FL', startDate: '2023-08-05', endDate: '2023-08-07' },
  ];

  return (
    <MainLayout>
      <div style={{ padding: '2rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1>My Trips</h1>
          <Link href="/create-itinerary" style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--primary-600)',
            color: 'white',
            borderRadius: '4px',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center'
          }}>
            Create New Trip
          </Link>
        </div>
        
        {isGuest && (
          <div style={{
            backgroundColor: 'rgba(24, 144, 255, 0.1)',
            border: '1px solid var(--primary-300)',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '2rem'
          }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Guest Mode</h2>
            <p style={{ marginBottom: '1rem' }}>You're currently in guest mode. Trip data will only be stored locally.</p>
            <button 
              onClick={() => promptSignUp("Create an account to save trips permanently and access all features.")}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--primary-600)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Sign Up to Save Your Trips
            </button>
          </div>
        )}
        
        {trips.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {trips.map(trip => (
              <Link 
                key={trip.id} 
                href={`/dashboard/trip/${trip.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  padding: '1.5rem',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}>
                  <h2 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{trip.title}</h2>
                  <p style={{ color: '#666', marginBottom: '1rem' }}>{trip.destination}</p>
                  <div style={{ fontSize: '0.9rem', color: '#888' }}>
                    {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>No trips yet</h2>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              Create your first trip to get started with iTournary!
            </p>
            <Link href="/create-itinerary" style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--primary-600)',
              color: 'white',
              borderRadius: '4px',
              textDecoration: 'none'
            }}>
              Create New Trip
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
