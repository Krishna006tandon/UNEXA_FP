import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function FeedScreen() {
  const [posts, setPosts] = useState([]);

  const stories = [];

  const [likeAnimations, setLikeAnimations] = useState<{[key: number]: Animated.Value}>({});

  const handleLike = (postId: number) => {
    // Create animation if not exists
    if (!likeAnimations[postId]) {
      const newAnim = new Animated.Value(0);
      setLikeAnimations(prev => ({ ...prev, [postId]: newAnim }));
      
      // Animate like
      Animated.sequence([
        Animated.timing(newAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(newAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
    }

    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleSave = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isSaved: !post.isSaved }
        : post
    ));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Stories */}
      <LinearGradient
        colors={['#176B8733', '#64CCC533']}
        style={styles.storiesContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.storyItem}>
          <View style={styles.addStory}>
            <LinearGradient
              colors={['#64CCC5', '#176B87']}
              style={styles.addStoryGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.addIcon}>+</Text>
            </LinearGradient>
          </View>
          <Text style={styles.storyUsername}>Your story</Text>
        </View>
        {stories.map(story => (
          <View key={story.id} style={styles.storyItem}>
            <LinearGradient
              colors={story.hasNew ? ['#64CCC5', '#176B87'] : ['#176B87', '#001C30']}
              style={[styles.storyAvatar, story.hasNew && styles.storyAvatarNew]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.storyAvatarText}>
                {story.username.charAt(0).toUpperCase()}
              </Text>
            </LinearGradient>
            <Text style={styles.storyUsername}>{story.username}</Text>
          </View>
        ))}
      </LinearGradient>

      {/* Posts */}
      <View style={styles.postsContainer}>
        {posts.map(post => (
          <View key={post.id} style={styles.post}>
            {/* Post Header */}
            <View style={styles.postHeader}>
              <View style={styles.postUserInfo}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {post.username.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View>
                  <Text style={styles.username}>{post.username}</Text>
                  <Text style={styles.timeAgo}>{post.timeAgo}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.moreButton}>
                <Text style={styles.moreIcon}>⋯</Text>
              </TouchableOpacity>
            </View>

            {/* Post Image */}
            <View style={styles.postImage}>
              <Image 
                source={{ uri: `https://picsum.photos/400/300?random=${post.id}` }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>

            {/* Post Actions */}
            <View style={styles.postActions}>
              <TouchableOpacity onPress={() => handleLike(post.id)}>
                <Animated.View
                  style={{
                    transform: [{
                      scale: likeAnimations[post.id]?.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.3],
                      }) || 1,
                    }],
                  }}
                >
                  <Text style={[styles.actionIcon, post.isLiked && styles.liked]}>
                    {post.isLiked ? '❤️' : '🤍'}
                  </Text>
                </Animated.View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Animated.View style={styles.actionButton}>
                  <Text style={styles.actionIcon}>💬</Text>
                </Animated.View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Animated.View style={styles.actionButton}>
                  <Text style={styles.actionIcon}>↗️</Text>
                </Animated.View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSave(post.id)} style={styles.saveButton}>
                <Animated.View
                  style={{
                    transform: [{
                      rotate: post.isSaved ? '0deg' : '180deg',
                    }],
                  }}
                >
                  <Text style={[styles.actionIcon, post.isSaved && styles.saved]}>
                    {post.isSaved ? '🔖' : '📑'}
                  </Text>
                </Animated.View>
              </TouchableOpacity>
            </View>

            {/* Post Stats */}
            <View style={styles.postStats}>
              <Text style={styles.likes}>{post.likes.toLocaleString()} likes</Text>
              <Text style={styles.comments}>{post.comments} comments</Text>
            </View>

            {/* Post Caption */}
            <View style={styles.postCaption}>
              <Text style={styles.captionUsername}>{post.username}</Text>
              <Text style={styles.captionText}>{post.caption}</Text>
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
  storiesContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#176B8733',
    borderRadius: 16,
    margin: 16,
    marginBottom: 8,
  },
  storyItem: {
    alignItems: 'center',
    gap: 4,
  },
  addStory: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#64CCC5',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#176B8733',
  },
  addStoryGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    fontSize: 24,
    color: '#64CCC5',
    fontWeight: 'bold',
  },
  storyAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#176B87',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  storyAvatarNew: {
    borderWidth: 3,
  },
  storyAvatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DAFFFB',
  },
  storyUsername: {
    fontSize: 12,
    color: '#64CCC5',
    textAlign: 'center',
  },
  postsContainer: {
    paddingBottom: 20,
  },
  post: {
    marginBottom: 20,
    backgroundColor: '#002843',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  postUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#176B87',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DAFFFB',
  },
  username: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DAFFFB',
  },
  timeAgo: {
    fontSize: 12,
    color: '#64CCC5',
  },
  moreButton: {
    padding: 4,
  },
  moreIcon: {
    fontSize: 20,
    color: '#DAFFFB',
  },
  postImage: {
    height: 300,
    backgroundColor: '#176B8733',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  actionIcon: {
    fontSize: 24,
  },
  liked: {
    color: '#FF6B6B',
  },
  saved: {
    color: '#64CCC5',
  },
  actionButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#176B8733',
  },
  saveButton: {
    padding: 8,
    borderRadius: 12,
  },
  postStats: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  likes: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DAFFFB',
    marginBottom: 4,
  },
  comments: {
    fontSize: 14,
    color: '#64CCC5',
  },
  postCaption: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  captionUsername: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DAFFFB',
    marginRight: 8,
  },
  captionText: {
    fontSize: 14,
    color: '#DAFFFB',
    flex: 1,
  },
});
