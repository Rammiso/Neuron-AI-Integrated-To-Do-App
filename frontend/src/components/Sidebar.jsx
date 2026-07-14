import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  Brain,
  Settings,
  LogOut,
  Menu,
  X,
  Activity,
  Zap
} from "lucide-react";
import { useAuthStore } from "../context/authStore";
import { useState } from "react";
import { GlitchText } from "./GlitchText";

const navItems = [
  { icon: LayoutDashboard, label: "Neural Hub", path: "/dashboard", description: "Command Center" },
  { icon: Calendar, label: "Timeline", path: "/calendar", description: "Temporal Grid" },
  { icon: CheckSquare, label: "Task Matrix", path: "/tasks", description: "Objective Queue" },
  { icon: Brain, label: "AI Core", path: "/ai", description: "Neural Assistant" },
  { icon: Settings, label: "System Config", path: "/settings", description: "Parameters" },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const sidebarContent = (isMobile = false) => (
    <>
      {/* Header */}
      <div className="p-6 border-b border-emerald-500/20 relative">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3"
        >
          <motion.div
            className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center"
            animate={{
              boxShadow: [
                '0 0 10px rgba(0,255,136,0.3)',
                '0 0 25px rgba(0,255,136,0.6)',
                '0 0 10px rgba(0,255,136,0.3)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Brain className="w-7 h-7 text-black" />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold font-mono">
              <GlitchText
                text="NEURON"
                className="rgb-shimmer"
                typingSpeed={100}
                enableGlitch={true}
              />
            </h1>
            <div className="flex items-center space-x-2">
              <div className="status-dot online" />
              <p className="text-xs text-gray-400 font-mono">NEURAL INTERFACE</p>
              <span className="text-xs font-mono text-emerald-400/60 bg-emerald-500/10 border border-emerald-500/20 rounded px-1">v2</span>
            </div>
          </div>
        </motion.div>
        
        {/* Close button for mobile */}
        {isMobile && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 hover:bg-emerald-500/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-emerald-400" />
          </motion.button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <motion.button
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                x: 6,
                boxShadow: isActive ? undefined : "0 0 20px rgba(16, 185, 129, 0.1)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                navigate(item.path);
                setIsOpen(false);
              }}
              className={`w-full group relative overflow-hidden rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-400"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50 border border-transparent"
              }`}
            >
              <div className="flex items-center space-x-4 p-4">
                <div className={`relative ${isActive ? 'text-emerald-400' : 'text-gray-500 group-hover:text-emerald-400'} transition-colors`}>
                  <Icon className="w-5 h-5" />
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-emerald-400/20 rounded-full blur-sm"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  )}
                </div>
                
                <div className="flex-1 text-left">
                  <div className={`font-semibold font-mono ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'} transition-colors`}>
                    {item.label}
                  </div>
                  <div className={`text-xs font-mono ${isActive ? 'text-emerald-400/70' : 'text-gray-500 group-hover:text-gray-400'} transition-colors`}>
                    {item.description}
                  </div>
                </div>

                {isActive && (
                  <motion.div
                    layoutId={isMobile ? "activeIndicatorMobile" : "activeIndicator"}
                    className="w-2 h-8 bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  />
                )}
              </div>

              {/* Holographic scan line */}
              {isActive && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scaleX: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* System Status */}
      <div className="p-4 border-t border-emerald-500/20">
        <div className="mb-4 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-gray-400">SYSTEM STATUS</span>
            <div className="flex items-center space-x-1">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span className="text-xs font-mono text-emerald-400">OPTIMAL</span>
            </div>
          </div>
          <div className="flex space-x-1">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="h-1 flex-1 bg-emerald-400/20 rounded-full overflow-hidden"
                animate={{
                  backgroundColor: [
                    "rgba(16, 185, 129, 0.2)",
                    "rgba(16, 185, 129, 0.6)",
                    "rgba(16, 185, 129, 0.2)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ 
            x: 4,
            boxShadow: "0 0 20px rgba(239, 68, 68, 0.2)"
          }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 p-4 rounded-xl text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-all duration-300 font-mono"
        >
          <LogOut className="w-5 h-5" />
          <span>DISCONNECT</span>
        </motion.button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden md:flex flex-col w-72 bg-gray-900/50 backdrop-blur-xl border-r border-emerald-500/20 neon-border-pulse h-screen sticky top-0"
      >
        {sidebarContent(false)}
      </motion.div>

      {/* Mobile Menu Button */}
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="md:hidden fixed top-5 left-4 z-50 p-3 bg-gray-900/80 backdrop-blur-sm border border-emerald-500/30 rounded-xl text-emerald-400 shadow-lg"
        >
          <Menu className="w-5 h-5" />
        </motion.button>
      )}

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-40 flex"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-72 bg-gray-900/95 backdrop-blur-xl border-r border-emerald-500/20 flex flex-col"
            >
              {sidebarContent(true)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
