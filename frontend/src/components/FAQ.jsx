"use client";
import React from 'react';
import FAQItem from './FAQItem'; 
import styles from '../styles/FAQ.module.css';

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
      <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
      <div className={styles.faqContainer}>
        {faqData.map((item) => (
          <FAQItem key={item.id} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  );
};

export default FAQ;