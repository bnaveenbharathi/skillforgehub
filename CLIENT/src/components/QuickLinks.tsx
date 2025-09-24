import { BookOpen, Code, Users, FileText, ArrowRight, Calendar, Book } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuickLinks = () => {
  const links = [
    {
      title: "Learning Path",
      description: "Continue your personalized journey",
      icon: BookOpen,
      color: "from-primary/20 to-primary-glow/20",
      href: "/learning-path"
    },
    {
      title: "Mock Interviews",
      description: "Practice with AI-powered interviews",
      icon: Users,
      color: "from-blue-500/20 to-blue-400/20",
      href: "/mock-interview"
    },
    {
      title: "Daily Planner",
      description: "Manage your schedule and tasks",
      icon: Calendar,
      color: "from-green-500/20 to-green-400/20",
      href: "/planner"
    },
    {
      title: "E-Library",
      description: "Access learning resources and guidance",
      icon: Book,
      color: "from-purple-500/20 to-purple-400/20",
      href: "/library"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {links.map((link, index) => (
        <Button
          key={index}
          variant="ghost"
          className="h-auto p-0 w-full"
          asChild
        >
          <a href={link.href} className="card-feature text-left cursor-pointer group">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                <link.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{link.title}</h3>
                <p className="text-sm text-muted-foreground">{link.description}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
            </div>
          </a>
        </Button>
      ))}
    </div>
  );
};

export default QuickLinks;