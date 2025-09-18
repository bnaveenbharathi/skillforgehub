import { CheckCircle, Circle, Clock, Play } from "lucide-react";

const ProgressTracker = () => {
  const milestones = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      description: "Variables, functions, and basic concepts",
      status: "completed",
      date: "Jan 15, 2024"
    },
    {
      id: 2,
      title: "DOM Manipulation",
      description: "Working with HTML elements",
      status: "completed",
      date: "Jan 22, 2024"
    },
    {
      id: 3,
      title: "React Basics",
      description: "Components and JSX",
      status: "completed",
      date: "Feb 5, 2024"
    },
    {
      id: 4,
      title: "State Management",
      description: "useState and useEffect hooks",
      status: "current",
      date: "In Progress"
    },
    {
      id: 5,
      title: "API Integration",
      description: "Fetch data and handle responses",
      status: "upcoming",
      date: "Feb 28, 2024"
    },
    {
      id: 6,
      title: "Final Project",
      description: "Build a complete React application",
      status: "upcoming",
      date: "Mar 15, 2024"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "current":
        return <Play className="h-5 w-5 text-primary animate-pulse" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 border-green-200";
      case "current":
        return "bg-primary/5 border-primary/30 shadow-[var(--shadow-soft)]";
      default:
        return "bg-muted/30 border-border/30";
    }
  };

  return (
    <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-3xl p-6 border border-primary/10 shadow-[var(--shadow-soft)]">
      <h2 className="text-2xl font-semibold text-foreground mb-6">Learning Progress</h2>
      
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-green-500 via-primary to-muted-foreground/30" />
        
        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="relative flex items-start space-x-4">
              <div className="relative z-10 bg-background p-1 rounded-full">
                {getStatusIcon(milestone.status)}
              </div>
              <div className={`flex-1 p-4 rounded-2xl border transition-all duration-200 ${getStatusColor(milestone.status)}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{milestone.title}</h3>
                  <span className="text-sm text-muted-foreground">{milestone.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">{milestone.description}</p>
                {milestone.status === 'current' && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Module Progress</span>
                      <span className="text-xs font-medium">65%</span>
                    </div>
                    <div className="w-full bg-accent/50 rounded-full h-1.5">
                      <div className="h-1.5 bg-gradient-to-r from-primary to-primary-glow rounded-full w-2/3" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 via-primary-glow/5 to-primary/5 rounded-2xl border border-primary/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground">Overall Progress</p>
            <p className="text-sm text-muted-foreground">50% complete • 3 of 6 milestones</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gradient">50%</div>
            <Clock className="h-4 w-4 text-muted-foreground mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;