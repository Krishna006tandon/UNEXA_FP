import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface SnapCameraScreenProps {
  onCapture: () => void;
  onClose: () => void;
}

export function SnapCameraScreen({ onCapture, onClose }: SnapCameraScreenProps) {
  return (
    <View style={styles.container}>
      {/* Camera Preview */}
      <View style={styles.cameraPreview}>
        <Text style={styles.cameraIcon}>📸</Text>
      </View>

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onClose} style={styles.topButton}>
          <Text style={styles.topButtonIcon}>✕</Text>
        </TouchableOpacity>

        <View style={styles.topButtons}>
          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topButtonIcon}>⚡</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topButtonIcon}>⚙️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topButtonIcon}>🔄</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        <TouchableOpacity style={styles.galleryButton}>
          <Text style={styles.galleryIcon}>🖼️</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onCapture} style={styles.captureButton}>
          <View style={styles.captureInner} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.flashButton}>
          <Text style={styles.flashIcon}>💡</Text>
        </TouchableOpacity>
      </View>

      {/* Side Controls */}
      <View style={styles.sideControls}>
        <TouchableOpacity style={styles.sideButton}>
          <Text style={styles.sideButtonIcon}>😎</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideButton}>
          <Text style={styles.sideButtonIcon}>🎨</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideButton}>
          <Text style={styles.sideButtonIcon}>📝</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideButton}>
          <Text style={styles.sideButtonIcon}>🎵</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001C30',
    position: 'relative',
  },
  cameraPreview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(23, 107, 135, 0.3)',
  },
  cameraIcon: {
    fontSize: 96,
    color: 'rgba(100, 204, 197, 0.3)',
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    zIndex: 10,
  },
  topButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topButtonIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  topButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 40,
    zIndex: 10,
  },
  galleryButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
  },
  flashButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flashIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  sideControls: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -100,
    zIndex: 10,
  },
  sideButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  sideButtonIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});
