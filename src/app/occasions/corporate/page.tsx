'use client';

import React from 'react';
import Link from 'next/link';
import MainLayout from '../../../components/Layout/MainLayout';

export default function CorporateRetreats() {
  return (
    <MainLayout>
      <div style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Corporate Retreat Planning
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#666', 
          marginBottom: '3rem', 
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Our corporate retreat planning tools will help you organize memorable team-building experiences and company events.
        </p>
        
        <div style={{
          maxWidth: '500px',
          margin: '0 auto',
          padding: '2rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px'
        }}>
          <div style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#0070f3',
            marginBottom: '1rem'
          }}>
            Coming Soon
          </div>
          <p>We're currently developing this feature to enhance your planning experience.</p>
          
          <Link href="/occasions" style={{
            display: 'inline-block',
            marginTop: '2rem',
            color: '#0070f3',
            textDecoration: 'none'
          }}>
            ← Back to All Occasions
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
