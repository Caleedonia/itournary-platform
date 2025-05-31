'use client';

import React, { useState } from 'react';
import { useGuest } from '../../context/GuestContext';
import styles from './signUp.module.css';

const SignUp: React.FC = () => {
  const { guestData, clearGuestData } = useGuest();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // This would be an API call in production
      console.log('Signing up with:', formData);
      console.log('Guest data to migrate:', guestData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear guest data after successful sign-up
      clearGuestData();
      
      // Redirect to dashboard or onboarding
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Sign-up error:', error);
      setErrors({
        form: 'An error occurred during sign-up. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Create Your Account</h1>
        
        {guestData.draftItinerary && (
          <div className={styles.guestDataAlert}>
            <h2>We've saved your progress!</h2>
            <p>
              Sign up now to save your draft itinerary to your account.
            </p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={errors.name ? styles.inputError : ''}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={errors.email ? styles.inputError : ''}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={errors.password ? styles.inputError : ''}
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={errors.confirmPassword ? styles.inputError : ''}
            />
            {errors.confirmPassword && (
              <span className={styles.error}>{errors.confirmPassword}</span>
            )}
          </div>
          
          {errors.form && <div className={styles.formError}>{errors.form}</div>}
          
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className={styles.loginLink}>
          Already have an account? <a href="/login">Log in</a>
        </div>
      </div>
      
      <div className={styles.benefitsContainer}>
        <h2>Benefits of Creating an Account</h2>
        
        <div className={styles.benefitsList}>
          <div className={styles.benefitItem}>
            <div className={styles.benefitIcon}>💾</div>
            <div className={styles.benefitContent}>
              <h3>Save Your Itineraries</h3>
              <p>Access your travel plans anytime, anywhere, across all your devices.</p>
            </div>
          </div>
          
          <div className={styles.benefitItem}>
            <div className={styles.benefitIcon}>🔍</div>
            <div className={styles.benefitContent}>
              <h3>Personalized Recommendations</h3>
              <p>Get tailored suggestions based on your preferences and past trips.</p>
            </div>
          </div>
          
          <div className={styles.benefitItem}>
            <div className={styles.benefitIcon}>👥</div>
            <div className={styles.benefitContent}>
              <h3>Collaborate with Travel Companions</h3>
              <p>Share and edit itineraries with friends and family.</p>
            </div>
          </div>
          
          <div className={styles.benefitItem}>
            <div className={styles.benefitIcon}>🏆</div>
            <div className={styles.benefitContent}>
              <h3>Access Premium Features</h3>
              <p>Unlock advanced planning tools and exclusive partner offers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
