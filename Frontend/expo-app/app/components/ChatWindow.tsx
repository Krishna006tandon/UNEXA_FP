import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
            <Ionicons name="arrow-back" size={24} color="#64CCC5" />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>A</Text>
              </View>
              <View style={styles.onlineIndicator} />
            </View>
            <View>
              <Text style={styles.username}>alex_m</Text>
              <Text style={styles.status}>Online</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="call" size={20} color="#64CCC5" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="videocam" size={20} color="#64CCC5" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="ellipsis-vertical" size={20} color="#64CCC5" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <ScrollView style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
        {messages.map((msg, index) => (
          <View 
            key={msg.id} 
            style={[
              styles.messageContainer, 
              msg.sent ? styles.sentMessageContainer : styles.receivedMessageContainer
            ]}
          >
            <View 
              style={[
                styles.messageBubble, 
                msg.sent ? styles.sentBubble : styles.receivedBubble
              ]}
            >
              <Text style={[
                styles.messageText, 
                msg.sent ? styles.sentText : styles.receivedText
              ]}>
                {msg.text}
              </Text>
              <Text style={[
                styles.messageTime, 
                msg.sent ? styles.sentTime : styles.receivedTime
              ]}>
                {msg.time}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input Bar */}
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.inputButton}>
            <Ionicons name="happy" size={20} color="#64CCC5" />
          </TouchableOpacity>
          
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              placeholderTextColor="#64CCC580"
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <View style={styles.inputActions}>
              <TouchableOpacity style={styles.inputActionButton}>
                <Ionicons name="camera" size={16} color="#64CCC5" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputActionButton}>
                <Ionicons name="attach" size={16} color="#64CCC5" />
              </TouchableOpacity>
            </View>
          </View>
          
          {message ? (
            <TouchableOpacity style={styles.sendButton}>
              <Ionicons name="send" size={20} color="#001C30" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.micButton}>
              <Ionicons name="mic" size={20} color="#64CCC5" />
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
    backgroundColor: "#001C30",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#002843",
    borderBottomWidth: 1,
    borderBottomColor: "#176B8740",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#176B87",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#DAFFFB",
    fontWeight: "600",
    fontSize: 16,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#64CCC5",
    borderWidth: 2,
    borderColor: "#002843",
  },
  username: {
    color: "#DAFFFB",
    fontWeight: "600",
    fontSize: 16,
  },
  status: {
    color: "#64CCC5",
    fontSize: 12,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    gap: 16,
  },
  messageContainer: {
    maxWidth: "75%",
  },
  sentMessageContainer: {
    alignSelf: "flex-end",
  },
  receivedMessageContainer: {
    alignSelf: "flex-start",
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  sentBubble: {
    backgroundColor: "#176B87",
    borderBottomRightRadius: 4,
  },
  receivedBubble: {
    backgroundColor: "#64CCC5",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
  },
  sentText: {
    color: "#DAFFFB",
  },
  receivedText: {
    color: "#001C30",
  },
  messageTime: {
    fontSize: 12,
    marginTop: 4,
  },
  sentTime: {
    color: "#64CCC5",
  },
  receivedTime: {
    color: "#176B87",
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#002843",
    borderTopWidth: 1,
    borderTopColor: "#176B8740",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  inputButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  inputWrapper: {
    flex: 1,
    position: "relative",
  },
  textInput: {
    backgroundColor: "#176B8740",
    borderWidth: 1,
    borderColor: "#176B8780",
    color: "#DAFFFB",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    fontSize: 16,
    maxHeight: 100,
  },
  inputActions: {
    position: "absolute",
    right: 8,
    bottom: 8,
    flexDirection: "row",
    gap: 4,
  },
  inputActionButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#64CCC5",
    alignItems: "center",
    justifyContent: "center",
  },
  micButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});