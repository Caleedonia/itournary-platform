"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import CollaborationPanel from '@/components/Collaboration/CollaborationPanel';
import ActivityFeed from '@/components/Activity/ActivityFeed';
import CommentThread from '@/components/Comments/CommentThread';
import NotificationList from '@/components/Notifications/NotificationList';
import TimelineContainer from '@/components/Timeline/TimelineContainer';
import BudgetContainer from '@/components/Budget/BudgetContainer';

export default function ExperienceDetailPage() {
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [collaborationOpen, setCollaborationOpen] = useState(false);

  const params = useParams();
  const experienceId = params.experienceId;

  useEffect(() => {
    async function fetchExperience() {
      if (!experienceId) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/experiences`);

        if (!response.ok) {
          throw new Error('Failed to fetch experiences');
        }

        const data = await response.json();

        // Find the matching experience from the list
        const foundExperience = data.experiences.find(exp => exp._id === experienceId);

        if (foundExperience) {
          console.log('Found matching experience:', foundExperience);
          setExperience(foundExperience);
        } else {
          setError('Experience not found');
        }
      } catch (err) {
        console.error('Error fetching experience:', err);
        setError(`Failed to load experience details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchExperience();
  }, [experienceId]);

  if (loading) {
    return <div className="container mx-auto p-8">Loading experience...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-600 mb-4">{error}</p>
        <Link href="/account/experience-planner" className="text-blue-600 underline">
          Back to Experience Planner
        </Link>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Experience Not Found</h1>
        <p>Could not find experience with ID: {experienceId}</p>
        <Link href="/account/experience-planner" className="text-blue-600 underline">
          Back to Experience Planner
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 relative">
      <div className="flex justify-between items-center mb-6">
        <Link href="/account/experience-planner" className="text-blue-600 underline block">
          Back to Experience Planner
        </Link>

        <button
          onClick={() => setCollaborationOpen(!collaborationOpen)}
          className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Collaboration
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-4">{experience.experienceName || "Untitled Experience"}</h1>

      {experience.occasionTypeName && (
        <div className="mb-4">
          <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-sm">
            {experience.occasionTypeName}
          </span>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          {/* Tabs */}
          <div className="border-b border-slate-200 mb-6">
            <nav className="-mb-px flex gap-6 overflow-x-auto" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'timeline'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                Timeline
              </button>
              <button
                onClick={() => setActiveTab('budget')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'budget'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                Budget
              </button>
              <button
                onClick={() => setActiveTab('checklist')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'checklist'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                Checklist
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'activity'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                Activity
              </button>
            </nav>
          </div>

          {/* Tab content */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Experience Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-slate-50 p-4 rounded-md">
                    <p className="text-slate-500 mb-1">Start Date</p>
                    <p className="font-semibold">
                      {experience.startDate ? new Date(experience.startDate).toLocaleDateString() : "Not specified"}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-md">
                    <p className="text-slate-500 mb-1">End Date</p>
                    <p className="font-semibold">
                      {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : "Not specified"}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-md">
                    <p className="text-slate-500 mb-1">Destination</p>
                    <p className="font-semibold">{experience.destination || "Not specified"}</p>
                  </div>
                </div>
                {experience.notes && (
                  <div className="mt-4 p-4 bg-gray-50 rounded">
                    <h2 className="text-xl font-bold mb-2">Notes</h2>
                    <p>{experience.notes}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'timeline' && (
              <TimelineContainer 
                experienceId={experienceId} 
                experienceName={experience.experienceName || "Untitled Experience"}
              />
            )}

            {activeTab === 'budget' && (
              <BudgetContainer 
                experienceId={experienceId} 
                experienceName={experience.experienceName || "Untitled Experience"}
              />
            )}

            {activeTab === 'checklist' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Checklist</h2>
                <p className="text-gray-500 mb-4">Keep track of tasks and decisions for your experience.</p>
                <div className="p-4 bg-slate-50 rounded-lg text-center">
                  <p>Checklist feature coming soon. This will display your tasks and decisions.</p>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Activity</h2>
                <ActivityFeed experienceId={experienceId} />
              </div>
            )}
          </div>
        </div>

        {/* Collaboration Panel */}
        {collaborationOpen && (
          <div className="w-full md:w-96 bg-white rounded-lg shadow-md p-0 overflow-hidden">
            <CollaborationPanel
              experienceId={experienceId}
              onClose={() => setCollaborationOpen(false)}
            />
          </div>
        )}
      </div>

      {/* Notification indicator */}
      <div className="fixed bottom-6 right-6">
        <NotificationList experienceId={experienceId} />
      </div>
    </div>
  );
};
