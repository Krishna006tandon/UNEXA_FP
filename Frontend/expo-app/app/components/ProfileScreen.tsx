import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { userAPI } from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProfileScreenProps {
  onOpenSettings: () => void;
}

export function ProfileScreen({ onOpenSettings }: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState("posts");
  const [followAnimation] = useState(new Animated.Value(1));
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserProfile();
  }, []);

  useEffect(() => {
    if (userProfile) {
      loadUserPosts();
      loadUserStats();
    }
  }, [userProfile, activeTab]);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      console.log('Loading user profile...');
      const profileData = await userAPI.getProfile();
      console.log('Profile data received:', profileData);
      setUserProfile(profileData);
    } catch (error) {
      // Silent fallback - try to get user data from login
      try {
        const loginResponse = await AsyncStorage.getItem('lastLoginResponse');
        if (loginResponse) {
          const loginData = JSON.parse(loginResponse);
          setUserProfile({
            id: loginData.user._id,
            name: loginData.user.name,
            username: loginData.user.username,
            bio: loginData.user.bio || 'No bio yet',
            avatar: loginData.user.avatar
          });
          setUserStats({
            posts: loginData.user.savedPosts?.length || 0,
            followers: loginData.user.followers?.length || 0,
            following: loginData.user.following?.length || 0
          });
        } else {
          throw new Error('No login data found');
        }
      } catch (e) {
        // Final fallback to guest profile
        setUserProfile({
          id: 1,
          name: 'Guest User',
          username: 'guest_user',
          bio: 'Welcome to UNEXA! Please log in to see your profile.',
          avatar: null
        });
        setUserStats({
          posts: 0,
          followers: 0,
          following: 0
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const loadUserPosts = async () => {
    try {
      const postsData = await userAPI.getUserPosts(userProfile.id);
      setUserPosts(postsData);
    } catch (error) {
      // Silent fallback - set empty posts when API fails
      setUserPosts([]);
    }
  };

  const loadUserStats = async () => {
    try {
      const statsData = await userAPI.getUserStats(userProfile.id);
      setUserStats(statsData);
    } catch (error) {
      // Silent fallback - set default stats when API fails
      setUserStats({
        posts: 0,
        followers: 0,
        following: 0
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!userProfile) {
    return (
      <View style={styles.container}>
        <Text>No user profile found.</Text>
      </View>
    );
  }

  const tabs = [
    { id: "posts", icon: "", label: "Posts" },
    { id: "snaps", icon: "", label: "Snaps" },
    { id: "videos", icon: "", label: "Videos" },
    { id: "tagged", icon: "", label: "Tagged" },
  ];

  const posts = userPosts.map(post => ({
    id: post.id,
    type: activeTab,
  }));

  const handleFollowPress = () => {
    Animated.sequence([
      Animated.timing(followAnimation, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(followAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={onOpenSettings} style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <LinearGradient
        colors={['#176B8733', '#64CCC522']}
        style={styles.profileInfo}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={['#64CCC5', '#176B87']}
              style={styles.avatar}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.avatarText}>{userProfile?.name?.charAt(0)?.toUpperCase() || 'U'}</Text>
            </LinearGradient>
            <TouchableOpacity style={styles.editAvatar}>
              <LinearGradient
                colors={['#64CCC5', '#176B87']}
                style={styles.editAvatarGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.editIcon}>📷</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats?.posts || 0}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats?.followers || 0}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats?.following || 0}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.displayName}>{userProfile?.name || 'Loading...'}</Text>
          <Text style={styles.username}>@{userProfile?.username || 'loading'}</Text>
          <Text style={styles.bio}>
            {userProfile?.bio || 'No bio yet'}
          </Text>
        </View>

        <View style={styles.actionButtons}>
          <Animated.View style={{ transform: [{ scale: followAnimation }] }}>
            <TouchableOpacity style={styles.editProfileButton} onPress={handleFollowPress}>
              <LinearGradient
                colors={['#176B87', '#64CCC5']}
                style={styles.editProfileGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.editProfileText}>Edit Profile</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity style={styles.shareButton}>
            <LinearGradient
              colors={['#64CCC533', '#176B8733']}
              style={styles.shareButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.shareIcon}>↗️</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
          >
            <LinearGradient
              colors={activeTab === tab.id ? ['#64CCC5', '#176B87'] : ['transparent', 'transparent']}
              style={[styles.tabGradient, activeTab === tab.id && styles.activeTabGradient]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              <Text style={[styles.tabIcon, activeTab === tab.id && styles.activeTabIcon]}>
                {tab.icon}
              </Text>
            </LinearGradient>
            <Text style={[styles.tabLabel, activeTab === tab.id && styles.activeTabLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Posts Grid */}
      <View style={styles.postsGrid}>
        {posts.map(post => (
          <View key={post.id} style={styles.postItem}>
            <Image 
              source={{ uri: `https://picsum.photos/150/150?random=${post.id}` }}
              style={styles.postImage}
              resizeMode="cover"
            />
            {post.type === 'videos' && (
              <View style={styles.videoOverlay}>
                <Text style={styles.playIcon}>▶️</Text>
              </View>
            )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#176B8733',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#DAFFFB',
  },
  settingsButton: {
    padding: 8,
  },
  settingsIcon: {
    fontSize: 20,
    color: '#64CCC5',
  },
  profileInfo: {
    padding: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#176B87',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#DAFFFB',
  },
  editAvatar: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#64CCC5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#001C30',
  },
  editAvatarGradient: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    fontSize: 14,
    color: '#001C30',
  },
  stats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DAFFFB',
  },
  statLabel: {
    fontSize: 12,
    color: '#64CCC5',
    marginTop: 4,
  },
  userInfo: {
    marginBottom: 20,
  },
  displayName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DAFFFB',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: '#64CCC5',
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: '#DAFFFB',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  editProfileButton: {
    flex: 1,
    borderRadius: 8,
  },
  editProfileGradient: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editProfileText: {
    color: '#DAFFFB',
    fontSize: 14,
    fontWeight: '600',
  },
  shareButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButtonGradient: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIcon: {
    fontSize: 18,
    color: '#64CCC5',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#176B8733',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 4,
  },
  tabGradient: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabGradient: {
    // Additional styling for active tab gradient
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: '#64CCC5',
  },
  tabIcon: {
    fontSize: 16,
    color: '#64CCC5',
  },
  activeTabIcon: {
    color: '#DAFFFB',
  },
  tabLabel: {
    fontSize: 12,
    color: '#64CCC5',
  },
  activeTabLabel: {
    color: '#DAFFFB',
    fontWeight: '600',
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 1,
  },
  postItem: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 1,
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#176B8733',
  },
  videoOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    fontSize: 12,
    color: '#FFFFFF',
  },
});
