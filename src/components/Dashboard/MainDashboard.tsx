'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MainDashboard.module.css';

interface DashboardProps {
  userRole?: 'business' | 'student' | 'admin';
  isFirstTime?: boolean;
  briefData?: any;
}

const MainDashboard: React.FC<DashboardProps> = ({ 
  userRole = 'business', 
  isFirstTime = false,
  briefData = null 
}) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Welcome to moccet!', type: 'success', read: false },
    { id: 2, message: 'Your project is being reviewed', type: 'info', read: false },
  ]);

  // Check if this is first time login from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const onboardingComplete = urlParams.get('onboarding');
    if (onboardingComplete === 'complete') {
      setNotifications(prev => [
        { id: Date.now(), message: 'Onboarding completed successfully!', type: 'success', read: false },
        ...prev
      ]);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/signin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const markNotificationRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'brief', label: 'Project Brief', icon: '📋' },
    { id: 'team', label: 'Team', icon: '👥' },
    { id: 'messages', label: 'Messages', icon: '💬' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className={styles.contentSection}>
            <h2>Project Overview</h2>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <h3>Active Projects</h3>
                <p className={styles.statNumber}>3</p>
              </div>
              <div className={styles.statCard}>
                <h3>Team Members</h3>
                <p className={styles.statNumber}>8</p>
              </div>
              <div className={styles.statCard}>
                <h3>Completion Rate</h3>
                <p className={styles.statNumber}>85%</p>
              </div>
              <div className={styles.statCard}>
                <h3>Next Milestone</h3>
                <p className={styles.statNumber}>2 days</p>
              </div>
            </div>
          </div>
        );
      
      case 'brief':
        return (
          <div className={styles.contentSection}>
            <h2>Project Brief</h2>
            {briefData ? (
              <div className={styles.briefContainer}>
                <div className={styles.briefSection}>
                  <h3>Project Details</h3>
                  <p><strong>Title:</strong> {briefData.title || 'Your Project'}</p>
                  <p><strong>Description:</strong> {briefData.description || 'Project description will appear here'}</p>
                  <p><strong>Timeline:</strong> {briefData.timeline || '8 weeks'}</p>
                  <p><strong>Budget:</strong> {briefData.budget || '$45,000'}</p>
                </div>
                <div className={styles.briefSection}>
                  <h3>Deliverables</h3>
                  <ul>
                    {briefData.deliverables?.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    )) || ['Fully functional application', 'Source code and documentation', 'Deployment instructions']}
                  </ul>
                </div>
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>No brief data available. Complete the onboarding process to see your project brief.</p>
                <button 
                  className={styles.primaryButton}
                  onClick={() => router.push('/onboarding')}
                >
                  Start Onboarding
                </button>
              </div>
            )}
          </div>
        );
      
      case 'projects':
        return (
          <div className={styles.contentSection}>
            <h2>Your Projects</h2>
            <div className={styles.projectsGrid}>
              <div className={styles.projectCard}>
                <h3>E-commerce Platform</h3>
                <p>Status: In Progress</p>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '75%' }}></div>
                </div>
                <p>75% Complete</p>
              </div>
              <div className={styles.projectCard}>
                <h3>Mobile App</h3>
                <p>Status: Planning</p>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '25%' }}></div>
                </div>
                <p>25% Complete</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className={styles.contentSection}>
            <h2>{navigationItems.find(item => item.id === activeTab)?.label}</h2>
            <p>This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button 
            className={styles.menuButton}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <h1 className={styles.logo}>moccet</h1>
        </div>
        
        <div className={styles.headerRight}>
          <div className={styles.notifications}>
            <button className={styles.notificationButton}>
              🔔
              {notifications.filter(n => !n.read).length > 0 && (
                <span className={styles.notificationBadge}>
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>
          </div>
          
          <div className={styles.userMenu}>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user?.displayName || user?.email}</span>
              <span className={styles.userRole}>{userRole}</span>
            </div>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className={styles.mainContainer}>
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside 
              className={styles.sidebar}
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <nav className={styles.navigation}>
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    className={`${styles.navItem} ${activeTab === item.id ? styles.active : ''}`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span className={styles.navLabel}>{item.label}</span>
                  </button>
                ))}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className={styles.mainContent}>
          {/* Welcome Section */}
          <section className={styles.welcomeSection}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className={styles.welcomeTitle}>
                {isFirstTime ? 'Welcome to moccet!' : 'Welcome back!'}
              </h1>
              <p className={styles.welcomeSubtitle}>
                {isFirstTime 
                  ? 'Let\'s get started with your first project. Complete the onboarding to see your personalized dashboard.'
                  : 'Here\'s what\'s happening with your projects today.'
                }
              </p>
              
              {isFirstTime && (
                <button 
                  className={styles.primaryButton}
                  onClick={() => router.push('/onboarding')}
                >
                  Complete Onboarding
                </button>
              )}
            </motion.div>
          </section>

          {/* Notifications */}
          {notifications.filter(n => !n.read).length > 0 && (
            <section className={styles.notificationsSection}>
              <h3>Notifications</h3>
              <div className={styles.notificationsList}>
                {notifications.filter(n => !n.read).map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`${styles.notification} ${styles[notification.type]}`}
                    onClick={() => markNotificationRead(notification.id)}
                  >
                    <p>{notification.message}</p>
                    <button className={styles.dismissButton}>×</button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Main Content Area */}
          <section className={styles.contentArea}>
            {renderContent()}
          </section>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default MainDashboard; 