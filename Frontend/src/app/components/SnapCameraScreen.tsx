import { X, Zap, Settings, RotateCw, Circle, Image } from "lucide-react";
import { motion } from "motion/react";

interface SnapCameraScreenProps {
  onCapture: () => void;
  onClose: () => void;
}

export function SnapCameraScreen({ onCapture, onClose }: SnapCameraScreenProps) {
  return (
    <div className="h-screen w-full bg-[#001C30] relative overflow-hidden">
      {/* Camera Preview */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#176B87]/30 to-[#64CCC5]/30 flex items-center justify-center">
        <div className="text-[#64CCC5]/30 text-6xl">📸</div>
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 px-4 py-6 flex items-center justify-between z-10">
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors">
            <Zap className="w-5 h-5 text-white" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors">
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-safe">
        <div className="pb-8 flex items-center justify-between">
          <button className="w-14 h-14 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors">
            <Image className="w-7 h-7 text-white" />
          </button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onCapture}
            className="w-20 h-20 rounded-full bg-white/90 border-4 border-[#64CCC5] shadow-[0_0_30px_rgba(100,204,197,0.6)] hover:bg-white transition-all relative"
          >
            <Circle className="w-16 h-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#64CCC5]" />
          </motion.button>

          <button className="w-14 h-14 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors">
            <RotateCw className="w-7 h-7 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
