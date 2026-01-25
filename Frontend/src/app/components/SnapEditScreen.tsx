import { X, Type, Palette, Smile, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface SnapEditScreenProps {
  onSend: () => void;
  onCancel: () => void;
}

export function SnapEditScreen({ onSend, onCancel }: SnapEditScreenProps) {
  const [showFriendsList, setShowFriendsList] = useState(false);

  const friends = [
    { id: 1, username: "alex_m", selected: false },
    { id: 2, username: "sarah_k", selected: false },
    { id: 3, username: "mike_r", selected: false },
    { id: 4, username: "emma_w", selected: false },
  ];

  return (
    <div className="h-screen w-full bg-[#001C30] relative overflow-hidden">
      {/* Snap Preview */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#176B87]/30 to-[#64CCC5]/30 flex items-center justify-center">
        <div className="text-white text-4xl">✨ Your Snap ✨</div>
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 px-4 py-6 flex items-center justify-between z-10">
        <button
          onClick={onCancel}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors">
            <Type className="w-5 h-5 text-white" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors">
            <Palette className="w-5 h-5 text-white" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors">
            <Smile className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-safe">
        <div className="pb-8 flex flex-col gap-4">
          <button
            onClick={() => setShowFriendsList(!showFriendsList)}
            className="w-full bg-gradient-to-r from-[#176B87] to-[#64CCC5] text-[#001C30] font-semibold py-4 rounded-2xl shadow-[0_8px_30px_rgba(100,204,197,0.5)] hover:shadow-[0_8px_50px_rgba(100,204,197,0.7)] transition-all"
          >
            Send to Friends
          </button>

          <button
            onClick={onSend}
            className="w-full bg-white/10 backdrop-blur-sm text-white font-semibold py-4 rounded-2xl border border-white/30 hover:bg-white/20 transition-all"
          >
            Add to My Story
          </button>
        </div>
      </div>

      {/* Friends List Modal */}
      {showFriendsList && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          className="absolute bottom-0 left-0 right-0 bg-[#002843] rounded-t-3xl p-6 max-h-[60vh] overflow-y-auto z-20"
        >
          <div className="text-[#DAFFFB] text-xl font-semibold mb-4">Send to</div>
          <div className="space-y-3">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-[#176B87]/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#176B87] flex items-center justify-center">
                  <span className="text-[#DAFFFB] font-semibold">
                    {friend.username[0].toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="text-[#DAFFFB] font-semibold">{friend.username}</div>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-[#64CCC5] flex items-center justify-center">
                  {friend.selected && (
                    <div className="w-3 h-3 rounded-full bg-[#64CCC5]"></div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onSend}
            className="w-full mt-6 bg-gradient-to-r from-[#176B87] to-[#64CCC5] text-[#001C30] font-semibold py-3 rounded-xl"
          >
            <Send className="w-5 h-5 inline mr-2" />
            Send Snap
          </button>
        </motion.div>
      )}
    </div>
  );
}