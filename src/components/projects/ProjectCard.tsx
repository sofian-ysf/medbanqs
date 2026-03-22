'use client';

import React from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  isCollaborating?: boolean;
  collaboratingBusinessId?: string;
  businessName?: string;
  timeline?: string;
  skills?: string[];
  status?: 'open' | 'in-progress' | 'completed';
  category?: string;
}

interface ProjectCardProps {
  project: Project;
  onApply?: () => void;
  onViewDetails?: () => void;
  showStatus?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onApply, 
  onViewDetails,
  showStatus = false 
}) => {
  const formatBudget = (budget: number) => {
    return budget ? `$${budget.toLocaleString()}` : 'Negotiable';
  };

  const getStatusBadge = (status?: string) => {
    const statusColors = {
      'open': 'bg-green-100 text-green-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'completed': 'bg-gray-100 text-gray-800'
    };
    
    if (!status) return null;
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status] || ''}`}>
        {status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {project.title}
          </h3>
          {showStatus && getStatusBadge(project.status)}
        </div>

        <p className="text-gray-600 line-clamp-3">
          {project.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Budget:</span>
            <span className="font-semibold text-gray-900">
              {formatBudget(project.budget)}
            </span>
          </div>

          {project.timeline && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Timeline:</span>
              <span className="text-gray-900">{project.timeline}</span>
            </div>
          )}

          {project.businessName && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Posted by:</span>
              <span className="text-gray-900">{project.businessName}</span>
            </div>
          )}
        </div>

        {project.skills && project.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
              >
                {skill}
              </span>
            ))}
            {project.skills.length > 3 && (
              <span className="px-2 py-1 text-xs text-gray-500">
                +{project.skills.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="pt-4 space-y-2">
          {!project.isCollaborating ? (
            <>
              {onApply && (
                <button
                  onClick={onApply}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors"
                >
                  Apply Now
                </button>
              )}
              {onViewDetails && (
                <button
                  onClick={onViewDetails}
                  className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium transition-colors"
                >
                  View Details
                </button>
              )}
            </>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-md p-3">
              <p className="text-sm font-medium text-green-800">
                <svg className="w-4 h-4 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                In Collaboration
              </p>
              {project.collaboratingBusinessId && (
                <p className="text-xs text-green-700 mt-1">
                  Partner ID: {project.collaboratingBusinessId}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;