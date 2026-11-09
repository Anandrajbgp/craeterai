import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/video_project_provider.dart';
import 'steps/step1_script_screen.dart';
import 'steps/step2_audio_screen.dart';
import 'steps/step3_storyboard_screen.dart';
import 'steps/step4_captions_screen.dart';
import 'steps/step5_export_screen.dart';

class WizardScreen extends StatelessWidget {
  const WizardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<VideoProjectProvider>(context);

    return Scaffold(
      body: Stack(
        children: [
          Column(
            children: [
              // Top Navigation Wizard Bar
              Container(
                height: 70,
                decoration: BoxDecoration(
                  color: const Color(0xFF0F172A), // slate-900
                  border: Border(
                    bottom: BorderSide(color: const Color(0xFF1E293B)), // slate-800
                  ),
                ),
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    // Logo & Title
                    Row(
                      children: [
                        Container(
                          width: 40,
                          height: 40,
                          decoration: BoxDecoration(
                            gradient: const LinearGradient(
                              colors: [Color(0xFF7C3AED), Color(0xFF6366F1)],
                            ),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: const Icon(Icons.video_collection, color: Colors.white, size: 20),
                        ),
                        const SizedBox(width: 12),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Text(
                              'CreatorAI Suite',
                              style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
                            ),
                            Text(
                              'Project: ${provider.topic}',
                              style: const TextStyle(
                                color: Colors.grey,
                                fontSize: 12,
                              ),
                              overflow: TextOverflow.ellipsis,
                            ),
                          ],
                        ),
                      ],
                    ),

                    // Step Tabs
                    Row(
                      children: [
                        _buildStepTab(context, 1, 'Script', Icons.description),
                        _buildStepTab(context, 2, 'Audio', Icons.mic),
                        _buildStepTab(context, 3, 'Storyboard', Icons.movie),
                        _buildStepTab(context, 4, 'Captions', Icons.closed_caption),
                        _buildStepTab(context, 5, 'Export & SEO', Icons.rocket),
                      ],
                    ),
                  ],
                ),
              ),

              // Active Step Body
              Expanded(
                child: _buildActiveStepScreen(provider.activeStep),
              ),
            ],
          ),

          // AI Loading Overlay
          if (provider.isAiLoading)
            Container(
              color: Colors.black.withOpacity(0.8),
              child: Center(
                child: Container(
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    color: const Color(0xFF0F172A),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: Colors.violet.withOpacity(0.4)),
                  ),
                  width: 320,
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const CircularProgressIndicator(color: Color(0xFF8B5CF6)),
                      const SizedBox(height: 20),
                      const Text(
                        'AI Copilot at Work',
                        style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        provider.aiLoadingMessage,
                        textAlign: TextAlign.center,
                        style: const TextStyle(color: Colors.grey, fontSize: 13),
                      ),
                    ],
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildStepTab(BuildContext context, int stepNumber, String label, IconData icon) {
    final provider = Provider.of<VideoProjectProvider>(context);
    final isActive = provider.activeStep == stepNumber;
    final isCompleted = provider.activeStep > stepNumber;

    return InkWell(
      onTap: () => provider.setActiveStep(stepNumber),
      borderRadius: BorderRadius.circular(10),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        margin: const EdgeInsets.symmetric(horizontal: 4),
        decoration: BoxDecoration(
          color: isActive ? const Color(0xFF7C3AED) : isCompleted ? const Color(0xFF1E293B) : Colors.transparent,
          borderRadius: BorderRadius.circular(10),
        ),
        child: Row(
          children: [
            Icon(
              isCompleted ? Icons.check_circle : icon,
              size: 16,
              color: isActive ? Colors.white : Colors.grey,
            ),
            const SizedBox(width: 6),
            Text(
              label,
              style: TextStyle(
                color: isActive ? Colors.white : Colors.grey,
                fontWeight: isActive ? FontWeight.bold : FontWeight.normal,
                fontSize: 13,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActiveStepScreen(int step) {
    switch (step) {
      case 1:
        return const Step1ScriptScreen();
      case 2:
        return const Step2AudioScreen();
      case 3:
        return const Step3StoryboardScreen();
      case 4:
        return const Step4CaptionsScreen();
      case 5:
        return const Step5ExportScreen();
      default:
        return const Step1ScriptScreen();
    }
  }
}
