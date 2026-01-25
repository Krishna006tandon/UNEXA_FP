import { motion, AnimatePresence } from "motion/react";
import { Plus, ImagePlus, Camera, Video } from "lucide-react";
import { useState } from "react";

interface FloatingActionButtonProps {
  onCreatePost: () => void;
  onCreateSnap: () => void;
  onUploadVideo: () => void;
}

export function FloatingActionButton({
  onCreatePost,
  onCreateSnap,
  onUploadVideo,
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const wedges = [
    {
      icon: ImagePlus,
      label: "Create Post",
      onClick: () => {
        onCreatePost();
        setIsOpen(false);
      },
      angle: 90, // Top
      color: "#64CCC5",
    },
    {
      icon: Camera,
      label: "Create Snap",
      onClick: () => {
        onCreateSnap();
        setIsOpen(false);
      },
      angle: 135, // Top-left
      color: "#176B87",
    },
    {
      icon: Video,
      label: "Upload Video",
      onClick: () => {
        onUploadVideo();
        setIsOpen(false);
      },
      angle: 45, // Top-right
      color: "#DAFFFB",
    },
  ];

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm -z-10"
            />

            {/* Wedge Options */}
            {wedges.map((wedge, index) => {
              const Icon = wedge.icon;
              const radius = 100;
              const angleRad = (wedge.angle * Math.PI) / 180;
              const x = radius * Math.cos(angleRad);
              const y = -radius * Math.sin(angleRad);

              return (
                <motion.button
                  key={index}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                  animate={{
                    scale: 1,
                    x: x,
                    y: y,
                    opacity: 1,
                  }}
                  exit={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: index * 0.05,
                  }}
                  onClick={wedge.onClick}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:scale-110 transition-transform"
                  style={{
                    backgroundColor: wedge.color,
                  }}
                >
                  <Icon className="w-7 h-7 text-[#001C30]" />
                </motion.button>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-20 h-20 bg-gradient-to-br from-[#176B87] to-[#64CCC5] rounded-full shadow-[0_12px_40px_rgba(100,204,197,0.6)] flex items-center justify-center hover:shadow-[0_12px_50px_rgba(100,204,197,0.8)] transition-shadow relative z-10"
      >
        <Plus className="w-10 h-10 text-[#001C30]" strokeWidth={3} />
      </motion.button>
    </div>
  );
}
