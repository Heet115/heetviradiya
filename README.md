# Modern Personal Portfolio Website

A beautiful, responsive personal portfolio website built with React, Vite, TailwindCSS, and Framer Motion.

## ✨ Features

- **Modern Design**: Clean, minimal design with soft shadows and rounded corners
- **Dark Mode**: Toggle between light and dark themes with smooth transitions
- **Responsive**: Fully optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Beautiful scroll-triggered animations using Framer Motion
- **Interactive Components**: Hover effects, transitions, and micro-interactions
- **Contact Form**: Functional contact form with validation (UI only)
- **Project Showcase**: Cards with image previews, tech stacks, and links
- **Timeline**: Professional experience and education timeline
- **Skills Section**: Organized skill cards with icons and descriptions

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Built With

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation with mobile menu
│   ├── Hero.tsx        # Hero section with CTA buttons
│   ├── About.tsx       # About section with profile
│   ├── Skills.tsx      # Skills grid with icons
│   ├── SkillCard.tsx   # Individual skill card component
│   ├── Projects.tsx    # Projects showcase
│   ├── ProjectCard.tsx # Individual project card
│   ├── Experience.tsx  # Timeline for work/education
│   ├── Contact.tsx     # Contact form with validation
│   └── Footer.tsx      # Footer with social links
├── contexts/           # React contexts
│   └── ThemeContext.tsx # Dark/light theme management
├── App.tsx            # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles and utilities
```

## 🎨 Customization

### Personal Information
Update the following files with your information:

1. **Hero Section** (`src/components/Hero.tsx`):
   - Name and title
   - Introduction text
   - Social media links

2. **About Section** (`src/components/About.tsx`):
   - Profile photo (replace the Unsplash URL)
   - Bio and description
   - Skills list
   - Statistics (projects, experience, clients)

3. **Projects** (`src/components/Projects.tsx`):
   - Add your actual projects
   - Update images, descriptions, and links
   - Modify technology stacks

4. **Experience** (`src/components/Experience.tsx`):
   - Add your work experience
   - Update education background
   - Modify dates and descriptions

5. **Contact Information** (`src/components/Contact.tsx`):
   - Update email, phone, and location
   - Modify social media links

### Styling
- **Colors**: Modify the color palette in `src/index.css`
- **Fonts**: Update font imports in `index.html`
- **Components**: Customize component styles using Tailwind classes

### CV Download
Replace `public/cv.pdf` with your actual CV file.

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🌙 Dark Mode

The portfolio includes a fully functional dark mode toggle that:
- Saves user preference to localStorage
- Respects system preference on first visit
- Smooth transitions between themes
- Consistent styling across all components

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](issues).

## 📞 Support

If you have any questions or need help customizing the portfolio, feel free to reach out!

---

**Made with ❤️ using React, TailwindCSS, and Framer Motion**