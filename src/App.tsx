
import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ProjectsPage from './components/ProjectsPage';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WelcomeOverlay from './components/WelcomeOverlay';
import ThemePreferences from './components/ThemePreferences';
import StructuredData from './components/StructuredData';
import { useSEO } from './hooks/useSEO';
import { getPageSEO } from './utils/seo';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'projects'>('home');
  const [showWelcome, setShowWelcome] = useState(true);
  const [showThemePreferences, setShowThemePreferences] = useState(false);

  // SEO optimization based on current page
  const seoData = getPageSEO(currentPage);
  useSEO(seoData);

  // Add performance monitoring and analytics
  useEffect(() => {
    // Performance monitoring
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (perfData) {
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart);
          }
        }, 0);
      });
    }

    // Add viewport meta tag for mobile optimization
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');
    }
  }, []);

  return (
    <ThemeProvider>
      {/* Structured Data */}
      <StructuredData type="person" />
      <StructuredData type="website" />
      
      {showWelcome && (
        <WelcomeOverlay onFinish={() => setShowWelcome(false)} />
      )}
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {currentPage === 'home' ? (
          <>
            <Navbar 
              onNavigateToProjects={() => setCurrentPage('projects')}
              onOpenThemePreferences={() => setShowThemePreferences(true)}
            />
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects onNavigateToAllProjects={() => setCurrentPage('projects')} />
              <Experience />
              <Contact />
            </main>
            <Footer />
          </>
        ) : (
          <>
            <Navbar 
              onNavigateToHome={() => setCurrentPage('home')}
              onOpenThemePreferences={() => setShowThemePreferences(true)}
            />
            <ProjectsPage />
          </>
        )}
        
        {/* Theme Preferences Modal */}
        <ThemePreferences 
          isOpen={showThemePreferences} 
          onClose={() => setShowThemePreferences(false)} 
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
