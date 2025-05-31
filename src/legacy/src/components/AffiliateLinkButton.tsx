"use client";

import React from "react";

interface AffiliateLinkButtonProps {
  providerName: string;
  url: string;
  resortId: string;
  resortName: string;
}

const trackAffiliateClick = async (providerName: string, url: string, resortId: string, resortName: string) => {
  console.log(`Affiliate link clicked: Provider: ${providerName}, URL: ${url}, Resort ID: ${resortId}, Resort Name: ${resortName}`);
  // Send this event to your analytics backend
  try {
    await fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "affiliate_click", // Use a consistent event name
        eventParams: {
            provider: providerName,
            target_url: url, // Use a clear parameter name
            resort_id: resortId,
            resort_name: resortName,
        },
        // userId: session?.user?.id, // If you want to associate with a logged-in user
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error("Failed to track affiliate click:", error);
  }
};

export default function AffiliateLinkButton({ providerName, url, resortId, resortName }: AffiliateLinkButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // It's good practice to allow default navigation unless there's a specific reason to prevent it.
    // If the API call is quick, it might complete before navigation.
    // If it's slow or critical, you might consider e.preventDefault() and then window.open(url, "_blank") after await, 
    // but this can be blocked by popup blockers if not handled carefully.
    trackAffiliateClick(providerName, url, resortId, resortName);
  };

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      onClick={handleClick} // Track click before navigation
      className="block text-center bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors mt-2 w-full"
    >
      Book with {providerName}
    </a>
  );
}

