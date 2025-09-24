import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Filter,
  BarChart3,
  Bell,
  Target,
  TrendingUp,
  Brain,
  Zap
} from "lucide-react";

const PlannerView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const todayTasks = [
    {
      id: 1,
      time: "09:00 AM",
      title: "Complete React Module 3",
      type: "Learning",
      duration: "45 min",
      status: "completed",
      priority: "high",
      description: "Focus on hooks and state management patterns"
    },
    {
      id: 2,
      time: "11:00 AM",
      title: "Team Project Standup",
      type: "Meeting",
      duration: "30 min",
      status: "current",
      priority: "medium",
      description: "Discuss sprint progress and blockers"
    },
    {
      id: 3,
      time: "02:00 PM",
      title: "Mock Interview Practice",
      type: "Assessment",
      duration: "60 min",
      status: "upcoming",
      priority: "high",
      description: "Technical interview simulation"
    },
    {
      id: 4,
      time: "04:00 PM",
      title: "JavaScript Coding Challenge",
      type: "Practice",
      duration: "90 min",
      status: "upcoming",
      priority: "medium",
      description: "Algorithm and data structure problems"
    },
    {
      id: 5,
      time: "06:00 PM",
      title: "Portfolio Review & Update",
      type: "Project",
      duration: "30 min",
      status: "upcoming",
      priority: "low",
      description: "Update projects and add new skills"
    }
  ];

  const weeklyProgress = {
    completed: 12,
    total: 18,
    percentage: 67
  };

  const notifications = [
    {
      id: 1,
      type: "deadline",
      title: "Assignment Due Tomorrow",
      description: "React portfolio project submission",
      time: "2 hours ago",
      priority: "high"
    },
    {
      id: 2,
      type: "suggestion",
      title: "AI Recommendation",
      description: "Take a break after your mock interview",
      time: "1 hour ago",
      priority: "low"
    },
    {
      id: 3,
      type: "achievement",
      title: "Milestone Reached!",
      description: "Completed JavaScript fundamentals",
      time: "3 hours ago",
      priority: "medium"
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
        return "bg-primary/10 border-primary/20 shadow-[var(--shadow-soft)]";
      default:
        return "bg-muted/50 border-border/30";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "deadline":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "suggestion":
        return <Brain className="h-4 w-4 text-primary" />;
      case "achievement":
        return <Target className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/20">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Daily Planner</h1>
            <p className="text-muted-foreground">AI-powered schedule optimization for your success</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>

        <Tabs defaultValue="today" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            {/* Today's Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow-[var(--shadow-soft)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Tasks Today</p>
                    <p className="text-2xl font-bold text-foreground">{todayTasks.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow-[var(--shadow-soft)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-foreground">
                      {todayTasks.filter(task => task.status === "completed").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow-[var(--shadow-soft)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Focus Time</p>
                    <p className="text-2xl font-bold text-foreground">3.5h</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Tasks */}
            <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow-[var(--shadow-soft)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Today's Schedule</h2>
                <Badge variant="outline" className="text-xs">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </Badge>
              </div>

              <div className="space-y-4">
                {todayTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`rounded-2xl p-4 border transition-all duration-200 hover:shadow-[var(--shadow-soft)] ${getStatusColor(task.status)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(task.status)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-foreground">{task.title}</span>
                            <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {task.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{task.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-foreground mb-2">{task.time}</div>
                        {task.status !== "completed" && (
                          <div className="flex space-x-1">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button size="sm">
                              {task.status === "current" ? "Complete" : "Start"}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="week" className="space-y-6">
            <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow-[var(--shadow-soft)]">
              <h2 className="text-xl font-semibold text-foreground mb-6">Weekly Progress</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Task Completion</span>
                    <span className="text-lg font-bold text-foreground">{weeklyProgress.percentage}%</span>
                  </div>
                  <Progress value={weeklyProgress.percentage} className="h-3 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {weeklyProgress.completed} of {weeklyProgress.total} tasks completed
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Learning Hours</span>
                    <span className="font-semibold text-foreground">12.5h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Projects Completed</span>
                    <span className="font-semibold text-foreground">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Skills Practiced</span>
                    <span className="font-semibold text-foreground">7</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow-[var(--shadow-soft)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Performance Reports</h2>
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 bg-background/50 rounded-xl border border-border/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Productivity Score</span>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">8.7/10</p>
                  <p className="text-xs text-green-600">+0.3 from last week</p>
                </div>
                
                <div className="p-4 bg-background/50 rounded-xl border border-border/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Focus Time</span>
                    <Clock className="h-4 w-4 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">6.2h</p>
                  <p className="text-xs text-blue-600">Daily average</p>
                </div>
                
                <div className="p-4 bg-background/50 rounded-xl border border-border/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Goal Achievement</span>
                    <Target className="h-4 w-4 text-purple-500" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">92%</p>
                  <p className="text-xs text-purple-600">This month</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow-[var(--shadow-soft)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Notifications & Reminders</h2>
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
              
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start space-x-3 p-4 bg-background/50 rounded-xl border border-border/30 hover:border-primary/30 transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-foreground">{notification.title}</h3>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                    </div>
                    <Badge className={`text-xs ${getPriorityColor(notification.priority)}`}>
                      {notification.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default PlannerView;