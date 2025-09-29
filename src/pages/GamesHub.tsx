import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Gamepad2, Trophy, Star, Play, Lock, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Game {
  id: string;
  title: string;
  description: string;
  xp: number;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  locked: boolean;
}

const GamesHub = () => {
  const navigate = useNavigate();
  const [currentXP] = useState(245);
  const [totalXP] = useState(500);

  const [games] = useState<Game[]>([
    {
      id: '1',
      title: 'Phishing Email Detective',
      description: 'Identify phishing emails in this interactive game',
      xp: 25,
      difficulty: 'easy',
      completed: true,
      locked: false
    },
    {
      id: '2', 
      title: 'Password Master',
      description: 'Create the strongest passwords and learn best practices',
      xp: 30,
      difficulty: 'medium',
      completed: false,
      locked: false
    },
    {
      id: '3',
      title: 'Social Media Safety Quiz',
      description: 'Test your knowledge about social media privacy',
      xp: 35,
      difficulty: 'medium',
      completed: false,
      locked: false
    },
    {
      id: '4',
      title: 'Cyber Attack Simulator',
      description: 'Learn to defend against various cyber attacks',
      xp: 50,
      difficulty: 'hard',
      completed: false,
      locked: true
    },
    {
      id: '5',
      title: 'Digital Footprint Challenge',
      description: 'Understand and manage your online presence',
      xp: 40,
      difficulty: 'medium',
      completed: false,
      locked: true
    },
    {
      id: '6',
      title: 'Ransomware Recovery Hero',
      description: 'Help organizations recover from ransomware attacks',
      xp: 60,
      difficulty: 'hard',
      completed: false,
      locked: true
    }
  ]);

  const [leaderboard] = useState([
    { rank: 1, name: 'CyberNinja', xp: 890, badge: 'Expert' },
    { rank: 2, name: 'SecureGuard', xp: 765, badge: 'Advanced' },
    { rank: 3, name: 'You', xp: 245, badge: 'Intermediate' },
    { rank: 4, name: 'DataDefender', xp: 180, badge: 'Beginner' },
    { rank: 5, name: 'CryptoKid', xp: 120, badge: 'Beginner' }
  ]);

  const playGame = (game: Game) => {
    if (game.locked) {
      toast({
        title: "Game Locked",
        description: "Complete previous games to unlock this one!",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Starting Game",
      description: `Let's play ${game.title}!`,
    });
    
    // In a real app, this would navigate to the game
    setTimeout(() => {
      toast({
        title: "Game Completed!",
        description: `You earned ${game.xp} XP!`,
      });
    }, 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-accent-password';
      case 'medium': return 'text-accent-safety';
      case 'hard': return 'text-accent-phishing';
      default: return 'text-white';
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Expert': return 'bg-accent-phishing text-white';
      case 'Advanced': return 'bg-accent-password text-white';
      case 'Intermediate': return 'bg-accent-safety text-black';
      case 'Beginner': return 'bg-muted text-white';
      default: return 'bg-muted text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-cyber">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="ghost"
            size="icon"
            className="mr-4 text-muted-foreground hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-cyber font-bold text-white">
              Cybersecurity Games Hub
            </h1>
            <p className="text-muted-foreground text-sm">
              Learn cybersecurity through fun, interactive games
            </p>
          </div>
          <div className="glass-card rounded-full px-4 py-2 flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-accent-safety" />
            <span className="text-white font-semibold">{currentXP} XP</span>
          </div>
        </div>

        {/* XP Progress */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-cyber font-semibold text-white">
              Your Progress
            </h3>
            <span className="text-muted-foreground text-sm">
              {currentXP}/{totalXP} XP to next level
            </span>
          </div>
          <Progress value={(currentXP / totalXP) * 100} className="mb-2" />
          <p className="text-muted-foreground text-sm">
            Complete games to earn XP and unlock new challenges!
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {games.map((game) => (
            <div
              key={game.id}
              className={`glass-card rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${
                game.locked ? 'opacity-60' : 'cursor-pointer'
              } ${game.completed ? 'feature-card-password' : 'hover:bg-white/10'}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${game.locked ? 'text-muted-foreground' : 'text-primary'}`}>
                  {game.locked ? (
                    <Lock className="h-8 w-8" />
                  ) : game.completed ? (
                    <Trophy className="h-8 w-8 text-accent-password" />
                  ) : (
                    <Gamepad2 className="h-8 w-8" />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-medium ${getDifficultyColor(game.difficulty)}`}>
                    {game.difficulty.toUpperCase()}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-accent-safety" />
                    <span className="text-xs text-white">{game.xp}</span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-cyber font-semibold text-white mb-2">
                {game.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {game.description}
              </p>
              
              <Button
                onClick={() => playGame(game)}
                disabled={game.locked}
                className={`w-full ${
                  game.completed 
                    ? 'bg-accent-password/20 text-accent-password hover:bg-accent-password/30' 
                    : game.locked
                    ? 'bg-muted/20 text-muted-foreground'
                    : 'bg-gradient-primary hover:glow-primary btn-cyber'
                }`}
              >
                {game.completed ? (
                  <>
                    <Trophy className="h-4 w-4 mr-2" />
                    Completed
                  </>
                ) : game.locked ? (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Locked
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Play Game
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-cyber font-semibold text-white mb-4 flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-accent-safety" />
            Leaderboard
          </h3>
          
          <div className="space-y-3">
            {leaderboard.map((player) => (
              <div 
                key={player.rank} 
                className={`flex items-center space-x-4 p-3 rounded-lg transition-colors ${
                  player.name === 'You' ? 'bg-primary/10 border border-primary/20' : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  player.rank === 1 ? 'bg-accent-safety text-black' :
                  player.rank === 2 ? 'bg-muted text-white' :
                  player.rank === 3 ? 'bg-accent-phishing/30 text-white' :
                  'bg-white/10 text-muted-foreground'
                }`}>
                  #{player.rank}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className={`font-semibold ${player.name === 'You' ? 'text-primary' : 'text-white'}`}>
                      {player.name}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getBadgeColor(player.badge)}`}>
                      {player.badge}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Zap className="h-4 w-4 text-accent-safety" />
                  <span className="text-white font-semibold">{player.xp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesHub;