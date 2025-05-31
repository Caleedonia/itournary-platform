"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface WeddingOccasion {
  id: string;
  userId: string;
  type: 'destination' | 'local' | 'elopement';
  date: string;
  location: string;
  venue: {
    id: string;
    name: string;
    location: string;
  } | null;
  budget: {
    total: number;
    spent: number;
    remaining: number;
  };
  guestCount: {
    total: number;
    confirmed: number;
    declined: number;
    pending: number;
  };
  progress: {
    overall: number;
    byCategory: {
      [category: string]: number;
    };
    completedTasks: number;
    totalTasks: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface Task {
  id: string;
  weddingId: string;
  title: string;
  dueDate: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  notes?: string;
}

interface WeddingDashboardProps {
  weddingId: string;
}

const WeddingDashboard: React.FC<WeddingDashboardProps> = ({ weddingId }) => {
  const [wedding, setWedding] = useState<WeddingOccasion | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAskAIModal, setShowAskAIModal] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    const fetchWeddingData = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, fetch from API
        // const weddingResponse = await fetch(`/api/occasions/wedding/${weddingId}`);
        // const weddingData = await weddingResponse.json();
        
        // Mock wedding data
        const mockWeddingData: WeddingOccasion = {
          id: weddingId,
          userId: 'user123',
          type: 'destination',
          date: '2025-06-15',
          location: 'Miami Beach, FL',
          venue: {
            id: 'v1',
            name: 'Paradise Beach Resort',
            location: 'Miami Beach, FL'
          },
          budget: {
            total: 50000,
            spent: 15650,
            remaining: 34350
          },
          guestCount: {
            total: 120,
            confirmed: 45,
            declined: 8,
            pending: 67
          },
          progress: {
            overall: 35,
            byCategory: {
              'Venue': 100,
              'Guest List': 60,
              'Vendors': 40,
              'Timeline': 30,
              'Budget': 25,
              'Attire': 0
            },
            completedTasks: 14,
            totalTasks: 40
          },
          createdAt: '2024-02-15T12:00:00Z',
          updatedAt: '2024-05-10T15:30:00Z'
        };
        
        setWedding(mockWeddingData);
        
        // Fetch upcoming tasks
        // const tasksResponse = await fetch(`/api/occasions/wedding/${weddingId}/tasks?status=upcoming`);
        // const tasksData = await tasksResponse.json();
        
        // Mock tasks data
        const mockTasks: Task[] = [
          {
            id: 't1',
            weddingId: weddingId,
            title: 'Send Save-the-Dates',
            dueDate: '2024-06-15',
            category: 'Guest Management',
            priority: 'high',
            completed: false
          },
          {
            id: 't2',
            weddingId: weddingId,
            title: 'Book Photographer',
            dueDate: '2024-06-30',
            category: 'Vendors',
            priority: 'high',
            completed: false
          },
          {
            id: 't3',
            weddingId: weddingId,
            title: 'Select Wedding Party Attire',
            dueDate: '2024-07-15',
            category: 'Attire',
            priority: 'medium',
            completed: false
          },
          {
            id: 't4',
            weddingId: weddingId,
            title: 'Choose Wedding Cake Design',
            dueDate: '2024-08-01',
            category: 'Food & Beverage',
            priority: 'medium',
            completed: false
          },
          {
            id: 't5',
            weddingId: weddingId,
            title: 'Book Hair and Makeup Artist',
            dueDate: '2024-08-15',
            category: 'Vendors',
            priority: 'medium',
            completed: false
          }
        ];
        
        setTasks(mockTasks);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load wedding data');
        setIsLoading(false);
        console.error(err);
      }
    };
    
    fetchWeddingData();
  }, [weddingId]);

  const markTaskCompleted = async (taskId: string) => {
    try {
      // In a real implementation, update via API
      // await fetch(`/api/occasions/wedding/${weddingId}/tasks/${taskId}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ completed: true })
      // });
      
      // Update local state
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, completed: true } : task
      ));
      
      // Update progress
      if (wedding) {
        const updatedWedding = { ...wedding };
        updatedWedding.progress.completedTasks += 1;
        updatedWedding.progress.overall = Math.round((updatedWedding.progress.completedTasks / updatedWedding.progress.totalTasks) * 100);
        setWedding(updatedWedding);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update task');
    }
  };

  const askAI = async () => {
    if (!aiQuestion.trim()) return;
    
    setIsAiLoading(true);
    try {
      // In a real implementation, send to AI API
      // const response = await fetch('/api/chatbot/conversation', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ 
      //     weddingId,
      //     question: aiQuestion
      //   })
      // });
      // const data = await response.json();
      
      // Mock AI response based on question
      let mockResponse = '';
      
      if (aiQuestion.toLowerCase().includes('venue')) {
        mockResponse = "Based on your destination wedding in Miami Beach, I recommend finalizing your venue details at least 12 months before your wedding date. Since you've already selected Paradise Beach Resort, make sure to:  \n\n1. Confirm your ceremony and reception spaces\n2. Review and finalize the contract details\n3. Discuss decoration restrictions\n4. Schedule a tasting if you're using their catering services\n\nWould you like me to help you create a checklist specifically for venue preparation?";
      } else if (aiQuestion.toLowerCase().includes('budget')) {
        mockResponse = "I see you've allocated $50,000 for your wedding, with $15,650 spent so far. For a destination wedding in Miami with 120 guests, you're tracking well. Most couples allocate about 40-50% of their budget to the venue and catering, 10-15% for photography/videography, 8-10% for attire, and 8-10% for decor and flowers. Would you like me to suggest some areas where you might optimize your remaining budget?";
      } else if (aiQuestion.toLowerCase().includes('guest')) {
        mockResponse = "For your destination wedding with 120 invited guests, you currently have 45 confirmed, 8 declined, and 67 pending responses. For destination weddings, typically 70-80% of invited guests attend. Since your wedding is in June 2025, I recommend sending formal invitations 3-4 months before (February/March 2025), with save-the-dates already sent 10-12 months in advance. Would you like help creating a timeline for your guest communications?";
      } else {
        mockResponse = "Based on your June 2025 destination wedding at Paradise Beach Resort in Miami, here are my recommendations:\n\n1. Finalize your guest list and send save-the-dates soon (if not already done)\n2. Book your key vendors within the next month (photographer, DJ/band, florist)\n3. Start shopping for attire, as alterations may require multiple fittings\n4. Consider welcome bags for guests since this is a destination wedding\n\nYour planning is about 35% complete, which is good progress for a wedding that's about a year away. What specific aspect of planning would you like more guidance on?";
      }
      
      setTimeout(() => {
        setAiResponse(mockResponse);
        setIsAiLoading(false);
      }, 1500);
      
    } catch (err) {
      console.error(err);
      setAiResponse("I'm sorry, I encountered an error while processing your question. Please try again.");
      setIsAiLoading(false);
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate days until wedding
  const calculateDaysUntil = (date: string) => {
    const weddingDate = new Date(date);
    const today = new Date();
    const diffTime = weddingDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading wedding dashboard...</div>;
  }

  if (error || !wedding) {
    return <div className="p-8 text-center text-red-500">{error || 'Wedding not found'}</div>;
  }

  const daysUntilWedding = calculateDaysUntil(wedding.date);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Wedding Dashboard</h1>
          <p className="text-gray-600">
            {wedding.type.charAt(0).toUpperCase() + wedding.type.slice(1)} Wedding • {new Date(wedding.date).toLocaleDateString('en-US', { 
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
        </div>
        
        <button 
          className="mt-4 md:mt-0 flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={() => setShowAskAIModal(true)}
        >
          <span className="mr-2">💬</span> Ask Wedding AI
        </button>
      </div>
      
      {/* Wedding Countdown Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Your Big Day is Coming!</h2>
            <p className="text-lg">
              {daysUntilWedding > 0 
                ? `${daysUntilWedding} days until you say "I do" at ${wedding.venue?.name || 'your venue'}`
                : daysUntilWedding === 0
                  ? `Today is your wedding day! Congratulations!`
                  : `Your wedding was ${Math.abs(daysUntilWedding)} days ago. Congratulations!`
              }
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 text-center">
            <div className="text-4xl font-bold">{daysUntilWedding}</div>
            <div className="text-sm uppercase tracking-wider">Days to Go</div>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Budget Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Budget</h3>
              <div className="mt-1">
                <div className="text-2xl font-semibold">{formatCurrency(wedding.budget.total)}</div>
                <div className="text-sm text-gray-500">
                  {formatCurrency(wedding.budget.spent)} spent ({Math.round((wedding.budget.spent / wedding.budget.total) * 100)}%)
                </div>
              </div>
            </div>
            <div className="bg-green-100 p-2 rounded-md">
              <span className="text-green-700 text-xl">💰</span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500"
                style={{ width: `${Math.min((wedding.budget.spent / wedding.budget.total) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <Link href={`/wedding/${wedding.id}/budget`} className="mt-4 text-sm text-blue-600 font-medium flex items-center">
            Update Budget <span className="ml-1">→</span>
          </Link>
        </div>
        
        {/* Guest Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Guests</h3>
              <div className="mt-1">
                <div className="text-2xl font-semibold">{wedding.guestCount.total}</div>
                <div className="text-sm text-gray-500">
                  {wedding.guestCount.confirmed} confirmed, {wedding.guestCount.declined} declined
                </div>
              </div>
            </div>
            <div className="bg-blue-100 p-2 rounded-md">
              <span className="text-blue-700 text-xl">👥</span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500"
                style={{ width: `${((wedding.guestCount.confirmed + wedding.guestCount.declined) / wedding.guestCount.total) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <Link href={`/wedding/${wedding.id}/guests`} className="mt-4 text-sm text-blue-600 font-medium flex items-center">
            Manage Guest List <span className="ml-1">→</span>
          </Link>
        </div>
        
        {/* Planning Progress Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Planning Progress</h3>
              <div className="mt-1">
                <div className="text-2xl font-semibold">{wedding.progress.overall}%</div>
                <div className="text-sm text-gray-500">
                  {wedding.progress.completedTasks} of {wedding.progress.totalTasks} tasks completed
                </div>
              </div>
            </div>
            <div className="bg-purple-100 p-2 rounded-md">
              <span className="text-purple-700 text-xl">📋</span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-500"
                style={{ width: `${wedding.progress.overall}%` }}
              ></div>
            </div>
          </div>
          
          <Link href={`/wedding/${wedding.id}/tasks`} className="mt-4 text-sm text-blue-600 font-medium flex items-center">
            View All Tasks <span className="ml-1">→</span>
          </Link>
        </div>
        
        {/* Timeline Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Wedding Date</h3>
              <div className="mt-1">
                <div className="text-2xl font-semibold">
                  {new Date(wedding.date).toLocaleDateString('en-US', { 
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                <div className="text-sm text-gray-500">
                  {daysUntilWedding > 0 ? `${daysUntilWedding} days remaining` : 'Wedding day has passed'}
                </div>
              </div>
            </div>
            <div className="bg-red-100 p-2 rounded-md">
              <span className="text-red-700 text-xl">📅</span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500"
                style={{ width: '100%' }}
              ></div>
            </div>
          </div>
          
          <Link href={`/wedding/${wedding.id}/timeline`} className="mt-4 text-sm text-blue-600 font-medium flex items-center">
            View Timeline <span className="ml-1">→</span>
          </Link>
        </div>
      </div>
      
      {/* Quick Links and Upcoming Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Planning Categories */}
        <div className="bg-white rounded-lg shadow overflow-hidden lg:col-span-2">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Planning Categories</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Object.entries(wedding.progress.byCategory).map(([category, progress]) => (
                <div key={category} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{category}</h3>
                    <span className="text-sm">{progress}%</span>
                  </div>
                  
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        progress === 100 ? 'bg-green-500' :
                        progress >= 50 ? 'bg-blue-500' :
                        progress === 0 ? 'bg-gray-300' :
                        'bg-yellow-500'
                      }`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  
                  <Link href={`/wedding/${wedding.id}/${category.toLowerCase()}`} className="mt-3 text-sm text-blue-600 font-medium flex items-center">
                    {progress === 0 ? 'Start Planning' : progress === 100 ? 'View Details' : 'Continue Planning'} 
                    <span className="ml-1">→</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Upcoming Tasks */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Upcoming Tasks</h2>
          </div>
          
          {tasks.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">No upcoming tasks</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {tasks.map(task => (
                <li key={task.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-start">
                    <input 
                      type="checkbox" 
                      className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      checked={task.completed}
                      onChange={() => markTaskCompleted(task.id)}
                    />
                    
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between">
                        <p className={`text-sm font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                          {task.title}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">{task.category}</span>
                        <span className="text-xs text-gray-500">
                          Due: {new Date(task.dueDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <Link href={`/wedding/${wedding.id}/tasks`} className="text-sm text-blue-600 font-medium flex items-center justify-center">
              View All Tasks <span className="ml-1">→</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Ask AI Modal */}
      {showAskAIModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold">Wedding Planning Assistant</h2>
              <button 
                className="text-gray-500 hover:text-gray-800"
                onClick={() => {
                  setShowAskAIModal(false);
                  setAiQuestion('');
                  setAiResponse('');
                }}
              >
                ✕
              </button>
            </div>
            
            {!aiResponse ? (
              <div>
                <p className="mb-4 text-gray-600">
                  Ask me anything about your wedding planning! I can help with timelines, budgeting, guest management, and more.
                </p>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Your Question</label>
                  <textarea 
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    rows={3}
                    placeholder="E.g., When should I send save-the-dates for my destination wedding?"
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                    onClick={askAI}
                    disabled={!aiQuestion.trim() || isAiLoading}
                  >
                    {isAiLoading ? 'Processing...' : 'Get Answer'}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <div className="font-semibold mb-2">Your Question:</div>
                  <div className="bg-gray-50 p-3 rounded-lg">{aiQuestion}</div>
                </div>
                
                <div className="mb-6">
                  <div className="font-semibold mb-2">Answer:</div>
                  <div className="bg-blue-50 p-3 rounded-lg whitespace-pre-wrap">
                    {aiResponse}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button 
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50"
                    onClick={() => {
                      setAiQuestion('');
                      setAiResponse('');
                    }}
                  >
                    Ask Another Question
                  </button>
                  
                  <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    onClick={() => setShowAskAIModal(false)}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeddingDashboard;