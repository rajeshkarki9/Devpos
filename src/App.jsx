import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Toast from './components/layout/Toast';
import GlobalSearchModal from './components/layout/GlobalSearchModal';

// Views
import HomeView from './components/home/HomeView';
import CommandExplorer from './components/commands/CommandExplorer';
import AnimatedDemonstrations from './components/animations/AnimatedDemonstrations';
import InteractiveTerminal from './components/terminal/InteractiveTerminal';
import WorkflowVisualizer from './components/visualizer/WorkflowVisualizer';
import GitHubLearning from './components/github/GitHubLearning';
import LearningRoadmap from './components/roadmap/LearningRoadmap';
import EmergencyFixes from './components/emergency/EmergencyFixes';
import CheatSheet from './components/cheatsheet/CheatSheet';
import GitGlossary from './components/glossary/GitGlossary';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [activeDemoId, setActiveDemoId] = useState('git-init');

  // Listen to open-search-modal custom event from keyboard shortcut
  useEffect(() => {
    const handleOpenSearch = () => setSearchModalOpen(true);
    document.addEventListener('open-search-modal', handleOpenSearch);
    return () => document.removeEventListener('open-search-modal', handleOpenSearch);
  }, []);

  const handleNavigate = (section, params = {}) => {
    if (params.lessonId) {
      setActiveLessonId(params.lessonId);
    }
    if (params.demoId) {
      setActiveDemoId(params.demoId);
    }
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-light dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Sticky Top Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {activeSection === 'home' && (
              <HomeView onNavigate={handleNavigate} />
            )}

            {activeSection === 'commands' && (
              <CommandExplorer
                onNavigateToTerminal={(cmdName) => {
                  handleNavigate('terminal');
                }}
                onNavigateToDemos={(demoId) => {
                  handleNavigate('animations', { demoId });
                }}
              />
            )}

            {activeSection === 'animations' && (
              <AnimatedDemonstrations initialCommandId={activeDemoId} />
            )}

            {activeSection === 'terminal' && (
              <InteractiveTerminal />
            )}

            {activeSection === 'visualizer' && (
              <WorkflowVisualizer />
            )}

            {activeSection === 'github' && (
              <GitHubLearning />
            )}

            {activeSection === 'roadmap' && (
              <LearningRoadmap activeLessonId={activeLessonId} />
            )}

            {activeSection === 'emergency' && (
              <EmergencyFixes />
            )}

            {activeSection === 'cheatsheet' && (
              <CheatSheet />
            )}

            {activeSection === 'glossary' && (
              <GitGlossary />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Modals & Notifications */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigateSection={handleNavigate}
      />

      <Toast />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

