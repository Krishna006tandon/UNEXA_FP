import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';

interface StreamFeedScreenProps {
  onVideoSelect: (videoId: number) => void;
}

export function StreamFeedScreen({ onVideoSelect }: StreamFeedScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const trendingVideos = [];

  const shortVideos = [];

  const longVideos = [];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.headerTitle}>Stream</Text>
        <TouchableOpacity style={styles.trendingButton}>
          <Text style={styles.trendingIcon}>📈</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search videos..."
          placeholderTextColor="#64CCC580"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Trending Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔥 Trending Now</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {trendingVideos.map(video => (
            <TouchableOpacity
              key={video.id}
              style={styles.trendingCard}
              onPress={() => onVideoSelect(video.id)}
            >
              <Image 
                source={{ uri: `https://picsum.photos/300/200?random=${video.id}` }}
                style={styles.trendingImage}
                resizeMode="cover"
              />
              <View style={styles.trendingOverlay}>
                <Text style={styles.trendingTitle}>{video.title}</Text>
                <Text style={styles.trendingChannel}>{video.channel}</Text>
                <Text style={styles.trendingViews}>{video.views} views</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Short Videos Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚡ Short Videos</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {shortVideos.map(video => (
            <TouchableOpacity
              key={video.id}
              style={styles.shortCard}
              onPress={() => onVideoSelect(video.id)}
            >
              <Image 
                source={{ uri: `https://picsum.photos/200/350?random=${video.id + 10}` }}
                style={styles.shortImage}
                resizeMode="cover"
              />
              <View style={styles.playOverlay}>
                <Text style={styles.playIcon}>▶️</Text>
              </View>
              <Text style={styles.shortTitle}>{video.title}</Text>
              <Text style={styles.shortChannel}>{video.channel}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Long Videos Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📺 Full Videos</Text>
        <View style={styles.videoGrid}>
          {longVideos.map(video => (
            <TouchableOpacity
              key={video.id}
              style={styles.videoCard}
              onPress={() => onVideoSelect(video.id)}
            >
              <View style={styles.videoThumbnail}>
                <Image 
                  source={{ uri: `https://picsum.photos/400/225?random=${video.id + 20}` }}
                  style={styles.videoImage}
                  resizeMode="cover"
                />
                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>{video.duration}</Text>
                </View>
              </View>
              <View style={styles.videoInfo}>
                <Text style={styles.videoTitle}>{video.title}</Text>
                <Text style={styles.videoChannel}>{video.channel}</Text>
                <Text style={styles.videoViews}>{video.views} views</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001C30',
  },
  topBar: {
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
  trendingButton: {
    padding: 8,
  },
  trendingIcon: {
    fontSize: 20,
    color: '#64CCC5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    backgroundColor: '#176B8733',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 16,
    color: '#64CCC5',
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#DAFFFB',
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#DAFFFB',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  horizontalScroll: {
    paddingLeft: 16,
  },
  trendingCard: {
    width: 280,
    height: 160,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  trendingImage: {
    width: '100%',
    height: '100%',
  },
  trendingOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0, 28, 48, 0.8)',
  },
  trendingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DAFFFB',
    marginBottom: 4,
  },
  trendingChannel: {
    fontSize: 12,
    color: '#64CCC5',
    marginBottom: 2,
  },
  trendingViews: {
    fontSize: 11,
    color: '#64CCC5',
  },
  shortCard: {
    width: 140,
    marginRight: 12,
    alignItems: 'center',
  },
  shortImage: {
    width: 140,
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  playOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -16,
    marginLeft: -16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  shortTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DAFFFB',
    textAlign: 'center',
    marginBottom: 4,
  },
  shortChannel: {
    fontSize: 11,
    color: '#64CCC5',
    textAlign: 'center',
  },
  videoGrid: {
    paddingHorizontal: 16,
  },
  videoCard: {
    marginBottom: 16,
  },
  videoThumbnail: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  videoImage: {
    width: '100%',
    height: 180,
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  videoInfo: {
    paddingHorizontal: 4,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DAFFFB',
    marginBottom: 4,
  },
  videoChannel: {
    fontSize: 12,
    color: '#64CCC5',
    marginBottom: 2,
  },
  videoViews: {
    fontSize: 11,
    color: '#64CCC5',
  },
});
