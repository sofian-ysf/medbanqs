"use client";

import React, { useState, useEffect, useRef } from 'react';

interface OnboardingAIProps {
  currentStep?: number;
  stepName?: string;
  pageData?: any;
  userRole?: string;
  generatedBrief?: any;
}

interface AIMessage {
  id: string;
  text: string;
  timestamp: Date;
  type: 'welcome' | 'guidance' | 'tip' | 'completion';
}

export default function OnboardingAI({ 
  currentStep = 0, 
  stepName = '', 
  pageData = {},
  userRole = 'client',
  generatedBrief = null
}: OnboardingAIProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  const addMessage = (text: string, type: AIMessage['type'] = 'guidance') => {
    const newMessage: AIMessage = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      timestamp: new Date(),
      type
    };
    setMessages(prev => [...prev, newMessage]);
  };

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  // Provide contextual guidance based on current step
  useEffect(() => {
    if (!stepName) return;

    // Clear previous messages when step changes
    setMessages([]);
    setIsThinking(true);

    // Simulate AI thinking time
    setTimeout(() => {
      setIsThinking(false);
      
      let guidanceText = '';
      
      switch (stepName.toLowerCase()) {
        case 'welcome':
          guidanceText = generatedBrief 
            ? `Great to have you back! I can see you've already created a project brief for "${generatedBrief.parsedData?.title || 'your project'}". Let's get you set up!`
            : "Welcome to Moccet! I'm here to guide you through the onboarding process.";
          addMessage(guidanceText, 'welcome');
          break;
          
        case 'projectoverview':
          guidanceText = generatedBrief
            ? `I see your project "${generatedBrief.parsedData?.title}" has a budget of $${generatedBrief.priceData?.totalPrice?.toLocaleString()}. This looks like a ${generatedBrief.parsedData?.timeline} project.`
            : "Let's review your project details. Make sure everything looks accurate.";
          addMessage(guidanceText, 'guidance');
          break;
          
        case 'serviceagreement':
          addMessage("I'll walk you through the service agreement. This outlines the investment and payment terms for your project.", 'guidance');
          if (generatedBrief?.priceData?.totalPrice) {
            addMessage(`Your project investment is $${generatedBrief.priceData.totalPrice.toLocaleString()}. Payment will be structured in milestones.`, 'tip');
          }
          break;
          
        case 'questionnaire':
          addMessage("Time for a quick questionnaire! This helps us understand your preferences and requirements better.", 'guidance');
          addMessage("💡 Tip: Be specific about your timeline and communication preferences.", 'tip');
          break;
          
        case 'contract signature':
          addMessage("Let's get your contract signed! You can sign electronically or request a paper copy.", 'guidance');
          addMessage("🔒 All signatures are encrypted and legally binding.", 'tip');
          break;
          
        case 'paymentsetup':
          addMessage("Time to set up secure payment. We only charge when milestones are completed.", 'guidance');
          addMessage("💳 Your payment information is encrypted and secure.", 'tip');
          break;
          
        case 'slackinvite':
          addMessage("Let's connect you with your project team on Slack for seamless communication.", 'guidance');
          break;
          
        case 'thank you':
          addMessage("🎉 Congratulations! Your project is now live and our talent team is reviewing it.", 'completion');
          addMessage("You'll receive your customized project dashboard link within 24 hours.", 'tip');
          break;
          
        default:
          addMessage(`I'm here to help with the ${stepName} step. Let me know if you have any questions!`, 'guidance');
      }
    }, 800);
  }, [stepName, generatedBrief]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <div className={`onboarding-ai ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="ai-header" onClick={handleToggle}>
        <div className="ai-status">
          <div className={`ai-indicator ${isThinking ? 'thinking' : 'ready'}`} />
          <span className="ai-title">AI Guide</span>
          {isThinking && <span className="thinking-text">Thinking...</span>}
        </div>
        <button className="toggle-btn">
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {isExpanded && (
        <div className="ai-content">
          <div className="messages-container" ref={messagesRef}>
            {messages.length === 0 && !isThinking ? (
              <div className="welcome-message">
                <div className="ai-avatar">🤖</div>
                <p>Hi! I'm your AI guide. I'll help you through the onboarding process.</p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className={`ai-message ${message.type}`}>
                  <div className="message-content">
                    <span className="message-text">{message.text}</span>
                    <span className="message-time">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))
            )}
            
            {isThinking && (
              <div className="thinking-indicator">
                <div className="thinking-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>

          {messages.length > 0 && (
            <div className="ai-actions">
              <button onClick={clearMessages} className="clear-btn">
                Clear messages
              </button>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .onboarding-ai {
          position: fixed;
          right: 20px;
          bottom: 20px;
          width: 320px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .onboarding-ai.collapsed {
          width: 200px;
        }

        .ai-header {
          padding: 16px;
          border-bottom: 1px solid #f3f4f6;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ai-status {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ai-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
        }

        .ai-indicator.thinking {
          background: #f59e0b;
          animation: pulse 1.5s infinite;
        }

        .ai-title {
          font-weight: 600;
          color: #374151;
          font-size: 14px;
        }

        .thinking-text {
          font-size: 12px;
          color: #6b7280;
          font-style: italic;
        }

        .toggle-btn {
          background: none;
          border: none;
          font-size: 18px;
          color: #6b7280;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
        }

        .toggle-btn:hover {
          background: #f3f4f6;
        }

        .ai-content {
          max-height: 350px;
          display: flex;
          flex-direction: column;
        }

        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          max-height: 280px;
        }

        .welcome-message {
          text-align: center;
          color: #6b7280;
          font-size: 14px;
          line-height: 1.5;
        }

        .ai-avatar {
          font-size: 24px;
          margin-bottom: 8px;
        }

        .ai-message {
          margin-bottom: 12px;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 13px;
          line-height: 1.4;
        }

        .ai-message.welcome {
          background: #f0f9ff;
          border-left: 3px solid #0ea5e9;
        }

        .ai-message.guidance {
          background: #eff6ff;
          border-left: 3px solid #3b82f6;
        }

        .ai-message.tip {
          background: #fefce8;
          border-left: 3px solid #eab308;
        }

        .ai-message.completion {
          background: #f0fdf4;
          border-left: 3px solid #22c55e;
        }

        .message-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .message-text {
          color: #374151;
        }

        .message-time {
          font-size: 11px;
          color: #9ca3af;
          align-self: flex-end;
        }

        .thinking-indicator {
          text-align: center;
          padding: 8px;
        }

        .thinking-dots {
          display: inline-flex;
          gap: 2px;
        }

        .thinking-dots span {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #6b7280;
          animation: thinking 1.4s infinite both;
        }

        .thinking-dots span:nth-child(1) { animation-delay: -0.32s; }
        .thinking-dots span:nth-child(2) { animation-delay: -0.16s; }

        .ai-actions {
          padding: 12px 16px;
          border-top: 1px solid #f3f4f6;
        }

        .clear-btn {
          width: 100%;
          padding: 6px 12px;
          background: #f9fafb;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 12px;
          color: #6b7280;
          cursor: pointer;
        }

        .clear-btn:hover {
          background: #f3f4f6;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes thinking {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }

        @media (max-width: 768px) {
          .onboarding-ai {
            position: relative;
            right: auto;
            bottom: auto;
            width: 100%;
            margin: 20px 0;
          }
        }
      `}</style>
    </div>
  );
}