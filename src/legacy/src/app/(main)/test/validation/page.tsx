"use client";

import React from 'react';
import UIValidationSuite from '@/components/Testing/UIValidationSuite';

export default function UIValidationPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Modern UI Validation</h1>
      <UIValidationSuite />
    </div>
  );
}
