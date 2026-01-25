import { motion } from "motion/react";
import { Video, MessageCircle, Camera } from "lucide-react";

interface OnboardingScreenProps {
  onNext: () => void;
}

export function OnboardingScreen2({ onNext }: OnboardingScreenProps) {
  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#001C30] via-[#003454] to-[#176B87] flex flex-col items-center justify-between px-8 py-12">
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex gap-6"
        >
          <div className="w-20 h-20 bg-[#176B87] rounded-2xl flex items-center justify-center shadow-[0_8px_30px_rgba(23,107,135,0.4)]">
            <Video className="w-10 h-10 text-[#64CCC5]" />
          </div>
          <div className="w-20 h-20 bg-[#176B87] rounded-2xl flex items-center justify-center shadow-[0_8px_30px_rgba(23,107,135,0.4)]">
            <MessageCircle className="w-10 h-10 text-[#64CCC5]" />
          </div>
          <div className="w-20 h-20 bg-[#176B87] rounded-2xl flex items-center justify-center shadow-[0_8px_30px_rgba(23,107,135,0.4)]">
            <Camera className="w-10 h-10 text-[#64CCC5]" />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <h2 className="text-3xl font-semibold text-[#DAFFFB] mb-4">
            All-in-One Platform
          </h2>
          <p className="text-[#64CCC5] text-lg px-4 leading-relaxed">
            Stream videos, chat with friends, share snaps, and post your
            moments—all in UNEXA
          </p>
        </motion.div>
      </div>

      <motion.button
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        onClick={onNext}
        className="w-full bg-[#176B87] hover:bg-[#1d7a9a] text-[#DAFFFB] py-4 rounded-2xl shadow-[0_8px_30px_rgba(23,107,135,0.4)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(100,204,197,0.5)] hover:scale-[1.02]"
      >
        Next
      </motion.button>
    </div>
  );
}
