import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, Sparkles } from 'lucide-react';

export function AchievementDashboard() {
  const winners = [
    {
      id: 2,
      rank: 2,
      name: "Alex Chen",
      school: "Stanford University",
      points: "2,450",
      image: "https://images.unsplash.com/photo-1759831403998-59e0ecd64552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXQlMjBmdXR1cmlzdGljJTIwY29sb3JmdWx8ZW58MXx8fHwxNzY5MjY0MDAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "cyan",
      gradient: "from-cyan-400 to-blue-500",
      height: 250,
      icon: Medal,
    },
    {
      id: 1,
      rank: 1,
      name: "Sarah Miller",
      school: "MIT",
      points: "3,100",
      image: "https://images.unsplash.com/photo-1618698937393-8d7bb5f2d341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXQlMjBjeWJlcnB1bmslMjBuZW9ufGVufDF8fHx8MTc2OTI2Mzk5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "yellow",
      gradient: "from-yellow-400 via-orange-400 to-red-500",
      height: 320,
      icon: Trophy,
    },
    {
      id: 3,
      rank: 3,
      name: "Mike Ross",
      school: "ETH Zurich",
      points: "1,800",
      image: "https://images.unsplash.com/photo-1707557741650-7c469bb2006d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZ2VlayUyMGNvb2wlMjBwb3J0cmFpdCUyMG5lb258ZW58MXx8fHwxNzY5MjY0MDA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "purple",
      gradient: "from-purple-400 to-pink-500",
      height: 200,
      icon: Medal,
    },
  ];

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Animated gradient background from Hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Background glow effects specific to Dashboard */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-purple-900/20 blur-[100px] rounded-full -z-10" />

      <div className="relative z-10 container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/5 border border-border/10 mb-4">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-muted-foreground">Global Leaderboard</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Top Achievers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Celebrating the most innovative minds and top-performing students in the global competition arena.
          </p>
        </motion.div>

        {/* Podium */}
        <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-8 h-[500px] px-4">
          {winners.map((winner) => {
            const isFirst = winner.rank === 1;
            const Icon = winner.icon;
            
            return (
              <motion.div
                key={winner.id}
                className={`relative flex flex-col items-center ${isFirst ? 'order-1 md:order-2 z-10' : winner.rank === 2 ? 'order-2 md:order-1' : 'order-3 md:order-3'}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: isFirst ? 0.2 : 0 }}
              >
                {/* Avatar & Info floating above */}
                <motion.div 
                  className="mb-4 text-center relative"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: winner.id }}
                >
                  {isFirst && (
                    <Crown className="w-12 h-12 text-yellow-400 absolute -top-14 left-1/2 -translate-x-1/2 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                  )}
                  
                  <div className={`relative p-1 rounded-full bg-gradient-to-br ${winner.gradient} mb-3`}>
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-black bg-black">
                      <img 
                        src={winner.image} 
                        alt={winner.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-0.5 rounded-full text-xs font-bold whitespace-nowrap">
                      Rank #{winner.rank}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-0.5">{winner.name}</h3>
                  <p className="text-xs text-cyan-400 mb-1">{winner.school}</p>
                  <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-gray-300">
                    {winner.points} PTS
                  </div>
                </motion.div>

                {/* Pillar */}
                <motion.div 
                  className={`w-full md:w-48 rounded-t-2xl relative overflow-hidden backdrop-blur-sm border-x border-t border-white/10 bg-gradient-to-b from-white/5 to-transparent flex flex-col items-center justify-start pt-6`}
                  style={{ height: winner.height }}
                  initial={{ height: 0 }}
                  whileInView={{ height: winner.height }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                >
                  {/* Glass reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 opacity-50" />
                  
                  {/* Cup/Icon */}
                  <div className={`p-4 rounded-full bg-gradient-to-br ${winner.gradient} bg-opacity-20 mb-4 shadow-[0_0_30px_rgba(0,0,0,0.3)]`}>
                    <Icon className={`w-8 h-8 md:w-12 md:h-12 text-white drop-shadow-lg`} />
                  </div>
                  
                  {/* Rank Number Large */}
                  <div className={`text-6xl md:text-8xl font-black text-white/5 select-none absolute bottom-0`}>
                    {winner.rank}
                  </div>
                </motion.div>
                
                {/* Glow under pillar */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-20 bg-gradient-to-t ${winner.gradient} opacity-20 blur-xl -z-10`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
