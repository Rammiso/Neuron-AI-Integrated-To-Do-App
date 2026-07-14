import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Button } from "../components/Button";
import { HolographicCard } from "../components/HolographicCard";
import { useTaskStore } from "../context/taskStore";
import { 
  Send, 
  Brain, 
  Sparkles, 
  CheckCircle2, 
  Zap,
  Cpu,
  Activity,
  MessageSquare,
  Lightbulb
} from "lucide-react";
import { MiniSparkline } from "../components/NeuralActivityMonitor";

const aiSuggestions = [
  {
    id: 1,
    title: "Neural Network Study Session",
    description: "Deep dive into machine learning algorithms and neural architectures",
    priority: "high",
    dueDate: new Date(2024, 11, 25),
    estimatedTime: "3 hours"
  },
  {
    id: 2,
    title: "Quantum Computing Research",
    description: "Explore quantum algorithms and their practical applications",
    priority: "high",
    dueDate: new Date(2024, 11, 23),
    estimatedTime: "2 hours"
  },
  {
    id: 3,
    title: "Cybersecurity Protocol Review",
    description: "Analyze latest security frameworks and implementation strategies",
    priority: "medium",
    dueDate: new Date(2024, 11, 20),
    estimatedTime: "1.5 hours"
  },
];

const aiInsights = [
  "Your productivity peaks between 9-11 AM. Schedule complex tasks during this window.",
  "You complete 23% more tasks when you break them into 25-minute focused sessions.",
  "High-priority tasks are 40% more likely to be completed when scheduled for mornings.",
  "Your task completion rate increases by 15% when you set specific deadlines."
];

export const AIAssistantPage = () => {
  const { addTask } = useTaskStore();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Neural interface initialized. I'm NEURON, your AI productivity assistant. I can help you optimize workflows, create intelligent task schedules, and boost your cognitive performance.",
      timestamp: new Date()
    },
  ]);
  const [input, setInput] = useState("");
  const [acceptedSuggestions, setAcceptedSuggestions] = useState(new Set());
  const [isTyping, setIsTyping] = useState(false);
  const [currentInsight, setCurrentInsight] = useState(0);
  const messagesEndRef = useRef(null);

  const [cpuHistory, setCpuHistory] = useState(() => Array.from({ length: 12 }, () => Math.random() * 0.4 + 0.3));
  const [memHistory, setMemHistory] = useState(() => Array.from({ length: 12 }, () => Math.random() * 0.2 + 0.5));
  const [neuralHistory, setNeuralHistory] = useState(() => Array.from({ length: 12 }, () => Math.random() * 0.5 + 0.2));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % aiInsights.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const statInterval = setInterval(() => {
      setCpuHistory(prev => {
        const next = [...prev];
        next.shift();
        next.push(Math.max(0.1, Math.min(0.95, prev[prev.length - 1] + (Math.random() - 0.5) * 0.15)));
        return next;
      });
      setMemHistory(prev => {
        const next = [...prev];
        next.shift();
        next.push(Math.max(0.1, Math.min(0.95, prev[prev.length - 1] + (Math.random() - 0.5) * 0.08)));
        return next;
      });
      setNeuralHistory(prev => {
        const next = [...prev];
        next.shift();
        next.push(Math.max(0.1, Math.min(0.95, prev[prev.length - 1] + (Math.random() - 0.5) * 0.22)));
        return next;
      });
    }, 1500);
    return () => clearInterval(statInterval);
  }, []);

  const aiResponses = [
    "Analyzing your request through neural pathways... I've generated optimized task suggestions based on your productivity patterns.",
    "Processing cognitive load distribution... Here are intelligent recommendations tailored to your workflow.",
    "Neural network analysis complete. I've identified optimal task structures for maximum efficiency.",
    "Quantum processing your requirements... Generated smart suggestions with predictive scheduling."
  ];

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    setInput("");

    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        suggestions: aiSuggestions,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleAcceptSuggestion = (suggestion) => {
    addTask({
      title: suggestion.title,
      description: suggestion.description,
      dueDate: suggestion.dueDate,
      priority: suggestion.priority,
    });
    setAcceptedSuggestions((prev) => new Set([...prev, suggestion.id]));
  };

  const quickPrompts = [
    "Optimize my daily schedule for maximum productivity",
    "Create a study plan for machine learning concepts",
    "Generate tasks for a cybersecurity project",
    "Plan a research timeline for quantum computing"
  ];

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="h-full flex flex-col space-y-8"
      >
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-2">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Neural Core
              </span>
            </h1>
            <div className="flex items-center space-x-4 text-gray-400 font-mono text-sm">
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-emerald-400" />
                <span>AI PRODUCTIVITY ASSISTANT</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span>NEURAL NETWORK ACTIVE</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 lg:mt-0"
          >
            <div className="flex items-center space-x-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-mono text-emerald-400">COGNITIVE ENHANCEMENT MODE</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1">
          {/* Main Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 flex flex-col"
          >
            <HolographicCard className="flex-1 flex flex-col p-6">
              {/* Chat Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-emerald-500/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-mono">NEURON AI</h3>
                    <div className="flex items-center space-x-2">
                      <Cpu className="w-3 h-3 text-emerald-400" />
                      <span className="text-xs text-emerald-400 font-mono">PROCESSING UNIT ONLINE</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-xs font-mono text-emerald-400">REAL-TIME</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4 mb-6">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-2xl ${message.type === "user" ? "ml-12" : "mr-12"}`}>
                        {message.type === "ai" && (
                          <div className="flex items-center space-x-2 mb-2">
                            <Sparkles className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs font-mono text-emerald-400">NEURON</span>
                            <span className="text-xs text-gray-500">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        )}
                        
                        <div
                          className={`p-4 rounded-xl ${
                            message.type === "user"
                              ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-white"
                              : "bg-gray-800/50 border border-gray-700/50 text-gray-100"
                          }`}
                        >
                          <p className="text-sm leading-relaxed font-mono">{message.content}</p>

                          {message.suggestions && (
                            <div className="mt-6 space-y-3">
                              <div className="flex items-center space-x-2 mb-4">
                                <Lightbulb className="w-4 h-4 text-yellow-400" />
                                <span className="text-sm font-mono text-yellow-400">INTELLIGENT SUGGESTIONS</span>
                              </div>
                              {message.suggestions.map((suggestion) => (
                                <motion.div
                                  key={suggestion.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  whileHover={{ x: 4 }}
                                  className="bg-gray-900/50 border border-gray-600/50 rounded-lg p-4 hover:border-emerald-500/30 transition-all duration-300"
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h4 className="font-semibold text-white text-sm mb-2">
                                        {suggestion.title}
                                      </h4>
                                      <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                                        {suggestion.description}
                                      </p>
                                      <div className="flex items-center space-x-3">
                                        <span className={`text-xs px-2 py-1 rounded-full font-mono ${
                                          suggestion.priority === "high" 
                                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                            : suggestion.priority === "medium"
                                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                            : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                        }`}>
                                          {suggestion.priority.toUpperCase()}
                                        </span>
                                        <span className="text-xs text-gray-500 font-mono">
                                          {suggestion.dueDate.toLocaleDateString()}
                                        </span>
                                        <span className="text-xs text-cyan-400 font-mono">
                                          ~{suggestion.estimatedTime}
                                        </span>
                                      </div>
                                    </div>
                                    <Button
                                      size="sm"
                                      variant={acceptedSuggestions.has(suggestion.id) ? "secondary" : "primary"}
                                      onClick={() => handleAcceptSuggestion(suggestion)}
                                      disabled={acceptedSuggestions.has(suggestion.id)}
                                      className="ml-4 flex-shrink-0"
                                    >
                                      {acceptedSuggestions.has(suggestion.id) ? (
                                        <CheckCircle2 className="w-4 h-4" />
                                      ) : (
                                        "ACCEPT"
                                      )}
                                    </Button>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 mr-12">
                      <div className="flex items-center space-x-2 mb-2">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-mono text-emerald-400">NEURON</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-emerald-400 rounded-full"
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2
                              }}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400 font-mono">processing neural patterns...</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-emerald-500/20 pt-4">
                <div className="flex items-center space-x-3 mb-3">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-mono text-emerald-400">NEURAL INPUT INTERFACE</span>
                </div>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Describe your productivity goals..."
                    className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none font-mono"
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!input.trim() || isTyping}
                    className="flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>SEND</span>
                  </Button>
                </div>
              </div>
            </HolographicCard>
          </motion.div>

          {/* AI Insights Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* AI Insights */}
            <HolographicCard className="p-6">
              <h3 className="text-lg font-bold text-white font-mono mb-4 flex items-center">
                <Zap className="w-5 h-5 text-emerald-400 mr-2" />
                NEURAL INSIGHTS
              </h3>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentInsight}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg"
                >
                  <p className="text-sm text-emerald-100 font-mono leading-relaxed">
                    {aiInsights[currentInsight]}
                  </p>
                </motion.div>
              </AnimatePresence>
            </HolographicCard>

            {/* Quick Prompts */}
            <HolographicCard className="p-6">
              <h3 className="text-lg font-bold text-white font-mono mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 text-emerald-400 mr-2" />
                QUICK PROMPTS
              </h3>
              <div className="space-y-3">
                {quickPrompts.map((prompt, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setInput(prompt)}
                    className="w-full text-left p-3 bg-gray-800/30 border border-gray-700/50 rounded-lg hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300"
                  >
                    <p className="text-sm text-gray-300 font-mono leading-relaxed">
                      {prompt}
                    </p>
                  </motion.button>
                ))}
              </div>
            </HolographicCard>

            {/* System Status */}
            <HolographicCard className="p-6">
              <h3 className="text-lg font-bold text-white font-mono mb-4 flex items-center">
                <Activity className="w-5 h-5 text-emerald-400 mr-2" />
                SYSTEM STATUS
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Neural Processing", data: neuralHistory, color: "#10b981", val: `${Math.round(neuralHistory[neuralHistory.length - 1] * 100)}%` },
                  { label: "Core Processing", data: cpuHistory, color: "#06b6d4", val: `${Math.round(cpuHistory[cpuHistory.length - 1] * 100)}%` },
                  { label: "Cognitive Load", data: memHistory, color: "#eab308", val: `${Math.round(memHistory[memHistory.length - 1] * 100)}%` },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col p-3 bg-gray-850/40 border border-emerald-500/10 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-300 font-mono uppercase tracking-wider">{item.label}</span>
                      <span className="text-sm font-mono font-bold" style={{ color: item.color }}>
                        {item.val}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-500 font-mono">ACTIVITY FLOW</span>
                      <MiniSparkline data={item.data} color={item.color} height={20} />
                    </div>
                  </div>
                ))}
              </div>
            </HolographicCard>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};
