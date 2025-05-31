import React from 'react';
import Link from 'next/link';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerColumn}>
          <h3>iTournary</h3>
          <p>Your complete travel planning platform for all occasions</p>
        </div>
        
        <div className={styles.footerColumn}>
          <h3>Links</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/occasions">Occasions</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        
        <div className={styles.footerColumn}>
          <h3>Contact</h3>
          <p>Email: info@itournary.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} iTournary. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;