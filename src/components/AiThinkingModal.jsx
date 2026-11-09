import React from 'react';
import { useVideoProject } from '../context/VideoProjectContext';
import { Sparkles, Bot, Loader2 } from 'lucide-react';

export const AiThinkingModal = () => {
  const { isAiLoading, aiLoadingMessage } = useVideoProject();

  if (!isAiLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md transition-all animate-fadeIn">
      <div className="bg-slate-900 border border-violet-500/30 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl shadow-violet-500/20 text-center relative overflow-hidden">

        {/* Background glow effects */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/40 mb-5 relative">
            <Bot className="w-8 h-8 text-white animate-bounce" />
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center space-x-2">
            <span>AI Copilot at Work</span>
            <Loader2 className="w-5 h-5 text-violet-400 animate-spin" />
          </h3>

          <p className="text-sm text-slate-300 px-4 py-2 bg-slate-800/80 rounded-xl border border-slate-700/50">
            {aiLoadingMessage}
          </p>

          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-6 overflow-hidden">
            <div className="bg-gradient-to-r from-violet-500 to-indigo-500 h-full w-full animate-pulse rounded-full" />
          </div>

          <p className="text-xs text-slate-500 mt-4">
            Utilizing neural multimodal AI models for instant generation
          </p>
        </div>
      </div>
    </div>
  );
};
