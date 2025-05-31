import React, { useState } from 'react';
import styles from './contactUs.module.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    occasion: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the data to an API
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      occasion: '',
      message: ''
    });
    
    // Reset submission message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };
  
  const occasionTypes = [
    "Select Occasion Type",
    "Destination Wedding",
    "Family Reunion",
    "Milestone Birthday",
    "Anniversary",
    "Graduation Celebration",
    "Corporate Retreat",
    "Other"
  ];
  
  const contactMethods = [
    {
      icon: "📍",
      method: "Visit Us",
      details: "123 Emotion Avenue, Suite 200, San Francisco, CA 94103",
      link: "#"
    },
    {
      icon: "📱",
      method: "Call Us",
      details: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: "✉️",
      method: "Email Us",
      details: "hello@itournary.com",
      link: "mailto:hello@itournary.com"
    }
  ];
  
  return (
    <div className={styles.contactContainer}>
      {/* Header Section */}
      <div className={styles.contactHeader} style={{backgroundImage: `url('/images/contact/contact-hero.jpg')`}}>
        <div className={styles.headerOverlay}>
          <h1 className={styles.pageTitle}>Get in Touch</h1>
          <p className={styles.pageSubtitle}>
            We are here to help you plan meaningful occasions that celebrate the moments that matter.
          </p>
        </div>
      </div>
      
      {/* Main Contact Section */}
      <div className={styles.contactContent}>
        <div className={styles.contactForm}>
          <h2 className={styles.sectionTitle}>Send Us a Message</h2>
          
          {submitted && (
            <div className={styles.successMessage}>
              Thank you for your message! We will get back to you within 24 hours.
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.formInput}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.formInput}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="occasion" className={styles.formLabel}>Occasion Type</label>
              <select
                id="occasion"
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
                className={styles.formSelect}
              >
                {occasionTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={styles.formTextarea}
                rows="5"
                required
              ></textarea>
            </div>
            
            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>
        </div>
        
        <div className={styles.contactInfo}>
          <div className={styles.contactMethods}>
            <h2 className={styles.sectionTitle}>Contact Information</h2>
            
            <div className={styles.contactMethodsList}>
              {contactMethods.map((method, index) => (
                <div key={index} className={styles.contactMethod}>
                  <div className={styles.methodIcon}>{method.icon}</div>
                  <div className={styles.methodInfo}>
                    <h3 className={styles.methodTitle}>{method.method}</h3>
                    <a href={method.link} className={styles.methodDetails}>
                      {method.details}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.officeHours}>
            <h3 className={styles.officeHoursTitle}>Our Office Hours</h3>
            <div className={styles.hoursTable}>
              <div className={styles.hoursRow}>
                <span className={styles.day}>Monday - Friday:</span>
                <span className={styles.hours}>9:00 AM - 6:00 PM PST</span>
              </div>
              <div className={styles.hoursRow}>
                <span className={styles.day}>Saturday:</span>
                <span className={styles.hours}>10:00 AM - 4:00 PM PST</span>
              </div>
              <div className={styles.hoursRow}>
                <span className={styles.day}>Sunday:</span>
                <span className={styles.hours}>Closed</span>
              </div>
            </div>
            <p className={styles.emergencyContact}>
              For urgent inquiries outside of business hours, please email
              <a href="mailto:urgent@itournary.com" className={styles.emergencyEmail}> urgent@itournary.com</a>
            </p>
          </div>
        </div>
      </div>
      
      {/* FAQs Section */}
      <div className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>How far in advance should I plan my occasion with iTournary?</h3>
            <p className={styles.faqAnswer}>
              For most major occasions like weddings or significant milestone celebrations, we recommend starting the planning process 12-18 months in advance. For smaller occasions, 6-8 months is typically sufficient. However, we can accommodate shorter timeframes when necessary.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Do you work with specific destinations or can you plan anywhere?</h3>
            <p className={styles.faqAnswer}>
              Our team of experts can plan occasions in destinations worldwide. We have established relationships with vendors in many popular destinations, but we also specialize in creating exceptional experiences in unique or off-the-beaten-path locations.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>How do you handle guests with different budget constraints?</h3>
            <p className={styles.faqAnswer}>
              We understand that guests may have varying budget constraints, particularly for destination events. We work with you to create options at different price points for accommodations and activities, ensuring everyone can participate in a way that works for them.
            </p>
          </div>
        </div>
      </div>
      
      {/* Newsletter Section */}
      <div className={styles.newsletterSection}>
        <div className={styles.newsletterContent}>
          <h2 className={styles.newsletterTitle}>Stay Inspired</h2>
          <p className={styles.newsletterText}>
            Subscribe to our newsletter for travel inspiration, planning tips, and exclusive offers.
          </p>
          <form className={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className={styles.newsletterInput} 
              aria-label="Email for newsletter"
            />
            <button type="submit" className={styles.newsletterButton}>Subscribe</button>
          </form>
          <p className={styles.newsletterDisclaimer}>
            By subscribing, you agree to our privacy policy and consent to receive updates from iTournary.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
