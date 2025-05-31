"use client";

import React, { useState, useEffect } from 'react';

interface TimelineEvent {
  id: string;
  weddingId: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  participants: string[];
  vendors: string[];
  notes?: string;
}

interface TimelineTemplate {
  id: string;
  name: string;
  events: Omit<TimelineEvent, 'id' | 'weddingId'>[];
}

interface WeddingTimelineProps {
  weddingId: string;
  date: string;
}

const WeddingTimeline: React.FC<WeddingTimelineProps> = ({ weddingId, date }) => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [templates, setTemplates] = useState<TimelineTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  
  const [newEvent, setNewEvent] = useState<Omit<TimelineEvent, 'id' | 'weddingId'>>({
    title: '',
    date: date,
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    participants: [],
    vendors: []
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimeline = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, fetch from API
        // const response = await fetch(`/api/occasions/wedding/${weddingId}/timeline`);
        // const data = await response.json();
        
        // Mock data
        const mockTimelineData: TimelineEvent[] = [
          {
            id: 'e1',
            weddingId: weddingId,
            title: 'Wedding Ceremony',
            date: date,
            startTime: '16:00',
            endTime: '17:00',
            location: '