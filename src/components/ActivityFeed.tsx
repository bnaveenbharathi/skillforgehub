import { Trophy, BookOpen, Users, Calendar, CheckCircle, AlertCircle, Clock } from "lucide-react";

const ActivityFeed = () => {
  const activities = [
    {
      type: "achievement",
      title: "Completed JavaScript Fundamentals",
      description: "Earned certification with 95% score",
      time: "2 hours ago",
      icon: Trophy,
      color: "text-yellow-600 bg-yellow-100"
    },
    {
      type: "deadline",
      title: "Project submission due tomorrow",
      description: "E-commerce Platform - Final review",
      time: "4 hours ago",
      icon: AlertCircle,
      color: "text-red-600 bg-red-100"
    },
    {
      type: "recommendation",
      title: "New course recommended",
      description: "AI suggested Advanced React Patterns",
      time: "6 hours ago",
      icon: BookOpen,
      color: "text-primary bg-primary/10"
    },
    {
      type: "collaboration",
      title: "Joined new project team",
      description: "Mobile App Development with 4 members",
      time: "1 day ago",
      icon: Users,
      color: "text-green-600 bg-green-100"
    },
    {
      type: "schedule",
      title: "Mock interview scheduled",
      description: "Technical interview for Frontend role",
      time: "2 days ago",
      icon: Calendar,
      color: "text-blue-600 bg-blue-100"
    },
    {
      type: "completion",
      title: "Module completed",
      description: "React Hooks and State Management",
      time: "3 days ago",
      icon: CheckCircle,
      color: "text-green-600 bg-green-100"
    }
  ];

  const getTimeIcon = (time: string) => {
    if (time.includes('hours')) return <Clock className="h-3 w-3 text-muted-foreground" />;
    if (time.includes('day')) return <Calendar className="h-3 w-3 text-muted-foreground" />;
    return <Clock className="h-3 w-3 text-muted-foreground" />;
  };

  return (
    <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-3xl p-6 border border-primary/10 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-3 rounded-2xl hover:bg-background/50 transition-all duration-200 group"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${activity.color}`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {activity.title}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{activity.description}</p>
              <div className="flex items-center space-x-1">
                {getTimeIcon(activity.time)}
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 via-primary-glow/5 to-primary/5 rounded-2xl border border-primary/10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <span className="text-sm">🎯</span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Weekly Goal Progress</p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex-1 bg-accent/50 rounded-full h-2">
                <div className="h-2 bg-gradient-to-r from-primary to-primary-glow rounded-full w-3/4" />
              </div>
              <span className="text-xs text-muted-foreground">75%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;