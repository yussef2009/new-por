import { motion } from 'framer-motion';
import { BadgeCheck, DollarSign, Users, Bookmark, Share2, ExternalLink, Clock } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

interface Competition {
  id: number | string;
  school: {
    name: string;
    shortName: string;
    verified: boolean;
    logo: string;
    followers: string;
  };
  title: string;
  description: string;
  category: string;
  prize: string;
  deadline: string;
  participants: number;
  image: string;
  tags: string[];
  postedTime: string;
}

interface CompetitionPostProps {
  competition: Competition;
}

export function CompetitionPost({ competition }: CompetitionPostProps) {
  return (
    <motion.article
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300"
      whileHover={{ y: -4 }}
    >
      {/* School Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <ImageWithFallback
              src={competition.school.logo}
              alt={competition.school.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">{competition.school.shortName}</h3>
                {competition.school.verified && (
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative"
                  >
                    <BadgeCheck className="w-5 h-5 text-cyan-400 fill-cyan-400" />
                  </motion.div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{competition.school.followers} followers • {competition.postedTime}</p>
            </div>
          </div>

          <motion.button
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Follow
          </motion.button>
        </div>
      </div>

      {/* Competition Content */}
      <div className="px-6 pb-4">
        <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {competition.title}
        </h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {competition.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {competition.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-medium text-cyan-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Competition Image */}
      <div className="relative overflow-hidden group">
        <ImageWithFallback
          src={competition.image}
          alt={competition.title}
          className="w-full h-64 object-cover"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 text-foreground">
              <ExternalLink className="w-5 h-5" />
              <span className="text-sm font-medium">View Competition Details</span>
            </div>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg text-sm font-medium">
            {competition.category}
          </span>
        </div>
      </div>

      {/* Competition Stats */}
      <div className="p-6 pt-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="flex items-center gap-2 text-yellow-400 mb-1">
              <DollarSign className="w-4 h-4" />
              <span className="text-xs font-medium">Prize</span>
            </div>
            <div className="font-bold text-lg">{competition.prize}</div>
          </div>

          <div className="bg-card/5 rounded-lg p-3 border border-border/10">
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-xs font-medium">Participants</span>
            </div>
            <div className="font-bold text-lg">{competition.participants}</div>
          </div>

          <div className="bg-card/5 rounded-lg p-3 border border-border/10">
            <div className="flex items-center gap-2 text-pink-400 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-medium">Deadline</span>
            </div>
            <div className="font-bold text-sm">{competition.deadline.split(',')[0]}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex gap-2">
            <motion.button
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register Now
            </motion.button>
            <motion.button
              className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg font-medium hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </div>

          <div className="flex gap-2">
            <motion.button
              className="w-10 h-10 bg-card/5 border border-border/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bookmark className="w-5 h-5 text-muted-foreground" />
            </motion.button>
            <motion.button
              className="w-10 h-10 bg-card/5 border border-border/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="w-5 h-5 text-muted-foreground" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
