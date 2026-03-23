"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, User, Settings, LogOut, CreditCard, BookOpen } from "lucide-react";
import { NAVIGATION_ITEMS } from "@/utils/constants";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  
  // Fallback navigation items in case import fails
  const navItems = NAVIGATION_ITEMS && NAVIGATION_ITEMS.length > 0 ? NAVIGATION_ITEMS : [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getNavClasses = () => {
    return "fixed top-0 w-full z-50 border-b border-gray-200 transition-all duration-500 ease-out bg-white/30 backdrop-blur-lg shadow-sm";
  };

  const getContentClasses = () => {
    return "transition-all duration-500 ease-out opacity-100 scale-100";
  };

  const getUserDisplayName = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Don't show navigation on dashboard, questions, and review pages when logged in
  const hideNavPages = ['/dashboard', '/questions', '/review-mistakes', '/ukmla-questions', '/medical-school-exam'];
  if (user && hideNavPages.includes(pathname)) {
    return null;
  }

  return (
    <nav className={getNavClasses()}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center py-4 ${getContentClasses()}`}>
          <div className="flex items-center flex-1">
            <Link href="/" className="cursor-pointer flex items-center">
              <img src="/medbanqs-logo.png" alt="MedBanqs" className="h-10 w-auto" />
              <span className="ml-3 text-xl font-bold text-gray-900">MedBanqs</span>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-4 md:space-x-8 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-black font-medium hover:text-gray-700 transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2 md:space-x-4 flex-1 justify-end">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            ) : user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {getUserInitials()}
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {getUserDisplayName()}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{getUserDisplayName()}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    
                    <Link
                      href="/dashboard"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>

                    <Link
                      href="/subscription"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Subscription</span>
                    </Link>

                    <Link
                      href="/account-settings"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Account Settings</span>
                    </Link>

                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/auth"
                  className="hidden md:inline-block text-black font-semibold relative group transition-all duration-300"
                >
                  Log In
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link
                  href="/pricing"
                  className="hidden md:inline-block bg-black text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-black ml-2 p-1.5 sm:p-2 -mr-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 max-h-[calc(100vh-60px)] overflow-y-auto">
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block text-black font-medium py-3 text-base border-b border-gray-100 last:border-b-0"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-200">
              {user ? (
                <>
                  <div className="pb-3">
                    <p className="text-sm font-medium text-gray-900">{getUserDisplayName()}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="block text-black font-medium py-3 text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/subscription"
                    className="block text-black font-medium py-3 text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Subscription
                  </Link>
                  <Link
                    href="/account-settings"
                    className="block text-black font-medium py-3 text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Account Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left text-red-600 font-medium py-3 text-base"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth"
                    className="block text-black font-semibold py-3 text-lg text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    href="/pricing"
                    className="block w-full bg-black text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 text-center mt-4 text-lg font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;