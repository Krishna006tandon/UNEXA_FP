import { X, Upload, Film, FileVideo } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface VideoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoUploadModal({ isOpen, onClose }: VideoUploadModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-[#001C30] rounded-3xl border border-[#176B87]/30 shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-50 max-w-md mx-auto max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-[#176B87]/20 sticky top-0 bg-[#001C30] z-10">
              <div className="text-[#DAFFFB] text-lg font-semibold">
                Upload Video
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
              {/* Video Upload Area */}
              <div className="w-full h-56 rounded-2xl border-2 border-dashed border-[#176B87]/30 bg-[#176B87]/5 flex flex-col items-center justify-center gap-3 mb-6 hover:bg-[#176B87]/10 transition-colors cursor-pointer">
                <Film className="w-16 h-16 text-[#64CCC5]/50" />
                <div className="text-[#64CCC5] font-semibold">
                  Click to upload video
                </div>
                <div className="text-[#64CCC5]/50 text-sm">MP4, MOV, AVI</div>
                <button className="mt-2 px-6 py-2 bg-[#176B87] hover:bg-[#1d7a9a] text-[#DAFFFB] rounded-xl transition-colors flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>Browse Files</span>
                </button>
              </div>

              {/* Thumbnail Selector */}
              <div className="mb-4">
                <label className="text-[#DAFFFB] text-sm font-semibold mb-2 block">
                  Thumbnail
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="aspect-video rounded-xl border-2 border-[#176B87]/30 bg-[#176B87]/5 flex items-center justify-center hover:border-[#64CCC5] transition-colors cursor-pointer"
                    >
                      <FileVideo className="w-6 h-6 text-[#64CCC5]/50" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Title Input */}
              <div className="mb-4">
                <label className="text-[#DAFFFB] text-sm font-semibold mb-2 block">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your video a title"
                  className="w-full bg-[#176B87]/10 border border-[#176B87]/30 text-[#DAFFFB] placeholder-[#64CCC5]/50 px-4 py-3 rounded-xl outline-none focus:border-[#64CCC5] transition-colors"
                />
              </div>

              {/* Description Input */}
              <div className="mb-6">
                <label className="text-[#DAFFFB] text-sm font-semibold mb-2 block">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell viewers about your video"
                  className="w-full bg-[#176B87]/10 border border-[#176B87]/30 text-[#DAFFFB] placeholder-[#64CCC5]/50 px-4 py-3 rounded-xl outline-none focus:border-[#64CCC5] transition-colors resize-none min-h-[100px]"
                />
              </div>

              {/* Upload Button */}
              <button className="w-full bg-gradient-to-r from-[#176B87] to-[#64CCC5] hover:from-[#1d7a9a] hover:to-[#70d4cd] text-[#001C30] py-3 rounded-2xl font-semibold shadow-[0_8px_30px_rgba(100,204,197,0.4)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(100,204,197,0.6)]">
                Upload Video
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
