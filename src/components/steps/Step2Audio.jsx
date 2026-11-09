import React, { useState } from 'react';
import { useVideoProject } from '../../context/VideoProjectContext';
import {
  Play,
  Pause,
  Volume2,
  Mic,
  Music,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Sliders,
  Check,
  Radio,
  Disc
} from 'lucide-react';

const VOICES = [
  { id: 'rachel', name: 'Rachel (Warm & Engaging)', gender: 'Female', accent: 'US American', sample: 'Ideal for tech & lifestyle shorts' },
  { id: 'adam', name: 'Adam (Deep & Professional)', gender: 'Male', accent: 'US American', sample: 'Great for documentaries & business' },
  { id: 'antoni', name: 'Antoni (Energetic & Dynamic)', gender: 'Male', accent: 'British', sample: 'High retention for TikTok & Reels' },
  { id: 'domi', name: 'Domi (Confident & Bold)', gender: 'Female', accent: 'Australian', sample: 'Perfect for marketing & storytelling' }
];

const BGM_TRACKS = [
  { id: 'bgm-1', name: 'Cyberpunk Lofi Beats', mood: 'Chill / Tech', duration: '2:15' },
  { id: 'bgm-2', name: 'Upbeat Corporate Corporate', mood: 'Inspiring / Fast', duration: '1:45' },
  { id: 'bgm-3', name: 'Cinematic Epic Trailer', mood: 'Dramatic / Bold', duration: '2:30' },
  { id: 'bgm-4', name: 'Minimalist Acoustic Guitar', mood: 'Warm / Organic', duration: '2:00' }
];

export const Step2Audio = () => {
  const {
    setActiveStep,
    selectedVoice,
    setSelectedVoice,
    bgmTrack,
    setBgmTrack,
    voiceVolume,
    setVoiceVolume,
    bgmVolume,
    setBgmVolume,
    generateAudioAssets,
    scenes
  } = useVideoProject();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecordingScene, setIsRecordingScene] = useState(null);
  const [recordedScenes, setRecordedScenes] = useState({});

  const handleGenerateAudio = () => {
    generateAudioAssets();
  };

  const handleToggleRecord = (sceneId) => {
    if (isRecordingScene === sceneId) {
      setIsRecordingScene(null);
      setRecordedScenes({ ...recordedScenes, [sceneId]: true });
    } else {
      setIsRecordingScene(sceneId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Header Banner */}
      <div className="mb-8 bg-gradient-to-r from-violet-900/40 via-slate-900 to-indigo-950/40 border border-violet-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-violet-400 text-sm font-semibold mb-1">
              <span className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-xs">2</span>
              <span>STEP 2 OF 5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Voicover & Audio Studio
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Convert your script into studio-grade AI neural voices, mix custom background music tracks, or record voiceovers per scene.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveStep(1)}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setActiveStep(3)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-violet-600/35 transition-all flex items-center space-x-2"
            >
              <span>To Storyboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Side: Audio Waveform Preview Player & Scene Audio List (7 cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Main Waveform Player Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Live Audio Preview</h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-violet-500/20 text-violet-300 font-medium border border-violet-500/30">
                {selectedVoice.split(' ')[0]} + {bgmTrack}
              </span>
            </div>

            {/* Waveform Visualization Mock */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 mb-6 flex flex-col items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 via-transparent to-indigo-600/5 pointer-events-none" />

              <div className="flex items-center space-x-1 h-20 w-full justify-center px-4">
                {Array.from({ length: 42 }).map((_, i) => {
                  const height = Math.sin(i * 0.4) * 35 + 40 + (i % 3 === 0 ? 15 : -10);
                  return (
                    <div
                      key={i}
                      className={`w-1.5 rounded-full transition-all duration-300 ${
                        isPlaying && i < 28 ? 'bg-gradient-to-t from-violet-600 to-indigo-400 animate-pulse' : 'bg-slate-800'
                      }`}
                      style={{ height: `${Math.max(12, Math.min(75, height))}px` }}
                    />
                  );
                })}
              </div>

              <div className="flex items-center justify-between w-full mt-4 text-xs text-slate-400 px-2">
                <span>0:00</span>
                <span className="font-mono text-violet-400 font-semibold">{isPlaying ? 'Playing Audio Mix...' : 'Ready to Preview'}</span>
                <span>0:45</span>
              </div>
            </div>

            {/* Play/Pause & AI Synthesize Controls */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm shadow-lg shadow-violet-600/30 transition-all flex items-center space-x-2"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Pause Audio Mix' : 'Play Full Audio Mix'}</span>
              </button>

              <button
                onClick={handleGenerateAudio}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span>Re-Synthesize TTS</span>
              </button>
            </div>
          </div>

          {/* Scene-by-Scene Audio Overrides */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center space-x-2">
              <Mic className="w-5 h-5 text-violet-400" />
              <span>Scene Voiceover & Overrides ({scenes.length})</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Review synthesized voiceover per scene or click record to overwrite individual audio segments with your own microphone.
            </p>

            <div className="space-y-4">
              {scenes.map((scene) => {
                const isRecording = isRecordingScene === scene.id;
                const hasRecorded = recordedScenes[scene.id];

                return (
                  <div
                    key={scene.id}
                    className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">
                          Scene 0{scene.scene_number}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{scene.timestamp}</span>
                        {hasRecorded && (
                          <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-medium border border-emerald-500/30">
                            Custom Mic Recorded
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-1 italic">
                        "{scene.voiceover_text}"
                      </p>
                    </div>

                    <button
                      onClick={() => handleToggleRecord(scene.id)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 shrink-0 transition-all ${
                        isRecording
                          ? 'bg-red-600 text-white animate-pulse shadow-lg shadow-red-600/30'
                          : hasRecorded
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      }`}
                    >
                      <Radio className={`w-3.5 h-3.5 ${isRecording ? 'animate-spin' : ''}`} />
                      <span>{isRecording ? 'Recording... Click to Stop' : hasRecorded ? 'Re-record Voice' : 'Record Own Voice'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Side: Voice Selection Grid & BGM Mixer (5 cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* Voice Selection Grid */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <Disc className="w-5 h-5 text-violet-400" />
              <span>AI Neural Voice Studio</span>
            </h3>

            <div className="space-y-3">
              {VOICES.map((voice) => {
                const isSelected = selectedVoice.startsWith(voice.name.split(' ')[0]);

                return (
                  <div
                    key={voice.id}
                    onClick={() => setSelectedVoice(voice.name + ' (' + voice.gender + ')') }
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-violet-600/10 border-violet-500 text-white shadow-lg shadow-violet-500/10'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">{voice.name}</span>
                      {isSelected && <Check className="w-4 h-4 text-violet-400" />}
                    </div>
                    <p className="text-xs text-slate-400">{voice.sample}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">{voice.gender}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">{voice.accent}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Background Music & Volume Mixer */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <Music className="w-5 h-5 text-violet-400" />
              <span>Background Music & Mixer</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Selected BGM Track
                </label>
                <select
                  value={bgmTrack}
                  onChange={(e) => setBgmTrack(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                >
                  {BGM_TRACKS.map(track => (
                    <option key={track.id} value={track.name}>{track.name} ({track.mood})</option>
                  ))}
                </select>
              </div>

              {/* Volume Sliders */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                    <span>Voiceover Volume</span>
                    <span className="text-violet-400">{voiceVolume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={voiceVolume}
                    onChange={(e) => setVoiceVolume(Number(e.target.value))}
                    className="w-full accent-violet-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                    <span>Background Music Volume</span>
                    <span className="text-violet-400">{bgmVolume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={bgmVolume}
                    onChange={(e) => setBgmVolume(Number(e.target.value))}
                    className="w-full accent-violet-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Continue Button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setActiveStep(3)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-violet-600/35 transition-all flex items-center justify-center space-x-2"
            >
              <span>Continue to Visual Storyboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
