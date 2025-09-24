import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, CheckCircle, Mail, User } from "lucide-react";
import FormInput from "@/components/FormInput";
import SocialButton from "@/components/SocialButton";
import MultiSelect from "@/components/MultiSelect";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    college: "",
    degree: "",
    year: "",
    skills: [] as string[],
    careerGoals: ""
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const skillOptions = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "react", label: "React" },
    { value: "nodejs", label: "Node.js" },
    { value: "datascience", label: "Data Science" },
    { value: "machinelearning", label: "Machine Learning" },
    { value: "ui-ux", label: "UI/UX Design" },
    { value: "marketing", label: "Digital Marketing" },
    { value: "projectmanagement", label: "Project Management" },
    { value: "cloud", label: "Cloud Computing" }
  ];

  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form validation and submission logic here
    try {
      const users = JSON.parse(localStorage.getItem("sfh_users") || "[]");
      users.push(formData);
      localStorage.setItem("sfh_users", JSON.stringify(users));
      alert("Signup successful! Redirecting to login...");
      navigate("/login");
    } catch (err) {
      alert("Error saving signup data.");
    }
    console.log("Form submitted:", formData);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <BookOpen className="h-8 w-8 text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-primary to-primary-glow rounded-full animate-pulse" />
              </div>
              <span className="text-xl font-bold text-gradient">SkillForge Hub</span>
            </Link>
            <Link
              to="/login"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Already have an account? Login
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Start Your <span className="text-gradient">Career Journey</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Join thousands of professionals building their future with SkillForge Hub
            </p>
          </div>

          <div className="bg-background/80 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-[var(--shadow-medium)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Personal Information</h2>
                
                <FormInput
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(value) => setFormData({ ...formData, name: value })}
                  required
                  error={errors.name}
                />

                <FormInput
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(value) => setFormData({ ...formData, email: value })}
                  required
                  error={errors.email}
                />

                <FormInput
                  label="Password"
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(value) => setFormData({ ...formData, password: value })}
                  required
                  error={errors.password}
                />
              </div>

              {/* Education */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Education</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="College/University"
                    placeholder="Your institution"
                    value={formData.college}
                    onChange={(value) => setFormData({ ...formData, college: value })}
                    required
                  />
                  
                  <FormInput
                    label="Graduation Year"
                    placeholder="e.g., 2024"
                    value={formData.year}
                    onChange={(value) => setFormData({ ...formData, year: value })}
                    required
                  />
                </div>

                <FormInput
                  label="Degree/Field of Study"
                  placeholder="e.g., Computer Science, Business"
                  value={formData.degree}
                  onChange={(value) => setFormData({ ...formData, degree: value })}
                  required
                />
              </div>

              {/* Skills & Goals */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Skills & Goals</h2>
                
                <MultiSelect
                  label="Current Skills"
                  options={skillOptions}
                  value={formData.skills}
                  onChange={(value) => setFormData({ ...formData, skills: value })}
                  placeholder="Select your current skills..."
                  required
                />

                <FormInput
                  label="Career Goals"
                  placeholder="What do you want to achieve in your career?"
                  value={formData.careerGoals}
                  onChange={(value) => setFormData({ ...formData, careerGoals: value })}
                  required
                />
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary/20"
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!agreedToTerms}
                className="btn-hero w-full"
              >
                Create Account
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>

              
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-background/80 backdrop-blur-sm border-t border-border/50 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 SkillForge Hub. All rights reserved.
            </div>
        
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignUp;