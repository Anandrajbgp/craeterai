import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/video_project_provider.dart';

class Step5ExportScreen extends StatefulWidget {
  const Step5ExportScreen({super.key});

  @override
  State<Step5ExportScreen> createState() => _Step5ExportScreenState();
}

class _Step5ExportScreenState extends State<Step5ExportScreen> {
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _descController = TextEditingController();

  @override
  void initState() {
    super.initState();
    final provider = Provider.of<VideoProjectProvider>(context, listen: false);
    _titleController.text = provider.seoData['titles'][0];
    _descController.text = provider.seoData['description'];
  }

  @override
  void dispose() {
    _titleController.dispose();
    _descController.dispose();
    super.dispose();
  }

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
                const Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('STEP 5 OF 5', style: TextStyle(color: Color(0xFFC084FC), fontWeight: FontWeight.bold, fontSize: 12)),
                      SizedBox(height: 4),
                      Text('AI SEO, Thumbnails & Export', style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
                      SizedBox(height: 6),
                      Text('Generate viral titles, descriptions, tags, thumbnail prompts, and render/publish video directly.', style: TextStyle(color: Colors.grey, fontSize: 14)),
                    ],
                  ),
                ),
                ElevatedButton.icon(
                  onPressed: () => provider.setActiveStep(4),
                  style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF1E293B), foregroundColor: Colors.white),
                  icon: const Icon(Icons.arrow_back, size: 16),
                  label: const Text('Back'),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),

          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Left: Final Video Render & Download
              Expanded(
                flex: 7,
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
                      const Text('Final Rendered Master', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 16),
                      Container(
                        height: 320,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(12),
                          image: const DecorationImage(
                            image: NetworkImage('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop'),
                            fit: BoxFit.cover,
                          ),
                        ),
                        child: Center(
                          child: provider.exportStatus == 'rendering'
                              ? Container(
                                  padding: const EdgeInsets.all(20),
                                  decoration: BoxDecoration(color: Colors.black87, borderRadius: BorderRadius.circular(12)),
                                  child: Column(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      CircularProgressIndicator(value: provider.renderProgress / 100, color: const Color(0xFF8B5CF6)),
                                      const SizedBox(height: 12),
                                      Text('Rendering Video: ${provider.renderProgress.toInt()}%', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                                    ],
                                  ),
                                )
                              : provider.exportStatus == 'completed'
                              ? Container(
                                  padding: const EdgeInsets.all(16),
                                  decoration: BoxDecoration(color: Colors.emerald.withOpacity(0.8), borderRadius: BorderRadius.circular(12)),
                                  child: const Text('Render Complete & Ready for Export!', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                                )
                              : const Icon(Icons.play_circle_filled, size: 64, color: Colors.white70),
                        ),
                      ),
                      const SizedBox(height: 20),
                      Row(
                        children: [
                          Expanded(
                            child: ElevatedButton.icon(
                              onPressed: () => provider.startExport(),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: const Color(0xFF7C3AED),
                                foregroundColor: Colors.white,
                                padding: const EdgeInsets.symmetric(vertical: 16),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                              ),
                              icon: const Icon(Icons.download, size: 18),
                              label: const Text('Export & Download MP4', style: TextStyle(fontWeight: FontWeight.bold)),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: 24),

              // Right: AI SEO & Publish Metadata
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
                      const Text('AI SEO Metadata', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 16),
                      const Text('OPTIMIZED TITLE', style: TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 6),
                      TextField(
                        controller: _titleController,
                        style: const TextStyle(color: Colors.white, fontSize: 13),
                        decoration: InputDecoration(
                          filled: true,
                          fillColor: const Color(0xFF020617),
                          border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide.none),
                        ),
                      ),
                      const SizedBox(height: 16),
                      const Text('DESCRIPTION & TAGS', style: TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 6),
                      TextField(
                        controller: _descController,
                        maxLines: 4,
                        style: const TextStyle(color: Colors.white, fontSize: 13),
                        decoration: InputDecoration(
                          filled: true,
                          fillColor: const Color(0xFF020617),
                          border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide.none),
                        ),
                      ),
                      const SizedBox(height: 20),
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton.icon(
                          onPressed: () {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(content: Text('Successfully published to YouTube Shorts & TikTok!')),
                            );
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.emerald,
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(vertical: 14),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                          ),
                          icon: const Icon(Icons.rocket_launch, size: 16),
                          label: const Text('Direct Upload & Publish', style: TextStyle(fontWeight: FontWeight.bold)),
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
