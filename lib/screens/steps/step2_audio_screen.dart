import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/video_project_provider.dart';

class Step2AudioScreen extends StatelessWidget {
  const Step2AudioScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<VideoProjectProvider>(context);

    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Banner
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [const Color(0xFF581C87).withOpacity(0.4), const Color(0xFF0F172A)],
              ),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFF7C3AED).withOpacity(0.3)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('STEP 2 OF 5', style: TextStyle(color: Color(0xFFC084FC), fontWeight: FontWeight.bold, fontSize: 12)),
                      const SizedBox(height: 4),
                      const Text('Voicover & Audio Studio', style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 6),
                      const Text('Convert script to AI neural voices, mix background music, and record scene audio overrides.', style: TextStyle(color: Colors.grey, fontSize: 14)),
                    ],
                  ),
                ),
                Row(
                  children: [
                    ElevatedButton.icon(
                      onPressed: () => provider.setActiveStep(1),
                      style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF1E293B), foregroundColor: Colors.white),
                      icon: const Icon(Icons.arrow_back, size: 16),
                      label: const Text('Back'),
                    ),
                    const SizedBox(width: 12),
                    ElevatedButton.icon(
                      onPressed: () => provider.setActiveStep(3),
                      style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF7C3AED), foregroundColor: Colors.white),
                      icon: const Icon(Icons.arrow_forward, size: 16),
                      label: const Text('To Storyboard', style: TextStyle(fontWeight: FontWeight.bold)),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),

          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Left: Waveform & Scenes
              Expanded(
                flex: 7,
                child: Column(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        color: const Color(0xFF0F172A),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: const Color(0xFF1E293B)),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('LIVE AUDIO MIX PREVIEW', style: TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.bold)),
                          const SizedBox(height: 16),
                          Container(
                            height: 120,
                            decoration: BoxDecoration(
                              color: const Color(0xFF020617),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Center(
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: List.generate(30, (i) => Container(
                                  width: 4,
                                  height: (15.0 + (i % 7) * 8),
                                  margin: const EdgeInsets.symmetric(horizontal: 3),
                                  decoration: BoxDecoration(
                                    color: const Color(0xFF8B5CF6),
                                    borderRadius: BorderRadius.circular(2),
                                  ),
                                )),
                              ),
                            ),
                          ),
                          const SizedBox(height: 16),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              ElevatedButton.icon(
                                onPressed: () {},
                                style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF7C3AED)),
                                icon: const Icon(Icons.play_arrow, size: 18),
                                label: const Text('Play Audio Mix'),
                              ),
                              OutlinedButton.icon(
                                onPressed: () => provider.triggerAiAction("Re-synthesizing voiceover...", () {}),
                                style: OutlinedButton.styleFrom(foregroundColor: Colors.white, side: const BorderSide(color: Colors.grey)),
                                icon: const Icon(Icons.auto_awesome, size: 16, color: Color(0xFFC084FC)),
                                label: const Text('Re-Synthesize TTS'),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 24),
                    Container(
                      padding: const EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        color: const Color(0xFF0F172A),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: const Color(0xFF1E293B)),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('Scene Audio Overrides', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                          const SizedBox(height: 16),
                          ListView.builder(
                            shrinkWrap: true,
                            physics: const NeverScrollableScrollPhysics(),
                            itemCount: provider.scenes.length,
                            itemBuilder: (context, idx) {
                              final scene = provider.scenes[idx];
                              return Container(
                                margin: const EdgeInsets.only(bottom: 12),
                                padding: const EdgeInsets.all(12),
                                decoration: BoxDecoration(
                                  color: const Color(0xFF020617),
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.between,
                                  children: [
                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text('Scene 0${scene.sceneNumber} (${scene.timestamp})', style: const TextStyle(color: Color(0xFFC084FC), fontWeight: FontWeight.bold, fontSize: 12)),
                                          const SizedBox(height: 4),
                                          Text(scene.voiceoverText, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(color: Colors.grey, fontSize: 12)),
                                        ],
                                      ),
                                    ),
                                    ElevatedButton.icon(
                                      onPressed: () {},
                                      style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF1E293B), foregroundColor: Colors.white),
                                      icon: const Icon(Icons.mic, size: 14),
                                      label: const Text('Record', style: TextStyle(fontSize: 12)),
                                    ),
                                  ],
                                ),
                              );
                            },
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 24),

              // Right: Voice Studio & Mixer
              Expanded(
                flex: 5,
                child: Column(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        color: const Color(0xFF0F172A),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: const Color(0xFF1E293B)),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('AI Neural Voice Studio', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                          const SizedBox(height: 16),
                          ...['Rachel (Warm & Engaging)', 'Adam (Deep & Professional)', 'Antoni (Energetic Tech)'].map((voice) {
                            final isSelected = provider.selectedVoice.startsWith(voice.split(' ')[0]);
                            return InkWell(
                              onTap: () => provider.setSelectedVoice(voice),
                              child: Container(
                                margin: const EdgeInsets.only(bottom: 10),
                                padding: const EdgeInsets.all(12),
                                decoration: BoxDecoration(
                                  color: isSelected ? const Color(0xFF7C3AED).withOpacity(0.2) : const Color(0xFF020617),
                                  borderRadius: BorderRadius.circular(10),
                                  border: Border.all(color: isSelected ? const Color(0xFF7C3AED) : Colors.transparent),
                                ),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.between,
                                  children: [
                                    Text(voice, style: TextStyle(color: Colors.white, fontWeight: isSelected ? FontWeight.bold : FontWeight.normal, fontSize: 13)),
                                    if (isSelected) const Icon(Icons.check_circle, color: Color(0xFFC084FC), size: 18),
                                  ],
                                ),
                              ),
                            );
                          }),
                        ],
                      ),
                    ),
                    const SizedBox(height: 24),
                    Container(
                      padding: const EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        color: const Color(0xFF0F172A),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: const Color(0xFF1E293B)),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('Background Music & Mixer', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                          const SizedBox(height: 16),
                          DropdownButtonFormField<String>(
                            value: provider.bgmTrack,
                            dropdownColor: const Color(0xFF0F172A),
                            style: const TextStyle(color: Colors.white, fontSize: 13),
                            items: ['Cyberpunk Lofi Beats', 'Upbeat Corporate', 'Cinematic Epic Trailer']
                                .map((b) => DropdownMenuItem(value: b, child: Text(b)))
                                .toList(),
                            onChanged: (val) { if (val != null) provider.setBgmTrack(val); },
                            decoration: InputDecoration(
                              filled: true,
                              fillColor: const Color(0xFF020617),
                              border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide.none),
                            ),
                          ),
                          const SizedBox(height: 16),
                          const Text('Voiceover Volume', style: TextStyle(color: Colors.grey, fontSize: 12)),
                          Slider(
                            value: provider.voiceVolume,
                            min: 0,
                            max: 100,
                            activeColor: const Color(0xFF7C3AED),
                            onChanged: (val) => provider.setVoiceVolume(val),
                          ),
                          const Text('BGM Volume', style: TextStyle(color: Colors.grey, fontSize: 12)),
                          Slider(
                            value: provider.bgmVolume,
                            min: 0,
                            max: 100,
                            activeColor: const Color(0xFF7C3AED),
                            onChanged: (val) => provider.setBgmVolume(val),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
