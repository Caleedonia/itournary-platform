// src/components/InquiryForm.tsx
"use client";

import { useState, FormEvent } from "react";
import { useSession } from "next-auth/react";

interface InquiryFormProps {
  providerId: string;
  providerName?: string;
  onInquirySubmitted?: () => void; // Optional callback
}

interface FormData {
  eventName: string;
  eventDate: string;
  numberOfGuests: string;
  message: string;
  contactPreference: "email" | "phone" | "";
}

export default function InquiryForm({ providerId, providerName, onInquirySubmitted }: InquiryFormProps) {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState<FormData>({
    eventName: "",
    eventDate: "",
    numberOfGuests: "",
    message: "",
    contactPreference: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "authenticated") {
      setSubmitStatus("error");
      setSubmitMessage("You must be logged in to send an inquiry.");
      return;
    }
    if (!formData.message.trim()) {
        setSubmitStatus("error");
        setSubmitMessage("Please enter a message for your inquiry.");
        return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/service-providers/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceProviderId: providerId,
          eventName: formData.eventName || undefined,
          eventDate: formData.eventDate || undefined,
          numberOfGuests: formData.numberOfGuests ? parseInt(formData.numberOfGuests) : undefined,
          message: formData.message,
          contactPreference: formData.contactPreference || undefined,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setSubmitMessage(result.message || "Inquiry submitted successfully!");
        setFormData({ eventName: "", eventDate: "", numberOfGuests: "", message: "", contactPreference: "" }); // Reset form
        if (onInquirySubmitted) onInquirySubmitted();
      } else {
        setSubmitStatus("error");
        setSubmitMessage(result.message || "Failed to submit inquiry. Please try again.");
      }
    } catch (error) {
      console.error("Inquiry submission error:", error);
      setSubmitStatus("error");
      setSubmitMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return <p className="text-sm text-slate-500">Loading form...</p>;
  }

  if (status !== "authenticated") {
    return <p className="text-sm text-slate-600 bg-yellow-50 p-3 rounded-md">Please <a href="/api/auth/signin" className="underline text-coral-600">sign in</a> to send an inquiry.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
          Your Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-coral-500 focus:border-coral-500"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="eventName" className="block text-sm font-medium text-slate-700 mb-1">
          Event Name (Optional)
        </label>
        <input
          type="text"
          id="eventName"
          name="eventName"
          className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-coral-500 focus:border-coral-500"
          value={formData.eventName}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="eventDate" className="block text-sm font-medium text-slate-700 mb-1">
            Event Date (Optional)
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-coral-500 focus:border-coral-500"
            value={formData.eventDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="numberOfGuests" className="block text-sm font-medium text-slate-700 mb-1">
            Number of Guests (Optional)
          </label>
          <input
            type="number"
            id="numberOfGuests"
            name="numberOfGuests"
            min="1"
            className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-coral-500 focus:border-coral-500"
            value={formData.numberOfGuests}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <label htmlFor="contactPreference" className="block text-sm font-medium text-slate-700 mb-1">
          Preferred Contact Method (Optional)
        </label>
        <select
          id="contactPreference"
          name="contactPreference"
          className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-coral-500 focus:border-coral-500"
          value={formData.contactPreference}
          onChange={handleChange}
        >
          <option value="">No preference</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
      </div>
      
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-coral-600 hover:bg-coral-700 text-white font-semibold py-2.5 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : `Send Inquiry to ${providerName || "Provider"}`}
      </button>

      {submitStatus === "success" && (
        <p className="text-sm text-green-600 mt-2 p-2 bg-green-50 rounded-md">{submitMessage}</p>
      )}
      {submitStatus === "error" && (
        <p className="text-sm text-red-600 mt-2 p-2 bg-red-50 rounded-md">{submitMessage}</p>
      )}
    </form>
  );
}

