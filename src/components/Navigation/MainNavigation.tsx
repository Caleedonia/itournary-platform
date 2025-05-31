'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './mainNavigation.module.css';

const MainNavigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
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