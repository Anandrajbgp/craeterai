import React from 'react';
import { useVideoProject } from '../context/VideoProjectContext';
import {
  FileText,
  Mic,
  Layout,
  Type,
  Share2,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Video
} from 'lucide-react';

const STEPS = [
  { number: 1, label: 'Script', icon: FileText },
  { number: 2, label: 'Audio', icon: Mic },
  { number: 3, label: 'Storyboard', icon: Layout },
  { number: 4, label: 'Captions', icon: Type },
  { number: 5, label: 'Export & SEO', icon: Share2 }
];

export const Navbar = () => {
  const { activeStep, setActiveStep, topic } = useVideoProject();

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* App Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-violet-500/25">
            <Video className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg bg-gradient-to-r from-white via-slate-200 to-violet-400 bg-clip-text text-transparent">
                CreatorAI Suite
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/25 text-violet-300 border border-violet-500/30 font-medium">
                Pro v2.5
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate max-w-xs sm:max-w-sm">
              Project: <span className="text-slate-300 font-medium">{topic}</span>
            </p>
          </div>
        </div>

        {/* Wizard Progress Tracker */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.number;
            const isCompleted = activeStep > step.number;

            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(step.number)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30 ring-1 ring-violet-400'
                    : isCompleted
                    ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  isActive ? 'bg-white text-violet-600 font-bold' : isCompleted ? 'bg-violet-500/20 text-violet-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-4 h-4 text-violet-400" /> : step.number}
                </div>
                <span className="hidden lg:inline">{step.label}</span>
                {step.number < 5 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 hidden xl:block ml-1" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>AI Copilot Active</span>
          </div>

          <button
            onClick={() => setActiveStep(5)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold shadow-lg shadow-violet-500/20 transition-all duration-200 flex items-center space-x-1.5"
          >
            <span>Export Suite</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Mobile progress bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 bg-slate-900/90 border-t border-slate-800 text-xs text-slate-400">
        <span>Step {activeStep} of 5: <strong className="text-white">{STEPS[activeStep - 1].label}</strong></span>
        <div className="flex space-x-1">
          {STEPS.map(s => (
            <div
              key={s.number}
              className={`h-1.5 rounded-full transition-all ${
                s.number === activeStep ? 'w-6 bg-violet-500' : s.number < activeStep ? 'w-3 bg-violet-500/50' : 'w-3 bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>
    </header>
  );
};
