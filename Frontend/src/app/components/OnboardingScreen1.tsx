import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface OnboardingScreenProps {
  onNext: () => void;
}

export function OnboardingScreen1({ onNext }: OnboardingScreenProps) {
  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#001C30] via-[#003454] to-[#176B87] flex flex-col items-center justify-between px-8 py-12">
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="text-[#64CCC5] text-7xl font-bold tracking-wider drop-shadow-[0_0_30px_rgba(100,204,197,0.6)]">
            UNEXA
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-8"
        >
          <Sparkles className="w-32 h-32 mx-auto text-[#64CCC5] mb-6 drop-shadow-[0_0_20px_rgba(100,204,197,0.5)]" />
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-semibold text-[#DAFFFB] mb-4">
            Connect & Share
          </h2>
          <p className="text-[#64CCC5] text-lg px-4 leading-relaxed">
            The ultimate social experience combining all your favorite features
            in one place
          </p>
        </motion.div>
      </div>

      <motion.button
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        onClick={onNext}
        className="w-full bg-[#176B87] hover:bg-[#1d7a9a] text-[#DAFFFB] py-4 rounded-2xl shadow-[0_8px_30px_rgba(23,107,135,0.4)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(100,204,197,0.5)] hover:scale-[1.02]"
      >
        Next
      </motion.button>
    </div>
  );
}
