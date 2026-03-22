'use client';

import React, { useRef, useLayoutEffect, TextareaHTMLAttributes } from 'react';

interface ResizableTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onBlur'> {
  initialValue?: string;
  onBlur?: (value: string) => void;
  minHeight?: number;
}

/**
 * Uncontrolled textarea component that automatically resizes based on content.
 * Useful for forms where you want the textarea to grow as the user types.
 */
const ResizableTextarea: React.FC<ResizableTextareaProps> = ({ 
  initialValue = '', 
  placeholder,
  onBlur,
  minHeight = 80,
  className = '',
  style,
  ...props 
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Function to auto-resize the textarea
  const autoResize = (element: HTMLTextAreaElement) => {
    if (!element) return;
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };

  // Set initial value and resize on mount
  useLayoutEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.value = initialValue;
      autoResize(textareaRef.current);
    }
  }, [initialValue]);

  // Handle input to trigger resize
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    autoResize(e.currentTarget);
  };

  // Handle blur to notify parent of final value
  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (onBlur) {
      onBlur(e.currentTarget.value);
    }
  };

  const defaultClassName = `
    w-full px-3 py-2 
    border border-gray-300 rounded-md 
    focus:ring-2 focus:ring-blue-500 focus:border-transparent 
    transition-colors resize-none
  `.trim();

  const combinedClassName = className 
    ? `${defaultClassName} ${className}` 
    : defaultClassName;

  return (
    <textarea
      ref={textareaRef}
      placeholder={placeholder}
      onInput={handleInput}
      onBlur={handleBlur}
      className={combinedClassName}
      style={{
        minHeight: `${minHeight}px`,
        overflow: 'hidden',
        ...style
      }}
      {...props}
    />
  );
};

export default ResizableTextarea;