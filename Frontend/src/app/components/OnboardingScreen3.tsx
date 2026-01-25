import { motion } from "motion/react";
import { Zap } from "lucide-react";

interface OnboardingScreenProps {
  onGetStarted: () => void;
}

export function OnboardingScreen3({ onGetStarted }: OnboardingScreenProps) {
  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#001C30] via-[#003454] to-[#176B87] flex flex-col items-center justify-between px-8 py-12">
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="relative">
            <Zap className="w-40 h-40 text-[#64CCC5] drop-shadow-[0_0_40px_rgba(100,204,197,0.8)]" fill="#64CCC5" />
            <div className="absolute inset-0 bg-[#64CCC5] blur-3xl opacity-30 rounded-full"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <h2 className="text-3xl font-semibold text-[#DAFFFB] mb-4">
            Fast & Futuristic
          </h2>
          <p className="text-[#64CCC5] text-lg px-4 leading-relaxed">
            Experience the next generation of social media with lightning-fast
            performance and stunning design
          </p>
        </motion.div>
      </div>

      <motion.button
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        onClick={onGetStarted}
        className="w-full bg-gradient-to-r from-[#176B87] to-[#64CCC5] hover:from-[#1d7a9a] hover:to-[#70d9d2] text-[#001C30] py-4 rounded-2xl shadow-[0_8px_30px_rgba(100,204,197,0.5)] transition-all duration-300 hover:shadow-[0_8px_50px_rgba(100,204,197,0.7)] hover:scale-[1.02] font-semibold"
      >
        Get Started
      </motion.button>
    </div>
  );
}
