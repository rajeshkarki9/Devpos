import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const LearningContext = createContext();

export function LearningProvider({ children }) {
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem('gitmastery_completed_lessons');
      return saved ? JSON.parse(saved) : ['intro-vcs'];
    } catch {
      return ['intro-vcs'];
    }
  });

  const [bookmarkedCommands, setBookmarkedCommands] = useState(() => {
    try {
      const saved = localStorage.getItem('gitmastery_bookmarks');
      return saved ? JSON.parse(saved) : ['git-status', 'git-commit', 'git-push'];
    } catch {
      return ['git-status', 'git-commit'];
    }
  });

  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('gitmastery_completed_lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem('gitmastery_bookmarks', JSON.stringify(bookmarkedCommands));
  }, [bookmarkedCommands]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const toggleLessonCompleted = (lessonId) => {
    setCompletedLessons(prev => {
      const exists = prev.includes(lessonId);
      if (exists) {
        showToast('Lesson marked as incomplete', 'info');
        return prev.filter(id => id !== lessonId);
      } else {
        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 }
          });
        } catch (e) {
          // ignore if canvas-confetti issues
        }
        showToast('🎉 Lesson completed! Keep it up!', 'success');
        return [...prev, lessonId];
      }
    });
  };

  const isLessonCompleted = (lessonId) => completedLessons.includes(lessonId);

  const toggleBookmark = (commandId) => {
    setBookmarkedCommands(prev => {
      const exists = prev.includes(commandId);
      if (exists) {
        showToast('Removed from saved commands', 'info');
        return prev.filter(id => id !== commandId);
      } else {
        showToast('Saved to your command bookmarks! ⭐', 'success');
        return [...prev, commandId];
      }
    });
  };

  const isBookmarked = (commandId) => bookmarkedCommands.includes(commandId);

  const resetProgress = () => {
    setCompletedLessons([]);
    setBookmarkedCommands([]);
    showToast('Learning progress reset', 'info');
  };

  return (
    <LearningContext.Provider
      value={{
        completedLessons,
        toggleLessonCompleted,
        isLessonCompleted,
        bookmarkedCommands,
        toggleBookmark,
        isBookmarked,
        resetProgress,
        showToast,
        toastMessage
      }}
    >
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
}

