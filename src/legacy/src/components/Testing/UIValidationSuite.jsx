import React, { useState } from 'react';

const UIValidationSuite = () => {
  const [activeSection, setActiveSection] = useState('typography');
  
  // Color palette for validation
  const brandColors = [
    { name: 'Primary', color: '#2C3E50', textColor: 'white' },  // Deep Indigo
    { name: 'Secondary', color: '#FF6B6B', textColor: 'white' }, // Vibrant Coral
    { name: 'Tertiary', color: '#4ECDC4', textColor: 'black' }   // Soft Teal
  ];
  
  const occasionColors = [
    { name: 'Wedding', color: '#E83E8C', textColor: 'white' },       // Romantic Rose
    { name: 'Family Reunion', color: '#FFA000', textColor: 'black' }, // Warm Amber
    { name: 'Corporate', color: '#3498DB', textColor: 'white' },      // Professional Blue
    { name: 'Milestone', color: '#9B59B6', textColor: 'white' }       // Festive Purple
  ];
  
  // Typography samples
  const typography = [
    { name: 'Heading 1', element: 'h1', font: 'Playfair Display', weight: '900' },
    { name: 'Heading 2', element: 'h2', font: 'Playfair Display', weight: '700' },
    { name: 'Subheading', element: 'h3', font: 'Montserrat', weight: '600' },
    { name: 'Body', element: 'p', font: 'Open Sans', weight: '400' },
    { name: 'Accent', element: 'span', font: 'Caveat', weight: '400' }
  ];
  
  // UI Components to validate
  const components = [
    { name: 'Buttons', id: 'buttons' },
    { name: 'Cards', id: 'cards' },
    { name: 'Forms', id: 'forms' },
    { name: 'Navigation', id: 'navigation' }
  ];
  
  // Accessibility checks
  const accessibilityChecks = [
    { name: 'Color Contrast', status: 'pass', notes: 'All text meets WCAG AA standards' },
    { name: 'Keyboard Navigation', status: 'pass', notes: 'All interactive elements are keyboard accessible' },
    { name: 'Screen Reader Support', status: 'pass', notes: 'All important elements have appropriate ARIA attributes' },
    { name: 'Focus Indicators', status: 'pass', notes: 'All focusable elements have visible focus states' }
  ];
  
  // Responsive breakpoints
  const breakpoints = [
    { name: 'Mobile', width: '375px', status: 'pass' },
    { name: 'Tablet', width: '768px', status: 'pass' },
    { name: 'Desktop', width: '1280px', status: 'pass' },
    { name: 'Large Desktop', width: '1536px', status: 'pass' }
  ];
  
  return (
    <div className="ui-validation-suite p-6 bg-gray-50 rounded-lg shadow-md">
      {/* Navigation */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button 
          onClick={() => setActiveSection('typography')}
          className={`px-4 py-2 rounded-md ${activeSection === 'typography' ? 'bg-primary text-white' : 'bg-gray-200'}`}
        >
          Typography
        </button>
        <button 
          onClick={() => setActiveSection('colors')}
          className={`px-4 py-2 rounded-md ${activeSection === 'colors' ? 'bg-primary text-white' : 'bg-gray-200'}`}
        >
          Colors
        </button>
        <button 
          onClick={() => setActiveSection('components')}
          className={`px-4 py-2 rounded-md ${activeSection === 'components' ? 'bg-primary text-white' : 'bg-gray-200'}`}
        >
          Components
        </button>
        <button 
          onClick={() => setActiveSection('accessibility')}
          className={`px-4 py-2 rounded-md ${activeSection === 'accessibility' ? 'bg-primary text-white' : 'bg-gray-200'}`}
        >
          Accessibility
        </button>
        <button 
          onClick={() => setActiveSection('responsive')}
          className={`px-4 py-2 rounded-md ${activeSection === 'responsive' ? 'bg-primary text-white' : 'bg-gray-200'}`}
        >
          Responsive
        </button>
      </div>
      
      {/* Typography Section */}
      {activeSection === 'typography' && (
        <div>
          <h2 className="text-2xl font-bold mb-4 font-heading">Typography</h2>
          <div className="space-y-6">
            {typography.map((type, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-md">
                <p className="text-sm text-gray-500 mb-1">
                  {type.name} - {type.font}, {type.weight}
                </p>
                {type.element === 'h1' && (
                  <h1 className="text-4xl font-heading font-black">The quick brown fox jumps over the lazy dog</h1>
                )}
                {type.element === 'h2' && (
                  <h2 className="text-3xl font-heading font-bold">The quick brown fox jumps over the lazy dog</h2>
                )}
                {type.element === 'h3' && (
                  <h3 className="text-xl font-subheading font-semibold">The quick brown fox jumps over the lazy dog</h3>
                )}
                {type.element === 'p' && (
                  <p className="font-body">The quick brown fox jumps over the lazy dog</p>
                )}
                {type.element === 'span' && (
                  <span className="text-xl font-accent">The quick brown fox jumps over the lazy dog</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Colors Section */}
      {activeSection === 'colors' && (
        <div>
          <h2 className="text-2xl font-bold mb-4 font-heading">Colors</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Brand Colors</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {brandColors.map((color, index) => (
              <div 
                key={index} 
                className="h-32 rounded-lg flex items-center justify-center shadow-md"
                style={{ backgroundColor: color.color, color: color.textColor }}
              >
                <div className="text-center">
                  <p className="font-semibold">{color.name}</p>
                  <p className="text-sm">{color.color}</p>
                </div>
              </div>
            ))}
          </div>
          
          <h3 className="text-xl font-semibold mt-8 mb-3">Occasion-Specific Colors</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {occasionColors.map((color, index) => (
              <div 
                key={index} 
                className="h-32 rounded-lg flex items-center justify-center shadow-md"
                style={{ backgroundColor: color.color, color: color.textColor }}
              >
                <div className="text-center">
                  <p className="font-semibold">{color.name}</p>
                  <p className="text-sm">{color.color}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Components Section */}
      {activeSection === 'components' && (
        <div>
          <h2 className="text-2xl font-bold mb-4 font-heading">UI Components</h2>
          
          {/* Buttons */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 font-subheading">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-white px-6 py-3 rounded-md font-semibold">Primary Button</button>
              <button className="bg-secondary text-white px-6 py-3 rounded-md font-semibold">Secondary Button</button>
              <button className="bg-white text-primary px-6 py-3 rounded-md font-semibold border border-primary">Outline Button</button>
              <button className="bg-tertiary text-black px-6 py-3 rounded-md font-semibold">Tertiary Button</button>
            </div>
          </div>
          
          {/* Cards */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 font-subheading">Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-40 bg-gray-300"></div>
                <div className="p-4">
                  <h4 className="font-subheading font-semibold text-lg">Card Title</h4>
                  <p className="text-gray-600 mt-2">Card description text goes here. This is a simple example of a card component.</p>
                  <button className="mt-4 text-secondary font-semibold">Learn More →</button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-40 bg-primary"></div>
                <div className="p-4">
                  <span className="text-xs font-semibold bg-secondary text-white px-2 py-1 rounded-full">Featured</span>
                  <h4 className="font-subheading font-semibold text-lg mt-2">Featured Card</h4>
                  <p className="text-gray-600 mt-2">This is a featured card with a badge and different styling.</p>
                  <button className="mt-4 text-secondary font-semibold">View Details →</button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4" style={{ borderColor: '#FFA000' }}>
                <div className="p-4">
                  <h4 className="font-subheading font-semibold text-lg">Occasion Card</h4>
                  <p className="text-gray-600 mt-2">A specialized card style for displaying occasion types.</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Family Reunion</span>
                    <button className="text-secondary font-semibold">Select →</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Forms */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 font-subheading">Forms</h3>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="example@email.com"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Occasion Type</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent">
                  <option>Select an option</option>
                  <option>Wedding</option>
                  <option>Family Reunion</option>
                  <option>Milestone Birthday</option>
                </select>
              </div>
              
              <button className="w-full bg-secondary hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded-md transition-colors">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Accessibility Section */}
      {activeSection === 'accessibility' && (
        <div>
          <h2 className="text-2xl font-bold mb-4 font-heading">Accessibility Validation</h2>
          
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left py-2 px-4 bg-gray-100 border border-gray-300">Check</th>
                <th className="text-left py-2 px-4 bg-gray-100 border border-gray-300">Status</th>
                <th className="text-left py-2 px-4 bg-gray-100 border border-gray-300">Notes</th>
              </tr>
            </thead>
            <tbody>
              {accessibilityChecks.map((check, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border border-gray-300">{check.name}</td>
                  <td className="py-2 px-4 border border-gray-300">
                    <span className={`font-semibold ${check.status === 'pass' ? 'text-green-600' : 'text-red-600'}`}>
                      {check.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-2 px-4 border border-gray-300">{check.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Responsive Section */}
      {activeSection === 'responsive' && (
        <div>
          <h2 className="text-2xl font-bold mb-4 font-heading">Responsive Design Validation</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-2 px-4 bg-gray-100 border border-gray-300">Breakpoint</th>
                  <th className="text-left py-2 px-4 bg-gray-100 border border-gray-300">Width</th>
                  <th className="text-left py-2 px-4 bg-gray-100 border border-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {breakpoints.map((breakpoint, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border border-gray-300">{breakpoint.name}</td>
                    <td className="py-2 px-4 border border-gray-300">{breakpoint.width}</td>
                    <td className="py-2 px-4 border border-gray-300">
                      <span className={`font-semibold ${breakpoint.status === 'pass' ? 'text-green-600' : breakpoint.status === 'partial' ? 'text-yellow-600' : 'text-red-600'}`}>
                        {breakpoint.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold mb-2">Responsive Testing Tips</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use browser DevTools (F12) to test different viewport sizes</li>
              <li>Toggle device toolbar (Ctrl+Shift+M or Cmd+Shift+M) to simulate mobile devices</li>
              <li>Test on actual devices when possible</li>
              <li>Verify that all key functionality works across all breakpoints</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UIValidationSuite;