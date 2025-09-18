import { CheckCircle, Clock, Play, Lock, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  title: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  progress: number;
  status: "completed" | "current" | "locked" | "available";
  modules: number;
  rating: number;
  enrolledStudents: number;
  description: string;
}

const CourseCard = ({ 
  title, 
  duration, 
  difficulty, 
  progress, 
  status, 
  modules, 
  rating, 
  enrolledStudents, 
  description 
}: CourseCardProps) => {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-700";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "Advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "current":
        return <Play className="h-5 w-5 text-primary" />;
      case "locked":
        return <Lock className="h-5 w-5 text-muted-foreground" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return "border-green-500/30 bg-green-50/50";
      case "current":
        return "border-primary/30 bg-primary/5 shadow-[var(--shadow-soft)]";
      case "locked":
        return "border-border/30 bg-muted/20 opacity-60";
      default:
        return "border-border/30 bg-background/50";
    }
  };

  return (
    <div className={`rounded-3xl p-6 border transition-all duration-200 hover:shadow-[var(--shadow-medium)] ${getStatusColor()} ${status !== 'locked' && 'hover:-translate-y-1'}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{description}</p>

      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
        <div className="flex items-center space-x-4">
          <span>{duration}</span>
          <span>{modules} modules</span>
        </div>
        <span>{enrolledStudents.toLocaleString()} students</span>
      </div>

      {status !== 'locked' && progress > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-accent/50 rounded-full h-2">
            <div 
              className="h-2 bg-gradient-to-r from-primary to-primary-glow rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <Button 
        className={`w-full ${status === 'current' ? 'btn-hero' : 'btn-hero-outline'}`}
        disabled={status === 'locked'}
      >
        {status === 'completed' ? 'Review Course' : 
         status === 'current' ? 'Continue Learning' : 
         status === 'locked' ? 'Locked' : 'Start Course'}
      </Button>
    </div>
  );
};

export default CourseCard;