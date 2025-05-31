"use client";

import React, { useState, useEffect } from 'react';
import styles from './exportModal.module.css';

interface ExportModalProps {
  onClose: () => void;
  exportType: 'timeline' | 'budget' | 'both';
  experienceId: string;
  experienceName: string;
}

const ExportModal: React.FC<ExportModalProps> = ({
  onClose,
  exportType,
  experienceId,
  experienceName
}) => {
  const [format, setFormat] = useState<'pdf' | 'csv'>('pdf');
  const [includeVisuals, setIncludeVisuals] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if on mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Handle format change
  const handleFormatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormat(e.target.value as 'pdf' | 'csv');
    
    // Reset visuals option if CSV is selected (since CSV doesn't support visuals)
    if (e.target.value === 'csv') {
      setIncludeVisuals(false);
    }
  };

  // Handle export action
  const handleExport = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      let endpoint = '';
      
      // Determine the appropriate endpoint based on export type and format
      if (exportType === 'timeline') {
        endpoint = `/api/export/timeline/${experienceId}?format=${format}&visuals=${includeVisuals}`;
      } else if (exportType === 'budget') {
        endpoint = `/api/export/budget/${experienceId}?format=${format}&visuals=${includeVisuals}`;
      } else {
        endpoint = `/api/export/experience/${experienceId}?format=${format}&visuals=${includeVisuals}`;
      }
      
      // Make the export request
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error(`Export failed with status: ${response.status}`);
      }
      
      // Get the filename from the Content-Disposition header if available
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = `${experienceName.replace(/\s+/g, '_').toLowerCase()}_${exportType}`;
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1];
        }
      }
      
      // Add appropriate extension if not included
      if (!filename.includes('.')) {
        filename += format === 'pdf' ? '.pdf' : '.csv';
      }
      
      // Create a blob from the response
      const blob = await response.blob();
      
      // Create a download link and trigger the download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setSuccess(`${exportType.charAt(0).toUpperCase() + exportType.slice(1)} exported successfully!`);
    } catch (err) {
      console.error('Export error:', err);
      setError('Failed to export. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Get title based on export type
  const getTitle = () => {
    switch (exportType) {
      case 'timeline':
        return 'Export Timeline';
      case 'budget':
        return 'Export Budget';
      case 'both':
        return 'Export Experience';
      default:
        return 'Export';
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{getTitle()}</h2>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>
        
        <div className={styles.modalContent}>
          {error && <div className={styles.errorMessage}>{error}</div>}
          {success && <div className={styles.successMessage}>{success}</div>}
          
          <div className={styles.exportOptions}>
            <div className={styles.optionGroup}>
              <label className={styles.optionLabel}>Export Format</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioOption}>
                  <input
                    type="radio"
                    name="format"
                    value="pdf"
                    checked={format === 'pdf'}
                    onChange={handleFormatChange}
                  />
                  PDF Document
                </label>
                
                {/* Only show CSV option for budget exports */}
                {(exportType === 'budget' || exportType === 'both') && (
                  <label className={styles.radioOption}>
                    <input
                      type="radio"
                      name="format"
                      value="csv"
                      checked={format === 'csv'}
                      onChange={handleFormatChange}
                    />
                    CSV Spreadsheet
                  </label>
                )}
              </div>
            </div>
            
            {/* Only show visual option for PDF exports */}
            {format === 'pdf' && (
              <div className={styles.optionGroup}>
                <label className={styles.checkboxOption}>
                  <input
                    type="checkbox"
                    checked={includeVisuals}
                    onChange={(e) => setIncludeVisuals(e.target.checked)}
                  />
                  Include visual charts and graphics
                </label>
              </div>
            )}
          </div>
          
          <div className={styles.previewContainer}>
            <h3 className={styles.previewTitle}>Export Preview</h3>
            {format === 'pdf' ? (
              <div className={styles.previewContent}>
                {exportType === 'timeline' || exportType === 'both' ? (
                  <p>Your timeline will be exported as a PDF document with all phases, items, dates, and statuses.</p>
                ) : null}
                
                {exportType === 'budget' || exportType === 'both' ? (
                  <p>Your budget will be exported as a PDF document with all categories, items, and financial summaries.</p>
                ) : null}
                
                {includeVisuals && (
                  <p>Visual charts and graphics will be included to help visualize your planning data.</p>
                )}
              </div>
            ) : (
              <div className={styles.previewContent}>
                <p>Your budget data will be exported as a CSV file compatible with Excel, Google Sheets, and other spreadsheet applications.</p>
                <p>The CSV will include all budget categories, items, estimated and actual costs.</p>
              </div>
            )}
          </div>
        </div>
        
        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={onClose} disabled={isLoading}>
            Cancel
          </button>
          <button 
            className={styles.exportButton} 
            onClick={handleExport}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className={styles.loadingSpinner}></span>
                Exporting...
              </>
            ) : (
              `Export as ${format.toUpperCase()}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
