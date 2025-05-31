"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ExperienceViewerPage() {
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const experienceId = searchParams.get('id');
  
  useEffect(() => {
    async function fetchExperience() {
      if (!experienceId) return;
      
      try {
        setLoading(true);
        const response = await fetch(`/api/experiences/experience-details?id=${experienceId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch experience details');
        }
        
        const data = await response.json();
        setExperience(data.experience);
      } catch (err) {
        console.error('Error fetching experience:', err);
        setError('Failed to load experience details');
      } finally {
        setLoading(false);
      }
    }
    
    fetchExperience();
  }, [experienceId]);
  
  // Filter items by type
  const getItemsByType = (type) => {
    if (!experience?.items) return [];
    return experience.items.filter(item => item.type === type);
  };
  
  const checklistItems = experience ? getItemsByType('checklist') : [];
  const timelineItems = experience ? getItemsByType('timeline') : [];
  const budgetItems = experience ? getItemsByType('budget') : [];
  
  if (!experienceId) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-yellow-600 mb-2">No Experience Selected</h2>
          <p className="text-slate-700">Please select an experience to view.</p>
          <Link
            href="/account/experience-planner"
            className="mt-4 inline-block bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-md transition-colors"
          >
            ← Back to Experience Planner
          </Link>
        </div>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-20">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-ocean-blue-600 motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-4 text-slate-600">Loading experience details...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-slate-700">{error}</p>
          <button
            onClick={() => router.push('/account/experience-planner')}
            className="mt-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-md transition-colors"
          >
            ← Back to Experience Planner
          </button>
        </div>
      </div>
    );
  }
  
  if (!experience) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-yellow-600 mb-2">Experience Not Found</h2>
          <p className="text-slate-700">The experience you're looking for could not be found.</p>
          <Link
            href="/account/experience-planner"
            className="mt-4 inline-block bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-md transition-colors"
          >
            ← Back to Experience Planner
          </Link>
        </div>
      </div>
    );
  }
  
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with back button */}
      <div className="mb-6">
        <Link
          href="/account/experience-planner"
          className="text-slate-600 hover:text-ocean-blue-600 mb-4 flex items-center gap-1 w-fit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Experience Planner
        </Link>
      </div>
      
      {/* Experience header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">{experience.experienceName}</h1>
            <div className="flex flex-wrap gap-3 mt-2">
              {experience.occasionTypeName && (
                <span className="inline-flex items-center rounded-md bg-teal-50 px-2 py-1 text-xs font-medium text-teal-700 ring-1 ring-inset ring-teal-600/20">
                  {experience.occasionTypeName}
                </span>
              )}
              {experience.destination && (
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                  {experience.destination}
                </span>
              )}
            </div>
          </div>
          <button className="bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">
            Edit Experience
          </button>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="bg-slate-50 p-4 rounded-md">
            <p className="text-slate-500 mb-1">Start Date</p>
            <p className="font-semibold">{formatDate(experience.startDate)}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-md">
            <p className="text-slate-500 mb-1">End Date</p>
            <p className="font-semibold">{formatDate(experience.endDate)}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-md">
            <p className="text-slate-500 mb-1">Created</p>
            <p className="font-semibold">{formatDate(experience.createdAt)}</p>
          </div>
        </div>
        
        {experience.notes && (
          <div className="mt-6">
            <h3 className="text-slate-700 font-medium mb-2">Notes</h3>
            <p className="text-slate-600 bg-slate-50 p-4 rounded-md">{experience.notes}</p>
          </div>
        )}
      </div>
      
      {/* Tabs */}
      <div className="border-b border-slate-200 mb-6">
        <nav className="-mb-px flex gap-6 overflow-x-auto" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-ocean-blue-600 text-ocean-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center ${
              activeTab === 'checklist'
                ? 'border-ocean-blue-600 text-ocean-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Checklist
            {checklistItems.length > 0 && (
              <span className="ml-2 bg-teal-100 text-teal-800 text-xs font-medium px-2 py-0.5 rounded-full">
                {checklistItems.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center ${
              activeTab === 'timeline'
                ? 'border-ocean-blue-600 text-ocean-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Timeline
            {timelineItems.length > 0 && (
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                {timelineItems.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('budget')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center ${
              activeTab === 'budget'
                ? 'border-ocean-blue-600 text-ocean-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Budget
            {budgetItems.length > 0 && (
              <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                {budgetItems.length}
              </span>
            )}
          </button>
        </nav>
      </div>
      
      {/* Tab content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Experience Overview</h2>
            <p>This is a {experience.occasionTypeName} experience planned for {formatDate(experience.startDate)}.</p>
            <p className="mt-4 text-slate-600">View the checklist, timeline, and budget tabs to see template-generated content for this experience.</p>
          </div>
        )}
        
        {activeTab === 'checklist' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Checklist</h2>
              <button className="bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white font-medium py-1.5 px-3 rounded-md text-sm transition-colors inline-flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Task
              </button>
            </div>
            
            {checklistItems.length > 0 ? (
              <ul className="divide-y divide-slate-200">
                {checklistItems.map((item, index) => (
                  <li key={index} className="py-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <input
                          type="checkbox"
                          className="h-5 w-5 rounded border-slate-300 text-ocean-blue-600 focus:ring-ocean-blue-500"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between">
                          <p className={`text-sm font-medium ${item.metadata?.isCritical ? 'text-slate-900' : 'text-slate-700'}`}>
                            {item.name}
                            {item.metadata?.isCritical && (
                              <span className="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                                Critical
                              </span>
                            )}
                            {item.metadata?.fromTemplate && (
                              <span className="ml-2 inline-flex items-center rounded-md bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-600/20">
                                Template
                              </span>
                            )}
                          </p>
                          <div className="ml-2 flex-shrink-0 flex">
                            <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
                              item.metadata?.itemType === 'task' 
                                ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20'
                                : 'bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20'
                            }`}>
                              {item.metadata?.itemType === 'task' ? 'Task' : 'Decision'}
                            </span>
                          </div>
                        </div>
                        {item.notes && (
                          <p className="mt-1 text-sm text-slate-600">{item.notes}</p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-10 border border-dashed border-slate-300 rounded-md bg-slate-50">
                <h3 className="mt-2 text-sm font-semibold text-slate-700">No checklist items yet</h3>
                <p className="mt-1 text-sm text-slate-500">Add tasks to track your progress.</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'timeline' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Timeline</h2>
              <button className="bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white font-medium py-1.5 px-3 rounded-md text-sm transition-colors inline-flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Phase
              </button>
            </div>
            
            {timelineItems.length > 0 ? (
              <div className="flow-root">
                <ul className="divide-y divide-slate-200">
                  {timelineItems.map((item, index) => (
                    <li key={index} className="py-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {item.name}
                            {item.metadata?.fromTemplate && (
                              <span className="ml-2 inline-flex items-center rounded-md bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-600/20">
                                Template
                              </span>
                            )}
                          </p>
                          {item.notes && (
                            <p className="mt-1 text-sm text-slate-600">{item.notes}</p>
                          )}
                        </div>
                        {item.metadata?.duration && (
                          <span className="inline-flex items-center rounded-md bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700 ring-1 ring-inset ring-teal-600/20">
                            {item.metadata.duration}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center py-10 border border-dashed border-slate-300 rounded-md bg-slate-50">
                <h3 className="mt-2 text-sm font-semibold text-slate-700">No timeline phases yet</h3>
                <p className="mt-1 text-sm text-slate-500">Add phases to organize your schedule.</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'budget' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Budget</h2>
              <button className="bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white font-medium py-1.5 px-3 rounded-md text-sm transition-colors inline-flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Expense
              </button>
            </div>
            
            {budgetItems.length > 0 ? (
              <div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead>
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Estimated</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actual</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {budgetItems.map((item, index) => (
                        <tr key={index} className="hover:bg-slate-50">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-slate-900">
                                {item.name}
                                {item.metadata?.fromTemplate && (
                                  <span className="ml-2 inline-flex items-center rounded-md bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-600/20">
                                    Template
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-slate-900">${item.metadata?.estimatedCost || '0'}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-slate-900">${item.metadata?.actualCost || '0'}</div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-slate-600 max-w-xs truncate">{item.notes}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-slate-50">
                        <td className="px-4 py-3 text-sm font-medium text-slate-700">Total</td>
                        <td className="px-4 py-3 text-sm font-medium text-slate-700">
                          ${budgetItems.reduce((sum, item) => sum + Number(item.metadata?.estimatedCost || 0), 0)}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-slate-700">
                          ${budgetItems.reduce((sum, item) => sum + Number(item.metadata?.actualCost || 0), 0)}
                        </td>
                        <td className="px-4 py-3"></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 border border-dashed border-slate-300 rounded-md bg-slate-50">
                <h3 className="mt-2 text-sm font-semibold text-slate-700">No budget items yet</h3>
                <p className="mt-1 text-sm text-slate-500">Add expenses to track your budget.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
