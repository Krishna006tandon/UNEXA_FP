import { X, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface SnapViewerScreenProps {
  onClose: () => void;
}

export function SnapViewerScreen({ onClose }: SnapViewerScreenProps) {
  const [reply, setReply] = useState("");

  return (
    <div className="h-screen w-full bg-black relative overflow-hidden">
      {/* Story Content */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#176B87] to-[#64CCC5] flex items-center justify-center">
        <div className="text-white text-5xl">🌟</div>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 px-2 pt-2 z-10">
        <div className="flex gap-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: i === 1 ? "0%" : "0%" }}
                animate={{ width: i === 1 ? "100%" : "0%" }}
                transition={{ duration: 3 }}
                className="h-full bg-white"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Top Info */}
      <div className="absolute top-4 left-0 right-0 px-4 pt-4 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white font-semibold">A</span>
            </div>
            <div>
              <div className="text-white font-semibold">alex_m</div>
              <div className="text-white/70 text-xs">2h ago</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Quick Reply */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-safe">
        <div className="pb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Send a quick reply..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/50 px-4 py-3 pr-12 rounded-full focus:outline-none focus:border-[#64CCC5] focus:ring-2 focus:ring-[#64CCC5]/30 transition-all"
            />
            {reply && (
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-[#64CCC5] hover:bg-[#70d9d2] transition-colors">
                <Send className="w-4 h-4 text-[#001C30]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
