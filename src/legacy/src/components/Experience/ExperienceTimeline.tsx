// src/components/Experience/ExperienceTimeline.tsx
"use client";

import React from "react";
import { IExperienceItem } from "@/models/Experience";

interface ExperienceTimelineProps {
  items: IExperienceItem[];
  onUpdateItem: (updatedItem: Partial<IExperienceItem> & { _id: string }) => void; // For future editing
  onRemoveItem: (itemId: string) => void; // For future removal
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ items, onUpdateItem, onRemoveItem }) => {
  // Filter items that have a date and sort them
  const datedItems = items
    .filter(item => item.date)
    .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());

  if (datedItems.length === 0) {
    return <p className="text-slate-500">No dated items to display on the timeline yet. Add items with dates to see them here.</p>;
  }

  // Group items by date
  const groupedByDate: { [key: string]: IExperienceItem[] } = datedItems.reduce((acc, item) => {
    const itemDate = new Date(item.date!).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    if (!acc[itemDate]) {
      acc[itemDate] = [];
    }
    acc[itemDate].push(item);
    // Sort items within the same day by start time if available
    acc[itemDate].sort((a, b) => {
        if (a.startTime && b.startTime) {
            return a.startTime.localeCompare(b.startTime);
        }
        return 0;
    });
    return acc;
  }, {} as { [key: string]: IExperienceItem[] });

  return (
    <div className="space-y-8">
      {Object.entries(groupedByDate).map(([dateStr, dayItems]) => (
        <div key={dateStr}>
          <h3 className="text-xl font-semibold text-ocean-blue-600 mb-3 pb-2 border-b border-slate-300">
            {dateStr}
          </h3>
          <div className="space-y-4">
            {dayItems.map((item) => (
              <div key={(item as any)._id || item.itemId || item.name} className="p-4 border border-slate-200 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-semibold text-slate-800 text-lg">{item.name}</p>
                        {item.itemType && <span className="text-xs bg-coral-100 text-coral-700 px-2 py-0.5 rounded-full font-medium">{item.itemType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>}
                    </div>
                    {/* Placeholder for future actions like edit/delete specific to timeline item */}
                    {/* <button onClick={() => onRemoveItem((item as any)._id)} className="text-red-400 hover:text-red-600 text-xs">Remove</button> */}
                </div>
                {item.startTime && (
                  <p className="text-sm text-slate-600 mt-1">
                    Time: {item.startTime} {item.endTime ? `- ${item.endTime}` : ""}
                  </p>
                )}
                {item.description && <p className="text-sm text-slate-500 mt-1 whitespace-pre-wrap">{item.description}</p>}
                {item.notes && <p className="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-200">Notes: {item.notes}</p>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceTimeline;

