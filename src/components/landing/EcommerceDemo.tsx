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

// Global demo manager for E-commerce
class EcommerceDemoManager {
  private static instance: EcommerceDemoManager;
  private isRunning = false;
  private subscribers = new Set<(state: any) => void>();
  private currentState = {
    displayedMessages: [] as TeamMember[],
    showTyping: false,
    activeAgent: null as string | null,
    typingText: "",
    isTypingMessage: false,
  };

  static getInstance(): EcommerceDemoManager {
    if (!EcommerceDemoManager.instance) {
      EcommerceDemoManager.instance = new EcommerceDemoManager();
    }
    return EcommerceDemoManager.instance;
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
        text: "Need to boost conversion rates by 40% before Black Friday",
        delay: 1000,
      },
      {
        type: "ai",
        sender: "ConversionBot",
        role: "Conversion Optimization Agent",
        expertise: [
          "Analyzed 50M+ e-commerce sessions",
          "Expert in A/B testing and personalization",
          "Specialized in checkout optimization",
        ],
        text: "Perfect! I'll analyze your funnel and implement dynamic pricing strategies. Expect 35-50% lift based on similar stores.",
        delay: 2500,
      },
      {
        type: "human",
        sender: "Marcus Kim",
        role: "E-commerce Growth Manager",
        expertise: [
          "Scaled 15+ e-commerce brands to 8-figure revenue",
          "Expert in marketplace optimization",
          "10 years in conversion rate optimization",
        ],
        text: "Great approach! I'll handle the creative testing and email campaigns to maximize the conversion boost.",
        delay: 2800,
      },
      {
        type: "client",
        text: "What about inventory management for the surge?",
        delay: 2000,
      },
      {
        type: "ai",
        sender: "InventoryAI",
        role: "Supply Chain Agent",
        expertise: [
          "Trained on 100k+ supply chain scenarios",
          "Specializes in demand forecasting",
          "Auto-manages vendor relationships",
        ],
        text: "Already forecasting 300% demand spike. Auto-reordering top SKUs and negotiating expedited shipping with vendors.",
        delay: 2500,
      },
      {
        type: "client",
        text: "Excellent! When do we launch the optimization?",
        delay: 1800,
      },
      {
        type: "ai",
        sender: "ConversionBot",
        role: "Conversion Optimization Agent",
        expertise: [
          "Analyzed 50M+ e-commerce sessions",
          "Expert in A/B testing and personalization",
          "Specialized in checkout optimization",
        ],
        text: "Landing page tests go live in 2 hours. I'll monitor performance 24/7 and auto-adjust based on real-time data.",
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
            isAI ? "bg-[#D5D1E9] text-black" : "bg-black text-white"
          }`}
        >
          {isAI ? "✦" : initials}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-bold text-black">{sender}</h3>
            <span
              className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                isAI ? "bg-[#D5D1E9] text-black" : "bg-black text-white"
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
                  isAI ? "bg-orange-500" : "bg-black"
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
    message.sender?.includes("Bot") || message.sender?.includes("AI");

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

const EcommerceDemo: React.FC = () => {
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
      sender: "ConversionBot",
      role: "Conversion Optimization Agent",
      expertise: [
        "Analyzed 50M+ e-commerce sessions",
        "Expert in A/B testing and personalization",
        "Specialized in checkout optimization",
      ],
      isAI: true,
    },
    {
      sender: "Marcus Kim",
      role: "E-commerce Growth Manager",
      expertise: [
        "Scaled 15+ e-commerce brands to 8-figure revenue",
        "Expert in marketplace optimization",
        "10 years in conversion rate optimization",
      ],
      isAI: false,
    },
    {
      sender: "InventoryAI",
      role: "Supply Chain Agent",
      expertise: [
        "Trained on 100k+ supply chain scenarios",
        "Specializes in demand forecasting",
        "Auto-manages vendor relationships",
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
    const demoManager = EcommerceDemoManager.getInstance();
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
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#D5D1E9" }}
            >
              <span className="text-black text-xs font-bold">✦</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-black">
                E-commerce Growth
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
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#D5D1E9" }}
              >
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

export default EcommerceDemo;