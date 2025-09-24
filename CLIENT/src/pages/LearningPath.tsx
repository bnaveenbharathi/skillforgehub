import DashboardHeader from "@/components/DashboardHeader";
import CourseCard from "@/components/CourseCard";
import ProgressTracker from "@/components/ProgressTracker";
import AIRecommendations from "@/components/AIRecommendations";
import Footer from "@/components/Footer";
import { Filter, Search, BookOpen, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const LearningPath = () => {
  const courses = [
    {
      title: "JavaScript Fundamentals",
      duration: "4 weeks",
      difficulty: "Beginner" as const,
      progress: 100,
      status: "completed" as const,
      modules: 8,
      rating: 4.8,
      enrolledStudents: 12500,
      description: "Master the core concepts of JavaScript programming from variables to functions."
    },
    {
      title: "React Development",
      duration: "6 weeks",
      difficulty: "Intermediate" as const,
      progress: 65,
      status: "current" as const,
      modules: 12,
      rating: 4.9,
      enrolledStudents: 8900,
      description: "Build modern web applications with React, hooks, and component-based architecture."
    },
    {
      title: "Node.js Backend",
      duration: "5 weeks",
      difficulty: "Intermediate" as const,
      progress: 0,
      status: "available" as const,
      modules: 10,
      rating: 4.7,
      enrolledStudents: 6700,
      description: "Create robust backend applications with Node.js, Express, and database integration."
    },
    {
      title: "Advanced React Patterns",
      duration: "4 weeks",
      difficulty: "Advanced" as const,
      progress: 0,
      status: "locked" as const,
      modules: 8,
      rating: 4.9,
      enrolledStudents: 3200,
      description: "Master advanced React patterns, performance optimization, and state management."
    }
  ];

  const stats = [
    {
      label: "Courses in Progress",
      value: "1",
      icon: BookOpen,
      color: "text-primary"
    },
    {
      label: "Completion Rate",
      value: "92%",
      icon: Target,
      color: "text-green-600"
    },
    {
      label: "Study Streak",
      value: "14 days",
      icon: TrendingUp,
      color: "text-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Your <span className="text-gradient">Learning Path</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Personalized curriculum designed by AI to achieve your career goals
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 mt-6 lg:mt-0">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center space-x-2 bg-background/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-border/50">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <div>
                  <div className="text-sm font-semibold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses, modules, topics..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <Button variant="outline" className="btn-hero-outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Courses */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Current Module Highlight */}
            <div className="bg-gradient-to-r from-primary/5 via-primary-glow/5 to-primary/5 rounded-3xl p-6 border border-primary/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Currently Learning</h2>
                <Button className="btn-hero">Continue</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">React Hooks Deep Dive</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Master useState, useEffect, and custom hooks with practical examples
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Module 4 of 12</span>
                    <span>45 min remaining</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Module Progress</span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <div className="w-full bg-accent/50 rounded-full h-2">
                      <div className="h-2 bg-gradient-to-r from-primary to-primary-glow rounded-full w-3/4" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Course Progress</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <div className="w-full bg-accent/50 rounded-full h-2">
                      <div className="h-2 bg-gradient-to-r from-green-500 to-green-400 rounded-full w-2/3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Cards */}
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-6">Available Courses</h2>
              <div className="grid grid-cols-1 gap-6">
                {courses.map((course, index) => (
                  <CourseCard key={index} {...course} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            
            {/* Progress Tracker */}
            <ProgressTracker />
            
            {/* AI Recommendations */}
            <AIRecommendations />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LearningPath;