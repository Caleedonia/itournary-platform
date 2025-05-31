"use client";

import React, { useState } from 'react';
import styles from './templateGallery.module.css';
import TemplateCard from './TemplateCard';
import TemplatePreviewModal from './TemplatePreviewModal';
import { OccasionTemplate } from '@/types/templates';

interface TemplateGalleryProps {
  templates: OccasionTemplate[];
  onSelectTemplate?: (template: OccasionTemplate) => void;
}

const TemplateGallery: React.FC<TemplateGalleryProps> = ({ 
  templates,
  onSelectTemplate
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<OccasionTemplate | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const handleTemplateClick = (template: OccasionTemplate) => {
    setSelectedTemplate(template);
    setIsPreviewModalOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewModalOpen(false);
  };

  const handleSelectTemplate = () => {
    if (selectedTemplate && onSelectTemplate) {
      onSelectTemplate(selectedTemplate);
      setIsPreviewModalOpen(false);
    }
  };

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryHeader}>
        <h2 className={styles.galleryTitle}>Occasion Templates</h2>
        <p className={styles.galleryDescription}>
          Choose from our expert-curated templates to jumpstart your planning process
        </p>
      </div>

      <div className={styles.filterBar}>
        <div className={styles.filterOptions}>
          <button className={`${styles.filterButton} ${styles.active}`}>All Templates</button>
          <button className={styles.filterButton}>Popular</button>
          <button className={styles.filterButton}>Featured</button>
          <button className={styles.filterButton}>New</button>
        </div>
        <div className={styles.searchContainer}>
          <input 
            type="text" 
            placeholder="Search templates..." 
            className={styles.searchInput} 
          />
        </div>
      </div>

      <div className={styles.gallery}>
        {templates.map((template) => (
          <div key={template.id} className={styles.galleryItem}>
            <TemplateCard 
              template={template} 
              onClick={handleTemplateClick} 
            />
          </div>
        ))}
      </div>

      {isPreviewModalOpen && selectedTemplate && (
        <TemplatePreviewModal
          template={selectedTemplate}
          isOpen={isPreviewModalOpen}
          onClose={handleClosePreview}
          onSelect={handleSelectTemplate}
        />
      )}
    </div>
  );
};

export default TemplateGallery;
