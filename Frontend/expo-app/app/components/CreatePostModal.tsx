import { X, Image, Smile, MapPin, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [caption, setCaption] = useState("");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-[#001C30] rounded-3xl border border-[#176B87]/30 shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-50 max-w-md mx-auto"
          >
            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-[#176B87]/20">
              <div className="text-[#DAFFFB] text-lg font-semibold">
                Create Post
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#176B87]/20 transition-colors"
              >
                <X className="w-5 h-5 text-[#64CCC5]" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* User Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#176B87] to-[#64CCC5] flex items-center justify-center">
                  <span className="text-[#001C30] font-semibold">U</span>
                </div>
                <div>
                  <div className="text-[#DAFFFB] font-semibold">UNEXA User</div>
                  <div className="text-[#64CCC5] text-xs">@unexa_official</div>
                </div>
              </div>

              {/* Caption Input */}
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full bg-transparent text-[#DAFFFB] placeholder-[#64CCC5]/50 resize-none outline-none mb-4 min-h-[120px]"
              />

              {/* Image Upload Area */}
              <div className="w-full h-48 rounded-2xl border-2 border-dashed border-[#176B87]/30 bg-[#176B87]/5 flex flex-col items-center justify-center gap-3 mb-4 hover:bg-[#176B87]/10 transition-colors cursor-pointer">
                <Image className="w-12 h-12 text-[#64CCC5]/50" />
                <div className="text-[#64CCC5] text-sm">Click to add photo</div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 mb-6">
                <button className="flex items-center gap-2 text-[#64CCC5] hover:text-[#DAFFFB] transition-colors">
                  <Image className="w-5 h-5" />
                  <span className="text-sm">Photo</span>
                </button>
                <button className="flex items-center gap-2 text-[#64CCC5] hover:text-[#DAFFFB] transition-colors">
                  <Smile className="w-5 h-5" />
                  <span className="text-sm">Emoji</span>
                </button>
                <button className="flex items-center gap-2 text-[#64CCC5] hover:text-[#DAFFFB] transition-colors">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm">Location</span>
                </button>
                <button className="flex items-center gap-2 text-[#64CCC5] hover:text-[#DAFFFB] transition-colors">
                  <Tag className="w-5 h-5" />
                  <span className="text-sm">Tag</span>
                </button>
              </div>

              {/* Post Button */}
              <button className="w-full bg-gradient-to-r from-[#176B87] to-[#64CCC5] hover:from-[#1d7a9a] hover:to-[#70d4cd] text-[#001C30] py-3 rounded-2xl font-semibold shadow-[0_8px_30px_rgba(100,204,197,0.4)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(100,204,197,0.6)]">
                Post
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
