'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './FloatingButtons.module.css';

interface FloatingActionButtonsProps {
  onStartProject?: (projectDescription: string) => void;
  onScheduleDemo?: () => void;
  isChatbotOpen?: boolean;
}

const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({
  onStartProject,
  onScheduleDemo,
  isChatbotOpen = false,
}) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isInputMode, setIsInputMode] = useState<boolean>(false);
  const [quickInputValue, setQuickInputValue] = useState<string>('');
  const [isHidden, setIsHidden] = useState<boolean>(false);
  
  const quickInputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isInputMode) {
        exitInputMode();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (isInputMode && wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        exitInputMode();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isInputMode]);

  const handleStartProjectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isInputMode) {
      enterInputMode();
    }
  };

  const enterInputMode = () => {
    setIsInputMode(true);
    setTimeout(() => {
      quickInputRef.current?.focus();
    }, 100);
  };

  const exitInputMode = () => {
    setIsInputMode(false);
    setQuickInputValue('');
  };

  const handleQuickSubmit = () => {
    const value = quickInputValue.trim();
    if (value) {
      onStartProject?.(value);
      exitInputMode();
    }
  };

  const handleQuickInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleQuickSubmit();
    }
  };

  const handleScheduleDemoClick = () => {
    onScheduleDemo?.();
  };

  return (
    <div 
      className={`${styles.floatingActions} ${isMinimized ? styles.minimized : ''} ${isHidden ? styles.hiddenDown : ''}`}
    >
      {/* Schedule Demo Button MUST BE FIRST for CSS sibling selector */}
      <button 
        className={`${styles.scheduleDemoBtn} ${isChatbotOpen ? styles.expanded : ''}`}
        onClick={handleScheduleDemoClick}
        aria-label="Schedule demo"
      >
        <svg className={styles.scheduleDemoIcon} viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span className={styles.scheduleDemoText}>Schedule demo</span>
      </button>
      
      {/* Start Project Button */}
      <div className={styles.floatingBriefBtn}>
        <div 
          ref={wrapperRef}
          className={`${styles.briefBtnWrapper} ${isInputMode ? styles.inputMode : ''}`}
          onClick={handleStartProjectClick}
        >
          {/* Normal Button Content */}
          <div 
            className={`${styles.briefBtnContent} ${isInputMode ? styles.hidden : ''}`}
          >
            <span className={styles.startProjectText}>
              Start your project
            </span>
            <div className={styles.startProjectIconContainer}>
              <svg className={styles.startProjectIcon} viewBox="0 0 24 24">
                <path d="M12 5v14m-7-7h14"></path>
              </svg>
            </div>
          </div>
          
          {/* Quick Input Mode */}
          <div className={`${styles.briefInputMode} ${isInputMode ? styles.active : ''}`}>
            <input
              ref={quickInputRef}
              type="text"
              className={styles.briefQuickInput}
              placeholder="Describe your project in a few words..."
              value={quickInputValue}
              onChange={(e) => setQuickInputValue(e.target.value)}
              onKeyPress={handleQuickInputKeyPress}
              autoComplete="off"
            />
            <button 
              className={styles.briefSubmitBtn}
              onClick={handleQuickSubmit}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingActionButtons;