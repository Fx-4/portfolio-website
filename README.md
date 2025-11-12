# 🚀 Haikal Hifzhi Helmy - Personal Portfolio Website

A modern, responsive portfolio website showcasing my projects, skills, and professional journey as a UI/UX Designer & Frontend Developer.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://haikalhelmy.vercel.app/)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-purple)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## ✨ Features

- **Modern UI/UX**: Clean, professional design with smooth animations
- **Responsive Design**: Fully responsive across all devices and screen sizes
- **Dark/Light Theme**: Automatic theme switching with manual override
- **Performance Optimized**: Code splitting, lazy loading, and optimized assets
- **SEO Friendly**: Comprehensive meta tags and sitemap for better search engine visibility
- **Accessible**: ARIA labels and semantic HTML for better accessibility
- **Smooth Animations**: Framer Motion, AOS, and GSAP for fluid interactions
- **Contact Form**: Integrated contact form (ready for backend integration)
- **404 Page**: Custom 404 error page with navigation
- **Error Boundary**: Graceful error handling with fallback UI

## 🛠️ Built With

### Core Technologies
- **React 18.3.1** - UI library
- **Vite 5.4.19** - Build tool and dev server
- **React Router 7.1.1** - Client-side routing

### Styling & Animation
- **Framer Motion** - Animation library
- **AOS (Animate On Scroll)** - Scroll animations
- **GSAP** - Professional-grade animations
- **React Spring** - Physics-based animations
- **CSS Variables** - Dynamic theming

### Icons & Assets
- **Lucide React** - Beautiful icon library
- **Simple Icons** - Brand icons
- **React Icon Cloud** - 3D icon cloud visualization

### Development Tools
- **ESLint** - Code linting
- **PropTypes** - Runtime type checking
- **Git** - Version control

## 📁 Project Structure

```
website-portofolio/
├── public/               # Static assets
│   ├── robots.txt       # Search engine instructions
│   └── sitemap.xml      # Site map for SEO
├── src/
│   ├── api/             # API routes (contact form)
│   ├── assets/          # Images, PDFs, and other media
│   │   ├── images/      # Project screenshots
│   │   ├── profile/     # Profile photos
│   │   └── resume/      # Resume PDF
│   ├── components/      # React components
│   │   ├── AboutSection.jsx
│   │   ├── ContactSection.jsx
│   │   ├── EducationTimeline.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── FAQ.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Loading.jsx
│   │   ├── Navbar.jsx
│   │   ├── NotFound.jsx
│   │   └── ...
│   ├── constants/       # App-wide constants
│   │   └── social.js    # Social media links
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   ├── styles/          # CSS files
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main app component
│   ├── App.css          # Global styles
│   └── main.jsx         # Entry point
├── .gitignore           # Git ignore rules
├── eslint.config.js     # ESLint configuration
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── README.md            # Project documentation
└── vite.config.js       # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 16.x
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Fx-4/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

## 📧 Contact Form Setup

The contact form currently logs submissions to the console. To enable email functionality:

1. **Install backend dependencies**
   ```bash
   npm install nodemailer
   ```

2. **Create `.env.local` file**
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

3. **Configure email service**
   - Update `api/contact.js` with your SMTP settings
   - For Gmail, enable "Less secure app access" or use App Passwords

## 🎨 Customization

### Update Personal Information

Edit `src/constants/social.js`:
```javascript
export const SOCIAL_LINKS = {
  email: 'your.email@example.com',
  linkedin: 'https://linkedin.com/in/yourprofile',
  github: 'https://github.com/yourusername',
  instagram: 'https://instagram.com/yourhandle',
};
```

### Update SEO Metadata

Edit `index.html` meta tags:
```html
<title>Your Name - Portfolio</title>
<meta name="description" content="Your description" />
```

### Change Theme Colors

Edit CSS variables in `src/App.css`:
```css
:root {
  --brand-primary: #your-color;
  --background: #your-background;
  /* ... other variables */
}
```

## 📱 Pages

- **Home** (`/`) - Landing page with hero section and featured projects
- **About** (`/about`) - Detailed about section with education timeline
- **Projects** (`/projects`) - Portfolio showcase with project details
- **Contact** (`/contact`) - Contact form and social links
- **404** (`*`) - Custom 404 error page

## 🌟 Key Features Breakdown

### Performance Optimizations
- ✅ Code splitting with React.lazy()
- ✅ Route-based lazy loading
- ✅ Image lazy loading
- ✅ CSS optimizations
- ✅ Vite's built-in optimizations

### SEO Optimizations
- ✅ Meta tags for social media (Open Graph, Twitter Cards)
- ✅ robots.txt configuration
- ✅ XML sitemap
- ✅ Semantic HTML
- ✅ Proper heading hierarchy

### Accessibility Features
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Alt text for images
- ✅ Color contrast compliance

## 🐛 Known Issues

- Proxy errors in dev mode (`/api/ping`) are expected when no backend is running
- Large image files should be optimized before production deployment
- Contact form requires backend configuration for email functionality

## 📝 To-Do / Future Enhancements

- [ ] Add blog section
- [ ] Implement CMS for easy content updates
- [ ] Add analytics (Google Analytics / Plausible)
- [ ] Optimize image sizes
- [ ] Add unit tests
- [ ] Implement i18n (internationalization)
- [ ] Add progressive web app (PWA) support

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Haikal Hifzhi Helmy**

- LinkedIn: [@haikal-helmy-875787305](https://linkedin.com/in/haikal-helmy-875787305)
- GitHub: [@Fx-4](https://github.com/Fx-4)
- Instagram: [@haikalhelmy](https://instagram.com/haikalhelmy)
- Email: Haikalhelmy12@gmail.com

## 🙏 Acknowledgments

- Design inspiration from [Awwwards](https://awwwards.com/)
- Icons from [Lucide](https://lucide.dev/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Fonts from [Google Fonts](https://fonts.google.com/)

---

⭐ **If you found this project helpful, please give it a star!** ⭐

Made with ❤️ by [Haikal Hifzhi Helmy](https://haikalhelmy.vercel.app/)
