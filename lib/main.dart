import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/video_project_provider.dart';
import 'screens/wizard_screen.dart';

void main() {
  runApp(const CreatorAiApp());
}

class CreatorAiApp extends StatelessWidget {
  const CreatorAiApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => VideoProjectProvider()),
      ],
      child: MaterialApp(
        title: 'CreatorAI - AI Video Suite',
        debugShowCheckedModeBanner: false,
        themeMode: ThemeMode.dark,
        darkTheme: ThemeData(
          brightness: Brightness.dark,
          scaffoldBackgroundColor: const Color(0xFF020617), // slate-950
          primaryColor: const Color(0xFF8B5CF6), // violet-500
          colorScheme: ColorScheme.dark(
            primary: const Color(0xFF8B5CF6),
            secondary: const Color(0xFF6366F1),
            surface: const Color(0xFF0F172A), // slate-900
          ),
          fontFamily: 'Roboto',
        ),
        home: const WizardScreen(),
      ),
    );
  }
}
