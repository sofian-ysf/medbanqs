"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAIContext } from '@/lib/contexts/AIContext';
import { useBriefGeneratorContext } from '@/lib/contexts/BriefGeneratorContext';
import './BriefGeneratorAI.css';

interface InsightMessage {
  id: string;
  text: string;
  timestamp: Date;
  type: 'insight' | 'context' | 'suggestion';
}

// Helper function to detect type of input change
function detectInputChangeType(oldInput: string, newInput: string): string {
  if (!oldInput) return 'new';
  if (newInput.length > oldInput.length && newInput.includes(oldInput)) return 'addition';
  if (newInput.length < oldInput.length && oldInput.includes(newInput)) return 'deletion';
  return 'replacement';
}

export default function BriefGeneratorAI() {
  const { userIntent, addConversationEntry } = useAIContext();
  const { 
    currentStep, 
    currentQuestion, 
    currentInput, 
    isProcessing,
    previousAnswers,
    projectDescription,
    companyName,
    companyIntelligence,
    suggestionClicks
  } = useBriefGeneratorContext();
  const [isExpanded, setIsExpanded] = useState(true); // Start expanded
  const [insights, setInsights] = useState<InsightMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [lastAnalyzedInput, setLastAnalyzedInput] = useState('');
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const insightsContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const responseCache = useRef<Map<string, any>>(new Map());
  const lastQuestionRef = useRef<string>('');

  // Track question changes
  useEffect(() => {
    const questionKey = `${currentStep}_${currentQuestion}`;
    
    // If question changed, clear everything for fresh start
    if (questionKey !== lastQuestionRef.current) {
      lastQuestionRef.current = questionKey;
      
      // Clear cache for new question to ensure fresh responses
      responseCache.current.clear();
      
      // Clear all insights for new question - fresh start
      setInsights([]);
      
      // Reset analyzed input for new question
      setLastAnalyzedInput('');
      
      // Only generate welcome on the initial home screen, not on questions
      if (currentStep === 'home') {
        generateWelcomeInsight();
      }
    }
    
    // Auto-minimize on final brief page
    if (currentStep === 'final' || currentStep === 'finalBrief') {
      setIsExpanded(false);
    }
  }, [currentStep, currentQuestion]);

  const generateWelcomeInsight = async () => {
    if (isThinking) return;
    
    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create new abort controller
    abortControllerRef.current = new AbortController();
    
    setIsThinking(true);
    
    try {
      const response = await fetch('/api/ai/brief-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: abortControllerRef.current.signal,
        body: JSON.stringify({
          currentInput: projectDescription || '',
          currentStep: currentStep,
          currentQuestion: currentQuestion || 'Welcome to brief generator',
          conversationHistory: userIntent?.conversationHistory || [],
          previousAnswers: previousAnswers || {},
          projectDescription: projectDescription || '',
          companyName: companyName || '',
          companyIntelligence: companyIntelligence,
          suggestionClicks: suggestionClicks || [],
          isWelcomeMessage: true,
          context: {
            projectDescription: projectDescription || '',
            companyName: companyName || '',
            previousAnswers: previousAnswers || {},
            companyIntelligence: companyIntelligence,
            currentStep: currentStep,
            currentQuestion: currentQuestion || 'Welcome to brief generator',
            questionType: 'welcome',
            suggestionHistory: suggestionClicks || [],
            isInitialVisit: true
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.insight) {
          const welcomeInsight: InsightMessage = {
            id: `welcome_${Date.now()}`,
            text: data.insight,
            timestamp: new Date(),
            type: 'context'
          };
          
          setInsights([welcomeInsight]);
          
          // Add to conversation history
          addConversationEntry({
            aiResponse: data.insight,
            action: 'welcome_insight',
            detectedNeeds: data.detectedNeeds,
            urgencyLevel: data.urgencyLevel
          });
        }
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Error generating welcome insight:', error);
        // Only fall back to basic message if API completely fails
        const fallbackInsight = {
          id: `welcome_fallback_${Date.now()}`,
          text: "I'm your AI consultant. I'll provide strategic insights as you build your brief.",
          timestamp: new Date(),
          type: 'context' as const
        };
        setInsights([fallbackInsight]);
      }
    } finally {
      setIsThinking(false);
    }
  };

  // Debounced input analysis
  useEffect(() => {
    if (currentInput && currentInput !== lastAnalyzedInput && currentInput.length > 5) {
      // Clear existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Set new timer
      debounceTimerRef.current = setTimeout(() => {
        analyzeInput(currentInput);
      }, 600); // 600ms debounce for better responsiveness
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [currentInput, lastAnalyzedInput]);

  const analyzeInput = async (input: string) => {
    // Don't analyze if already thinking or if it's the same input for the same question
    if (isThinking || (input === lastAnalyzedInput && lastQuestionRef.current === `${currentStep}_${currentQuestion}`)) return;
    
    // Create cache key based on current context - include more context to ensure uniqueness
    const cacheKey = `${currentStep}_${currentQuestion}_${input.substring(0, 50)}_${insights.length}`;
    
    // Check cache first
    if (responseCache.current.has(cacheKey)) {
      const cachedResponse = responseCache.current.get(cacheKey);
      setInsights([{
        id: `insight_${Date.now()}`,
        text: cachedResponse.insight,
        timestamp: new Date(),
        type: cachedResponse.insightType || 'insight'
      }]);
      return;
    }
    
    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();
    
    setIsThinking(true);
    setLastAnalyzedInput(input);

    try {
      const response = await fetch('/api/ai/brief-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: abortControllerRef.current.signal,
        body: JSON.stringify({
          currentInput: input,
          currentStep,
          currentQuestion,
          conversationHistory: userIntent?.conversationHistory || [],
          previousAnswers: previousAnswers || {},
          projectDescription: projectDescription || '',
          companyName: companyName || '',
          companyIntelligence: companyIntelligence,
          suggestionClicks: suggestionClicks || [],
          // Add current question's conversation history
          currentQuestionInsights: insights.map(i => i.text),
          isEditing: input.includes(lastAnalyzedInput) && lastAnalyzedInput.length > 0,
          inputChangeType: detectInputChangeType(lastAnalyzedInput, input),
          lastAnalyzedInput: lastAnalyzedInput,
          context: {
            projectDescription: projectDescription || '',
            companyName: companyName || '',
            previousAnswers: previousAnswers || {},
            companyIntelligence: companyIntelligence,
            currentStep: currentStep,
            currentQuestion: currentQuestion,
            questionType: 'textarea',
            suggestionHistory: suggestionClicks || [],
            currentQuestionInsights: insights.map(i => i.text)
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI insights');
      }

      const data = await response.json();
      
      if (data.insight) {
        const newInsight: InsightMessage = {
          id: `insight_${Date.now()}`,
          text: data.insight,
          timestamp: new Date(),
          type: data.insightType || 'insight'
        };
        
        // For the same question, build conversation by appending
        // But keep it reasonable - max 3 insights per question
        const updatedInsights = insights.length < 3 ? [...insights, newInsight] : [...insights.slice(1), newInsight];
        setInsights(updatedInsights);
        
        // Cache the response
        responseCache.current.set(cacheKey, data);
        
        // Add to conversation history
        addConversationEntry({
          userMessage: input,
          aiResponse: data.insight,
          action: 'brief_insight',
          detectedNeeds: data.detectedNeeds,
          urgencyLevel: data.urgencyLevel
        });

        // Auto-expand if closed and we have a new insight
        if (!isExpanded) {
          setIsExpanded(true);
        }
      }
    } catch (error: any) {
      // Don't log aborted requests
      if (error.name !== 'AbortError') {
        console.error('Error getting AI insights:', error);
      }
    } finally {
      setIsThinking(false);
    }
  };

  // Auto-scroll to latest insight
  useEffect(() => {
    if (insightsContainerRef.current) {
      insightsContainerRef.current.scrollTop = insightsContainerRef.current.scrollHeight;
    }
  }, [insights]);

  const formatInsightText = (text: string): string => {
    // Apply smart formatting for numbers, percentages, and key terms
    return text
      .replace(/\b(\d+%)\b/g, '<span class="highlight-percentage">$1</span>')
      .replace(/\b(\d+x)\b/gi, '<span class="highlight-multiplier">$1</span>')
      .replace(/\$(\d+[BMK]?)/g, '<span class="highlight-money">$$1</span>')
      .replace(/\b(AI-powered|AI agents?|automation)\b/gi, '<span class="highlight-tech">$1</span>')
      .replace(/\b(risk|concern|challenge)\b/gi, '<span class="highlight-warning">$1</span>')
      .replace(/\b(opportunity|advantage|benefit)\b/gi, '<span class="highlight-success">$1</span>');
  };

  return (
    <div className={`brief-ai-assistant ${isExpanded ? 'expanded' : ''}`}>
      <div 
        className="brief-ai-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="brief-ai-title">
          <span className="brief-ai-icon">🧠</span>
          <span className="brief-ai-name">moccet connect</span>
          {isThinking && <span className="thinking-indicator">thinking...</span>}
        </div>
        <button className="expand-toggle">
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {isExpanded && (
        <div className="brief-ai-content">
          <div className="insights-container" ref={insightsContainerRef}>
            {insights.map((insight) => (
              <div 
                key={insight.id} 
                className={`insight-message ${insight.type}`}
              >
                <div 
                  className="insight-text"
                  dangerouslySetInnerHTML={{ 
                    __html: formatInsightText(insight.text) 
                  }}
                />
                <div className="insight-time">
                  {insight.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            ))}
            
            {insights.length === 0 && !isThinking && (
              <div className="no-insights">
                {currentStep === 'home' 
                  ? "Welcome! I'll provide insights as you build your brief."
                  : "I'm ready to help with this question. Start typing for personalized insights."}
              </div>
            )}
          </div>

          <div className="ai-status">
            {isProcessing ? (
              <span className="status-processing">Processing your brief...</span>
            ) : isThinking ? (
              <span className="status-thinking">Analyzing your input...</span>
            ) : (
              <span className="status-ready">Ready to provide insights</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}