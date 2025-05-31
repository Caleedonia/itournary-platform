# Export Functionality

The iTournary Experience Planner includes export functionality for timelines and budgets, allowing users to share their planning data or access it offline.

## Export Features

- **Timeline Export**: Export the timeline as a PDF with visual representation, including all phases, items, dates, and statuses.
- **Budget Export**: Export the budget as either:
  - PDF: Complete with charts and tables showing all budget categories, items, and financial summaries
  - CSV: Tabular data compatible with spreadsheet applications like Excel

## Implementation Details

The export functionality is implemented through:

1. **UI Components**:
   - Export buttons in Timeline and Budget containers
   - ExportModal component with format selection and preview

2. **API Routes**:
   - `/api/export/timeline/[experienceId]` - For timeline exports
   - `/api/export/budget/[experienceId]` - For budget exports
   - `/api/export/experience/[experienceId]` - For full experience exports

3. **Export Format Options**:
   - PDF format using HTML-to-PDF conversion
   - CSV format for budget data

## Usage

1. Navigate to an experience's Timeline or Budget tab
2. Click the "Export" button
3. Select the desired format (PDF or CSV)
4. Configure options (like including visual charts)
5. Click "Export" to download the file

## Technical Notes

- PDF generation is handled server-side
- CSV generation is also handled server-side
- File downloads are triggered via client-side JavaScript
- Exported files include appropriate headers and footers
