import React, { useState } from 'react';
import styles from './planningDashboard.module.css';

const PlanningDashboard = () => {
  const [activeTab, setActiveTab] = useState('timeline');
  
  // Example occasion data - would typically be fetched from an API
  const occasionData = {
    id: "wedding-destination-123",
    title: "Destination Wedding",
    location: "Santorini, Greece",
    date: "June 15, 2026",
    description: "Our dream destination wedding in the beautiful islands of Greece",
    image: "/images/planning/planning-dashboard.jpg",
    progress: 65, // percentage complete
  };
  
  // Timeline items - would be fetched from an API in a real app
  const timelineItems = [
    {
      id: 1,
      date: "2025-06-15",
      title: "Save the Dates",
      description: "Send out save the dates to guests",
      complete: true,
      emotion: "excitement"
    },
    {
      id: 2,
      date: "2025-07-20",
      title: "Book Venue",
      description: "Reserve ceremony and reception venues",
      complete: true,
      emotion: "accomplishment"
    },
    {
      id: 3,
      date: "2025-09-10",
      title: "Formal Invitations",
      description: "Design and send formal invitations",
      complete: false,
      emotion: "anticipation"
    },
    {
      id: 4,
      date: "2025-11-05",
      title: "Menu Tasting",
      description: "Select menu options for the reception",
      complete: false,
      emotion: "joy"
    }
  ];
  
  // Budget data - would be fetched from an API in a real app
  const budgetData = {
    total: 25000,
    spent: 16250,
    remaining: 8750,
    categories: [
      { name: "Venue", allocated: 10000, spent: 9500, remaining: 500 },
      { name: "Catering", allocated: 6000, spent: 2000, remaining: 4000 },
      { name: "Travel", allocated: 5000, spent: 3750, remaining: 1250 },
      { name: "Photography", allocated: 4000, spent: 1000, remaining: 3000 }
    ]
  };
  
  // Checklist data - would be fetched from an API
  const checklistItems = [
    { id: 1, text: "Book venue", complete: true },
    { id: 2, text: "Reserve accommodations", complete: true },
    { id: 3, text: "Arrange transportation", complete: false },
    { id: 4, text: "Hire photographer", complete: false },
    { id: 5, text: "Book caterer", complete: true },
    { id: 6, text: "Order wedding cake", complete: false },
    { id: 7, text: "Purchase wedding attire", complete: false }
  ];
  
  // Collaborators
  const collaborators = [
    { id: 1, name: "Alex Johnson", role: "Partner", avatar: "/images/avatars/alex.jpg" },
    { id: 2, name: "Sophia Chen", role: "Maid of Honor", avatar: "/images/avatars/sophia.jpg" },
    { id: 3, name: "Daniel Smith", role: "Best Man", avatar: "/images/avatars/daniel.jpg" }
  ];
  
  // Calculate percentages for budget visualization
  const spentPercentage = (budgetData.spent / budgetData.total) * 100;
  const remainingPercentage = 100 - spentPercentage;
  
  return (
    <div className={styles.dashboardContainer}>
      {/* Dashboard Header */}
      <div className={styles.dashboardHeader} style={{backgroundImage: `url(${occasionData.image})`}}>
        <div className={styles.headerOverlay}>
          <div className={styles.occasionDetails}>
            <h1 className={styles.occasionTitle}>{occasionData.title}</h1>
            <div className={styles.occasionMeta}>
              <span className={styles.occasionLocation}>{occasionData.location}</span>
              <span className={styles.occasionDate}>{occasionData.date}</span>
            </div>
            <p className={styles.occasionDescription}>{occasionData.description}</p>
          </div>
          
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{width: `${occasionData.progress}%`}}
              ></div>
            </div>
            <span className={styles.progressText}>{occasionData.progress}% Complete</span>
          </div>
        </div>
      </div>
      
      {/* Dashboard Navigation */}
      <div className={styles.dashboardNavigation}>
        <button 
          className={`${styles.navButton} ${activeTab === 'timeline' ? styles.active : ''}`}
          onClick={() => setActiveTab('timeline')}
        >
          Timeline
        </button>
        <button 
          className={`${styles.navButton} ${activeTab === 'budget' ? styles.active : ''}`}
          onClick={() => setActiveTab('budget')}
        >
          Budget
        </button>
        <button 
          className={`${styles.navButton} ${activeTab === 'checklist' ? styles.active : ''}`}
          onClick={() => setActiveTab('checklist')}
        >
          Checklist
        </button>
        <button 
          className={`${styles.navButton} ${activeTab === 'team' ? styles.active : ''}`}
          onClick={() => setActiveTab('team')}
        >
          Team
        </button>
      </div>
      
      {/* Dashboard Content */}
      <div className={styles.dashboardContent}>
        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <div className={styles.timelineContainer}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Your Journey Timeline</h2>
              <button className={styles.addButton}>+ Add Milestone</button>
            </div>
            
            <div className={styles.timeline}>
              {timelineItems.map((item) => (
                <div key={item.id} className={`${styles.timelineItem} ${item.complete ? styles.completed : ''}`}>
                  <div className={styles.timelineMarker}></div>
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineHeader}>
                      <h3 className={styles.timelineTitle}>{item.title}</h3>
                      <span className={styles.timelineDate}>{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <p className={styles.timelineDescription}>{item.description}</p>
                    {item.emotion && (
                      <div className={styles.emotionTag} data-emotion={item.emotion}>
                        {item.emotion}
                      </div>
                    )}
                    {item.complete ? (
                      <span className={styles.completeBadge}>Complete</span>
                    ) : (
                      <button className={styles.completeButton}>Mark Complete</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Budget Tab */}
        {activeTab === 'budget' && (
          <div className={styles.budgetContainer}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Budget Overview</h2>
              <button className={styles.addButton}>+ Add Expense</button>
            </div>
            
            <div className={styles.budgetSummary}>
              <div className={styles.budgetCard}>
                <h3 className={styles.budgetCardTitle}>Total Budget</h3>
                <span className={styles.budgetAmount}>${budgetData.total.toLocaleString()}</span>
              </div>
              <div className={styles.budgetCard}>
                <h3 className={styles.budgetCardTitle}>Spent</h3>
                <span className={styles.budgetAmountSpent}>${budgetData.spent.toLocaleString()}</span>
              </div>
              <div className={styles.budgetCard}>
                <h3 className={styles.budgetCardTitle}>Remaining</h3>
                <span className={styles.budgetAmountRemaining}>${budgetData.remaining.toLocaleString()}</span>
              </div>
            </div>
            
            <div className={styles.budgetVisualization}>
              <div className={styles.budgetProgressBar}>
                <div 
                  className={styles.budgetProgressSpent}
                  style={{width: `${spentPercentage}%`}}
                ></div>
                <div 
                  className={styles.budgetProgressRemaining}
                  style={{width: `${remainingPercentage}%`}}
                ></div>
              </div>
              <div className={styles.budgetProgressLegend}>
                <div className={styles.legendItem}>
                  <span className={styles.legendColorSpent}></span>
                  <span>Spent (${budgetData.spent.toLocaleString()})</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendColorRemaining}></span>
                  <span>Remaining (${budgetData.remaining.toLocaleString()})</span>
                </div>
              </div>
            </div>
            
            <div className={styles.budgetCategories}>
              <h3 className={styles.subSectionTitle}>Budget Categories</h3>
              <table className={styles.budgetTable}>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Allocated</th>
                    <th>Spent</th>
                    <th>Remaining</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {budgetData.categories.map((category, index) => (
                    <tr key={index}>
                      <td>{category.name}</td>
                      <td>${category.allocated.toLocaleString()}</td>
                      <td>${category.spent.toLocaleString()}</td>
                      <td>${category.remaining.toLocaleString()}</td>
                      <td>
                        <div className={styles.categoryProgressBar}>
                          <div 
                            className={styles.categoryProgress}
                            style={{width: `${(category.spent / category.allocated) * 100}%`}}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Checklist Tab */}
        {activeTab === 'checklist' && (
          <div className={styles.checklistContainer}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Planning Checklist</h2>
              <button className={styles.addButton}>+ Add Task</button>
            </div>
            
            <div className={styles.checklistProgress}>
              <div className={styles.checklistProgressBar}>
                <div 
                  className={styles.checklistProgressFill}
                  style={{
                    width: `${(checklistItems.filter(item => item.complete).length / checklistItems.length) * 100}%`
                  }}
                ></div>
              </div>
              <span className={styles.checklistProgressText}>
                {checklistItems.filter(item => item.complete).length} of {checklistItems.length} tasks completed
              </span>
            </div>
            
            <ul className={styles.checklist}>
              {checklistItems.map(item => (
                <li key={item.id} className={styles.checklistItem}>
                  <label className={styles.checklistLabel}>
                    <input 
                      type="checkbox" 
                      checked={item.complete}
                      className={styles.checklistCheckbox}
                      readOnly
                    />
                    <span className={styles.checklistText}>{item.text}</span>
                  </label>
                  <button className={styles.itemMenuButton}>•••</button>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className={styles.teamContainer}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Planning Team</h2>
              <button className={styles.addButton}>+ Add Member</button>
            </div>
            
            <div className={styles.collaborators}>
              {collaborators.map(collaborator => (
                <div key={collaborator.id} className={styles.collaboratorCard}>
                  <div className={styles.avatarContainer}>
                    <div className={styles.avatar}>
                      {/* This would be an actual image in production */}
                      {collaborator.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <h3 className={styles.collaboratorName}>{collaborator.name}</h3>
                  <p className={styles.collaboratorRole}>{collaborator.role}</p>
                  <button className={styles.messageButton}>Message</button>
                </div>
              ))}
            </div>
            
            <div className={styles.activityFeed}>
              <h3 className={styles.subSectionTitle}>Recent Activity</h3>
              <div className={styles.activityItem}>
                <div className={styles.activityAvatar}>
                  <div className={styles.miniAvatar}>SC</div>
                </div>
                <div className={styles.activityContent}>
                  <p className={styles.activityText}>
                    <span className={styles.activityUser}>Sophia Chen</span> added a new vendor to the list
                  </p>
                  <span className={styles.activityTime}>2 hours ago</span>
                </div>
              </div>
              <div className={styles.activityItem}>
                <div className={styles.activityAvatar}>
                  <div className={styles.miniAvatar}>DS</div>
                </div>
                <div className={styles.activityContent}>
                  <p className={styles.activityText}>
                    <span className={styles.activityUser}>Daniel Smith</span> marked "Book venue" as complete
                  </p>
                  <span className={styles.activityTime}>Yesterday</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Celebration Milestone */}
      <div className={styles.celebrationMilestone}>
        <div className={styles.celebrationIcon}>🎉</div>
        <div className={styles.celebrationContent}>
          <h3 className={styles.celebrationTitle}>Milestone Achieved!</h3>
          <p className={styles.celebrationText}>
            You have booked your dream venue! Take a moment to celebrate this significant step.
          </p>
        </div>
        <button className={styles.celebrationButton}>
          Capture Moment
        </button>
      </div>
    </div>
  );
};

export default PlanningDashboard;
