"use client";

import React, { useEffect, useState, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import './NavBar.css';

interface NavLink {
  name: string;
  path?: string;
  action?: () => void;
  showBadge?: boolean;
}

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [unreadChats, setUnreadChats] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false);
  const userSidebarRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();

  // Update auth state when user changes
  useEffect(() => {
    if (!loading) {
      if (user) {
        setIsLoggedIn(true);
        // TODO: Get user role from Firebase
        // For now, we'll need to implement role fetching
      } else {
        setIsLoggedIn(false);
        setUserRole(null);
      }
    }
  }, [user, loading]);

  // Handle scrolling and window resize
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 950);
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Handle body overflow when menu opens/closes
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Navigation handlers
  const handleLinkClick = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  const handleSectionScroll = (sectionId: string) => {
    setIsMenuOpen(false);
    
    if (pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/?section=${sectionId}`);
    }
  };

  const handleAccountLink = () => {
    setIsMenuOpen(false);
    if (userRole === 'business') {
      router.push('/business/dashboard?section=account');
    } else if (userRole === 'student') {
      router.push('/student/dashboard?section=account');
    } else {
      router.push('/signin');
    }
  };

  const handleDashboardLink = () => {
    setIsMenuOpen(false);
    if (userRole === 'business') {
      router.push('/business/dashboard');
    } else if (userRole === 'student') {
      router.push('/student/dashboard');
    } else {
      router.push('/signin');
    }
  };

  const handleLogoClick = () => {
    if (pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      router.push('/');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      // TODO: Implement logout
      // await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Payment pages where nav is hidden
  const paymentPages = [
    '/payment',
    '/project-optimization',
    '/business-signup',
    '/confirm-optimization',
    '/set-budget',
  ];
  const currentPath = pathname.toLowerCase().replace(/\/+$/, '');
  const isPaymentPage = paymentPages.includes(currentPath);
  const isCRMRoute = currentPath === '/crm' || currentPath.startsWith('/crm/');

  // Navbar styling
  const normalNavbarColor = isPaymentPage ? 'white' : '#fdfdff';
  const isOnDashboard = currentPath === '/business/dashboard' || currentPath === '/student/dashboard';
  const navbarBackgroundColor = isOnDashboard ? 'transparent' : normalNavbarColor;
  const isBriefGenerator = currentPath === '/brief-generator';
  // When scrolled, use a white background with shadow for visibility
  const finalBackgroundColor = isScrolled ? 'rgba(253, 253, 255, 0.95)' : navbarBackgroundColor;
  const boxShadow = isScrolled ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none';

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <>
      {/* Mobile Hamburger Button */}
      {isMobile && !isMenuOpen && (
        <button 
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 999999,
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '10px',
            width: '50px',
            height: '50px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4px'
          }}
          onClick={toggleMenu}
          aria-label="Open menu"
        >
          <span style={{ width: '25px', height: '3px', backgroundColor: '#333', display: 'block', transition: 'all 0.3s' }}></span>
          <span style={{ width: '25px', height: '3px', backgroundColor: '#333', display: 'block', transition: 'all 0.3s' }}></span>
          <span style={{ width: '25px', height: '3px', backgroundColor: '#333', display: 'block', transition: 'all 0.3s' }}></span>
        </button>
      )}
      
      {/* Mobile Close Button */}
      {isMobile && isMenuOpen && (
        <button 
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 999999,
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '10px',
            width: '50px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '36px',
            color: '#333'
          }}
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
        >
          &times;
        </button>
      )}
      
      <div className="bar" style={{ backgroundColor: finalBackgroundColor, boxShadow, transition: 'all 0.3s ease' }}>
        <div className="navbar" style={{ backgroundColor: finalBackgroundColor }}>
          {/* Logo */}
          <div className="logo-area" onClick={handleLogoClick}>
            <span className="text-logo">
              moccet
            </span>
          </div>

          {/* Desktop Navigation */}
          {!isPaymentPage && !isCRMRoute && (
            <>
              {/* Center Nav Links */}
              <div className="links-container-center">
                <span onClick={() => handleLinkClick('/learn-more-approach')}>
                  How It Works
                </span>
                <span onClick={() => handleLinkClick('/ai-agents')}>
                  AI Agents
                </span>
                <span onClick={() => handleLinkClick('/case-studies')}>
                  Case Studies
                </span>
                {isLoggedIn && (
                  <span onClick={handleDashboardLink}>Dashboard</span>
                )}
              </div>
              
              {/* Right Nav Links */}
              <div className="links-container-right">
                {!isLoggedIn ? (
                  <>
                    <span className="login-link" onClick={() => handleLinkClick('/signin')}>
                      Log in
                    </span>
                    <span className="request-demo-button" onClick={() => handleLinkClick('/demo-booking')}>
                      Request Demo
                    </span>
                  </>
                ) : (
                  <span className="login-link" onClick={handleLogout}>
                    Log out
                  </span>
                )}
              </div>
            </>
          )}

          {/* CRM Route - Only show logout */}
          {isCRMRoute && (
            <div className="links-container-right">
              <span className="login-link" onClick={handleLogout}>
                Log out
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.classList.contains('mobile-menu')) {
            setIsMenuOpen(false);
          }
        }}
      >
        <div className="mobile-menu-content">
          {isCRMRoute ? (
            <a onClick={handleLogout}>Log out</a>
          ) : (
            <>
              <a onClick={() => handleLinkClick('/learn-more-approach')}>How It Works</a>
              <a onClick={() => handleLinkClick('/ai-agents')}>AI Agents</a>
              <a onClick={() => handleLinkClick('/case-studies')}>Case Studies</a>
              {isLoggedIn && (
                <a onClick={handleDashboardLink}>Dashboard</a>
              )}
              {!isLoggedIn ? (
                <>
                  <a onClick={() => handleLinkClick('/signin')}>Log in</a>
                  <a onClick={() => handleLinkClick('/demo-booking')} className="request-demo-mobile">
                    Request Demo
                  </a>
                </>
              ) : (
                <a onClick={handleLogout}>Log out</a>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;