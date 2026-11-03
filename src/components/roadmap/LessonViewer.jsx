import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Award, 
  HelpCircle, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Check
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export default function LessonViewer({ lesson, onClose, onNextLesson, onPrevLesson, hasNext, hasPrev }) {
  const { isLessonCompleted, toggleLessonCompleted } = useLearning();
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  if (!lesson) return null;

  const completed = isLessonCompleted(lesson.id);

  const handleQuizSelect = (idx) => {
    if (!quizSubmitted) {
      setSelectedQuizAnswer(idx);
    }
  };

  const handleQuizSubmit = () => {
    if (selectedQuizAnswer !== null) {
      setQuizSubmitted(true);
      if (selectedQuizAnswer === lesson.quiz.correctAnswer && !completed) {
        toggleLessonCompleted(lesson.id);
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400">
                  {lesson.levelLabel} — Lesson {lesson.order}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  {lesson.estimatedTime}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {lesson.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleLessonCompleted(lesson.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  completed
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{completed ? 'Completed ✓' : 'Mark as Done'}</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 text-sm">
            {/* Learning Objectives Box */}
            <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Learning Objectives
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {lesson.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Structured Lesson Content Sections */}
            <div className="space-y-6">
              {lesson.sections.map((sec, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {sec.heading}
                  </h3>
                  {sec.text && (
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {sec.text}
                    </p>
                  )}
                  {sec.codeBlock && (
                    <div className="p-4 rounded-2xl bg-[#0d1117] border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                      {sec.codeBlock}
                    </div>
                  )}
                  {sec.bulletList && (
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pl-4 list-disc">
                      {sec.bulletList.map((item, bIdx) => (
                        <li key={bIdx} className="leading-relaxed">{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Interactive Knowledge Check Quiz */}
            {lesson.quiz && (
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  <HelpCircle className="w-4 h-4 text-git-500" />
                  <span>Knowledge Check: Quick Quiz</span>
                </div>

                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {lesson.quiz.question}
                </p>

                <div className="space-y-2">
                  {lesson.quiz.options.map((opt, idx) => {
                    const isSelected = selectedQuizAnswer === idx;
                    const isCorrect = idx === lesson.quiz.correctAnswer;
                    let btnStyle = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-git-500';

                    if (quizSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-800 dark:text-emerald-300 font-semibold';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-400 text-rose-800 dark:text-rose-300 line-through';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-git-50 dark:bg-git-950/60 border-git-500 text-git-600 dark:text-git-400 font-semibold';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleQuizSelect(idx)}
                        disabled={quizSubmitted}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {!quizSubmitted ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={selectedQuizAnswer === null}
                    className="px-4 py-2 rounded-xl bg-git-500 hover:bg-git-600 disabled:opacity-40 text-white text-xs font-bold transition shadow-xs"
                  >
                    Check Answer
                  </button>
                ) : (
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <strong>Explanation:</strong> {lesson.quiz.explanation}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Navigation Between Lessons */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
            <button
              onClick={onPrevLesson}
              disabled={!hasPrev}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Lesson</span>
            </button>

            <button
              onClick={onNextLesson}
              disabled={!hasNext}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-git-500 hover:bg-git-600 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-bold transition shadow-xs"
            >
              <span>Next Lesson</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

