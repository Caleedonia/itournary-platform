'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface GuestContextType {
  isGuest: boolean;
  guestData: any;
  saveGuestData: (data: any) => void;
  clearGuestData: () => void;
  promptSignUp: (reason: string) => void;
}

const GuestContext = createContext<GuestContextType | undefined>(undefined);

export const GuestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isGuest, setIsGuest] = useState(true);
  const [guestData, setGuestData] = useState<any>({});
  const [showSignUpPrompt, setShowSignUpPrompt] = useState(false);
  const [signUpPromptReason, setSignUpPromptReason] = useState('');
  const pathname = usePathname();

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsGuest(false);
    }
  }, []);

  // Save guest data to localStorage
  const saveGuestData = (data: any) => {
    const updatedData = { ...guestData, ...data };
    setGuestData(updatedData);
    localStorage.setItem('guest_data', JSON.stringify(updatedData));
  };

  // Clear guest data
  const clearGuestData = () => {
    setGuestData({});
    localStorage.removeItem('guest_data');
  };

  // Prompt user to sign up
  const promptSignUp = (reason: string) => {
    setSignUpPromptReason(reason);
    setShowSignUpPrompt(true);
  };

  // Load guest data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('guest_data');
    if (savedData) {
      try {
        setGuestData(JSON.parse(savedData));
      } catch (e) {
        console.error('Error parsing guest data', e);
        localStorage.removeItem('guest_data');
      }
    }
  }, []);

  return (
    <GuestContext.Provider
      value={{
        isGuest,
        guestData,
        saveGuestData,
        clearGuestData,
        promptSignUp,
      }}
    >
      {children}
      {showSignUpPrompt && (
        <SignUpPrompt
          reason={signUpPromptReason}
          onClose={() => setShowSignUpPrompt(false)}
          onSignUp={() => window.location.href = '/signup'}
        />
      )}
    </GuestContext.Provider>
  );
};

// Sign-up prompt component
const SignUpPrompt: React.FC<{
  reason: string;
  onClose: () => void;
  onSignUp: () => void;
}> = ({ reason, onClose, onSignUp }) => {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        maxWidth: '28rem',
        width: '100%'
      }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          marginBottom: '1rem'
        }}>Create an Account</h2>
        <p style={{marginBottom: '1rem'}}>{reason}</p>
        <p style={{marginBottom: '1.5rem'}}>
          Sign up now to save your progress and unlock all features of iTournary!
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1rem'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #d9d9d9',
              borderRadius: '0.25rem',
              background: 'transparent'
            }}
          >
            Continue as Guest
          </button>
          <button
            onClick={onSignUp}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#1890ff',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

// Custom hook to use the guest context
export const useGuest = () => {
  const context = useContext(GuestContext);
  if (context === undefined) {
    throw new Error('useGuest must be used within a GuestProvider');
  }
  return context;
};
