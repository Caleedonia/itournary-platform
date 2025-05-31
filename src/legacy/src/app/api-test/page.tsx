"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function APITestPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching experiences list...");
        const response = await fetch('/api/experiences');
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const result = await response.json();
        console.log("API response:", result);
        setData(result);
      } catch (err) {
        console.error("API fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">API Test Page</h1>
      
      <div className="mb-4">
        <Link href="/account/experience-planner" className="text-blue-500 underline">
          Back to Experience Planner
        </Link>
      </div>
      
      {loading && <p>Loading...</p>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 mb-6 rounded">
          Error: {error}
        </div>
      )}
      
      {data && (
        <div>
          <h2 className="text-xl font-bold mb-4">Experiences Data:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(data, null, 2)}
          </pre>
          
          {data.experiences && data.experiences.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-2">Test Links:</h3>
              <ul className="list-disc pl-6">
                {data.experiences.map(exp => (
                  <li key={exp._id} className="mb-2">
                    <Link 
                      href={`/account/experience-planner/${exp._id}`}
                      className="text-blue-600 underline"
                    >
                      Test: {exp.experienceName} ({exp._id})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
