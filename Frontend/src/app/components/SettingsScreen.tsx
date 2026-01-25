import {
  ChevronRight,
  User,
  Lock,
  Bell,
  Info,
  HelpCircle,
  LogOut,
  Shield,
  Eye,
  Globe,
} from "lucide-react";
import { motion } from "motion/react";

interface SettingsScreenProps {
  onBack: () => void;
}

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  const settingsGroups = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Profile Settings", color: "#64CCC5" },
        { icon: Lock, label: "Password & Security", color: "#176B87" },
        { icon: Eye, label: "Privacy Settings", color: "#64CCC5" },
      ],
    },
    {
      title: "Preferences",
      items: [
        { icon: Bell, label: "Notifications", color: "#176B87" },
        { icon: Globe, label: "Language & Region", color: "#64CCC5" },
        { icon: Shield, label: "Data & Storage", color: "#176B87" },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", color: "#64CCC5" },
        { icon: Info, label: "About UNEXA", color: "#176B87" },
      ],
    },
  ];

  return (
    <div className="h-screen bg-[#001C30] flex flex-col pb-20">
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-4 bg-[#001C30] border-b border-[#176B87]/20 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#176B87]/20 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-[#64CCC5] rotate-180" />
        </button>
        <div className="text-[#DAFFFB] text-xl font-semibold">Settings</div>
      </div>

      {/* Settings List */}
      <div className="flex-1 overflow-y-auto">
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-6">
            <div className="px-6 py-3 text-[#64CCC5] text-sm font-semibold">
              {group.title}
            </div>
            <div className="bg-[#002843]/50">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon;

                return (
                  <motion.button
                    key={itemIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (groupIndex * 3 + itemIndex) * 0.05 }}
                    className="w-full px-6 py-4 flex items-center gap-4 border-b border-[#176B87]/10 hover:bg-[#176B87]/10 transition-colors"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <div className="flex-1 text-left text-[#DAFFFB]">
                      {item.label}
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#64CCC5]/50" />
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <div className="px-6 py-4">
          <button className="w-full bg-[#FF4D6A]/20 hover:bg-[#FF4D6A]/30 text-[#FF4D6A] py-4 rounded-2xl flex items-center justify-center gap-3 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-semibold">Log Out</span>
          </button>
        </div>

        {/* Version */}
        <div className="px-6 py-4 text-center text-[#64CCC5]/50 text-sm">
          UNEXA v1.0.0
        </div>
      </div>
    </div>
  );
}
