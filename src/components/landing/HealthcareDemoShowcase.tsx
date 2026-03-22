"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface Message {
  id: string | number;
  author: string;
  emoji: string;
  text: string;
  time: string;
  content?: string;
  isAI: boolean;
  isTyping?: boolean;
}

const CompactHealthcareDemoShowcase = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  const wait = (ms: number) =>
    new Promise<void>((resolve) => {
      const timeoutId = setTimeout(resolve, ms);
      timeoutRefs.current.push(timeoutId);
    });

  const typeText = async (text: string, callback?: () => void) => {
    setInputValue("");
    // Remove focus call that can trigger scroll
    await wait(100);

    for (let i = 0; i < text.length; i++) {
      setInputValue(text.slice(0, i + 1));
      const baseDelay = 25;
      const variation = Math.random() * 15;
      const punctuationDelay = ".!?".includes(text[i]) ? 100 : 0;
      await wait(baseDelay + variation + punctuationDelay);
    }

    if (callback) callback();
  };

  const addMessage = (
    author: string,
    emoji: string,
    text: string,
    time: string,
    content: string = ""
  ) => {
    const newMessage: Message = {
      id: Date.now() + Math.random(),
      author,
      emoji,
      text,
      time,
      content,
      isAI: author.includes("AI") || author === "Moccet",
    };

    setMessages((prev) => [...prev, newMessage]);

    // Gentle scroll within demo container only - no page scrolling
    setTimeout(() => {
      if (chatRef.current) {
        const chatContainer = chatRef.current.querySelector(".overflow-y-auto");
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }
    }, 100);
  };

  const showTyping = async (
    author: string,
    emoji: string,
    duration: number = 1600
  ) => {
    setIsTyping(true);
    const typingMessage: Message = {
      id: "typing",
      author,
      emoji,
      text: "",
      time: "",
      isTyping: true,
      isAI: author.includes("AI") || author === "Moccet",
    };
    setMessages((prev) => [...prev, typingMessage]);

    // Gentle scroll within demo container only
    setTimeout(() => {
      if (chatRef.current) {
        const chatContainer = chatRef.current.querySelector(".overflow-y-auto");
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }
    }, 100);

    await wait(duration);
    setMessages((prev) => prev.filter((msg) => msg.id !== "typing"));
    setIsTyping(false);
  };

  const runDemo = useCallback(async () => {
    if (isRunning) return;

    // Clear all existing timeouts before starting
    timeoutRefs.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutRefs.current = [];

    setIsRunning(true);

    // Clear previous state
    setMessages([]);
    setInputValue("");
    setIsTyping(false);

    await wait(1500);

    // User types request
    await typeText(
      "Add real-time appointment scheduling with provider availability and smart conflict detection",
      () => {
        addMessage(
          "Alex Chen",
          "👤",
          "Add real-time appointment scheduling with provider availability and smart conflict detection",
          "Just now"
        );
        setInputValue("");
      }
    );

    // Moccet responds
    await wait(600);
    await showTyping("Moccet", "✨", 1600);

    const teamContent = `
      <div class="mt-2 bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm">
        <div class="px-3 py-2 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div class="text-xs font-semibold text-gray-900 flex items-center gap-1">
            <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Assembling your team
          </div>
          <span class="text-xs text-gray-500">Matching expertise...</span>
        </div>
        <div class="grid grid-cols-2 gap-px bg-gray-200">
          <div class="bg-white p-3 flex items-center gap-2">
            <span class="text-sm">🏗️</span>
            <div class="flex-1 min-w-0">
              <div class="text-xs font-semibold text-gray-900">Backend Architect AI</div>
              <div class="text-xs text-gray-600">Real-time systems</div>
            </div>
            <span class="text-xs font-semibold bg-gray-900 text-white px-1.5 py-0.5 rounded">AI</span>
          </div>
          <div class="bg-white p-3 flex items-center gap-2">
            <span class="text-sm">👨‍⚕️</span>
            <div class="flex-1 min-w-0">
              <div class="text-xs font-semibold text-gray-900">Dr. Marcus Webb</div>
              <div class="text-xs text-gray-600">Clinical workflows</div>
            </div>
            <span class="text-xs font-semibold bg-white text-gray-900 border border-gray-900 px-1.5 py-0.5 rounded">HUMAN</span>
          </div>
          <div class="bg-white p-3 flex items-center gap-2">
            <span class="text-sm">📅</span>
            <div class="flex-1 min-w-0">
              <div class="text-xs font-semibold text-gray-900">Calendar AI</div>
              <div class="text-xs text-gray-600">Scheduling logic</div>
            </div>
            <span class="text-xs font-semibold bg-gray-900 text-white px-1.5 py-0.5 rounded">AI</span>
          </div>
          <div class="bg-white p-3 flex items-center gap-2">
            <span class="text-sm">🔔</span>
            <div class="flex-1 min-w-0">
              <div class="text-xs font-semibold text-gray-900">Notifications AI</div>
              <div class="text-xs text-gray-600">Alert systems</div>
            </div>
            <span class="text-xs font-semibold bg-gray-900 text-white px-1.5 py-0.5 rounded">AI</span>
          </div>
        </div>
      </div>
    `;

    addMessage(
      "Moccet",
      "✨",
      "Perfect. I've assembled specialists in real-time systems and clinical workflows. They're coordinating the architecture now.",
      "2 seconds ago",
      teamContent
    );

    // Backend Architect
    await wait(2400);
    await showTyping("Backend Architect AI", "🏗️", 1200);

    addMessage(
      "Backend Architect AI",
      "🏗️",
      "Setting up WebSocket infrastructure for real-time availability updates. Implementing event sourcing for appointment state management.",
      "Just now"
    );

    // Dr. Webb
    await wait(2200);
    await showTyping("Dr. Marcus Webb", "👨‍⚕️", 1400);

    addMessage(
      "Dr. Marcus Webb",
      "👨‍⚕️",
      "Adding clinical scheduling rules: 15-min buffers for room turnover, automatic urgent care slots, and provider preferences for appointment types.",
      "Just now"
    );

    // Code preview
    await wait(2400);
    const codeContent = `
      <div class="mt-2 bg-gray-900 rounded-md overflow-hidden shadow-sm">
        <div class="p-1.5 bg-gray-800 flex items-center gap-1.5">
          <div class="w-2 h-2 bg-red-500 rounded-full"></div>
          <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
          <div class="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
        <div class="p-3 text-xs font-mono text-gray-100 leading-relaxed">
          <div class="text-gray-500">// Real-time appointment scheduling engine</div>
          <div><span class="text-purple-400">class</span> <span class="text-red-400">AppointmentScheduler</span> {</div>
          <div>&nbsp;&nbsp;<span class="text-purple-400">async</span> <span class="text-blue-400">findAvailableSlot</span>(request) {</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-purple-400">const</span> availability = <span class="text-purple-400">await</span> <span class="text-blue-400">getProviderAvailability</span>();</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-purple-400">const</span> conflicts = <span class="text-purple-400">await</span> <span class="text-blue-400">detectConflicts</span>(request);</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-purple-400">return</span> <span class="text-blue-400">optimizeSlot</span>(availability, conflicts);</div>
          <div>&nbsp;&nbsp;}</div>
          <div>}</div>
        </div>
      </div>
    `;

    addMessage(
      "Calendar AI",
      "📅",
      "Implemented smart scheduling with conflict detection, provider preferences, and automatic optimization for clinic efficiency.",
      "Just now",
      codeContent
    );

    // Features
    await wait(2600);
    const featuresContent = `
      <div class="mt-2 bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm">
        <div class="px-3 py-2 border-b border-gray-200 bg-gray-50">
          <div class="text-xs font-semibold text-gray-900 flex items-center gap-2">
            <span>🚀</span>
            Features delivered
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2 p-3">
          <div class="flex gap-2 p-2 bg-gray-50 rounded-md">
            <div class="w-6 h-6 bg-gray-200 rounded-md flex items-center justify-center text-sm">⚡</div>
            <div class="flex-1 min-w-0">
              <div class="text-xs font-semibold text-gray-900">Live availability</div>
              <div class="text-xs text-gray-600">Real-time provider schedules</div>
            </div>
          </div>
          <div class="flex gap-2 p-2 bg-gray-50 rounded-md">
            <div class="w-6 h-6 bg-gray-200 rounded-md flex items-center justify-center text-sm">🤖</div>
            <div class="flex-1 min-w-0">
              <div class="text-xs font-semibold text-gray-900">Smart scheduling</div>
              <div class="text-xs text-gray-600">AI-optimized appointments</div>
            </div>
          </div>
          <div class="flex gap-2 p-2 bg-gray-50 rounded-md">
            <div class="w-6 h-6 bg-gray-200 rounded-md flex items-center justify-center text-sm">🔔</div>
            <div class="flex-1 min-w-0">
              <div class="text-xs font-semibold text-gray-900">Auto reminders</div>
              <div class="text-xs text-gray-600">SMS, email, push alerts</div>
            </div>
          </div>
          <div class="flex gap-2 p-2 bg-gray-50 rounded-md">
            <div class="w-6 h-6 bg-gray-200 rounded-md flex items-center justify-center text-sm">📊</div>
            <div class="flex-1 min-w-0">
              <div class="text-xs font-semibold text-gray-900">Analytics</div>
              <div class="text-xs text-gray-600">Utilization tracking</div>
            </div>
          </div>
        </div>
      </div>
    `;

    addMessage(
      "Notifications AI",
      "🔔",
      "Notification system integrated with smart timing, patient preferences, and automatic rescheduling for no-shows.",
      "Just now",
      featuresContent
    );

    // Progress
    await wait(2800);
    const progressContent = `
      <div class="mt-2 bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm">
        <div class="px-3 py-2 border-b border-gray-200 bg-gray-50">
          <div class="text-xs font-semibold text-gray-900">Progress Update</div>
        </div>
        <div class="p-3">
          <div class="mb-3">
            <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-gray-900 rounded-full transition-all duration-2000 ease-in-out" style="width: 32%"></div>
            </div>
          </div>
          <div class="grid grid-cols-4 gap-2 text-center">
            <div>
              <div class="text-sm font-bold text-gray-900">32%</div>
              <div class="text-xs text-gray-500 uppercase tracking-wide">Complete</div>
            </div>
            <div>
              <div class="text-sm font-bold text-gray-900">18</div>
              <div class="text-xs text-gray-500 uppercase tracking-wide">Endpoints</div>
            </div>
            <div>
              <div class="text-sm font-bold text-gray-900">100%</div>
              <div class="text-xs text-gray-500 uppercase tracking-wide">Coverage</div>
            </div>
            <div>
              <div class="text-sm font-bold text-gray-900">36h</div>
              <div class="text-xs text-gray-500 uppercase tracking-wide">Remaining</div>
            </div>
          </div>
        </div>
      </div>
    `;

    addMessage(
      "Moccet",
      "✨",
      "Excellent progress. The team continues working around the clock with continuous integration and automated testing.",
      "Just now",
      progressContent
    );

    // Wait before restarting
    await wait(2000);
    runDemo();
  }, [isRunning]);

  useEffect(() => {
    let mounted = true;
    // Remove immediate demo start to prevent scroll on mount
    const timer = setTimeout(() => {
      if (mounted && !isRunning) {
        runDemo();
      }
    }, 2000); // Increased delay

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []); // Remove runDemo from dependencies to prevent re-runs

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((timeoutId) => clearTimeout(timeoutId));
      timeoutRefs.current = [];
    };
  }, []);

  const TypingIndicator = () => (
    <div className="inline-flex items-center gap-0.5 px-2 py-1 bg-gray-100 rounded-full">
      <span
        className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"
        style={{ animationDelay: "0s" }}
      ></span>
      <span
        className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"
        style={{ animationDelay: "0.14s" }}
      ></span>
      <span
        className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"
        style={{ animationDelay: "0.28s" }}
      ></span>
    </div>
  );

  return (
    <div
      className="w-full max-w-lg mx-auto"
      onFocus={(e) => e.preventDefault()}
      onScroll={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-white rounded-full text-xs font-semibold uppercase tracking-wide mb-2">
          <span className="w-1 h-1 bg-white rounded-full opacity-90 animate-pulse"></span>
          <span>Healthcare AI Team</span>
        </div>
        <p className="text-xs text-gray-600 leading-tight">
          AI agents and clinical experts building production healthcare systems
        </p>
      </div>

      {/* Compact Showcase - Same exact dimensions as business analyst */}
      <div
        className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
        style={{ width: "512px", maxWidth: "512px", minWidth: "512px" }}
      >
        <div className="h-96 flex bg-gray-50" style={{ width: "512px" }}>
          {/* Compact Sidebar - Same width as business analyst */}
          <aside
            className="bg-white border-r border-gray-200 flex flex-col"
            style={{ width: "128px", minWidth: "128px", maxWidth: "128px" }}
          >
            <div className="p-2 border-b border-gray-200">
              <div className="text-xs font-medium text-gray-500 mb-1">
                Healthcare
              </div>
              <div className="text-sm font-bold text-black flex items-center gap-1">
                Moccet
                <span className="text-xs px-1 py-0.5 bg-black text-white rounded font-medium">
                  AI
                </span>
              </div>
            </div>

            <nav className="flex-1 p-1 overflow-hidden">
              <div className="mb-3">
                <div className="text-xs font-medium text-gray-500 px-2 mb-1">
                  Projects
                </div>
                <div className="flex items-center gap-1 px-2 py-1 text-green-600 font-medium bg-green-50 border-l-2 border-green-600 text-xs">
                  <span>🏥</span>
                  <span className="truncate">Patient API</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 text-gray-700 text-xs">
                  <span>📋</span>
                  <span className="truncate">EHR</span>
                  <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-1 rounded-full">
                    8
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 text-gray-700 text-xs">
                  <span>🩺</span>
                  <span className="truncate">Telehealth</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-medium text-gray-500 px-2 mb-1">
                  Team
                </div>
                <div className="flex items-center gap-1 px-2 py-1 text-gray-700 text-xs">
                  <span>🤖</span>
                  <span className="truncate">AI Agents</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 text-gray-700 text-xs">
                  <span>👨‍⚕️</span>
                  <span className="truncate">Experts</span>
                </div>
              </div>
            </nav>
          </aside>

          {/* Main Content - Same width as business analyst */}
          <main
            className="flex flex-col overflow-hidden"
            style={{ width: "384px", minWidth: "384px", maxWidth: "384px" }}
          >
            {/* Compact Header */}
            <header
              className="h-10 bg-white border-b border-gray-200 flex items-center px-3"
              style={{ width: "384px" }}
            >
              <div className="w-full flex items-center justify-between min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                  <h1 className="text-xs font-semibold text-gray-900 truncate">
                    Patient Scheduling
                  </h1>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 bg-green-50 border border-green-600 rounded-full text-xs font-medium text-green-600 whitespace-nowrap">
                    <span className="w-1 h-1 bg-green-600 rounded-full animate-pulse"></span>
                    <span>Building</span>
                  </div>
                </div>
                <div className="flex gap-2 text-xs whitespace-nowrap">
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Progress</div>
                    <div className="text-xs font-semibold text-green-600">
                      85%
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Time</div>
                    <div className="text-xs font-semibold text-gray-900">
                      12h
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Chat - Same styling as business analyst */}
            <div ref={chatRef} className="flex-1 overflow-hidden p-3">
              <div
                className="h-full overflow-y-auto scrollbar-hide"
                style={{
                  scrollBehavior: "smooth",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  pointerEvents: "none",
                }}
              >
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div key={message.id} className="animate-fade-in">
                      <div className="flex items-center gap-1.5 mb-1">
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center text-xs flex-shrink-0 ${
                            message.isAI
                              ? "bg-green-600 text-white font-semibold"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {message.emoji}
                        </div>
                        <span className="text-xs font-semibold text-gray-900 truncate">
                          {message.author}
                        </span>
                        <span className="text-xs text-gray-500 ml-auto whitespace-nowrap">
                          {message.time}
                        </span>
                      </div>
                      <div className="pl-6">
                        {message.isTyping ? (
                          <TypingIndicator />
                        ) : (
                          <>
                            <div className="text-xs text-gray-700 leading-relaxed">
                              {message.text}
                            </div>
                            {message.content && (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: message.content,
                                }}
                              />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Input - Same styling as business analyst */}
            <div
              className="p-2 bg-white border-t border-gray-200"
              style={{ width: "384px" }}
            >
              <div className="flex gap-1.5">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  readOnly
                  tabIndex={-1}
                  className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs outline-none bg-gray-50 cursor-default"
                  placeholder="Describe healthcare features needed..."
                  onFocus={(e) => e.target.blur()} // Prevent focus
                />
                <button
                  className="px-3 py-1.5 bg-black text-white rounded text-xs font-medium cursor-default opacity-75 whitespace-nowrap"
                  disabled
                >
                  Send
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CompactHealthcareDemoShowcase;
