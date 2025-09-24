import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Github, Linkedin, User, Save, X, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    goals: '',
    careerPath: '',
    profilePhoto: null
  });
  const [initialProfile, setInitialProfile] = useState<any>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [initialSkills, setInitialSkills] = useState<string[]>([]);
  const [connectedAccounts, setConnectedAccounts] = useState({
    github: false,
    linkedin: false,
    portfolio: false
  });
  const [initialAccounts, setInitialAccounts] = useState({
    github: false,
    linkedin: false,
    portfolio: false
  });

  useEffect(() => {
    // Fetch user from localStorage
    const users = JSON.parse(localStorage.getItem("sfh_users") || "[]");
    const lastEmail = localStorage.getItem("sfh_last_login_email");
    const user = users.find((u: any) => u.email === lastEmail) || users[users.length - 1] || null;
    if (user) {
      const loadedProfile = {
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        goals: user.careerGoals || '',
        careerPath: user.careerPath || '',
        profilePhoto: user.profilePhoto || null
      };
      setProfileData(loadedProfile);
      setInitialProfile(loadedProfile);
      setSelectedSkills(user.skills || []);
      setInitialSkills(user.skills || []);
      setConnectedAccounts(user.connectedAccounts || { github: false, linkedin: false, portfolio: false });
      setInitialAccounts(user.connectedAccounts || { github: false, linkedin: false, portfolio: false });
    }
  }, []);

  // Save/Update profile in localStorage
  const handleSaveProfile = () => {
    const users = JSON.parse(localStorage.getItem("sfh_users") || "[]");
    const lastEmail = localStorage.getItem("sfh_last_login_email");
    const idx = users.findIndex((u: any) => u.email === lastEmail);
    const updatedUser = {
      ...users[idx],
      name: profileData.fullName,
      email: profileData.email,
      phone: profileData.phone,
      careerGoals: profileData.goals,
      careerPath: profileData.careerPath,
      profilePhoto: profileData.profilePhoto,
      skills: selectedSkills,
      connectedAccounts: connectedAccounts
    };
    if (idx !== -1) {
      users[idx] = updatedUser;
      localStorage.setItem("sfh_users", JSON.stringify(users));
      // If email changed, update last login email reference
      if (lastEmail !== profileData.email) {
        localStorage.setItem("sfh_last_login_email", profileData.email);
      }
      alert("Profile updated!");
      setInitialProfile({ ...profileData });
      setInitialSkills([...selectedSkills]);
      setInitialAccounts({ ...connectedAccounts });
    }
  };

  // Discard changes and reset to last saved state
  const handleDiscard = () => {
    if (initialProfile) setProfileData(initialProfile);
    setSelectedSkills(initialSkills);
    setConnectedAccounts(initialAccounts);
  };

  const availableSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'AI/ML', 'Data Science',
    'Web Development', 'Mobile Development', 'Cloud Computing', 'DevOps',
    'UI/UX Design', 'Database Management', 'Cybersecurity', 'Blockchain'
  ];

  const careerPaths = [
    'Software Developer', 'Data Scientist', 'UI/UX Designer', 'Product Manager',
    'DevOps Engineer', 'AI/ML Engineer', 'Cybersecurity Specialist', 'Cloud Architect'
  ];

  const aiSuggestedSkills = ['TypeScript', 'Docker', 'AWS'];

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const toggleConnection = (platform: string) => {
    setConnectedAccounts(prev => ({
      ...prev,
      [platform]: !prev[platform as keyof typeof prev]
    }));
  };

  const calculateProgress = () => {
    const fields = [
      profileData.fullName,
      profileData.email,
      profileData.phone,
      profileData.goals,
      profileData.careerPath,
      selectedSkills.length > 0
    ];
    return (fields.filter(Boolean).length / fields.length) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold">S</span>
              </div>
              <span className="text-2xl font-bold">SkillForge Hub</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => navigate('/dashboard')}
              >
                <X className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <Button 
                className="bg-white text-primary hover:bg-white/90"
                onClick={handleSaveProfile}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Profile Summary Section */}
        <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-[var(--shadow-soft)]">
          <div className="flex items-start space-x-8">
            {/* Profile Photo */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                  <User className="w-16 h-16 text-primary/60" />
                </div>
                <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <span className="text-sm text-muted-foreground">Upload Photo</span>
            </div>

            {/* Basic Info */}
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Profile Setup</h2>
                <p className="text-muted-foreground">Complete your profile to get personalized recommendations</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    value={profileData.fullName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Enter your full name"
                    className="bg-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@example.com"
                    className="bg-white/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 (555) 123-4567"
                  className="bg-white/50"
                />
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Profile Completeness</span>
                  <span className="font-medium text-primary">{Math.round(calculateProgress())}%</span>
                </div>
                <Progress value={calculateProgress()} className="h-2" />
              </div>
            </div>
          </div>
        </Card>

        {/* Skills & Interests Section */}
        <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-[var(--shadow-soft)]">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Skills & Interests</h3>
              <p className="text-muted-foreground">Select your skills and interests to get better recommendations</p>
            </div>

            <div className="space-y-4">
              <Label>Your Skills</Label>
              <div className="flex flex-wrap gap-2">
                {availableSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={selectedSkills.includes(skill) ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedSkills.includes(skill)
                        ? 'bg-primary text-white hover:bg-primary/90'
                        : 'hover:bg-primary/10 hover:border-primary/50'
                    }`}
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                    {selectedSkills.includes(skill) && <Check className="w-3 h-3 ml-1" />}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>AI Suggestions</Label>
              <div className="flex flex-wrap gap-2">
                {aiSuggestedSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="cursor-pointer bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 transition-all duration-200"
                    onClick={() => toggleSkill(skill)}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Career Goals Section */}
        <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-[var(--shadow-soft)]">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Career Goals</h3>
              <p className="text-muted-foreground">Tell us about your career aspirations</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Preferred Career Path</Label>
                <select
                  value={profileData.careerPath}
                  onChange={(e) => setProfileData(prev => ({ ...prev, careerPath: e.target.value }))}
                  className="w-full h-10 px-3 py-2 bg-white/50 border border-input rounded-md text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="">Select a career path</option>
                  {careerPaths.map((path) => (
                    <option key={path} value={path}>{path}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label>Short-term & Long-term Goals</Label>
                <Textarea
                  value={profileData.goals}
                  onChange={(e) => setProfileData(prev => ({ ...prev, goals: e.target.value }))}
                  placeholder="Describe your career goals, what you want to achieve in the next 1-3 years and beyond..."
                  className="min-h-32 bg-white/50 resize-none"
                />
              </div>
            </div>
          </div>
        </Card>

        
        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 pb-8">
          <Button 
            variant="outline" 
            size="lg"
            className="px-8"
            onClick={handleDiscard}
          >
            Discard Changes
          </Button>
          <Button 
            size="lg"
            className="px-8 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={handleSaveProfile}
          >
            <Save className="w-5 h-5 mr-2" />
            Update Profile
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-background to-accent/20 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        

        {/* Bottom Section */}
        <div className="py-8 border-t border-border/50">
          <div className="flex justify-center gap-10">
            
            {/* Copyright */}
            <div className="text-muted-foreground text-sm text-center">
              © 2024 SkillForge Hub. All rights reserved.
            </div>

            {/* Social Links */}
           
            {/* Additional Info */}
            <div className="text-muted-foreground text-sm">
              Made with ❤️ for future innovators
            </div>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default ProfileSetup;