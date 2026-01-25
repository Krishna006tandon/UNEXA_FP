import { motion } from "motion/react";
import { User, AtSign, Mail, Lock, Camera } from "lucide-react";
import { useState } from "react";

interface SignupScreenProps {
  onSignup: () => void;
  onLogin: () => void;
}

export function SignupScreen({ onSignup, onLogin }: SignupScreenProps) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-screen w-full bg-[#001C30] flex flex-col items-center px-8 py-12 overflow-y-auto">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="text-[#64CCC5] text-5xl font-bold tracking-wider drop-shadow-[0_0_30px_rgba(100,204,197,0.6)]">
          UNEXA
        </div>
        <p className="text-[#64CCC5] mt-2 text-sm">Create your account</p>
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full flex-1 flex flex-col"
      >
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-[#176B87]/30 rounded-full border-2 border-dashed border-[#64CCC5]/50 flex items-center justify-center">
              <User className="w-10 h-10 text-[#64CCC5]/50" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#64CCC5] rounded-full flex items-center justify-center shadow-lg">
              <Camera className="w-4 h-4 text-[#001C30]" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64CCC5]" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#176B87]/20 border border-[#176B87]/40 text-[#DAFFFB] placeholder:text-[#64CCC5]/50 px-12 py-3.5 rounded-2xl focus:outline-none focus:border-[#64CCC5] focus:ring-2 focus:ring-[#64CCC5]/30 transition-all"
            />
          </div>

          <div className="relative">
            <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64CCC5]" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#176B87]/20 border border-[#176B87]/40 text-[#DAFFFB] placeholder:text-[#64CCC5]/50 px-12 py-3.5 rounded-2xl focus:outline-none focus:border-[#64CCC5] focus:ring-2 focus:ring-[#64CCC5]/30 transition-all"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64CCC5]" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#176B87]/20 border border-[#176B87]/40 text-[#DAFFFB] placeholder:text-[#64CCC5]/50 px-12 py-3.5 rounded-2xl focus:outline-none focus:border-[#64CCC5] focus:ring-2 focus:ring-[#64CCC5]/30 transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64CCC5]" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#176B87]/20 border border-[#176B87]/40 text-[#DAFFFB] placeholder:text-[#64CCC5]/50 px-12 py-3.5 rounded-2xl focus:outline-none focus:border-[#64CCC5] focus:ring-2 focus:ring-[#64CCC5]/30 transition-all"
            />
          </div>

          <button
            onClick={onSignup}
            className="w-full bg-gradient-to-r from-[#176B87] to-[#64CCC5] hover:from-[#1d7a9a] hover:to-[#70d9d2] text-[#001C30] py-4 rounded-2xl shadow-[0_8px_30px_rgba(100,204,197,0.5)] transition-all duration-300 hover:shadow-[0_8px_50px_rgba(100,204,197,0.7)] hover:scale-[1.02] font-semibold mt-4"
          >
            Continue
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-6"
      >
        <p className="text-[#64CCC5]">
          Already have an account?{" "}
          <button
            onClick={onLogin}
            className="text-[#DAFFFB] font-semibold hover:text-[#64CCC5] transition-colors"
          >
            Login
          </button>
        </p>
      </motion.div>
    </div>
  );
}
