"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Settings, LogOut, CreditCard, BookOpen } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";

const NAV_ITEMS = [
  { href: "/#features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/auth?redirect=/dashboard/flashcards", label: "Flashcards" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

const PillNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      // Show floating CTA after scrolling past hero section (~500px)
      setShowFloatingCTA(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getUserDisplayName = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split("@")[0];
    return "User";
  };

  // Hide nav on dashboard pages when logged in
  const hideNavPages = ["/dashboard", "/questions", "/review-mistakes"];
  if (user && hideNavPages.some(page => pathname.startsWith(page))) {
    return null;
  }

  return (
    <>
      <nav className="fixed top-0 w-full z-50 py-4 px-4">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          {/* Main Nav Pill */}
          <div className={`pill-nav ${isScrolled ? "scrolled" : ""} px-4 py-2 inline-flex items-center gap-2`}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 pr-2">
              <img src="/mastermla-logo.png" alt="MedBanqs" className="h-7 w-7 rounded-md" />
              <span className="font-semibold text-dark-text">MedBanqs</span>
            </Link>

            {/* Divider */}
            <div className="w-px h-5 bg-black/10" />

            {/* Nav Links */}
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-black hover:bg-black/5 rounded-full transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Hamburger */}
            <button
              className="sm:hidden p-2 -mr-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Auth Pill */}
          <div className={`pill-nav ${isScrolled ? "scrolled" : ""} px-3 py-2 inline-flex items-center gap-2`}>
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-2 py-1 hover:bg-black/5 rounded-full transition-colors"
                >
                  <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    {getUserDisplayName().slice(0, 2).toUpperCase()}
                  </div>
                  <ChevronDown className="w-4 h-4 text-dark-secondary" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-dark-text">{getUserDisplayName()}</p>
                      <p className="text-xs text-dark-muted">{user.email}</p>
                    </div>
                    <Link href="/dashboard" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-dark-secondary hover:bg-gray-50">
                      <BookOpen className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    <Link href="/subscription" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-dark-secondary hover:bg-gray-50">
                      <CreditCard className="w-4 h-4" />
                      <span>Subscription</span>
                    </Link>
                    <Link href="/account-settings" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-dark-secondary hover:bg-gray-50">
                      <Settings className="w-4 h-4" />
                      <span>Account Settings</span>
                    </Link>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button onClick={handleSignOut} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth" className="px-3 py-1.5 text-sm text-gray-600 hover:text-black transition-colors">
                  Login
                </Link>
                <Link href="/pricing" className="bg-dark-text text-white px-4 py-1.5 text-sm font-medium rounded-full hover:bg-gray-800 transition-colors">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 mobile-overlay open sm:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 mobile-menu ${isMenuOpen ? "open" : ""} sm:hidden`}>
        <div className="flex items-center justify-between p-4 border-b">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
            <img src="/mastermla-logo.png" alt="MedBanqs" className="h-7 w-7 rounded-md" />
            <span className="font-semibold text-dark-text">MedBanqs</span>
          </Link>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block px-4 py-3 text-dark-text font-medium hover:bg-gray-50 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
          {user ? (
            <div className="space-y-3">
              <div className="px-4 py-2 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-dark-text">{getUserDisplayName()}</p>
                <p className="text-xs text-dark-muted">{user.email}</p>
              </div>
              <Link href="/dashboard" className="block w-full pill-btn pill-btn-primary py-3 text-center font-medium" onClick={() => setIsMenuOpen(false)}>
                Dashboard
              </Link>
              <button onClick={handleSignOut} className="block w-full py-3 text-center text-red-600 font-medium">
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <Link href="/pricing" className="block w-full pill-btn pill-btn-primary py-3 text-center font-medium" onClick={() => setIsMenuOpen(false)}>
                Get Started Free
              </Link>
              <Link href="/auth" className="block w-full pill-btn pill-btn-secondary py-3 text-center font-medium" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Floating CTA Pill - appears on scroll */}
      {!user && showFloatingCTA && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
          <Link
            href="/pricing"
            className="flex items-center gap-3 bg-dark-text text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-800 transition-all hover:scale-105"
          >
            <span className="font-medium">Get Started</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </>
  );
};

export default PillNavigation;
