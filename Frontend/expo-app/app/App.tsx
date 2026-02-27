import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { PlaceholderScreen } from "./components/PlaceholderScreen";
import { OnboardingScreen1 } from "./components/OnboardingScreen1";
import { OnboardingScreen2 } from "./components/OnboardingScreen2";
import { OnboardingScreen3 } from "./components/OnboardingScreen3";
import { LoginScreen } from "./components/LoginScreen";
import { SignupScreen } from "./components/SignupScreen";
import { FeedScreen } from "./components/FeedScreen";
import { ChatListScreen } from "./components/ChatListScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { SettingsScreen } from "./components/SettingsScreen";
import { BottomNav } from "./components/BottomNav";
import { SnapCameraScreen } from "./components/SnapCameraScreen";
import { SnapsScreen } from "./components/SnapsScreen";
import { SnapEditScreen } from "./components/SnapEditScreen";
import { SnapViewerScreen } from "./components/SnapViewerScreen";
import { StreamFeedScreen } from "./components/StreamFeedScreen";
import { VideoPlayerScreen } from "./components/VideoPlayerScreen";
import { ChatWindow } from "./components/ChatWindow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveAuthToken } from "./utils/api";

type Screen =
  | "onboarding1"
  | "onboarding2"
  | "onboarding3"
  | "login"
  | "signup"
  | "feed"
  | "chats"
  | "chat-window"
  | "snaps"
  | "snap-camera"
  | "snap-edit"
  | "snap-viewer"
  | "stream"
  | "video-player"
  | "profile"
  | "notifications"
  | "settings";

export default function App() {
  // State Management
  const [currentScreen, setCurrentScreen] = useState<Screen>("onboarding1");
  const [activeTab, setActiveTab] = useState("feed");
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isVideoUploadOpen, setIsVideoUploadOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on app startup
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
        
        if (token) {
          // User is logged in, go to feed
          setCurrentScreen("feed");
          setActiveTab("feed");
        } else if (hasSeenOnboarding === 'true') {
          // User has seen onboarding but not logged in
          setCurrentScreen("login");
        } else {
          // First time user, show onboarding
          setCurrentScreen("onboarding1");
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setCurrentScreen("onboarding1");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Check if we should show bottom nav
  const showBottomNav = ["feed", "chats", "snaps", "stream", "profile"].includes(
    currentScreen
  );

  // Handle tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentScreen(tab as Screen);
  };

  // Handle FAB actions
  const handleCreatePost = () => {
    setIsCreatePostOpen(true);
  };

  const handleCreateSnap = () => {
    setCurrentScreen("snap-camera");
  };

  const handleUploadVideo = () => {
    setIsVideoUploadOpen(true);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "onboarding1":
        return <OnboardingScreen1 onNext={() => setCurrentScreen("onboarding2")} />;
      case "onboarding2":
        return (
          <OnboardingScreen2 
            onNext={async () => {
              await AsyncStorage.setItem('hasSeenOnboarding', 'true');
              setCurrentScreen("onboarding3");
            }} 
          />
        );
      case "onboarding3":
        return (
          <OnboardingScreen3 
            onGetStarted={async () => {
              await AsyncStorage.setItem('hasSeenOnboarding', 'true');
              setCurrentScreen("login");
            }} 
          />
        );
      case "login":
        return (
          <LoginScreen
            onLogin={() => {
              setCurrentScreen("feed");
              setActiveTab("feed");
            }}
            onSignup={() => setCurrentScreen("signup")}
          />
        );
      case "signup":
        return (
          <SignupScreen
            onSignup={() => {
              setCurrentScreen("feed");
              setActiveTab("feed");
            }}
            onLogin={() => setCurrentScreen("login")}
          />
        );
      case "feed":
        return <FeedScreen />;
      case "chats":
        return (
          <ChatListScreen
            onChatSelect={() => setCurrentScreen("chat-window")}
          />
        );
      case "chat-window":
        return <ChatWindow onBack={() => setCurrentScreen("chats")} />;
      case "snaps":
        return (
          <SnapsScreen
            onSnapSelect={() => setCurrentScreen("snap-viewer")}
            onCamera={() => setCurrentScreen("snap-camera")}
          />
        );
      case "snap-camera":
        return (
          <SnapCameraScreen
            onCapture={() => setCurrentScreen("snap-edit")}
            onClose={() => setCurrentScreen("snaps")}
          />
        );
      case "snap-edit":
        return (
          <SnapEditScreen
            onSend={() => setCurrentScreen("snaps")}
            onCancel={() => setCurrentScreen("snap-camera")}
          />
        );
      case "snap-viewer":
        return (
          <SnapViewerScreen
            onClose={() => setCurrentScreen("snaps")}
            onNext={() => {}}
            onPrevious={() => {}}
            username="alex_m"
          />
        );
      case "stream":
        return <StreamFeedScreen onVideoSelect={() => setCurrentScreen("video-player")} />;
      case "video-player":
        return <VideoPlayerScreen onBack={() => setCurrentScreen("stream")} />;
      case "profile":
        return (
          <ProfileScreen onOpenSettings={() => setCurrentScreen("settings")} />
        );
      case "notifications":
        return <PlaceholderScreen title="Notifications Screen" />;
      case "settings":
        return (
          <SettingsScreen 
            onBack={() => setCurrentScreen("profile")}
            onLogout={() => {
              setCurrentScreen("login");
              setActiveTab("login");
            }}
          />
        );
      default:
        return <PlaceholderScreen title="Feed Screen" />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mobileContainer}>
        <View style={styles.screenContainer}>
          {renderScreen()}
        </View>
        {/* Bottom Navigation */}
        {showBottomNav && (
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
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
  mobileContainer: {
    flex: 1,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
    position: 'relative',
  },
  screenContainer: {
    flex: 1,
  },
});