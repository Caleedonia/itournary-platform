import React, { useState } from 'react';
import styles from './rewardRedemption.module.css';
import { Reward, getPartnerById, calculateSplitTender } from './partnerRewardsData';

interface RewardRedemptionProps {
  reward: Reward;
  currentPoints: number;
  onRedeem: (rewardId: string, pointsUsed: number, cashAmount: number) => Promise<boolean>;
  onCancel: () => void;
}

const RewardRedemption: React.FC<RewardRedemptionProps> = ({
  reward,
  currentPoints,
  onRedeem,
  onCancel
}) => {
  const [redemptionStep, setRedemptionStep] = useState<'confirm' | 'payment' | 'success' | 'error'>('confirm');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Calculate split tender if needed
  const splitTender = calculateSplitTender(reward, currentPoints);
  const needsCashPayment = splitTender.cashRequired > 0;
  
  // Get partner information
  const partner = reward.partnerProvider ? getPartnerById(reward.partnerProvider) : null;
  
  // Handle redemption confirmation
  const handleConfirmRedemption = async () => {
    try {
      setIsProcessing(true);
      
      // If cash payment is needed, move to payment step
      if (needsCashPayment) {
        setRedemptionStep('payment');
        setIsProcessing(false);
        return;
      }
      
      // Otherwise, process the redemption directly
      const success = await onRedeem(reward.rewardId, splitTender.pointsUsed, 0);
      
      if (success) {
        setRedemptionStep('success');
      } else {
        setRedemptionStep('error');
        setErrorMessage('Failed to process redemption. Please try again later.');
      }
    } catch (error) {
      console.error('Error processing redemption:', error);
      setRedemptionStep('error');
      setErrorMessage('An unexpected error occurred. Please try again later.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Handle payment submission
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsProcessing(true);
      
      // Process the redemption with cash payment
      const success = await onRedeem(
        reward.rewardId,
        splitTender.pointsUsed,
        splitTender.cashRequired
      );
      
      if (success) {
        setRedemptionStep('success');
      } else {
        setRedemptionStep('error');
        setErrorMessage('Failed to process payment. Please try again later.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setRedemptionStep('error');
      setErrorMessage('An unexpected error occurred during payment. Please try again later.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className={styles.redemptionContainer}>
      {redemptionStep === 'confirm' && (
        <div className={styles.confirmStep}>
          <h2>Confirm Reward Redemption</h2>
          
          <div className={styles.rewardSummary}>
            <div className={styles.rewardImage}>
              {/* In a real implementation, this would be an actual image */}
              <div className={styles.rewardImagePlaceholder}></div>
            </div>
            
            <div className={styles.rewardDetails}>
              <h3>{reward.title}</h3>
              
              {partner && (
                <div className={styles.partnerInfo}>
                  Provided by {partner.partnerName}
                </div>
              )}
              
              <p className={styles.rewardDescription}>{reward.description}</p>
              
              <div className={styles.pointsInfo}>
                <div className={styles.pointsCost}>
                  <span className={styles.pointsLabel}>Points Required:</span>
                  <span className={styles.pointsValue}>{reward.pointsCost}</span>
                </div>
                
                <div className={styles.pointsBalance}>
                  <span className={styles.pointsLabel}>Your Points:</span>
                  <span className={styles.pointsValue}>{currentPoints}</span>
                </div>
              </div>
              
              {needsCashPayment && (
                <div className={styles.splitTenderInfo}>
                  <div className={styles.splitTenderAlert}>
                    <span className={styles.alertIcon}>⚠️</span>
                    <span>You don't have enough points for this reward.</span>
                  </div>
                  
                  <div className={styles.splitTenderBreakdown}>
                    <div className={styles.splitTenderItem}>
                      <span>Points to be used:</span>
                      <span>{splitTender.pointsUsed}</span>
                    </div>
                    <div className={styles.splitTenderItem}>
                      <span>Additional payment required:</span>
                      <span>${splitTender.cashRequired.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className={styles.termsAndConditions}>
            <h4>Terms and Conditions</h4>
            <p>
              By redeeming this reward, you agree to the following terms:
            </p>
            <ul>
              <li>Rewards are subject to availability and may change without notice.</li>
              <li>Points will be deducted from your account immediately upon redemption.</li>
              <li>Redemption confirmations will be sent to your registered email address.</li>
              <li>Cancellation policies vary by reward type and partner.</li>
              {needsCashPayment && (
                <li>Split tender payments are processed securely and subject to our payment terms.</li>
              )}
            </ul>
          </div>
          
          <div className={styles.actionButtons}>
            <button
              className={styles.cancelButton}
              onClick={onCancel}
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              className={styles.confirmButton}
              onClick={handleConfirmRedemption}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : needsCashPayment ? 'Continue to Payment' : 'Confirm Redemption'}
            </button>
          </div>
        </div>
      )}
      
      {redemptionStep === 'payment' && (
        <div className={styles.paymentStep}>
          <h2>Complete Your Redemption</h2>
          
          <div className={styles.paymentSummary}>
            <div className={styles.paymentDetails}>
              <div className={styles.paymentItem}>
                <span>Reward:</span>
                <span>{reward.title}</span>
              </div>
              <div className={styles.paymentItem}>
                <span>Points to be used:</span>
                <span>{splitTender.pointsUsed}</span>
              </div>
              <div className={styles.paymentItem}>
                <span>Additional payment:</span>
                <span className={styles.cashAmount}>${splitTender.cashRequired.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <form className={styles.paymentForm} onSubmit={handlePaymentSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="cardName">Name on Card</label>
              <input
                type="text"
                id="cardName"
                placeholder="John Smith"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                required
                pattern="[0-9\s]{13,19}"
                maxLength={19}
              />
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  placeholder="MM/YY"
                  required
                  pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                  maxLength={5}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  placeholder="123"
                  required
                  pattern="[0-9]{3,4}"
                  maxLength={4}
                />
              </div>
            </div>
            
            <div className={styles.actionButtons}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={onCancel}
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.confirmButton}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : `Pay $${splitTender.cashRequired.toFixed(2)} & Redeem`}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {redemptionStep === 'success' && (
        <div className={styles.successStep}>
          <div className={styles.successIcon}>✓</div>
          <h2>Redemption Successful!</h2>
          
          <div className={styles.successMessage}>
            <p>
              Congratulations! You have successfully redeemed <strong>{reward.title}</strong>.
            </p>
            <p>
              A confirmation has been sent to your email with all the details and instructions.
            </p>
            {splitTender.cashRequired > 0 && (
              <p>
                Your payment of ${splitTender.cashRequired.toFixed(2)} has been processed successfully.
              </p>
            )}
          </div>
          
          <div className={styles.pointsSummary}>
            <div className={styles.pointsUsed}>
              <span className={styles.pointsLabel}>Points Used:</span>
              <span className={styles.pointsValue}>-{splitTender.pointsUsed}</span>
            </div>
            <div className={styles.pointsRemaining}>
              <span className={styles.pointsLabel}>Points Remaining:</span>
              <span className={styles.pointsValue}>{currentPoints - splitTender.pointsUsed}</span>
            </div>
          </div>
          
          <button
            className={styles.doneButton}
            onClick={onCancel}
          >
            Done
          </button>
        </div>
      )}
      
      {redemptionStep === 'error' && (
        <div className={styles.errorStep}>
          <div className={styles.errorIcon}>✗</div>
          <h2>Redemption Failed</h2>
          
          <div className={styles.errorMessage}>
            <p>{errorMessage}</p>
            <p>
              Your points have not been deducted. Please try again or contact customer support if the problem persists.
            </p>
          </div>
          
          <div className={styles.actionButtons}>
            <button
              className={styles.cancelButton}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className={styles.retryButton}
              onClick={() => setRedemptionStep('confirm')}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardRedemption;
