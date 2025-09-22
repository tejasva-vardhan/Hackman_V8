"use client";

import React, { useState } from 'react';
import Image from 'next/image';
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
        <span className={styles.toggleIcon}>{isOpen ? '−' : '+' }</span>
      </div>
      {isOpen && (
        <div className={styles.faqAnswer}>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};


const faqData = [
  {
    id: 1,
    question: "Lorem ipsum dolor sit amet",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  },
  {
    id: 2,
    question: "Lorem ipsum dolor sit amet, consectetur",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  },
  {
    id: 3,
    question: "Lorem ipsum dolor sit amet",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  },
  {
    id: 4,
    question: "Lorem ipsum dolor sit amet, consectetur",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  },
];


const FAQ = () => {
  return (
    <section className={styles.faqSection}>
      {/* Flex Item 1: The Skull */}
      <Image
        src="/skull.png"
        alt="Decorative Skull"
        width={300}
        height={400}
        className={styles.faqSkullLeft}
      />

      {/* Flex Item 2: A new wrapper for all text content */}
      <div className={styles.faqContent}>
        <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
        <div className={styles.faqContainer}>
          {faqData.map((item) => (
            <FAQItem key={item.id} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;