import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export default function Toast() {
  const { toastMessage } = useLearning();

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border backdrop-blur-md ${
              toastMessage.type === 'error'
                ? 'bg-rose-900/90 text-rose-100 border-rose-700/50'
                : toastMessage.type === 'info'
                ? 'bg-slate-900/90 text-slate-100 border-slate-700/50'
                : 'bg-slate-900/95 dark:bg-slate-800/95 text-white border-git-500/40 shadow-glow-git'
            }`}
          >
            {toastMessage.type === 'error' ? (
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            ) : toastMessage.type === 'info' ? (
              <Info className="w-5 h-5 text-sky-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-git-500 shrink-0" />
            )}
            <span className="text-sm font-medium">{toastMessage.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

