import React, { useState } from 'react';
import Link from 'next/link';
import styles from './header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <span className={styles.logoText}>
              <span className={styles.logoHighlight}>i</span>Tournary
            </span>
          </Link>
        </div>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/occasions" className={styles.navLink}>
                Occasions
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/community" className={styles.navLink}>
                Community
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/experts" className={styles.navLink}>
                Experts
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/about" className={styles.navLink}>
                About
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link href="/login" className={styles.loginButton}>
            Log In
          </Link>
          <Link href="/signup" className={styles.signupButton}>
            Sign Up
          </Link>
        </div>

        <button 
          className={`${styles.menuToggle} ${isMenuOpen ? styles.menuOpen : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.menuBar}></span>
          <span className={styles.menuBar}></span>
          <span className={styles.menuBar}></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
