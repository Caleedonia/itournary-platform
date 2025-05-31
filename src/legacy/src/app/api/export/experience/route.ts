import { NextRequest, NextResponse } from 'next/server';
import { getExperienceById } from '@/lib/mongodb';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET(
  request: NextRequest,
  { params }: { params: { experienceId: string } }
) {
  try {
    const { experienceId } = params;
    const searchParams = request.nextUrl.searchParams;
    const format = searchParams.get('format') || 'pdf';
    const includeVisuals = searchParams.get('visuals') === 'true';
    
    // Get experience data from MongoDB
    const experience = await getExperienceById(experienceId);
    
    if (!experience) {
      return NextResponse.json(
        { error: 'Experience not found' },
        { status: 404 }
      );
    }
    
    // Only PDF format is supported for full experience export
    if (format !== 'pdf') {
      return NextResponse.json(
        { error: 'Only PDF format is supported for full experience exports' },
        { status: 400 }
      );
    }
    
    // Generate a unique temporary file name
    const timestamp = Date.now();
    const tempHtmlPath = path.join('/tmp', `experience_${experienceId}_${timestamp}.html`);
    const tempPdfPath = path.join('/tmp', `experience_${experienceId}_${timestamp}.pdf`);
    
    // Generate HTML content for the experience
    const htmlContent = generateExperienceHtml(experience, includeVisuals);
    
    // Write HTML to temporary file
    fs.writeFileSync(tempHtmlPath, htmlContent);
    
    // Convert HTML to PDF using WeasyPrint
    await execAsync(`weasyprint ${tempHtmlPath} ${tempPdfPath}`);
    
    // Read the generated PDF
    const pdfBuffer = fs.readFileSync(tempPdfPath);
    
    // Clean up temporary files
    fs.unlinkSync(tempHtmlPath);
    fs.unlinkSync(tempPdfPath);
    
    // Set appropriate headers for PDF download
    const filename = `${experience.name.replace(/\s+/g, '_').toLowerCase()}_experience.pdf`;
    
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Error generating experience export:', error);
    return NextResponse.json(
      { error: 'Failed to generate export' },
      { status: 500 }
    );
  }
}

function generateExperienceHtml(experience: any, includeVisuals: boolean) {
  const { name, description, occasion, destination, timeline, budget, checklist } = experience;
  
  // Generate CSS for the PDF
  const css = `
    body {
      font-family: "Noto Sans CJK SC", "WenQuanYi Zen Hei", sans-serif;
      margin: 0;
      padding: 20px;
      color: #333;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #eaeaea;
    }
    .logo {
      font-size: 24px;
      font-weight: bold;
      color: #4a90e2;
      margin-bottom: 10px;
    }
    .title {
      font-size: 28px;
      margin: 10px 0;
    }
    .subtitle {
      font-size: 16px;
      color: #666;
    }
    .experience-details {
      margin: 30px 0;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 5px;
    }
    .detail-row {
      margin-bottom: 15px;
    }
    .detail-label {
      font-weight: bold;
      margin-bottom: 5px;
    }
    .detail-value {
      color: #555;
    }
    .section {
      margin-top: 40px;
      page-break-before: always;
    }
    .section-title {
      font-size: 24px;
      color: #4a90e2;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #4a90e2;
    }
    .checklist-container {
      margin-top: 20px;
    }
    .checklist-item {
      padding: 10px 15px;
      margin-bottom: 10px;
      background-color: #f9f9f9;
      border-left: 3px solid #4a90e2;
      display: flex;
      align-items: center;
    }
    .checklist-status {
      margin-right: 10px;
      font-size: 18px;
    }
    .checklist-content {
      flex-grow: 1;
    }
    .checklist-title {
      font-weight: bold;
      margin-bottom: 5px;
    }
    .checklist-description {
      font-size: 14px;
      color: #666;
    }
    .timeline-container {
      margin-top: 20px;
    }
    .phase {
      margin-bottom: 30px;
    }
    .phase-header {
      background-color: #f5f5f5;
      padding: 10px 15px;
      border-radius: 5px;
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .phase-name {
      font-size: 18px;
      font-weight: bold;
    }
    .phase-dates {
      font-size: 14px;
      color: #666;
    }
    .items-container {
      margin-left: 20px;
    }
    .timeline-item {
      padding: 10px 15px;
      border-left: 3px solid #4a90e2;
      margin-bottom: 15px;
      background-color: #f9f9f9;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }
    .item-title {
      font-weight: bold;
    }
    .item-date {
      color: #666;
      font-size: 14px;
    }
    .item-description {
      font-size: 14px;
      margin-top: 5px;
      color: #555;
    }
    .item-status {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 12px;
      font-size: 12px;
      margin-top: 5px;
    }
    .status-pending {
      background-color: #ffecb3;
      color: #ff8f00;
    }
    .status-in-progress {
      background-color: #bbdefb;
      color: #1976d2;
    }
    .status-completed {
      background-color: #c8e6c9;
      color: #388e3c;
    }
    .budget-summary {
      margin: 30px 0;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 5px;
    }
    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eaeaea;
    }
    .summary-row:last-child {
      border-bottom: none;
    }
    .summary-label {
      font-weight: bold;
    }
    .summary-value {
      text-align: right;
    }
    .budget-container {
      margin-top: 30px;
    }
    .category {
      margin-bottom: 30px;
    }
    .category-header {
      background-color: #f5f5f5;
      padding: 10px 15px;
      border-radius: 5px;
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .category-name {
      font-size: 18px;
      font-weight: bold;
    }
    .category-allocation {
      font-size: 16px;
      color: #4a90e2;
    }
    .items-table {
      width: 100%;
      border-collapse: collapse;
    }
    .items-table th {
      background-color: #f5f5f5;
      padding: 10px;
      text-align: left;
      border-bottom: 2px solid #ddd;
    }
    .items-table td {
      padding: 10px;
      border-bottom: 1px solid #eaeaea;
    }
    .items-table tr:last-child td {
      border-bottom: none;
    }
    .status-pill {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 12px;
      font-size: 12px;
    }
    .status-planned {
      background-color: #ffecb3;
      color: #ff8f00;
    }
    .status-booked {
      background-color: #bbdefb;
      color: #1976d2;
    }
    .status-paid {
      background-color: #c8e6c9;
      color: #388e3c;
    }
    .status-completed {
      background-color: #d1c4e9;
      color: #512da8;
    }
    .footer {
      margin-top: 40px;
      text-align: center;
      font-size: 12px;
      color: #999;
      border-top: 1px solid #eaeaea;
      padding-top: 20px;
    }
    @page {
      size: A4;
      margin: 2cm;
    }
  `;
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: budget?.currency || 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Generate HTML content
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${name} - Experience Plan</title>
      <style>${css}</style>
    </head>
    <body>
      <div class="header">
        <div class="logo">iTournary</div>
        <h1 class="title">${name}</h1>
        <p class="subtitle">Generated on ${new Date().toLocaleDateString()}</p>
      </div>
      
      <div class="experience-details">
        <div class="detail-row">
          <div class="detail-label">Occasion:</div>
          <div class="detail-value">${occasion || 'Not specified'}</div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">Destination:</div>
          <div class="detail-value">${destination || 'Not specified'}</div>
        </div>
        
        ${description ? `
        <div class="detail-row">
          <div class="detail-label">Description:</div>
          <div class="detail-value">${description}</div>
        </div>
        ` : ''}
      </div>
  `;
  
  // Add Checklist Section
  html += `
    <div class="section">
      <h2 class="section-title">Checklist</h2>
      
      <div class="checklist-container">
  `;
  
  if (checklist && checklist.items && checklist.items.length > 0) {
    checklist.items.forEach((item: any) => {
      const statusIcon = item.completed ? '✅' : '⬜';
      
      html += `
        <div class="checklist-item">
          <div class="checklist-status">${statusIcon}</div>
          <div class="checklist-content">
            <div class="checklist-title">${item.title}</div>
            ${item.description ? `<div class="checklist-description">${item.description}</div>` : ''}
          </div>
        </div>
      `;
    });
  } else {
    html += `<p>No checklist items available</p>`;
  }
  
  html += `
      </div>
    </div>
  `;
  
  // Add Timeline Section
  html += `
    <div class="section">
      <h2 class="section-title">Timeline</h2>
      
      <div class="timeline-container">
  `;
  
  if (timeline && timeline.phases && timeline.phases.length > 0) {
    timeline.phases.forEach((phase: any) => {
      const startDate = phase.startDate ? new Date(phase.startDate).toLocaleDateString() : 'Not set';
      const endDate = phase.endDate ? new Date(phase.endDate).toLocaleDateString() : 'Not set';
      
      html += `
        <div class="phase">
          <div class="phase-header">
            <div class="phase-name">${phase.name}</div>
            <div class="phase-dates">${startDate} - ${endDate}</div>
          </div>
          <div class="items-container">
      `;
      
      if (phase.items && phase.items.length > 0) {
        phase.items.forEach((item: any) => {
          const itemDate = item.date ? new Date(item.date).toLocaleDateString() : 'No date';
          const statusClass = `status-${item.status}`;
          
          html += `
            <div class="timeline-item">
              <div class="item-header">
                <div class="item-title">${item.title}</div>
                <div class="item-date">${itemDate}</div>
              </div>
              ${item.description ? `<div class="item-description">${item.description}</div>` : ''}
              <div class="item-status ${statusClass}">${item.status.charAt(0).toUpperCase() + item.status.slice(1)}</div>
            </div>
          `;
        });
      } else {
        html += `<p>No items in this phase</p>`;
      }
      
      html += `
          </div>
        </div>
      `;
    });
  } else {
    html += `<p>No timeline data available</p>`;
  }
  
  html += `
      </div>
    </div>
  `;
  
  // Add Budget Section
  html += `
    <div class="section">
      <h2 class="section-title">Budget</h2>
  `;
  
  if (budget) {
    // Calculate budget statistics
    const totalBudget = budget.totalBudget || 0;
    let totalAllocated = 0;
    let totalEstimated = 0;
    let totalActual = 0;
    
    if (budget.categories) {
      budget.categories.forEach((category: any) => {
        totalAllocated += category.allocation || 0;
        
        if (category.items) {
          category.items.forEach((item: any) => {
            totalEstimated += item.estimatedCost || 0;
            totalActual += item.actualCost || 0;
          });
        }
      });
    }
    
    const remainingBudget = totalBudget - totalActual;
    
    html += `
      <div class="budget-summary">
        <div class="summary-row">
          <div class="summary-label">Total Budget:</div>
          <div class="summary-value">${formatCurrency(totalBudget)}</div>
        </div>
        <div class="summary-row">
          <div class="summary-label">Total Allocated:</div>
          <div class="summary-value">${formatCurrency(totalAllocated)}</div>
        </div>
        <div class="summary-row">
          <div class="summary-label">Total Estimated:</div>
          <div class="summary-value">${formatCurrency(totalEstimated)}</div>
        </div>
        <div class="summary-row">
          <div class="summary-label">Total Actual:</div>
          <div class="summary-value">${formatCurrency(totalActual)}</div>
        </div>
        <div class="summary-row">
          <div class="summary-label">Remaining Budget:</div>
          <div class="summary-value">${formatCurrency(remainingBudget)}</div>
        </div>
      </div>
      
      <div class="budget-container">
    `;
    
    if (budget.categories && budget.categories.length > 0) {
      budget.categories.forEach((category: any) => {
        html += `
          <div class="category">
            <div class="category-header">
              <div class="category-name">${category.name}</div>
              <div class="category-allocation">Allocation: ${formatCurrency(category.allocation || 0)}</div>
            </div>
            
            <table class="items-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Estimated Cost</th>
                  <th>Actual Cost</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
        `;
        
        if (category.items && category.items.length > 0) {
          category.items.forEach((item: any) => {
            const statusClass = `status-${item.status}`;
            
            html += `
              <tr>
                <td>${item.name}</td>
                <td>${formatCurrency(item.estimatedCost || 0)}</td>
                <td>${item.actualCost ? formatCurrency(item.actualCost) : '-'}</td>
                <td><span class="status-pill ${statusClass}">${item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span></td>
                <td>${item.notes || '-'}</td>
              </tr>
            `;
          });
        } else {
          html += `
            <tr>
              <td colspan="5" style="text-align: center;">No items in this category</td>
            </tr>
          `;
        }
        
        html += `
              </tbody>
            </table>
          </div>
        `;
      });
    } else {
      html += `<p>No budget categories available</p>`;
    }
    
    html += `
      </div>
    `;
  } else {
    html += `<p>No budget data available</p>`;
  }
  
  html += `
    </div>
    
    <div class="footer">
      <p>Generated by iTournary Experience Planner</p>
      <p>${new Date().toLocaleString()}</p>
    </div>
  </body>
  </html>
  `;
  
  return html;
}
