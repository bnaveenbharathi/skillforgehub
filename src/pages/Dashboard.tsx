import DashboardHeader from "@/components/DashboardHeader";
import ProgressCard from "@/components/ProgressCard";
import AIRecommendations from "@/components/AIRecommendations";
import DailyPlanner from "@/components/DailyPlanner";
import QuickLinks from "@/components/QuickLinks";
import ActivityFeed from "@/components/ActivityFeed";
import Footer from "@/components/Footer";
import { BookOpen, Target, Users, Trophy, Calendar, Briefcase } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Welcome back, <span className="text-gradient">John!</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Ready to continue your journey? Here's what's happening today.
          </p>
        </div>

        {/* Progress Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ProgressCard
            title="Courses Completed"
            value={12}
            total={15}
            icon={BookOpen}
            color="primary"
            trend={8}
          />
          <ProgressCard
            title="Skills Mastered"
            value={24}
            icon={Target}
            color="success"
            trend={12}
          />
          <ProgressCard
            title="Projects Contributed"
            value={8}
            total={10}
            icon={Users}
            color="info"
            trend={15}
          />
          <ProgressCard
            title="Hackathons Won"
            value={3}
            icon={Trophy}
            color="warning"
            trend={25}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* AI Recommendations */}
            <AIRecommendations />
            
            {/* Quick Links */}
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-6">Quick Actions</h2>
              <QuickLinks />
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProgressCard
                title="Internships Applied"
                value={5}
                total={8}
                icon={Briefcase}
                color="info"
                trend={20}
              />
              <ProgressCard
                title="Study Streak"
                value={14}
                icon={Calendar}
                color="success"
                trend={7}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            
            {/* Daily Planner */}
            <DailyPlanner />
            
            {/* Activity Feed */}
            <ActivityFeed />
          </div>
        </div>

        {/* Weekly Goal Section */}
        <div className="bg-gradient-to-r from-primary/5 via-primary-glow/5 to-primary/5 rounded-3xl p-8 border border-primary/10 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              This Week's <span className="text-gradient">Challenge</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Complete 3 coding challenges and submit your e-commerce project
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium text-foreground">6/8 Tasks</span>
              </div>
              <div className="w-full bg-accent/50 rounded-full h-3">
                <div className="h-3 bg-gradient-to-r from-primary to-primary-glow rounded-full w-3/4 transition-all duration-500" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">2 tasks remaining</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;