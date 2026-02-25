import { useState } from 'react';
import { RecognitionResult } from '../types/navigationTypes';
import { Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export const useImageRecognition = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);

  const processImage = async (uri: string) => {
    setLoading(true);
    // Simulasi AI Recognition (Ganti dengan API Call asli nanti)
    setTimeout(() => {
      setResult({ label: 'Persian Cat', confidence: 0.98 });
      setLoading(false);
    }, 2000);
  };

  const handlePickImage = async (useCamera: boolean) => {
    const options = {
      mediaType: 'photo' as const,
      quality: 0.7 as const,
    };

    const result = useCamera
      ? await launchCamera(options)
      : await launchImageLibrary(options);

    if (result.didCancel) return;

    if (result.errorCode) {
      Alert.alert('Error', result.errorMessage);
      return;
    }

    if (result.assets && result.assets[0].uri) {
      await processImage(result.assets[0].uri);
    }
  };

  return { handlePickImage, loading, result };
};
