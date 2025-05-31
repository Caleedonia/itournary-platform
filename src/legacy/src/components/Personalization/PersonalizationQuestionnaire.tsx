"use client";

import React, { useState, useEffect } from 'react';
import styles from './personalizationQuestionnaire.module.css';

interface Question {
  id: string;
  text: string;
  type: 'text' | 'select' | 'multiselect' | 'date' | 'range';
  options?: string[];
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  dependsOn?: {
    questionId: string;
    value: string | string[];
  };
}

interface QuestionGroup {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

interface PersonalizationQuestionnaireProps {
  occasionType: string;
  onComplete: (answers: Record<string, any>) => void;
  onCancel: () => void;
  initialAnswers?: Record<string, any>;
}

const PersonalizationQuestionnaire: React.FC<PersonalizationQuestionnaireProps> = ({
  occasionType,
  onComplete,
  onCancel,
  initialAnswers = {}
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>(initialAnswers);
  const [questionGroups, setQuestionGroups] = useState<QuestionGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would fetch from an API based on occasion type
    // For now, we'll use mock data
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data based on occasion type
        let mockQuestions: QuestionGroup[] = [];
        
        if (occasionType.toLowerCase().includes('wedding')) {
          mockQuestions = [
            {
              id: 'wedding-basics',
              title: 'Wedding Basics',
              description: 'Let\'s start with some basic information about your wedding',
              questions: [
                {
                  id: 'guest-count',
                  text: 'Approximately how many guests are you planning to invite?',
                  type: 'range',
                  min: 10,
                  max: 300,
                  step: 10,
                  required: true
                },
                {
                  id: 'wedding-style',
                  text: 'What style of wedding are you envisioning?',
                  type: 'select',
                  options: ['Intimate & Romantic', 'Elegant & Formal', 'Casual & Relaxed', 'Luxury & Extravagant', 'Bohemian & Rustic'],
                  required: true
                },
                {
                  id: 'wedding-season',
                  text: 'What season are you considering for your wedding?',
                  type: 'select',
                  options: ['Spring', 'Summer', 'Fall', 'Winter'],
                  required: false
                }
              ]
            },
            {
              id: 'wedding-preferences',
              title: 'Venue & Accommodation Preferences',
              description: 'Tell us about your preferences for the wedding venue and accommodations',
              questions: [
                {
                  id: 'venue-type',
                  text: 'What type of venue are you interested in?',
                  type: 'multiselect',
                  options: ['Beach', 'Resort', 'Historic Site', 'Garden', 'Villa', 'Hotel', 'Winery'],
                  required: true
                },
                {
                  id: 'accommodation-important',
                  text: 'How important is it to have guest accommodations at or near the venue?',
                  type: 'select',
                  options: ['Very Important', 'Somewhat Important', 'Not Important'],
                  required: false
                },
                {
                  id: 'accommodation-nights',
                  text: 'How many nights do you expect most guests to stay?',
                  type: 'select',
                  options: ['1-2 nights', '3-4 nights', '5+ nights'],
                  required: false,
                  dependsOn: {
                    questionId: 'accommodation-important',
                    value: ['Very Important', 'Somewhat Important']
                  }
                }
              ]
            },
            {
              id: 'wedding-activities',
              title: 'Activities & Special Touches',
              description: 'Let\'s personalize your wedding experience with activities and special elements',
              questions: [
                {
                  id: 'pre-wedding-events',
                  text: 'Which pre-wedding events would you like to include?',
                  type: 'multiselect',
                  options: ['Welcome Party', 'Rehearsal Dinner', 'Bridal Shower', 'Bachelor/Bachelorette Party', 'Group Excursion'],
                  required: false
                },
                {
                  id: 'cultural-elements',
                  text: 'Are there any cultural or religious elements you want to incorporate?',
                  type: 'text',
                  placeholder: 'Please describe any specific traditions or ceremonies',
                  required: false
                },
                {
                  id: 'special-requirements',
                  text: 'Do you have any special requirements or priorities for your wedding?',
                  type: 'text',
                  placeholder: 'E.g., accessibility needs, dietary restrictions, etc.',
                  required: false
                }
              ]
            }
          ];
        } else if (occasionType.toLowerCase().includes('corporate')) {
          mockQuestions = [
            {
              id: 'retreat-basics',
              title: 'Retreat Basics',
              description: 'Let\'s start with some basic information about your corporate retreat',
              questions: [
                {
                  id: 'attendee-count',
                  text: 'How many people will be attending the retreat?',
                  type: 'range',
                  min: 5,
                  max: 200,
                  step: 5,
                  required: true
                },
                {
                  id: 'retreat-duration',
                  text: 'How long will the retreat last?',
                  type: 'select',
                  options: ['1-2 days', '3-4 days', '5-7 days', '8+ days'],
                  required: true
                },
                {
                  id: 'retreat-focus',
                  text: 'What is the primary focus of your retreat?',
                  type: 'select',
                  options: ['Team Building', 'Strategic Planning', 'Training & Development', 'Celebration & Recognition', 'Wellness & Rejuvenation'],
                  required: true
                }
              ]
            },
            {
              id: 'retreat-logistics',
              title: 'Venue & Logistics Preferences',
              description: 'Tell us about your preferences for the retreat venue and logistics',
              questions: [
                {
                  id: 'venue-requirements',
                  text: 'What are your venue requirements?',
                  type: 'multiselect',
                  options: ['Meeting Rooms', 'Outdoor Space', 'Private Dining', 'Recreational Facilities', 'Technology/AV Equipment', 'Wellness Facilities'],
                  required: true
                },
                {
                  id: 'accommodation-type',
                  text: 'What type of accommodations do you prefer?',
                  type: 'select',
                  options: ['Shared Rooms', 'Private Rooms', 'Mix of Both', 'Luxury Suites'],
                  required: false
                },
                {
                  id: 'transportation',
                  text: 'Will you need transportation arrangements?',
                  type: 'select',
                  options: ['Yes, for everyone', 'Yes, but only from airport', 'No, we\'ll handle it separately'],
                  required: false
                }
              ]
            },
            {
              id: 'retreat-activities',
              title: 'Activities & Programming',
              description: 'Let\'s plan the activities and programming for your retreat',
              questions: [
                {
                  id: 'team-building',
                  text: 'What types of team building activities interest you?',
                  type: 'multiselect',
                  options: ['Outdoor Adventure', 'Problem Solving Challenges', 'Creative Workshops', 'Cooking Classes', 'Sports & Games', 'Community Service'],
                  required: false
                },
                {
                  id: 'work-sessions',
                  text: 'How many hours per day do you plan to dedicate to work sessions?',
                  type: 'select',
                  options: ['2-3 hours', '4-6 hours', '7+ hours', 'Varies by day'],
                  required: false
                },
                {
                  id: 'special-requirements',
                  text: 'Do you have any special requirements or considerations?',
                  type: 'text',
                  placeholder: 'E.g., accessibility needs, dietary restrictions, etc.',
                  required: false
                }
              ]
            }
          ];
        } else {
          // Default questions for other occasion types
          mockQuestions = [
            {
              id: 'occasion-basics',
              title: 'Occasion Basics',
              description: 'Let\'s start with some basic information about your occasion',
              questions: [
                {
                  id: 'participant-count',
                  text: 'How many people will be participating?',
                  type: 'range',
                  min: 2,
                  max: 100,
                  step: 1,
                  required: true
                },
                {
                  id: 'occasion-style',
                  text: 'What style are you envisioning?',
                  type: 'select',
                  options: ['Casual & Relaxed', 'Elegant & Formal', 'Adventure & Exploration', 'Luxury & Indulgence', 'Intimate & Personal'],
                  required: true
                },
                {
                  id: 'occasion-duration',
                  text: 'How long will this occasion last?',
                  type: 'select',
                  options: ['One day event', 'Weekend getaway', '3-5 days', 'Week-long experience', 'Extended trip (8+ days)'],
                  required: false
                }
              ]
            },
            {
              id: 'preferences',
              title: 'Preferences & Interests',
              description: 'Tell us about your preferences and interests for this occasion',
              questions: [
                {
                  id: 'activity-interests',
                  text: 'What types of activities are you interested in?',
                  type: 'multiselect',
                  options: ['Dining & Culinary', 'Sightseeing & Tours', 'Outdoor & Adventure', 'Relaxation & Wellness', 'Cultural Experiences', 'Entertainment & Nightlife'],
                  required: false
                },
                {
                  id: 'accommodation-preference',
                  text: 'What type of accommodation do you prefer?',
                  type: 'select',
                  options: ['Hotel', 'Resort', 'Vacation Rental', 'Boutique Property', 'All-Inclusive'],
                  required: false
                },
                {
                  id: 'special-requirements',
                  text: 'Do you have any special requirements or considerations?',
                  type: 'text',
                  placeholder: 'E.g., accessibility needs, dietary restrictions, etc.',
                  required: false
                }
              ]
            }
          ];
        }
        
        setQuestionGroups(mockQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchQuestions();
  }, [occasionType]);

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    // Validate current step
    const currentGroup = questionGroups[currentStep];
    const requiredQuestions = currentGroup.questions.filter(q => q.required);
    
    const allRequiredAnswered = requiredQuestions.every(q => {
      // Skip questions that depend on other questions if the dependency isn't met
      if (q.dependsOn) {
        const dependencyValue = answers[q.dependsOn.questionId];
        if (!dependencyValue) return true;
        
        if (Array.isArray(q.dependsOn.value)) {
          if (!q.dependsOn.value.includes(dependencyValue)) return true;
        } else if (dependencyValue !== q.dependsOn.value) {
          return true;
        }
      }
      
      return answers[q.id] !== undefined && answers[q.id] !== '';
    });
    
    if (!allRequiredAnswered) {
      alert('Please answer all required questions before proceeding.');
      return;
    }
    
    if (currentStep < questionGroups.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Complete the questionnaire
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderQuestion = (question: Question) => {
    // Check if this question should be shown based on dependencies
    if (question.dependsOn) {
      const dependencyValue = answers[question.dependsOn.questionId];
      if (!dependencyValue) return null;
      
      if (Array.isArray(question.dependsOn.value)) {
        if (!question.dependsOn.value.includes(dependencyValue)) return null;
      } else if (dependencyValue !== question.dependsOn.value) {
        return null;
      }
    }
    
    switch (question.type) {
      case 'text':
        return (
          <div className={styles.questionContainer} key={question.id}>
            <label className={styles.questionLabel}>
              {question.text}
              {question.required && <span className={styles.requiredIndicator}>*</span>}
            </label>
            <input
              type="text"
              className={styles.textInput}
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              placeholder={question.placeholder}
            />
          </div>
        );
        
      case 'select':
        return (
          <div className={styles.questionContainer} key={question.id}>
            <label className={styles.questionLabel}>
              {question.text}
              {question.required && <span className={styles.requiredIndicator}>*</span>}
            </label>
            <select
              className={styles.selectInput}
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            >
              <option value="">Select an option</option>
              {question.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );
        
      case 'multiselect':
        return (
          <div className={styles.questionContainer} key={question.id}>
            <label className={styles.questionLabel}>
              {question.text}
              {question.required && <span className={styles.requiredIndicator}>*</span>}
            </label>
            <div className={styles.multiselectContainer}>
              {question.options?.map(option => (
                <label key={option} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={Array.isArray(answers[question.id]) && answers[question.id].includes(option)}
                    onChange={(e) => {
                      const currentSelections = Array.isArray(answers[question.id]) ? [...answers[question.id]] : [];
                      if (e.target.checked) {
                        handleAnswerChange(question.id, [...currentSelections, option]);
                      } else {
                        handleAnswerChange(question.id, currentSelections.filter(item => item !== option));
                      }
                    }}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        );
        
      case 'range':
        return (
          <div className={styles.questionContainer} key={question.id}>
            <label className={styles.questionLabel}>
              {question.text}
              {question.required && <span className={styles.requiredIndicator}>*</span>}
            </label>
            <div className={styles.rangeContainer}>
              <input
                type="range"
                min={question.min || 0}
                max={question.max || 100}
                step={question.step || 1}
                value={answers[question.id] || question.min || 0}
                onChange={(e) => handleAnswerChange(question.id, parseInt(e.target.value))}
                className={styles.rangeInput}
              />
              <span className={styles.rangeValue}>{answers[question.id] || question.min || 0}</span>
            </div>
          </div>
        );
        
      case 'date':
        return (
          <div className={styles.questionContainer} key={question.id}>
            <label className={styles.questionLabel}>
              {question.text}
              {question.required && <span className={styles.requiredIndicator}>*</span>}
            </label>
            <input
              type="date"
              className={styles.dateInput}
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            />
          </div>
        );
        
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading personalization questions...</p>
      </div>
    );
  }

  if (questionGroups.length === 0) {
    return (
      <div className={styles.noQuestionsContainer}>
        <p>No personalization questions available for this occasion type.</p>
        <button 
          className={styles.primaryButton}
          onClick={() => onComplete({})}
        >
          Continue Without Personalization
        </button>
      </div>
    );
  }

  const currentGroup = questionGroups[currentStep];

  return (
    <div className={styles.questionnaireContainer}>
      <div className={styles.questionnaireHeader}>
        <h2 className={styles.questionnaireTitle}>Personalize Your Experience</h2>
        <p className={styles.questionnaireDescription}>
          Answer a few questions to customize your {occasionType} planning experience
        </p>
      </div>
      
      <div className={styles.progressContainer}>
        {questionGroups.map((group, index) => (
          <div 
            key={group.id}
            className={`${styles.progressStep} ${index < currentStep ? styles.completed : ''} ${index === currentStep ? styles.active : ''}`}
          >
            <div className={styles.progressIndicator}>{index + 1}</div>
            <span className={styles.progressLabel}>{group.title}</span>
          </div>
        ))}
      </div>
      
      <div className={styles.questionGroupContainer}>
        <h3 className={styles.groupTitle}>{currentGroup.title}</h3>
        {currentGroup.description && (
          <p className={styles.groupDescription}>{currentGroup.description}</p>
        )}
        
        <div className={styles.questionsContainer}>
          {currentGroup.questions.map(question => renderQuestion(question))}
        </div>
      </div>
      
      <div className={styles.navigationButtons}>
        <button 
          className={styles.secondaryButton}
          onClick={onCancel}
        >
          Skip Personalization
        </button>
        <div>
          {currentStep > 0 && (
            <button 
              className={styles.backButton}
              onClick={handlePrevious}
            >
              Back
            </button>
          )}
          <button 
            className={styles.primaryButton}
            onClick={handleNext}
          >
            {currentStep < questionGroups.length - 1 ? 'Next' : 'Complete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalizationQuestionnaire;
