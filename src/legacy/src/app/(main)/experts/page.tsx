"use client";

import ExpertProfile from "@/components/Expert/ExpertProfile";

export default function ExpertsPage() {
  // In a real app, you'd fetch the expert ID from the URL
  // For this example, we're using a default expert
  return <ExpertProfile expertId="expert-1" />;
}