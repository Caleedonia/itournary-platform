'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MainLayout from '../../components/Layout/MainLayout';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic
    console.log("Login attempt with:", { email, password });
    
    // Redirect to dashboard after login
    window.location.href = '/dashboard';
  };
  
  return (
    <MainLayout>
      <div style={{
        display: 'flex',
        minHeight: 'calc(100vh - 200px)',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{
          flex: '1',
          padding: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}>
          <div style={{ maxWidth: '400px', width: '100%' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>Welcome Back</h1>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                  required
                />
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem'
                }}>
                  <label style={{ fontWeight: 500 }}>Password</label>
                  <Link href="/forgot-password" style={{
                    color: 'var(--primary-600)',
                    fontSize: '0.9rem',
                    textDecoration: 'none'
                  }}>
                    Forgot Password?
                  </Link>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                  required
                />
              </div>
              
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: 'var(--primary-600)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Log In
              </button>
            </form>
            
            <div style={{ 
              marginTop: '2rem',
              textAlign: 'center'
            }}>
              Don't have an account?{' '}
              <Link href="/signup" style={{
                color: 'var(--primary-600)',
                textDecoration: 'none',
                fontWeight: 500
              }}>
                Sign up
              </Link>
            </div>
          </div>
        </div>
        
        <div style={{
          flex: '1',
          background: 'url(/images/hero/home-hero.jpg) center center/cover',
          position: 'relative',
          display: 'none', // Hide on mobile
          '@media (min-width: 768px)': {
            display: 'block'
          }
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}>
            <div style={{ color: 'white', maxWidth: '400px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Plan Your Perfect Journey</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                Create personalized travel experiences for weddings, sports tournaments, and more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
