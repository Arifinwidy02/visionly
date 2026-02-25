import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../theme/colors';
import Icon from 'react-native-vector-icons/Ionicons';

// Data Dummy sesuai UI yang diupload
const HISTORY_DATA = [
  {
    id: '1',
    title: 'Persian Cat',
    status: 'Saved',
    match: '98%',
    time: '18:30 AM',
    category: 'Animals',
  },
  {
    id: '2',
    title: 'Coffee Mug',
    status: 'Saved',
    match: '95%',
    time: '08:15 AM',
    category: 'Kitchenware',
  },
];

const HistoryScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Scan History</Text>
      </View>

      <FlatList
        data={HISTORY_DATA}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.imagePlaceholder} />
            <View style={styles.info}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSub}>
                {item.time} • {item.category}
              </Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.match} Match</Text>
            </View>
            <Icon name="chevron-forward" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 20, paddingTop: 60, backgroundColor: 'white' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: COLORS.text },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    elevation: 3,
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#E1E1E1',
  },
  info: { flex: 1, marginLeft: 15 },
  itemTitle: { fontSize: 16, fontWeight: 'bold' },
  itemSub: { fontSize: 12, color: COLORS.gray, marginTop: 4 },
  badge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 10,
  },
  badgeText: { color: '#2E7D32', fontSize: 10, fontWeight: 'bold' },
});

export default HistoryScreen;
