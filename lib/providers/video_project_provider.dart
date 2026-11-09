import 'package:flutter/foundation.dart';

class SceneItem {
  String id;
  int sceneNumber;
  String timestamp;
  String voiceoverText;
  String visualCueDescription;

  SceneItem({
    required this.id,
    required this.sceneNumber,
    required this.timestamp,
    required this.voiceoverText,
    required this.visualCueDescription,
  });
}

class VideoProjectProvider extends ChangeNotifier {
  int _activeStep = 1;
  bool _isAiLoading = false;
  String _aiLoadingMessage = 'AI is thinking...';

  // Step 1: Idea & Script
  String _topic = "How to automate your video content creation pipeline with AI in 2025";
  String _platform = "TikTok / Reels (9:16)";
  String _tone = "Professional & Energetic";
  String _duration = "45s";

  List<SceneItem> _scenes = [
    SceneItem(
      id: 'scene-1',
      sceneNumber: 1,
      timestamp: '0:00 - 0:08',
      voiceoverText: "Most creators fail not because they lack talent, but because their workflow is completely broken.",
      visualCueDescription: "Cinematic close-up of a stressed video editor staring at a glowing laptop screen in a dark room."
    ),
    SceneItem(
      id: 'scene-2',
      sceneNumber: 2,
      timestamp: '0:08 - 0:22',
      voiceoverText: "What if you could generate scripts, studio-grade voiceovers, dynamic visuals, and viral captions in under 60 seconds?",
      visual_cue_description: "Fast-paced montage of futuristic AI holographic dashboards generating video timelines and waveforms."
    ),
    SceneItem(
      id: 'scene-3',
      sceneNumber: 3,
      timestamp: '0:22 - 0:35',
      voiceoverText: "Meet CreatorAI. The all-in-one autonomous suite built to scale your content across TikTok, Reels, and YouTube Shorts instantly.",
      visual_cue_description: "Sleek 3D showcase of the CreatorAI user interface displaying multi-platform analytics and one-click publishing."
    ),
    SceneItem(
      id: 'scene-4',
      sceneNumber: 4,
      timestamp: '0:35 - 0:45',
      voiceoverText: "Stop wasting hours on manual editing. Click the link below and start creating content that actually converts.",
      visual_cue_description: "Call-to-action animation with glowing neon button and subscriber bell ringing against a gradient background."
    )
  ];

  // Step 2: Audio
  String _selectedVoice = "Rachel (Warm & Engaging - US Female)";
  String _bgmTrack = "Cyberpunk Lofi Beats";
  double _voiceVolume = 85.0;
  double _bgmVolume = 25.0;
  final Map<String, bool> _customRecordings = {};

  // Step 3: Storyboard
  final Map<String, String> _storyboardAssets = {
    'scene-1': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    'scene-2': 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?q=80&w=1000&auto=format&fit=crop',
    'scene-3': 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop',
    'scene-4': 'https://images.unsplash.com/photo-1618172193763-c511deb635ca?q=80&w=1000&auto=format&fit=crop'
  };
  final Map<String, int> _sceneDurations = {
    'scene-1': 8,
    'scene-2': 14,
    'scene-3': 13,
    'scene-4': 10
  };

  // Step 4: Captions
  String _captionStyle = "Alex Hormozi Style (Bold Yellow Accent)";
  double _fontSize = 32.0;
  String _fontColor = "#facc15";
  String _animationType = "Word-by-Word Bounce";

  // Step 5: SEO
  Map<String, dynamic> _seoData = {
    'titles': [
      "Stop Doing Manual Edits! Use This AI Video Pipeline 🚀",
      "How I Automated My Faceless Channel in 60 Seconds",
      "The Ultimate AI Content Creation Suite for 2025"
    ],
    'description': "Want to scale your short-form content without spending hours editing? Discover how CreatorAI generates hyper-engaging scripts, studio voiceovers, and viral captions instantly!\n\n#AIContent #ContentCreator #VideoEditing #TechTrends #Productivity",
    'tags': ["AICreator", "VideoAutomation", "TikTokGrowth", "ShortsTips", "ContentStrategy", "CreatorEconomy"],
    'thumbnailPrompt': "Cinematic neon gradient background with bold 3D text 'STOP EDITING' and glowing AI robotic hand holding a smartphone."
  };

  String _exportStatus = 'idle'; // 'idle', 'rendering', 'completed'
  double _renderProgress = 0.0;

  // Getters
  int get activeStep => _activeStep;
  bool get isAiLoading => _isAiLoading;
  String get aiLoadingMessage => _aiLoadingMessage;
  String get topic => _topic;
  String get platform => _platform;
  String get tone => _tone;
  String get duration => _duration;
  List<SceneItem> get scenes => _scenes;
  String get selectedVoice => _selectedVoice;
  String get bgmTrack => _bgmTrack;
  double get voiceVolume => _voiceVolume;
  double get bgmVolume => _bgmVolume;
  Map<String, String> get storyboardAssets => _storyboardAssets;
  Map<String, int> get sceneDurations => _sceneDurations;
  String get captionStyle => _captionStyle;
  double get fontSize => _fontSize;
  String get fontColor => _fontColor;
  String get animationType => _animationType;
  Map<String, dynamic> get seoData => _seoData;
  String get exportStatus => _exportStatus;
  double get renderProgress => _renderProgress;

  // Setters & Actions
  void setActiveStep(int step) {
    _activeStep = step;
    notifyListeners();
  }

  void setTopic(String value) {
    _topic = value;
    notifyListeners();
  }

  void setPlatform(String value) {
    _platform = value;
    notifyListeners();
  }

  void setTone(String value) {
    _tone = value;
    notifyListeners();
  }

  void setDuration(String value) {
    _duration = value;
    notifyListeners();
  }

  void updateScene(String id, {String? voiceoverText, String? visualCueDescription}) {
    final index = _scenes.indexWhere((s) => s.id == id);
    if (index != -1) {
      if (voiceoverText != null) _scenes[index].voiceoverText = voiceoverText;
      if (visualCueDescription != null) _scenes[index].visualCueDescription = visualCueDescription;
      notifyListeners();
    }
  }

  void addScene() {
    final newId = 'scene-${DateTime.now().millisecondsSinceEpoch}';
    _scenes.add(SceneItem(
      id: newId,
      sceneNumber: _scenes.length + 1,
      timestamp: '0:${(_scenes.length * 8).toString().padLeft(2, '0')} - 0:${((_scenes.length + 1) * 8).toString().padLeft(2, '0')}',
      voiceoverText: "New scene voiceover script...",
      visualCueDescription: "Describe visual or B-roll..."
    ));
    notifyListeners();
  }

  void deleteScene(String id) {
    if (_scenes.length <= 1) return;
    _scenes.removeWhere((s) => s.id == id);
    for (int i = 0; i < _scenes.length; i++) {
      _scenes[i].sceneNumber = i + 1;
    }
    notifyListeners();
  }

  void moveScene(int index, int direction) {
    final newIndex = index + direction;
    if (newIndex < 0 || newIndex >= _scenes.length) return;
    final item = _scenes.removeAt(index);
    _scenes.insert(newIndex, item);
    for (int i = 0; i < _scenes.length; i++) {
      _scenes[i].sceneNumber = i + 1;
    }
    notifyListeners();
  }

  void setSelectedVoice(String voice) {
    _selectedVoice = voice;
    notifyListeners();
  }

  void setBgmTrack(String track) {
    _bgmTrack = track;
    notifyListeners();
  }

  void setVoiceVolume(double vol) {
    _voiceVolume = vol;
    notifyListeners();
  }

  void setBgmVolume(double vol) {
    _bgmVolume = vol;
    notifyListeners();
  }

  void setStoryboardAsset(String sceneId, String url) {
    _storyboardAssets[sceneId] = url;
    notifyListeners();
  }

  void setSceneDuration(String sceneId, int dur) {
    _sceneDurations[sceneId] = dur;
    notifyListeners();
  }

  void setCaptionStyle(String style) {
    _captionStyle = style;
    notifyListeners();
  }

  void setFontSize(double size) {
    _fontSize = size;
    notifyListeners();
  }

  void setFontColor(String color) {
    _fontColor = color;
    notifyListeners();
  }

  void setAnimationType(String anim) {
    _animationType = anim;
    notifyListeners();
  }

  void setSeoData(Map<String, dynamic> data) {
    _seoData = data;
    notifyListeners();
  }

  void triggerAiAction(String message, VoidCallback onComplete) async {
    _aiLoadingMessage = message;
    _isAiLoading = true;
    notifyListeners();

    await Future.delayed(const Duration(milliseconds: 2000));

    _isAiLoading = false;
    notifyListeners();
    onComplete();
  }

  void generateNewScript() {
    triggerAiAction("Analyzing topic '$_topic' for $_platform...", () {
      _scenes = [
        SceneItem(
          id: 'scene-1-${DateTime.now().millisecondsSinceEpoch}',
          sceneNumber: 1,
          timestamp: '0:00 - 0:07',
          voiceoverText: "If you want to master $_topic, you need to understand this one psychological trigger.",
          visualCueDescription: "Dynamic typographic intro with bold kinetic text on a dark gradient background."
        ),
        SceneItem(
          id: 'scene-2-${DateTime.now().millisecondsSinceEpoch}',
          sceneNumber: 2,
          timestamp: '0:07 - 0:20',
          voiceoverText: "Top creators use systematic workflows to produce 10x more content while working half the time.",
          visual_cue_description: "Split-screen comparison showing traditional chaotic editing vs clean automated AI dashboard."
        ),
        SceneItem(
          id: 'scene-3-${DateTime.now().millisecondsSinceEpoch}',
          sceneNumber: 3,
          timestamp: '0:20 - 0:35',
          voiceoverText: "By integrating automated voice synthesis and smart visual storyboarding, your retention will skyrocket.",
          visual_cue_description: "Close-up of analytics chart showing exponential growth curve shooting upwards."
        ),
        SceneItem(
          id: 'scene-4-${DateTime.now().millisecondsSinceEpoch}',
          sceneNumber: 4,
          timestamp: '0:35 - 0:45',
          voiceoverText: "Save this video, try the system today, and subscribe for more creator secrets.",
          visual_cue_description: "Engaging end screen with like and subscribe badge animations."
        )
      ];
      notifyListeners();
    });
  }

  void startExport() async {
    _exportStatus = 'rendering';
    _renderProgress = 0.0;
    notifyListeners();

    for (int i = 1; i <= 10; i++) {
      await Future.delayed(const Duration(milliseconds: 300));
      _renderProgress = i * 10.0;
      notifyListeners();
    }

    _exportStatus = 'completed';
    notifyListeners();
  }
}
