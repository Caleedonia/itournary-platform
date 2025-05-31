# Special Occasions Showcase & Affiliate Integration - Update & Validation

Hello! We have now completed the development work for enhancing the special occasions showcase on resort pages and integrating affiliate link tracking for booking referrals.

## Summary of Features Implemented:

1.  **Enhanced Special Occasions Showcase (`/resorts/[resortId]`):
    *   The resort detail pages have been updated to dynamically display detailed information for various special occasions, including Weddings, Corporate Events, and Wellness Retreats.
    *   This content is pulled from your Sanity Studio, leveraging the `nicheCapabilities` field and its references to detailed schemas (`weddingVenueDetails`, `corporateFacilityDetails`, `wellnessRetreatDetails`).
    *   The UI now presents these diverse event types clearly, providing users with comprehensive information.

2.  **Affiliate Link Integration & Click Tracking:**
    *   A new reusable component, `AffiliateLinkButton.tsx`, has been created to handle outbound affiliate links.
    *   This button is now used on the resort detail pages for each booking option listed under `bookingOptions` in your Sanity data.
    *   When a user clicks an affiliate link button (e.g., "Book with Expedia"), the following happens:
        *   An event is sent to our backend analytics API (`/api/analytics/event`).
        *   This event includes details like the affiliate provider, the target URL, resort ID, and resort name.
        *   The user is then redirected to the affiliate partner’s website in a new tab.

3.  **Analytics API for Click Tracking (`/api/analytics/event`):
    *   The existing analytics API endpoint now receives `affiliate_click` events.
    *   **Currently, this endpoint logs the received event data to the server console for testing and validation purposes.** In a production environment, this endpoint would be enhanced to send data to a dedicated analytics service (e.g., Google Analytics, or a custom database).

## Files Provided:

Attached to this message, you will find a zip file named `itournary_special_occasions_affiliate_update.zip`. This archive contains all the new and updated files for these features. Please extract them and place them into your `iTournary` Next.js project, maintaining the directory structure:

*   `itournary_special_occasions_affiliate_update/
    ├── src/
    │   ├── app/
    │   │   └── (main)/
    │   │       └── resorts/
    │   │           └── [resortId]/
    │   │               └── page.tsx      (Replaces existing file)
    │   └── components/
    │       └── AffiliateLinkButton.tsx (New file)
    └── README_special_occasions_affiliate.md (This file)
`

*(Note: The `/src/app/api/analytics/event/route.ts` file was part of a previous update and is utilized by these new features; it is not re-included in this specific zip if unchanged since the last delivery, but its functionality is key here.)*

**Action for your team:** Please commit these changes to your "iTournary" GitHub repository.

## Validation Steps for Your Team:

To ensure everything is working as expected, please test the following flows thoroughly:

1.  **Populate Sanity Data (If not already done for testing):**
    *   Ensure at least one resort in your Sanity Studio has data for `nicheCapabilities` (e.g., add details for Weddings, Corporate, and/or Wellness by linking to existing or new detail documents).
    *   Ensure this resort also has one or more entries in the `bookingOptions` array, with a `provider` name (e.g., "Expedia") and a valid `deepLink` (URL).

2.  **Verify Special Occasions Display:**
    *   Navigate to the detail page of the resort you configured in Sanity (e.g., `/resorts/your-resort-slug`).
    *   Verify that the "Special Occasions & Events" section appears and correctly displays the information for weddings, corporate events, or wellness retreats based on the data you entered.
    *   Check that descriptions, venue details, package information, etc., are rendered as expected.

3.  **Test Affiliate Link Functionality & Click Tracking:**
    *   On the same resort detail page, locate the "Book Your Stay" section on the right.
    *   You should see buttons like "Book with [Provider Name]" for each entry in your `bookingOptions`.
    *   **Open your browser’s developer console (usually F12) and switch to the Network tab. Also, keep an eye on your Next.js development server console output (where you run `npm run dev` or `pnpm dev`).**
    *   Click one of the "Book with [Provider Name]" buttons.
    *   **Expected Behavior:**
        *   A new browser tab should open, navigating to the `deepLink` URL you specified in Sanity.
        *   In your **server console output**, you should see a log message from the `/api/analytics/event` endpoint, indicating that an `affiliate_click` event was received. It should include details like:
            *   `Event Name: affiliate_click`
            *   `Event Params: { provider: "[Provider Name]", target_url: "[URL]", resort_id: "[ID]", resort_name: "[Name]" }`
        *   (Optional) In your browser's Network tab, you might see the POST request to `/api/analytics/event` being made, though this happens quickly.

4.  **Test Multiple Affiliate Links:**
    *   If you have multiple `bookingOptions` for a resort, test each one to ensure they all redirect correctly and log the analytics event with the correct provider information.

Your feedback after performing these validation steps is crucial. Please let me know if you encounter any issues, if the display of special occasions meets your expectations, and if the affiliate click tracking is working as described.

Once you confirm these features are satisfactory, we can discuss the next steps for the "iTournary" project!

