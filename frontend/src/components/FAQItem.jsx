import React, { useState } from 'react';
import styles from '../styles/FAQ.module.css'; 

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.faqItem}>
      <div className={styles.faqQuestion} onClick={toggleOpen}>
        <h3>{question}</h3>
        <span className={styles.toggleIcon}>{isOpen ? '−' : '+'}</span>
      </div>
      {isOpen && (
        <div className={styles.faqAnswer}>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;