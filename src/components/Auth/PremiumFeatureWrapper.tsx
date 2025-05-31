'use client';

import React, { useState } from 'react';
import { useGuest } from '../../context/GuestContext';
import styles from './premiumFeatureWrapper.module.css';

interface PremiumFeatureWrapperProps {
  children: React.ReactNode;
  featureName: string;
  description: string;
}

const PremiumFeatureWrapper: React.FC<PremiumFeatureWrapperProps> = ({
  children,
  featureName,
  description,
}) => {
  const { isGuest, promptSignUp } = useGuest();
  const [showPreview, setShowPreview] = useState(false);
  
  if (!isGuest) {
    return <>{children}</>;
  }
  
  return (
    <div className={styles.container}>
      {showPreview ? (
        <div className={styles.previewContainer}>
          <div className={styles.previewOverlay}>
            <div className={styles.previewContent}>
              <h3>Preview Mode</h3>
              <p>
                You're viewing a preview of {featureName}. Sign up to access the full feature.
              </p>
              <button
                className={styles.signUpButton}
                onClick={() => promptSignUp(`Sign up to access the full ${featureName} feature.`)}
              >
                Sign Up Now
              </button>
              <button
                className={styles.closeButton}
                onClick={() => setShowPreview(false)}
              >
                Close Preview
              </button>
            </div>
          </div>
          {children}
        </div>
      ) : (
        <div className={styles.lockedFeature}>
          <h3>{featureName}</h3>
          <p>{description}</p>
          <div className={styles.buttonContainer}>
            <button
              className={styles.previewButton}
              onClick={() => setShowPreview(true)}
            >
              Preview Feature
            </button>
            <button
              className={styles.signUpButton}
              onClick={() => promptSignUp(`Sign up to access ${featureName}.`)}
            >
              Sign Up to Access
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumFeatureWrapper;
