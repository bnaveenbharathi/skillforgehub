import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, Search, Settings, User, BookOpen, LogOut, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("sfh_users") || "[]");
    const lastEmail = localStorage.getItem("sfh_last_login_email");
    const user = users.find((u: any) => u.email === lastEmail) || users[users.length - 1] || null;
    setProfile(user);
  }, []);

  function getInitials(name: string) {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  const notifications = [
    {
      id: 1,
      title: "New course recommendation",
      message: "AI suggests Advanced React Patterns based on your progress",
      time: "5 min ago",
      unread: true
    },
    {
      id: 2,
      title: "Project deadline reminder",
      message: "E-commerce Platform submission due tomorrow",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 3,
      title: "Mock interview scheduled",
      message: "Your technical interview is set for Friday 2 PM",
      time: "1 day ago",
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <BookOpen className="h-8 w-8 text-primary" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-primary to-primary-glow rounded-full animate-pulse" />
            </div>
            <span className="text-xl font-bold text-gradient">SkillForge Hub</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
           
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            
           

            {/* Profile */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 p-2"
                onClick={() => setShowProfile(!showProfile)}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{getInitials(profile?.name)}</span>
                </div>
                <span className="hidden md:block text-sm font-medium">{profile?.name || "User"}</span>
              </Button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-background border border-border rounded-2xl shadow-[var(--shadow-medium)] backdrop-blur-sm z-50">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-full flex items-center justify-center">
                        <span className="text-lg font-semibold text-primary">{getInitials(profile?.name)}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{profile?.name || "User"}</h3>
                        <p className="text-sm text-muted-foreground">{profile?.email || "user@email.com"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                   
                    <div className="border-t border-border my-2" />
                    <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;