import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Tambahkan ini
import ScanOverlay from '../components/ScanOverlay';
import { useImageRecognition } from '../hooks/useImageRecognition';
import { COLORS } from '../theme/colors';

const MAX_LIMIT = 5;

const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [remainingUsage, setRemainingUsage] = useState(MAX_LIMIT);
  const { handlePickImage, loading, result, image } = useImageRecognition();

  // Load kuota saat aplikasi dibuka
  useEffect(() => {
    updateRemainingUI();
  }, []);

  const updateRemainingUI = async () => {
    const today = new Date().toDateString();
    const storedDate = await AsyncStorage.getItem('usage_date');
    const storedCount = await AsyncStorage.getItem('usage_count');

    if (storedDate === today) {
      const count = parseInt(storedCount || '0', 10);
      setRemainingUsage(MAX_LIMIT - count);
      return count;
    } else {
      // Hari baru atau pertama kali pakai
      await AsyncStorage.setItem('usage_date', today);
      await AsyncStorage.setItem('usage_count', '0');
      setRemainingUsage(MAX_LIMIT);
      return 0;
    }
  };

  const onSelectSource = async (useCamera: boolean) => {
    setModalVisible(false);

    // 1. Ambil nilai terbaru (pastikan sinkron dengan storage)
    const currentCount = await updateRemainingUI();

    if (currentCount >= MAX_LIMIT) {
      Alert.alert('Quota Exceeded', 'You have reached the daily limit.');
      return;
    }

    // 2. Jalankan picking & scanning (menunggu return true dari hook)
    const isProcessComplete = await handlePickImage(useCamera);

    // 3. Update hanya jika AI benar-benar sukses memberikan hasil
    if (isProcessComplete) {
      const newCount = currentCount + 1;
      await AsyncStorage.setItem('usage_count', newCount.toString());

      // Update UI State
      setRemainingUsage(MAX_LIMIT - newCount);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>AI Object Scanner</Text>

      {/* Indikator Sisa Kuota */}
      <View style={styles.quotaBadge}>
        <Text style={styles.quotaText}>
          Daily Scans: {remainingUsage} / {MAX_LIMIT} left
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.mainButton,
          remainingUsage === 0 && { backgroundColor: '#CCC' }, // Abu-abu jika habis
        ]}
        onPress={() => setModalVisible(true)}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {remainingUsage === 0 ? 'Limit Reached' : 'Start Scanning'}
        </Text>
      </TouchableOpacity>

      {/* Logic Tampilan Hasil tetap sama */}
      {result && !loading && (
        <View style={styles.resultContainer}>
          {image && (
            <Image source={{ uri: image }} style={styles.previewImage} />
          )}
          <View style={styles.resultBox}>
            <Text style={styles.resultLabel}>Result: {result.label}</Text>
            <Text style={styles.resultConfidence}>
              Confidence: {(result.confidence * 100).toFixed(0)}%
            </Text>
          </View>
        </View>
      )}

      {/* Loading Modal tetap sama */}
      <Modal transparent visible={loading} animationType="fade">
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Analyzing Image...</Text>
          </View>
        </View>
      </Modal>

      <ScanOverlay
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSelectSource={onSelectSource}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // ... style sebelumnya tetap sama ...
  quotaBadge: {
    backgroundColor: '#E9ECEF',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 20,
  },
  quotaText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  welcomeText: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  mainButton: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 15,
    elevation: 3,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
  resultContainer: { marginTop: 30, alignItems: 'center', width: '100%' },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: 'white',
  },
  resultBox: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    width: '80%',
    elevation: 4,
  },
  resultLabel: { fontSize: 18, fontWeight: '700', color: '#333' },
  resultConfidence: { fontSize: 14, color: '#666', marginTop: 5 },
  loadingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingCard: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default HomeScreen;
