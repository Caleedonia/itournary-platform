"use client";

import React, { useState } from 'react';
import styles from './itineraryEditor.module.css';

interface Itinerary {
  title: string;
  destination: string;
  duration: string;
  overview: string;
  days: {
    day: number;
    title: string;
    activities: string[];
  }[];
  tips: string[];
}

interface ItineraryEditorProps {
  itinerary: Itinerary;
  onSave: (itinerary: Itinerary) => void;
}

const ItineraryEditor: React.FC<ItineraryEditorProps> = ({ itinerary, onSave }) => {
  const [editedItinerary, setEditedItinerary] = useState<Itinerary>(itinerary);

  const handleInputChange = (field: keyof Itinerary, value: string) => {
    setEditedItinerary({
      ...editedItinerary,
      [field]: value,
    });
  };

  const handleDayTitleChange = (dayIndex: number, value: string) => {
    const updatedDays = [...editedItinerary.days];
    updatedDays[dayIndex] = {
      ...updatedDays[dayIndex],
      title: value,
    };

    setEditedItinerary({
      ...editedItinerary,
      days: updatedDays,
    });
  };

  const handleActivityChange = (dayIndex: number, activityIndex: number, value: string) => {
    const updatedDays = [...editedItinerary.days];
    const updatedActivities = [...updatedDays[dayIndex].activities];
    updatedActivities[activityIndex] = value;

    updatedDays[dayIndex] = {
      ...updatedDays[dayIndex],
      activities: updatedActivities,
    };

    setEditedItinerary({
      ...editedItinerary,
      days: updatedDays,
    });
  };

  const handleTipChange = (tipIndex: number, value: string) => {
    const updatedTips = [...editedItinerary.tips];
    updatedTips[tipIndex] = value;

    setEditedItinerary({
      ...editedItinerary,
      tips: updatedTips,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedItinerary);
  };

  return (
    <div className={styles.editorContainer}>
      <h2>Edit Your Itinerary</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Title:</label>
          <input
            type="text"
            value={editedItinerary.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Destination:</label>
          <input
            type="text"
            value={editedItinerary.destination}
            onChange={(e) => handleInputChange('destination', e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Duration:</label>
          <input
            type="text"
            value={editedItinerary.duration}
            onChange={(e) => handleInputChange('duration', e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Overview:</label>
          <textarea
            value={editedItinerary.overview}
            onChange={(e) => handleInputChange('overview', e.target.value)}
          />
        </div>

        <h3>Daily Schedule</h3>
        {editedItinerary.days.map((day, dayIndex) => (
          <div key={dayIndex} className={styles.daySection}>
            <h4>Day {day.day}</h4>
            <div className={styles.formGroup}>
              <label>Title:</label>
              <input
                type="text"
                value={day.title}
                onChange={(e) => handleDayTitleChange(dayIndex, e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Activities:</label>
              {day.activities.map((activity, activityIndex) => (
                <input
                  key={activityIndex}
                  type="text"
                  value={activity}
                  onChange={(e) => handleActivityChange(dayIndex, activityIndex, e.target.value)}
                />
              ))}
            </div>
          </div>
        ))}

        <h3>Travel Tips</h3>
        <div className={styles.formGroup}>
          {editedItinerary.tips.map((tip, tipIndex) => (
            <input
              key={tipIndex}
              type="text"
              value={tip}
              onChange={(e) => handleTipChange(tipIndex, e.target.value)}
            />
          ))}
        </div>

        <button type="submit" className={styles.saveButton}>
          Save Itinerary
        </button>
      </form>
    </div>
  );
};

export default ItineraryEditor;
