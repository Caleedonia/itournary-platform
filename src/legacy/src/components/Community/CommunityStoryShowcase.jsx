import React from 'react';
import styles from './communityStoryShowcase.module.css';

const CommunityStoryShowcase = () => {
  // Featured story data - in a real app, this would come from an API
  const featuredStory = {
    id: 'story-125',
    title: 'Our Magical Santorini Wedding',
    author: 'Emma & James Thompson',
    date: 'May 15, 2024',
    location: 'Santorini, Greece',
    occasionType: 'Destination Wedding',
    coverImage: '/images/community/story-showcase.jpg',
    emotionalMoments: [
      {
        title: 'The Breathtaking First Look',
        description: 'The moment James turned around to see Emma in her wedding dress against the backdrop of the Aegean Sea.',
        emotion: 'Awe'
      },
      {
        title: 'Sunset Vows Exchange',
        description: 'Exchanging our personalized vows as the sun set over the caldera created a magical moment we will never forget.',
        emotion: 'Love'
      },
      {
        title: 'Dancing Under the Stars',
        description: 'Our first dance under the stars with our closest friends and family around us felt like a dream.',
        emotion: 'Joy'
      }
    ],
    planning: {
      timeframe: '14 months',
      challenges: 'Coordinating vendors from overseas',
      highlights: 'Working with local planners who understood Greek wedding traditions'
    }
  };
  
  // More community stories
  const moreStories = [
    {
      id: 'story-123',
      title: 'Family Reunion in Costa Rica',
      author: 'The Williams Family',
      date: 'March 8, 2024',
      occasionType: 'Family Reunion',
      image: '/images/stories/family-reunion.jpg'
    },
    {
      id: 'story-124',
      title: '30th Birthday Safari Adventure',
      author: 'Michael Chen',
      date: 'April 22, 2024',
      occasionType: 'Milestone Birthday',
      image: '/images/stories/birthday.jpg'
    },
    {
      id: 'story-126',
      title: '25th Anniversary in Paris',
      author: 'Robert & Lisa Johnson',
      date: 'June 5, 2024',
      occasionType: 'Anniversary',
      image: '/images/stories/anniversary.jpg'
    }
  ];
  
  return (
    <div className={styles.showcaseContainer}>
      {/* Featured Story Header */}
      <div 
        className={styles.featuredStoryHeader} 
        style={{backgroundImage: `url(${featuredStory.coverImage})`}}
      >
        <div className={styles.headerOverlay}>
          <div className={styles.storyMeta}>
            <span className={styles.occasionType}>{featuredStory.occasionType}</span>
            <span className={styles.storyLocation}>{featuredStory.location}</span>
          </div>
          <h1 className={styles.storyTitle}>{featuredStory.title}</h1>
          <div className={styles.authorInfo}>
            <span className={styles.authorName}>By {featuredStory.author}</span>
            <span className={styles.storyDate}>{featuredStory.date}</span>
          </div>
        </div>
      </div>
      
      {/* Story Introduction */}
      <div className={styles.storyIntroduction}>
        <p className={styles.introText}>
          After getting engaged during a trip to Italy, we knew we wanted a destination wedding that would be an unforgettable experience for both us and our guests. We chose Santorini for its breathtaking views, intimate atmosphere, and the perfect blend of tradition and luxury.
        </p>
        <div className={styles.emotionHighlight}>
          <div className={styles.emotionIcon}>✨</div>
          <p className={styles.emotionText}>
            "The moment we arrived in Santorini, we knew this magical place would forever hold a special place in our hearts."
          </p>
        </div>
      </div>
      
      {/* Emotional Moments Section */}
      <div className={styles.emotionalMomentsSection}>
        <h2 className={styles.sectionTitle}>Emotional Highlights</h2>
        <div className={styles.momentsGrid}>
          {featuredStory.emotionalMoments.map((moment, index) => (
            <div key={index} className={styles.momentCard}>
              <div className={styles.emotionBadge}>{moment.emotion}</div>
              <h3 className={styles.momentTitle}>{moment.title}</h3>
              <p className={styles.momentDescription}>{moment.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Planning Insights */}
      <div className={styles.planningInsights}>
        <h2 className={styles.sectionTitle}>Planning Journey</h2>
        <div className={styles.insightsGrid}>
          <div className={styles.insightCard}>
            <h3 className={styles.insightTitle}>Planning Timeframe</h3>
            <p className={styles.insightValue}>{featuredStory.planning.timeframe}</p>
          </div>
          <div className={styles.insightCard}>
            <h3 className={styles.insightTitle}>Biggest Challenge</h3>
            <p className={styles.insightValue}>{featuredStory.planning.challenges}</p>
          </div>
          <div className={styles.insightCard}>
            <h3 className={styles.insightTitle}>Planning Highlight</h3>
            <p className={styles.insightValue}>{featuredStory.planning.highlights}</p>
          </div>
        </div>
        <div className={styles.planningTips}>
          <h3 className={styles.tipsTitle}>Tips for Future Couples</h3>
          <ul className={styles.tipsList}>
            <li className={styles.tipItem}>
              Start planning at least a year in advance for destination weddings
            </li>
            <li className={styles.tipItem}>
              Work with local planners who understand the culture and have established vendor relationships
            </li>
            <li className={styles.tipItem}>
              Consider your guests' travel experience when making decisions
            </li>
            <li className={styles.tipItem}>
              Build in buffer days for unexpected weather or travel delays
            </li>
          </ul>
        </div>
      </div>
      
      {/* Engagement Section */}
      <div className={styles.engagementSection}>
        <div className={styles.questionSection}>
          <h2 className={styles.sectionTitle}>Join the Conversation</h2>
          <p className={styles.questionText}>
            Planning a destination wedding? Ask Emma & James any questions about their experience.
          </p>
          <div className={styles.questionForm}>
            <textarea 
              className={styles.questionInput}
              placeholder="Ask a question about their experience..."
            ></textarea>
            <button className={styles.submitButton}>Submit Question</button>
          </div>
        </div>
        
        <div className={styles.reactionSection}>
          <h3 className={styles.reactionTitle}>How did this story make you feel?</h3>
          <div className={styles.reactionGrid}>
            <button className={styles.reactionButton}>Inspired</button>
            <button className={styles.reactionButton}>Excited</button>
            <button className={styles.reactionButton}>Informed</button>
            <button className={styles.reactionButton}>Motivated</button>
          </div>
        </div>
      </div>
      
      {/* More Stories Section */}
      <div className={styles.moreStoriesSection}>
        <h2 className={styles.sectionTitle}>More Community Stories</h2>
        <div className={styles.storiesGrid}>
          {moreStories.map(story => (
            <div key={story.id} className={styles.storyCard}>
              <div className={styles.storyCardImageContainer}>
                <div className={styles.storyCardImagePlaceholder}>
                  {/* This would be a real image in production */}
                  {story.occasionType}
                </div>
              </div>
              <div className={styles.storyCardContent}>
                <span className={styles.storyCardOccasion}>{story.occasionType}</span>
                <h3 className={styles.storyCardTitle}>{story.title}</h3>
                <div className={styles.storyCardMeta}>
                  <span className={styles.storyCardAuthor}>{story.author}</span>
                  <span className={styles.storyCardDate}>{story.date}</span>
                </div>
                <button className={styles.readMoreButton}>Read Story</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Call to Action */}
      <div className={styles.shareStorySection}>
        <div className={styles.shareStoryContent}>
          <h2 className={styles.shareStoryTitle}>Share Your Story</h2>
          <p className={styles.shareStoryText}>
            Had a meaningful travel experience? Share your journey with our community and inspire others.
          </p>
          <button className={styles.shareStoryButton}>
            Share Your Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityStoryShowcase;
