import { Settings, Grid, Zap, Play, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface ProfileScreenProps {
  onOpenSettings: () => void;
}

export function ProfileScreen({ onOpenSettings }: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState("posts");

  const tabs = [
    { id: "posts", icon: Grid, label: "Posts" },
    { id: "snaps", icon: Zap, label: "Snaps" },
    { id: "videos", icon: Play, label: "Videos" },
    { id: "tagged", icon: Tag, label: "Tagged" },
  ];

  const posts = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    type: activeTab,
  }));

  return (
    <div className="h-screen bg-[#001C30] flex flex-col pb-20 overflow-y-auto">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between bg-[#001C30] border-b border-[#176B87]/20 sticky top-0 z-10">
        <div className="text-[#DAFFFB] text-xl font-semibold">Profile</div>
        <button
          onClick={onOpenSettings}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#176B87]/20 transition-colors"
        >
          <Settings className="w-6 h-6 text-[#64CCC5]" />
        </button>
      </div>

      {/* Profile Info */}
      <div className="px-6 py-6">
        <div className="flex items-center gap-6 mb-6">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#64CCC5] to-[#176B87] p-1">
              <div className="w-full h-full rounded-full bg-[#001C30] p-1">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#176B87] to-[#64CCC5] flex items-center justify-center shadow-[0_8px_30px_rgba(100,204,197,0.4)]">
                  <span className="text-[#001C30] text-3xl font-bold">U</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1 flex justify-around">
            <div className="text-center">
              <div className="text-[#DAFFFB] text-2xl font-bold">127</div>
              <div className="text-[#64CCC5] text-sm">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-[#DAFFFB] text-2xl font-bold">2.5K</div>
              <div className="text-[#64CCC5] text-sm">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-[#DAFFFB] text-2xl font-bold">842</div>
              <div className="text-[#64CCC5] text-sm">Following</div>
            </div>
          </div>
        </div>

        {/* Name & Bio */}
        <div className="mb-4">
          <div className="text-[#DAFFFB] font-bold text-lg">UNEXA User</div>
          <div className="text-[#64CCC5] text-sm">@unexa_official</div>
          <div className="text-[#DAFFFB] mt-2 leading-relaxed">
            Living life in neon 🌊✨
            <br />
            Content creator | Digital artist
          </div>
        </div>

        {/* Edit Profile Button */}
        <button className="w-full bg-[#176B87] hover:bg-[#1d7a9a] text-[#DAFFFB] py-3 rounded-2xl shadow-[0_4px_20px_rgba(23,107,135,0.4)] transition-all duration-300 hover:shadow-[0_4px_30px_rgba(100,204,197,0.5)]">
          Edit Profile
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-t border-[#176B87]/20">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 py-3 flex items-center justify-center gap-2 relative"
            >
              {isActive && (
                <motion.div
                  layoutId="profileTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#64CCC5]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon
                className={`w-5 h-5 ${
                  isActive ? "text-[#64CCC5]" : "text-[#64CCC5]/50"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-1 p-1">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: post.id * 0.05 }}
            className="aspect-square bg-gradient-to-br from-[#176B87]/20 to-[#64CCC5]/20 rounded-xl overflow-hidden"
          >
            <ImageWithFallback
              src={`https://images.unsplash.com/photo-${
                1500000000000 + post.id * 10000000
              }?w=400&h=400&fit=crop`}
              alt={`Post ${post.id}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
