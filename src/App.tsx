
import { useState } from 'react';
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

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'projects'>('home');
  const [showWelcome, setShowWelcome] = useState(true);
  const [showThemePreferences, setShowThemePreferences] = useState(false);

  return (
    <ThemeProvider>
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
