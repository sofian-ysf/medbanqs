"use client";

import React, { useState, useEffect, useRef } from "react";

interface TeamMember {
  type: "client" | "ai" | "human";
  sender?: string;
  role?: string;
  expertise?: string[];
  text: string;
  delay: number;
}

interface AgentBubbleProps {
  sender: string;
  role: string;
  expertise: string[];
  isActive: boolean;
  isAI: boolean;
}

// Global demo manager for Software Development
class SoftwareDevDemoManager {
  private static instance: SoftwareDevDemoManager;
  private isRunning = false;
  private subscribers = new Set<(state: any) => void>();
  private currentState = {
    displayedMessages: [] as TeamMember[],
    showTyping: false,
    activeAgent: null as string | null,
    typingText: "",
    isTypingMessage: false,
  };

  static getInstance(): SoftwareDevDemoManager {
    if (!SoftwareDevDemoManager.instance) {
      SoftwareDevDemoManager.instance = new SoftwareDevDemoManager();
    }
    return SoftwareDevDemoManager.instance;
  }

  subscribe(callback: (state: any) => void): () => void {
    this.subscribers.add(callback);
    callback(this.currentState);

    if (!this.isRunning) {
      this.startDemo();
    }

    return () => {
      this.subscribers.delete(callback);
    };
  }

  private setState(newState: Partial<typeof this.currentState>) {
    this.currentState = { ...this.currentState, ...newState };
    this.subscribers.forEach((callback) => callback(this.currentState));
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async typeMessage(text: string): Promise<void> {
    this.setState({ isTypingMessage: true, typingText: "" });

    for (let i = 0; i <= text.length; i++) {
      await this.sleep(25);
      this.setState({ typingText: text.slice(0, i) });
    }

    await this.sleep(300);
    this.setState({ isTypingMessage: false, typingText: "" });
  }

  private async addMessage(message: TeamMember): Promise<void> {
    if (message.type === "client") {
      await this.typeMessage(message.text);
      this.setState({
        displayedMessages: [...this.currentState.displayedMessages, message],
        activeAgent: null,
      });
    } else if (message.sender) {
      this.setState({
        showTyping: true,
        activeAgent: message.sender,
      });

      await this.sleep(3500);

      this.setState({
        showTyping: false,
      });

      await this.sleep(200);

      this.setState({
        displayedMessages: [...this.currentState.displayedMessages, message],
      });

      await this.sleep(1000);

      this.setState({
        activeAgent: null,
      });
    }
  }

  private async startDemo(): Promise<void> {
    if (this.isRunning) return;

    this.isRunning = true;

    const messages: TeamMember[] = [
      {
        type: "client",
        text: "Need to build a scalable AI SaaS platform in 6 weeks",
        delay: 1000,
      },
      {
        type: "ai",
        sender: "ArchitectAI",
        role: "System Architecture Agent",
        expertise: [
          "Designed 1000+ scalable systems",
          "Expert in microservices and cloud architecture",
          "Specialized in AI/ML infrastructure",
        ],
        text: "Perfect! I'll design a microservices architecture with auto-scaling containers. Using Next.js frontend with Python ML backend.",
        delay: 2500,
      },
      {
        type: "human",
        sender: "Alex Chen",
        role: "Senior Full-Stack Engineer",
        expertise: [
          "Built 50+ production systems at scale",
          "Expert in React, Node.js, and cloud platforms",
          "15 years in software architecture",
        ],
        text: "Great architecture! I'll handle the complex integrations and ensure performance optimization across all services.",
        delay: 2800,
      },
      {
        type: "client",
        text: "What about testing and deployment pipelines?",
        delay: 2000,
      },
      {
        type: "ai",
        sender: "DevOpsBot",
        role: "CI/CD Automation Agent",
        expertise: [
          "Automated 10k+ deployments",
          "Specializes in Docker, Kubernetes, AWS",
          "Auto-generates test suites",
        ],
        text: "Already setting up automated testing with 95% coverage. CI/CD pipeline will deploy to staging and production with zero downtime.",
        delay: 2500,
      },
      {
        type: "client",
        text: "Excellent! When can we see the first working version?",
        delay: 1800,
      },
      {
        type: "ai",
        sender: "ArchitectAI",
        role: "System Architecture Agent",
        expertise: [
          "Designed 1000+ scalable systems",
          "Expert in microservices and cloud architecture",
          "Specialized in AI/ML infrastructure",
        ],
        text: "Core MVP with auth and AI endpoints ready in 3 days. I code 24/7 and automatically fix bugs as they appear.",
        delay: 2200,
      },
    ];

    while (this.subscribers.size > 0) {
      this.setState({
        displayedMessages: [],
        showTyping: false,
        activeAgent: null,
        typingText: "",
        isTypingMessage: false,
      });

      await this.sleep(800);

      for (const message of messages) {
        if (this.subscribers.size === 0) break;

        await this.sleep(message.delay);
        await this.addMessage(message);
      }

      await this.sleep(4000);
    }

    this.isRunning = false;
  }
}

const AgentBubble: React.FC<AgentBubbleProps> = ({
  sender,
  role,
  expertise,
  isActive,
  isAI,
}) => {
  const initials = sender
    .split(" ")
    .map((name) => name[0])
    .join("")
    .substring(0, 2);

  return (
    <div
      className={`bg-white border rounded-xl p-3 w-60 shadow-lg transition-all duration-500 absolute ${
        isActive
          ? "border-black bg-white scale-105 shadow-black/20 opacity-100"
          : "border-gray-200 opacity-0 invisible"
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
            isAI ? "bg-[#C3E0DD] text-black" : "bg-black text-white"
          }`}
        >
          {isAI ? "✦" : initials}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-bold text-black">{sender}</h3>
            <span
              className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                isAI ? "bg-[#C3E0DD] text-black" : "bg-black text-white"
              }`}
            >
              {isAI ? "AI" : "HUMAN"}
            </span>
          </div>
          <p className="text-xs font-medium text-gray-600">{role}</p>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          Expertise
        </h4>
        <ul className="space-y-2">
          {expertise.slice(0, 2).map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-xs text-gray-700 leading-relaxed"
            >
              <span
                className={`w-1 h-1 rounded-full mt-1.5 flex-shrink-0 ${
                  isAI ? "bg-[#C3E0DD]" : "bg-black"
                }`}
              ></span>
              <span>
                {item.length > 55 ? item.substring(0, 55) + "..." : item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const TypingIndicator: React.FC = () => (
  <div className="flex items-start gap-3 mb-4">
    <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
      <span className="text-black text-xs font-bold">✦</span>
    </div>
    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-2xl rounded-tl-md">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  </div>
);

const Message: React.FC<{ message: TeamMember }> = ({ message }) => {
  const isClient = message.type === "client";
  const isAI =
    message.sender?.includes("AI") || message.sender?.includes("Bot");

  const initials =
    message.sender
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .substring(0, 2) || "";

  return (
    <div
      className={`flex items-start gap-3 mb-4 ${
        isClient ? "flex-row-reverse" : ""
      }`}
    >
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
          isClient
            ? "bg-black text-white"
            : "bg-gray-100 border border-gray-200"
        }`}
      >
        {isClient ? (
          <span className="text-xs">M</span>
        ) : isAI ? (
          <span className="text-black text-xs">✦</span>
        ) : (
          <span className="text-black text-xs">{initials.charAt(0)}</span>
        )}
      </div>
      <div
        className={`max-w-xs px-3 py-2 text-xs leading-relaxed ${
          isClient
            ? "bg-black text-white rounded-2xl rounded-tr-md"
            : "bg-gray-50 text-black border border-gray-200 rounded-2xl rounded-tl-md"
        }`}
      >
        {!isClient && message.sender && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-black text-xs font-semibold">
              {message.sender}
            </span>
            <span className="text-xs text-gray-500">• AI Agent</span>
          </div>
        )}
        <div>{message.text}</div>
      </div>
    </div>
  );
};

const SoftwareDevDemo: React.FC = () => {
  const [state, setState] = useState({
    displayedMessages: [] as TeamMember[],
    showTyping: false,
    activeAgent: null as string | null,
    typingText: "",
    isTypingMessage: false,
  });
  const messagesRef = useRef<HTMLDivElement>(null);

  const agents = [
    {
      sender: "ArchitectAI",
      role: "System Architecture Agent",
      expertise: [
        "Designed 1000+ scalable systems",
        "Expert in microservices and cloud architecture",
        "Specialized in AI/ML infrastructure",
      ],
      isAI: true,
    },
    {
      sender: "Alex Chen",
      role: "Senior Full-Stack Engineer",
      expertise: [
        "Built 50+ production systems at scale",
        "Expert in React, Node.js, and cloud platforms",
        "15 years in software architecture",
      ],
      isAI: false,
    },
    {
      sender: "DevOpsBot",
      role: "CI/CD Automation Agent",
      expertise: [
        "Automated 10k+ deployments",
        "Specializes in Docker, Kubernetes, AWS",
        "Auto-generates test suites",
      ],
      isAI: true,
    },
  ];

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.displayedMessages, state.showTyping]);

  useEffect(() => {
    const demoManager = SoftwareDevDemoManager.getInstance();
    const unsubscribe = demoManager.subscribe(setState);
    return unsubscribe;
  }, []);

  return (
    <div
      className="flex gap-6 items-start justify-center"
      style={{ paddingRight: "200px" }}
    >
      <div
        className="relative flex justify-center items-center"
        style={{ width: "240px", height: "520px" }}
      >
        {agents.map((agent, index) => (
          <AgentBubble
            key={index}
            sender={agent.sender}
            role={agent.role}
            expertise={agent.expertise}
            isActive={state.activeAgent === agent.sender}
            isAI={agent.isAI}
          />
        ))}
      </div>

      <div className="w-64 h-[520px] bg-white rounded-[24px] border-4 border-black shadow-2xl overflow-hidden relative">
        <div className="h-10 bg-white flex justify-between items-center px-5 text-xs font-medium pt-2">
          <span className="text-black">9:41</span>
          <div
            className="pr-12 w-12 h-4 bg-black rounded-full"
            style={{ marginLeft: "14px" }}
          ></div>
          <div className="flex items-center gap-1">
            <span className="text-black ml-2">100%</span>
          </div>
        </div>

        <div className="bg-white border-b border-gray-200 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-black text-lg">←</div>
            <div className="w-7 h-7 rounded-full bg-[#C3E0DD] flex items-center justify-center">
              <span className="text-black text-xs font-bold">✦</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-black">
                AI SaaS Build
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-600 text-xs">⋯</span>
            </div>
          </div>
        </div>

        <div
          ref={messagesRef}
          className="flex-1 p-3 overflow-hidden bg-white"
          style={{ height: "350px", scrollBehavior: "smooth" }}
        >
          {state.displayedMessages.map((message, index) => (
            <Message key={index} message={message} />
          ))}

          {state.showTyping && <TypingIndicator />}
        </div>

        <div className="p-3 bg-white border-t border-gray-200">
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-2xl">
            <input
              type="text"
              readOnly
              value={state.isTypingMessage ? state.typingText : "Message"}
              className={`flex-1 bg-transparent text-xs outline-none ${
                state.isTypingMessage ? "text-black" : "text-gray-500"
              }`}
              placeholder={state.isTypingMessage ? "" : "Message"}
            />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#C3E0DD] flex items-center justify-center">
                <span className="text-black text-xs font-bold">↑</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-28 h-1 bg-black rounded-full opacity-40"></div>
      </div>
    </div>
  );
};

export default SoftwareDevDemo;