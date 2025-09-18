import { Sparkles, ArrowRight, BookOpen, Code, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const AIRecommendations = () => {
  const recommendations = [
    {
      type: "Course",
      title: "Advanced React Patterns",
      description: "Master advanced React concepts and design patterns",
      reason: "Based on your JavaScript skills",
      icon: BookOpen,
      difficulty: "Intermediate",
      duration: "6 weeks",
      color: "from-primary/10 to-primary-glow/10"
    },
    {
      type: "Project",
      title: "E-commerce Platform",
      description: "Build a full-stack e-commerce application",
      reason: "Perfect for your portfolio",
      icon: Code,
      difficulty: "Advanced",
      duration: "8 weeks",
      color: "from-green-500/10 to-green-400/10"
    },
    {
      type: "Internship",
      title: "Frontend Developer at TechCorp",
      description: "Remote internship with competitive pay",
      reason: "Matches your skill level",
      icon: Briefcase,
      difficulty: "Entry Level",
      duration: "3 months",
      color: "from-blue-500/10 to-blue-400/10"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-3xl p-6 border border-primary/10 shadow-[var(--shadow-soft)]">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-xl flex items-center justify-center mr-3">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">AI Recommendations</h2>
          <p className="text-sm text-muted-foreground">Personalized suggestions for you</p>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="group bg-background/50 rounded-2xl p-4 border border-border/30 hover:border-primary/30 hover:shadow-[var(--shadow-soft)] transition-all duration-200"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${rec.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <rec.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {rec.type}
                  </span>
                  <span className="text-xs text-muted-foreground">{rec.difficulty}</span>
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{rec.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{rec.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground italic">{rec.reason}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">{rec.duration}</span>
                    <ArrowRight className="h-3 w-3 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button className="w-full mt-4 btn-hero-outline">
        View All Recommendations
      </Button>
    </div>
  );
};

export default AIRecommendations;