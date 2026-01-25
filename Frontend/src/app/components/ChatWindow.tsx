import { ArrowLeft, Phone, Video, MoreVertical, Smile, Camera, Paperclip, Mic, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface ChatWindowProps {
  onBack: () => void;
}

export function ChatWindow({ onBack }: ChatWindowProps) {
  const [message, setMessage] = useState("");

  const messages = [
    { id: 1, text: "Hey! How are you?", sent: false, time: "10:30 AM" },
    { id: 2, text: "I'm good! Just working on some projects", sent: true, time: "10:32 AM" },
    { id: 3, text: "That's awesome! What are you building?", sent: false, time: "10:33 AM" },
    {
      id: 4,
      text: "A new social media app with some cool features",
      sent: true,
      time: "10:35 AM",
    },
    { id: 5, text: "Can't wait to see it! 🚀", sent: false, time: "10:36 AM" },
  ];

  return (
    <div className="h-screen bg-[#001C30] flex flex-col pb-20">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between bg-[#002843] border-b border-[#176B87]/20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#176B87]/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#64CCC5]" />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#176B87] flex items-center justify-center">
                <span className="text-[#DAFFFB] font-semibold">A</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#64CCC5] rounded-full border-2 border-[#002843]"></div>
            </div>
            <div>
              <div className="text-[#DAFFFB] font-semibold">alex_m</div>
              <div className="text-[#64CCC5] text-xs">Online</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#176B87]/20 transition-colors">
            <Phone className="w-5 h-5 text-[#64CCC5]" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#176B87]/20 transition-colors">
            <Video className="w-5 h-5 text-[#64CCC5]" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#176B87]/20 transition-colors">
            <MoreVertical className="w-5 h-5 text-[#64CCC5]" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex ${msg.sent ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                msg.sent
                  ? "bg-[#176B87] text-[#DAFFFB] rounded-br-sm"
                  : "bg-[#64CCC5] text-[#001C30] rounded-bl-sm"
              }`}
            >
              <div className="text-sm">{msg.text}</div>
              <div
                className={`text-xs mt-1 ${
                  msg.sent ? "text-[#64CCC5]" : "text-[#176B87]"
                }`}
              >
                {msg.time}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="px-4 py-3 bg-[#002843] border-t border-[#176B87]/20">
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#176B87]/20 transition-colors">
            <Smile className="w-5 h-5 text-[#64CCC5]" />
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-[#176B87]/20 border border-[#176B87]/40 text-[#DAFFFB] placeholder:text-[#64CCC5]/50 px-4 py-2 pr-20 rounded-full focus:outline-none focus:border-[#64CCC5] focus:ring-2 focus:ring-[#64CCC5]/30 transition-all"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#176B87]/30 transition-colors">
                <Camera className="w-4 h-4 text-[#64CCC5]" />
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#176B87]/30 transition-colors">
                <Paperclip className="w-4 h-4 text-[#64CCC5]" />
              </button>
            </div>
          </div>

          {message ? (
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#64CCC5] hover:bg-[#70d9d2] transition-colors">
              <Send className="w-5 h-5 text-[#001C30]" />
            </button>
          ) : (
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#176B87]/20 transition-colors">
              <Mic className="w-5 h-5 text-[#64CCC5]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}