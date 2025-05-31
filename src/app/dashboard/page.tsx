"use client";

import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [name] = useState("Traveler");
  
  // Simulated trips data
  const trips = [
    {
      id: "1",
      destination: "Paris, France",
      startDate: "2023-12-15",
      endDate: "2023-12-22",
      status: "Upcoming"
    },
    {
      id: "2",
      destination: "Tokyo, Japan",
      startDate: "2024-03-10",
      endDate: "2024-03-24",
      status: "Planning"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {name}!
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Manage your travel itineraries and discover new destinations
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Upcoming Trips
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">1</dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Planning
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">1</dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Completed
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
              </div>
            </div>
          </div>

          {/* Trips List */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md mb-6">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Your Itineraries
              </h2>
              <Link
                href="/dashboard/create"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Create New
              </Link>
            </div>
            <ul className="divide-y divide-gray-200">
              {trips.map((trip) => (
                <li key={trip.id}>
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <div className="flex text-sm">
                          <p className="font-medium text-blue-600 truncate">
                            {trip.destination}
                          </p>
                          <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex-shrink-0 sm:mt-0">
                        <div className="ml-4 flex-shrink-0 flex">
                          <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            trip.status === "Upcoming" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                          }`}>
                            {trip.status}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-5 flex-shrink-0">
                      <Link
                        href={`/dashboard/trip/${trip.id}`}
                        className="text-sm text-blue-600 hover:text-blue-900"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Back Home Link */}
          <div className="text-center mt-8">
            <Link href="/" className="text-blue-600 hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
