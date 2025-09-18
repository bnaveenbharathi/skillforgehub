import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Code, 
  Users, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Play,
  Star,
  TrendingUp
} from "lucide-react";

const MockInterview = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const interviewCategories = [
    { id: "all", name: "All Interviews", count: 12 },
    { id: "aptitude", name: "Aptitude", count: 4 },
    { id: "coding", name: "Coding", count: 3 },
    { id: "technical", name: "Technical", count: 3 },
    { id: "hr", name: "HR & Behavioral", count: 2 }
  ];

  const interviews = [
    {
      id: 1,
      title: "Software Engineer - Technical Round",
      type: "technical",
      duration: "45 min",
      difficulty: "Intermediate",
      topics: ["React", "JavaScript", "System Design"],
      status: "available",
      attempts: 0,
      rating: 4.8,
      icon: Code
    },
    {
      id: 2,
      title: "Frontend Developer - Coding Challenge",
      type: "coding",
      duration: "60 min",
      difficulty: "Advanced",
      topics: ["Algorithms", "Data Structures", "Problem Solving"],
      status: "completed",
      attempts: 2,
      rating: 4.6,
      lastScore: 85,
      icon: Brain
    },
    {
      id: 3,
      title: "HR Interview - Behavioral Questions",
      type: "hr",
      duration: "30 min",
      difficulty: "Beginner",
      topics: ["Communication", "Leadership", "Teamwork"],
      status: "available",
      attempts: 1,
      rating: 4.7,
      icon: Users
    },
    {
      id: 4,
      title: "Aptitude Test - Logical Reasoning",
      type: "aptitude",
      duration: "40 min",
      difficulty: "Intermediate",
      topics: ["Logic", "Mathematics", "Reasoning"],
      status: "in-progress",
      attempts: 0,
      rating: 4.5,
      progress: 65,
      icon: FileText
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-700 border-green-500/20";
      case "in-progress":
        return "bg-primary/10 text-primary border-primary/20";
      case "available":
        return "bg-blue-500/10 text-blue-700 border-blue-500/20";
      default:
        return "bg-muted/50 text-muted-foreground border-border/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "in-progress":
        return <Clock className="h-4 w-4" />;
      case "available":
        return <Play className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const filteredInterviews = selectedCategory === "all" 
    ? interviews 
    : interviews.filter(interview => interview.type === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/20">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Mock Interview Hub</h1>
          <p className="text-muted-foreground">Practice with AI-powered interviews and boost your confidence</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Attempts</p>
                <p className="text-2xl font-bold text-foreground">24</p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold text-foreground">78%</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Star className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-foreground">18</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-foreground">2</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {interviewCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="h-10"
            >
              {category.name}
              <Badge variant="secondary" className="ml-2">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Interview Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredInterviews.map((interview) => (
            <div
              key={interview.id}
              className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <interview.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{interview.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {interview.difficulty}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{interview.duration}</span>
                    </div>
                  </div>
                </div>
                <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border text-xs ${getStatusColor(interview.status)}`}>
                  {getStatusIcon(interview.status)}
                  <span className="capitalize">{interview.status.replace('-', ' ')}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Topics:</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">{interview.rating}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {interview.topics.map((topic, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              {interview.status === "in-progress" && interview.progress && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium">{interview.progress}%</span>
                  </div>
                  <Progress value={interview.progress} className="h-2" />
                </div>
              )}

              {interview.status === "completed" && interview.lastScore && (
                <div className="mb-4 p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-700">Last Score</span>
                    <span className="text-lg font-bold text-green-700">{interview.lastScore}%</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {interview.attempts} attempt{interview.attempts !== 1 ? 's' : ''}
                </span>
                <div className="flex space-x-2">
                  {interview.status === "completed" && (
                    <Button variant="outline" size="sm">
                      View Results
                    </Button>
                  )}
                  <Button size="sm">
                    {interview.status === "in-progress" ? "Continue" : "Start Interview"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MockInterview;