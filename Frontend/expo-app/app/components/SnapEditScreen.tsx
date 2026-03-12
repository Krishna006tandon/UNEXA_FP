import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert, ActivityIndicator, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImageManipulator from 'expo-image-manipulator';

interface SnapEditScreenProps {
  imageUri: string;
  onSend: (uri: string) => void;
  onCancel: () => void;
}

interface Sticker {
  id: string;
  emoji: string;
  x: number;
  y: number;
  size: number;
}

interface TextOverlay {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  size: number;
}

export function SnapEditScreen({ imageUri, onSend, onCancel }: SnapEditScreenProps) {
  const [showStickers, setShowStickers] = useState(false);
  const [showTextTools, setShowTextTools] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [textOverlays, setTextOverlays] = useState<TextOverlay[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [textInput, setTextInput] = useState('');
  const [textColor, setTextColor] = useState('#FFFFFF');
  
  const filters = [
    { name: 'Normal', filter: 'none' },
    { name: 'Vintage', filter: 'sepia(0.6)' },
    { name: 'B&W', filter: 'grayscale(1)' },
    { name: 'Vivid', filter: 'saturate(1.5)' },
    { name: 'Warm', filter: 'brightness(1.1) sepia(0.3)' },
    { name: 'Cool', filter: 'hue-rotate(30deg)' },
  ];

  const stickerEmojis = ['😊', '😍', '🔥', '❤️', '✨', '🎉', '💯', '👍', '😂', '🙌', '💪', '⭐'];

  const colors = ['#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

  const addSticker = (emoji: string) => {
    const newSticker: Sticker = {
      id: Date.now().toString(),
      emoji,
      x: Math.random() * 200,
      y: Math.random() * 300,
      size: 40,
    };
    setStickers([...stickers, newSticker]);
    setShowStickers(false);
  };

  const addTextOverlay = () => {
    if (!textInput.trim()) return;
    
    const newText: TextOverlay = {
      id: Date.now().toString(),
      text: textInput,
      x: 50,
      y: 100,
      color: textColor,
      size: 24,
    };
    setTextOverlays([...textOverlays, newText]);
    setTextInput('');
    setShowTextTools(false);
  };

  const removeSticker = (id: string) => {
    setStickers(stickers.filter(s => s.id !== id));
  };

  const removeText = (id: string) => {
    setTextOverlays(textOverlays.filter(t => t.id !== id));
  };

  const handleSend = async () => {
    setUploading(true);
    
    try {
      // Compress image before sending (if it's an image)
      let finalUri = imageUri;
      if (imageUri && !imageUri.includes('video')) {
        try {
          finalUri = await compressImage(imageUri);
          console.log('Image compressed successfully');
        } catch (error) {
          console.error('Compression failed, using original:', error);
        }
      }
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
        onSend(finalUri);
        Alert.alert('Success', 'Snap sent successfully!');
      }, 2500);
    } catch (error) {
      setUploading(false);
      setUploadProgress(0);
      console.error('Error sending snap:', error);
      Alert.alert('Error', 'Failed to send snap');
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

  return (
    <View style={styles.container}>
      {/* Image Preview with Filter */}
      <View style={[styles.imageContainer, { filter: selectedFilter }]}>
        <Image 
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
        />
        
        {/* Render Stickers */}
        {stickers.map(sticker => (
          <TouchableOpacity
            key={sticker.id}
            style={[
              styles.sticker,
              { left: sticker.x, top: sticker.y }
            ]}
            onPress={() => removeSticker(sticker.id)}
          >
            <Text style={{ fontSize: sticker.size }}>{sticker.emoji}</Text>
          </TouchableOpacity>
        ))}
        
        {/* Render Text Overlays */}
        {textOverlays.map(text => (
          <TouchableOpacity
            key={text.id}
            style={[
              styles.textOverlay,
              { left: text.x, top: text.y }
            ]}
            onPress={() => removeText(text.id)}
          >
            <Text style={{ color: text.color, fontWeight: 'bold', fontSize: text.size }}>{text.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onCancel} style={styles.topButton}>
          <Ionicons name="close" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#001C30" />
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Tools */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.toolsContainer}>
        <TouchableOpacity 
          style={styles.toolButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons name="color-filter" size={28} color="#64CCC5" />
          <Text style={styles.toolLabel}>Filters</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.toolButton}
          onPress={() => setShowStickers(!showStickers)}
        >
          <Ionicons name="happy" size={28} color="#64CCC5" />
          <Text style={styles.toolLabel}>Stickers</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.toolButton}
          onPress={() => setShowTextTools(!showTextTools)}
        >
          <Ionicons name="text" size={28} color="#64CCC5" />
          <Text style={styles.toolLabel}>Text</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.toolButton}>
          <Ionicons name="brush" size={28} color="#64CCC5" />
          <Text style={styles.toolLabel}>Draw</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.toolButton}>
          <Ionicons name="crop" size={28} color="#64CCC5" />
          <Text style={styles.toolLabel}>Crop</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.toolButton}>
          <Ionicons name="refresh" size={28} color="#64CCC5" />
          <Text style={styles.toolLabel}>Rotate</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Filters Panel */}
      {showFilters && (
        <View style={styles.panel}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters.map(filter => (
              <TouchableOpacity
                key={filter.name}
                style={[
                  styles.filterItem,
                  selectedFilter === filter.filter && styles.selectedFilterItem
                ]}
                onPress={() => {
                  setSelectedFilter(filter.filter);
                  setShowFilters(false);
                }}
              >
                <View style={[styles.filterPreview, { filter: filter.filter }]}>
                  <Image source={{ uri: imageUri }} style={styles.filterThumbnail} />
                </View>
                <Text style={styles.filterName}>{filter.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Stickers Panel */}
      {showStickers && (
        <View style={styles.panel}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {stickerEmojis.map(emoji => (
              <TouchableOpacity
                key={emoji}
                style={styles.stickerItem}
                onPress={() => addSticker(emoji)}
              >
                <Text style={styles.stickerEmoji}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Text Tools Panel */}
      {showTextTools && (
        <View style={styles.panel}>
          <View style={styles.textInputContainer}>
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter text..."
              style={styles.textInput}
            />
            <View style={styles.colorPicker}>
              {colors.map(color => (
                <TouchableOpacity
                  key={color}
                  style={[styles.colorOption, { backgroundColor: color }]}
                  onPress={() => setTextColor(color)}
                >
                  {textColor === color && <Ionicons name="checkmark" size={16} color="#000000" />}
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity onPress={addTextOverlay} style={styles.addTextButton}>
              <Text style={styles.addTextText}>Add Text</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Upload Progress Modal */}
      <Modal visible={uploading} transparent animationType="fade">
        <View style={styles.uploadModal}>
          <View style={styles.uploadContent}>
            <ActivityIndicator size="large" color="#64CCC5" />
            <Text style={styles.uploadText}>Sending Snap...</Text>
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: `${uploadProgress}%` }]} />
            </View>
            <Text style={styles.progressText}>{uploadProgress}%</Text>
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
  imageContainer: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  sticker: {
    position: 'absolute',
    zIndex: 10,
  },
  textOverlay: {
    position: 'absolute',
    zIndex: 10,
    fontWeight: 'bold',
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
    zIndex: 20,
  },
  topButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButton: {
    flexDirection: 'row',
    backgroundColor: '#64CCC5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    gap: 8,
  },
  sendText: {
    color: '#001C30',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toolsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 12,
    zIndex: 20,
  },
  toolButton: {
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 4,
  },
  toolLabel: {
    color: '#64CCC5',
    fontSize: 12,
  },
  panel: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(23, 107, 135, 0.9)',
    padding: 16,
    zIndex: 19,
  },
  filterItem: {
    alignItems: 'center',
    marginRight: 16,
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  selectedFilterItem: {
    backgroundColor: 'rgba(100, 204, 197, 0.3)',
    borderWidth: 2,
    borderColor: '#64CCC5',
  },
  filterPreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 6,
  },
  filterThumbnail: {
    width: '100%',
    height: '100%',
  },
  filterName: {
    color: '#DAFFFB',
    fontSize: 12,
  },
  stickerItem: {
    marginRight: 16,
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
  },
  stickerEmoji: {
    fontSize: 32,
  },
  textInputContainer: {
    gap: 12,
  },
  textInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 16,
  },
  colorPicker: {
    flexDirection: 'row',
    gap: 8,
  },
  colorOption: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addTextButton: {
    backgroundColor: '#64CCC5',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  addTextText: {
    color: '#001C30',
    fontWeight: 'bold',
    fontSize: 16,
  },
  uploadModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  uploadContent: {
    backgroundColor: '#176B87',
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 300,
  },
  uploadText: {
    color: '#DAFFFB',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 16,
  },
  progressContainer: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#64CCC5',
  },
  progressText: {
    color: '#DAFFFB',
    fontSize: 16,
    marginTop: 12,
  },
});
