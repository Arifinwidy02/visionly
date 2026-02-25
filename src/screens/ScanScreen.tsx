import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../theme/colors';

const ScanScreen = ({ navigation }: any) => {
  const [scanProgress, setScanProgress] = useState(0);

  // Simulasi progress scanning ala Senior Dev
  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 0.98) {
          clearInterval(interval);
          return 0.98;
        }
        return prev + 0.02;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Scanner</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Viewfinder Section (Berdasarkan scan.jpg) */}
      <View style={styles.viewfinderContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=1000',
            }}
            style={styles.scannedImage}
            resizeMode="cover"
          />

          {/* Siku-siku Bingkai (Corner Frames) */}
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />

          {/* Laser Scanning Animation Effect */}
          <View style={styles.scanLine} />
        </View>
      </View>

      {/* Analysis Card (Berdasarkan scan.jpg) */}
      <View style={styles.analysisCard}>
        <View style={styles.statusRow}>
          <Progress.CircleSnail
            size={20}
            thickness={2}
            color={COLORS.primary}
            duration={700}
          />
          <Text style={styles.statusText}>Analyzing image...</Text>
        </View>

        <View style={styles.progressInfo}>
          <Text style={styles.label}>RECOGNITION PHASE</Text>
          <Text style={styles.percentage}>
            {Math.round(scanProgress * 100)}%
          </Text>
        </View>

        <Progress.Bar
          progress={scanProgress}
          width={null}
          height={8}
          color={COLORS.primary}
          unfilledColor="#E1E1E1"
          borderWidth={0}
          borderRadius={4}
        />

        <Text style={styles.description}>
          Identifying botanical features and health markers
        </Text>
      </View>

      {/* Cancel Button */}
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name="close" size={20} color={COLORS.text} />
        <Text style={styles.cancelText}>Cancel Scan</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1C1C1E' },

  viewfinderContainer: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
  },
  imageWrapper: {
    aspectRatio: 1,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#000',
    position: 'relative',
  },
  scannedImage: { width: '100%', height: '100%', opacity: 0.8 },

  // Corner Frames
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: COLORS.primary,
  },
  topLeft: {
    top: 20,
    left: 20,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 15,
  },
  topRight: {
    top: 20,
    right: 20,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 15,
  },
  bottomLeft: {
    bottom: 20,
    left: 20,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 15,
  },
  bottomRight: {
    bottom: 20,
    right: 20,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 15,
  },

  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: COLORS.primary,
    top: '50%', // Ini bisa dianimasikan dengan Reanimated
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },

  analysisCard: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  statusText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.gray,
    letterSpacing: 0.5,
  },
  percentage: { fontSize: 12, fontWeight: 'bold', color: COLORS.text },
  description: {
    fontSize: 13,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic',
  },

  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F2F5',
    marginHorizontal: 20,
    marginBottom: 30,
    paddingVertical: 16,
    borderRadius: 16,
  },
  cancelText: { marginLeft: 8, fontWeight: '600', color: COLORS.text },
});

export default ScanScreen;
