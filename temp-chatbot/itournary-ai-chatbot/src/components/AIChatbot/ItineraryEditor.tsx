import React, { useState, useEffect } from 'react';
import styles from './itineraryEditor.module.css';

interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  duration: number;
  type: string;
  price: number;
  booked: boolean;
}

interface Day {
  day: number;
  date: string;
  title: string;
  description: string;
  activities: Activity[];
}

interface Accommodation {
  name: string;
  location: string;
  type: string;
  rating: number;
  pricePerNight: number;
  totalPrice: number;
  amenities: string[];
  image: string;
}

interface Transportation {
  arrival: {
    type: string;
    from: string;
    to: string;
    date: string;
    time: string;
    details: string;
  };
  departure: {
    type: string;
    from: string;
    to: string;
    date: string;
    time: string;
    details: string;
  };
  local: {
    type: string;
    description: string;
    pricePerDay: number;
    totalPrice: number;
  }[];
}

interface Budget {
  accommodation: number;
  transportation: number;
  activities: number;
  food: number;
  miscellaneous: number;
  total: number;
}

interface Itinerary {
  id: string;
  conversationId: string;
  title: string;
  destination: string;
  duration: number;
  travelers: number;
  budget: string;
  createdAt: Date;
  days: Day[];
  accommodation: Accommodation;
  transportation: Transportation;
  budget: Budget;
  notes: string[];
}

interface ItineraryEditorProps {
  itineraryId: string;
  onSave?: (itinerary: Itinerary) => void;
  onBack?: () => void;
}

const ItineraryEditor: React.FC<ItineraryEditorProps> = ({ 
  itineraryId, 
  onSave,
  onBack
}) => {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState(1);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        // In a real implementation, this would fetch from your API
        const response = await fetch(`/api/chatbot/itinerary?id=${itineraryId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch itinerary');
        }
        
        const data = await response.json();
        setItinerary(data.itinerary);
      } catch (err) {
        setError('Error loading itinerary. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchItinerary();
  }, [itineraryId]);

  const handleActivityToggle = (dayIndex: number, activityId: string) => {
    if (!itinerary) return;
    
    const updatedItinerary = { ...itinerary };
    const day = updatedItinerary.days[dayIndex];
    const activityIndex = day.activities.findIndex(a => a.id === activityId);
    
    if (activityIndex !== -1) {
      day.activities[activityIndex].booked = !day.activities[activityIndex].booked;
      setItinerary(updatedItinerary);
    }
  };

  const handleActivityEdit = (dayIndex: number, activityId: string, field: keyof Activity, value: any) => {
    if (!itinerary) return;
    
    const updatedItinerary = { ...itinerary };
    const day = updatedItinerary.days[dayIndex];
    const activityIndex = day.activities.findIndex(a => a.id === activityId);
    
    if (activityIndex !== -1) {
      day.activities[activityIndex] = {
        ...day.activities[activityIndex],
        [field]: value
      };
      setItinerary(updatedItinerary);
    }
  };

  const handleActivityDelete = (dayIndex: number, activityId: string) => {
    if (!itinerary) return;
    
    const updatedItinerary = { ...itinerary };
    const day = updatedItinerary.days[dayIndex];
    day.activities = day.activities.filter(a => a.id !== activityId);
    setItinerary(updatedItinerary);
  };

  const handleSaveItinerary = () => {
    if (!itinerary || !onSave) return;
    onSave(itinerary);
  };

  if (loading) {
    return <div className={styles.loading}>Loading your itinerary...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!itinerary) {
    return <div className={styles.error}>Itinerary not found</div>;
  }

  return (
    <div className={styles.itineraryEditor}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          ← Back to Chat
        </button>
        <h1>{itinerary.title}</h1>
        <div className={styles.destination}>
          <span className={styles.destinationName}>{itinerary.destination}</span>
          <span className={styles.duration}>{itinerary.duration} days</span>
          <span className={styles.travelers}>{itinerary.travelers} travelers</span>
        </div>
        <div className={styles.actions}>
          <button 
            className={`${styles.editButton} ${editMode ? styles.active : ''}`}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? 'Done Editing' : 'Edit Itinerary'}
          </button>
          <button 
            className={styles.saveButton}
            onClick={handleSaveItinerary}
          >
            Save Itinerary
          </button>
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <div className={styles.daySelector}>
            {itinerary.days.map((day) => (
              <button
                key={day.day}
                className={`${styles.dayButton} ${activeDay === day.day ? styles.activeDay : ''}`}
                onClick={() => setActiveDay(day.day)}
              >
                <div className={styles.dayNumber}>Day {day.day}</div>
                <div className={styles.dayDate}>{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
              </button>
            ))}
          </div>
          
          <div className={styles.summarySection}>
            <h3>Trip Summary</h3>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Accommodation:</span>
              <span className={styles.summaryValue}>{itinerary.accommodation.name}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Total Budget:</span>
              <span className={styles.summaryValue}>${itinerary.budget.total}</span>
            </div>
            <div className={styles.budgetBreakdown}>
              <div className={styles.budgetItem}>
                <span>Accommodation</span>
                <span>${itinerary.budget.accommodation}</span>
              </div>
              <div className={styles.budgetItem}>
                <span>Transportation</span>
                <span>${itinerary.budget.transportation}</span>
              </div>
              <div className={styles.budgetItem}>
                <span>Activities</span>
                <span>${itinerary.budget.activities}</span>
              </div>
              <div className={styles.budgetItem}>
                <span>Food</span>
                <span>${itinerary.budget.food}</span>
              </div>
              <div className={styles.budgetItem}>
                <span>Miscellaneous</span>
                <span>${itinerary.budget.miscellaneous}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.mainContent}>
          {itinerary.days.map((day, dayIndex) => (
            <div 
              key={day.day} 
              className={`${styles.dayContent} ${activeDay === day.day ? styles.activeContent : styles.hiddenContent}`}
            >
              <div className={styles.dayHeader}>
                <h2>{day.title}</h2>
                <p>{day.description}</p>
              </div>
              
              <div className={styles.timeline}>
                {day.activities.map((activity) => (
                  <div key={activity.id} className={styles.activityCard}>
                    <div className={styles.activityTime}>{activity.time}</div>
                    <div className={`${styles.activityContent} ${activity.booked ? styles.booked : ''}`}>
                      <div className={styles.activityHeader}>
                        <h3 className={styles.activityTitle}>
                          {editMode ? (
                            <input
                              type="text"
                              value={activity.title}
                              onChange={(e) => handleActivityEdit(dayIndex, activity.id, 'title', e.target.value)}
                              className={styles.editInput}
                            />
                          ) : (
                            activity.title
                          )}
                        </h3>
                        <div className={styles.activityType}>{activity.type}</div>
                      </div>
                      
                      <div className={styles.activityDescription}>
                        {editMode ? (
                          <textarea
                            value={activity.description}
                            onChange={(e) => handleActivityEdit(dayIndex, activity.id, 'description', e.target.value)}
                            className={styles.editTextarea}
                          />
                        ) : (
                          activity.description
                        )}
                      </div>
                      
                      <div className={styles.activityDetails}>
                        <div className={styles.activityLocation}>
                          <span className={styles.detailLabel}>Location:</span>
                          {editMode ? (
                            <input
                              type="text"
                              value={activity.location}
                              onChange={(e) => handleActivityEdit(dayIndex, activity.id, 'location', e.target.value)}
                              className={styles.editInput}
                            />
                          ) : (
                            activity.location
                          )}
                        </div>
                        <div className={styles.activityDuration}>
                          <span className={styles.detailLabel}>Duration:</span>
                          {editMode ? (
                            <input
                              type="number"
                              value={activity.duration}
                              onChange={(e) => handleActivityEdit(dayIndex, activity.id, 'duration', parseInt(e.target.value))}
                              className={styles.editInput}
                            />
                          ) : (
                            `${activity.duration} min`
                          )}
                        </div>
                        {activity.price > 0 && (
                          <div className={styles.activityPrice}>
                            <span className={styles.detailLabel}>Price:</span>
                            {editMode ? (
                              <input
                                type="number"
                                value={activity.price}
                                onChange={(e) => handleActivityEdit(dayIndex, activity.id, 'price', parseInt(e.target.value))}
                                className={styles.editInput}
                              />
                            ) : (
                              `$${activity.price}`
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className={styles.activityActions}>
                        <label className={styles.bookingToggle}>
                          <input
                            type="checkbox"
                            checked={activity.booked}
                            onChange={() => handleActivityToggle(dayIndex, activity.id)}
                          />
                          <span className={styles.toggleLabel}>{activity.booked ? 'Booked' : 'Not Booked'}</span>
                        </label>
                        
                        {editMode && (
                          <button
                            className={styles.deleteButton}
                            onClick={() => handleActivityDelete(dayIndex, activity.id)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.notes}>
        <h3>Trip Notes</h3>
        <ul>
          {itinerary.notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ItineraryEditor;
