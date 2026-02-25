import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../theme/colors';
import { Database, Zap, CheckCircle } from 'lucide-react-native';

const DatasetScreen: React.FC = () => {
  const stats = [
    {
      label: 'Total Objects',
      value: '1,240',
      icon: <Database size={20} color={COLORS.primary} />,
    },
    {
      label: 'Accuracy Rate',
      value: '98.2%',
      icon: <CheckCircle size={20} color="#34C759" />,
    },
    {
      label: 'Last Update',
      value: '2 Hours ago',
      icon: <Zap size={20} color="#FF9500" />,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Dataset</Text>
        <Text style={styles.headerSub}>
          Our engine is trained with millions of images for high accuracy.
        </Text>
      </View>

      <View style={styles.statsGrid}>
        {stats.map((item, index) => (
          <View key={index} style={styles.statCard}>
            {item.icon}
            <Text style={styles.statValue}>{item.value}</Text>
            <Text style={styles.statLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 25, paddingTop: 60 },
  headerTitle: { fontSize: 28, fontWeight: 'bold' },
  headerSub: { color: COLORS.gray, marginTop: 10, lineHeight: 20 },
  statsGrid: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    width: '48%',
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: 'flex-start',
    elevation: 2,
  },
  statValue: { fontSize: 20, fontWeight: 'bold', marginTop: 15 },
  statLabel: { fontSize: 12, color: COLORS.gray, marginTop: 5 },
});

export default DatasetScreen;
