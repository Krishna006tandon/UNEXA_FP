import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';

interface VideoPlayerScreenProps {
  onBack: () => void;
}

export function VideoPlayerScreen({ onBack }: VideoPlayerScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [likes, setLikes] = useState(12500);
  const [dislikes, setDislikes] = useState(234);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const comments = [
    {
      id: 1,
      user: "alex_m",
      text: "Amazing content! Keep it up 🔥",
      likes: 234,
      time: "2h ago",
    },
    {
      id: 2,
      user: "sarah_k",
      text: "This is exactly what I needed to see today",
      likes: 89,
      time: "3h ago",
    },
    {
      id: 3,
      user: "mike_r",
      text: "Great explanation! Very helpful 👍",
      likes: 156,
      time: "5h ago",
    },
  ];

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
      if (isDisliked) {
        setDislikes(dislikes - 1);
        setIsDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (isDisliked) {
      setDislikes(dislikes - 1);
      setIsDisliked(false);
    } else {
      setDislikes(dislikes + 1);
      setIsDisliked(true);
      if (isLiked) {
        setLikes(likes - 1);
        setIsLiked(false);
      }
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Video Player */}
      <View style={styles.videoPlayer}>
        <Image 
          source={{ uri: "https://picsum.photos/400/225?random=video" }}
          style={styles.videoThumbnail}
          resizeMode="cover"
        />
        
        {/* Video Controls Overlay */}
        <View style={styles.videoOverlay}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.playButton}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <Text style={styles.playIcon}>{isPlaying ? '⏸️' : '▶️'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.moreButton}>
            <Text style={styles.moreIcon}>⋯</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Video Info */}
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle}>Complete Guide to React Native Development</Text>
        <Text style={styles.videoStats}>125K views • 2 days ago</Text>
        
        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
            <Text style={[styles.actionIcon, isLiked && styles.liked]}>
              {isLiked ? '👍' : '👍🏻'}
            </Text>
            <Text style={styles.actionText}>{likes.toLocaleString()}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleDislike} style={styles.actionButton}>
            <Text style={[styles.actionIcon, isDisliked && styles.disliked]}>
              {isDisliked ? '👎' : '👎🏻'}
            </Text>
            <Text style={styles.actionText}>{dislikes}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>💬</Text>
            <Text style={styles.actionText}>234</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>↗️</Text>
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Channel Info */}
      <View style={styles.channelInfo}>
        <View style={styles.channelHeader}>
          <View style={styles.channelAvatar}>
            <Text style={styles.channelAvatarText}>CD</Text>
          </View>
          <View style={styles.channelDetails}>
            <Text style={styles.channelName}>CodeMaster</Text>
            <Text style={styles.channelSubscribers}>1.2M subscribers</Text>
          </View>
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeText}>Subscribe</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.channelDescription}>
          Learn to build amazing mobile apps with React Native. Daily tutorials, tips, and tricks for developers of all levels!
        </Text>
      </View>

      {/* Comments Section */}
      <View style={styles.commentsSection}>
        <Text style={styles.commentsTitle}>Comments ({comments.length})</Text>
        
        {comments.map(comment => (
          <View key={comment.id} style={styles.comment}>
            <View style={styles.commentAvatar}>
              <Text style={styles.commentAvatarText}>
                {comment.user.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.commentContent}>
              <View style={styles.commentHeader}>
                <Text style={styles.commentUser}>{comment.user}</Text>
                <Text style={styles.commentTime}>{comment.time}</Text>
              </View>
              <Text style={styles.commentText}>{comment.text}</Text>
              <View style={styles.commentActions}>
                <TouchableOpacity style={styles.commentAction}>
                  <Text style={styles.commentActionIcon}>👍</Text>
                  <Text style={styles.commentActionText}>{comment.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.commentAction}>
                  <Text style={styles.commentActionIcon}>💬</Text>
                  <Text style={styles.commentActionText}>Reply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001C30',
  },
  videoPlayer: {
    position: 'relative',
    height: 225,
    backgroundColor: '#000',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  videoInfo: {
    padding: 16,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DAFFFB',
    marginBottom: 8,
  },
  videoStats: {
    fontSize: 14,
    color: '#64CCC5',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#176B8733',
    paddingTop: 16,
  },
  actionButton: {
    alignItems: 'center',
    gap: 4,
  },
  actionIcon: {
    fontSize: 20,
    color: '#64CCC5',
  },
  liked: {
    color: '#4CAF50',
  },
  disliked: {
    color: '#F44336',
  },
  actionText: {
    fontSize: 12,
    color: '#64CCC5',
  },
  channelInfo: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#176B8733',
  },
  channelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  channelAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#176B87',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  channelAvatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DAFFFB',
  },
  channelDetails: {
    flex: 1,
  },
  channelName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DAFFFB',
    marginBottom: 2,
  },
  channelSubscribers: {
    fontSize: 12,
    color: '#64CCC5',
  },
  subscribeButton: {
    backgroundColor: '#64CCC5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  subscribeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#001C30',
  },
  channelDescription: {
    fontSize: 14,
    color: '#DAFFFB',
    lineHeight: 20,
  },
  commentsSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#176B8733',
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DAFFFB',
    marginBottom: 16,
  },
  comment: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#176B87',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  commentAvatarText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#DAFFFB',
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentUser: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DAFFFB',
    marginRight: 8,
  },
  commentTime: {
    fontSize: 12,
    color: '#64CCC5',
  },
  commentText: {
    fontSize: 14,
    color: '#DAFFFB',
    marginBottom: 8,
    lineHeight: 18,
  },
  commentActions: {
    flexDirection: 'row',
    gap: 16,
  },
  commentAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  commentActionIcon: {
    fontSize: 16,
    color: '#64CCC5',
  },
  commentActionText: {
    fontSize: 12,
    color: '#64CCC5',
  },
});
