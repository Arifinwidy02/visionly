import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, Image as ImageIcon, X } from 'lucide-react-native';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSelectSource: (useCamera: boolean) => void;
}

const ScanOverlay: React.FC<Props> = ({
  isVisible,
  onClose,
  onSelectSource,
}) => (
  <Modal visible={isVisible} transparent animationType="slide">
    <View style={styles.overlay}>
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text style={styles.title}>Identify Object</Text>

        <TouchableOpacity
          style={styles.option}
          onPress={() => onSelectSource(true)}
        >
          <Camera color="#007AFF" />
          <Text style={styles.optionText}>Take a Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => onSelectSource(false)}
        >
          <ImageIcon color="#007AFF" />
          <Text style={styles.optionText}>Choose from Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, { borderBottomWidth: 0 }]}
          onPress={onClose}
        >
          <X color="red" />
          <Text style={[styles.optionText, { color: 'red' }]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#DDD',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EEE',
  },
  optionText: { marginLeft: 15, fontSize: 16, fontWeight: '500' },
});

export default ScanOverlay;
