import 'package:flutter_test/flutter_test.dart';
import 'package:creater_ai/providers/video_project_provider.dart';

void main() {
  test('VideoProjectProvider initial state and actions', () {
    final provider = VideoProjectProvider();

    expect(provider.activeStep, 1);
    expect(provider.scenes.length, 4);

    provider.setActiveStep(3);
    expect(provider.activeStep, 3);

    provider.setTopic("New AI Topic");
    expect(provider.topic, "New AI Topic");

    provider.addScene();
    expect(provider.scenes.length, 5);
  });
}
