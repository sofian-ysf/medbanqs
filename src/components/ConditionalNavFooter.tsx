"use client";

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import Footer from './Footer';
import AIDemoChatbot from './AIDemoChatbot';
import BriefGeneratorAI from './BriefGeneratorAI';
import { BriefGeneratorProvider, useBriefGeneratorContext } from '@/lib/contexts/BriefGeneratorContext';

interface ConditionalNavFooterProps {
  children: React.ReactNode;
  showNavBar?: boolean;
  showFooter?: boolean;
  showChatbot?: boolean;
}

export default function ConditionalNavFooter({ 
  children,
  showNavBar = true, 
  showFooter = true,
  showChatbot = true
}: ConditionalNavFooterProps) {
  const pathname = usePathname();
  
  // Hide Nav/Footer/Chatbot on the landing page, show them on other pages
  const isLandingPage = pathname === '/';
  
  // Hide Chatbot on brief generator page (preserve our AI assistant logic)
  const isBriefGenerator = pathname === '/brief-generator';
  
  // Hide Nav/Footer on onboarding-new page
  const isOnboardingNew = pathname.startsWith('/onboarding-new');
  
  // Hide Nav/Footer on dashboard pages (excluding CRM)
  const isDashboard = pathname.includes('/dashboard') || 
                      pathname === '/project-dashboard';
  
  if (isLandingPage) {
    // For landing page, show content with AI assistant but without nav, WITH footer
    return (
      <>
        {children}
        {showChatbot && <AIDemoChatbot isHomepage={true} />}
        {showFooter && <Footer />}
      </>
    );
  }
  
  if (isBriefGenerator) {
    // For brief generator, show content without nav and footer, but with specialized AI
    return (
      <BriefGeneratorProvider>
        <BriefGeneratorWrapper showChatbot={showChatbot}>
          {children}
        </BriefGeneratorWrapper>
      </BriefGeneratorProvider>
    );
  }
  
  if (isOnboardingNew) {
    // For onboarding-new, show content without nav and footer
    return (
      <>
        {children}
        {showChatbot && <AIDemoChatbot />}
      </>
    );
  }
  
  if (isDashboard) {
    // For dashboards, show content without nav and footer, with chatbot
    return (
      <>
        {children}
        {showChatbot && <AIDemoChatbot />}
      </>
    );
  }
  
  return (
    <>
      {showNavBar && <Navigation />}
      {showChatbot && <AIDemoChatbot />}
      <main style={{ flex: 1, paddingTop: '72px' }}>
        {children}
      </main>
      {showFooter && <Footer />}
    </>
  );
}

// Wrapper component that can use the BriefGeneratorContext
function BriefGeneratorWrapper({ children, showChatbot }: { children: React.ReactNode; showChatbot: boolean }) {
  const { currentStep } = useBriefGeneratorContext();
  
  // Hide chatbot when on final_brief step
  const shouldShowChatbot = showChatbot && currentStep !== 'final_brief';
  
  return (
    <>
      {children}
      {shouldShowChatbot && <BriefGeneratorAI />}
    </>
  );
}