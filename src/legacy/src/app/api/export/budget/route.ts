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
    
    // Handle different export formats
    if (format === 'pdf') {
      return await generatePdfExport(experience, includeVisuals);
    } else if (format === 'csv') {
      return generateCsvExport(experience);
    } else {
      return NextResponse.json(
        { error: 'Unsupported export format' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error generating budget export:', error);
    return NextResponse.json(
      { error: 'Failed to generate export' },
      { status: 500 }
    );
  }
}

async function generatePdfExport(experience: any, includeVisuals: boolean) {
  // Generate a unique temporary file name
  const timestamp = Date.now();
  const tempHtmlPath = path.join('/tmp', `budget_${experience._id}_${timestamp}.html`);
  const tempPdfPath = path.join('/tmp', `budget_${experience._id}_${timestamp}.pdf`);
  
  // Generate HTML content for the budget
  const htmlContent = generateBudgetHtml(experience, includeVisuals);
  
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
  const filename = `${experience.name.replace(/\s+/g, '_').toLowerCase()}_budget.pdf`;
  
  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}

function generateCsvExport(experience: any) {
  const { name, budget } = experience;
  
  // Start with CSV headers
  let csvContent = 'Category,Item,Estimated Cost,Actual Cost,Status,Notes\n';
  
  // Add budget data rows
  if (budget && budget.categories && budget.categories.length > 0) {
    budget.categories.forEach((category: any) => {
      if (category.items && category.items.length > 0) {
        category.items.forEach((item: any) => {
          // Format each field properly for CSV
          const categoryName = formatCsvField(category.name);
          const itemName = formatCsvField(item.name);
          const estimatedCost = item.estimatedCost || 0;
          const actualCost = item.actualCost || '';
          const status = formatCsvField(item.status);
          const notes = formatCsvField(item.notes || '');
          
          // Add row to CSV content
          csvContent += `${categoryName},${itemName},${estimatedCost},${actualCost},${status},${notes}\n`;
        });
      } else {
        // Add empty category row
        csvContent += `${formatCsvField(category.name)},,,,\n`;
      }
    });
  }
  
  // Set appropriate headers for CSV download
  const filename = `${name.replace(/\s+/g, '_').toLowerCase()}_budget.csv`;
  
  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}

function formatCsvField(value: string) {
  // If the value contains commas, quotes, or newlines, wrap it in quotes and escape any quotes
  if (value && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function generateBudgetHtml(experience: any, includeVisuals: boolean) {
  const { name, budget } = experience;
  
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
      page-break-inside: avoid;
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
    .chart-container {
      margin: 30px 0;
      text-align: center;
    }
    .chart-title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .pie-chart {
      width: 400px;
      height: 400px;
      margin: 0 auto;
    }
    .bar-chart {
      width: 600px;
      height: 300px;
      margin: 0 auto;
    }
    .chart-legend {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 20px;
    }
    .legend-item {
      display: flex;
      align-items: center;
      margin: 0 10px 10px 0;
    }
    .legend-color {
      width: 15px;
      height: 15px;
      margin-right: 5px;
      border-radius: 3px;
    }
    .legend-label {
      font-size: 14px;
    }
    @page {
      size: A4;
      margin: 2cm;
    }
  `;
  
  // Calculate budget statistics
  const totalBudget = budget?.totalBudget || 0;
  let totalAllocated = 0;
  let totalEstimated = 0;
  let totalActual = 0;
  
  if (budget && budget.categories) {
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
      <title>${name} - Budget</title>
      <style>${css}</style>
    </head>
    <body>
      <div class="header">
        <div class="logo">iTournary</div>
        <h1 class="title">${name} - Budget</h1>
        <p class="subtitle">Generated on ${new Date().toLocaleDateString()}</p>
      </div>
      
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
  `;
  
  // Add visual charts if requested
  if (includeVisuals && budget && budget.categories && budget.categories.length > 0) {
    // Generate SVG for pie chart (allocation by category)
    const pieChartSvg = generateAllocationPieChart(budget.categories, totalBudget);
    
    // Generate SVG for bar chart (estimated vs actual by category)
    const barChartSvg = generateComparisonBarChart(budget.categories);
    
    html += `
      <div class="chart-container">
        <div class="chart-title">Budget Allocation by Category</div>
        <div class="pie-chart">
          ${pieChartSvg}
        </div>
      </div>
      
      <div class="chart-container">
        <div class="chart-title">Estimated vs. Actual Costs by Category</div>
        <div class="bar-chart">
          ${barChartSvg}
        </div>
      </div>
    `;
  }
  
  // Add detailed budget
  html += `<div class="budget-container">`;
  
  if (budget && budget.categories && budget.categories.length > 0) {
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

function generateAllocationPieChart(categories: any[], totalBudget: number) {
  // Define colors for pie slices
  const colors = [
    '#4285F4', '#EA4335', '#FBBC05', '#34A853', '#FF6D01', 
    '#46BDC6', '#7BAAF7', '#F07B72', '#FCD04F', '#71C287'
  ];
  
  // Calculate total allocation (for percentage)
  const totalAllocation = categories.reduce((sum, category) => sum + (category.allocation || 0), 0);
  
  // Generate pie chart segments
  let startAngle = 0;
  let paths = '';
  let legend = '';
  
  categories.forEach((category, index) => {
    const allocation = category.allocation || 0;
    const percentage = totalAllocation > 0 ? (allocation / totalAllocation) * 100 : 0;
    
    if (percentage > 0) {
      // Calculate angles for pie slice
      const angle = (percentage / 100) * 360;
      const endAngle = startAngle + angle;
      
      // Convert angles to radians
      const startRad = (startAngle - 90) * Math.PI / 180;
      const endRad = (endAngle - 90) * Math.PI / 180;
      
      // Calculate points
      const centerX = 200;
      const centerY = 200;
      const radius = 150;
      
      const x1 = centerX + radius * Math.cos(startRad);
      const y1 = centerY + radius * Math.sin(startRad);
      const x2 = centerX + radius * Math.cos(endRad);
      const y2 = centerY + radius * Math.sin(endRad);
      
      // Create path for pie slice
      const largeArcFlag = angle > 180 ? 1 : 0;
      const path = `M${centerX},${centerY} L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2} Z`;
      
      // Add path to SVG
      const color = colors[index % colors.length];
      paths += `<path d="${path}" fill="${color}" stroke="white" stroke-width="1"></path>`;
      
      // Add to legend
      legend += `
        <div class="legend-item">
          <div class="legend-color" style="background-color: ${color};"></div>
          <div class="legend-label">${category.name} (${percentage.toFixed(1)}%)</div>
        </div>
      `;
      
      // Update start angle for next slice
      startAngle = endAngle;
    }
  });
  
  // Generate complete SVG
  return `
    <svg width="400" height="400" viewBox="0 0 400 400">
      ${paths}
    </svg>
    <div class="chart-legend">
      ${legend}
    </div>
  `;
}

function generateComparisonBarChart(categories: any[]) {
  // Define chart dimensions
  const width = 600;
  const height = 300;
  const padding = { top: 20, right: 20, bottom: 50, left: 60 };
  
  // Calculate chart area dimensions
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  // Define colors
  const estimatedColor = '#4285F4';
  const actualColor = '#34A853';
  
  // Calculate maximum value for y-axis scale
  let maxValue = 0;
  categories.forEach(category => {
    const categoryEstimated = category.items ? 
      category.items.reduce((sum: number, item: any) => sum + (item.estimatedCost || 0), 0) : 0;
    
    const categoryActual = category.items ? 
      category.items.reduce((sum: number, item: any) => sum + (item.actualCost || 0), 0) : 0;
    
    maxValue = Math.max(maxValue, categoryEstimated, categoryActual);
  });
  
  // Add 10% padding to max value
  maxValue = maxValue * 1.1;
  
  // Generate y-axis ticks
  const yTicks = 5;
  let yAxisTicks = '';
  let yAxisLines = '';
  
  for (let i = 0; i <= yTicks; i++) {
    const y = padding.top + chartHeight - (i / yTicks) * chartHeight;
    const value = (i / yTicks) * maxValue;
    
    // Format value as currency
    const formattedValue = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
    
    // Add tick mark and label
    yAxisTicks += `
      <line x1="${padding.left - 5}" y1="${y}" x2="${padding.left}" y2="${y}" stroke="black" />
      <text x="${padding.left - 10}" y="${y}" text-anchor="end" alignment-baseline="middle" font-size="12">${formattedValue}</text>
    `;
    
    // Add horizontal grid line
    yAxisLines += `
      <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="#eaeaea" stroke-width="1" />
    `;
  }
  
  // Generate bars and x-axis labels
  let bars = '';
  let xAxisLabels = '';
  
  const barWidth = chartWidth / (categories.length * 3); // Each category gets 2 bars with spacing
  
  categories.forEach((category, index) => {
    // Calculate total estimated and actual costs for this category
    const categoryEstimated = category.items ? 
      category.items.reduce((sum: number, item: any) => sum + (item.estimatedCost || 0), 0) : 0;
    
    const categoryActual = category.items ? 
      category.items.reduce((sum: number, item: any) => sum + (item.actualCost || 0), 0) : 0;
    
    // Calculate bar heights
    const estimatedHeight = (categoryEstimated / maxValue) * chartHeight;
    const actualHeight = (categoryActual / maxValue) * chartHeight;
    
    // Calculate bar positions
    const xPosition = padding.left + (index * 3 * barWidth);
    const estimatedX = xPosition + barWidth / 2;
    const actualX = xPosition + barWidth * 1.5;
    
    // Add bars
    bars += `
      <rect x="${estimatedX}" y="${padding.top + chartHeight - estimatedHeight}" width="${barWidth}" height="${estimatedHeight}" fill="${estimatedColor}" />
      <rect x="${actualX}" y="${padding.top + chartHeight - actualHeight}" width="${barWidth}" height="${actualHeight}" fill="${actualColor}" />
    `;
    
    // Add x-axis label
    xAxisLabels += `
      <text x="${xPosition + barWidth * 1.5}" y="${height - padding.bottom + 20}" text-anchor="middle" font-size="12">${category.name}</text>
    `;
  });
  
  // Generate legend
  const legend = `
    <rect x="${padding.left}" y="${height - 20}" width="15" height="15" fill="${estimatedColor}" />
    <text x="${padding.left + 20}" y="${height - 10}" alignment-baseline="middle" font-size="12">Estimated</text>
    
    <rect x="${padding.left + 100}" y="${height - 20}" width="15" height="15" fill="${actualColor}" />
    <text x="${padding.left + 120}" y="${height - 10}" alignment-baseline="middle" font-size="12">Actual</text>
  `;
  
  // Generate complete SVG
  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <!-- Grid lines -->
      ${yAxisLines}
      
      <!-- Y-axis -->
      <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${height - padding.bottom}" stroke="black" />
      ${yAxisTicks}
      
      <!-- X-axis -->
      <line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="black" />
      ${xAxisLabels}
      
      <!-- Bars -->
      ${bars}
      
      <!-- Legend -->
      ${legend}
    </svg>
  `;
}
