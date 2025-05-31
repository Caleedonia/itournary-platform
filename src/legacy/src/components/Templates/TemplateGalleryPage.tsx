"use client";

import React, { useState, useEffect } from 'react';
import styles from './templateGalleryPage.module.css';
import TemplateGallery from './TemplateGallery';
import { OccasionTemplate } from '@/types/templates';
import { createMockTemplates } from '@/utils/templateDataTransformers';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const TemplateGalleryPage: React.FC = () => {
  const [templates, setTemplates] = useState<OccasionTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // In a real implementation, this would fetch from an API
    // For now, we'll use our mock data
    const mockTemplates = createMockTemplates();
    setTemplates(mockTemplates);
    setIsLoading(false);
  }, []);

  const handleSelectTemplate = (template: OccasionTemplate) => {
    // In a real implementation, this would pre-select the template
    // and navigate to the create experience page
    router.push(`/account/experience-planner/new?template=${template.id}`);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading templates...</p>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Experience Templates</h1>
        <p className={styles.pageDescription}>
          Browse our collection of expert-curated templates to jumpstart your planning process.
          Each template includes pre-populated checklist items, timeline phases, and budget categories.
        </p>
        <Link href="/account/experience-planner/new" className={styles.createButton}>
          Create Custom Experience
        </Link>
      </div>

      <TemplateGallery 
        templates={templates} 
        onSelectTemplate={handleSelectTemplate}
      />
    </div>
  );
};

export default TemplateGalleryPage;
