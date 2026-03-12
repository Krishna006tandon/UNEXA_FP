import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, ScrollView, Dimensions } from 'react-native';
import { CameraView, useCameraPermissions, FlashMode, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

const { width, height } = Dimensions.get('window');

interface SnapCameraScreenProps {
  onCapture: (uri: string) => void;
  onClose: () => void;
}

interface Filter {
  name: string;
  filter: string;
  icon: string;
}

const filters: Filter[] = [
  { name: 'Normal', filter: 'none', icon: '✨' },
  { name: 'Vintage', filter: 'sepia(0.6)', icon: '📷' },
  { name: 'B&W', filter: 'grayscale(1)', icon: '⚫' },
  { name: 'Vivid', filter: 'saturate(1.5)', icon: '🌈' },
  { name: 'Warm', filter: 'brightness(1.1) sepia(0.3)', icon: '☀️' },
  { name: 'Cool', filter: 'hue-rotate(30deg) saturate(0.8)', icon: '❄️' },
  { name: 'Dramatic', filter: 'contrast(1.4) brightness(0.9)', icon: '🎭' },
  { name: 'Fade', filter: 'brightness(1.2) contrast(0.85)', icon: '🌫️' },
];

export function SnapCameraScreen({ onCapture, onClose }: SnapCameraScreenProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [zoom, setZoom] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<Filter>(filters[0]);
  const [showFilters, setShowFilters] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [cameraMode, setCameraMode] = useState<'photo' | 'video'>('photo');
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    requestPermission();
    requestMediaPermission();
  }, []);

  const toggleCameraFacing = () => {
    setFacing(current => current === 'back' ? 'front' : 'back');
  };

  const toggleFlash = () => {
    const modes: FlashMode[] = ['off', 'on', 'auto'];
    const currentIndex = modes.indexOf(flash);
    setFlash(modes[(currentIndex + 1) % modes.length]);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: false,
          exif: true,
        });
        
        if (photo && photo.uri) {
          // Save to media library if permission granted
          if (mediaPermission?.granted) {
            await MediaLibrary.createAssetAsync(photo.uri);
          }
          
          // Pass URI to parent component
          onCapture(photo.uri);
        }
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  };

  const pickImageFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 5],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        onCapture(selectedImage.uri);
        setShowGallery(false);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to select image from gallery');
    }
  };

  const pickMultipleImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        // For now, just use the first one - can be extended for multi-upload
        onCapture(result.assets[0].uri);
        setShowGallery(false);
      }
    } catch (error) {
      console.error('Error picking images:', error);
      Alert.alert('Error', 'Failed to select images');
    }
  };

  const startRecording = async () => {
    if (cameraRef.current && !isRecording) {
      try {
        setIsRecording(true);
        
        const recording = await cameraRef.current.recordAsync({
          maxDuration: 30, // 30 seconds max
        });
        
        if (recording && recording.uri) {
          // Save video to media library
          if (mediaPermission?.granted) {
            await MediaLibrary.createAssetAsync(recording.uri);
          }
          
          // Pass video URI to parent
          onCapture(recording.uri);
          Alert.alert('Success', 'Video recorded successfully!');
        }
      } catch (error) {
        console.error('Error recording video:', error);
        Alert.alert('Error', 'Failed to record video');
      } finally {
        setIsRecording(false);
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  const compressImage = async (uri: string): Promise<string> => {
    try {
      // Compress and resize image for faster upload
      const result = await ImageManipulator.manipulateAsync(
        uri,
        [
          { resize: { width: 1080 } }, // Resize to max width 1080px
        ],
        { 
          compress: 0.8, // 80% quality
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );
      
      console.log('Image compressed from original size');
      return result.uri;
    } catch (error) {
      console.error('Error compressing image:', error);
      // Return original URI if compression fails
      return uri;
    }
  };

  if (!permission || !mediaPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Requesting permissions...</Text>
      </View>
    );
  }

  if (!permission.granted || !mediaPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          We need camera and media library permissions to continue
        </Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
          <Text style={styles.permissionButtonText}>Grant Permissions</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Camera Preview with Filter */}
      <CameraView
        ref={cameraRef}
        style={[styles.camera, { filter: selectedFilter.filter }]}
        facing={facing}
        flash={flash}
        zoom={zoom}
        mute={false}
      >
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onClose} style={styles.topButton}>
            <Text style={styles.topButtonIcon}>✕</Text>
          </TouchableOpacity>

          <View style={styles.topButtons}>
            <TouchableOpacity onPress={toggleFlash} style={styles.topButton}>
              <Text style={styles.topButtonIcon}>
                {flash === 'on' ? '⚡' : flash === 'auto' ? '⚡️' : '⚡'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowFilters(true)} style={styles.topButton}>
              <Text style={styles.topButtonIcon}>🎨</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setCameraMode(cameraMode === 'photo' ? 'video' : 'photo')} 
              style={styles.topButton}
            >
              <Text style={styles.topButtonIcon}>{cameraMode === 'photo' ? '🎥' : '📸'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleCameraFacing} style={styles.topButton}>
              <Text style={styles.topButtonIcon}>🔄</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          <TouchableOpacity onPress={() => setShowGallery(true)} style={styles.galleryButton}>
            <Text style={styles.galleryIcon}>🖼️</Text>
          </TouchableOpacity>

          {cameraMode === 'photo' ? (
            <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
              <View style={styles.captureInner} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              onPress={isRecording ? stopRecording : startRecording} 
              style={[styles.captureButton, isRecording && styles.recordingButton]}
            >
              <View style={[styles.captureInner, isRecording && styles.recordingInner]} />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={pickMultipleImages} style={styles.flashButton}>
            <Text style={styles.flashIcon}>📁</Text>
          </TouchableOpacity>
        </View>

        {/* Side Controls */}
        <View style={styles.sideControls}>
          <TouchableOpacity style={styles.sideButton}>
            <Text style={styles.sideButtonIcon}>😎</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowFilters(true)} style={styles.sideButton}>
            <Text style={styles.sideButtonIcon}>🎨</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sideButton}>
            <Text style={styles.sideButtonIcon}>📝</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sideButton}>
            <Text style={styles.sideButtonIcon}>🎵</Text>
          </TouchableOpacity>
        </View>
      </CameraView>

      {/* Filters Modal */}
      <Modal
        visible={showFilters}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.filtersModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Filter</Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter.name}
                  style={[
                    styles.filterItem,
                    selectedFilter.name === filter.name && styles.selectedFilter
                  ]}
                  onPress={() => {
                    setSelectedFilter(filter);
                    setShowFilters(false);
                  }}
                >
                  <View style={[styles.filterPreview, { filter: filter.filter }]}>
                    <Text style={styles.filterIcon}>{filter.icon}</Text>
                  </View>
                  <Text style={styles.filterName}>{filter.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Gallery Modal */}
      <Modal
        visible={showGallery}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowGallery(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.galleryModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select From Gallery</Text>
              <TouchableOpacity onPress={() => setShowGallery(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.galleryOptions}>
              <TouchableOpacity onPress={pickImageFromGallery} style={styles.galleryOption}>
                <Text style={styles.galleryOptionIcon}>🖼️</Text>
                <Text style={styles.galleryOptionText}>Single Image</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={pickMultipleImages} style={styles.galleryOption}>
                <Text style={styles.galleryOptionIcon}>📁</Text>
                <Text style={styles.galleryOptionText}>Multiple Images</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001C30',
  },
  permissionText: {
    color: '#DAFFFB',
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
  },
  permissionButton: {
    backgroundColor: '#64CCC5',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  permissionButtonText: {
    color: '#001C30',
    fontWeight: 'bold',
    fontSize: 16,
  },
  camera: {
    flex: 1,
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
  recordingButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
    borderColor: '#FF0000',
  },
  recordingInner: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FF0000',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  filtersModal: {
    backgroundColor: '#176B87',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: height * 0.4,
  },
  galleryModal: {
    backgroundColor: '#176B87',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: '#DAFFFB',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    color: '#DAFFFB',
    fontSize: 24,
  },
  filterItem: {
    alignItems: 'center',
    marginRight: 16,
    padding: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  selectedFilter: {
    backgroundColor: 'rgba(100, 204, 197, 0.3)',
    borderWidth: 2,
    borderColor: '#64CCC5',
  },
  filterPreview: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#001C30',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  filterIcon: {
    fontSize: 32,
  },
  filterName: {
    color: '#DAFFFB',
    fontSize: 14,
  },
  galleryOptions: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
  },
  galleryOption: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
    minWidth: 150,
  },
  galleryOptionIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  galleryOptionText: {
    color: '#DAFFFB',
    fontSize: 16,
    fontWeight: '600',
  },
});
