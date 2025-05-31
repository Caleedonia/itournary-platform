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
    
    // Only PDF format is supported for timeline
    if (format !== 'pdf') {
      return NextResponse.json(
        { error: 'Only PDF format is supported for timeline exports' },
        { status: 400 }
      );
    }
    
    // Generate a unique temporary file name
    const timestamp = Date.now();
    const tempHtmlPath = path.join('/tmp', `timeline_${experienceId}_${timestamp}.html`);
    const tempPdfPath = path.join('/tmp', `timeline_${experienceId}_${timestamp}.pdf`);
    
    // Generate HTML content for the timeline
    const htmlContent = generateTimelineHtml(experience, includeVisuals);
    
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
    const filename = `${experience.name.replace(/\s+/g, '_').toLowerCase()}_timeline.pdf`;
    
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Error generating timeline export:', error);
    return NextResponse.json(
      { error: 'Failed to generate export' },
      { status: 500 }
    );
  }
}

function generateTimelineHtml(experience: any, includeVisuals: boolean) {
  const { name, timeline } = experience;
  
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
    .timeline-container {
      margin-top: 30px;
    }
    .phase {
      margin-bottom: 30px;
      page-break-inside: avoid;
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
    .item {
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
    .footer {
      margin-top: 40px;
      text-align: center;
      font-size: 12px;
      color: #999;
      border-top: 1px solid #eaeaea;
      padding-top: 20px;
    }
    .visual-timeline {
      margin: 40px 0;
      position: relative;
    }
    .timeline-line {
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 4px;
      background-color: #4a90e2;
      transform: translateX(-50%);
    }
    .timeline-phase {
      position: relative;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
    }
    .timeline-phase-marker {
      position: absolute;
      left: 50%;
      top: 20px;
      width: 20px;
      height: 20px;
      background-color: #4a90e2;
      border-radius: 50%;
      transform: translateX(-50%);
    }
    .timeline-phase-content {
      width: 45%;
      background-color: #f5f5f5;
      padding: 15px;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .timeline-phase-content.left {
      margin-right: 55%;
    }
    .timeline-phase-content.right {
      margin-left: 55%;
    }
    .timeline-phase-name {
      font-weight: bold;
      margin-bottom: 5px;
    }
    .timeline-phase-dates {
      font-size: 14px;
      color: #666;
      margin-bottom: 10px;
    }
    .timeline-phase-items {
      font-size: 14px;
    }
    @page {
      size: A4;
      margin: 2cm;
    }
  `;
  
  // Generate HTML content
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${name} - Timeline</title>
      <style>${css}</style>
    </head>
    <body>
      <div class="header">
        <div class="logo">iTournary</div>
        <h1 class="title">${name} - Timeline</h1>
        <p class="subtitle">Generated on ${new Date().toLocaleDateString()}</p>
      </div>
      
      <div class="timeline-container">
  `;
  
  // Add visual timeline if requested
  if (includeVisuals && timeline && timeline.phases && timeline.phases.length > 0) {
    html += `
      <div class="visual-timeline">
        <div class="timeline-line"></div>
    `;
    
    timeline.phases.forEach((phase: any, index: number) => {
      const isEven = index % 2 === 0;
      const dateRange = phase.startDate && phase.endDate 
        ? `${new Date(phase.startDate).toLocaleDateString()} - ${new Date(phase.endDate).toLocaleDateString()}`
        : 'No dates specified';
      
      html += `
        <div class="timeline-phase">
          <div class="timeline-phase-marker"></div>
          <div class="timeline-phase-content ${isEven ? 'left' : 'right'}">
            <div class="timeline-phase-name">${phase.name}</div>
            <div class="timeline-phase-dates">${dateRange}</div>
            <div class="timeline-phase-items">
              ${phase.items.length} items
            </div>
          </div>
        </div>
      `;
    });
    
    html += `
      </div>
    `;
  }
  
  // Add detailed timeline
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
            <div class="item">
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
      
      <div class="footer">
        <p>Generated by iTournary Experience Planner</p>
        <p>${new Date().toLocaleString()}</p>
      </div>
    </body>
    </html>
  `;
  
  return html;
}
