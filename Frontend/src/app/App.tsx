import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// Onboarding & Auth
import { OnboardingScreen1 } from "@/app/components/OnboardingScreen1";
import { OnboardingScreen2 } from "@/app/components/OnboardingScreen2";
import { OnboardingScreen3 } from "@/app/components/OnboardingScreen3";
import { LoginScreen } from "@/app/components/LoginScreen";
import { SignupScreen } from "@/app/components/SignupScreen";

// Main Screens
import { FeedScreen } from "@/app/components/FeedScreen";
import { ChatListScreen } from "@/app/components/ChatListScreen";
import { ChatWindow } from "@/app/components/ChatWindow";
import { SnapCameraScreen } from "@/app/components/SnapCameraScreen";
import { SnapEditScreen } from "@/app/components/SnapEditScreen";
import { SnapViewerScreen } from "@/app/components/SnapViewerScreen";
import { StreamFeedScreen } from "@/app/components/StreamFeedScreen";
import { ProfileScreen } from "@/app/components/ProfileScreen";
import { NotificationsScreen } from "@/app/components/NotificationsScreen";
import { SettingsScreen } from "@/app/components/SettingsScreen";
import { VideoPlayerScreen } from "@/app/components/VideoPlayerScreen";

// Navigation & Modals
import { BottomNav } from "@/app/components/BottomNav";
import { FloatingActionButton } from "@/app/components/FloatingActionButton";
import { CreatePostModal } from "@/app/components/CreatePostModal";
import { VideoUploadModal } from "@/app/components/VideoUploadModal";

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

  // Check if we're in the main app (after auth)
  const isInMainApp = [
    "feed",
    "chats",
    "chat-window",
    "snaps",
    "snap-camera",
    "snap-edit",
    "snap-viewer",
    "stream",
    "video-player",
    "profile",
    "notifications",
  ].includes(currentScreen);

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
      // Onboarding
      case "onboarding1":
        return (
          <OnboardingScreen1 onNext={() => setCurrentScreen("onboarding2")} />
        );
      case "onboarding2":
        return (
          <OnboardingScreen2 onNext={() => setCurrentScreen("onboarding3")} />
        );
      case "onboarding3":
        return (
          <OnboardingScreen3 onGetStarted={() => setCurrentScreen("login")} />
        );

      // Auth
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

      // Main App
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
          <SnapCameraScreen
            onCapture={() => setCurrentScreen("snap-edit")}
            onClose={() => {
              setCurrentScreen("feed");
              setActiveTab("feed");
            }}
          />
        );

      case "snap-camera":
        return (
          <SnapCameraScreen
            onCapture={() => setCurrentScreen("snap-edit")}
            onClose={() => {
              setCurrentScreen("feed");
              setActiveTab("feed");
            }}
          />
        );

      case "snap-edit":
        return (
          <SnapEditScreen
            onSend={() => {
              setCurrentScreen("snaps");
              setActiveTab("snaps");
            }}
            onCancel={() => setCurrentScreen("snaps")}
          />
        );

      case "snap-viewer":
        return (
          <SnapViewerScreen
            onClose={() => {
              setCurrentScreen("snaps");
              setActiveTab("snaps");
            }}
          />
        );

      case "stream":
        return (
          <StreamFeedScreen
            onVideoSelect={() => setCurrentScreen("video-player")}
          />
        );

      case "video-player":
        return <VideoPlayerScreen onBack={() => setCurrentScreen("stream")} />;

      case "profile":
        return (
          <ProfileScreen onOpenSettings={() => setCurrentScreen("settings")} />
        );

      case "notifications":
        return <NotificationsScreen />;

      case "settings":
        return <SettingsScreen onBack={() => setCurrentScreen("profile")} />;

      default:
        return <FeedScreen />;
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#001C30] overflow-hidden">
      {/* Mobile Viewport Container */}
      <div className="max-w-md mx-auto h-full relative shadow-2xl">
        {/* Screen Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Navigation */}
        {showBottomNav && (
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        )}

        {/* Floating Action Button */}
        {showBottomNav && (
          <FloatingActionButton
            onCreatePost={handleCreatePost}
            onCreateSnap={handleCreateSnap}
            onUploadVideo={handleUploadVideo}
          />
        )}

        {/* Modals */}
        <CreatePostModal
          isOpen={isCreatePostOpen}
          onClose={() => setIsCreatePostOpen(false)}
        />
        <VideoUploadModal
          isOpen={isVideoUploadOpen}
          onClose={() => setIsVideoUploadOpen(false)}
        />
      </div>
    </div>
  );
}