import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { Github, Globe, Mail } from 'lucide-react-native';

const AboutScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>V</Text>
        </View>
        <Text style={styles.appName}>Visionly AI</Text>
        <Text style={styles.version}>Version 1.0.0 (Stable)</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.description}>
          Visionly is a professional-grade image recognition tool built with
          React Native and TensorFlow. It follows SOLID principles to ensure
          scalability and performance.
        </Text>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn}>
            <Github color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <Globe color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <Mail color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 30,
  },
  profileSection: { alignItems: 'center', marginTop: 60 },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: { color: 'white', fontSize: 50, fontWeight: 'bold' },
  appName: { fontSize: 24, fontWeight: 'bold' },
  version: { color: COLORS.gray, marginTop: 5 },
  infoSection: { marginTop: 40, width: '100%' },
  description: { textAlign: 'center', lineHeight: 22, color: '#444' },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    gap: 20,
  },
  socialBtn: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: COLORS.background,
  },
});

export default AboutScreen;
