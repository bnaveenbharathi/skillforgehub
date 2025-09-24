import { Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react";

const DailyPlanner = () => {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const tasks = [
    {
      time: "09:00 AM",
      title: "Complete React Module 3",
      type: "Learning",
      duration: "45 min",
      status: "completed",
      priority: "high"
    },
    {
      time: "11:00 AM",
      title: "Team Project Standup",
      type: "Meeting",
      duration: "30 min",
      status: "current",
      priority: "medium"
    },
    {
      time: "02:00 PM",
      title: "Mock Interview Practice",
      type: "Assessment",
      duration: "60 min",
      status: "upcoming",
      priority: "high"
    },
    {
      time: "04:00 PM",
      title: "JavaScript Coding Challenge",
      type: "Practice",
      duration: "90 min",
      status: "upcoming",
      priority: "medium"
    },
    {
      time: "06:00 PM",
      title: "Portfolio Review & Update",
      type: "Project",
      duration: "30 min",
      status: "upcoming",
      priority: "low"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "current":
        return <Clock className="h-4 w-4 text-primary animate-pulse" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 border-green-500/20";
      case "current":
        return "bg-primary/10 border-primary/20";
      default:
        return "bg-muted/50 border-border/30";
    }
  };

  return (
    <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-3xl p-6 border border-primary/10 shadow-[var(--shadow-soft)]">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-xl flex items-center justify-center mr-3">
          <Calendar className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Today's Schedule</h2>
          <p className="text-sm text-muted-foreground">{today}</p>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div
            key={index}
            className={`rounded-2xl p-4 border transition-all duration-200 ${getStatusColor(task.status)} ${
              task.status === 'current' ? 'shadow-[var(--shadow-soft)]' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(task.status)}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">{task.title}</span>
                    {task.priority === 'high' && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                        Priority
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {task.type}
                    </span>
                    <span className="text-xs text-muted-foreground">{task.duration}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">{task.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 via-primary-glow/5 to-primary/5 rounded-2xl border border-primary/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">AI Suggestion</p>
            <p className="text-xs text-muted-foreground">Take a 15-min break after your mock interview</p>
          </div>
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <span className="text-xs">🤖</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyPlanner;