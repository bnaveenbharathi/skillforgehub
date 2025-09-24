import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Video, 
  FileText, 
  Download, 
  Search, 
  Filter,
  Star,
  Clock,
  User,
  Play,
  CheckCircle,
  MessageCircle,
  Brain,
  Lightbulb,
  Target,
  TrendingUp
} from "lucide-react";

const ELibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [chatMessage, setChatMessage] = useState("");

  const categories = [
    { id: "all", name: "All Resources", count: 250 },
    { id: "programming", name: "Programming", count: 89 },
    { id: "design", name: "Design", count: 45 },
    { id: "career", name: "Career", count: 67 },
    { id: "interview", name: "Interview Prep", count: 34 },
    { id: "softskills", name: "Soft Skills", count: 15 }
  ];

  const resources = [
    {
      id: 1,
      title: "Complete React Developer Guide",
      type: "course",
      category: "programming",
      description: "Master React with hands-on projects and real-world examples",
      duration: "12 hours",
      rating: 4.8,
      author: "Tech Academy",
      thumbnail: "/placeholder.svg",
      progress: 65,
      isCompleted: false,
      tags: ["React", "JavaScript", "Frontend"]
    },
    {
      id: 2,
      title: "System Design Interview Prep",
      type: "video",
      category: "interview",
      description: "Learn how to tackle system design questions in technical interviews",
      duration: "3.5 hours",
      rating: 4.9,
      author: "Senior Engineer",
      thumbnail: "/placeholder.svg",
      progress: 100,
      isCompleted: true,
      tags: ["System Design", "Interview", "Architecture"]
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      type: "document",
      category: "design",
      description: "Essential design principles for creating user-friendly interfaces",
      duration: "45 min read",
      rating: 4.7,
      author: "Design Studio",
      thumbnail: "/placeholder.svg",
      progress: 0,
      isCompleted: false,
      tags: ["UI/UX", "Design", "Principles"]
    },
    {
      id: 4,
      title: "Leadership Skills for Developers",
      type: "course",
      category: "softskills",
      description: "Develop leadership skills to advance your tech career",
      duration: "8 hours",
      rating: 4.6,
      author: "Career Coach",
      thumbnail: "/placeholder.svg",
      progress: 25,
      isCompleted: false,
      tags: ["Leadership", "Career", "Communication"]
    }
  ];

  const chatHistory = [
    {
      id: 1,
      type: "user",
      message: "What skills should I focus on for a frontend developer role?",
      timestamp: "2 minutes ago"
    },
    {
      id: 2,
      type: "ai",
      message: "For a frontend developer role, I recommend focusing on: 1) React/Vue.js for framework knowledge, 2) TypeScript for type safety, 3) CSS Grid/Flexbox for layouts, 4) Git for version control, and 5) Testing frameworks like Jest. Based on your current progress, I suggest starting with our React Advanced Patterns course.",
      timestamp: "2 minutes ago",
      suggestions: [
        "Show me React courses",
        "What about TypeScript resources?",
        "Interview preparation tips"
      ]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      case "document":
        return <FileText className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "course":
        return "bg-primary/10 text-primary";
      case "video":
        return "bg-red-500/10 text-red-600";
      case "document":
        return "bg-green-500/10 text-green-600";
      default:
        return "bg-muted/50 text-muted-foreground";
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/20">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">E-Library & Career Guidance</h1>
            <p className="text-muted-foreground">Access curated resources and get AI-powered career guidance</p>
          </div>
        </div>

        <Tabs defaultValue="library" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="library">Resource Library</TabsTrigger>
            <TabsTrigger value="guidance">AI Career Guidance</TabsTrigger>
            <TabsTrigger value="recommendations">My Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="space-y-6">
            {/* Search and Filter Section */}
            <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow-[var(--shadow-soft)]">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search resources, courses, tutorials..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="default">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                    <Badge variant="secondary" className="ml-2">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            {/* Resource Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-primary/10 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] transition-all duration-200"
                >
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${getTypeColor(resource.type)}`}>
                      {getTypeIcon(resource.type)}
                    </div>
                    {resource.isCompleted && (
                      <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={`text-xs ${getTypeColor(resource.type)}`}>
                        {resource.type}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{resource.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-foreground mb-2">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span>{resource.author}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{resource.duration}</span>
                      </div>
                    </div>

                    {resource.progress > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Progress</span>
                          <span className="text-xs font-medium">{resource.progress}%</span>
                        </div>
                        <div className="w-full bg-accent/50 rounded-full h-1.5">
                          <div 
                            className="h-1.5 bg-gradient-to-r from-primary to-primary-glow rounded-full transition-all duration-300"
                            style={{ width: `${resource.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        {resource.type === "video" ? "Watch" : "Read"}
                      </Button>
                      <Button size="sm" className="flex-1">
                        {resource.progress > 0 ? "Continue" : "Start"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guidance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chat Interface */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-2xl border border-primary/10 shadow-[var(--shadow-soft)] h-[600px] flex flex-col">
                  <div className="p-6 border-b border-border/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-xl flex items-center justify-center">
                        <Brain className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">AI Career Advisor</h3>
                        <p className="text-sm text-muted-foreground">Ask me anything about your career</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    {chatHistory.map((chat) => (
                      <div key={chat.id} className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[80%] p-4 rounded-2xl ${
                          chat.type === "user" 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-background/50 border border-border/30"
                        }`}>
                          <p className="text-sm">{chat.message}</p>
                          <p className="text-xs opacity-70 mt-2">{chat.timestamp}</p>
                          
                          {chat.suggestions && (
                            <div className="mt-3 space-y-2">
                              {chat.suggestions.map((suggestion, index) => (
                                <button
                                  key={index}
                                  className="block w-full text-left text-xs p-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 border-t border-border/30">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Ask about career paths, skills, interviews..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        className="flex-1"
                      />
                      <Button>
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions & Tips */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow-[var(--shadow-soft)]">
                  <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Target className="h-4 w-4 mr-3" />
                      Career Path Assessment
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="h-4 w-4 mr-3" />
                      Skill Gap Analysis
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Lightbulb className="h-4 w-4 mr-3" />
                      Interview Preparation
                    </Button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow-[var(--shadow-soft)]">
                  <h3 className="font-semibold text-foreground mb-4">Daily Tip</h3>
                  <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                    <div className="flex items-start space-x-3">
                      <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-foreground font-medium mb-1">Build a Learning Habit</p>
                        <p className="text-xs text-muted-foreground">
                          Dedicate 30 minutes daily to learning new skills. Consistency beats intensity in long-term growth.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow-[var(--shadow-soft)]">
              <h2 className="text-xl font-semibold text-foreground mb-6">Personalized Recommendations</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.slice(0, 3).map((resource) => (
                  <div
                    key={resource.id}
                    className="p-4 bg-background/50 rounded-xl border border-border/30 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getTypeColor(resource.type)}`}>
                        {getTypeIcon(resource.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground text-sm">{resource.title}</h3>
                        <p className="text-xs text-muted-foreground">{resource.author}</p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-3">{resource.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="text-xs">{resource.rating}</span>
                      </div>
                      <Button size="sm" variant="outline">Start</Button>
                    </div>
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

export default ELibrary;