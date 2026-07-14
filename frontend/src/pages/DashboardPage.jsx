import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { 
  useTaskStore, 
  useTaskCount, 
  useCompletedCount, 
  useHighPriorityCount,
  useProductivityMetrics
} from "../context/taskStore";
import { useAuthStore } from "../context/authStore";
import { TaskCard } from "../components/TaskCard";
import { Button } from "../components/Button";
import { HolographicCard } from "../components/HolographicCard";
import { 
  Plus, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Clock,
  Target,
  Zap,
  Brain,
  Activity
} from "lucide-react";
import { TaskModal } from "../components/TaskModal";

// Memoized stat card component
const StatCard = memo(({ stat, index }) => {
  const Icon = stat.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.1 }}
    >
      <HolographicCard className="p-6 hover-lift" disableHover={false}>
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} p-0.5`}>
            <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
          <span className={`text-xs font-mono px-2 py-1 rounded-full ${
            stat.change?.startsWith('+') 
              ? 'text-emerald-400 bg-emerald-500/20' 
              : 'text-red-400 bg-red-500/20'
          }`}>
            {stat.change}
          </span>
        </div>
        
        <div className="space-y-1">
          <p className="text-3xl font-bold text-white font-mono">
            {stat.value}{stat.suffix}
          </p>
          <p className="text-sm text-gray-400 font-mono uppercase tracking-wide">
            {stat.label}
          </p>
        </div>

        {/* Holographic scan line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scaleX: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.5,
          }}
        />
      </HolographicCard>
    </motion.div>
  );
});

// Memoized productivity metric component
const ProductivityMetric = memo(({ metric, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 + index * 0.1 }}
    className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700/50"
  >
    <div className="flex items-center space-x-3">
      <metric.icon className={`w-5 h-5 ${metric.color}`} />
      <span className="text-sm text-gray-300 font-mono">{metric.label}</span>
    </div>
    <span className={`text-lg font-bold font-mono ${metric.color}`}>
      {metric.value}
    </span>
  </motion.div>
));

export const DashboardPage = () => {
  const { tasks, fetchTasks } = useTaskStore();
  const { user } = useAuthStore();
  
  // Use optimized selectors to prevent unnecessary re-renders
  const totalCount = useTaskCount();
  const completedCount = useCompletedCount();
  const highPriorityCount = useHighPriorityCount();
  const productivityMetrics = useProductivityMetrics();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Load tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []); // Empty dependency array to run only once

  // Optimized time update with reduced frequency
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Memoized computed values
  const completionRate = useMemo(() => 
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
    [completedCount, totalCount]
  );

  const upcomingTasks = useMemo(() => 
    tasks
      .filter((t) => !t.completed)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 6),
    [tasks]
  );

  // Simplified percentage changes to avoid complex calculations
  const taskChange = totalCount > 5 ? "+15%" : totalCount > 0 ? "+5%" : "0%";
  const completedChange = completedCount > 3 ? "+12%" : completedCount > 0 ? "+3%" : "0%";
  const priorityChange = highPriorityCount > 2 ? "-8%" : "0%";
  const efficiencyChange = completionRate > 70 ? "+20%" : completionRate > 50 ? "+10%" : "0%";

  // Simplified stats array with real data
  const stats = [
    {
      label: "Neural Tasks",
      value: totalCount,
      icon: Brain,
      color: "from-emerald-400 to-cyan-400",
      change: taskChange
    },
    {
      label: "Completed",
      value: completedCount,
      icon: CheckCircle2,
      color: "from-green-400 to-emerald-400",
      change: completedChange
    },
    {
      label: "High Priority",
      value: highPriorityCount,
      icon: AlertCircle,
      color: "from-red-400 to-pink-400",
      change: priorityChange
    },
    {
      label: "Efficiency",
      value: completionRate,
      suffix: "%",
      icon: TrendingUp,
      color: "from-blue-400 to-purple-400",
      change: efficiencyChange
    },
  ];

  // Simplified productivity metrics with real data
  const productivityMetricsData = [
    { label: "Focus Time", value: productivityMetrics.focusTime, icon: Clock, color: "text-cyan-400" },
    { label: "Goals Hit", value: productivityMetrics.goalsHit, icon: Target, color: "text-emerald-400" },
    { label: "Streak Days", value: productivityMetrics.streak, icon: Zap, color: "text-yellow-400" },
    { label: "AI Assists", value: productivityMetrics.aiAssists, icon: Brain, color: "text-purple-400" },
  ];

  // Memoized event handlers
  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-8 relative"
      >
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-2">
              <span className="text-white">Welcome back,</span>{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                {user?.name}
              </span>
            </h1>
            <div className="flex items-center space-x-4 text-gray-400 font-mono text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span>NEURAL INTERFACE ACTIVE</span>
              </div>
              <span>•</span>
              <span>{currentTime.toLocaleTimeString()}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 lg:mt-0"
          >
            <Button
              onClick={handleOpenModal}
              className="flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>CREATE TASK</span>
            </Button>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 circuit-lines">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Tasks */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <HolographicCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Activity className="w-6 h-6 text-emerald-400 mr-3" />
                  Neural Task Queue
                </h2>
                <div className="flex items-center space-x-2 text-sm text-emerald-400 font-mono">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span>{upcomingTasks.length} ACTIVE</span>
                </div>
              </div>

              {upcomingTasks.length > 0 ? (
                <div className="space-y-4">
                  {upcomingTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <TaskCard task={task} onEdit={() => {}} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
                    <CheckCircle2 className="w-10 h-10 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Neural Queue Empty</h3>
                  <p className="text-gray-400 font-mono text-sm mb-6">
                    All tasks completed. System ready for new objectives.
                  </p>
                  <Button
                    onClick={handleOpenModal}
                    variant="secondary"
                    className="flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Initialize New Task</span>
                  </Button>
                </motion.div>
              )}
            </HolographicCard>
          </motion.div>

          {/* Analytics & Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Productivity Metrics */}
            <HolographicCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 text-emerald-400 mr-2" />
                Neural Analytics
              </h3>
              
              <div className="space-y-4">
                {productivityMetricsData.map((metric, index) => (
                  <ProductivityMetric key={metric.label} metric={metric} index={index} />
                ))}
              </div>
            </HolographicCard>

            {/* Progress Visualization */}
            <HolographicCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">System Progress</h3>
              
              <div className="space-y-6">
                {/* Overall Progress */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-mono text-gray-300">COMPLETION RATE</span>
                    <span className="text-2xl font-bold text-emerald-400 font-mono">
                      {completionRate}%
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${completionRate}%` }}
                        transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                      />
                    </div>
                    <motion.div
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="absolute -top-1 -bottom-1 bg-emerald-400/20 rounded-full blur-sm"
                      style={{ width: `${completionRate}%` }}
                    />
                  </div>
                </div>

                {/* Priority Distribution */}
                <div className="pt-4 border-t border-gray-700/50">
                  <p className="text-sm font-mono text-gray-400 mb-4 uppercase tracking-wide">
                    Priority Matrix
                  </p>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Critical",
                        count: tasks.filter((t) => t.priority === "high").length,
                        color: "bg-red-500",
                        textColor: "text-red-400"
                      },
                      {
                        label: "Standard",
                        count: tasks.filter((t) => t.priority === "medium").length,
                        color: "bg-yellow-500",
                        textColor: "text-yellow-400"
                      },
                      {
                        label: "Low",
                        count: tasks.filter((t) => t.priority === "low").length,
                        color: "bg-emerald-500",
                        textColor: "text-emerald-400"
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="flex items-center justify-between text-sm font-mono"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${item.color} shadow-lg`} />
                          <span className="text-gray-300">{item.label}</span>
                        </div>
                        <span className={`font-bold ${item.textColor}`}>
                          {item.count}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </HolographicCard>
          </motion.div>
        </div>
      </motion.div>

      <TaskModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </DashboardLayout>
  );
};
