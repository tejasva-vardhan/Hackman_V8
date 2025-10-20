"use client";
import React, { useState, useRef, useEffect } from 'react';
import styles from './Timeline.module.css';
import { Jolly_Lodger } from 'next/font/google';

const jolly = Jolly_Lodger({ weight: '400', subsets: ['latin'], display: 'swap' });

interface TimelineEvent {
  date: string;
  event: string;
}

interface ScheduleEvent {
  time: string;
  event: string;
}

const Timeline: React.FC = () => {
  const [activeView, setActiveView] = useState<'timeline' | 'schedule'>('timeline');
  const timelineRef = useRef<HTMLDivElement>(null);
  const scrollGhostRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showGhost, setShowGhost] = useState(true);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const timelineEvents: TimelineEvent[] = [
    { date: '22nd October', event: 'Registrations open' },
    { date: '26th October', event: 'Registrations close' },
    { date: '26-27 October', event: 'Filtering of teams' },
    { date: '27-28 October', event: 'Payment window' },
    { date: '31st October', event: 'Hackathon' }
  ];

  const scheduleEvents: ScheduleEvent[] = [
    { time: '8.30 am', event: 'Check in' },
    { time: '9.00-11.30 am', event: 'Inauguration' },
    { time: '12.00 pm', event: 'Hackathon starts' },
    { time: '2.00 pm', event: 'Lunch Break' },
    { time: '5.30 pm', event: 'First mentoring session' },
    { time: '6.00 pm', event: 'Snacks' },
    { time: '9.00 pm', event: 'Dinner' },
    { time: '11.00 pm', event: 'Second mentoring session' },
    { time: '7.00 am', event: 'Third mentoring session' },
    { time: '8.30 am', event: 'Breakfast' },
    { time: '10.30 am', event: 'Finalization of top 10' },
    { time: '11.00 am', event: 'Announcement' },
    { time: '11.30 am', event: 'Pitching' },
    { time: '1-2.30 pm', event: 'Valedictory ceremony' }
  ];

  // Scroll ghost movement (desktop only) - FIXED POSITIONING
  useEffect(() => {
    if (isMobile || !showGhost || activeView === 'schedule') return;

    const handleScroll = () => {
      if (scrollGhostRef.current && timelineRef.current) {
        const scrollY = window.scrollY;
        const timelineTop = timelineRef.current.offsetTop;
        const timelineHeight = timelineRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

        // Fixed: Calculate track start position
        const trackStartOffset = 200;
        
        const timelineStart = timelineTop - windowHeight * 0.3;
        const timelineEnd = timelineTop + timelineHeight - windowHeight * 0.7;
        
        if (scrollY >= timelineStart && scrollY <= timelineEnd) {
          const progress = (scrollY - timelineStart) / (timelineEnd - timelineStart);
          const trackHeight = timelineHeight - trackStartOffset - 100;
          const indicatorPosition = trackStartOffset + (progress * trackHeight);
          scrollGhostRef.current.style.top = `${indicatorPosition}px`;
        } else if (scrollY < timelineStart) {
          scrollGhostRef.current.style.top = `${trackStartOffset}px`;
        } else if (scrollY > timelineEnd) {
          scrollGhostRef.current.style.top = `${timelineHeight - 100}px`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, showGhost, activeView]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animateIn);
            setIsInView(true);
          } else {
            entry.target.classList.remove(styles.animateIn);
            setIsInView(false);
          }
        });
      },
      { threshold: 0.15 }
    );
    
    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // RESET TO TIMELINE WHEN SCROLLING AWAY
  useEffect(() => {
    if (activeView === 'schedule' && !isInView) {
      if (timelineRef.current) timelineRef.current.classList.remove(styles.scheduleOpen);
      setActiveView('timeline');
      setShowGhost(true);
    }
  }, [isInView, activeView]);

  const handleDateClick = (date: string) => {
    if (date.includes('31st')) {
      setShowGhost(false);
      setActiveView('schedule');
      // Scroll to top of timeline section when switching to schedule
      setTimeout(() => {
        if (timelineRef.current) {
          timelineRef.current.scrollIntoView({ behavior: 'smooth' });
          timelineRef.current.classList.add(styles.scheduleOpen);
        }
      }, 20);
    }
  };

  useEffect(() => {
    if (activeView === 'timeline') setShowGhost(true);
  }, [activeView]);

  const handleBackToTimeline = () => {
    setShowGhost(true);
    if (timelineRef.current) {
      timelineRef.current.classList.remove(styles.scheduleOpen);
    }
    setActiveView('timeline');
  };

  const firstHalfSchedule = scheduleEvents.slice(0, Math.ceil(scheduleEvents.length / 2));
  const secondHalfSchedule = scheduleEvents.slice(Math.ceil(scheduleEvents.length / 2));

  return (
    // CHANGE 1: Remove the entire <style jsx global> section
    <section ref={timelineRef} className={styles.timelineSection}>
      {/* Scroll Ghost (Desktop only) */}
      {!isMobile && (
        <div 
          className={`${styles.scrollGhost} ${!showGhost ? styles.ghostHidden : ''}`}
          ref={scrollGhostRef}
        >
          👻
        </div>
      )}

      <div className={styles.timelineContainer}>
        {/* CHANGE 2: Remove "timeline-title" class */}
        <h2 className={`${styles.title} ${jolly.className}`}>
          EVENT TIMELINE
        </h2>
        
        {/* CHANGE 3: Remove "animate-fade-up" class */}
        <p className={styles.subtitle}>
          Mark your calendars for Hackman V8's spooky coding adventure
        </p>

        {activeView === 'timeline' ? (
          <div className={styles.timelineView}>
            <div className={styles.timelineTrack}>
              <div className={styles.trackLine}></div>
              
              {timelineEvents.map((item, index) => (
                // CHANGE 4: Remove "animate-fade-up" class from timeline items
                <div
                  key={index}
                  className={`${styles.timelineItem} ${styles[`item${index}`]}`}
                >
                  {/* Desktop Layout */}
                  {!isMobile && index % 2 === 0 ? (
                    <>
                      <div 
                        className={`${styles.leftCard} ${item.date.includes('31st') ? styles.highlighted : ''}`}
                        onClick={() => handleDateClick(item.date)}
                      >
                        <div className={styles.cardContent}>
                          <div className={styles.date}>{item.date}</div>
                          <div className={styles.event}>{item.event}</div>
                          {item.date.includes('31st') && (
                            <div className={styles.clickHint}>Click to view schedule →</div>
                          )}
                        </div>
                      </div>

                      <div 
                        className={`${styles.timelineMarker} ${item.date.includes('31st') ? styles.highlightedMarker : ''}`}
                        onClick={() => handleDateClick(item.date)}
                      >
                        <div className={styles.markerDot}></div>
                        <div className={styles.markerPulse}></div>
                      </div>

                      <div className={styles.rightCard} style={{ visibility: 'hidden' }}>
                        {/* Empty right card for alignment */}
                      </div>
                    </>
                  ) : !isMobile ? (
                    <>
                      <div className={styles.leftCard} style={{ visibility: 'hidden' }}>
                        {/* Empty left card for alignment */}
                      </div>

                      <div 
                        className={`${styles.timelineMarker} ${item.date.includes('31st') ? styles.highlightedMarker : ''}`}
                        onClick={() => handleDateClick(item.date)}
                      >
                        <div className={styles.markerDot}></div>
                        <div className={styles.markerPulse}></div>
                      </div>

                      <div 
                        className={`${styles.rightCard} ${item.date.includes('31st') ? styles.highlighted : ''}`}
                        onClick={() => handleDateClick(item.date)}
                      >
                        <div className={styles.cardContent}>
                          <div className={styles.date}>{item.date}</div>
                          <div className={styles.event}>{item.event}</div>
                          {item.date.includes('31st') && (
                            <>
                              <div className={styles.mainEventTag}>Main Event</div>
                              <div className={styles.clickHint}>Click to view schedule →</div>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Mobile Layout */
                    <>
                      <div 
                        className={`${styles.timelineMarker} ${item.date.includes('31st') ? styles.highlightedMarker : ''}`}
                        onClick={() => handleDateClick(item.date)}
                      >
                        <div className={styles.markerDot}></div>
                        <div className={styles.markerPulse}></div>
                      </div>

                      <div 
                        className={`${styles.mobileCard} ${item.date.includes('31st') ? styles.highlighted : ''}`}
                        onClick={() => handleDateClick(item.date)}
                      >
                        <div className={styles.cardContent}>
                          <div className={styles.date}>{item.date}</div>
                          <div className={styles.event}>{item.event}</div>
                          {item.date.includes('31st') && (
                            <>
                              <div className={styles.mainEventTag}>Main Event</div>
                              <div className={styles.clickHint}>Tap to view schedule →</div>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.scheduleView}>
            <div className={`${styles.scheduleHeader} ${activeView === 'schedule' ? styles.sticky : ''}`}>
              <button className={styles.backButton} onClick={handleBackToTimeline}>
                ← Back to Timeline
              </button>
              <h3 className={`${styles.scheduleTitle} ${jolly.className}`}>Hackathon Day Schedule</h3>
            </div>

            <div className={styles.scheduleContainer}>
              <div className={styles.scheduleDay}>
                <h4 className={styles.dayTitle}>October 31st</h4>
                <p className={styles.daySubtitle}>24 Hours of Coding & Innovation</p>
              </div>

              <div className={styles.scheduleColumns}>
                {/* First Column */}
                <div className={styles.scheduleColumn}>
                  {!isMobile && <h5 className={styles.columnTitle}>Day 1</h5>}
                  {firstHalfSchedule.map((item, index) => (
                    <div key={index} className={styles.scheduleItem}>
                      <div className={styles.timeSlot}>{item.time}</div>
                      <div className={styles.eventSlot}>{item.event}</div>
                    </div>
                  ))}
                </div>

                {/* Second Column (Desktop) or continue single column (Mobile) */}
                {!isMobile ? (
                  <div className={styles.scheduleColumn}>
                    <h5 className={styles.columnTitle}>Day 2</h5>
                    {secondHalfSchedule.map((item, index) => (
                      <div key={index} className={styles.scheduleItem}>
                        <div className={styles.timeSlot}>{item.time}</div>
                        <div className={styles.eventSlot}>{item.event}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.scheduleColumn}>
                    {secondHalfSchedule.map((item, index) => (
                      <div key={index} className={styles.scheduleItem}>
                        <div className={styles.timeSlot}>{item.time}</div>
                        <div className={styles.eventSlot}>{item.event}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.scheduleFooter}>
              <p>Get ready for 24 hours of coding, innovation, and Halloween fun! 🎃</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Timeline;