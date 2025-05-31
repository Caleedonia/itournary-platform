import React from 'react';
import Link from 'next/link';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <div className={styles.logo}>
              <Link href="/">
                <span className={styles.logoText}>
                  <span className={styles.logoHighlight}>i</span>Tournary
                </span>
              </Link>
            </div>
            <p className={styles.tagline}>
              Plan occasions that matter, create memories that last.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                <i className="fab fa-pinterest-p"></i>
              </a>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerHeading}>Occasions</h3>
            <ul className={styles.footerLinks}>
              <li><Link href="/occasions/weddings">Weddings</Link></li>
              <li><Link href="/occasions/anniversaries">Anniversaries</Link></li>
              <li><Link href="/occasions/family-reunions">Family Reunions</Link></li>
              <li><Link href="/occasions/corporate-retreats">Corporate Retreats</Link></li>
              <li><Link href="/occasions/milestone-birthdays">Milestone Birthdays</Link></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerHeading}>Community</h3>
            <ul className={styles.footerLinks}>
              <li><Link href="/community/stories">Success Stories</Link></li>
              <li><Link href="/community/experts">Travel Experts</Link></li>
              <li><Link href="/community/forum">Discussion Forum</Link></li>
              <li><Link href="/community/events">Community Events</Link></li>
              <li><Link href="/community/contribute">Contribute</Link></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerHeading}>Company</h3>
            <ul className={styles.footerLinks}>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/press">Press</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            &copy; {new Date().getFullYear()} iTournary. All rights reserved.
          </div>
          <div className={styles.legalLinks}>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
