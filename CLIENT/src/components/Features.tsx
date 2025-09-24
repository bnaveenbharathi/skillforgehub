import { Brain, Code, Users, Trophy, BookOpen, Zap, Target, Shield } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Personalized learning paths powered by advanced AI that adapts to your pace and learning style."
    },
    {
      icon: Code,
      title: "Real-World Projects",
      description: "Work on industry-relevant projects with real companies and build a portfolio that stands out."
    },
    {
      icon: Users,
      title: "Collaborative Hub", 
      description: "Join teams, participate in hackathons, and learn from peers in our vibrant community."
    },
    {
      icon: Trophy,
      title: "Skill Verification",
      description: "Blockchain-verified certificates and peer endorsements that employers trust."
    },
    {
      icon: BookOpen,
      title: "Comprehensive Library",
      description: "Access thousands of courses, tutorials, and resources curated by industry experts."
    },
    {
      icon: Zap,
      title: "Mock Interviews",
      description: "Practice with AI-powered mock interviews and get real-time feedback to ace your next interview."
    },
    {
      icon: Target,
      title: "Career Guidance",
      description: "Get personalized career advice and mentorship from professionals in your field."
    },
    {
      icon: Shield,
      title: "Internship Marketplace",
      description: "Connect with top companies and secure internships that launch your career."
    }
  ];

  return (
    <section id="features" className="py-20 section-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Everything You Need to{" "}
            <span className="text-gradient">Succeed</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive platform combines cutting-edge technology with proven learning methodologies 
            to accelerate your career growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-feature group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/10 to-primary-glow/10 rounded-2xl mb-6 group-hover:glow-primary transition-all duration-300">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Feature Highlight */}
        <div className="mt-20 bg-gradient-to-r from-primary/5 via-primary-glow/5 to-primary/5 rounded-3xl p-8 lg:p-12 border border-primary/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-6">
                Experience the Power of{" "}
                <span className="text-gradient">AI-Driven Learning</span>
              </h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Our advanced AI algorithms analyze your learning patterns, identify knowledge gaps, 
                and create personalized study plans that maximize your growth potential.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  Adaptive learning algorithms
                </li>
                <li className="flex items-center text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  Real-time progress tracking
                </li>
                <li className="flex items-center text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  Personalized recommendations
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-2xl p-8 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="h-4 bg-gradient-to-r from-primary to-primary-glow rounded-full w-3/4" />
                  <div className="h-4 bg-primary/30 rounded-full w-1/2" />
                  <div className="h-4 bg-primary/20 rounded-full w-5/6" />
                  <div className="h-4 bg-gradient-to-r from-primary-glow to-primary rounded-full w-2/3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;