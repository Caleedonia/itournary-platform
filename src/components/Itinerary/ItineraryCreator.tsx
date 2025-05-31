'use client';

import React, { useState } from 'react';
import { useGuest } from '../../context/GuestContext';
import styles from './itineraryCreator.module.css';

interface ItineraryData {
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  activities: string[];
  notes: string;
}

const ItineraryCreator: React.FC = () => {
  const { isGuest, saveGuestData, promptSignUp } = useGuest();
  const [itinerary, setItinerary] = useState<ItineraryData>({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    activities: [],
    notes: '',
  });
  const [currentActivity, setCurrentActivity] = useState('');
  const [step, setStep] = useState(1);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setItinerary(prev => ({
      ...prev,
      [name]: name === 'travelers' ? parseInt(value) : value,
    }));
  };

  const handleAddActivity = () => {
    if (currentActivity.trim()) {
      setItinerary(prev => ({
        ...prev,
        activities: [...prev.activities, currentActivity.trim()],
      }));
      setCurrentActivity('');
    }
  };

  const handleRemoveActivity = (index: number) => {
    setItinerary(prev => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    // If user is a guest, prompt to sign up to save
    if (isGuest) {
      // Save to guest storage first
      saveGuestData({ draftItinerary: itinerary });
      
      // Then prompt to sign up
      promptSignUp(
        "To save your itinerary and access it later, you'll need to create an account."
      );
    } else {
      // For logged in users, save to backend
      // This would be an API call in production
      console.log('Saving itinerary:', itinerary);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Your Itinerary</h1>
      
      {step === 1 && (
        <div className={styles.step}>
          <h2>Basic Information</h2>
          <div className={styles.formGroup}>
            <label htmlFor="title">Itinerary Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={itinerary.title}
              onChange={handleChange}
              placeholder="Summer Vacation 2025"
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="destination">Destination</label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={itinerary.destination}
              onChange={handleChange}
              placeholder="Paris, France"
              required
            />
          </div>
          
          <div className={styles.dateContainer}>
            <div className={styles.formGroup}>
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={itinerary.startDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={itinerary.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="travelers">Number of Travelers</label>
            <input
              type="number"
              id="travelers"
              name="travelers"
              value={itinerary.travelers}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          
          <div className={styles.buttonContainer}>
            <button className={styles.nextButton} onClick={nextStep}>
              Next: Activities
            </button>
          </div>
        </div>
      )}
      
      {step === 2 && (
        <div className={styles.step}>
          <h2>Activities</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="activity">Add Activities</label>
            <div className={styles.activityInput}>
              <input
                type="text"
                id="activity"
                value={currentActivity}
                onChange={(e) => setCurrentActivity(e.target.value)}
                placeholder="Visit Eiffel Tower"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddActivity();
                  }
                }}
              />
              <button 
                className={styles.addButton}
                onClick={handleAddActivity}
              >
                Add
              </button>
            </div>
          </div>
          
          <div className={styles.activitiesList}>
            {itinerary.activities.length > 0 ? (
              itinerary.activities.map((activity, index) => (
                <div key={index} className={styles.activityItem}>
                  <span>{activity}</span>
                  <button 
                    className={styles.removeButton}
                    onClick={() => handleRemoveActivity(index)}
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className={styles.emptyMessage}>No activities added yet.</p>
            )}
          </div>
          
          <div className={styles.buttonContainer}>
            <button className={styles.backButton} onClick={prevStep}>
              Back
            </button>
            <button className={styles.nextButton} onClick={nextStep}>
              Next: Notes
            </button>
          </div>
        </div>
      )}
      
      {step === 3 && (
        <div className={styles.step}>
          <h2>Notes</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="notes">Additional Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={itinerary.notes}
              onChange={handleChange}
              placeholder="Any special requirements or preferences..."
              rows={5}
            />
          </div>
          
          <div className={styles.buttonContainer}>
            <button className={styles.backButton} onClick={prevStep}>
              Back
            </button>
            <button className={styles.saveButton} onClick={handleSave}>
              {saved ? 'Saved!' : 'Save Itinerary'}
            </button>
          </div>
          
          {isGuest && (
            <p className={styles.guestNote}>
              Note: As a guest, your itinerary will be stored temporarily. 
              <button 
                className={styles.signUpLink}
                onClick={() => promptSignUp("Create an account to save your itineraries permanently.")}
              >
                Sign up
              </button> to save permanently.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ItineraryCreator;
