"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NAVIGATION_ITEMS } from "@/utils/constants";
import { useTranslation } from "@/contexts/TranslationContext";
import LanguageSwitcher from "./LanguageSwitcher";
import Link from "next/link";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // More sensitive scroll detection
      if (currentScrollY > lastScrollY && currentScrollY > 20) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }

      setLastScrollY(currentScrollY);
    };

    // Add throttling for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [lastScrollY]);

  const getNavClasses = () => {
    return "fixed top-0 w-full z-50 border-b border-gray-200 transition-all duration-500 ease-out bg-white/30 backdrop-blur-lg shadow-sm";
  };

  const getContentClasses = () => {
    return "transition-all duration-500 ease-out opacity-100 scale-100";
  };

  return (
    <nav className={getNavClasses()}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center py-4 ${getContentClasses()}`}
        >
          <div className="flex items-center flex-1">
            <Link href="/" className="cursor-pointer">
              <img src="/moccet-logo.png" alt="Moccet" className="h-6 w-auto" />
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 flex-1 justify-center">
            <Link
              href="/learn-more-approach"
              className="text-black font-semibold relative group transition-all duration-300"
            >
              How It Works
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/case-studies"
              className="text-black font-semibold relative group transition-all duration-300"
            >
              Stories
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4 flex-1 justify-end">
            <Link
              href="/signin"
              className="text-black font-semibold relative group transition-all duration-300"
            >
              Log In
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/demo-booking"
              className="text-black font-semibold relative group transition-all duration-300"
            >
              {t("nav.talkToUs")}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/brief-generator"
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
            >
              {t("nav.getStarted")}
            </Link>
            <LanguageSwitcher />
          </div>
          <button
            className="md:hidden text-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            <Link
              href="/learn-more-approach"
              className="block text-black font-semibold relative group transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/case-studies"
              className="block text-black font-semibold relative group transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Stories
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/signin"
              className="block text-black font-semibold relative group transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Log In
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <div className="flex justify-center py-2">
              <LanguageSwitcher />
            </div>
            <Link
              href="/brief-generator"
              className="block w-full bg-black text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.getStarted")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;