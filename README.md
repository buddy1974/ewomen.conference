# E-WOMAN Conference 2026

**Official website for E-WOMAN 2026 — The Excelling Woman Conference**

March 13–14, 2026 | Hilton Hotel, Yaoundé, Cameroon

## Project Overview

This is a React-based conference website built for the E-WOMAN 2026 women's empowerment conference. The site features speaker profiles, event schedules, registration information, and multimedia galleries.

## Tech Stack

This project is built with:

- **Vite** - Fast build tool and dev server
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd ewomen.conference

# Install dependencies
npm install

# Start the development server
npm run dev
```

The development server will start at `http://localhost:8080`

## Available Scripts

```sh
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run linter
npm run lint
```

## Project Structure

```
├── public/              # Static assets
│   ├── images/         # Conference images
│   └── content.json    # Dynamic content data
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React context providers
│   ├── pages/          # Page components
│   └── main.tsx        # Application entry point
├── index.html          # HTML template
└── vite.config.ts      # Vite configuration
```

## Content Management

Site content is managed through `/public/content.json`. Update this file to modify:
- Speaker information
- Event schedules
- Registration details
- Contact information
- Gallery images

## Deployment

### Build

```sh
npm run build
```

The optimized production files will be output to the `dist/` directory.

### Deploy

The `dist/` folder can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Azure Static Web Apps

## Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dynamic content loading via JSON
- ✅ Speaker profiles with detailed bios
- ✅ Interactive event schedule
- ✅ Photo gallery with lightbox
- ✅ Registration integration
- ✅ WhatsApp contact integration
- ✅ SEO optimized

## Contact

**E-WOMAN Conference 2026**
- Website: https://e-womanconference.online
- Email: info@e-womanconference.online
- WhatsApp: +237 6 97 31 77 37
- Location: Hilton Hotel, Yaoundé, Cameroon

---

© 2026 E-WOMAN Conference. All rights reserved.
