import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';

interface SnapsScreenProps {
  onSnapSelect: (snapId: number) => void;
  onCamera: () => void;
}

export function SnapsScreen({ onSnapSelect, onCamera }: SnapsScreenProps) {
  const [activeTab, setActiveTab] = useState('friends');
  
  const friendSnaps = [
    { id: 1, username: "alex_m", hasStory: true, viewed: false, time: "2m" },
    { id: 2, username: "sarah_k", hasStory: true, viewed: false, time: "15m" },
    { id: 3, username: "mike_r", hasStory: true, viewed: true, time: "1h" },
    { id: 4, username: "emma_w", hasStory: true, viewed: false, time: "3h" },
    { id: 5, username: "john_d", hasStory: true, viewed: true, time: "5h" },
    { id: 6, username: "lisa_t", hasStory: false, viewed: false, time: "" },
  ];

  const discoverSnaps = [
    { id: 7, username: "tech_news", hasStory: true, viewed: false, subscribers: "1.2M" },
    { id: 8, username: "foodie", hasStory: true, viewed: false, subscribers: "890K" },
    { id: 9, username: "travel_vibes", hasStory: true, viewed: true, subscribers: "2.1M" },
    { id: 10, username: "fitness_guru", hasStory: true, viewed: false, subscribers: "650K" },
  ];

  const spotlightSnaps = [
    { id: 11, title: "Amazing Sunset Views", creator: "nature_lover", views: "45K", likes: "2.1K" },
    { id: 12, title: "Street Food Tour", creator: "food_adventures", views: "32K", likes: "1.8K" },
    { id: 13, title: "City Lights at Night", creator: "urban_explorer", views: "28K", likes: "1.5K" },
  ];

  const renderSnapsList = (snaps: any[], isDiscover: boolean = false) => (
    <ScrollView style={styles.snapsList} showsVerticalScrollIndicator={false}>
      {snaps.map(snap => (
        <TouchableOpacity
          key={snap.id}
          style={styles.snapItem}
          onPress={() => snap.hasStory && onSnapSelect(snap.id)}
        >
          <View style={styles.snapAvatarContainer}>
            <View style={[
              styles.snapAvatar,
              snap.hasStory && !snap.viewed && styles.unviewedStory,
              snap.hasStory && snap.viewed && styles.viewedStory
            ]}>
              <Text style={styles.snapAvatarText}>
                {snap.username ? snap.username.charAt(0).toUpperCase() : snap.title.charAt(0).toUpperCase()}
              </Text>
            </View>
            {snap.hasStory && !snap.viewed && (
              <View style={styles.storyIndicator} />
            )}
          </View>
          
          <View style={styles.snapInfo}>
            <Text style={styles.snapUsername}>
              {isDiscover ? snap.username || snap.creator : snap.username}
            </Text>
            <Text style={styles.snapMeta}>
              {isDiscover ? 
                (snap.subscribers ? `${snap.subscribers} subscribers` : `${snap.views} views`) :
                (snap.hasStory ? snap.time : "No story")
              }
            </Text>
          </View>
          
          <View style={styles.snapActions}>
            {isDiscover && (
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followText}>Follow</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Snaps</Text>
        <TouchableOpacity onPress={onCamera} style={styles.cameraButton}>
          <Text style={styles.cameraIcon}>📸</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'friends' && styles.activeTab]}
          onPress={() => setActiveTab('friends')}
        >
          <Text style={[styles.tabText, activeTab === 'friends' && styles.activeTabText]}>
            Friends
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'discover' && styles.activeTab]}
          onPress={() => setActiveTab('discover')}
        >
          <Text style={[styles.tabText, activeTab === 'discover' && styles.activeTabText]}>
            Discover
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'spotlight' && styles.activeTab]}
          onPress={() => setActiveTab('spotlight')}
        >
          <Text style={[styles.tabText, activeTab === 'spotlight' && styles.activeTabText]}>
            Spotlight
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'friends' && renderSnapsList(friendSnaps)}
        {activeTab === 'discover' && renderSnapsList(discoverSnaps, true)}
        {activeTab === 'spotlight' && (
          <ScrollView style={styles.spotlightList} showsVerticalScrollIndicator={false}>
            {spotlightSnaps.map(snap => (
              <TouchableOpacity
                key={snap.id}
                style={styles.spotlightItem}
                onPress={() => onSnapSelect(snap.id)}
              >
                <Image 
                  source={{ uri: `https://picsum.photos/400/300?random=spotlight${snap.id}` }}
                  style={styles.spotlightImage}
                  resizeMode="cover"
                />
                <View style={styles.spotlightOverlay}>
                  <Text style={styles.spotlightTitle}>{snap.title}</Text>
                  <View style={styles.spotlightMeta}>
                    <Text style={styles.spotlightCreator}>@{snap.creator}</Text>
                    <View style={styles.spotlightStats}>
                      <Text style={styles.spotlightViews}>👁️ {snap.views}</Text>
                      <Text style={styles.spotlightLikes}>❤️ {snap.likes}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DAFFFB',
  },
  cameraButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#176B87',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    fontSize: 20,
    color: '#DAFFFB',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#176B8733',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#64CCC5',
  },
  tabText: {
    fontSize: 14,
    color: '#64CCC5',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#DAFFFB',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  snapsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  snapItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#176B8720',
  },
  snapAvatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  snapAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#176B87',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#176B87',
  },
  unviewedStory: {
    borderColor: '#64CCC5',
    borderWidth: 3,
  },
  viewedStory: {
    borderColor: '#64CCC580',
    borderWidth: 2,
  },
  snapAvatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DAFFFB',
  },
  storyIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#64CCC5',
    borderWidth: 2,
    borderColor: '#001C30',
  },
  snapInfo: {
    flex: 1,
  },
  snapUsername: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DAFFFB',
    marginBottom: 2,
  },
  snapMeta: {
    fontSize: 12,
    color: '#64CCC5',
  },
  snapActions: {
    alignItems: 'flex-end',
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#64CCC5',
  },
  followText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#001C30',
  },
  spotlightList: {
    flex: 1,
    padding: 16,
  },
  spotlightItem: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  spotlightImage: {
    width: '100%',
    height: '100%',
  },
  spotlightOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0, 28, 48, 0.8)',
  },
  spotlightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DAFFFB',
    marginBottom: 8,
  },
  spotlightMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spotlightCreator: {
    fontSize: 12,
    color: '#64CCC5',
  },
  spotlightStats: {
    flexDirection: 'row',
    gap: 12,
  },
  spotlightViews: {
    fontSize: 11,
    color: '#64CCC5',
  },
  spotlightLikes: {
    fontSize: 11,
    color: '#64CCC5',
  },
});
