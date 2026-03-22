"use client";

import React, { useState, useEffect } from "react";

interface AnimatedTypewriterProps {
  words: string[];
}

const AnimatedTypewriter: React.FC<AnimatedTypewriterProps> = ({
  words = ["faster", "smarter", "better"]
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 50 : 150;
    const pauseAtEnd = 1500;
    const pauseAfterDelete = 500;

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText.length < currentWord.length) {
        setCurrentText((prev) => currentWord.slice(0, prev.length + 1));
      } else if (!isDeleting && currentText.length === currentWord.length) {
        setTimeout(() => setIsDeleting(true), pauseAtEnd);
      } else if (isDeleting && currentText.length > 0) {
        setCurrentText((prev) => prev.slice(0, -1));
      } else if (isDeleting && currentText.length === 0) {
        setTimeout(() => {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, pauseAfterDelete);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className="text-purple-600">
      <span className="inline-block" style={{ minHeight: '1em' }}>
        {currentText || '\u00A0'}
      </span>
      <span
        className={`transition-opacity duration-100 ${
          showCursor ? "opacity-100" : "opacity-0"
        }`}
      >
        |
      </span>
    </span>
  );
};

export default AnimatedTypewriter;
