import { PersonalDashboard } from '@/components/PersonalDashboard';
import { CompetitionFeed } from '@/components/CompetitionFeed';
import { Header } from '@/components/Header';
import { FloatingParticles } from '@/components/FloatingParticles';

export default function StudentDashboard() {
    return (
        <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
            <FloatingParticles />
            <Header />

            <div className="pt-24 space-y-12 pb-20">
                <PersonalDashboard />
                <CompetitionFeed />
            </div>
        </div>
    );
}
