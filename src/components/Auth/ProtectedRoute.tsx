'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireOnboarding?: boolean;
  allowedRoles?: string[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireOnboarding = true,
  allowedRoles = [],
  redirectTo = '/signin'
}) => {
  const { user, loading, onboardingCompleted, userRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // If not authenticated, redirect to signin
      if (!user) {
        router.push(redirectTo);
        return;
      }

      // If onboarding is required but not completed, redirect to onboarding
      if (requireOnboarding && !onboardingCompleted) {
        router.push('/onboarding');
        return;
      }

      // If specific roles are required, check user role
      if (allowedRoles.length > 0 && userRole && !allowedRoles.includes(userRole)) {
        // Redirect to appropriate dashboard based on role
        if (userRole === 'business') {
          router.push('/business/dashboard');
        } else if (userRole === 'student') {
          router.push('/student/dashboard');
        } else if (userRole === 'admin') {
          router.push('/admin/crm');
        } else {
          router.push('/dashboard');
        }
        return;
      }
    }
  }, [user, loading, onboardingCompleted, userRole, requireOnboarding, allowedRoles, redirectTo, router]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render children (will redirect)
  if (!user) {
    return null;
  }

  // If onboarding required but not completed, don't render children (will redirect)
  if (requireOnboarding && !onboardingCompleted) {
    return null;
  }

  // If role check fails, don't render children (will redirect)
  if (allowedRoles.length > 0 && userRole && !allowedRoles.includes(userRole)) {
    return null;
  }

  // User is authenticated and authorized, render children
  return <>{children}</>;
};

export default ProtectedRoute; 