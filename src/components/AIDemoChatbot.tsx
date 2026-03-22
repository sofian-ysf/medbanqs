"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAIContext } from '@/lib/contexts/AIContext';
import './AIDemoChatbot.css';

interface Message {
  id: number;
  type: 'bot' | 'user';
  text: string;
  options?: Option[];
  timestamp: Date;
  isHighlighted?: boolean;
}

interface Option {
  text: string;
  value: string;
}

interface BookingData {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  projectType: string;
  date: string;
  time: string;
}

interface DateOption {
  value: string;
  display: string;
  dayName: string;
  dateNumber: number;
}

interface AIDemoChatbotProps {
  isOpen?: boolean;
  onClose?: () => void;
  hideWidget?: boolean;
  positionAboveButtons?: boolean;
  isHomepage?: boolean;
  isBriefGenerator?: boolean;
  currentBriefStep?: string;
  currentQuestion?: string;
}

// Highlight parsing function
const parseMessageWithHighlights = (text: string): string => {
  // Keywords and phrases to highlight
  const highlightPatterns = [
    // Numbers and percentages (blue)
    { pattern: /\b\d+x\s+faster\b/gi, color: 'blue' },
    { pattern: /\b\d+%\s*(faster|cheaper|better|cost\s+reduction|delivery|success|accuracy|on-time|savings?|efficiency|improvement)\b/gi, color: 'blue' },
    { pattern: /\$\d+[BMK]?(\s+to\s+\$\d+[BMK]?)?\b/g, color: 'blue' },
    { pattern: /\b\d+\s+(days?|months?|weeks?|hours?|minutes?|years?)\b/gi, color: 'blue' },
    { pattern: /\bwithin\s+\d+\s+hours?\b/gi, color: 'blue' },
    { pattern: /\b70%\s*cheaper\b/gi, color: 'blue' },
    { pattern: /\b10x\s*faster\b/gi, color: 'blue' },
    { pattern: /\b98%\s+on-time\s+delivery\b/gi, color: 'blue' },
    { pattern: /\b2-3\s+minutes?\b/gi, color: 'blue' },
    { pattern: /\b48\s+hours?\b/gi, color: 'blue' },
    { pattern: /\b\d+\+?\s*(clients?|projects?|developers?|experts?|skills?)\b/gi, color: 'blue' },
    { pattern: /\bROI\s+of\s+\d+%\b/gi, color: 'blue' },
    { pattern: /\b5x\s+(faster|better|improvement)\b/gi, color: 'blue' },
    { pattern: /\b90%\s+(reduction|savings?)\b/gi, color: 'blue' },
    
    // Key features and capabilities (green)
    { pattern: /\bAI[\s-]powered\b/gi, color: 'green' },
    { pattern: /\bAI\s+(system|technology|engine|model|solution)\b/gi, color: 'green' },
    { pattern: /\bcomprehensive\s+(project\s+)?brief\b/gi, color: 'green' },
    { pattern: /\bamazing\s+project\s+brief\b/gi, color: 'green' },
    { pattern: /\b24\/7\s*(support|availability|service)?\b/g, color: 'green' },
    { pattern: /\breal[\s-]time\s*(updates?|tracking|monitoring|collaboration)?\b/gi, color: 'green' },
    { pattern: /\bMVP\s*(development|delivery)?\b/g, color: 'green' },
    { pattern: /\bexceptional\s+(talent|results|quality|performance)\b/gi, color: 'green' },
    { pattern: /\bperfect\s+(matches|solution|fit|team)\b/gi, color: 'green' },
    { pattern: /\bpersonalized\s+(demo|solution|approach|recommendation)\b/gi, color: 'green' },
    { pattern: /\bstrategic\s+(decisions|planning|approach|partnership)\b/gi, color: 'green' },
    { pattern: /\bquality\s+(guaranteed|assurance|control)\b/gi, color: 'green' },
    { pattern: /\bon-time\s+delivery\b/gi, color: 'green' },
    { pattern: /\bprogress\s+tracking\b/gi, color: 'green' },
    { pattern: /\bautomated\s+(testing|deployment|workflow)\b/gi, color: 'green' },
    { pattern: /\bscalable\s+(solution|architecture|infrastructure)\b/gi, color: 'green' },
    { pattern: /\bsecure\s+(platform|infrastructure|development)\b/gi, color: 'green' },
    { pattern: /\bagile\s+(methodology|development|approach)\b/gi, color: 'green' },
    { pattern: /\binstant\s+(matching|results|feedback)\b/gi, color: 'green' },
    { pattern: /\bseamless\s+(integration|experience|collaboration)\b/gi, color: 'green' },
    
    // Actions and CTAs (amber)
    { pattern: /\bBook\s+a\s+demo\b/gi, color: 'amber' },
    { pattern: /\bGenerate\s+(your\s+)?brief\b/gi, color: 'amber' },
    { pattern: /\bSchedule\s+a?\s+(demo|consultation|meeting|call)\b/gi, color: 'amber' },
    { pattern: /\bGet\s+started\s*(today|now)?\b/gi, color: 'amber' },
    { pattern: /\bTry\s+(our\s+)?brief\s+generator\b/gi, color: 'amber' },
    { pattern: /\bStart\s+(your\s+)?project\b/gi, color: 'amber' },
    { pattern: /\bStart\s+generator\b/gi, color: 'amber' },
    { pattern: /\b12\+\s+data\s+points\b/gi, color: 'amber' },
    { pattern: /\bclick\s+(the\s+green|here|below)\b/gi, color: 'amber' },
    { pattern: /\bflexible\s+payment\s+terms\b/gi, color: 'amber' },
    { pattern: /\bbook\s+a\s+consultation\b/gi, color: 'amber' },
    { pattern: /\btry\s+the\s+generator\b/gi, color: 'amber' },
    { pattern: /\bcontact\s+(us|our\s+team|sales)\b/gi, color: 'amber' },
    { pattern: /\blearn\s+more\b/gi, color: 'amber' },
    { pattern: /\bview\s+(demo|pricing|features)\b/gi, color: 'amber' },
    { pattern: /\bfree\s+(trial|consultation|demo|assessment)\b/gi, color: 'amber' },
    { pattern: /\brequest\s+(demo|information|quote)\b/gi, color: 'amber' },
    { pattern: /\bsign\s+up\s*(free|today|now)?\b/gi, color: 'amber' },
    
    // Important terms and concepts (purple)
    { pattern: /\bmoccet\b/gi, color: 'purple', forceCase: 'lower' },
    { pattern: /\btimeline\s*(estimation|planning)?\b/gi, color: 'purple' },
    { pattern: /\bbudget\s*(optimization|planning|estimation)?\b/gi, color: 'purple' },
    { pattern: /\bproject\s+(scope|management|requirements|planning)\b/gi, color: 'purple' },
    { pattern: /\bdelivery\s*(schedule|timeline)?\b/gi, color: 'purple' },
    { pattern: /\bcustomized\s*(solution|approach|development)\b/gi, color: 'purple' },
    { pattern: /\bpre-vetted\s+(network|talent|developers|experts)\b/gi, color: 'purple' },
    { pattern: /\bhybrid\s+(model|approach|solution|team)\b/gi, color: 'purple' },
    { pattern: /\bAI\s+(\+\s+human\s+approach|agents|assistant|automation)\b/gi, color: 'purple' },
    { pattern: /\bhuman\s+(experts|oversight|review|touch)\b/gi, color: 'purple' },
    { pattern: /\bbrief\s+generator\b/gi, color: 'purple' },
    { pattern: /\bdevelopment\s+(process|lifecycle|methodology)\b/gi, color: 'purple' },
    { pattern: /\bplatform\s*(capabilities|features)?\b/gi, color: 'purple' },
    { pattern: /\btech\s+stack\b/gi, color: 'purple' },
    { pattern: /\bmilestone\s*(tracking|delivery)?\b/gi, color: 'purple' },
    { pattern: /\bcollaboration\s*(tools?|platform)?\b/gi, color: 'purple' },
    { pattern: /\bcode\s+(review|quality|standards)\b/gi, color: 'purple' },
    { pattern: /\benterprise\s+(solution|platform|grade)\b/gi, color: 'purple' },
    { pattern: /\bstartup\s*(friendly|solution|package)\b/gi, color: 'purple' }
  ];

  let highlightedText = text;
  const usedColors: string[] = [];
  let highlightCount = 0;
  const maxHighlights = 3;

  // Apply highlights
  for (const highlightPattern of highlightPatterns) {
    const { pattern, color, forceCase } = highlightPattern as any;
    
    if (highlightCount >= maxHighlights) break;
    if (usedColors.includes(color)) continue;

    const matches = highlightedText.match(pattern);
    if (matches && matches.length > 0) {
      // Only highlight the first match for each pattern
      let match = matches[0];
      const escapedMatch = match.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const replacePattern = new RegExp(escapedMatch, 'i');
      
      // Apply case transformation if specified
      if (forceCase === 'lower') {
        match = match.toLowerCase();
      }
      
      highlightedText = highlightedText.replace(
        replacePattern,
        `<span class="highlight highlight-${color}">${match}</span>`
      );
      
      usedColors.push(color);
      highlightCount++;
    }
  }

  return highlightedText;
};

// Component to render bot message with highlights
const BotMessageText = ({ text, isHighlighted }: { text: string; isHighlighted?: boolean }) => {
  if (!isHighlighted) {
    return <span>{text}</span>;
  }

  const highlightedHtml = parseMessageWithHighlights(text);
  
  return (
    <span
      className="typing-text"
      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
    />
  );
};

function AIDemoChatbot({ 
  isOpen: externalIsOpen, 
  onClose,
  hideWidget = false,
  positionAboveButtons = false,
  isHomepage = false,
  isBriefGenerator = false,
  currentBriefStep = '',
  currentQuestion = ''
}: AIDemoChatbotProps) {
  const { setUserIntent, addConversationEntry, sendMessageToAI } = useAIContext();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = (value: boolean) => {
    if (externalIsOpen === undefined) {
      setInternalIsOpen(value);
    }
    if (!value && onClose) {
      onClose();
    }
  };
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    projectType: '',
    date: '',
    time: ''
  });
  const [bookingStep, setBookingStep] = useState<string | null>(null);
  const [userHasSentMessage, setUserHasSentMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive (only after user sends first message)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (userHasSentMessage) {
      scrollToBottom();
    }
  }, [messages, userHasSentMessage]);

  // Initialize AI conversation for homepage
  const initializeHomepageConversation = useCallback(async () => {
    setIsTyping(true);
    try {
      const aiResponse = await sendMessageToAI("User just landed on homepage", true);
      
      const aiMessage: Message = {
        id: 1,
        type: 'bot',
        text: aiResponse.message,
        options: aiResponse.followUpOptions || [
          { text: "Tell me about your project", value: "describe_project" },
          { text: "I want to generate a brief", value: "start_brief" },
          { text: "Book a demo", value: "book_demo" }
        ],
        timestamp: new Date(),
        isHighlighted: true
      };
      
      setMessages([aiMessage]);
      
      // Add to conversation history
      addConversationEntry({
        aiResponse: aiResponse.message,
        action: 'ai_homepage_welcome',
        detectedNeeds: aiResponse.detectedNeeds,
        urgencyLevel: aiResponse.urgencyLevel
      });
      
    } catch (error) {
      console.error('Failed to initialize AI conversation:', error);
      // Fallback to standard welcome
      const fallbackMessage: Message = {
        id: 1,
        type: 'bot',
        text: "👋 Welcome to moccet! I'm here to help you create an amazing project brief. What are you looking to build?",
        options: [
          { text: "Tell me about your project", value: "describe_project" },
          { text: "I want to generate a brief", value: "start_brief" },
          { text: "Book a demo", value: "book_demo" }
        ],
        timestamp: new Date(),
        isHighlighted: true
      };
      setMessages([fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [sendMessageToAI, addConversationEntry]);

  // Initialize AI conversation when component mounts
  useEffect(() => {
    if (!hasInitialized && isHomepage) {
      setHasInitialized(true);
      initializeHomepageConversation();
    } else if (!hasInitialized && isBriefGenerator) {
      setHasInitialized(true);
      // Brief generator specific initialization
      const briefMessage: Message = {
        id: 1,
        type: 'bot',
        text: "👋 I'm moccet's AI assistant, here to help you create an amazing project brief! I can provide examples, clarify questions, or guide you through any section. What would you like help with?",
        options: [
          { text: "Show me examples", value: "show_examples" },
          { text: "Help with current question", value: "help_current" },
          { text: "Brief writing tips", value: "brief_tips" },
          { text: "What makes a good brief?", value: "good_brief" }
        ],
        timestamp: new Date(),
        isHighlighted: true
      };
      setMessages([briefMessage]);
    } else if (!hasInitialized && !isHomepage && !isBriefGenerator) {
      setHasInitialized(true);
      // Non-homepage initialization with standard message
      const standardMessage: Message = {
        id: 1,
        type: 'bot',
        text: "Hi! I'm moccet's AI assistant. I can help you generate a project brief, book a demo, or answer questions about our platform. What would you like to do?",
        options: [
          { text: "Generate Project Brief", value: "generate_brief" },
          { text: "Book a Demo", value: "book_demo" },
          { text: "Learn About Pricing", value: "pricing" },
          { text: "View Features", value: "features" }
        ],
        timestamp: new Date(),
        isHighlighted: true
      };
      setMessages([standardMessage]);
    }
  }, [hasInitialized, isHomepage, isBriefGenerator, initializeHomepageConversation]);

  // Auto-open for homepage visitors after a brief delay
  useEffect(() => {
    if (isHomepage && externalIsOpen === undefined && hasInitialized) {
      const timer = setTimeout(() => {
        setInternalIsOpen(true);
      }, 2000); // Auto-open after 2 seconds on homepage
      
      return () => clearTimeout(timer);
    }
  }, [isHomepage, externalIsOpen, hasInitialized]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Drag functionality
  const handleHeaderMouseDown = (e: React.MouseEvent) => {
    // Only allow dragging on desktop
    if (window.innerWidth <= 768) return;
    
    // Don't drag if clicking on the minimize button
    if ((e.target as HTMLElement).closest('.closeButton')) return;
    
    setIsDragging(true);
    const rect = chatContainerRef.current?.getBoundingClientRect();
    if (rect) {
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
    e.preventDefault();
  };

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || window.innerWidth <= 768) return;
      
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // Constrain to viewport
      const container = chatContainerRef.current;
      if (container) {
        const maxX = window.innerWidth - container.offsetWidth;
        const maxY = window.innerHeight - container.offsetHeight;
        
        const constrainedX = Math.max(0, Math.min(newX, maxX));
        const constrainedY = Math.max(0, Math.min(newY, maxY));
        
        setPosition({ x: constrainedX, y: constrainedY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  // Generate date options (weekdays only)
  const generateDateOptions = (): DateOption[] => {
    const dates: DateOption[] = [];
    const today = new Date();
    let currentDate = new Date(today);
    let datesAdded = 0;
    
    while (datesAdded < 4) {
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        const dateValue = currentDate.toISOString().split('T')[0];
        const dayName = datesAdded === 0 ? 'Today' : 
                       datesAdded === 1 ? 'Tomorrow' : 
                       currentDate.toLocaleDateString('en-US', { weekday: 'short' });
        const dateNumber = currentDate.getDate();
        
        dates.push({
          value: dateValue,
          display: `${dayName}, ${currentDate.toLocaleDateString('en-US', { month: 'short' })} ${dateNumber}`,
          dayName,
          dateNumber
        });
        
        datesAdded++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  };

  // Time slots
  const timeSlots = [
    { value: '10:00', label: '10:00 AM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '16:00', label: '4:00 PM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '17:00', label: '5:00 PM' }
  ];

  // Validate email
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Process AI responses based on user input
  const processUserMessage = (message: string): string | null => {
    const lowerMessage = message.toLowerCase();
    
    // Check for brief generation intent first (higher priority)
    if (lowerMessage.includes('brief') || lowerMessage.includes('project') || 
        lowerMessage.includes('generate') || lowerMessage.includes('estimate') ||
        lowerMessage.includes('proposal') || lowerMessage.includes('scope') ||
        lowerMessage.includes('timeline') || lowerMessage.includes('budget')) {
      return "Great! I can help you generate a comprehensive project brief using our AI system. It will analyze your project and provide detailed recommendations. Would you like to try our brief generator?";
    }
    
    // Check for demo booking intent
    if (lowerMessage.includes('demo') || lowerMessage.includes('book') || 
        lowerMessage.includes('schedule') || lowerMessage.includes('meeting')) {
      startDemoBooking();
      return null;
    }
    
    // Check for pricing questions
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || 
        lowerMessage.includes('pricing') || lowerMessage.includes('how much')) {
      return "Our pricing is customized based on your project needs. Book a demo and we'll provide a detailed quote tailored to your requirements. Would you like to schedule a demo?";
    }
    
    // Check for feature questions
    if (lowerMessage.includes('feature') || lowerMessage.includes('what can') || 
        lowerMessage.includes('capabilities')) {
      return "moccet combines AI agents with human experts to deliver software 10x faster. We handle web apps, mobile apps, AI solutions, and enterprise platforms. Our team works 24/7 to turn your ideas into reality. Want to see it in action? I can book a demo for you!";
    }
    
    // Check for timeline questions
    if (lowerMessage.includes('how long') || lowerMessage.includes('timeline') || 
        lowerMessage.includes('how fast')) {
      return "With our AI + human approach, we deliver projects 10x faster than traditional development. Most MVPs are ready in days, not months. The exact timeline depends on your project scope. Let's schedule a demo to discuss your specific timeline!";
    }
    
    // Default response
    return "I'd be happy to help! I can answer questions about moccet's platform, pricing, features, or help you book a demo. What would you like to know?";
  };

  // Start demo booking flow
  const startDemoBooking = () => {
    setBookingStep('email');
    addBotMessage("Great! Let's get you scheduled for a demo. First, what's your email address?");
  };

  // Check if user wants to exit booking flow
  const checkForFlowInterruption = (message: string): boolean => {
    const lowerMessage = message.toLowerCase();
    
    // Check for exit/cancel intent
    if (lowerMessage.includes('cancel') || lowerMessage.includes('stop') || 
        lowerMessage.includes('exit') || lowerMessage.includes('nevermind') ||
        lowerMessage.includes('restart') || lowerMessage.includes('start over')) {
      setBookingStep(null);
      setBookingData({
        email: '',
        firstName: '',
        lastName: '',
        company: '',
        projectType: '',
        date: '',
        time: ''
      });
      addBotMessage("No problem! I've cancelled the demo booking. Is there anything else I can help you with?", [
        { text: "Book a Demo", value: "book_demo" },
        { text: "Learn About Pricing", value: "pricing" },
        { text: "View Features", value: "features" },
        { text: "Talk to Human", value: "human" }
      ]);
      return true;
    }
    
    // Check for human agent request
    if (lowerMessage.includes('human') || lowerMessage.includes('person') || 
        lowerMessage.includes('agent') || lowerMessage.includes('representative')) {
      setBookingStep(null);
      addBotMessage("I understand you'd prefer to speak with a human. You can reach our team at info@moccet.com. Would you like me to help you with anything else in the meantime?");
      return true;
    }
    
    return false;
  };

  // Handle booking steps
  const handleBookingStep = (userInput: string) => {
    // First check if user wants to interrupt the flow
    if (checkForFlowInterruption(userInput)) {
      return;
    }
    
    switch (bookingStep) {
      case 'email':
        if (!validateEmail(userInput)) {
          addBotMessage("Please enter a valid email address.");
          return;
        }
        setBookingData(prev => ({ ...prev, email: userInput }));
        setBookingStep('name');
        addBotMessage("Perfect! What's your name?");
        break;
        
      case 'name':
        const nameParts = userInput.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        setBookingData(prev => ({ ...prev, firstName, lastName }));
        setBookingStep('company');
        addBotMessage(`Nice to meet you, ${firstName}! What company are you with?`);
        break;
        
      case 'company':
        setBookingData(prev => ({ ...prev, company: userInput }));
        setBookingStep('projectType');
        addBotMessage("What type of project are you looking to build? (Web App, Mobile App, AI Solution, Enterprise Platform, or Other)");
        break;
        
      case 'projectType':
        const projectType = detectProjectType(userInput);
        setBookingData(prev => ({ ...prev, projectType }));
        setBookingStep('date');
        
        // Show date options
        const dateOptions = generateDateOptions();
        const dateButtons = dateOptions.map(date => ({
          text: date.display,
          value: date.value
        }));
        
        addBotMessage("When would you like to schedule your demo?", dateButtons);
        break;
        
      case 'time':
        const selectedTime = timeSlots.find(slot => 
          slot.value === userInput || slot.label === userInput
        );
        
        if (selectedTime) {
          setBookingData(prev => ({ ...prev, time: selectedTime.value }));
          submitDemoBooking();
        } else {
          addBotMessage("Please select one of the available time slots.");
        }
        break;
        
      default:
        break;
    }
  };

  // Detect project type from user input
  const detectProjectType = (input: string): string => {
    const lower = input.toLowerCase();
    if (lower.includes('web')) return 'web-app';
    if (lower.includes('mobile') || lower.includes('app')) return 'mobile-app';
    if (lower.includes('ai') || lower.includes('machine learning')) return 'ai-solution';
    if (lower.includes('enterprise')) return 'enterprise';
    return 'other';
  };

  // Submit demo booking
  const submitDemoBooking = async () => {
    setIsTyping(true);
    
    try {
      const response = await fetch('/api/demo-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${bookingData.firstName} ${bookingData.lastName}`,
          email: bookingData.email,
          company: bookingData.company,
          role: bookingData.projectType,
          phone: '',
          projectTypes: [bookingData.projectType],
          projectTimeline: 'Not specified',
          teamSize: 'Not specified',
          projectDescription: `${bookingData.firstName} wants to build a ${bookingData.projectType}`,
          selectedDate: bookingData.date,
          selectedTime: bookingData.time
        }),
      });
      
      if (response.ok) {
        const selectedDate = generateDateOptions().find(d => d.value === bookingData.date);
        const selectedTime = timeSlots.find(t => t.value === bookingData.time);
        
        addBotMessage(
          `🎉 Excellent! Your demo is confirmed for ${selectedDate?.display} at ${selectedTime?.label}. ` +
          `We've sent a calendar invite to ${bookingData.email}. ` +
          `Looking forward to showing you how moccet can transform your development process!`
        );
        
        // Reset booking data
        setBookingData({
          email: '',
          firstName: '',
          lastName: '',
          company: '',
          projectType: '',
          date: '',
          time: ''
        });
        setBookingStep(null);
      } else {
        throw new Error('Booking failed');
      }
    } catch (error) {
      console.error('Error submitting demo booking:', error);
      addBotMessage(
        "I've noted your demo request! Our team will reach out shortly to confirm your booking. " +
        "Is there anything else you'd like to know about moccet?"
      );
      setBookingStep(null);
    } finally {
      setIsTyping(false);
    }
  };

  // Add bot message
  const addBotMessage = (text: string, options: Option[] | null = null) => {
    const newMessage: Message = {
      id: Date.now(),
      type: 'bot',
      text,
      options: options || undefined,
      timestamp: new Date(),
      isHighlighted: true
    };
    setMessages(prev => [...prev, newMessage]);
  };

  // Add user message
  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      type: 'user',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    setUserHasSentMessage(true);
  };

  // Handle option button clicks with AI
  const handleOptionClick = async (option: Option) => {
    addUserMessage(option.text);
    
    // Handle brief generator specific options
    if (isBriefGenerator) {
      if (option.value === 'show_examples') {
        setIsTyping(true);
        setTimeout(() => {
          addBotMessage(
            "Here's an example for the Project Overview question:\n\n" +
            "\"We're building a B2B marketplace connecting local farmers directly with restaurants, eliminating middlemen and reducing food costs by 30%. With the farm-to-table movement growing 20% yearly, we can capture this $50B market opportunity.\"",
            [
              { text: "See more examples", value: "more_examples" },
              { text: "Help with my answer", value: "help_answer" }
            ]
          );
          setIsTyping(false);
        }, 500);
        return;
      } else if (option.value === 'help_current') {
        setIsTyping(true);
        const aiResponse = await sendBriefMessage(`Help me answer the current question: ${currentQuestion || 'the brief questions'}`);
        addBotMessage(aiResponse.message, aiResponse.followUpOptions);
        setIsTyping(false);
        return;
      } else if (option.value === 'brief_tips') {
        setTimeout(() => {
          addBotMessage(
            "📝 Tips for a great brief:\n\n" +
            "• Be specific about your target users and their pain points\n" +
            "• Focus on business outcomes, not just features\n" +
            "• Include measurable success metrics\n" +
            "• Share what makes your idea unique\n" +
            "• Be realistic about timeline and budget",
            [
              { text: "Show me examples", value: "show_examples" },
              { text: "Next tip", value: "more_tips" }
            ]
          );
        }, 500);
        return;
      } else if (option.value === 'good_brief') {
        setTimeout(() => {
          addBotMessage(
            "A great project brief includes:\n\n" +
            "✅ Clear problem definition and business opportunity\n" +
            "✅ Specific target audience with validated needs\n" +
            "✅ Core MVP features (not a wishlist)\n" +
            "✅ Realistic timeline and budget\n" +
            "✅ Measurable success metrics\n" +
            "✅ Existing resources and constraints",
            [
              { text: "Help me start", value: "help_start" },
              { text: "Review my answers", value: "review_answers" }
            ]
          );
        }, 500);
        return;
      }
      
      // For other options, use the AI
      setIsTyping(true);
      try {
        const aiResponse = await sendBriefMessage(option.text);
        addBotMessage(aiResponse.message, aiResponse.followUpOptions);
        if (aiResponse.tips) {
          setTimeout(() => {
            addBotMessage(`💡 ${aiResponse.tips}`);
          }, 1000);
        }
      } catch (error) {
        addBotMessage("Let me help you with that. What specific aspect would you like guidance on?");
      }
      setIsTyping(false);
      return;
    }
    
    // For homepage, use real AI to handle most interactions
    if (isHomepage && !bookingStep) {
      setIsTyping(true);
      
      try {
        const aiResponse = await sendMessageToAI(option.text, false);
        
        let botMessage: Message;
        
        if (aiResponse.nextAction === 'ready_for_generator' || option.value === 'start_brief') {
          botMessage = {
            id: Date.now(),
            type: 'bot',
            text: "Perfect! Look for the green 'Start your project +' button on this page to begin our AI-powered brief generator.",
            options: [
              { text: "Got it, thanks!", value: "understood" },
              { text: "Where exactly is the button?", value: "find_button" }
            ],
            timestamp: new Date(),
            isHighlighted: true
          };
          
          // Mark user as ready for brief generation
          addConversationEntry({
            userMessage: option.text,
            aiResponse: botMessage.text,
            action: 'ready_for_brief_generator',
            detectedNeeds: aiResponse.detectedNeeds || ['brief generation'],
            urgencyLevel: aiResponse.urgencyLevel || 'medium'
          });
          
        } else {
          botMessage = {
            id: Date.now(),
            type: 'bot',
            text: aiResponse.message,
            options: aiResponse.followUpOptions || [],
            timestamp: new Date(),
            isHighlighted: true
          };
          
          addConversationEntry({
            userMessage: option.text,
            aiResponse: aiResponse.message,
            action: 'ai_option_response',
            detectedNeeds: aiResponse.detectedNeeds,
            urgencyLevel: aiResponse.urgencyLevel
          });
        }
        
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        return;
        
      } catch (error) {
        console.error('AI option handling failed:', error);
        setIsTyping(false);
        // Fall through to hardcoded handling
      }
    }
    
    // Handle simple acknowledgment responses
    if (option.value === 'understood' || option.value === 'homepage_understood') {
      setTimeout(() => {
        addBotMessage("Excellent! I'll be here if you need any help along the way. Good luck with your project! 🚀");
      }, 500);
      return;
    } else if (option.value === 'find_button' || option.value === 'button_location') {
      setTimeout(() => {
        addBotMessage(
          "The green 'Start your project +' button is in the main hero section of this page. On mobile, it might be below the headline. Look for the bright green button!",
          [
            { text: "Found it, thanks!", value: "understood" },
            { text: "Still need help", value: "book_demo" }
          ]
        );
      }, 500);
      return;
    }

    // Handle initial quick actions
    if (option.value === 'generate_brief') {
      setTimeout(() => {
        addBotMessage(
          "Perfect! Let me direct you to our AI-powered brief generator. It will analyze your project and create a comprehensive brief with timeline, budget, and team recommendations in minutes. Ready to get started?",
          [
            { text: "Yes, Generate My Brief", value: "start_brief" },
            { text: "Tell Me More", value: "brief_info" }
          ]
        );
      }, 500);
      return;
    } else if (option.value === 'start_brief') {
      // Redirect to brief generator
      window.location.href = '/brief-generator';
      return;
    } else if (option.value === 'brief_info') {
      setTimeout(() => {
        addBotMessage(
          "Our brief generator uses advanced AI to analyze your project description and create a detailed proposal including: • Project scope & objectives • Timeline & milestones • Budget breakdown • Team recommendations • Technology stack • Risk assessment. It takes just 2-3 minutes to complete!",
          [
            { text: "Start Generator", value: "start_brief" },
            { text: "Book Demo Instead", value: "book_demo" }
          ]
        );
      }, 500);
      return;
    } else if (option.value === 'book_demo') {
      setTimeout(() => startDemoBooking(), 500);
      return;
    } else if (option.value === 'pricing') {
      setTimeout(() => {
        addBotMessage("Our pricing is customized based on your project needs. Book a demo and we'll provide a detailed quote tailored to your requirements. Would you like to schedule a demo?", [
          { text: "Yes, Book Demo", value: "book_demo" },
          { text: "Email Sales Team", value: "email_sales" }
        ]);
      }, 500);
      return;
    } else if (option.value === 'features') {
      setTimeout(() => {
        addBotMessage("moccet combines AI agents with human experts to deliver software 10x faster. We handle web apps, mobile apps, AI solutions, and enterprise platforms. Our team works 24/7 to turn your ideas into reality. Want to see it in action?", [
          { text: "Book a Demo", value: "book_demo" },
          { text: "Learn More", value: "learn_more" }
        ]);
      }, 500);
      return;
    } else if (option.value === 'human') {
      setTimeout(() => {
        addBotMessage("You can reach our team at info@moccet.com. Our business hours are Monday-Friday, 9AM-6PM EST.");
      }, 500);
      return;
    }
    
    // Handle booking flow options
    if (bookingStep === 'date') {
      setBookingData(prev => ({ ...prev, date: option.value }));
      setBookingStep('time');
      
      const timeButtons = timeSlots.map(slot => ({
        text: slot.label,
        value: slot.value
      }));
      
      setTimeout(() => {
        addBotMessage("What time works best for you?", timeButtons);
      }, 500);
    } else if (bookingStep === 'time') {
      handleBookingStep(option.value);
    }
  };

  // Send message to brief-specific AI endpoint
  const sendBriefMessage = async (message: string) => {
    try {
      const response = await fetch('/api/ai/brief-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          conversationHistory: messages.map(m => ({
            userMessage: m.type === 'user' ? m.text : undefined,
            aiResponse: m.type === 'bot' ? m.text : undefined,
            timestamp: m.timestamp
          })),
          currentStep: currentBriefStep,
          currentQuestion: currentQuestion,
          pageContext: 'brief-generator'
        }),
      });

      if (!response.ok) {
        throw new Error('Brief AI request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Error in brief AI:', error);
      throw error;
    }
  };

  // Handle form submission with real AI
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue.trim();
    addUserMessage(userMessage);
    setInputValue('');
    
    setIsTyping(true);
    
    try {
      if (bookingStep) {
        // Handle booking flow (keep existing logic)
        setTimeout(() => {
          handleBookingStep(userMessage);
          setIsTyping(false);
        }, 1000);
      } else if (isBriefGenerator) {
        // Use brief-specific AI
        const aiResponse = await sendBriefMessage(userMessage);
        
        const botMessage: Message = {
          id: Date.now(),
          type: 'bot',
          text: aiResponse.message,
          options: aiResponse.followUpOptions || [],
          timestamp: new Date(),
          isHighlighted: true
        };
        
        setMessages(prev => [...prev, botMessage]);
        
        // Show tips or suggestions if available
        if (aiResponse.tips) {
          setTimeout(() => {
            addBotMessage(`💡 Pro tip: ${aiResponse.tips}`);
          }, 1500);
        }
        
        setIsTyping(false);
      } else if (isHomepage) {
        // Use real AI for homepage conversations
        const aiResponse = await sendMessageToAI(userMessage, false);
        
        let botMessage: Message;
        
        if (aiResponse.nextAction === 'ready_for_generator') {
          botMessage = {
            id: Date.now(),
            type: 'bot',
            text: aiResponse.message + " Click the green 'Start your project +' button to begin!",
            options: [
              { text: "Got it, thanks!", value: "understood" },
              { text: "Where is the button?", value: "find_button" }
            ],
            timestamp: new Date(),
            isHighlighted: true
          };
        } else {
          botMessage = {
            id: Date.now(),
            type: 'bot',
            text: aiResponse.message,
            options: aiResponse.followUpOptions || [],
            timestamp: new Date(),
            isHighlighted: true
          };
        }
        
        setMessages(prev => [...prev, botMessage]);
        
        // Add to conversation history
        addConversationEntry({
          userMessage: userMessage,
          aiResponse: aiResponse.message,
          action: 'ai_conversation',
          detectedNeeds: aiResponse.detectedNeeds,
          urgencyLevel: aiResponse.urgencyLevel
        });
        
        setIsTyping(false);
      } else {
        // Non-homepage: use existing hardcoded logic
        setTimeout(() => {
          const response = processUserMessage(userMessage);
          if (response) {
            addBotMessage(response);
          }
          setIsTyping(false);
        }, 1000);
      }
    } catch (error) {
      console.error('Error in AI conversation:', error);
      // Fallback to existing logic
      setTimeout(() => {
        const response = processUserMessage(userMessage);
        if (response) {
          addBotMessage(response);
        }
        setIsTyping(false);
      }, 1000);
    }
  };

  return (
    <>
      {/* Chat Widget Button */}
      {!hideWidget && (
        <div 
          className={`aiChatbotWidget ${isOpen ? 'hide' : ''}`}
          onClick={() => setIsOpen(true)}
        >
          <span className="widgetText">moccet connect</span>
        </div>
      )}

      {/* Chat Window */}
      <div 
        ref={chatContainerRef}
        className={`aiChatbotContainer ${isOpen ? 'open' : ''} ${positionAboveButtons ? 'aboveButtons' : ''} ${isDragging ? 'dragging' : ''}`}
        style={{
          left: position.x !== 0 ? `${position.x}px` : undefined,
          top: position.y !== 0 ? `${position.y}px` : undefined,
          right: position.x !== 0 ? 'auto' : undefined,
          bottom: position.y !== 0 ? 'auto' : undefined
        }}
      >
        <div className="aiChatbotHeader" onMouseDown={handleHeaderMouseDown}>
          <div className="headerContent">
            <div className="headerTitle">
              <div className="statusIndicator"></div>
              <h3>moccet connect</h3>
            </div>
            <button 
              className="closeButton"
              onClick={() => setIsOpen(false)}
              aria-label="Minimize chat"
            >
              <svg width="16" height="2" viewBox="0 0 16 2" fill="none">
                <path d="M0 1H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="aiChatbotMessages">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.type}`}
            >
              {message.type === 'bot' && (
                <div className="botAvatar">M</div>
              )}
              <div className="messageContent">
                {message.text && (
                  <div className="messageText">
                    {message.type === 'bot' ? (
                      <BotMessageText text={message.text} isHighlighted={message.isHighlighted} />
                    ) : (
                      message.text
                    )}
                  </div>
                )}
                {message.options && (
                  <div className="messageOptions">
                    {message.options.map((option, index) => (
                      <button
                        key={index}
                        className="optionButton"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className={`message bot`}>
              <div className="botAvatar">M</div>
              <div className="messageContent">
                <div className="typingIndicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="aiChatbotInput" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="chatInput"
          />
          <button type="submit" className="sendButton" disabled={!inputValue.trim()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}

export default AIDemoChatbot;