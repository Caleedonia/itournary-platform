"use client";

import React, { useState } from 'react';
import styles from './templatePreviewModal.module.css';
import { OccasionTemplate } from '@/types/templates';
import Image from 'next/image';

interface TemplatePreviewModalProps {
  template: OccasionTemplate;
  isOpen: boolean;
  onClose: () => void;
  onSelect: () => void;
}

const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  template,
  isOpen,
  onClose,
  onSelect
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'checklist' | 'timeline' | 'budget'>('overview');
  
  if (!isOpen) return null;

  const {
    name,
    description,
    image,
    checklistItems,
    timelinePhases,
    budgetCategories,
    estimatedTimeSavings,
    expertCurated,
    successCount
  } = template;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className={styles.overviewTab}>
            <div className={styles.templateImageContainer}>
              {image && (
                <Image
                  src={image}
                  alt={`${name} template`}
                  width={600}
                  height={300}
                  className={styles.templateImage}
                />
              )}
            </div>
            
            <div className={styles.templateDescription}>
              <p>{description}</p>
            </div>
            
            <div className={styles.templateBenefits}>
              <h4 className={styles.benefitsTitle}>Template Benefits</h4>
              <div className={styles.benefitsList}>
                <div className={styles.benefitItem}>
                  <div className={styles.benefitIcon}>⏱️</div>
                  <div className={styles.benefitContent}>
                    <h5 className={styles.benefitName}>Time Savings</h5>
                    <p className={styles.benefitValue}>{estimatedTimeSavings} of planning time</p>
                  </div>
                </div>
                
                <div className={styles.benefitItem}>
                  <div className={styles.benefitIcon}>✓</div>
                  <div className={styles.benefitContent}>
                    <h5 className={styles.benefitName}>Pre-populated Items</h5>
                    <p className={styles.benefitValue}>
                      {checklistItems?.length || 0} checklist items, 
                      {timelinePhases?.length || 0} timeline phases, 
                      {budgetCategories?.length || 0} budget categories
                    </p>
                  </div>
                </div>
                
                {expertCurated && (
                  <div className={styles.benefitItem}>
                    <div className={styles.benefitIcon}>👑</div>
                    <div className={styles.benefitContent}>
                      <h5 className={styles.benefitName}>Expert Curated</h5>
                      <p className={styles.benefitValue}>Created by travel and event planning professionals</p>
                    </div>
                  </div>
                )}
                
                {successCount && (
                  <div className={styles.benefitItem}>
                    <div className={styles.benefitIcon}>🎯</div>
                    <div className={styles.benefitContent}>
                      <h5 className={styles.benefitName}>Proven Success</h5>
                      <p className={styles.benefitValue}>Used in {successCount}+ successful experiences</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        
      case 'checklist':
        return (
          <div className={styles.checklistTab}>
            <h4 className={styles.tabContentTitle}>Sample Checklist Items</h4>
            <p className={styles.tabContentDescription}>
              This template includes {checklistItems?.length || 0} pre-populated checklist items to jumpstart your planning.
            </p>
            
            {checklistItems && checklistItems.length > 0 ? (
              <div className={styles.checklistItems}>
                {checklistItems.slice(0, 8).map((item, index) => (
                  <div key={index} className={styles.checklistItem}>
                    <div className={styles.checklistItemIcon}>✓</div>
                    <div className={styles.checklistItemContent}>
                      <h5 className={styles.checklistItemName}>{item.taskName}</h5>
                      {item.description && <p className={styles.checklistItemDescription}>{item.description}</p>}
                      {item.category && <span className={styles.checklistItemCategory}>{item.category}</span>}
                    </div>
                  </div>
                ))}
                
                {checklistItems.length > 8 && (
                  <div className={styles.moreItemsNote}>
                    + {checklistItems.length - 8} more checklist items
                  </div>
                )}
              </div>
            ) : (
              <p className={styles.emptyStateMessage}>No checklist items available in this template.</p>
            )}
          </div>
        );
        
      case 'timeline':
        return (
          <div className={styles.timelineTab}>
            <h4 className={styles.tabContentTitle}>Sample Timeline Structure</h4>
            <p className={styles.tabContentDescription}>
              This template includes {timelinePhases?.length || 0} timeline phases to organize your planning.
            </p>
            
            {timelinePhases && timelinePhases.length > 0 ? (
              <div className={styles.timelinePhases}>
                {timelinePhases.slice(0, 5).map((phase, index) => (
                  <div key={index} className={styles.timelinePhase}>
                    <div className={styles.timelinePhaseHeader}>
                      <div className={styles.timelinePhaseIcon}>{index + 1}</div>
                      <h5 className={styles.timelinePhaseName}>{phase.phaseName}</h5>
                      {phase.durationEstimate && (
                        <span className={styles.timelinePhaseDuration}>{phase.durationEstimate}</span>
                      )}
                    </div>
                    
                    {phase.description && (
                      <p className={styles.timelinePhaseDescription}>{phase.description}</p>
                    )}
                    
                    {phase.tasks && phase.tasks.length > 0 && (
                      <div className={styles.timelinePhaseTasks}>
                        <h6 className={styles.timelinePhaseTasksTitle}>Key Tasks:</h6>
                        <ul className={styles.timelinePhaseTasksList}>
                          {phase.tasks.slice(0, 3).map((task, taskIndex) => (
                            <li key={taskIndex} className={styles.timelinePhaseTask}>{task}</li>
                          ))}
                          {phase.tasks.length > 3 && (
                            <li className={styles.timelinePhaseTaskMore}>+ {phase.tasks.length - 3} more tasks</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
                
                {timelinePhases.length > 5 && (
                  <div className={styles.moreItemsNote}>
                    + {timelinePhases.length - 5} more timeline phases
                  </div>
                )}
              </div>
            ) : (
              <p className={styles.emptyStateMessage}>No timeline structure available in this template.</p>
            )}
          </div>
        );
        
      case 'budget':
        return (
          <div className={styles.budgetTab}>
            <h4 className={styles.tabContentTitle}>Sample Budget Categories</h4>
            <p className={styles.tabContentDescription}>
              This template includes {budgetCategories?.length || 0} budget categories to help you manage expenses.
            </p>
            
            {budgetCategories && budgetCategories.length > 0 ? (
              <div className={styles.budgetCategories}>
                <div className={styles.budgetCategoriesChart}>
                  {/* Simple visual representation of budget allocation */}
                  <div className={styles.budgetChart}>
                    {budgetCategories.slice(0, 6).map((category, index) => (
                      <div 
                        key={index} 
                        className={styles.budgetChartSegment}
                        style={{ 
                          width: `${category.estimatedPercentage || 100 / budgetCategories.length}%`,
                          backgroundColor: `hsl(${index * 60}, 70%, 65%)`
                        }}
                        title={`${category.categoryName}: ${category.estimatedPercentage || '-'}%`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className={styles.budgetCategoriesList}>
                  {budgetCategories.slice(0, 6).map((category, index) => (
                    <div key={index} className={styles.budgetCategory}>
                      <div 
                        className={styles.budgetCategoryColor} 
                        style={{ backgroundColor: `hsl(${index * 60}, 70%, 65%)` }}
                      />
                      <div className={styles.budgetCategoryContent}>
                        <h5 className={styles.budgetCategoryName}>{category.categoryName}</h5>
                        {category.estimatedPercentage && (
                          <span className={styles.budgetCategoryPercentage}>{category.estimatedPercentage}%</span>
                        )}
                        {category.notes && <p className={styles.budgetCategoryNotes}>{category.notes}</p>}
                      </div>
                    </div>
                  ))}
                  
                  {budgetCategories.length > 6 && (
                    <div className={styles.moreItemsNote}>
                      + {budgetCategories.length - 6} more budget categories
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className={styles.emptyStateMessage}>No budget categories available in this template.</p>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{name}</h3>
          {expertCurated && <span className={styles.expertBadge}>Expert Curated</span>}
        </div>
        
        <div className={styles.modalTabs}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'overview' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'checklist' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('checklist')}
          >
            Checklist
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'timeline' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            Timeline
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'budget' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('budget')}
          >
            Budget
          </button>
        </div>
        
        <div className={styles.modalTabContent}>
          {renderTabContent()}
        </div>
        
        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.selectButton} onClick={onSelect}>
            Use This Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreviewModal;
