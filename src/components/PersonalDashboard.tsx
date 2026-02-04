import { motion } from 'framer-motion';
import {
  Trophy,
  Target,
  Zap,
  Calendar,
  ArrowRight,
  ChevronRight,
  Star,
  Activity,
  TrendingUp,
  Clock
} from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';

// Counter component for animated numbers
const Counter = ({ value, duration = 2 }: { value: string, duration?: number }) => {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '');
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = numericValue;
    if (start === end) return;

    if (isNaN(end)) {
      setCount(0);
      return;
    }

    const incrementTime = (duration * 1000) / end;
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [numericValue, duration]);

  return <span>{count}{suffix}</span>;
};

export function PersonalDashboard() {
  const { user } = useAuth();
  const { competitions } = useApp(); // simplified for now, ideally derived from student data

  // Mock derived data for now, since AuthContext user is simple
  const dashboardUser = {
    name: user?.name || "Guest User",
    rank: "Code Wizard",
    level: 42,
    xp: 8500,
    nextLevel: 10000,
    avatar: "https://images.unsplash.com/photo-1614492898637-435e0f87cef8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBzdHVkZW50JTIwcG9ydHJhaXQlMjBjb25jZW50cmF0aW9ufGVufDF8fHx8MTc2OTI2NDYzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  };

  const stats = [
    { label: "Competitions", value: "12", icon: Trophy, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/20" },
    { label: "Win Rate", value: "68%", icon: Target, color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20" },
    { label: "Streak", value: "5 Days", icon: Zap, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
    { label: "Global Rank", value: "#142", icon: Star, color: "text-pink-400", bg: "bg-pink-400/10", border: "border-pink-400/20" },
  ];

  const activeCompetitions = competitions.slice(0, 2).map((comp, idx) => ({
    id: comp.id,
    title: comp.name,
    deadline: comp.endDate,
    progress: Math.floor(Math.random() * 100), // mocked progress
    status: "In Progress",
    color: idx === 0 ? "bg-cyan-500" : "bg-green-500",
    icon: idx === 0 ? Zap : Clock
  }));

  return (
    <section className="relative py-10 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Left Column: User Profile - Now with animated background and pulse */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              className="bg-card/40 backdrop-blur-md border border-border rounded-2xl p-6 relative overflow-hidden group"
              whileHover={{ borderColor: "hsl(var(--primary))" }}
            >
              {/* Animated scanline effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-[200%] w-full animate-scanline opacity-0 group-hover:opacity-100 pointer-events-none" />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.1),transparent_70%)]" />

              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="relative">
                  <motion.div
                    className="w-20 h-20 rounded-full p-1 bg-gradient-to-r from-cyan-500 to-purple-500"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    {/* Spinning border container */}
                  </motion.div>
                  {/* Static image on top */}
                  <div className="absolute inset-0 p-1">
                    <ImageWithFallback
                      src={dashboardUser.avatar}
                      alt={dashboardUser.name}
                      className="w-full h-full rounded-full object-cover border-4 border-black"
                    />
                  </div>

                  <motion.div
                    className="absolute -bottom-2 -right-2 bg-black border border-white/10 p-1.5 rounded-full text-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{dashboardUser.name}</h3>
                  <p className="text-cyan-400 text-sm font-medium flex items-center gap-2">
                    {dashboardUser.rank}
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-100 border border-cyan-500/30">
                      Level {dashboardUser.level}
                    </span>
                  </div>
                </div>
              </div>

              {/* XP Progress with shimmer */}
              <div className="relative z-10">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> XP Progress</span>
                  <span className="font-mono text-cyan-300">{dashboardUser.xp.toLocaleString()} <span className="text-muted-foreground">/</span> {dashboardUser.nextLevel.toLocaleString()}</span>
                </div>
                <div className="h-3 w-full bg-muted rounded-full overflow-hidden border border-border/50 relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 relative overflow-hidden"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(dashboardUser.xp / dashboardUser.nextLevel) * 100}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                </div>
                <p className="text-[10px] text-right text-muted-foreground mt-1">1,500 XP to next level</p>
              </div>
            </motion.div>

            {/* Quick Actions - Bouncier and more interactive */}
            <div className="bg-card/40 backdrop-blur-md border border-border rounded-2xl p-6">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-500" /> Actions
              </h4>
              <div className="space-y-3">
                {[
                  { label: "Join Hackathon", icon: Zap, color: "text-cyan-400", bg: "bg-cyan-500/20", border: "hover:border-cyan-500/50" },
                  { label: "View Analytics", icon: Activity, color: "text-purple-400", bg: "bg-purple-500/20", border: "hover:border-purple-500/50" }
                ].map((action, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl bg-background/5 hover:bg-accent border border-border/50 ${action.border} transition-all group`}
                  >
                    <span className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${action.bg} ${action.color} group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-sm text-muted-foreground group-hover:text-foreground transition-colors">{action.label}</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Stats & Active Competitions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid - With count up and hover lift */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.08)" }}
                  className={`bg-card/40 backdrop-blur-md border border-border ${stat.border} rounded-2xl p-4 relative overflow-hidden group`}
                >
                  <div className={`absolute -right-4 -top-4 w-20 h-20 ${stat.bg} rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity`} />

                  <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-3 relative z-10`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1 relative z-10">
                    <Counter value={stat.value} />
                  </div>
                  <div className="text-xs text-muted-foreground relative z-10">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Active Competitions - More dynamic */}
            <div className="bg-card/40 backdrop-blur-md border border-border rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Trophy className="w-32 h-32 rotate-12" />
              </div>

              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold">Active Competitions</h3>
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/20"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="space-y-4 relative z-10">
                {activeCompetitions.map((comp, idx) => (
                  <motion.div
                    key={comp.id}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.2 }}
                    whileHover={{ scale: 1.01 }}
                    className="group relative bg-card/5 rounded-xl p-4 border border-border/5 hover:border-cyan-500/30 transition-all cursor-pointer overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${comp.color === 'bg-cyan-500' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-green-500/20 text-green-400'}`}>
                          <comp.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground group-hover:text-cyan-400 transition-colors text-lg">{comp.title}</h4>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1 bg-muted/30 px-2 py-0.5 rounded">
                              <Calendar className="w-3 h-3" /> {comp.deadline}
                            </span>
                            <span className={`px-2 py-0.5 rounded ${idx === 0 ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
                              {comp.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right min-w-[60px]">
                        <span className="text-2xl font-bold text-foreground group-hover:text-cyan-400 transition-colors">{comp.progress}%</span>
                      </div>
                    </div>

                    {/* Progress Bar with Pulse */}
                    <div className="h-2 w-full bg-muted/40 rounded-full overflow-hidden relative">
                      <motion.div
                        className={`h-full ${comp.color} relative`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${comp.progress}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      >
                        <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/50 blur-[2px]" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
