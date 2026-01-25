import { Home, Zap, Play, MessageCircle, User } from "lucide-react";
import { motion } from "motion/react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "feed", icon: Home, label: "Feed" },
    { id: "snaps", icon: Zap, label: "Snaps" },
    { id: "stream", icon: Play, label: "Stream" },
    { id: "chats", icon: MessageCircle, label: "Chats" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#002843] border-t border-[#176B87]/30 rounded-t-[24px] shadow-[0_-8px_30px_rgba(0,0,0,0.3)] pb-safe z-40">
      <div className="flex justify-around items-center px-4 py-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center gap-1 py-2 px-4 transition-all"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#176B87]/20 rounded-2xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon
                className={`w-6 h-6 relative z-10 transition-all ${
                  isActive
                    ? "text-[#64CCC5] fill-[#64CCC5]"
                    : "text-[#64CCC5]/50"
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`text-xs relative z-10 transition-all ${
                  isActive ? "text-[#DAFFFB]" : "text-[#64CCC5]/50"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
