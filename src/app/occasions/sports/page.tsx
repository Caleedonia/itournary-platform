'use client';

import React from 'react';
import Link from 'next/link';
import MainLayout from '../../../components/Layout/MainLayout';

export default function SportsTournaments() {
  return (
    <MainLayout>
      <div style={{ padding: '2rem 0' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>
          Sports Tournament Planning
        </h1>
        <p style={{ fontSize: '1.2rem', textAlign: 'center', color: '#666', marginBottom: '3rem' }}>
          Organize your sports tournament with our comprehensive planning tools
        </p>
        
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '2rem' }}>
            Tournament Planning Features
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem' 
          }}>
            <div style={{ 
              backgroundColor: '#fff', 
              borderRadius: '8px', 
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
              padding: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#0070f3' }}>
                Team Management
              </h3>
              <p style={{ color: '#666' }}>
                Easily manage teams, players, and tournament brackets
              </p>
            </div>
            
            <div style={{ 
              backgroundColor: '#fff', 
              borderRadius: '8px', 
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
              padding: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#0070f3' }}>
                Venue Selection
              </h3>
              <p style={{ color: '#666' }}>
                Find and book suitable venues for your tournament
              </p>
            </div>
            
            <div style={{ 
              backgroundColor: '#fff', 
              borderRadius: '8px', 
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
              padding: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#0070f3' }}>
                Travel Coordination
              </h3>
              <p style={{ color: '#666' }}>
                Coordinate travel and accommodation for teams and staff
              </p>
            </div>
            
            <div style={{ 
              backgroundColor: '#fff', 
              borderRadius: '8px', 
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
              padding: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#0070f3' }}>
                Schedule Management
              </h3>
              <p style={{ color: '#666' }}>
                Create and manage tournament schedules and fixtures
              </p>
            </div>
          </div>
        </div>
        
        <div style={{ 
          textAlign: 'center', 
          backgroundColor: '#f5f5f5', 
          padding: '3rem', 
          borderRadius: '8px' 
        }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
            Ready to Get Started?
          </h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            Begin planning your sports tournament today
          </p>
          <Link href="#" style={{ 
            padding: '0.8rem 2rem', 
            fontSize: '1rem', 
            backgroundColor: '#0070f3', 
            color: 'white', 
            borderRadius: '4px', 
            textDecoration: 'none',
            display: 'inline-block'
          }}>
            Create Your Tournament Plan
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
