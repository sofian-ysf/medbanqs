'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '@/components/ui/Loading';

interface Contact {
  email: string;
  firstName?: string;
  name?: string;
  outreachId?: string;
  projectTitle?: string;
  startupName?: string;
  companyName?: string;
}

interface User {
  email: string;
  name?: string;
  projectTitle?: string;
}

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSend: (
    email: string,
    name: string,
    subject: string,
    content: string,
    template: string,
    useAI: boolean
  ) => Promise<void>;
  contact: Contact;
}

interface EmailTemplate {
  name: string;
  subject: string;
  preview: string;
}

const EmailModal: React.FC<EmailModalProps> = ({ 
  isOpen, 
  onClose, 
  user, 
  onSend, 
  contact 
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState('day1');
  const [senderName, setSenderName] = useState('Allegra Squarzi');
  const [businessName, setBusinessName] = useState('');
  const [closingText, setClosingText] = useState('Sincerely');
  const [companyLine, setCompanyLine] = useState('Moccet, Palo Alto, CA 94301');
  const [sending, setSending] = useState(false);
  const [subject, setSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [customContent, setCustomContent] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [draftLoaded, setDraftLoaded] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);
  const [useAI, setUseAI] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [businessContext, setBusinessContext] = useState('');
  const [aiGenerated, setAiGenerated] = useState(false);
  const [previewHtml, setPreviewHtml] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const templates: Record<string, EmailTemplate> = {
    day1: {
      name: 'Day 1 - Brief Ready',
      subject: 'Your AI-generated brief is ready',
      preview: 'Your AI-generated brief for "[ProjectTitle]" is ready...'
    },
    day3: {
      name: 'Day 3 - Connect with Talent',
      subject: 'Connect with specialists for your project',
      preview: 'Moving forward with "[ProjectTitle]" allows Moccet to match you...'
    },
    day5: {
      name: 'Day 5 - Project Dashboard',
      subject: 'Manage your project in one place',
      preview: 'Moccet keeps everything for "[ProjectTitle]" in one place...'
    },
    day7: {
      name: 'Day 7 - Track Progress',
      subject: 'See your project milestones in real-time',
      preview: 'Once "[ProjectTitle]" is in progress, you can see each milestone...'
    },
    day10: {
      name: 'Day 10 - Launch Project',
      subject: 'Ready to launch your project?',
      preview: 'You now have a clear view of how Moccet can support "[ProjectTitle]"...'
    },
    custom: {
      name: 'Custom Email - Write from Scratch',
      subject: '',
      preview: 'Write your own custom email...'
    }
  };

  const getLogoHtml = () => {
    return `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 32px; font-weight: 700; color: #333; letter-spacing: -0.5px;">moccet</div>`;
  };

  const getEmailTemplate = (
    templateKey: string, 
    firstName: string, 
    projectTitle: string, 
    senderName: string, 
    businessName: string, 
    closingText: string, 
    companyLine: string
  ) => {
    const logoHtml = getLogoHtml();
    const greeting = businessName || firstName;
    
    // Simplified template generation for brevity
    const baseHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body, html { margin: 0; padding: 0; font-family: "Helvetica Neue", Arial, sans-serif; color: #000; line-height: 1.5; }
    table { border-collapse: collapse; width: 100%; }
    .container { max-width: 600px; margin: 0 auto; }
    .logo-cell { text-align: left; padding: 20px; }
    .content-cell { text-align: left; padding: 20px; }
    .cta-button { display: inline-block; padding: 6px 14px; border: 1px solid #000; border-radius: 20px; background-color: #fff; color: #000; text-decoration: none; font-weight: 500; font-size: 14px; margin-top: 10px; }
    p { margin-top: 0; margin-bottom: 1em; }
  </style>
</head>
<body>
<table class="container">
  <tr><td class="logo-cell">${logoHtml}</td></tr>
  <tr><td class="content-cell">
    <p>Hi ${greeting}</p>
    <p>${templates[templateKey]?.preview.replace('[ProjectTitle]', projectTitle)}</p>
    <p><a href="https://www.moccet.com" class="cta-button">Get Started</a></p>
    <p>${closingText}<br>${senderName}<br>${companyLine}</p>
  </td></tr>
</table>
</body>
</html>`;
    
    return {
      subject: templates[templateKey]?.subject || '',
      html: baseHtml
    };
  };

  // Draft management
  const getDraftKey = useCallback((userEmail: string) => {
    return `emailDraft_${userEmail}`;
  }, []);

  const saveDraft = useCallback(() => {
    if (!user?.email) return;
    
    const draft = {
      selectedTemplate,
      senderName,
      businessName,
      closingText,
      companyLine,
      subject,
      customContent,
      isCustom,
      lastSaved: new Date().toISOString()
    };
    
    try {
      localStorage.setItem(getDraftKey(user.email), JSON.stringify(draft));
      setDraftSaved(true);
      setLastSavedTime(new Date());
      setTimeout(() => setDraftSaved(false), 2000);
    } catch (error) {
      console.error('Failed to save draft:', error);
    }
  }, [user, selectedTemplate, senderName, businessName, closingText, companyLine, subject, customContent, isCustom, getDraftKey]);

  const loadDraft = useCallback(() => {
    if (!user?.email) return;
    
    try {
      const draftData = localStorage.getItem(getDraftKey(user.email));
      if (draftData) {
        const draft = JSON.parse(draftData);
        setSelectedTemplate(draft.selectedTemplate || 'day1');
        setSenderName(draft.senderName || 'Allegra Squarzi');
        setBusinessName(draft.businessName || '');
        setClosingText(draft.closingText || 'Sincerely');
        setCompanyLine(draft.companyLine || 'Moccet, Palo Alto, CA 94301');
        setSubject(draft.subject || '');
        setCustomContent(draft.customContent || '');
        setIsCustom(draft.isCustom || false);
        setDraftLoaded(true);
        if (draft.lastSaved) {
          setLastSavedTime(new Date(draft.lastSaved));
          setDraftSaved(true);
          setTimeout(() => setDraftSaved(false), 2000);
        }
      }
    } catch (error) {
      console.error('Failed to load draft:', error);
    }
  }, [user, getDraftKey]);

  const triggerAutoSave = useCallback(() => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }
    
    autoSaveTimeoutRef.current = setTimeout(() => {
      saveDraft();
    }, 1000);
  }, [saveDraft]);

  const handleClose = useCallback(() => {
    document.body.classList.remove('email-modal-open');
    saveDraft();
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }
    onClose();
  }, [onClose, saveDraft]);

  const handleSend = async () => {
    if (useAI && !aiGenerated) {
      // AI generation flow would go here
      toast.info('AI email generation not implemented in this migration');
      return;
    }

    setSending(true);
    try {
      await onSend(
        contact.email,
        contact.firstName || contact.name || '',
        subject,
        isCustom ? customContent : emailContent,
        selectedTemplate,
        useAI && aiGenerated
      );
      
      toast.success('Email sent successfully!');
      onClose();
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email');
    } finally {
      setSending(false);
    }
  };

  // Update email content when template changes
  useEffect(() => {
    if (draftLoaded) {
      setDraftLoaded(false);
      return;
    }
    
    if (selectedTemplate === 'custom') {
      setIsCustom(true);
    } else if (selectedTemplate && templates[selectedTemplate] && user) {
      setIsCustom(false);
      const firstName = user.name ? user.name.split(' ')[0] : 'there';
      const projectTitle = user.projectTitle || 'Your Project';
      const emailTemplate = getEmailTemplate(
        selectedTemplate, 
        firstName, 
        projectTitle, 
        senderName, 
        businessName, 
        closingText, 
        companyLine
      );
      
      setSubject(emailTemplate.subject);
      setEmailContent(emailTemplate.html);
    }
  }, [selectedTemplate, user, senderName, businessName, closingText, companyLine, draftLoaded]);

  // Load draft when modal opens
  useEffect(() => {
    if (isOpen && user && !draftLoaded) {
      loadDraft();
    }
  }, [isOpen, user, draftLoaded, loadDraft]);

  // Manage modal portal
  useEffect(() => {
    let portalRoot = document.getElementById('email-modal-root');
    if (!portalRoot) {
      portalRoot = document.createElement('div');
      portalRoot.id = 'email-modal-root';
      document.body.appendChild(portalRoot);
    }
  }, []);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <div className="bg-gray-50 border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-900">
              Send Email to {user?.name}
            </h2>
            {draftSaved && (
              <span className="text-sm text-green-600 font-medium">
                ✓ Draft saved
              </span>
            )}
          </div>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Email
              </label>
              <input 
                type="email" 
                value={user?.email || ''} 
                disabled 
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Template
              </label>
              <select
                value={selectedTemplate}
                onChange={(e) => {
                  setSelectedTemplate(e.target.value);
                  setAiGenerated(false);
                  triggerAutoSave();
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.entries(templates).map(([key, template]) => (
                  <option key={key} value={key}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  triggerAutoSave();
                }}
                placeholder="Email subject"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {isCustom && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Content
                </label>
                <textarea
                  value={customContent}
                  onChange={(e) => {
                    setCustomContent(e.target.value);
                    setAiGenerated(false);
                    triggerAutoSave();
                  }}
                  placeholder="Write your email content here..."
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Preview
              </label>
              <div className="border border-gray-300 rounded-md p-4 bg-gray-50 max-h-96 overflow-auto">
                <div
                  dangerouslySetInnerHTML={{ __html: emailContent }}
                  className="bg-white rounded p-4"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border-t px-6 py-4 flex justify-end space-x-3">
          <button
            onClick={handleClose}
            disabled={sending}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={sending || aiLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? 'Sending...' : 'Send Email'}
          </button>
        </div>

        {sending && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
            <div className="text-center">
              <LoadingSpinner size="lg" className="mx-auto" />
              <p className="mt-4 text-gray-700">Sending your email...</p>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.getElementById('email-modal-root') || document.body
  );
};

export default EmailModal;