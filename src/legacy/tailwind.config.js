/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Modern UI Brand Colors
        'primary': '#2C3E50',   // Deep Indigo
        'secondary': '#FF6B6B', // Vibrant Coral
        'tertiary': '#4ECDC4',  // Soft Teal
        
        // Occasion-Specific Colors
        'wedding': '#E83E8C',       // Romantic Rose
        'family-reunion': '#FFA000', // Warm Amber
        'corporate': '#3498DB',      // Professional Blue
        'milestone': '#9B59B6',      // Festive Purple
        
        // Original color scheme - keeping for backwards compatibility
        'ocean-blue': {
          600: '#1e7fc9',
          700: '#1a6baa',
        },
        'coral': {
          500: '#FF6B6B',
          600: '#e55c5c',
        },
        'sand': {
          100: '#f8f5f0',
        },
        'slate': {
          500: '#64748b',
          600: '#475569',
          700: '#334155',
        },
      },
      fontFamily: {
        'heading': ['"Playfair Display"', 'serif'],
        'subheading': ['Montserrat', 'sans-serif'],
        'body': ['"Open Sans"', 'sans-serif'],
        'accent': ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
}
