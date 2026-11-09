import React, { useState } from 'react';
import { useVideoProject } from '../../context/VideoProjectContext';
import {
  Sparkles,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Clock,
  Layers,
  Sliders,
  ArrowRight,
  RefreshCw,
  Film,
  CheckCircle2
} from 'lucide-react';

export const Step1Script = () => {
  const {
    topic,
    setTopic,
    platform,
    setPlatform,
    tone,
    setTone,
    duration,
    setDuration,
    scenes,
    setScenes,
    generateNewScript,
    setActiveStep
  } = useVideoProject();

  const [aiPromptInput, setAiPromptInput] = useState('');

  const handleAiRegenerate = () => {
    if (aiPromptInput.trim()) {
      setTopic(aiPromptInput);
    }
    generateNewScript();
  };

  const handleSceneChange = (id, field, value) => {
    setScenes(scenes.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleDeleteScene = (id) => {
    if (scenes.length <= 1) {
      alert("A video project must have at least one scene.");
      return;
    }
    const updated = scenes.filter(s => s.id !== id).map((s, idx) => ({
      ...s,
      scene_number: idx + 1
    }));
    setScenes(updated);
  };

  const handleAddScene = () => {
    const newScene = {
      id: 'scene-' + Date.now(),
      scene_number: scenes.length + 1,
      timestamp: `${scenes.length * 8}:00 - ${(scenes.length + 1) * 8}:00`,
      voiceover_text: "New voiceover script text goes here...",
      visual_cue_description: "Describe the visual or B-roll for this scene..."
    };
    setScenes([...scenes, newScene]);
  };

  const handleMoveScene = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= scenes.length) return;
    const updated = [...scenes];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
    // Reindex scene numbers
    const reindexed = updated.map((s, idx) => ({ ...s, scene_number: idx + 1 }));
    setScenes(reindexed);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Header Banner */}
      <div className="mb-8 bg-gradient-to-r from-violet-900/40 via-slate-900 to-indigo-950/40 border border-violet-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-violet-400 text-sm font-semibold mb-1">
              <span className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-xs">1</span>
              <span>STEP 1 OF 5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Idea & AI Script Generation
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Configure your core topic, target platform, tone, and duration. Let AI generate a professional multi-scene script or customize every line.
            </p>
          </div>

          <button
            onClick={() => setActiveStep(2)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-violet-600/35 transition-all flex items-center justify-center space-x-2 shrink-0"
          >
            <span>Proceed to Audio Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: AI Controls & Config */}
        <div className="lg:col-span-1 space-y-6">

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-violet-400" />
              <span>Project Parameters</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Core Topic / Prompt
                </label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all resize-none"
                  placeholder="Enter video topic, prompt, or hook..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Target Platform
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                >
                  <option>TikTok / Reels (9:16)</option>
                  <option>YouTube Shorts (9:16)</option>
                  <option>Long-form Video (16:9)</option>
                  <option>Instagram Carousel Video</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Tone of Voice
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-sm text-slate-100 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                  >
                    <option>Professional & Energetic</option>
                    <option>Funny & Sarcastic</option>
                    <option>Educational & Clear</option>
                    <option>Dramatic & Cinematic</option>
                    <option>Casual & Relatable</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-sm text-slate-100 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                  >
                    <option>30s</option>
                    <option>45s</option>
                    <option>60s</option>
                    <option>3m</option>
                    <option>5m</option>
                  </select>
                </div>
              </div>

              {/* AI Magic Box */}
              <div className="pt-4 border-t border-slate-800">
                <label className="block text-xs font-semibold text-violet-400 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Refinement Prompt</span>
                </label>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={aiPromptInput}
                    onChange={(e) => setAiPromptInput(e.target.value)}
                    placeholder="e.g. Add more humor to scene 2..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                  />
                  <button
                    onClick={handleAiRegenerate}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-violet-500/25 transition-all flex items-center justify-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Regenerate with AI</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-950/30 to-violet-950/30 border border-violet-500/20 rounded-2xl p-5 text-xs text-slate-300 space-y-2">
            <h4 className="font-semibold text-white flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Pro Tip</span>
            </h4>
            <p>
              You can manually edit any voiceover or visual cue below. Changes instantly synchronize with the Audio Studio and Visual Storyboard steps.
            </p>
          </div>

        </div>

        {/* Right Column: Interactive Script Scene Cards */}
        <div className="lg:col-span-2 space-y-6">

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Film className="w-5 h-5 text-violet-400" />
              <h2 className="text-lg font-bold text-white">Generated Scenes ({scenes.length})</h2>
            </div>

            <button
              onClick={handleAddScene}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition-all flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4 text-violet-400" />
              <span>Add Scene</span>
            </button>
          </div>

          <div className="space-y-4">
            {scenes.map((scene, index) => (
              <div
                key={scene.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xl transition-all relative group"
              >
                {/* Scene Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-lg bg-violet-500/20 text-violet-400 font-bold text-xs flex items-center justify-center border border-violet-500/30">
                      0{scene.scene_number}
                    </span>
                    <div className="flex items-center space-x-1.5 text-xs text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                      <Clock className="w-3.5 h-3.5 text-violet-400" />
                      <span>{scene.timestamp}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleMoveScene(index, -1)}
                      disabled={index === 0}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMoveScene(index, 1)}
                      disabled={index === scenes.length - 1}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteScene(scene.id)}
                      className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 ml-2"
                      title="Delete Scene"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Scene Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Voiceover Text (TTS)
                    </label>
                    <textarea
                      value={scene.voiceover_text}
                      onChange={(e) => handleSceneChange(scene.id, 'voiceover_text', e.target.value)}
                      rows={3}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Visual Cue & B-Roll Description
                    </label>
                    <textarea
                      value={scene.visual_cue_description}
                      onChange={(e) => handleSceneChange(scene.id, 'visual_cue_description', e.target.value)}
                      rows={3}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all resize-none"
                    />
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Bottom Proceed Bar */}
          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setActiveStep(2)}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-violet-600/35 transition-all flex items-center space-x-2"
            >
              <span>Continue to Audio Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
