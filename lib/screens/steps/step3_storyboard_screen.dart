import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/video_project_provider.dart';

class Step3StoryboardScreen extends StatefulWidget {
  const Step3StoryboardScreen({super.key});

  @override
  State<Step3StoryboardScreen> createState() => _Step3StoryboardScreenState();
}

class _Step3StoryboardScreenState extends State<Step3StoryboardScreen> {
  int activeIndex = 0;
  final TextEditingController _aiImgController = TextEditingController();

  @override
  void dispose() {
    _aiImgController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<VideoProjectProvider>(context);
    final currentScene = provider.scenes[activeIndex];
    final currentAsset = provider.storyboardAssets[currentScene.id] ?? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop';
    final currentDuration = provider.sceneDurations[currentScene.id] ?? 8;

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
                      const Text('STEP 3 OF 5', style: TextStyle(color: Color(0xFFC084FC), fontWeight: FontWeight.bold, fontSize: 12)),
                      const SizedBox(height: 4),
                      const Text('Visual Storyboard & Timeline', style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 6),
                      const Text('AI matches visual cues to stock imagery or AI generation. Customize visuals and scene durations.', style: TextStyle(color: Colors.grey, fontSize: 14)),
                    ],
                  ),
                ),
                Row(
                  children: [
                    ElevatedButton.icon(
                      onPressed: () => provider.setActiveStep(2),
                      style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF1E293B), foregroundColor: Colors.white),
                      icon: const Icon(Icons.arrow_back, size: 16),
                      label: const Text('Back'),
                    ),
                    const SizedBox(width: 12),
                    ElevatedButton.icon(
                      onPressed: () => provider.setActiveStep(4),
                      style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF7C3AED), foregroundColor: Colors.white),
                      icon: const Icon(Icons.arrow_forward, size: 16),
                      label: const Text('To Captions', style: TextStyle(fontWeight: FontWeight.bold)),
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
              // Left: Video Preview & Timeline
              Expanded(
                flex: 7,
                child: Column(
                  children: [
                    Container(
                      height: 380,
                      decoration: BoxDecoration(
                        color: const Color(0xFF0F172A),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: const Color(0xFF1E293B)),
                        image: DecorationImage(image: NetworkImage(currentAsset), fit: BoxFit.cover),
                      ),
                      child: Container(
                        padding: const EdgeInsets.all(20),
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            begin: Alignment.topCenter,
                            end: Alignment.bottomCenter,
                            colors: [Colors.black54, Colors.transparent, Colors.black87],
                          ),
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                  decoration: BoxDecoration(color: Colors.black54, borderRadius: BorderRadius.circular(8)),
                                  child: Text('Scene 0${currentScene.sceneNumber} (${currentScene.timestamp})', style: const TextStyle(color: Color(0xFFC084FC), fontSize: 12, fontWeight: FontWeight.bold)),
                                ),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                  decoration: BoxDecoration(color: Colors.black54, borderRadius: BorderRadius.circular(8)),
                                  child: Text('${currentDuration}s', style: const TextStyle(color: Colors.white, fontSize: 12)),
                                ),
                              ],
                            ),
                            Container(
                              padding: const EdgeInsets.all(12),
                              decoration: BoxDecoration(color: Colors.black87, borderRadius: BorderRadius.circular(10)),
                              child: Text('"${currentScene.voiceoverText}"', style: const TextStyle(color: Colors.white, fontSize: 13, fontStyle: FontStyle.italic), textAlign: TextAlign.center),
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),
                    // Timeline Track
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: const Color(0xFF0F172A),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: const Color(0xFF1E293B)),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('SCENE TIMELINE TRACK', style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold)),
                          const SizedBox(height: 12),
                          SizedBox(
                            height: 80,
                            child: ListView.builder(
                              scrollDirection: Axis.horizontal,
                              itemCount: provider.scenes.length,
                              itemBuilder: (context, idx) {
                                final s = provider.scenes[idx];
                                final isSel = activeIndex == idx;
                                final asset = provider.storyboardAssets[s.id] ?? currentAsset;
                                return InkWell(
                                  onTap: () => setState(() => activeIndex = idx),
                                  child: Container(
                                    width: 120,
                                    margin: const EdgeInsets.only(right: 12),
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(10),
                                      border: Border.all(color: isSel ? const Color(0xFF7C3AED) : Colors.transparent, width: 2),
                                      image: DecorationImage(image: NetworkImage(asset), fit: BoxFit.cover),
                                    ),
                                    child: Container(
                                      alignment: Alignment.bottomRight,
                                      padding: const EdgeInsets.all(4),
                                      child: Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
                                        decoration: BoxDecoration(color: Colors.black87, borderRadius: BorderRadius.circular(4)),
                                        child: Text('S0${s.sceneNumber}', style: const TextStyle(color: Colors.white, fontSize: 10)),
                                      ),
                                    ),
                                  ),
                                );
                              },
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 24),

              // Right: Visual Asset Editor
              Expanded(
                flex: 5,
                child: Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: const Color(0xFF0F172A),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: const Color(0xFF1E293B)),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Edit Scene 0${currentScene.sceneNumber} Visual', style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 6),
                      Text(currentScene.visualCueDescription, style: const TextStyle(color: Colors.grey, fontSize: 12)),
                      const SizedBox(height: 16),
                      ClipRRect(
                        borderRadius: BorderRadius.circular(12),
                        child: Image.network(currentAsset, height: 180, width: double.infinity, fit: BoxFit.cover),
                      ),
                      const SizedBox(height: 16),
                      const Text('AI TEXT-TO-IMAGE PROMPT', style: TextStyle(color: Color(0xFFC084FC), fontSize: 11, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 6),
                      TextField(
                        controller: _aiImgController,
                        style: const TextStyle(color: Colors.white, fontSize: 13),
                        decoration: InputDecoration(
                          hintText: 'Describe custom visual...',
                          hintStyle: const TextStyle(color: Colors.grey),
                          filled: true,
                          fillColor: const Color(0xFF020617),
                          border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide.none),
                        ),
                      ),
                      const SizedBox(height: 12),
                      ElevatedButton.icon(
                        onPressed: () {
                          provider.triggerAiAction("Generating AI visual asset...", () {
                            provider.setStoryboardAsset(currentScene.id, 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop');
                          });
                        },
                        style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF7C3AED), foregroundColor: Colors.white),
                        icon: const Icon(Icons.auto_awesome, size: 16),
                        label: const Text('Generate AI Image'),
                      ),
                      const SizedBox(height: 20),
                      const Text('SCENE DURATION (SECONDS)', style: TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.bold)),
                      Slider(
                        value: currentDuration.toDouble(),
                        min: 3,
                        max: 30,
                        activeColor: const Color(0xFF7C3AED),
                        onChanged: (val) => provider.setSceneDuration(currentScene.id, val.toInt()),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
