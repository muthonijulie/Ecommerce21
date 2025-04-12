
// import { FaTools, FaHome, FaClock } from "react-icons/fa";
import "./Contact.module.css"; // Importing CSS module

import React, { useState, ChangeEvent, FormEvent } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    status: 'idle',
    message: '',
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      setIsSubmitting(true);
  
      try {
        const response = await fetch('http://localhost:5000/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          setSubmitStatus({
            status: 'success',
            message: 'Thank you for your message! We will get back to you soon.',
          });
  
          // Reset form
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
          });
  
          // Clear success message after 5 seconds
          setTimeout(() => {
            setSubmitStatus({
              status: 'idle',
              message: '',
            });
          }, 5000);
        } else {
          const errorData = await response.json();
          setSubmitStatus({
            status: 'error',
            message: errorData.message || 'Something went wrong. Please try again.',
          });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitStatus({
          status: 'error',
          message: 'Failed to submit the form. Please try again later.',
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  return (
    <div className="contact-form-container">
      <h2>Contact Us</h2>
      <p className="contact-intro">
        Have questions about your order or our products? We're here to help!
      </p>

      {submitStatus.status === 'success' && (
        <div className="success-message">{submitStatus.message}</div>
      )}

      {submitStatus.status === 'error' && (
        <div className="error-message">{submitStatus.message}</div>
      )}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">
            Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            placeholder="Your name"
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            placeholder="your.email@example.com"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="subject">
            Subject <span className="required">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={errors.subject ? 'error' : ''}
            placeholder="What is this regarding?"
          />
          {errors.subject && <span className="error-text">{errors.subject}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">
            Message <span className="required">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={errors.message ? 'error' : ''}
            placeholder="Please provide as much detail as possible..."
            rows={5}
          />
          {errors.message && <span className="error-text">{errors.message}</span>}
        </div>

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
  {/* return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.iconWrapper}>
          <FaTools className={styles.toolIcon} />
        </div>

        <h1 className={styles.title}>Work in Progress</h1>

        <div className={styles.divider}></div>

        <p className={styles.description}>
        We're making improvements! This page is currently under development as we work to enhance your experience. Stay tuned for exciting updates!
        </p>

        <div className={styles.cardsContainer}>
          <div className={styles.infoCard}>
            <FaClock className={styles.cardIcon} />
            <h3>Coming Soon</h3>
            <p>Check back for updates</p>
          </div>

          <a href="/" className={styles.infoCard}>
            <FaHome className={styles.cardIcon} />
            <h3>Return Home</h3>
            <p>Explore other sections</p>
          </a>
        </div>
      </div>
    </div>
  ); */}
