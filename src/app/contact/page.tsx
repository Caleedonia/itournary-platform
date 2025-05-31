'use client';

import React, { useState } from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import styles from './contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // In production, this would call an API endpoint
      // For now, we'll simulate a successful submission
      console.log('Form submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFormStatus({
        submitted: true,
        error: false,
        message: 'Thank you for your message! We will get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setFormStatus({
        submitted: true,
        error: true,
        message: 'There was an error submitting your message. Please try again.'
      });
    }
  };
  
  return (
    <MainLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>Contact Us</h1>
        
        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <h2>Get in Touch</h2>
            <p>We'd love to hear from you! Fill out the form and we'll get back to you as soon as possible.</p>
            
            <div className={styles.contactMethod}>
              <h3>Email</h3>
              <p>info@itournary.com</p>
            </div>
            
            <div className={styles.contactMethod}>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            
            <div className={styles.contactMethod}>
              <h3>Address</h3>
              <p>123 Travel Lane<br />San Francisco, CA 94103</p>
            </div>
          </div>
          
          <div className={styles.contactForm}>
            {formStatus.submitted ? (
              <div className={`${styles.formMessage} ${formStatus.error ? styles.error : styles.success}`}>
                {formStatus.message}
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                  />
                </div>
                
                <button type="submit" className={styles.submitButton}>
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}