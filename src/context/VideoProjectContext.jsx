import React, { createContext, useContext, useState } from 'react';

const VideoProjectContext = createContext(null);

const INITIAL_SCENES = [
  {
    id: 'scene-1',
    scene_number: 1,
    timestamp: '0:00 - 0:08',
    voiceover_text: "Most creators fail not because they lack talent, but because their workflow is completely broken.",
    visual_cue_description: "Cinematic close-up of a stressed video editor staring at a glowing laptop screen in a dark room."
  },
  {
    id: 'scene-2',
    scene_number: 2,
    timestamp: '0:08 - 0:22',
    voiceover_text: "What if you could generate scripts, studio-grade voiceovers, dynamic visuals, and viral captions in under 60 seconds?",
    visual_cue_description: "Fast-paced montage of futuristic AI holographic dashboards generating video timelines and waveforms."
  },
  {
    id: 'scene-3',
    scene_number: 3,
    timestamp: '0:22 - 0:35',
    voiceover_text: "Meet CreatorAI. The all-in-one autonomous suite built to scale your content across TikTok, Reels, and YouTube Shorts instantly.",
    visual_cue_description: "Sleek 3D showcase of the CreatorAI user interface displaying multi-platform analytics and one-click publishing."
  },
  {
    id: 'scene-4',
    scene_number: 4,
    timestamp: '0:35 - 0:45',
    voiceover_text: "Stop wasting hours on manual editing. Click the link below and start creating content that actually converts.",
    visual_cue_description: "Call-to-action animation with glowing neon button and subscriber bell ringing against a gradient background."
  }
];

export const VideoProjectProvider = ({ children }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiLoadingMessage, setAiLoadingMessage] = useState('AI is thinking...');

  // Step 1: Idea & Script
  const [topic, setTopic] = useState("How to automate your video content creation pipeline with AI in 2025");
  const [platform, setPlatform] = useState("TikTok / Reels (9:16)");
  const [tone, setTone] = useState("Professional & Energetic");
  const [duration, setDuration] = useState("45s");
  const [scenes, setScenes] = useState(INITIAL_SCENES);

  // Step 2: Audio & Voiceover
  const [selectedVoice, setSelectedVoice] = useState("Rachel (Warm & Engaging - US Female)");
  const [bgmTrack, setBgmTrack] = useState("Cyberpunk Lofi Beats");
  const [voiceVolume, setVoiceVolume] = useState(85);
  const [bgmVolume, setBgmVolume] = useState(25);
  const [customRecordings, setCustomRecordings] = useState({}); // sceneId -> boolean

  // Step 3: Storyboard & Visuals
  const [storyboardAssets, setStoryboardAssets] = useState({
    'scene-1': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    'scene-2': 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?q=80&w=1000&auto=format&fit=crop',
    'scene-3': 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop',
    'scene-4': 'https://images.unsplash.com/photo-1618172193763-c511deb635ca?q=80&w=1000&auto=format&fit=crop'
  });
  const [sceneDurations, setSceneDurations] = useState({
    'scene-1': 8,
    'scene-2': 14,
    'scene-3': 13,
    'scene-4': 10
  });

  // Step 4: Captions & Effects
  const [captionStyle, setCaptionStyle] = useState("Alex Hormozi Style (Bold Yellow Accent)");
  const [fontSize, setFontSize] = useState(32);
  const [fontColor, setFontColor] = useState("#facc15"); // yellow-400
  const [animationType, setAnimationType] = useState("Word-by-Word Bounce");
  const [transcriptWords, setTranscriptWords] = useState([
    { id: 1, text: "Most", time: "0.1s" },
    { id: 2, text: "creators", time: "0.4s" },
    { id: 3, text: "fail", time: "0.8s" },
    { id: 4, text: "not", time: "1.0s" },
    { id: 5, text: "because", time: "1.3s" },
    { id: 6, text: "they", time: "1.5s" },
    { id: 7, text: "lack", time: "1.8s" },
    { id: 8, text: "talent,", time: "2.1s" },
    { id: 9, text: "but", time: "2.4s" },
    { id: 10, text: "because", time: "2.7s" },
    { id: 11, text: "their", time: "2.9s" },
    { id: 12, text: "workflow", time: "3.4s" },
    { id: 13, text: "is", time: "3.6s" },
    { id: 14, text: "broken.", time: "4.0s" }
  ]);

  // Step 5: SEO & Export
  const [seoData, setSeoData] = useState({
    titles: [
      "Stop Doing Manual Edits! Use This AI Video Pipeline 🚀",
      "How I Automated My Faceless Channel in 60 Seconds",
      "The Ultimate AI Content Creation Suite for 2025"
    ],
    description: "Want to scale your short-form content without spending hours editing? Discover how CreatorAI generates hyper-engaging scripts, studio voiceovers, and viral captions instantly!\n\n#AIContent #ContentCreator #VideoEditing #TechTrends #Productivity",
    tags: ["AICreator", "VideoAutomation", "TikTokGrowth", "ShortsTips", "ContentStrategy", "CreatorEconomy"],
    thumbnailPrompt: "Cinematic neon gradient background with bold 3D text 'STOP EDITING' and glowing AI robotic hand holding a smartphone."
  });
  const [exportStatus, setExportStatus] = useState('idle'); // 'idle' | 'rendering' | 'completed'
  const [renderProgress, setRenderProgress] = useState(0);

  // AI Action Simulators
  const triggerAiAction = (message, callback, durationMs = 2000) => {
    setAiLoadingMessage(message);
    setIsAiLoading(true);
    setTimeout(() => {
      setIsAiLoading(false);
      if (callback) callback();
    }, durationMs);
  };

  const generateNewScript = () => {
    triggerAiAction(`Analyzing topic "${topic}" for ${platform}...`, () => {
      // Dynamic AI variation based on topic
      const generated = [
        {
          id: 'scene-1-' + Date.now(),
          scene_number: 1,
          timestamp: '0:00 - 0:07',
          voiceover_text: `If you want to master ${topic}, you need to understand this one psychological trigger.`,
          visual_cue_description: "Dynamic typographic intro with bold kinetic text on a dark gradient background."
        },
        {
          id: 'scene-2-' + Date.now(),
          scene_number: 2,
          timestamp: '0:07 - 0:20',
          voiceover_text: "Top creators use systematic workflows to produce 10x more content while working half the time.",
          visual_cue_description: "Split-screen comparison showing traditional chaotic editing vs clean automated AI dashboard."
        },
        {
          id: 'scene-3-' + Date.now(),
          scene_number: 3,
          timestamp: '0:20 - 0:35',
          voiceover_text: "By integrating automated voice synthesis and smart visual storyboarding, your retention will skyrocket.",
          visual_cue_description: "Close-up of analytics chart showing exponential growth curve shooting upwards."
        },
        {
          id: 'scene-4-' + Date.now(),
          scene_number: 4,
          timestamp: '0:35 - 0:45',
          voiceover_text: "Save this video, try the system today, and subscribe for more creator secrets.",
          visual_cue_description: "Engaging end screen with like and subscribe badge animations."
        }
      ];
      setScenes(generated);
    }, 2500);
  };

  const generateAudioAssets = () => {
    triggerAiAction(`Synthesizing neural voiceover with "${selectedVoice}" & mixing background music...`, () => {
      // simulated
    }, 2000);
  };

  const generateStoryboardAssets = () => {
    triggerAiAction("Generating AI visual placeholders & syncing clip durations...", () => {
      // simulated
    }, 2200);
  };

  const generateCaptions = () => {
    triggerAiAction("Auto-transcribing audio and applying kinetic caption styles...", () => {
      // simulated
    }, 1800);
  };

  const generateSeoMetadata = () => {
    triggerAiAction("Analyzing viral trends and generating high-converting SEO metadata...", () => {
      setSeoData({
        titles: [
          `The Secret Behind ${topic} Revealed 💡`,
          `Why Everyone Is Talking About ${topic}`,
          `Master ${topic} in Under 60 Seconds`
        ],
        description: `Everything you need to know about ${topic}. Optimized for maximum algorithmic reach across TikTok, Instagram Reels, and YouTube Shorts.\n\n#ViralContent #${topic.replace(/\s+/g, '')} #CreatorTips #AI`,
        tags: ["ViralTips", "ContentCreation", "CreatorTips", "AIAutomation", "GrowthHacks"],
        thumbnailPrompt: `Vibrant hyper-realistic thumbnail featuring ${topic} with neon lighting and high contrast expressions.`
      });
    }, 2000);
  };

  const startVideoExport = () => {
    setExportStatus('rendering');
    setRenderProgress(0);
    const interval = setInterval(() => {
      setRenderProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setExportStatus('completed');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const value = {
    activeStep,
    setActiveStep,
    isAiLoading,
    aiLoadingMessage,
    triggerAiAction,
    // Step 1
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
    // Step 2
    selectedVoice,
    setSelectedVoice,
    bgmTrack,
    setBgmTrack,
    voiceVolume,
    setVoiceVolume,
    bgmVolume,
    setBgmVolume,
    customRecordings,
    setCustomRecordings,
    generateAudioAssets,
    // Step 3
    storyboardAssets,
    setStoryboardAssets,
    sceneDurations,
    setSceneDurations,
    generateStoryboardAssets,
    // Step 4
    captionStyle,
    setCaptionStyle,
    fontSize,
    setFontSize,
    fontColor,
    setFontColor,
    animationType,
    setAnimationType,
    transcriptWords,
    setTranscriptWords,
    generateCaptions,
    // Step 5
    seoData,
    setSeoData,
    exportStatus,
    setExportStatus,
    renderProgress,
    generateSeoMetadata,
    startVideoExport
  };

  return (
    <VideoProjectContext.Provider value={value}>
      {children}
    </VideoProjectContext.Provider>
  );
};

export const useVideoProject = () => {
  const context = useContext(VideoProjectContext);
  if (!context) {
    throw new Error('useVideoProject must be used within a VideoProjectProvider');
  }
  return context;
};
