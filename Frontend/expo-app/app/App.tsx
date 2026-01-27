import { useState } from "react";
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
import { BottomNav } from "./components/BottomNav";
import { SnapCameraScreen } from "./components/SnapCameraScreen";
import { StreamFeedScreen } from "./components/StreamFeedScreen";
import { ChatWindow } from "./components/ChatWindow";
import { VideoPlayerScreen } from "./components/VideoPlayerScreen";
import { SnapsScreen } from "./components/SnapsScreen";
import { SnapEditScreen } from "./components/SnapEditScreen";
import { SnapViewerScreen } from "./components/SnapViewerScreen";

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
        return <OnboardingScreen2 onNext={() => setCurrentScreen("onboarding3")} />;
      case "onboarding3":
        return <OnboardingScreen3 onGetStarted={() => setCurrentScreen("login")} />;
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
        return <PlaceholderScreen title="Settings Screen" />;
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