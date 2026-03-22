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

const CompactBusinessAnalystShowcase = () => {
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
    if (inputRef.current) {
      inputRef.current.focus();
    }
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

  const addMessage = (author: string, emoji: string, text: string, time: string, content: string = "") => {
    const newMessage: Message = {
      id: Date.now() + Math.random(),
      author,
      emoji,
      text,
      time,
      content,
      isAI: author.includes("Analyst") || author === "Moccet Business Analyst",
    };

    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      if (chatRef.current) {
        const chatContainer = chatRef.current;
        const lastMessage = chatContainer.lastElementChild?.lastElementChild;
        if (lastMessage) {
          lastMessage.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
          });
        }
      }
    }, 150);
  };

  const showTyping = async (author: string, emoji: string, duration: number = 1600) => {
    setIsTyping(true);
    const typingMessage: Message = {
      id: "typing",
      author,
      emoji,
      text: "",
      time: "",
      isTyping: true,
      isAI: author.includes("Analyst"),
    };
    setMessages((prev) => [...prev, typingMessage]);

    setTimeout(() => {
      if (chatRef.current) {
        const chatContainer = chatRef.current;
        const lastMessage = chatContainer.lastElementChild?.lastElementChild;
        if (lastMessage) {
          lastMessage.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
          });
        }
      }
    }, 150);

    await wait(duration);
    setMessages((prev) => prev.filter((msg) => msg.id !== "typing"));
    setIsTyping(false);
  };

  const runDemo = useCallback(async () => {
    if (isRunning) return;
    setIsRunning(true);

    setMessages([]);
    setInputValue("");
    setIsTyping(false);

    await wait(1000);

    const initialContent = `
      <div class="mt-2 bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm">
        <div class="px-3 py-2 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div class="text-xs font-semibold text-gray-900 flex items-center gap-1">
            <span class="w-1.5 h-1.5 bg-brand-purple rounded-full animate-pulse"></span>
            Startup Health Monitor
          </div>
          <span class="text-xs text-gray-500">Live</span>
        </div>
        <div class="grid grid-cols-2 gap-px bg-gray-200">
          <div class="bg-white p-3 text-center">
            <div class="text-lg font-bold text-gray-900">18.2mo</div>
            <div class="text-xs text-gray-600">Runway</div>
            <div class="text-xs font-medium text-green-600">↑ +4.2mo</div>
          </div>
          <div class="bg-white p-3 text-center">
            <div class="text-lg font-bold text-gray-900">$42k</div>
            <div class="text-xs text-gray-600">Monthly Burn</div>
            <div class="text-xs font-medium text-green-600">↓ -28%</div>
          </div>
          <div class="bg-white p-3 text-center">
            <div class="text-lg font-bold text-gray-900">3.4x</div>
            <div class="text-xs text-gray-600">Dev Velocity</div>
            <div class="text-xs font-medium text-green-600">↑ +34%</div>
          </div>
          <div class="bg-white p-3 text-center">
            <div class="text-lg font-bold text-gray-900">$8.2k</div>
            <div class="text-xs text-gray-600">Feature Cost</div>
            <div class="text-xs font-medium text-green-600">↓ -52%</div>
          </div>
        </div>
      </div>
    `;

    addMessage(
      "Moccet AI Analyst",
      "🧠",
      "Analyzed your codebase overnight. Found 4 ways to extend runway by 4.2 months:",
      "2 min ago",
      initialContent
    );

    await wait(2000);
    await showTyping("Moccet AI Analyst", "🧠", 1200);

    const insightsContent = `
      <div class="mt-2 bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm">
        <div class="px-3 py-2 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div class="text-xs font-semibold text-gray-900">🎯 Critical Opportunities</div>
          <div class="text-xs font-medium bg-green-100 text-green-600 px-2 py-0.5 rounded-full">Save $156k/yr</div>
        </div>
        <div class="p-3 space-y-2">
          <div class="flex gap-2 p-2 bg-red-50 border border-red-200 rounded-md">
            <div class="w-6 h-6 bg-red-100 text-red-600 rounded text-sm flex items-center justify-center flex-shrink-0">⚡</div>
            <div class="flex-1 min-w-0">
              <div class="text-xs font-medium text-gray-900">AWS Costs Running Wild</div>
              <div class="text-xs text-gray-600 leading-tight">Staging uses prod instances 24/7. Auto-scaling saves $4.2k/month.</div>
            </div>
            <div class="text-xs font-medium text-green-600 whitespace-nowrap">-$4.2k/mo</div>
          </div>
          <div class="flex gap-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
            <div class="w-6 h-6 bg-blue-100 text-blue-600 rounded text-sm flex items-center justify-center flex-shrink-0">💎</div>
            <div class="flex-1 min-w-0">
              <div class="text-xs font-medium text-gray-900">47% Code Duplication</div>
              <div class="text-xs text-gray-600 leading-tight">AI agents can refactor in 3 days, save 160 dev hours monthly.</div>
            </div>
            <div class="text-xs font-medium text-green-600 whitespace-nowrap">-$8k/mo</div>
          </div>
        </div>
      </div>
    `;

    addMessage(
      "Moccet AI Analyst",
      "🧠",
      "Found immediate cost optimizations:",
      "Just now",
      insightsContent
    );

    await wait(2200);
    await typeText("How do we reduce burn without slowing development?", () => {
      addMessage(
        "Sarah Chen",
        "👤",
        "How do we reduce burn without slowing development?",
        "Just now"
      );
      setInputValue("");
    });

    await wait(1000);
    await showTyping("Moccet AI Analyst", "🧠", 1400);

    const recommendationsContent = `
      <div class="mt-2 bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm">
        <div class="px-3 py-2 border-b border-gray-200 bg-gray-50">
          <div class="text-xs font-semibold text-gray-900">⚡ 3 Quick Wins This Week</div>
        </div>
        <div class="grid grid-cols-1 gap-2 p-3">
          <div class="bg-gray-50 border border-gray-200 rounded p-3 text-center">
            <div class="w-5 h-5 bg-brand-purple text-white rounded flex items-center justify-center font-semibold text-xs mx-auto mb-1">1</div>
            <div class="text-xs font-medium text-gray-900 mb-1">AI-Powered Development</div>
            <div class="text-xs text-gray-600 mb-1">Replace 60% manual coding</div>
            <div class="text-sm font-semibold text-green-600">-$18k/mo</div>
          </div>
          <div class="bg-gray-50 border border-gray-200 rounded p-3 text-center">
            <div class="w-5 h-5 bg-brand-purple text-white rounded flex items-center justify-center font-semibold text-xs mx-auto mb-1">2</div>
            <div class="text-xs font-medium text-gray-900 mb-1">Smart Infrastructure</div>
            <div class="text-xs text-gray-600 mb-1">Auto-scale by usage patterns</div>
            <div class="text-sm font-semibold text-green-600">-$8k/mo</div>
          </div>
        </div>
      </div>
    `;

    addMessage(
      "Moccet AI Analyst",
      "🧠",
      "Based on 10,000+ startup patterns:",
      "Just now",
      recommendationsContent
    );

    await wait(2500);
    const alertContent = `
      <div class="mt-2 bg-white rounded-md border border-red-200 overflow-hidden shadow-sm">
        <div class="px-3 py-2 border-b border-red-200 bg-red-50 flex items-center gap-2">
          <div class="text-xs font-semibold text-red-800">🚨 Real-time Alert</div>
          <span class="text-xs text-red-600">Just detected</span>
        </div>
        <div class="p-3">
          <div class="flex gap-2 items-start">
            <div class="w-6 h-6 bg-red-100 text-red-600 rounded text-sm flex items-center justify-center flex-shrink-0">⚠️</div>
            <div class="flex-1 min-w-0">
              <div class="text-xs font-medium text-gray-900">API Gateway Cost Spike</div>
              <div class="text-xs text-gray-600 leading-tight">3x normal traffic on /analytics. Possible bot traffic detected.</div>
              <div class="text-xs font-medium text-orange-600 mt-1">Fix now: Save $280/day</div>
            </div>
          </div>
        </div>
      </div>
    `;

    addMessage(
      "Moccet AI Analyst",
      "🧠",
      "⚡ Urgent: Unusual cost spike detected",
      "Just now",
      alertContent
    );

    await wait(2000);
    addMessage(
      "Moccet AI Analyst",
      "🧠",
      "Analysis complete. Restarting monitoring...",
      "Just now"
    );

    await wait(3000);

    setIsRunning(false);
    await wait(1000);
    runDemo();
  }, [isRunning]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isRunning) {
        runDemo();
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

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
    <div className="w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-purple text-white rounded-full text-xs font-semibold uppercase tracking-wide mb-2">
          <span className="w-1 h-1 bg-white rounded-full opacity-90 animate-pulse"></span>
          <span>AI Business Analyst</span>
        </div>
        <p className="text-xs text-gray-600 leading-tight">
          Live analysis of your startup's runway and burn rate optimization
        </p>
      </div>

      {/* Compact Showcase - Strict fixed width */}
      <div
        className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
        style={{ width: "512px", maxWidth: "512px", minWidth: "512px" }}
      >
        <div className="h-96 flex bg-gray-50" style={{ width: "512px" }}>
          {/* Compact Sidebar - Fixed width */}
          <aside
            className="bg-white border-r border-gray-200 flex flex-col"
            style={{ width: "128px", minWidth: "128px", maxWidth: "128px" }}
          >
            <div className="p-2 border-b border-gray-200">
              <div className="text-xs font-medium text-gray-500 mb-1">
                StreamFlow
              </div>
              <div className="text-sm font-bold text-black flex items-center gap-1">
                Moccet
                <span className="text-xs px-1 py-0.5 bg-brand-purple text-white rounded font-medium">
                  AI
                </span>
              </div>
            </div>

            <nav className="flex-1 p-1 overflow-hidden">
              <div className="mb-3">
                <div className="text-xs font-medium text-gray-500 px-2 mb-1">
                  Analytics
                </div>
                <div className="flex items-center gap-1 px-2 py-1 text-brand-purple font-medium bg-blue-50 border-l-2 border-brand-purple text-xs">
                  <span>📊</span>
                  <span className="truncate">ROI</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 text-gray-700 text-xs">
                  <span>💡</span>
                  <span className="truncate">Insights</span>
                  <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-1 rounded-full">
                    32
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 text-gray-700 text-xs">
                  <span>🎯</span>
                  <span className="truncate">Burn</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-medium text-gray-500 px-2 mb-1">
                  Products
                </div>
                <div className="flex items-center gap-1 px-2 py-1 text-gray-700 text-xs">
                  <span>📱</span>
                  <span className="truncate">Core</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 text-gray-700 text-xs">
                  <span>⚡</span>
                  <span className="truncate">API</span>
                </div>
              </div>
            </nav>
          </aside>

          {/* Main Content - Strictly constrained */}
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
                    StreamFlow Analysis
                  </h1>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 border border-brand-purple rounded-full text-xs font-medium text-brand-purple whitespace-nowrap">
                    <span className="w-1 h-1 bg-brand-purple rounded-full animate-pulse"></span>
                    <span>Live</span>
                  </div>
                </div>
                <div className="flex gap-2 text-xs whitespace-nowrap">
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Runway</div>
                    <div className="text-xs font-semibold text-green-600">
                      +4.2mo
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Burn</div>
                    <div className="text-xs font-semibold text-gray-900">
                      $42k
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Chat - Better auto-scrolling, no user scrolling */}
            <div
              ref={chatRef}
              className="flex-1 overflow-hidden p-3"
              style={{ scrollBehavior: "smooth" }}
            >
              <div
                className="h-full overflow-y-auto scrollbar-hide"
                style={{ pointerEvents: "none" }}
              >
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div key={message.id} className="animate-fade-in">
                      <div className="flex items-center gap-1.5 mb-1">
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center text-xs flex-shrink-0 ${
                            message.isAI
                              ? "bg-brand-purple text-white font-semibold"
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

            {/* Input - Read-only for demo */}
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
                  className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs outline-none bg-gray-50 cursor-default"
                  placeholder="Ask about burn rate optimization..."
                />
                <button
                  className="px-3 py-1.5 bg-brand-purple text-white rounded text-xs font-medium cursor-default opacity-75 whitespace-nowrap"
                  disabled
                >
                  Send
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CompactBusinessAnalystShowcase;