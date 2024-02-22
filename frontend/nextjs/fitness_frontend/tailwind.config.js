/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'text': {
          50: '#f2f2f2',
          100: '#e6e6e6',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4d4d4d',
          800: '#333333',
          900: '#1a1a1a',
          950: '#0d0d0d',
        },
        'background': {
          50: '#f2f2f2',
          100: '#e6e6e6',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4d4d4d',
          800: '#333333',
          900: '#1a1a1a',
          950: '#0a0a0a',
        },
        'primary': {
          50: '#e9edfc',
          100: '#d2dbf9',
          200: '#a5b7f3',
          300: '#7893ed',
          400: '#4b70e7',
          500: '#1f4ce0',
          600: '#183db4',
          700: '#122d87',
          800: '#0c1e5a',
          900: '#060f2d',
          950: '#030816',
        },
        'secondary': {
          50: '#f1f2f3',
          100: '#e4e5e7',
          200: '#c8cbd0',
          300: '#adb2b8',
          400: '#9298a0',
          500: '#777e88',
          600: '#5f656d',
          700: '#474c52',
          800: '#2f3237',
          900: '#18191b',
          950: '#0c0d0e',
        },
        'accent': {
          50: '#ebeff9',
          100: '#d8dff3',
          200: '#b0bee8',
          300: '#899edc',
          400: '#627dd0',
          500: '#3b5dc4',
          600: '#2f4a9d',
          700: '#233876',
          800: '#17254f',
          900: '#0c1327',
          950: '#060914',
        },
       },
       
      
    },
        fontFamily: {
      'body': [
    'Inter', 
    'ui-sans-serif', 
    'system-ui', 
    '-apple-system', 
    'system-ui', 
    'Segoe UI', 
    'Roboto', 
    'Helvetica Neue', 
    'Arial', 
    'Noto Sans', 
    'sans-serif', 
    'Apple Color Emoji', 
    'Segoe UI Emoji', 
    'Segoe UI Symbol', 
    'Noto Color Emoji',
    'outfit'
  ],
      'sans': [
    'Inter', 
    'ui-sans-serif', 
    'system-ui', 
    '-apple-system', 
    'system-ui', 
    'Segoe UI', 
    'Roboto', 
    'Helvetica Neue', 
    'Arial', 
    'Noto Sans', 
    'sans-serif', 
    'Apple Color Emoji', 
    'Segoe UI Emoji', 
    'Segoe UI Symbol', 
    'Noto Color Emoji',
    
  ],
  'outfit':[
'Outfit'
  ]
    }

  },
  plugins: [require("flowbite/plugin")],
   
};
