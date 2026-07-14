import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, User, Wifi, Activity, Zap } from "lucide-react";
import { useAuthStore } from "../context/authStore";
import { getMonthYear } from "../utils/dateUtils";
import { ProfileModal } from "./ProfileModal";
import { NeuralActivityMonitor } from "./NeuralActivityMonitor";

export const Topbar = () => {
  const { user } = useAuthStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 backdrop-blur-xl border-b border-emerald-500/20 sticky top-0 z-30"
    >
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left side - System Info */}
        <div className="flex items-center space-x-6 pl-14 md:pl-0">
          <div className="font-mono">
            <h2 className="text-lg font-bold text-white flex items-center">
              <Activity className="w-4 h-4 text-emerald-400 mr-2" />
              {getMonthYear(new Date())}
            </h2>
            <p className="text-sm text-gray-400 flex items-center">
              <span>{new Date().toLocaleDateString("en-US", { weekday: "long" })}</span>
              <span className="mx-2">•</span>
              <span>{currentTime.toLocaleTimeString()}</span>
            </p>
          </div>

          {/* Neural Activity Monitor */}
          <NeuralActivityMonitor />
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <motion.button
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 0 15px rgba(16, 185, 129, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 bg-gray-800/50 hover:bg-emerald-500/10 border border-gray-700 hover:border-emerald-500/30 rounded-lg transition-all duration-300 relative"
          >
            <Bell className="w-5 h-5 text-gray-400 hover:text-emerald-400 transition-colors" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute top-2 right-2 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_6px_rgba(16,185,129,0.8)]"
            />
          </motion.button>

          {/* User Profile - Desktop */}
          {user && (
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsProfileOpen(true)}
              className="hidden sm:flex items-center space-x-3 pl-4 border-l border-emerald-500/20 hover:bg-emerald-500/5 rounded-lg pr-3 py-2 transition-all duration-300"
            >
              <div className="text-right">
                <p className="text-sm font-semibold text-white font-mono">
                  {user.name}
                </p>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <p className="text-xs text-emerald-400 font-mono">CONNECTED</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 border border-emerald-500/30 flex items-center justify-center">
                <User className="w-5 h-5 text-emerald-400" />
              </div>
            </motion.button>
          )}
          
          {/* User Profile - Mobile */}
          {user && (
            <motion.button
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 0 15px rgba(16, 185, 129, 0.3)"
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsProfileOpen(true)}
              className="sm:hidden w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 border border-emerald-500/30 flex items-center justify-center"
            >
              <User className="w-5 h-5 text-emerald-400" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Neural Activity Bar */}
      <div className="px-6 pb-2">
        <div className="flex space-x-1 h-1">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-emerald-500/20 rounded-full overflow-hidden"
              animate={{
                backgroundColor: [
                  "rgba(16, 185, 129, 0.2)",
                  "rgba(16, 185, 129, 0.6)",
                  "rgba(16, 185, 129, 0.2)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </motion.div>
  );
};
