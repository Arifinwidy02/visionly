import { useState } from 'react';
import { RecognitionResult } from '../types/navigationTypes';
import { Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { GEMINI_API_KEY } from '@env';

export const useImageRecognition = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  const processImage = async (base64Data: string, mimeType: string) => {
    setLoading(true);
    setResult(null); // Reset hasil sebelumnya

    try {
      const response = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: 'Identify this object. Return ONLY a JSON object: {"label": "name", "confidence": 0.95}',
                },
                { inline_data: { mime_type: mimeType, data: base64Data } },
              ],
            },
          ],
        }),
      });

      const json = await response.json();

      // 1. Cek apakah ada error dari API Gemini (Misal: API Key salah/limit habis)
      if (json.error) {
        throw new Error(json.error.message || 'Gemini API Error');
      }

      // 2. Cek apakah candidates ada (Penyebab error 'undefined' tadi)
      if (!json.candidates || json.candidates.length === 0) {
        throw new Error('Gemini tidak bisa mengenali gambar ini.');
      }

      const outputText = json.candidates[0].content.parts[0].text;

      // 3. Bersihkan string (Hapus markdown ```json)
      const cleanJson = outputText.replace(/```json|```/g, '').trim();

      try {
        const parsedResult: RecognitionResult = JSON.parse(cleanJson);
        setResult(parsedResult);
      } catch (e) {
        // Jika Gemini tidak menjawab dalam format JSON
        setResult({ label: outputText, confidence: 0.5 });
      }
      return true;
    } catch (error: any) {
      console.error('Gemini Error Detail:', error);
      Alert.alert(
        'Analysis Failed',
        error.message || 'Check your internet or API Key.',
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handlePickImage = async (useCamera: boolean): Promise<boolean> => {
    const options = {
      mediaType: 'photo' as const,
      quality: 0.5 as const, // Kurangi kualitas sedikit agar upload lebih cepat
      includeBase64: true, // PENTING: Kita butuh base64 untuk Gemini
    };

    const pickerResult = useCamera
      ? await launchCamera(options)
      : await launchImageLibrary(options);

    if (pickerResult.didCancel || !pickerResult.assets?.[0]) return false;

    if (pickerResult.errorCode) {
      Alert.alert('Error', pickerResult.errorMessage || 'An error occurred');
      return false;
    }

    const asset = pickerResult.assets?.[0];
    if (asset && asset.base64 && asset.type) {
      setImage(asset.uri || null);
      const isSuccess = await processImage(asset.base64, asset.type);
      return isSuccess;
    }
    return false;
  };

  return { handlePickImage, loading, result, image };
};
