import { createContext, useContext, useState, type ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface TeamMember {
    id: string;
    name: string;
    role: string;
    avatar: string;
}

interface Team {
    id: string;
    name: string;
    projectTitle: string;
    members: TeamMember[];
    score: number;
    rank: number;
}

interface Message {
    id: number;
    sender: string;
    text: string;
    timestamp: string;
}

interface Resource {
    id: number;
    name: string;
    type: string;
    url: string;
    uploadedBy: string;
    date: string;
}

interface TeamContextType {
    team: Team;
    messages: Message[];
    resources: Resource[];
    sendMessage: (text: string) => void;
    addResource: (resource: Partial<Resource>) => void;
}

const TeamContext = createContext<TeamContextType | null>(null);

export const useTeam = () => {
    const context = useContext(TeamContext);
    if (!context) {
        throw new Error('useTeam must be used within a TeamProvider');
    }
    return context;
};

interface TeamProviderProps {
    children: ReactNode;
}

export const TeamProvider = ({ children }: TeamProviderProps) => {
    const { user } = useAuth();

    // Mock Team Data
    const [team] = useState<Team>({
        id: 'team-001',
        name: 'The Innovators',
        projectTitle: 'Eco-Friendly Water Purification',
        members: [
            { id: 'u1', name: 'Alice Johnson', role: 'Leader', avatar: 'AJ' },
            { id: 'u2', name: 'Bob Smith', role: 'Member', avatar: 'BS' },
            { id: 'u3', name: 'Charlie Brown', role: 'Member', avatar: 'CB' },
        ],
        score: 1250,
        rank: 3
    });

    // Mock Chat Messages
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, sender: 'Alice Johnson', text: 'Hey team, did we finalize the slide deck?', timestamp: '10:30 AM' },
        { id: 2, sender: 'Bob Smith', text: 'Almost, just need to add the financial projections.', timestamp: '10:32 AM' },
    ]);

    // Mock Resources
    const [resources, setResources] = useState<Resource[]>([
        { id: 1, name: 'Project Proposal.pdf', type: 'document', url: '#', uploadedBy: 'Alice Johnson', date: '2023-10-05' },
        { id: 2, name: 'Market Research Links', type: 'link', url: '#', uploadedBy: 'Charlie Brown', date: '2023-10-06' },
    ]);

    const sendMessage = (text: string) => {
        const newMessage: Message = {
            id: Date.now(),
            sender: user ? user.name : 'Me', // Fallback if user context is delayed
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newMessage]);
    };

    const addResource = (resource: Partial<Resource>) => {
        const newResource: Resource = {
            id: Date.now(),
            uploadedBy: user ? user.name : 'Me',
            date: new Date().toISOString().split('T')[0],
            name: resource.name || 'Untitled',
            type: resource.type || 'unknown',
            url: resource.url || '#'
        };
        setResources(prev => [...prev, newResource]);
    };

    return (
        <TeamContext.Provider value={{
            team,
            messages,
            resources,
            sendMessage,
            addResource
        }}>
            {children}
        </TeamContext.Provider>
    );
};
