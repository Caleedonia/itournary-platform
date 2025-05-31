"use client";

import React, { useState } from 'react';
import styles from './experienceCreationWizard.module.css';
import VisualBackgroundContainer from '../Layout/VisualBackgroundContainer';
import DestinationGallery from '../Destinations/DestinationGallery';
import PersonalizationQuestionnaire from '../Personalization/PersonalizationQuestionnaire';
import EnhancedOccasionSelector from '../Templates/EnhancedOccasionSelector';
import { enhanceOccasionTypesWithTemplates } from '@/utils/templateDataTransformers';
import { useRouter } from 'next/navigation';

interface ExperienceCreationWizardProps {
  occasionTypes: any[];
  onSubmit: (experienceData: any) => Promise<any>;
  onCancel: () => void;
}

const ExperienceCreationWizard: React.FC<ExperienceCreationWizardProps> = ({
  occasionTypes,
  onSubmit,
  onCancel
}) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form data
  const [experienceName, setExperienceName] = useState("");
  const [selectedOccasionTypeId, setSelectedOccasionTypeId] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");
  const [personalizationAnswers, setPersonalizationAnswers] = useState<Record<string, any>>({});
  
  // Enhanced occasion types with template information
  const enhancedOccasionTypes = enhanceOccasionTypesWithTemplates(occasionTypes);
  
  // Get selected occasion type and template
  const selectedOccasion = enhancedOccasionTypes.find(ot => ot._id === selectedOccasionTypeId);
  const selectedTemplate = selectedOccasion?.template;
  
  // Get destination name for display
  const destinationName = selectedDestination ? 
    // In a real implementation, this would look up the destination name from the selected ID
    selectedDestination.includes('paris') ? 'Paris, France' :
    selectedDestination.includes('bali') ? 'Bali, Indonesia' :
    selectedDestination.includes('santorini') ? 'Santorini, Greece' :
    selectedDestination.includes('kyoto') ? 'Kyoto, Japan' :
    selectedDestination.includes('cancun') ? 'Cancun, Mexico' :
    'Selected Destination' : '';
  
  // Background image based on destination
  const backgroundImage = selectedDestination ? 
    // In a real implementation, this would look up the image from the selected destination
    selectedDestination.includes('paris') ? '/images/destinations/paris-1.jpg' :
    selectedDestination.includes('bali') ? '/images/destinations/bali-1.jpg' :
    selectedDestination.includes('santorini') ? '/images/destinations/santorini-1.jpg' :
    selectedDestination.includes('kyoto') ? '/images/destinations/kyoto-1.jpg' :
    selectedDestination.includes('cancun') ? '/images/destinations/cancun-1.jpg' :
    undefined : undefined;
  
  const handleOccasionChange = (occasionTypeId: string) => {
    setSelectedOccasionTypeId(occasionTypeId);
    
    // Auto-generate a name based on occasion type
    const selectedOccasion = enhancedOccasionTypes.find(ot => ot._id === occasionTypeId);
    if (selectedOccasion && !experienceName) {
      setExperienceName(`My ${selectedOccasion.name}`);
    }
  };
  
  const handleDestinationSelect = (destinationId: string) => {
    setSelectedDestination(destinationId);
    
    // Update experience name if it's still the default
    if (experienceName.startsWith('My ') && selectedOccasion) {
      const destinationName = 
        destinationId.includes('paris') ? 'Paris' :
        destinationId.includes('bali') ? 'Bali' :
        destinationId.includes('santorini') ? 'Santorini' :
        destinationId.includes('kyoto') ? 'Kyoto' :
        destinationId.includes('cancun') ? 'Cancun' :
        '';
      
      if (destinationName) {
        setExperienceName(`My ${selectedOccasion.name} in ${destinationName}`);
      }
    }
  };
  
  const handlePersonalizationComplete = (answers: Record<string, any>) => {
    setPersonalizationAnswers(answers);
    setCurrentStep(4); // Move to review step
  };
  
  const handlePersonalizationSkip = () => {
    setPersonalizationAnswers({});
    setCurrentStep(4); // Move to review step
  };
  
  const handleNextStep = () => {
    // Validate current step
    if (currentStep === 1) {
      if (!experienceName.trim()) {
        setError("Please enter a name for your experience");
        return;
      }
      if (!selectedOccasionTypeId) {
        setError("Please select an occasion type");
        return;
      }
    } else if (currentStep === 2) {
      // Destination is optional, no validation needed
    }
    
    setError(null);
    setCurrentStep(prev => prev + 1);
  };
  
  const handlePreviousStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const handleSubmitExperience = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Prepare experience data
      const experienceData = {
        experienceName,
        occasionTypeId: selectedOccasionTypeId,
        occasionTypeName: selectedOccasion?.name || "Unknown Occasion",
        destination: destinationName || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        notes: notes || undefined,
        personalization: Object.keys(personalizationAnswers).length > 0 ? personalizationAnswers : undefined,
        templateId: selectedTemplate?.id,
      };
      
      // Submit experience data
      const result = await onSubmit(experienceData);
      
      // Navigate to the new experience
      if (result && result.experience && result.experience._id) {
        router.push(`/account/experience-planner/${result.experience._id}`);
      }
    } catch (e: any) {
      console.error("Experience creation failed:", e);
      setError(e.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Determine background type and content
  const backgroundType = selectedDestination ? 'destination' : 
                         selectedOccasionTypeId ? 'occasion' : 'default';
  
  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Basic Info
        return (
          <div className={styles.stepContainer}>
            <h2 className={styles.stepTitle}>Let's Start Your Experience</h2>
            <p className={styles.stepDescription}>
              Begin by naming your experience and selecting the type of occasion you're planning
            </p>
            
            <div className={styles.formGroup}>
              <label htmlFor="experienceName" className={styles.inputLabel}>
                Experience Name <span className={styles.requiredIndicator}>*</span>
              </label>
              <input
                type="text"
                id="experienceName"
                value={experienceName}
                onChange={(e) => setExperienceName(e.target.value)}
                className={styles.textInput}
                placeholder="e.g., Our Dream Honeymoon, Team Building Retreat 2025"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="occasionType" className={styles.inputLabel}>
                Occasion Type <span className={styles.requiredIndicator}>*</span>
              </label>
              <EnhancedOccasionSelector
                occasionTypes={enhancedOccasionTypes}
                selectedOccasionTypeId={selectedOccasionTypeId}
                onChange={handleOccasionChange}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="notes" className={styles.inputLabel}>
                Initial Notes (Optional)
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className={styles.textareaInput}
                placeholder="Any initial thoughts, ideas, or requirements..."
              />
            </div>
          </div>
        );
        
      case 2: // Destination Selection
        return (
          <div className={styles.stepContainer}>
            <h2 className={styles.stepTitle}>Choose Your Destination</h2>
            <p className={styles.stepDescription}>
              Select a destination for your {selectedOccasion?.name} or skip this step if you haven't decided yet
            </p>
            
            <DestinationGallery
              selectedDestination={selectedDestination}
              onDestinationSelect={handleDestinationSelect}
            />
          </div>
        );
        
      case 3: // Personalization
        return (
          <div className={styles.stepContainer}>
            <PersonalizationQuestionnaire
              occasionType={selectedOccasion?.name || ""}
              onComplete={handlePersonalizationComplete}
              onCancel={handlePersonalizationSkip}
              initialAnswers={personalizationAnswers}
            />
          </div>
        );
        
      case 4: // Review & Create
        return (
          <div className={styles.stepContainer}>
            <h2 className={styles.stepTitle}>Review & Create Your Experience</h2>
            <p className={styles.stepDescription}>
              Review your selections and create your personalized experience plan
            </p>
            
            <div className={styles.reviewCard}>
              <div className={styles.reviewSection}>
                <h3 className={styles.reviewSectionTitle}>Basic Information</h3>
                <div className={styles.reviewItem}>
                  <span className={styles.reviewLabel}>Experience Name:</span>
                  <span className={styles.reviewValue}>{experienceName}</span>
                </div>
                <div className={styles.reviewItem}>
                  <span className={styles.reviewLabel}>Occasion Type:</span>
                  <span className={styles.reviewValue}>{selectedOccasion?.name}</span>
                </div>
                {notes && (
                  <div className={styles.reviewItem}>
                    <span className={styles.reviewLabel}>Notes:</span>
                    <span className={styles.reviewValue}>{notes}</span>
                  </div>
                )}
              </div>
              
              {selectedDestination && (
                <div className={styles.reviewSection}>
                  <h3 className={styles.reviewSectionTitle}>Destination</h3>
                  <div className={styles.reviewItem}>
                    <span className={styles.reviewLabel}>Selected Destination:</span>
                    <span className={styles.reviewValue}>{destinationName}</span>
                  </div>
                </div>
              )}
              
              <div className={styles.reviewSection}>
                <h3 className={styles.reviewSectionTitle}>Dates (Optional)</h3>
                <div className={styles.dateInputsContainer}>
                  <div className={styles.dateInputGroup}>
                    <label htmlFor="startDate" className={styles.inputLabel}>Start Date</label>
                    <input
                      type="date"
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className={styles.dateInput}
                    />
                  </div>
                  <div className={styles.dateInputGroup}>
                    <label htmlFor="endDate" className={styles.inputLabel}>End Date</label>
                    <input
                      type="date"
                      id="endDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className={styles.dateInput}
                    />
                  </div>
                </div>
              </div>
              
              {selectedTemplate && (
                <div className={styles.reviewSection}>
                  <h3 className={styles.reviewSectionTitle}>Selected Template</h3>
                  <div className={styles.templatePreviewCard}>
                    <div className={styles.templatePreviewHeader}>
                      <h4 className={styles.templatePreviewTitle}>{selectedTemplate.name}</h4>
                      {selectedTemplate.expertCurated && (
                        <span className={styles.expertBadge}>Expert Curated</span>
                      )}
                    </div>
                    <div className={styles.templatePreviewStats}>
                      <div className={styles.templatePreviewStat}>
                        <span className={styles.statIcon}>✓</span>
                        <span className={styles.statLabel}>Checklist Items:</span>
                        <span className={styles.statValue}>{selectedTemplate.checklistItemCount}</span>
                      </div>
                      <div className={styles.templatePreviewStat}>
                        <span className={styles.statIcon}>🕒</span>
                        <span className={styles.statLabel}>Timeline Phases:</span>
                        <span className={styles.statValue}>{selectedTemplate.timelinePhaseCount}</span>
                      </div>
                      <div className={styles.templatePreviewStat}>
                        <span className={styles.statIcon}>💰</span>
                        <span className={styles.statLabel}>Budget Categories:</span>
                        <span className={styles.statValue}>{selectedTemplate.budgetCategoryCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {Object.keys(personalizationAnswers).length > 0 && (
                <div className={styles.reviewSection}>
                  <h3 className={styles.reviewSectionTitle}>Personalization</h3>
                  <div className={styles.personalizationSummary}>
                    <p className={styles.personalizationNote}>
                      Your experience will be customized based on your personalization answers.
                    </p>
                    <button 
                      className={styles.editButton}
                      onClick={() => setCurrentStep(3)}
                    >
                      Edit Personalization
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <VisualBackgroundContainer
      backgroundType={backgroundType}
      imageUrl={backgroundImage}
      destinationName={destinationName}
      occasionType={selectedOccasion?.name}
      isLoading={isSubmitting}
    >
      <div className={styles.wizardContainer}>
        <div className={styles.wizardHeader}>
          <div className={styles.progressSteps}>
            {[1, 2, 3, 4].map(step => (
              <div 
                key={step}
                className={`${styles.progressStep} ${currentStep >= step ? styles.active : ''} ${currentStep > step ? styles.completed : ''}`}
              >
                <div className={styles.stepIndicator}>
                  {currentStep > step ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                <span className={styles.stepName}>
                  {step === 1 ? 'Basics' : 
                   step === 2 ? 'Destination' : 
                   step === 3 ? 'Personalize' : 
                   'Create'}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.wizardContent}>
          {renderStepContent()}
        </div>
        
        {error && (
          <div className={styles.errorMessage}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{error}</span>
          </div>
        )}
        
        <div className={styles.wizardFooter}>
          {currentStep === 1 ? (
            <button 
              className={styles.secondaryButton}
              onClick={onCancel}
            >
              Cancel
            </button>
          ) : (
            <button 
              className={styles.secondaryButton}
              onClick={handlePreviousStep}
            >
              Back
            </button>
          )}
          
          {currentStep < 4 ? (
            <button 
              className={styles.primaryButton}
              onClick={handleNextStep}
            >
              {currentStep === 3 ? 'Skip Personalization' : 'Continue'}
            </button>
          ) : (
            <button 
              className={styles.primaryButton}
              onClick={handleSubmitExperience}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Experience'}
            </button>
          )}
        </div>
      </div>
    </VisualBackgroundContainer>
  );
};

export default ExperienceCreationWizard;
