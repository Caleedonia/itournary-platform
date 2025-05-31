"use client";

import React from 'react';
import LoyaltyIntegrationTest from '@/components/Loyalty/LoyaltyIntegrationTest';

export default function LoyaltyTestPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Loyalty Integration Test</h1>
      <p className="mb-8 text-gray-600">
        This page tests the integration of the loyalty program with various components of the iTournary platform.
      </p>
      
      <LoyaltyIntegrationTest />
    </div>
  );
}
