'use client';

import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { LoadingSpinner } from '@/components/ui/Loading';

interface UserData {
  id?: string;
  startupName: string;
  description: string;
  location: string;
  contactOne: string;
  contactTwo: string;
  status: string;
  notes: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastContacted?: Date | null;
  emailEngagement?: any;
  hasResearch?: boolean;
}

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded?: () => void;
  editUser?: UserData | null;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ 
  isOpen, 
  onClose, 
  onUserAdded, 
  editUser 
}) => {
  const [formData, setFormData] = useState<UserData>({
    startupName: '',
    description: '',
    location: '',
    contactOne: '',
    contactTwo: '',
    status: 'new',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editUser) {
      setFormData({
        startupName: editUser.startupName || '',
        description: editUser.description || '',
        location: editUser.location || '',
        contactOne: editUser.contactOne || '',
        contactTwo: editUser.contactTwo || '',
        status: editUser.status || 'new',
        notes: editUser.notes || ''
      });
    } else {
      setFormData({
        startupName: '',
        description: '',
        location: '',
        contactOne: '',
        contactTwo: '',
        status: 'new',
        notes: ''
      });
    }
  }, [editUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.startupName || !formData.contactOne) {
      setError('Startup name and at least one contact email are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const linkedInRegex = /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\//i;
    
    if (!emailRegex.test(formData.contactOne) && !linkedInRegex.test(formData.contactOne)) {
      setError('Please enter a valid email address or LinkedIn profile URL for Contact One.');
      return;
    }
    
    if (formData.contactTwo && !emailRegex.test(formData.contactTwo) && !linkedInRegex.test(formData.contactTwo)) {
      setError('Please enter a valid email address or LinkedIn profile URL for Contact Two.');
      return;
    }

    setLoading(true);
    
    try {
      if (editUser?.id) {
        const userRef = doc(db, 'outreach', editUser.id);
        await updateDoc(userRef, {
          ...formData,
          updatedAt: new Date()
        });
      } else {
        const newUser = {
          ...formData,
          createdAt: new Date(),
          lastContacted: null,
          emailEngagement: null,
          hasResearch: false
        };
        
        await addDoc(collection(db, 'outreach'), newUser);
      }
      
      setFormData({
        startupName: '',
        description: '',
        location: '',
        contactOne: '',
        contactTwo: '',
        status: 'new',
        notes: ''
      });
      
      onUserAdded?.();
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
      setError(editUser ? 'Failed to update contact.' : 'Failed to add contact.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {editUser ? 'Edit Contact' : 'Add New Contact'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Startup Name *
            </label>
            <input
              type="text"
              name="startupName"
              value={formData.startupName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter startup name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Brief description"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., San Francisco, CA"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact One *
            </label>
            <input
              type="text"
              name="contactOne"
              value={formData.contactOne}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="email@example.com or LinkedIn URL"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Two
            </label>
            <input
              type="text"
              name="contactTwo"
              value={formData.contactTwo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="email@example.com or LinkedIn URL"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="new">New</option>
              <option value="active">Active</option>
              <option value="contacted">Contacted</option>
              <option value="interested">Interested</option>
              <option value="not-interested">Not Interested</option>
              <option value="follow-up">Follow Up</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Additional notes..."
            />
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-700">
              {error}
            </div>
          )}
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  {editUser ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                <>
                  {editUser ? 'Update Contact' : 'Add Contact'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;