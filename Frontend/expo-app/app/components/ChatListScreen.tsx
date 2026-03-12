import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { chatsAPI } from '../utils/api';
import { API_BASE_URL } from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Chat {
  _id: string;
  members: string[];
  name?: string;
  lastMessage?: {
    _id: string;
    content: string;
    mediaType: string;
    createdAt: string;
    sender: string;
  };
  updatedAt: string;
}

interface ChatListScreenProps {
  onChatSelect: (chat: any) => void;
  onNewChat: () => void;
  currentUserId?: string | null;
}

export function ChatListScreen({ onChatSelect, onNewChat, currentUserId }: ChatListScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [userNames, setUserNames] = useState<Record<string, string>>({});

  // Load chats from backend
  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      setLoading(true);
      console.log('Fetching chats from backend...');
      const response = await chatsAPI.getChats();
      console.log('Chats response:', response);
      
      if (Array.isArray(response)) {
        setChats(response);
        
        // Extract all member IDs and fetch usernames
        const allMemberIds = response.flatMap((chat: Chat) => 
          chat.members.filter((id: string) => id !== currentUserId)
        );
        
        // Fetch user details for display
        const uniqueMemberIds = Array.from(new Set(allMemberIds));
        const namesMap: Record<string, string> = {};
        
        // Fetch all users at once
        try {
          console.log('Trying /api/users/all...');
          const usersResponse = await fetch(`${API_BASE_URL}/api/users/all`, {
            headers: {
              'Authorization': `Bearer ${await AsyncStorage.getItem('authToken')}`
            }
          });
          
          if (usersResponse.ok) {
            const usersData = await usersResponse.json();
            console.log(`Fetched ${usersData.length} users from /api/users/all`);
            
            // Build names map with proper fallbacks
            const namesMap: Record<string, string> = {};
            usersData.forEach((user: any) => {
              // Use username first, then name, then email prefix, then fallback to ID
              const displayName = user.username || 
                                 user.name || 
                                 (user.email ? user.email.split('@')[0] : '') ||
                                 `User_${user._id.substring(0, 6)}`;
              namesMap[user._id] = displayName;
              console.log(`Mapped user ${user._id} -> ${displayName}`);
            });
            setUserNames(namesMap);
          } else {
            console.warn(`/api/users/all failed with status ${usersResponse.status}, trying search fallback`);
            
            // Fallback to search endpoint
            const searchResponse = await fetch(`${API_BASE_URL}/api/users/search?q=`, {
              headers: {
                'Authorization': `Bearer ${await AsyncStorage.getItem('authToken')}`
              }
            });
            
            if (searchResponse.ok) {
              const searchData = await searchResponse.json();
              console.log(`Fetched ${searchData.length} users from search fallback`);
              
              const namesMap: Record<string, string> = {};
              searchData.forEach((user: any) => {
                const displayName = user.username || 
                                   user.name || 
                                   (user.email ? user.email.split('@')[0] : '') ||
                                   `User_${user._id.substring(0, 6)}`;
                namesMap[user._id] = displayName;
                console.log(`Mapped user ${user._id} -> ${displayName}`);
              });
              setUserNames(namesMap);
            }
          }
        } catch (error) {
          console.error('Error fetching users:', error);
          // Continue without preloading names - will fetch individually if needed
        }
      }
    } catch (error: any) {
      console.error('Error loading chats:', error);
      Alert.alert('Error', 'Failed to load chats from server');
      
      // Fallback to mock data
      const mockChats: Chat[] = [
        {
          _id: "1",
          members: ["current-user", "alex_m"],
          name: "",
          lastMessage: {
            _id: "msg1",
            content: "Hey! How are you?",
            mediaType: "text",
            createdAt: new Date().toISOString(),
            sender: "other"
          },
          updatedAt: new Date().toISOString()
        }
      ];
      setChats(mockChats);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch individual user details on demand
  const fetchUserName = async (userId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${await AsyncStorage.getItem('authToken')}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        const displayName = userData.username || 
                           userData.name || 
                           (userData.email ? userData.email.split('@')[0] : 'Unknown');
        
        setUserNames(prev => ({
          ...prev,
          [userId]: displayName
        }));
        return displayName;
      }
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error);
    }
    return null;
  };

  const getChatDisplayName = (chat: Chat) => {
    if (chat.name && chat.name.trim()) {
      return chat.name;
    }
    
    // For individual chats, show the other member's username
    const otherMemberId = chat.members.find((id: string) => id !== currentUserId);
    
    // Return cached name if available
    if (otherMemberId && userNames[otherMemberId]) {
      return userNames[otherMemberId];
    }
    
    // Fetch user details on demand if not in cache
    if (otherMemberId && !userNames[otherMemberId]) {
      // Trigger async fetch and return temporary placeholder
      fetchUserName(otherMemberId);
      return 'Loading...';
    }
    
    return 'Unknown Chat';
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) {
      return 'Just now';
    } else if (diffHours < 1) {
      return `${diffMins}m ago`;
    } else if (diffDays < 1) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getLastMessagePreview = (chat: Chat) => {
    if (!chat.lastMessage) {
      return 'No messages yet';
    }
    
    const message = chat.lastMessage;
    if (message.mediaType === 'image') {
      return '📷 Photo';
    } else if (message.mediaType === 'video') {
      return '🎥 Video';
    } else {
      return message.content.length > 50 
        ? message.content.substring(0, 50) + '...' 
        : message.content;
    }
  };

  const filteredChats = chats.filter(chat => {
    const displayName = getChatDisplayName(chat).toLowerCase();
    return displayName.includes(searchQuery.toLowerCase());
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.newChatButton}
            onPress={onNewChat}
          >
            <Text style={styles.newChatIcon}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search chats..."
          placeholderTextColor="#64CCC580"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Chat List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#64CCC5" />
        </View>
      ) : (
        <ScrollView style={styles.chatList} showsVerticalScrollIndicator={false}>
          {filteredChats.map(chat => (
            <TouchableOpacity
              key={chat._id}
              style={styles.chatItem}
              onPress={() => onChatSelect(chat)}
            >
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {getChatDisplayName(chat).charAt(0).toUpperCase()}
                  </Text>
                </View>
              </View>
              
              <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                  <Text style={styles.username}>{getChatDisplayName(chat)}</Text>
                  <Text style={styles.time}>{formatTime(chat.updatedAt)}</Text>
                </View>
                <View style={styles.messageRow}>
                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {getLastMessagePreview(chat)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001C30',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#176B8733',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  newChatButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#64CCC5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newChatIcon: {
    fontSize: 18,
    color: '#001C30',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DAFFFB',
  },
  editButton: {
    padding: 8,
  },
  editIcon: {
    fontSize: 20,
    color: '#64CCC5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    marginBottom: 8,
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
  chatList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#176B8720',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#176B87',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DAFFFB',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#001C30',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DAFFFB',
  },
  time: {
    fontSize: 12,
    color: '#64CCC5',
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: '#64CCC5',
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: '#64CCC5',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#001C30',
  },
});
