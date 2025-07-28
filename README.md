# Research Portal - React Application

A modern React-based research portal for submitting, reviewing, and managing academic research papers. Built with React, React Router, and Tailwind CSS.

## Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Paper Submission**: Complete form with drag-and-drop file upload
- **Paper Browsing**: Search and filter through submitted papers
- **Guidelines**: Comprehensive submission guidelines with interactive tabs
- **Contact System**: Contact form with validation
- **FAQ System**: Expandable FAQ sections
- **Research Tools**: Curated list of research tools and resources
- **Ethics Guidelines**: Publication ethics and standards
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **React 18**: Modern React with hooks and functional components
- **React Router 6**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and development server
- **Font Awesome**: Icons
- **Google Fonts**: Poppins font family

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd researchportal
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

```
researchportal/
├── public/
│   ├── image/           # Static images
│   └── index.html       # Main HTML file
├── src/
│   ├── components/      # Reusable components
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── Submit.jsx
│   │   ├── Papers.jsx
│   │   ├── Guidelines.jsx
│   │   ├── Contact.jsx
│   │   ├── FAQs.jsx
│   │   ├── Tools.jsx
│   │   ├── Ethics.jsx
│   │   ├── Privacy.jsx
│   │   └── Terms.jsx
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Key Features Explained

### 1. Paper Submission (`/submit`)
- Form validation with real-time feedback
- Drag-and-drop file upload (PDF only)
- Word count tracking for abstracts
- Progress bar for file uploads
- Success modal with submission confirmation

### 2. Paper Browsing (`/papers`)
- Search functionality (title, authors, keywords)
- Category and status filtering
- Pagination for large datasets
- Modal for detailed paper information
- Mock data for demonstration

### 3. Guidelines (`/guidelines`)
- Tabbed interface for different guideline types
- Expandable accordion sections
- Interactive content organization

### 4. Contact System (`/contact`)
- Contact form with validation
- Contact information display
- Social media links
- FAQ section

## Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the design by:
- Modifying `tailwind.config.js` for theme changes
- Updating `src/index.css` for custom styles
- Changing color schemes in the Tailwind config

### Content
- Update content in individual page components
- Modify navigation links in `Header.jsx` and `Footer.jsx`
- Add new pages by creating components and updating routes in `App.jsx`

### Backend Integration
The application is currently set up with mock data. To integrate with a backend:
- Update API endpoints in the components
- Replace mock data with actual API calls
- Implement proper error handling
- Add authentication if required

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact:
- Email: support@researchportal.edu
- Phone: +1 (555) 123-4567

## Acknowledgments

- Original HTML/CSS/JS frontend converted to React
- Tailwind CSS for styling
- Font Awesome for icons
- Google Fonts for typography 