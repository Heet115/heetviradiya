
import { useState, useEffect, lazy, Suspense, memo } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WelcomeOverlay from './components/WelcomeOverlay';
import StructuredData from './components/StructuredData';
import PerformanceMonitor from './components/PerformanceMonitor';
import { useSEO } from './hooks/useSEO';
import { usePerformance } from './hooks/usePerformance';
import { getPageSEO } from './utils/seo';

// Lazy load non-critical components for better initial load performance
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const ProjectsPage = lazy(() => import('./components/ProjectsPage'));
const Experience = lazy(() => import('./components/Experience'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const ThemePreferences = lazy(() => import('./components/ThemePreferences'));

// Loading component for better UX
const SectionLoader = memo(() => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
  </div>
));

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'projects'>('home');
  const [showWelcome, setShowWelcome] = useState(true);
  const [showThemePreferences, setShowThemePreferences] = useState(false);

  // SEO optimization based on current page
  const seoData = getPageSEO(currentPage);
  useSEO(seoData);
  
  // Performance monitoring
  usePerformance();

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
      {/* Performance Monitoring */}
      <PerformanceMonitor />
      
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
              <Suspense fallback={<SectionLoader />}>
                <About />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <Skills />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <Projects onNavigateToAllProjects={() => setCurrentPage('projects')} />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <Experience />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <Contact />
              </Suspense>
            </main>
            <Suspense fallback={<SectionLoader />}>
              <Footer />
            </Suspense>
          </>
        ) : (
          <>
            <Navbar 
              onNavigateToHome={() => setCurrentPage('home')}
              onOpenThemePreferences={() => setShowThemePreferences(true)}
            />
            <Suspense fallback={<SectionLoader />}>
              <ProjectsPage />
            </Suspense>
          </>
        )}
        
        {/* Theme Preferences Modal */}
        {showThemePreferences && (
          <Suspense fallback={null}>
            <ThemePreferences 
              isOpen={showThemePreferences} 
              onClose={() => setShowThemePreferences(false)} 
            />
          </Suspense>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
