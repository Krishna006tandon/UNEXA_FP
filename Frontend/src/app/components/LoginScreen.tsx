import { motion } from "motion/react";
import { Mail, Lock } from "lucide-react";
import { useState } from "react";

interface LoginScreenProps {
  onLogin: () => void;
  onSignup: () => void;
}

export function LoginScreen({ onLogin, onSignup }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-screen w-full bg-[#001C30] flex flex-col items-center justify-between px-8 py-12">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-8"
      >
        <div className="text-[#64CCC5] text-6xl font-bold tracking-wider drop-shadow-[0_0_30px_rgba(100,204,197,0.6)]">
          UNEXA
        </div>
        <p className="text-[#64CCC5] mt-2 text-sm">Welcome back</p>
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full flex-1 flex flex-col justify-center"
      >
        <div className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64CCC5]" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#176B87]/20 border border-[#176B87]/40 text-[#DAFFFB] placeholder:text-[#64CCC5]/50 px-12 py-4 rounded-2xl focus:outline-none focus:border-[#64CCC5] focus:ring-2 focus:ring-[#64CCC5]/30 transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64CCC5]" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#176B87]/20 border border-[#176B87]/40 text-[#DAFFFB] placeholder:text-[#64CCC5]/50 px-12 py-4 rounded-2xl focus:outline-none focus:border-[#64CCC5] focus:ring-2 focus:ring-[#64CCC5]/30 transition-all"
            />
          </div>

          <button className="text-[#64CCC5] text-sm hover:text-[#DAFFFB] transition-colors">
            Forgot password?
          </button>

          <button
            onClick={onLogin}
            className="w-full bg-[#176B87] hover:bg-[#1d7a9a] text-[#DAFFFB] py-4 rounded-2xl shadow-[0_8px_30px_rgba(23,107,135,0.4)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(100,204,197,0.5)] hover:scale-[1.02]"
          >
            Login
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center"
      >
        <p className="text-[#64CCC5]">
          Don't have an account?{" "}
          <button
            onClick={onSignup}
            className="text-[#DAFFFB] font-semibold hover:text-[#64CCC5] transition-colors"
          >
            Create account
          </button>
        </p>
      </motion.div>
    </div>
  );
}
