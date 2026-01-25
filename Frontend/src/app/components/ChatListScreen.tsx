import { Search, Edit } from "lucide-react";
import { motion } from "motion/react";

interface ChatListScreenProps {
  onChatSelect: (chatId: number) => void;
}

export function ChatListScreen({ onChatSelect }: ChatListScreenProps) {
  const chats = [
    {
      id: 1,
      username: "alex_m",
      lastMessage: "Hey! Did you see that new feature?",
      time: "2m",
      unread: 3,
      online: true,
    },
    {
      id: 2,
      username: "sarah_k",
      lastMessage: "Thanks for the help!",
      time: "15m",
      unread: 0,
      online: true,
    },
    {
      id: 3,
      username: "mike_r",
      lastMessage: "Let's catch up tomorrow",
      time: "1h",
      unread: 1,
      online: false,
    },
    {
      id: 4,
      username: "emma_w",
      lastMessage: "That was amazing! 🎉",
      time: "3h",
      unread: 0,
      online: false,
    },
    {
      id: 5,
      username: "john_d",
      lastMessage: "See you later!",
      time: "5h",
      unread: 0,
      online: false,
    },
  ];

  return (
    <div className="h-screen bg-[#001C30] flex flex-col pb-20">
      {/* Top Bar */}
      <div className="px-6 py-4 flex items-center justify-between bg-[#001C30] border-b border-[#176B87]/20">
        <div className="text-[#DAFFFB] text-2xl font-semibold">Chats</div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#176B87]/20 hover:bg-[#176B87]/30 transition-colors">
          <Edit className="w-5 h-5 text-[#64CCC5]" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64CCC5]/50" />
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full bg-[#176B87]/20 border border-[#176B87]/40 text-[#DAFFFB] placeholder:text-[#64CCC5]/50 px-12 py-3 rounded-2xl focus:outline-none focus:border-[#64CCC5] focus:ring-2 focus:ring-[#64CCC5]/30 transition-all"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat, index) => (
          <motion.button
            key={chat.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onChatSelect(chat.id)}
            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#176B87]/10 transition-colors border-b border-[#176B87]/10"
          >
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-[#176B87] flex items-center justify-center">
                <span className="text-[#DAFFFB] text-lg font-semibold">
                  {chat.username[0].toUpperCase()}
                </span>
              </div>
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#64CCC5] rounded-full border-2 border-[#001C30]"></div>
              )}
            </div>

            <div className="flex-1 text-left">
              <div className="flex items-center justify-between mb-1">
                <div className="text-[#DAFFFB] font-semibold">{chat.username}</div>
                <div className="text-[#64CCC5] text-xs">{chat.time}</div>
              </div>
              <div className="flex items-center justify-between">
                <div
                  className={`text-sm truncate max-w-[200px] ${
                    chat.unread > 0 ? "text-[#DAFFFB]" : "text-[#64CCC5]/70"
                  }`}
                >
                  {chat.lastMessage}
                </div>
                {chat.unread > 0 && (
                  <div className="w-5 h-5 bg-[#64CCC5] rounded-full flex items-center justify-center">
                    <span className="text-[#001C30] text-xs font-semibold">
                      {chat.unread}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
