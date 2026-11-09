import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/video_project_provider.dart';

class Step4CaptionsScreen extends StatelessWidget {
  const Step4CaptionsScreen({super.key});

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
                      const Text('STEP 4 OF 5', style: TextStyle(color: Color(0xFFC084FC), fontWeight: FontWeight.bold, fontSize: 12)),
                      const SizedBox(height: 4),
                      const Text('Auto-Captions & Effects', style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 6),
                      const Text('Auto-generate dynamic word-by-word animated captions synced precisely with timestamps and Alex Hormozi styles.', style: TextStyle(color: Colors.grey, fontSize: 14)),
                    ],
                  ),
                ),
                Row(
                  children: [
                    ElevatedButton.icon(
                      onPressed: () => provider.setActiveStep(3),
                      style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF1E293B), foregroundColor: Colors.white),
                      icon: const Icon(Icons.arrow_back, size: 16),
                      label: const Text('Back'),
                    ),
                    const SizedBox(width: 12),
                    ElevatedButton.icon(
                      onPressed: () => provider.setActiveStep(5),
                      style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF7C3AED), foregroundColor: Colors.white),
                      icon: const Icon(Icons.arrow_forward, size: 16),
                      label: const Text('To Export & SEO', style: TextStyle(fontWeight: FontWeight.bold)),
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
              // Left: Video preview with burned-in captions
              Expanded(
                flex: 7,
                child: Container(
                  height: 420,
                  decoration: BoxDecoration(
                    color: const Color(0xFF0F172A),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: const Color(0xFF1E293B)),
                    image: const DecorationImage(
                      image: NetworkImage('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop'),
                      fit: BoxFit.cover,
                    ),
                  ),
                  child: Container(
                    padding: const EdgeInsets.all(24),
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [Colors.black45, Colors.transparent, Colors.black87],
                      ),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Center(
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                        decoration: BoxDecoration(
                          color: Colors.black.withOpacity(0.75),
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: const Color(0xFFFACC15), width: 2),
                        ),
                        child: Text(
                          'MOST CREATORS FAIL',
                          style: TextStyle(
                            color: Color(0xFFFACC15),
                            fontSize: provider.fontSize,
                            fontWeight: FontWeight.w900,
                            letterSpacing: 1.2,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 24),

              // Right: Caption Styling Toolbox & Transcript
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
                      const Text('Caption Styling Toolbox', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 16),
                      const Text('PRESET THEME', style: TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 6),
                      DropdownButtonFormField<String>(
                        value: provider.captionStyle,
                        dropdownColor: const Color(0xFF0F172A),
                        style: const TextStyle(color: Colors.white, fontSize: 13),
                        items: ['Alex Hormozi Style (Bold Yellow Accent)', 'Minimalist White', 'Bold Yellow TikTok']
                            .map((s) => DropdownMenuItem(value: s, child: Text(s)))
                            .toList(),
                        onChanged: (val) { if (val != null) provider.setCaptionStyle(val); },
                        decoration: InputDecoration(
                          filled: true,
                          fillColor: const Color(0xFF020617),
                          border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide.none),
                        ),
                      ),
                      const SizedBox(height: 16),
                      const Text('FONT SIZE', style: TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.bold)),
                      Slider(
                        value: provider.fontSize,
                        min: 20,
                        max: 48,
                        activeColor: const Color(0xFF7C3AED),
                        onChanged: (val) => provider.setFontSize(val),
                      ),
                      const SizedBox(height: 16),
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton.icon(
                          onPressed: () => provider.triggerAiAction("Auto-transcribing captions...", () {}),
                          style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF7C3AED), foregroundColor: Colors.white),
                          icon: const Icon(Icons.auto_awesome, size: 16),
                          label: const Text('Auto-Generate Captions'),
                        ),
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
