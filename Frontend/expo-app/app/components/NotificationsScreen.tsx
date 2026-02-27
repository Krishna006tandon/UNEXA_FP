import { Heart, MessageCircle, UserPlus, AtSign } from "lucide-react";
import { motion } from "framer-motion";

export function NotificationsScreen() {
  const notifications = [
    {
      id: 1,
      type: "like",
      user: "alex_m",
      message: "liked your post",
      time: "5m ago",
      icon: Heart,
      color: "#FF4D6A",
    },
    {
      id: 2,
      type: "comment",
      user: "sarah_k",
      message: "commented: Amazing work! 🔥",
      time: "12m ago",
      icon: MessageCircle,
      color: "#64CCC5",
    },
    {
      id: 3,
      type: "follow",
      user: "mike_r",
      message: "started following you",
      time: "1h ago",
      icon: UserPlus,
      color: "#176B87",
    },
    {
      id: 4,
      type: "mention",
      user: "emma_w",
      message: "mentioned you in a comment",
      time: "2h ago",
      icon: AtSign,
      color: "#64CCC5",
    },
    {
      id: 5,
      type: "like",
      user: "john_d",
      message: "liked your snap",
      time: "3h ago",
      icon: Heart,
      color: "#FF4D6A",
    },
    {
      id: 6,
      type: "comment",
      user: "lisa_p",
      message: "commented on your video",
      time: "5h ago",
      icon: MessageCircle,
      color: "#64CCC5",
    },
  ];

  return (
    <div className="h-screen bg-[#001C30] flex flex-col pb-20">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between bg-[#001C30] border-b border-[#176B87]/20 sticky top-0 z-10">
        <div className="text-[#DAFFFB] text-xl font-semibold">
          Notifications
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {notifications.map((notification, index) => {
          const Icon = notification.icon;

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="px-6 py-4 flex items-center gap-4 border-b border-[#176B87]/10 hover:bg-[#176B87]/5 transition-colors"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${notification.color}20` }}
              >
                <Icon
                  className="w-5 h-5"
                  style={{ color: notification.color }}
                />
              </div>

              {/* User Avatar */}
              <div className="w-10 h-10 rounded-full bg-[#176B87] flex items-center justify-center flex-shrink-0">
                <span className="text-[#DAFFFB] font-semibold text-sm">
                  {notification.user[0].toUpperCase()}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="text-[#DAFFFB]">
                  <span className="font-semibold">{notification.user}</span>{" "}
                  <span className="text-[#64CCC5]">{notification.message}</span>
                </div>
                <div className="text-[#64CCC5]/70 text-sm mt-0.5">
                  {notification.time}
                </div>
              </div>

              {/* Follow Button (for follow notifications) */}
              {notification.type === "follow" && (
                <button className="px-4 py-2 bg-[#176B87] hover:bg-[#1d7a9a] text-[#DAFFFB] rounded-xl transition-colors text-sm font-semibold">
                  Follow
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
