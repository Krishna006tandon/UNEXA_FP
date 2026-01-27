import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

interface ChatWindowProps {
  onBack: () => void;
}

export function ChatWindow({ onBack }: ChatWindowProps) {
  const [message, setMessage] = useState("");

  const messages = [
    { id: 1, text: "Hey! How are you?", sent: false, time: "10:30 AM" },
    { id: 2, text: "I'm good! Just working on some projects", sent: true, time: "10:32 AM" },
    { id: 3, text: "That's awesome! What are you building?", sent: false, time: "10:33 AM" },
    {
      id: 4,
      text: "A new social media app with some cool features",
      sent: true,
      time: "10:35 AM",
    },
    { id: 5, text: "Can't wait to see it! 🚀", sent: false, time: "10:36 AM" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>A</Text>
            </View>
            <View>
              <Text style={styles.username}>Alex</Text>
              <Text style={styles.status}>Online</Text>
            </View>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerIcon}>📞</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerIcon}>📹</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerIcon}>⋯</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {messages.map(msg => (
          <View key={msg.id} style={[styles.messageWrapper, msg.sent && styles.sentMessage]}>
            <View style={[styles.messageBubble, msg.sent && styles.sentBubble]}>
              <Text style={[styles.messageText, msg.sent && styles.sentText]}>
                {msg.text}
              </Text>
              <Text style={[styles.messageTime, msg.sent && styles.sentTime]}>
                {msg.time}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.inputButton}>
            <Text style={styles.inputIcon}>😊</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputButton}>
            <Text style={styles.inputIcon}>📷</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputButton}>
            <Text style={styles.inputIcon}>📎</Text>
          </TouchableOpacity>
          
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor="#64CCC580"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          
          <TouchableOpacity style={styles.inputButton}>
            <Text style={styles.inputIcon}>🎤</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
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
    paddingVertical: 12,
    backgroundColor: '#002843',
    borderBottomWidth: 1,
    borderBottomColor: '#176B8733',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  backIcon: {
    fontSize: 20,
    color: '#DAFFFB',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#176B87',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#DAFFFB',
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DAFFFB',
  },
  status: {
    fontSize: 12,
    color: '#4CAF50',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    fontSize: 16,
    color: '#64CCC5',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageWrapper: {
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  sentMessage: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    backgroundColor: '#176B8733',
    maxWidth: '80%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
  },
  sentBubble: {
    backgroundColor: '#64CCC5',
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 18,
  },
  messageText: {
    fontSize: 14,
    color: '#DAFFFB',
    marginBottom: 4,
  },
  sentText: {
    color: '#001C30',
  },
  messageTime: {
    fontSize: 11,
    color: '#64CCC5',
  },
  sentTime: {
    color: '#001C3080',
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#002843',
    borderTopWidth: 1,
    borderTopColor: '#176B8733',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputIcon: {
    fontSize: 16,
    color: '#64CCC5',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#176B8733',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#DAFFFB',
    maxHeight: 80,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#64CCC5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    fontSize: 16,
    color: '#001C30',
    fontWeight: 'bold',
  },
});
