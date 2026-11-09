import React, { useState } from 'react';
import { useVideoProject } from '../../context/VideoProjectContext';
import {
  Play,
  Pause,
  Image as ImageIcon,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Clock,
  Upload,
  Film,
  RefreshCw,
  Sliders
} from 'lucide-react';

const STOCK_IMAGES = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1626544827763-d516dce335e2?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1618172193763-c511deb635ca?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop'
];

export const Step3Storyboard = () => {
  const {
    setActiveStep,
    scenes,
    storyboardAssets,
    setStoryboardAssets,
    sceneDurations,
    setSceneDurations,
    generateStoryboardAssets
  } = useVideoProject();

  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  const [selectedSceneForEdit, setSelectedSceneForEdit] = useState(scenes[0]?.id || 'scene-1');
  const [aiImagePrompt, setAiImagePrompt] = useState('');

  const currentScene = scenes.find(s => s.id === selectedSceneForEdit) || scenes[0];

  const handleAiImageGen = () => {
    // Pick a random stock image as AI result
    const randomImg = STOCK_IMAGES[Math.floor(Math.random() * STOCK_IMAGES.length)];
    setStoryboardAssets({
      ...storyboardAssets,
      [selectedSceneForEdit]: randomImg
    });
    setAiImagePrompt('');
  };

  const handleDurationChange = (sceneId, delta) => {
    const current = sceneDurations[sceneId] || 8;
    const updated = Math.max(3, current + delta);
    setSceneDurations({
      ...sceneDurations,
      [sceneId]: updated
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Header Banner */}
      <div className="mb-8 bg-gradient-to-r from-violet-900/40 via-slate-900 to-indigo-950/40 border border-violet-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-violet-400 text-sm font-semibold mb-1">
              <span className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-xs">3</span>
              <span>STEP 3 OF 5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Visual Storyboard & Timeline
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              AI automatically matches visual cues to stock imagery or generative text-to-image placeholders. Customize visuals and scene durations on the timeline.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveStep(2)}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setActiveStep(4)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-violet-600/35 transition-all flex items-center space-x-2"
            >
              <span>To Captions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Side: Live Video Preview Player (7 cols) */}
        <div className="lg:col-span-7 space-y-6">

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Film className="w-5 h-5 text-violet-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Synced Video Preview</h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-violet-500/20 text-violet-300 font-medium border border-violet-500/30">
                Scene {activePreviewIndex + 1} of {scenes.length}
              </span>
            </div>

            {/* Video Player Display Container */}
            <div className="aspect-[9/16] sm:aspect-[16/9] max-h-[420px] w-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden relative flex items-center justify-center group shadow-2xl">
              <img
                src={storyboardAssets[scenes[activePreviewIndex]?.id] || STOCK_IMAGES[0]}
                alt="Scene visual preview"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-between p-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-violet-300 border border-slate-700">
                    Scene 0{activePreviewIndex + 1} ({scenes[activePreviewIndex]?.timestamp})
                  </span>
                  <span className="text-xs font-mono text-slate-300 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700">
                    Duration: {sceneDurations[scenes[activePreviewIndex]?.id] || 8}s
                  </span>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-sm sm:text-base font-semibold text-white bg-slate-950/70 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-800 inline-block shadow-lg">
                    "{scenes[activePreviewIndex]?.voiceover_text}"
                  </p>
                </div>
              </div>

              {/* Play Overlay Button */}
              {!isPlayingPreview && (
                <button
                  onClick={() => setIsPlayingPreview(true)}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-violet-600/90 hover:bg-violet-500 text-white flex items-center justify-center shadow-2xl shadow-violet-600/50 transition-all transform hover:scale-110"
                >
                  <Play className="w-8 h-8 ml-1" />
                </button>
              )}
            </div>

            {/* Player Controls */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsPlayingPreview(!isPlayingPreview)}
                  className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm shadow-lg shadow-violet-600/30 transition-all flex items-center space-x-2"
                >
                  {isPlayingPreview ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlayingPreview ? 'Pause Preview' : 'Play Sequence'}</span>
                </button>
                <button
                  onClick={() => setActivePreviewIndex((activePreviewIndex + 1) % scenes.length)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition-all"
                >
                  Next Scene
                </button>
              </div>

              <button
                onClick={generateStoryboardAssets}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition-all flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span>Auto-Fetch All AI Visuals</span>
              </button>
            </div>
          </div>

          {/* Timeline Track */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-violet-400" />
              <span>Scene Timeline Track</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {scenes.map((scene, idx) => {
                const isSelected = selectedSceneForEdit === scene.id;
                const asset = storyboardAssets[scene.id] || STOCK_IMAGES[0];
                const dur = sceneDurations[scene.id] || 8;

                return (
                  <div
                    key={scene.id}
                    onClick={() => {
                      setSelectedSceneForEdit(scene.id);
                      setActivePreviewIndex(idx);
                    }}
                    className={`rounded-xl border p-2 cursor-pointer transition-all relative overflow-hidden group ${
                      isSelected
                        ? 'border-violet-500 bg-violet-600/10 ring-1 ring-violet-500'
                        : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                    }`}
                  >
                    <div className="aspect-video w-full rounded-lg overflow-hidden mb-2 relative">
                      <img src={asset} alt="Thumbnail" className="w-full h-full object-cover" />
                      <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-slate-950/80 text-[10px] font-mono text-slate-200">
                        {dur}s
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">Scene 0{scene.scene_number}</span>
                      <span className="text-violet-400">{scene.timestamp.split(' - ')[0]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Side: Visual Asset Customizer & AI Image Prompt (5 cols) */}
        <div className="lg:col-span-5 space-y-6">

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center space-x-2">
              <ImageIcon className="w-5 h-5 text-violet-400" />
              <span>Edit Scene 0{currentScene.scene_number} Visual</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              {currentScene.visual_cue_description}
            </p>

            <div className="space-y-4">

              {/* Current Asset Thumbnail Preview */}
              <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-800 relative">
                <img
                  src={storyboardAssets[currentScene.id] || STOCK_IMAGES[0]}
                  alt="Active visual"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* AI Image Generation Input */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-violet-400 uppercase tracking-wider flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Text-to-Image Prompt</span>
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={aiImagePrompt}
                    onChange={(e) => setAiImagePrompt(e.target.value)}
                    placeholder="Describe custom image..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                  />
                  <button
                    onClick={handleAiImageGen}
                    className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm shadow-lg shadow-violet-600/25 transition-all shrink-0"
                  >
                    Generate
                  </button>
                </div>
              </div>

              {/* Duration Trim Control */}
              <div className="pt-4 border-t border-slate-800">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Scene Duration</span>
                  <span className="text-violet-400 font-mono">{sceneDurations[currentScene.id] || 8} Seconds</span>
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleDurationChange(currentScene.id, -1)}
                    className="w-10 h-10 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold border border-slate-800 flex items-center justify-center"
                  >
                    -1s
                  </button>
                  <input
                    type="range"
                    min="3"
                    max="30"
                    value={sceneDurations[currentScene.id] || 8}
                    onChange={(e) => setSceneDurations({ ...sceneDurations, [currentScene.id]: Number(e.target.value) })}
                    className="flex-1 accent-violet-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                  />
                  <button
                    onClick={() => handleDurationChange(currentScene.id, 1)}
                    className="w-10 h-10 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold border border-slate-800 flex items-center justify-center"
                  >
                    +1s
                  </button>
                </div>
              </div>

              {/* Quick Stock Selector */}
              <div className="pt-4 border-t border-slate-800">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Quick Stock Library Picker
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {STOCK_IMAGES.slice(0, 6).map((imgUrl, i) => (
                    <div
                      key={i}
                      onClick={() => setStoryboardAssets({ ...storyboardAssets, [currentScene.id]: imgUrl })}
                      className="aspect-video rounded-lg overflow-hidden border border-slate-800 hover:border-violet-500 cursor-pointer transition-all"
                    >
                      <img src={imgUrl} alt="Stock option" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Continue Button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setActiveStep(4)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-violet-600/35 transition-all flex items-center justify-center space-x-2"
            >
              <span>Continue to Auto-Captions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
