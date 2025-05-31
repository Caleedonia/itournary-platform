"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import EnhancedOccasionSelector from "@/components/Templates/EnhancedOccasionSelector";
import { enhanceOccasionTypesWithTemplates, transformTemplateToExperienceItems } from "@/utils/templateDataTransformers";

export default function NewExperiencePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const [experienceName, setExperienceName] = useState("");
  const [selectedOccasionTypeId, setSelectedOccasionTypeId] = useState("");
  const [occasionTypes, setOccasionTypes] = useState<any[]>([]);
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");
  
  const [isLoadingOccasions, setIsLoadingOccasions] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOccasionTypesFromMock = async () => {
      setIsLoadingOccasions(true);
      try {
        // TODO: Replace with actual mock API endpoint if different
        // For now, we'll simulate a fetch and use a hardcoded example for Destination Wedding
        // In a real scenario, this would be: const response = await fetch("/api/mock/occasion-types");
        // const fetchedOccasionTypes = await response.json();

        const mockOccasionTypes = [
          {
            _id: "mock_occasion_anniversary",
            name: "Anniversary Celebration",
            slug: { current: "anniversary-celebration" },
            description: "Plan a memorable anniversary."
            // No template for this one in the mock
          },
          {
            _id: "mock_occasion_destination_wedding",
            name: "Destination Wedding",
            slug: { current: "destination-wedding" },
            description: "Plan your dream destination wedding.",
            templateDetails: {
              introduction: "This template provides a starting point for your Destination Wedding!",
              templateChecklistItems: [
                { _key: "dw_chk1", taskName: "Set Wedding Budget", isCompleted: false, category: "Finance" },
                { _key: "dw_chk2", taskName: "Choose Destination & Venue", isCompleted: false, category: "Venue" },
                { _key: "dw_chk3", taskName: "Book Accommodations", isCompleted: false, category: "Logistics" },
                { _key: "dw_chk4", taskName: "Hire Wedding Planner", isCompleted: false, category: "Vendors" },
                { _key: "dw_chk5", taskName: "Send Save-the-Dates", isCompleted: false, category: "Communication" },
              ],
              sampleTimelineStructure: [
                { 
                  _key: "dw_time1", 
                  phaseName: "12-18 Months Before", 
                  durationEstimate: "6 months",
                  tasks: ["Set budget", "Choose destination", "Book venue", "Secure wedding date"] 
                },
                { 
                  _key: "dw_time2", 
                  phaseName: "9-12 Months Before", 
                  durationEstimate: "3 months",
                  tasks: ["Book accommodations", "Hire planner", "Send save-the-dates"] 
                },
              ],
              templateBudgetCategories: [
                { _key: "dw_bud1", categoryName: "Venue & Ceremony", estimatedPercentage: 40, notes: "Includes venue rental, ceremony setup, and decor" },
                { _key: "dw_bud2", categoryName: "Food & Beverage", estimatedPercentage: 25, notes: "Includes reception dinner, welcome party, and farewell brunch" },
              ],
              recommendedServiceProviderTypes: ["Wedding Planner", "Photographer"]
            }
          },
          {
            _id: "mock_occasion_corporate_retreat",
            name: "Corporate Retreat",
            slug: { current: "corporate-retreat" },
            description: "Organize an impactful corporate retreat.",
            templateDetails: {
              introduction: "Jumpstart your corporate retreat planning with this template!",
              templateChecklistItems: [
                { _key: "cr_chk1", taskName: "Define Retreat Objectives", isCompleted: false, category: "Planning" },
                { _key: "cr_chk2", taskName: "Select Venue & Location", isCompleted: false, category: "Venue" },
                { _key: "cr_chk3", taskName: "Plan Agenda & Activities", isCompleted: false, category: "Programming" },
              ],
              sampleTimelineStructure: [
                { 
                  _key: "cr_time1", 
                  phaseName: "3-4 Months Before", 
                  durationEstimate: "4-6 weeks",
                  tasks: ["Set objectives", "Determine budget", "Research venues"] 
                },
                { 
                  _key: "cr_time2", 
                  phaseName: "2-3 Months Before", 
                  durationEstimate: "4 weeks",
                  tasks: ["Book venue", "Plan agenda", "Arrange transportation"] 
                },
              ],
              templateBudgetCategories: [
                { _key: "cr_bud1", categoryName: "Venue & Accommodations", estimatedPercentage: 45, notes: "Includes meeting spaces and guest rooms" },
                { _key: "cr_bud2", categoryName: "Food & Beverage", estimatedPercentage: 20, notes: "All meals and refreshments" },
              ]
            }
          }
        ];
        
        // Enhance occasion types with template information
        const enhancedOccasionTypes = enhanceOccasionTypesWithTemplates(mockOccasionTypes);
        setOccasionTypes(enhancedOccasionTypes);
        
        // Check if a template ID was provided in the URL
        const templateId = searchParams.get('template');
        if (templateId) {
          // Find the occasion type that matches this template
          const matchingOccasion = enhancedOccasionTypes.find(ot => 
            ot.template && ot.template.id === templateId
          );
          
          if (matchingOccasion) {
            setSelectedOccasionTypeId(matchingOccasion._id);
            // Could also pre-populate other fields based on template
            setExperienceName(`My ${matchingOccasion.name}`);
          }
        }
      } catch (e) {
        console.error("Failed to fetch occasion types from mock:", e);
        setError("Could not load occasion types. Please try again later.");
      } finally {
        setIsLoadingOccasions(false);
      }
    };
    
    fetchOccasionTypesFromMock();
  }, [searchParams]);

  const handleOccasionChange = (occasionTypeId: string) => {
    setSelectedOccasionTypeId(occasionTypeId);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session?.user?.id) {
      setError("You must be logged in to create an experience.");
      return;
    }
    if (!experienceName.trim()) {
      setError("Please enter a name for your experience.");
      return;
    }
    if (!selectedOccasionTypeId) {
      setError("Please select an occasion type.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const selectedOccasion = occasionTypes.find(ot => ot._id === selectedOccasionTypeId);
    const selectedTemplate = selectedOccasion?.template;

    try {
      // Prepare initial items from template if available
      const initialItems = selectedTemplate 
        ? transformTemplateToExperienceItems(selectedTemplate)
        : [];

      const response = await fetch("/api/experiences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          experienceName,
          occasionTypeId: selectedOccasionTypeId,
          occasionTypeName: selectedOccasion?.name || "Unknown Occasion",
          destination: destination || undefined,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
          notes: notes || undefined,
          // Include initial items from template
          initialItems: initialItems.length > 0 ? initialItems : undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create experience");
      }

      const newExperience = await response.json();
      router.push(`/account/experience-planner/${newExperience.experience._id}`); 

    } catch (e: any) {
      console.error("Experience creation failed:", e);
      setError(e.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-coral-600 mb-4">Access Denied</h1>
        <p className="text-slate-600 mb-6">Please log in to create a new experience.</p>
        <Link href="/account" className="bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">
          Log In
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <Link href="/account/experience-planner" className="text-ocean-blue-600 hover:underline">
          &larr; Back to Experience Planner
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-ocean-blue-700 mb-8">Create New Experience Plan</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <label htmlFor="experienceName" className="block text-sm font-medium text-slate-700 mb-1">
            Experience Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="experienceName"
            value={experienceName}
            onChange={(e) => setExperienceName(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:ring-coral-500 focus:border-coral-500"
            placeholder="e.g., John & Jane's Anniversary Trip"
            required
          />
        </div>

        <div>
          <label htmlFor="occasionType" className="block text-sm font-medium text-slate-700 mb-1">
            Occasion Type <span className="text-red-500">*</span>
          </label>
          <EnhancedOccasionSelector
            occasionTypes={occasionTypes}
            selectedOccasionTypeId={selectedOccasionTypeId}
            onChange={handleOccasionChange}
          />
        </div>

        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-slate-700 mb-1">
            Destination (Optional)
          </label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:ring-coral-500 focus:border-coral-500"
            placeholder="e.g., Paris, France"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-slate-700 mb-1">
              Start Date (Optional)
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:ring-coral-500 focus:border-coral-500"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-slate-700 mb-1">
              End Date (Optional)
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:ring-coral-500 focus:border-coral-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-1">
            Initial Notes (Optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:ring-coral-500 focus:border-coral-500"
            placeholder="Any initial thoughts, ideas, or requirements..."
          />
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="flex items-center justify-end space-x-3">
          <Link href="/account/experience-planner" className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md border border-slate-300">
            Cancel
          </Link>
          <button 
            type="submit"
            disabled={isSubmitting || isLoadingOccasions}
            className="bg-coral-500 hover:bg-coral-600 text-white font-semibold py-2.5 px-6 rounded-md transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Create Experience Plan"}
          </button>
        </div>
      </form>
    </div>
  );
}
