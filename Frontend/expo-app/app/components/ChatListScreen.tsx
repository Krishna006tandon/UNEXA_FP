import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

interface ChatListScreenProps {
  onChatSelect: (chat: any) => void;
  onNewChat: () => void;
}

export function ChatListScreen({ onChatSelect, onNewChat }: ChatListScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const chats = [
    {
      id: "1",
      username: "alex_m",
      time: "10:30 AM",
      lastMessage: "Hey! How are you?",
      online: true,
      unread: 0
    },
    {
      id: "2",
      username: "sarahj",
      time: "9:45 AM",
      lastMessage: "Can't wait to see it! 🚀",
      online: true,
      unread: 2
    },
    {
      id: "3",
      username: "mikec",
      time: "Yesterday",
      lastMessage: "Thanks for the update!",
      online: false,
      unread: 0
    },
    {
      id: "4",
      username: "emmaw",
      time: "Wed",
      lastMessage: "Check out my new post!",
      online: true,
      unread: 1
    },
    {
      id: "5",
      username: "davidb",
      time: "Mon",
      lastMessage: "Meeting tomorrow at 10am",
      online: false,
      unread: 0
    }
  ];

  const filteredChats = chats.filter(chat =>
    chat.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <ScrollView style={styles.chatList} showsVerticalScrollIndicator={false}>
        {filteredChats.map(chat => (
          <TouchableOpacity
            key={chat.id}
            style={styles.chatItem}
            onPress={() => onChatSelect(chat)}
          >
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {chat.username.charAt(0).toUpperCase()}
                </Text>
              </View>
              {chat.online && <View style={styles.onlineIndicator} />}
            </View>
            
            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <Text style={styles.username}>{chat.username}</Text>
                <Text style={styles.time}>{chat.time}</Text>
              </View>
              <View style={styles.messageRow}>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {chat.lastMessage}
                </Text>
                {chat.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadCount}>{chat.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
