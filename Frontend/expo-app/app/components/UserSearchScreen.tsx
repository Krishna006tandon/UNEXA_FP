import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { apiRequest } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  _id: string;
  username: string;
  name?: string;
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
      
      // Try multiple approaches to get users
      let response = [];
      
      // Method 1: Try /api/users/all
      try {
        console.log('Trying /api/users/all...');
        response = await apiRequest('/api/users/all');
        console.log(`Users response: ${response.length} users`);
      } catch (primaryError) {
        console.warn('/api/users/all failed:', primaryError.message);
        
        // Method 2: Try search with empty query (returns all users)
        try {
          console.log('Trying /api/users/search?q= (empty query)...');
          response = await apiRequest('/api/users/search?q=');
          console.log(`Search fallback response: ${response.length} users`);
        } catch (searchError) {
          console.warn('Search endpoint also failed:', searchError.message);
          
          // Method 3: Try search with common letter
          try {
            console.log('Trying /api/users/search?q=a...');
            response = await apiRequest('/api/users/search?q=a');
            console.log(`Search with 'a' response: ${response.length} users`);
          } catch (letterSearchError) {
            console.warn('All methods failed:', letterSearchError.message);
            response = [];
          }
        }
      }
      
      // Transform backend response to match component interface
      const transformedUsers = Array.isArray(response) ? response.map((user: any) => ({
        _id: user._id,
        username: user.username || '',
        email: user.email || '',
        avatar: user.avatar,
        isOnline: false
      })) : [];
      
      setUsers(transformedUsers);
      
      if (transformedUsers.length === 0) {
        console.warn('No users found in database');
      }
    } catch (error: any) {
      console.error('Error loading users:', error);
      
      if (error.message && error.message.includes('Not authorized')) {
        Alert.alert(
          'Session Expired', 
          'Your session has expired. Please log in again.',
          [
            {
              text: 'OK',
              onPress: async () => {
                await AsyncStorage.removeItem('authToken');
                await AsyncStorage.removeItem('lastLoginResponse');
                Alert.alert('Please log in again to continue');
              }
            }
          ]
        );
      }
      
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Load users when component mounts
  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) => {
      const username = (user.username || '').toLowerCase().trim();
      const email = (user.email || '').toLowerCase().trim();
      const query = searchQuery.toLowerCase().trim();
      
      return username.includes(query) || email.includes(query);
    }
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
                    {(user.username || user.name || 'U').charAt(0).toUpperCase()}
                  </Text>
                </View>
                {user.isOnline && <View style={styles.onlineIndicator} />}
              </View>
              
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.username || user.name || 'Unknown User'}</Text>
                <Text style={styles.userUsername}>{user.name ? `@${user.username}` : user.email}</Text>
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