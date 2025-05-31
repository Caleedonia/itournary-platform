I see the npm install is complete but there are some deprecated dependencies and a critical vulnerability warning. Let's continue with the implementation and we can address the vulnerability later if needed.

Let's complete the GuestExperience component since it was cut off:

```
notepad src\components\Wedding\GuestExperience.tsx
```

<button onclick="navigator.clipboard.writeText('notepad src\\components\\Wedding\\GuestExperience.tsx')">Copy</button>

Create the GuestExperience component with this code:

```jsx
"use client";

import React, { useState, useEffect } from 'react';

interface Guest {
  id: string;
  weddingId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  group?: string;
  rsvpStatus: 'pending' | 'confirmed' | 'declined';
  plusOne: boolean;
  plusOneName?: string;
  dietaryRestrictions?: string;
  notes?: string;
}

interface Accommodation {
  id: string;
  name: string;
  type: string;
  location: string;
  description: string;
  priceRange: number;
  distance: number;
  amenities: string[];
  imageSrc: string;
  website?: string;
}

interface Transportation {
  id: string;
  type: string;
  name: string;
  description: string;
  price: number;
  imageSrc: string;
}

interface Activity {
  id: string;
  name: string;
  type: string;
  description: string;
  location: string;
  duration: number;
  price: number;
  imageSrc: string;
}

interface GuestExperienceProps {
  weddingId: string;
  venueId: string;
  venueLocation: string;
}

const GuestExperience: React.FC<GuestExperienceProps> = ({ weddingId, venueId, venueLocation }) => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [transportations, setTransportations] = useState<Transportation[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedAccommodations, setSelectedAccommodations] = useState<string[]>([]);
  const [selectedTransportations, setSelectedTransportations] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [activeTab, setActiveTab] = useState('guests');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [newGuest, setNewGuest] = useState<Omit<Guest, 'id' | 'weddingId'>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    group: '',
    rsvpStatus: 'pending',
    plusOne: false,
    plusOneName: '',
    dietaryRestrictions: '',
    notes: ''
  });
  
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [importText, setImportText] = useState('');

  useEffect(() => {
    const fetchGuestData = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, fetch from API
        // const guestResponse = await fetch(`/api/occasions/wedding/${weddingId}/guests`);
        // const guestData = await response.json();
        
        // Mock guest data
        const mockGuests: Guest[] = [
          {
            id: 'g1',
            weddingId: weddingId,
            firstName: 'John',
            lastName: 'Smith',
            email: 'john.smith@example.com',
            phone: '123-456-7890',
            group: 'Family',
            rsvpStatus: 'confirmed',
            plusOne: true,
            plusOneName: 'Jane Smith',
            dietaryRestrictions: 'Vegetarian'
          },
          {
            id: 'g2',
            weddingId: weddingId,
            firstName: 'Michael',
            lastName: 'Johnson',
            email: 'michael.j@example.com',
            phone: '987-654-3210',
            group: 'Friends',
            rsvpStatus: 'pending',
            plusOne: false
          },
          {
            id: 'g3',
            weddingId: weddingId,
            firstName: 'Sarah',
            lastName: 'Williams',
            email: 'sarah.w@example.com',
            group: 'Work',
            rsvpStatus: 'declined',
            plusOne: false
          },
          {
            id: 'g4',
            weddingId: weddingId,
            firstName: 'Robert',
            lastName: 'Davis',
            email: 'robert.d@example.com',
            phone: '555-123-4567',
            group: 'Family',
            rsvpStatus: 'confirmed',
            plusOne: true,
            plusOneName: 'Mary Davis',
            dietaryRestrictions: 'Gluten-free',
            notes: 'Arriving one day early'
          }
        ];
        
        setGuests(mockGuests);
        
        // Fetch accommodations
        // const accommResponse = await fetch(`/api/venues/${venueId}/accommodations`);
        // const accommData = await accommResponse.json();
        
        // Mock accommodation data
        const mockAccommodations: Accommodation[] = [
          {
            id: 'a1',
            name: 'Paradise Resort & Spa',
            type: 'Resort',
            location: venueLocation,
            description: 'Luxurious beachfront resort with full amenities, spa services, and multiple restaurants.',
            priceRange: 4,
            distance: 0.1,
            amenities: ['Pool', 'Spa', 'Restaurant', 'Bar', 'Fitness Center', 'Room Service'],
            imageSrc: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
            website: 'https://example.com/paradise'
          },
          {
            id: 'a2',
            name: 'Ocean View Hotel',
            type: 'Hotel',
            location: venueLocation,
            description: 'Modern hotel with beautiful ocean views, comfortable rooms, and excellent service.',
            priceRange: 3,
            distance: 1.5,
            amenities: ['Pool', 'Restaurant', 'Bar', 'Business Center', 'Free Breakfast'],
            imageSrc: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
            website: 'https://example.com/oceanview'
          },
          {
            id: 'a3',
            name: 'Coastal Villas',
            type: 'Vacation Rental',
            location: venueLocation,
            description: 'Private villas with kitchen facilities, perfect for families or groups wanting to stay together.',
            priceRange: 3,
            distance: 2.3,
            amenities: ['Kitchen', 'Private Pool', 'Washer/Dryer', 'Parking'],
            imageSrc: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80'
          },
          {
            id: 'a4',
            name: 'Seaside Inn',
            type: 'Inn',
            location: venueLocation,
            description: 'Charming, affordable inn with comfortable rooms and a friendly atmosphere.',
            priceRange: 2,
            distance: 3.0,
            amenities: ['Free Breakfast', 'Free WiFi', 'Parking'],
            imageSrc: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80'
          }
        ];
        
        setAccommodations(mockAccommodations);
        
        // Fetch transportation options
        // const transResponse = await fetch(`/api/venues/${venueId}/transportation`);
        // const transData = await transResponse.json();
        
        // Mock transportation data
        const mockTransportation: Transportation[] = [
          {
            id: 't1',
            type: 'Shuttle',
            name: 'Wedding Guest Shuttle Service',
            description: 'Complimentary shuttle service between recommended hotels and the venue on the wedding day.',
            price: 0,
            imageSrc: 'https://images.unsplash.com/photo-1608549606796-55977a9ff0d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80'
          },
          {
            id: 't2',
            type: 'Limo',
            name: 'Luxury Limousine Service',
            description: 'Special rates for wedding guests who want to arrive in style. Available for airport pickups or venue transportation.',
            price: 150,
            imageSrc: 'https://images.unsplash.com/photo-1621545812433-b6ef31156f9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80'
          },
          {
            id: 't3',
            type: 'Rental',
            name: 'Discount Car Rentals',
            description: 'Special wedding rates with our partner car rental service. Convenient pickup and dropoff.',
            price: 75,
            imageSrc: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80'
          }
        ];
        
        setTransportations(mockTransportation);
        
        // Fetch activity options
        // const activityResponse = await fetch(`/api/venues/${venueId}/activities`);
        // const activityData = await activityResponse.json();
        
        // Mock activity data
        const mockActivities: Activity[] = [
          {
            id: 'act1',
            name: 'Beach Day',
            type: 'Leisure',
            description: 'Join us for a relaxing day at the beach with games, refreshments, and fun.',
            location: 'Resort Beach',
            duration: 4,
            price: 0,
            imageSrc: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80'
          },
          {
            id: 'act2',
            name: 'Snorkeling Excursion',
            type: 'Adventure',
            description: 'Guided snorkeling tour of beautiful coral reefs with equipment provided.',
            location: 'Paradise Cove',
            duration: 3,
            price: 75,
            imageSrc: 'https://images.unsplash.com/photo-1613100274595-e836efc7a581?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80'
          },
          {
            id: 'act3',
            name: 'Welcome Dinner',
            type: 'Dining',
            description: 'Casual welcome dinner for all guests arriving before the wedding.',
            location: 'Sunset Restaurant',
            duration: 2,
            price: 45,
            imageSrc: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80'
          },
          {
            id: 'act4',
            name: 'Golf Tournament',
            type: 'Sport',
            description: 'Friendly golf tournament at the championship course.',
            location: 'Seaside Golf Club',
            duration: 5,
            price: 120,
            imageSrc: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80'
          }
        ];
        
        setActivities(mockActivities);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load guest experience data');
        setIsLoading(false);
        console.error(err);
      }
    };
    
    fetchGuestData();
  }, [weddingId, venueId, venueLocation]);

  const addGuest = async () => {
    try {
      // In a real implementation, send to API
      // const response = await fetch(`/api/occasions/wedding/${weddingId}/guests`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(newGuest)
      // });
      // const data = await response.json();
      
      // Mock response
      const mockResponse = {
        id: `g${Date.now()}`,
        weddingId,
        ...newGuest
      };
      
      setGuests([...guests, mockResponse]);
      setShowGuestModal(false);
      setNewGuest({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        group: '',
        rsvpStatus: 'pending',
        plusOne: false,
        plusOneName: '',
        dietaryRestrictions: '',
        notes: ''
      });
    } catch (err) {
      console.error(err);
      alert('Failed to add guest');
    }
  };

  const updateGuest = async () => {
    if (!editingGuest) return;
    
    try {
      // In a real implementation, send to API
      // await fetch(`/api/occasions/wedding/${weddingId}/guests/${editingGuest.id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(editingGuest)
      // });
      
      // Update local state
      setGuests(guests.map(guest => 
        guest.id === editingGuest.id ? editingGuest : guest
      ));
      
      setEditingGuest(null);
    } catch (err) {
      console.error(err);
      alert('Failed to update guest');
    }
  };

  const deleteGuest = async (guestId: string) => {
    if (!confirm('Are you sure you want to remove this guest?')) return;
    
    try {
      // In a real implementation, delete via API
      // await fetch(`/api/occasions/wedding/${weddingId}/guests/${guestId}`, {
      //   method: 'DELETE'
      // });
      
      setGuests(guests.filter(guest => guest.id !== guestId));
    } catch (err) {
      console.error(err);
      alert('Failed to delete guest');
    }
  };

  const importGuests = () => {
    // Simple CSV parsing (in a real app would be more robust)
    const lines = importText.split('\n').filter(line => line.trim());
    if (lines.length === 0) return;
    
    const newGuests = lines.map(line => {
      const [firstName, lastName, email, phone, group] = line.split(',').map(item => item.trim());
      return {
        id: `g${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        weddingId,
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        phone: phone || '',
        group: group || '',
        rsvpStatus: 'pending',
        plusOne: false
      };
    });
    
    setGuests([...guests, ...newGuests]);
    setShowImportModal(false);
    setImportText('');
  };

  const toggleSelection = (id: string, type: 'accommodation' | 'transportation' | 'activity') => {
    if (type === 'accommodation') {
      if (selectedAccommodations.includes(id)) {
        setSelectedAccommodations(selectedAccommodations.filter(i => i !== id));
      } else {
        setSelectedAccommodations([...selectedAccommodations, id]);
      }
    } else if (type === 'transportation') {
      if (selectedTransportations.includes(id)) {
        setSelectedTransportations(selectedTransportations.filter(i => i !== id));
      } else {
        setSelectedTransportations([...selectedTransportations, id]);
      }
    } else {
      if (selectedActivities.includes(id)) {
        setSelectedActivities(selectedActivities.filter(i => i !== id));
      } else {
        setSelectedActivities([...selectedActivities, id]);
      }
    }
  };

  // Format price range to dollar signs
  const formatPriceRange = (range: number) => {
    return ''.padStart(range, '$');
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading guest experience data...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Guest Experience</h1>
        <p className="text-gray-600">Manage your guest list and plan their experience</p>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex -mb-px space-x-8">
          <button
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'guests'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('guests')}
          >
            Guest List
          </button>
          <button
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'accommodations'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('accommodations')}
          >
            Accommodations
          </button>
          <button
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'transportation'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('transportation')}
          >
            Transportation
          </button>
          <button
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'activities'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('activities')}
          >
            Activities
          </button>
        </nav>
      </div>
      
      {/* Guest List Tab */}
      {activeTab === 'guests' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Guest List</h2>
              <p className="text-gray-600">
                {guests.length} total • {guests.filter(g => g.rsvpStatus === 'confirmed').length} confirmed • {guests.filter(g => g.rsvpStatus === 'declined').length} declined • {guests.filter(g => g.rsvpStatus === 'pending').length} pending
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button 
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50"
                onClick={() => setShowImportModal(true)}
              >
                Import Guests
              </button>
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={() => setShowGuestModal(true)}
              >
                Add Guest
              </button>
            </div>
          </div>
          
          {guests.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-2">No guests added yet</h3>
              <p className="text-gray-500 mb-4">Add your first guest to start building your guest list</p>
              <div className="flex justify-center space-x-3">
                <button 
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50"
                  onClick={() => setShowImportModal(true)}
                >
                  Import Guests
                </button>
                <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  onClick={() => setShowGuestModal(true)}
                >
                  Add Guest
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RSVP Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plus One</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dietary</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {guests.map(guest => (
                    <tr key={guest.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {guest.firstName} {guest.lastName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{guest.email}</div>
                        {guest.phone && (
                          <div className="text-sm text-gray-500">{guest.phone}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{guest.group || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          guest.rsvpStatus === 'confirmed' ? 'bg-green-100 text-green-800' :
                          guest.rsvpStatus === 'declined' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {guest.rsvpStatus.charAt(0).toUpperCase() + guest.rsvpStatus.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {guest.plusOne ? (guest.plusOneName || 'Yes') : 'No'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {guest.dietaryRestrictions || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          onClick={() => setEditingGuest(guest)}
                        >
                          Edit
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => deleteGuest(guest.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      
      {/* Accommodations Tab */}
      {activeTab === 'accommodations' && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Recommended Accommodations</h2>
            <p className="text-gray-600">Select accommodations to recommend to your guests</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accommodations.map(accommodation => (
              <div 
                key={accommodation.id}
                className={`border rounded-lg overflow-hidden ${
                  selectedAccommodations.includes(accommodation.id) ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200'
                }`}
              >
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${accommodation.imageSrc})` }}></div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium">{accommodation.name}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {accommodation.type}
                    </span>
                  </div>
                  
                  <div className="text-gray-600 text-sm mb-2">
                    {accommodation.location} • {accommodation.distance} miles from venue
                  </div>
                  
                  <div className="text-gray-700 mb-3">{formatPriceRange(accommodation.priceRange)}</div>
                  
                  <p className="text-gray-600 mb-4">{accommodation.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {accommodation.amenities.map((amenity, index) => (
                      <span 
                        key={index} 
                        className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    {accommodation.website && (
                      <a 
                        href={accommodation.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Visit Website
                      </a>
                    )}
                    
                    <button 
                      className={`px-4 py-2 rounded-md text-sm ${
                        selectedAccommodations.includes(accommodation.id) 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                      onClick={() => toggleSelection(accommodation.id, 'accommodation')}
                    >
                      {selectedAccommodations.includes(accommodation.id) ? '