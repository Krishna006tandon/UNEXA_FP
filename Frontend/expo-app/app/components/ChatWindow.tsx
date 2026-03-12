import { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import io from "socket.io-client";
import { API_BASE_URL } from "../config/api";
import { chatsAPI } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Message {
  _id: string;
  chat: string;
  sender: {
    _id: string;
    username: string;
    avatar?: string;
  };
  content: string;
  mediaUrl?: string;
  mediaType: "text" | "image" | "video" | "file";
  createdAt: string;
  readBy?: string[];
}

interface ChatWindowProps {
  onBack: () => void;
  selectedChat?: any;
  selectedUser?: any;
  currentUserId?: string | null;
}

export function ChatWindow({ onBack, selectedChat, selectedUser, currentUserId }: ChatWindowProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [otherUserId, setOtherUserId] = useState<string | null>(null);
  const [otherUsername, setOtherUsername] = useState<string>("");
  const [isOnline, setIsOnline] = useState(false);
  const [typing, setTyping] = useState(false);
  const socketRef = useRef<any | null>(null);
  const messagesEndRef = useRef<ScrollView>(null);

  // Initialize chat and socket connection
  useEffect(() => {
    initializeChat();
    
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [selectedChat, selectedUser]);

  const initializeChat = async () => {
    try {
      setLoading(true);
      
      // Get current user ID
      const loginResponse = await AsyncStorage.getItem('lastLoginResponse');
      const userId = loginResponse ? JSON.parse(loginResponse)._id : currentUserId;
      
      if (selectedChat) {
        // Existing chat
        setChatId(selectedChat._id);
        const otherId = selectedChat.members.find((id: string) => id !== userId);
        setOtherUserId(otherId);
        await loadMessages(selectedChat._id);
      } else if (selectedUser) {
        // New chat with user - create or find existing chat
        setOtherUsername(selectedUser.username);
        setOtherUserId(selectedUser._id);
        const existingChat = await findOrCreateChat(selectedUser._id);
        if (existingChat) {
          setChatId(existingChat._id);
          await loadMessages(existingChat._id);
        }
      }
      
      // Setup socket connection
      setupSocketConnection(userId);
      
    } catch (error) {
      console.error('Error initializing chat:', error);
      Alert.alert('Error', 'Failed to load chat');
    } finally {
      setLoading(false);
    }
  };

  const findOrCreateChat = async (userId: string) => {
    try {
      // Validate user IDs before creating chat
      const currentLoginResponse = await AsyncStorage.getItem('lastLoginResponse');
      const myId = currentLoginResponse ? JSON.parse(currentLoginResponse)._id : currentUserId;
      
      if (!myId || !userId) {
        console.error('Invalid user IDs for chat:', { myId, userId });
        Alert.alert('Error', 'Unable to create chat - invalid user information');
        return null;
      }
      
      // Try to find existing chat
      const chats = await chatsAPI.getChats();
      const existingChat = chats.find((chat: any) => 
        chat.members.includes(userId) && chat.members.length === 2
      );
      
      if (existingChat) {
        return existingChat;
      }
      
      // Create new chat
      const newChat = await fetch(`${API_BASE_URL}/api/chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await AsyncStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          members: [myId, userId].filter(id => id && id !== null && id !== undefined),
          isGroup: false
        })
      });
      
      return await newChat.json();
    } catch (error) {
      console.error('Error finding/creating chat:', error);
      return null;
    }
  };

  const loadMessages = async (chatId: string) => {
    try {
      const response = await chatsAPI.getMessages(chatId);
      if (response && Array.isArray(response.data)) {
        setMessages(response.data);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const setupSocketConnection = (userId: string) => {
    try {
      const socket = io(API_BASE_URL, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socket.on('connect', () => {
        console.log('Socket connected');
        socket.emit('user:online', { userId });
        
        // Join the chat room if chatId exists
        if (chatId) {
          socket.emit('chat:join', { chatId });
          console.log('Joined chat room:', chatId);
        }
      });

      socket.on('chat:message', (newMessage: Message) => {
        console.log('New message received:', newMessage);
        setMessages(prev => {
          // Avoid duplicates
          if (prev.some(msg => msg._id === newMessage._id)) {
            return prev;
          }
          return [...prev, newMessage];
        });
        
        // Mark as read
        if (newMessage.sender._id !== userId) {
          socket.emit('chat:read', { chatId, userId });
        }
      });

      socket.on('chat:typing', (data: { chatId: string, userId: string }) => {
        if (data.userId !== userId) {
          setTyping(true);
          setTimeout(() => setTyping(false), 3000);
        }
      });

      socket.on('user:status', (data: { userId: string, isOnline: boolean }) => {
        if (data.userId === otherUserId) {
          setIsOnline(data.isOnline);
        }
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });

      socketRef.current = socket;
    } catch (error) {
      console.error('Error setting up socket:', error);
    }
  };

  // Join chat room when chatId changes
  useEffect(() => {
    if (chatId && socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('chat:join', { chatId });
      console.log('Joined chat room after chatId set:', chatId);
    }
  }, [chatId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim() || !chatId || sending) return;

    try {
      setSending(true);
      const currentLoginResponse = await AsyncStorage.getItem('lastLoginResponse');
      const senderId = currentLoginResponse ? JSON.parse(currentLoginResponse)._id : currentUserId;

      console.log('Sending message:', { chatId, senderId, content: message.trim() });
      console.log('Socket connected:', socketRef.current?.connected);

      // Send via socket for real-time delivery
      if (socketRef.current && socketRef.current.connected) {
        console.log('Emitting chat:message via socket');
        socketRef.current.emit('chat:message', {
          chatId,
          senderId,
          content: message.trim(),
          mediaType: 'text'
        });
      } else {
        console.log('Socket not connected, using REST API fallback');
        // Fallback to REST API
        await chatsAPI.sendMessage(chatId, {
          content: message.trim(),
          mediaType: 'text'
        });
      }

      setMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleTyping = (text: string) => {
    setMessage(text);
    
    // Emit typing indicator
    if (socketRef.current && socketRef.current.connected && chatId) {
      socketRef.current.emit('chat:typing', {
        chatId,
        userId: currentUserId
      });
    }
  };

  const pickImageFromGallery = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert(
          'Permission Required',
          'Please grant access to your photos to select images from gallery.',
          [{ text: 'OK' }]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        await uploadAndSendMedia(selectedImage.uri, 'image');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to select image from gallery');
    }
  };

  const takePhotoFromCamera = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert(
          'Permission Required',
          'Please grant camera access to take photos.',
          [{ text: 'OK' }]
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const photo = result.assets[0];
        await uploadAndSendMedia(photo.uri, 'image');
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const uploadAndSendMedia = async (uri: string, mediaType: 'image' | 'video') => {
    try {
      setSending(true);
      
      // Create form data for upload
      const formData = new FormData();
      formData.append('media', {
        uri,
        type: mediaType === 'image' ? 'image/jpeg' : 'video/mp4',
        name: `chat_media_${Date.now()}.${mediaType === 'image' ? 'jpg' : 'mp4'}`,
      } as any);

      // Upload to backend
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/api/chats/${chatId}/media`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const uploadData = await response.json();
        
        // Send message with media URL via socket
        if (socketRef.current && socketRef.current.connected) {
          socketRef.current.emit('chat:message', {
            chatId,
            senderId: currentUserId,
            content: '',
            mediaUrl: uploadData.mediaUrl,
            mediaType: uploadData.mediaType,
          });
        } else {
          // Fallback to REST API
          await chatsAPI.sendMessage(chatId, {
            content: '',
            mediaUrl: uploadData.mediaUrl,
            mediaType: uploadData.mediaType,
          });
        }
        
        Alert.alert('Success', 'Media sent successfully!');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error sending media:', error);
      Alert.alert('Error', 'Failed to send media');
    } finally {
      setSending(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const getDisplayName = () => {
    if (selectedChat) {
      return selectedChat.name || otherUsername || 'Unknown';
    }
    return selectedUser?.username || 'Unknown';
  };

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
                <Text style={styles.avatarText}>
                  {getDisplayName().charAt(0).toUpperCase()}
                </Text>
              </View>
              {isOnline && <View style={styles.onlineIndicator} />}
            </View>
            <View>
              <Text style={styles.username}>{getDisplayName()}</Text>
              <Text style={styles.status}>
                {typing ? 'Typing...' : isOnline ? 'Online' : 'Offline'}
              </Text>
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
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#64CCC5" />
        </View>
      ) : (
        <ScrollView 
          ref={messagesEndRef}
          style={styles.messagesContainer} 
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => scrollToBottom()}
        >
          {messages.map((msg) => (
            <View 
              key={msg._id} 
              style={[
                styles.messageContainer, 
                msg.sender._id === currentUserId ? styles.sentMessageContainer : styles.receivedMessageContainer
              ]}
            >
              <View 
                style={[
                  styles.messageBubble, 
                  msg.sender._id === currentUserId ? styles.sentBubble : styles.receivedBubble
                ]}
              >
                {/* Render text content */}
                {msg.content ? (
                  <Text style={[
                    styles.messageText, 
                    msg.sender._id === currentUserId ? styles.sentText : styles.receivedText
                  ]}>
                    {msg.content}
                  </Text>
                ) : null}

                {/* Render media if exists */}
                {msg.mediaUrl && (
                  <View style={styles.mediaContainer}>
                    {msg.mediaType === 'image' ? (
                      <Image 
                        source={{ uri: msg.mediaUrl }} 
                        style={styles.messageImage}
                        resizeMode="cover"
                      />
                    ) : msg.mediaType === 'video' ? (
                      <View style={styles.videoPlaceholder}>
                        <Ionicons name="videocam" size={40} color="#64CCC5" />
                        <Text style={styles.videoText}>Video Message</Text>
                      </View>
                    ) : null}
                  </View>
                )}

                {/* Timestamp */}
                <Text style={[
                  styles.messageTime, 
                  msg.sender._id === currentUserId ? styles.sentTime : styles.receivedTime
                ]}>
                  {formatTime(msg.createdAt)}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

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
              onChangeText={handleTyping}
              multiline
              onSubmitEditing={sendMessage}
              returnKeyType="send"
              blurOnSubmit={false}
            />
            <View style={styles.inputActions}>
              <TouchableOpacity 
                style={styles.inputActionButton}
                onPress={takePhotoFromCamera}
              >
                <Ionicons name="camera" size={16} color="#64CCC5" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.inputActionButton}
                onPress={pickImageFromGallery}
              >
                <Ionicons name="attach" size={16} color="#64CCC5" />
              </TouchableOpacity>
            </View>
          </View>
          
          {message ? (
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={sendMessage}
            >
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
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  mediaContainer: {
    marginTop: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  videoPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  videoText: {
    color: "#DAFFFB",
    fontSize: 14,
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