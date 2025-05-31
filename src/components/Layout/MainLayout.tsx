import React from 'react';
import MainNavigation from '../Navigation/MainNavigation';
import Footer from '../Footer/Footer';
import styles from './mainLayout.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={styles.layoutContainer}>
      <MainNavigation />
      <main className={styles.mainContent}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;