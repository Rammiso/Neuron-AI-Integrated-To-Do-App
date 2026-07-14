import { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Calendar, 
  CheckSquare, 
  Zap, 
  Shield, 
  Sparkles,
  ArrowRight,
  Play,
  Users,
  Target,
  Clock,
  Mail,
  Github,
  Linkedin,
  MessageCircle,
  ExternalLink,
  Globe,
  Cpu,
  TrendingUp,
  Award
} from 'lucide-react';
import { ProgressiveMotion, ProgressiveFadeIn, ProgressiveSlideUp } from '../components/ProgressiveMotion';
import { ProgressiveParticleBackground } from '../components/ProgressiveParticleBackground';
import { useTwoPhaseInit, useProgressiveFeature } from '../hooks/useTwoPhaseInit';
import { GlitchText, TerminalText } from '../components/GlitchText';
import { MatrixRain } from '../components/MatrixRain';
import { NeuralOrb } from '../components/NeuralOrb';
import { AnimatedCounter, LiveTicker, FloatingDataNode } from '../components/AnimatedCounter';

// Lazy load heavy components
const HolographicCard = lazy(() => import('../components/HolographicCard').then(m => ({ default: m.HolographicCard })));
const DemoPreview = lazy(() => import('../components/DemoPreview').then(m => ({ default: m.DemoPreview })));
const FeatureShowcase = lazy(() => import('../components/FeatureShowcase').then(m => ({ default: m.FeatureShowcase })));

// Lightweight fallback components
const CardSkeleton = () => (
  <div className="glass rounded-xl p-6 animate-pulse">
    <div className="h-6 bg-gray-700/30 rounded mb-4"></div>
    <div className="h-4 bg-gray-700/20 rounded mb-2"></div>
    <div className="h-4 bg-gray-700/20 rounded w-3/4"></div>
  </div>
);

const DemoSkeleton = () => (
  <div className="glass rounded-xl p-8 animate-pulse">
    <div className="h-8 bg-gray-700/30 rounded mb-6"></div>
    <div className="grid grid-cols-3 gap-4 mb-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-20 bg-gray-700/20 rounded"></div>
      ))}
    </div>
    <div className="space-y-3">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-12 bg-gray-700/20 rounded"></div>
      ))}
    </div>
  </div>
);

export const LandingPage = () => {
  const navigate = useNavigate();
  const [isEnhanced, setIsEnhanced] = useState(false);
  // Progressive enhancement after first paint
  useEffect(() => {
    // Enable enhancements after first interaction or timeout
    const enableEnhancements = () => setIsEnhanced(true);

    const handleFirstInteraction = () => {
      enableEnhancements();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction, { passive: true });
    document.addEventListener('scroll', handleFirstInteraction, { passive: true });

    // Fallback timeout for enhancements
    const fallbackTimer = setTimeout(enableEnhancements, 1500);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Assistant',
      description: 'Smart task prioritization and intelligent scheduling with neural network optimization',
      color: 'from-emerald-400 to-cyan-400'
    },
    {
      icon: CheckSquare,
      title: 'Advanced Task Management',
      description: 'Cyberpunk-inspired interface with real-time collaboration and progress tracking',
      color: 'from-green-400 to-emerald-400'
    },
    {
      icon: Calendar,
      title: 'Quantum Calendar',
      description: 'Time-bending calendar views with predictive scheduling and deadline optimization',
      color: 'from-cyan-400 to-blue-400'
    },
    {
      icon: Zap,
      title: 'Lightning Performance',
      description: 'Blazing fast interface with real-time updates and seamless synchronization',
      color: 'from-yellow-400 to-orange-400'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Military-grade encryption with zero-knowledge architecture for maximum privacy',
      color: 'from-purple-400 to-pink-400'
    },
    {
      icon: Sparkles,
      title: 'Futuristic UI',
      description: 'Immersive cyberpunk design with holographic elements and smooth animations',
      color: 'from-indigo-400 to-purple-400'
    }
  ];

  const stats = [
    { icon: Users, value: '10K+', label: 'Active Users' },
    { icon: Target, value: '99.9%', label: 'Uptime' },
    { icon: Clock, value: '2.3s', label: 'Avg Load Time' },
    { icon: Zap, value: '50%', label: 'Productivity Boost' }
  ];

  const liveStats = [
    { label: 'NEURAL FREQUENCY', value: '4.8 GHz' },
    { label: 'COGNITIVE ACCURACY', value: '99.87%' },
    { label: 'ACTIVE THREADS', value: '2,048' },
    { label: 'AI MODEL', value: 'NEURON-v2.1' },
    { label: 'LATENCY', value: '1.2ms' },
    { label: 'DB SHARDS', value: '16 Active' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-emerald-950 text-white overflow-hidden aurora-bg scanlines noise-overlay">
      {/* Matrix rain background */}
      {isEnhanced && <MatrixRain opacity={0.08} speed={1.2} />}

      {/* Progressive particle background */}
      <ProgressiveParticleBackground 
        enabled={isEnhanced} 
        priority="interaction" 
      />
      
      {/* Navigation */}
      <ProgressiveMotion
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        enabled={isEnhanced}
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-emerald-500/20"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,255,136,0.4)]">
              <Brain className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent font-mono tracking-wider">
              NEURON
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-emerald-400 hover:text-emerald-300 font-mono text-sm transition-colors"
            >
              [ Sign In ]
            </button>
            <button
              onClick={() => navigate('/demo')}
              className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg font-mono text-sm font-medium hover:from-emerald-400 hover:to-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(0,255,136,0.3)] hover:shadow-[0_0_25px_rgba(0,255,136,0.5)]"
            >
              Try Demo
            </button>
          </div>
        </div>
      </ProgressiveMotion>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-28 pb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Left Hero Details */}
          <div className="lg:col-span-7 text-left space-y-8 z-10">
            <ProgressiveSlideUp
              delay={0.2}
              enabled={isEnhanced}
            >
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight font-mono">
                  <GlitchText
                    text="NEURON"
                    className="rgb-shimmer text-glow-emerald"
                    typingSpeed={80}
                    enableGlitch={true}
                  />
                  <br />
                  <span className="text-white">Tasks</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed">
                  The future of productivity is here. Experience AI-powered task management 
                  with a cyberpunk twist that adapts to your neural patterns.
                </p>

                {/* Terminal boot sequence */}
                {isEnhanced && (
                  <div className="max-w-md text-left bg-black/40 border border-emerald-500/10 rounded-lg p-3 font-mono">
                    <TerminalText
                      lines={[
                        { text: 'Neural interface initializing...', color: '#10b981' },
                        { text: 'AI core online — ready', color: '#06b6d4' },
                        { text: 'Welcome to the future', color: '#818cf8' },
                      ]}
                      lineDelay={500}
                    />
                  </div>
                )}
              </div>

              <ProgressiveFadeIn
                delay={0.6}
                enabled={isEnhanced}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8"
              >
                <button
                  onClick={() => navigate('/demo')}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:from-emerald-400 hover:to-cyan-400 transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]"
                >
                  <Play className="w-5 h-5" />
                  <span>Experience Demo</span>
                </button>
                
                <button
                  onClick={() => navigate('/register')}
                  className="px-8 py-4 glass border border-emerald-500/30 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-emerald-500/10 transition-all duration-300 hover:scale-105 hover:border-emerald-400/50"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </ProgressiveFadeIn>
            </ProgressiveSlideUp>
          </div>

          {/* Right Hero Interactive Orb & Data Nodes */}
          <div className="lg:col-span-5 flex justify-center items-center relative h-[450px] lg:h-[550px] z-10">
            {isEnhanced && (
              <>
                <div className="relative">
                  {/* Glowing core orb */}
                  <NeuralOrb size={420} className="relative z-10" />

                  {/* Floating Process Nodes */}
                  <FloatingDataNode
                    icon={Brain}
                    label="Neural Load"
                    value="14.2%"
                    color="emerald"
                    style={{ top: '15%', left: '-10%' }}
                    delay={0.2}
                  />

                  <FloatingDataNode
                    icon={Cpu}
                    label="AI Accuracy"
                    value="99.87%"
                    color="cyan"
                    style={{ bottom: '20%', left: '-15%' }}
                    delay={0.5}
                  />

                  <FloatingDataNode
                    icon={TrendingUp}
                    label="Prod Boost"
                    value="+50%"
                    color="yellow"
                    style={{ top: '25%', right: '-10%' }}
                    delay={0.8}
                  />

                  <FloatingDataNode
                    icon={Award}
                    label="Uptime"
                    value="99.9%"
                    color="purple"
                    style={{ bottom: '15%', right: '-5%' }}
                    delay={1.1}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto w-full mt-16 z-10">
          <ProgressiveFadeIn
            delay={0.8}
            enabled={isEnhanced}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <Suspense key={index} fallback={<CardSkeleton />}>
                <HolographicCard className="p-6 text-center hover:scale-105 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white mb-1 font-mono">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-sm text-gray-400 font-mono uppercase tracking-wider">{stat.label}</div>
                </HolographicCard>
              </Suspense>
            ))}
          </ProgressiveFadeIn>
        </div>
      </section>

      {/* Live System Stats scrolling ticker */}
      {isEnhanced && <LiveTicker items={liveStats} />}

      {/* Demo Preview Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Live Dashboard
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See NEURON Tasks in action with our interactive demo dashboard
            </p>
          </motion.div>
          
          <DemoPreview />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Neural Features
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Cutting-edge technology meets intuitive design
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <HolographicCard className="p-8 h-full hover-lift">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} p-0.5 mb-6`}>
                    <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </HolographicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <FeatureShowcase />

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Upgrade
              </span> Your Mind?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands of users who have already enhanced their productivity with NEURON Tasks
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 0 30px rgba(16, 185, 129, 0.4)" 
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/register')}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-semibold text-lg flex items-center space-x-2 hover:from-emerald-400 hover:to-cyan-400 transition-all duration-300"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/demo')}
                className="px-8 py-4 glass-neon rounded-xl font-semibold text-lg flex items-center space-x-2 hover:bg-emerald-500/10 transition-all duration-300"
              >
                <Play className="w-5 h-5" />
                <span>Try Demo First</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-emerald-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                NEURON Tasks
              </span>
            </div>
            <p className="text-gray-400">
              © 2026 NEURON Tasks. Built by{' '}
              <a href="https://themusab.tech" target="_blank" rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold hover:underline">
                Musab Hassen
              </a>
              {' '}· Enhancing human productivity through AI.
            </p>
          </div>
          
          {/* Developer Info */}
          <div className="border-t border-emerald-500/10 pt-8">
            <div className="text-center">
              <p className="text-gray-400 mb-4">
                Developed with ❤️ and a lot of ☕ by{' '}
                <span className="text-emerald-400 font-semibold">Musab Hassen</span>
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <a
                  href="mailto:mushas1248@gmail.com"
                  className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 flex items-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>mushas1248@gmail.com</span>
                </a>
                <a
                  href="https://github.com/Rammiso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 flex items-center space-x-2"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/musab-hassen-b86247316/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 flex items-center space-x-2"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://t.me/ramiso0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 flex items-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Telegram</span>
                </a>
                <a
                  href="https://themusab.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <Globe className="w-4 h-4 group-hover:text-emerald-400" />
                  <span className="group-hover:text-glow-emerald">themusab.tech</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};