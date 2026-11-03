import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  ArrowRight, 
  RotateCcw, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { LESSON_LEVELS, LESSONS_DATA } from '../../data/lessonsData';
import { useLearning } from '../../context/LearningContext';
import LessonViewer from './LessonViewer';

export default function LearningRoadmap({ activeLessonId }) {
  const { completedLessons, isLessonCompleted, resetProgress } = useLearning();
  const [selectedLesson, setSelectedLesson] = useState(() => {
    if (activeLessonId) {
      return LESSONS_DATA.find(l => l.id === activeLessonId) || null;
    }
    return null;
  });

  const totalLessons = LESSONS_DATA.length;
  const completedCount = completedLessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const currentLessonIndex = selectedLesson 
    ? LESSONS_DATA.findIndex(l => l.id === selectedLesson.id) 
    : -1;

  const handleNextLesson = () => {
    if (currentLessonIndex < LESSONS_DATA.length - 1) {
      setSelectedLesson(LESSONS_DATA[currentLessonIndex + 1]);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setSelectedLesson(LESSONS_DATA[currentLessonIndex - 1]);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Page Header & Progress Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1.5 rounded-lg bg-git-50 dark:bg-git-950/60 text-git-600 dark:text-git-400">
                <Award className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-git-600 dark:text-git-400">
                Structured Curriculum
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Beginner to Advanced Learning Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              15 comprehensive lessons designed to take you from your very first terminal command to master-level rebasing, cherry-picking, and professional team workflows.
            </p>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to reset your lesson progress?')) {
                resetProgress();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Progress</span>
          </button>
        </div>

        {/* Progress Tracker Bar */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">
              Overall Roadmap Progress
            </span>
            <span className="font-mono font-bold text-git-500">
              {progressPercent}% Complete ({completedCount}/{totalLessons} Lessons)
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-git-500 via-amber-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Levels Curriculum */}
      <div className="space-y-8">
        {LESSON_LEVELS.map((level) => {
          const levelLessons = LESSONS_DATA.filter(l => l.level === level.id);
          const levelCompletedCount = levelLessons.filter(l => isLessonCompleted(l.id)).length;

          return (
            <div key={level.id} className="space-y-4">
              {/* Level Group Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-git-500" />
                    {level.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {level.description}
                  </p>
                </div>

                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 w-fit">
                  {levelCompletedCount}/{levelLessons.length} Completed
                </span>
              </div>

              {/* Lessons Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {levelLessons.map((lesson) => {
                  const completed = isLessonCompleted(lesson.id);
                  return (
                    <div
                      key={lesson.id}
                      onClick={() => setSelectedLesson(lesson)}
                      className={`p-5 rounded-2xl border transition group cursor-pointer flex flex-col justify-between ${
                        completed
                          ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300/60 dark:border-emerald-800/60'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-git-500/50 shadow-xs'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            Lesson {lesson.order}
                          </span>
                          <div className="flex items-center gap-1 text-[11px] text-slate-400">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{lesson.estimatedTime}</span>
                          </div>
                        </div>

                        <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-git-600 dark:group-hover:text-git-400 transition">
                          {lesson.title}
                        </h4>

                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                          {lesson.summary}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                        {completed ? (
                          <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 text-[11px]">
                            <CheckCircle2 className="w-4 h-4" />
                            Completed
                          </span>
                        ) : (
                          <span className="text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 font-medium">
                            Start lesson
                          </span>
                        )}

                        <span className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:text-git-500 group-hover:bg-git-50 dark:group-hover:bg-git-950 transition">
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lesson Viewer Modal */}
      <LessonViewer
        lesson={selectedLesson}
        onClose={() => setSelectedLesson(null)}
        onNextLesson={handleNextLesson}
        onPrevLesson={handlePrevLesson}
        hasNext={currentLessonIndex < LESSONS_DATA.length - 1}
        hasPrev={currentLessonIndex > 0}
      />
    </div>
  );
}

