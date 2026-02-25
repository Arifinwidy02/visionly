import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScanOverlay from '../components/ScanOverlay';
import { useImageRecognition } from '../hooks/useImageRecognition';
import { COLORS } from '../theme/colors';

const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { handlePickImage, loading, result } = useImageRecognition();

  const onSelectSource = async (useCamera: boolean) => {
    setModalVisible(false); // Tutup modal dulu
    await handlePickImage(useCamera); // Jalankan picker
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>AI Object Scanner</Text>

      {/* Tombol Utama untuk Trigger Modal */}
      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Start Scanning</Text>
      </TouchableOpacity>

      {/* Tampilan Hasil Sementara (UI Placeholder) */}
      {result && (
        <View style={styles.resultBox}>
          <Text>Last Result: {result.label}</Text>
          <Text>Confidence: {(result.confidence * 100).toFixed(0)}%</Text>
        </View>
      )}

      <ScanOverlay
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSelectSource={onSelectSource}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  welcomeText: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  mainButton: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 15,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
  resultBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
  },
});

export default HomeScreen;
