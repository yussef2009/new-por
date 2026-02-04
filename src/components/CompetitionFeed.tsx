import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { CompetitionPost } from '@/components/CompetitionPost';

import { useApp } from '@/context/AppContext';

export function CompetitionFeed() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { competitions } = useApp();

  // Map context competitions to feed format (mocking missing fields for now as context data is simple)
  const feedCompetitions = competitions.map(comp => ({
    id: comp.id,
    school: {
      name: "Tech Academy", // Placeholder
      shortName: "TA",
      verified: true,
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop",
      followers: "12K",
    },
    title: comp.name,
    description: comp.description,
    category: comp.type,
    prize: "$10,000", // Placeholder
    deadline: comp.endDate,
    participants: comp.maxParticipants,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    tags: ["Tech", "Competition"],
    postedTime: "Recently",
  }));

  return (
    <section ref={ref} className="relative py-12 px-6 pb-20">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Latest Competitions</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg text-sm font-medium hover:bg-cyan-500/30 transition-colors">
              All
            </button>
            <button className="px-4 py-2 bg-card/5 text-muted-foreground border border-border/10 rounded-lg text-sm font-medium hover:bg-accent transition-colors">
              Trending
            </button>
            <button className="px-4 py-2 bg-card/5 text-muted-foreground border border-border/10 rounded-lg text-sm font-medium hover:bg-accent transition-colors">
              Ending Soon
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {feedCompetitions.map((competition, index) => (
            <motion.div
              key={competition.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CompetitionPost competition={competition} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
