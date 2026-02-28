import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { apiRequest } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  isOnline?: boolean;
}

interface UserSearchScreenProps {
  onUserSelect: (user: User) => void;
  onBack: () => void;
}

export function UserSearchScreen({ onUserSelect, onBack }: UserSearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Load current user ID
  useEffect(() => {
    loadCurrentUserId();
  }, []);

  const loadCurrentUserId = async () => {
    try {
      const loginResponse = await AsyncStorage.getItem('lastLoginResponse');
      if (loginResponse) {
        const userData = JSON.parse(loginResponse);
        setCurrentUserId(userData._id);
      }
    } catch (error) {
      console.error('Error loading current user:', error);
    }
  };

  // Load users from backend
  const loadUsers = async () => {
    try {
      setLoading(true);
      console.log('Fetching users from backend...');
      const response = await apiRequest('/api/users/all');
      console.log('Users response:', response);
      
      // Transform backend response to match component interface
      const transformedUsers = response.map((user: any) => ({
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        isOnline: false // Backend doesn't provide online status yet
      }));
      
      setUsers(transformedUsers);
    } catch (error: any) {
      console.error('Error loading users:', error);
      
      // Handle authentication errors
      if (error.message && error.message.includes('Not authorized')) {
        Alert.alert(
          'Session Expired', 
          'Your session has expired. Please log in again.',
          [
            {
              text: 'OK',
              onPress: async () => {
                // Clear the invalid token
                await AsyncStorage.removeItem('authToken');
                await AsyncStorage.removeItem('lastLoginResponse');
                // You might want to navigate to login screen here
                Alert.alert('Please log in again to continue');
              }
            }
          ]
        );
      } else {
        Alert.alert('Error', 'Failed to load users from server');
      }
      
      // Fallback to mock data
      const mockUsers: User[] = [
        { _id: "1", username: "alex_m", email: "alex@example.com", isOnline: true },
        { _id: "2", username: "sarahj", email: "sarah@example.com", isOnline: true },
        { _id: "3", username: "mikec", email: "mike@example.com", isOnline: false },
        { _id: "4", username: "emmaw", email: "emma@example.com", isOnline: true },
        { _id: "5", username: "davidb", email: "david@example.com", isOnline: false },
      ];
      setUsers(mockUsers);
    } finally {
      setLoading(false);
    }
  };

  // Load users when component mounts
  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserSelect = (user: User) => {
    onUserSelect(user);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#64CCC5" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Chat</Text>
        <TouchableOpacity 
          onPress={loadUsers}
          style={styles.refreshButton}
        >
          <Ionicons name="refresh" size={24} color="#64CCC5" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Ionicons name="search" size={20} color="#64CCC5" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users..."
            placeholderTextColor="#64CCC580"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              onPress={() => setSearchQuery("")}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color="#64CCC580" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Loading State */}
      {loading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading users...</Text>
        </View>
      )}

      {/* Users List */}
      <ScrollView style={styles.usersContainer} contentContainerStyle={styles.usersContent}>
        {!loading && filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <TouchableOpacity
              key={user._id}
              style={styles.userItem}
              onPress={() => handleUserSelect(user)}
            >
              <View style={styles.userAvatarContainer}>
                <View style={styles.userAvatar}>
                  <Text style={styles.avatarText}>
                    {user.username.charAt(0).toUpperCase()}
                  </Text>
                </View>
                {user.isOnline && <View style={styles.onlineIndicator} />}
              </View>
              
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.username}</Text>
                <Text style={styles.userUsername}>{user.email}</Text>
              </View>
              
              <Ionicons name="chevron-forward" size={20} color="#64CCC580" />
            </TouchableOpacity>
          ))
        ) : !loading && (
          <View style={styles.emptyState}>
            <Ionicons name="people" size={48} color="#64CCC540" />
            <Text style={styles.emptyText}>
              {searchQuery ? "No users found" : "Search for users to start chatting"}
            </Text>
          </View>
        )}
      </ScrollView>
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
    paddingVertical: 16,
    backgroundColor: "#002843",
    borderBottomWidth: 1,
    borderBottomColor: "#176B8740",
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#DAFFFB",
    fontSize: 18,
    fontWeight: "600",
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#002843",
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#176B8740",
    borderWidth: 1,
    borderColor: "#176B8780",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "#DAFFFB",
    fontSize: 16,
  },
  clearButton: {
    marginLeft: 8,
  },
  usersContainer: {
    flex: 1,
  },
  usersContent: {
    paddingVertical: 8,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userAvatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#176B87",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#DAFFFB",
    fontSize: 20,
    fontWeight: "600",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#64CCC5",
    borderWidth: 2,
    borderColor: "#001C30",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: "#DAFFFB",
    fontSize: 16,
    fontWeight: "500",
  },
  userUsername: {
    color: "#64CCC5",
    fontSize: 14,
    marginTop: 2,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    color: "#64CCC580",
    fontSize: 16,
    marginTop: 16,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  loadingText: {
    color: "#64CCC5",
    fontSize: 16,
  },
  refreshButton: {
    padding: 8,
  },
});