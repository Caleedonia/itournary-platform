'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGuest } from '../../context/GuestContext';
import styles from './mainNavigation.module.css';

const MainNavigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isGuest } = useGuest();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={styles.mainNavigation}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <img src="/logo.png" alt="iTournary Logo" className={styles.logo} />
        </Link>
      </div>
      
      <button 
        className={styles.mobileMenuButton} 
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <span className={styles.hamburger}></span>
      </button>
      
      <div className={`${styles.navLinks} ${mobileMenuOpen ? styles.mobileOpen : ''}`}>
        <ul>
          <li className={pathname === '/' ? styles.active : ''}>
            <Link href="/">Home</Link>
          </li>
          <li className={pathname?.startsWith('/occasions') ? styles.active : ''}>
            <Link href="/occasions">Occasions</Link>
          </li>
          <li className={pathname?.startsWith('/about') ? styles.active : ''}>
            <Link href="/about">About Us</Link>
          </li>
          <li className={pathname?.startsWith('/contact') ? styles.active : ''}>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      
      <div className={styles.authButtons}>
        {isGuest && (
          <span style={{
            backgroundColor: 'rgba(24, 144, 255, 0.1)',
            color: 'var(--primary-600)',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.8rem',
            marginRight: '1rem'
          }}>
            Guest Mode
          </span>
        )}
        <Link href="/login" className={styles.loginButton}>
          Log In
        </Link>
        <Link href="/signup" className={styles.signupButton}>
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default MainNavigation;
