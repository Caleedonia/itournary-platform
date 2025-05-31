'use client';

import React from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import ItineraryCreator from '../../components/Itinerary/ItineraryCreator';

export default function CreateItinerary() {
  return (
    <MainLayout>
      <div style={{ padding: '2rem 0' }}>
        <ItineraryCreator />
      </div>
    </MainLayout>
  );
}
