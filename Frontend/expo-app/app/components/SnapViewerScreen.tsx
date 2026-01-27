import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

interface SnapViewerScreenProps {
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  username?: string;
}

export function SnapViewerScreen({ onClose, onNext, onPrevious, username = "alex_m" }: SnapViewerScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);

  const snaps = [
    { id: 1, type: 'image', url: 'https://picsum.photos/400/600?random=snap1' },
    { id: 2, type: 'image', url: 'https://picsum.photos/400/600?random=snap2' },
    { id: 3, type: 'image', url: 'https://picsum.photos/400/600?random=snap3' },
  ];

  const handleSnapPress = () => {
    setIsHolding(!isHolding);
  };

  return (
    <View style={styles.container}>
      <View style={styles.snapContainer}>
        <Image 
          source={{ uri: snaps[0].url }}
          style={styles.snapImage}
          resizeMode="cover"
        />
        
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          {snaps.map((_, index) => (
            <View key={index} style={styles.progressTrack}>
              <View 
                style={[
                  styles.progressBar,
                  index === 0 && styles.activeProgress
                ]}
              />
            </View>
          ))}
        </View>

        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
          
          <View style={styles.userInfo}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>
                {username.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.username}>{username}</Text>
          </View>
        </View>

        {/* Bottom Actions */}
        <View style={[styles.bottomActions, isHolding && styles.visibleActions]}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>💬</Text>
            <Text style={styles.actionText}>Chat</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>📷</Text>
            <Text style={styles.actionText}>Camera</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>👁️</Text>
            <Text style={styles.actionText}>View</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>⋯</Text>
            <Text style={styles.actionText}>More</Text>
          </TouchableOpacity>
        </View>

        {/* Navigation Hints */}
        <View style={styles.navigationHints}>
          {onPrevious && (
            <TouchableOpacity onPress={onPrevious} style={styles.navHint}>
              <Text style={styles.navIcon}>←</Text>
            </TouchableOpacity>
          )}
          {onNext && (
            <TouchableOpacity onPress={onNext} style={styles.navHint}>
              <Text style={styles.navIcon}>→</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  snapContainer: {
    flex: 1,
    position: 'relative',
  },
  snapImage: {
    width: '100%',
    height: '100%',
  },
  progressContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    gap: 4,
    zIndex: 10,
  },
  progressTrack: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
    width: '0%',
  },
  activeProgress: {
    width: '60%',
  },
  topBar: {
    position: 'absolute',
    top: 24,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#64CCC5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatarText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#001C30',
  },
  username: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bottomActions: {
    position: 'absolute',
    bottom: 40,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    opacity: 0,
    zIndex: 10,
  },
  visibleActions: {
    opacity: 1,
  },
  actionButton: {
    alignItems: 'center',
    gap: 4,
  },
  actionIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  actionText: {
    fontSize: 10,
    color: '#FFFFFF',
  },
  navigationHints: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 5,
  },
  navHint: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});
