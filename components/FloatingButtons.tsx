'use client';

import React, { useState, useEffect } from 'react';
import styles from './FloatingButtons.module.css';

const FloatingActionButtons: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.offsetHeight;

      // Minimize when scrolled down
      setIsMinimized(scrollTop > 50);

      // Hide when near footer (500px offset for smooth transition)
      const footerOffset = 500;
      const isNearFooter = windowHeight + scrollTop >= documentHeight - footerOffset;
      setIsHidden(isNearFooter);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`${styles.floatingActions} ${isMinimized ? styles.minimized : ''} ${isHidden ? styles.hiddenDown : ''}`}
    >
      {/* Get Started Button */}
      <div className={styles.floatingBriefBtn}>
        <a
          href="/pricing"
          className={styles.briefBtnWrapper}
        >
          {/* Button Content */}
          <div className={styles.briefBtnContent}>
            <span className={styles.startProjectText}>
              Get Started
            </span>
            <div className={styles.startProjectIconContainer}>
              <svg className={styles.startProjectIcon} viewBox="0 0 24 24">
                <path d="M5 12h14m-7-7l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default FloatingActionButtons;
