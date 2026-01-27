import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

interface SnapEditScreenProps {
  onSend: () => void;
  onCancel: () => void;
}

export function SnapEditScreen({ onSend, onCancel }: SnapEditScreenProps) {
  const [showFriendsList, setShowFriendsList] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);

  const friends = [
    { id: 1, username: "alex_m" },
    { id: 2, username: "sarah_k" },
    { id: 3, username: "mike_r" },
    { id: 4, username: "emma_w" },
    { id: 5, username: "john_d" },
    { id: 6, username: "lisa_t" },
  ];

  const toggleFriend = (friendId: number) => {
    setSelectedFriends(prev => 
      prev.includes(friendId) 
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    );
  };

  return (
    <View style={styles.container}>
      {/* Snap Preview */}
      <View style={styles.snapPreview}>
        <Image 
          source={{ uri: "https://picsum.photos/400/600?random=snap" }}
          style={styles.snapImage}
          resizeMode="cover"
        />
        <View style={styles.snapOverlay}>
          <Text style={styles.snapText}>✨ Your Snap ✨</Text>
        </View>
      </View>

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onCancel} style={styles.topButton}>
          <Text style={styles.topButtonIcon}>✕</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowFriendsList(!showFriendsList)} style={styles.topButton}>
          <Text style={styles.topButtonIcon}>👥</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Tools */}
      <View style={styles.editTools}>
        <TouchableOpacity style={styles.toolButton}>
          <Text style={styles.toolIcon}>📝</Text>
          <Text style={styles.toolLabel}>Text</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolButton}>
          <Text style={styles.toolIcon}>🎨</Text>
          <Text style={styles.toolLabel}>Colors</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolButton}>
          <Text style={styles.toolIcon}>😊</Text>
          <Text style={styles.toolLabel}>Emoji</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolButton}>
          <Text style={styles.toolIcon}>✂️</Text>
          <Text style={styles.toolLabel}>Crop</Text>
        </TouchableOpacity>
      </View>

      {/* Friends List */}
      {showFriendsList && (
        <View style={styles.friendsList}>
          <Text style={styles.friendsTitle}>Send to Friends</Text>
          <ScrollView style={styles.friendsScroll} showsVerticalScrollIndicator={false}>
            {friends.map(friend => (
              <TouchableOpacity
                key={friend.id}
                style={[
                  styles.friendItem,
                  selectedFriends.includes(friend.id) && styles.selectedFriend
                ]}
                onPress={() => toggleFriend(friend.id)}
              >
                <View style={styles.friendAvatar}>
                  <Text style={styles.friendAvatarText}>
                    {friend.username.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.friendUsername}>{friend.username}</Text>
                <View style={[
                  styles.checkbox,
                  selectedFriends.includes(friend.id) && styles.checkedBox
                ]}>
                  <Text style={styles.checkIcon}>
                    {selectedFriends.includes(friend.id) ? '✓' : ''}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.storyButton}>
          <Text style={styles.storyIcon}>📖</Text>
          <Text style={styles.storyText}>Add to Story</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={onSend}
          style={[
            styles.sendButton,
            selectedFriends.length > 0 && styles.activeSendButton
          ]}
        >
          <Text style={styles.sendIcon}>➤</Text>
          <Text style={styles.sendText}>
            Send {selectedFriends.length > 0 && `(${selectedFriends.length})`}
          </Text>
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
  snapPreview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  snapImage: {
    width: '100%',
    height: '100%',
  },
  snapOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -30,
    marginLeft: -100,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  snapText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
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
  editTools: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  toolButton: {
    alignItems: 'center',
    gap: 4,
  },
  toolIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  toolLabel: {
    fontSize: 10,
    color: '#FFFFFF',
  },
  friendsList: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
    height: 200,
    backgroundColor: '#002843',
    borderRadius: 16,
    padding: 16,
    zIndex: 15,
  },
  friendsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DAFFFB',
    marginBottom: 12,
  },
  friendsScroll: {
    flex: 1,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 4,
  },
  selectedFriend: {
    backgroundColor: '#176B8733',
  },
  friendAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#176B87',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  friendAvatarText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#DAFFFB',
  },
  friendUsername: {
    flex: 1,
    fontSize: 14,
    color: '#DAFFFB',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#64CCC5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: '#64CCC5',
  },
  checkIcon: {
    fontSize: 12,
    color: '#001C30',
    fontWeight: 'bold',
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 40,
    backgroundColor: '#002843',
    borderTopWidth: 1,
    borderTopColor: '#176B8733',
    zIndex: 10,
  },
  storyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#176B8733',
  },
  storyIcon: {
    fontSize: 16,
    color: '#64CCC5',
  },
  storyText: {
    fontSize: 14,
    color: '#64CCC5',
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#176B8733',
  },
  activeSendButton: {
    backgroundColor: '#64CCC5',
  },
  sendIcon: {
    fontSize: 16,
    color: '#64CCC5',
  },
  sendText: {
    fontSize: 14,
    color: '#64CCC5',
    fontWeight: '600',
  },
});
