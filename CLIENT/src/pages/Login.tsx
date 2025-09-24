import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Mail, User, Lock } from "lucide-react";
import FormInput from "@/components/FormInput";
import SocialButton from "@/components/SocialButton";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Check localStorage for user
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("sfh_users") || "[]");
      const found = users.find((u: any) => u.email === formData.email && u.password === formData.password);
      setIsLoading(false);
      if (found) {
        // Store last logged in email for dashboard profile fetch
        localStorage.setItem("sfh_last_login_email", found.email);
        alert("Login successful! Redirecting to dashboard...");
        navigate("/dashboard");
      } else {
        alert("Invalid email or password.");
      }
    }, 500);
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
              to="/signup"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Don't have an account? Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Welcome <span className="text-gradient">Back</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Continue your journey to career success
            </p>
          </div>

          <div className="bg-background/80 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-[var(--shadow-medium)]"> 

            {/* Divider */}
           
            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={(value) => setFormData({ ...formData, password: value })}
                required
                error={errors.password}
              />

              {/* Forgot Password */}
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="btn-hero w-full"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                    Signing In...
                  </div>
                ) : (
                  <>
                    <Lock className="h-5 w-5 mr-2" />
                    Sign In
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Additional Options */}
            <div className="mt-6 text-center space-y-3">
              <div className="text-sm text-muted-foreground">
                New to SkillForge Hub?{" "}
                <Link to="/signup" className="text-primary hover:text-primary/80 font-medium">
                  Create a free account
                </Link>
              </div>
              
           
            </div>
          </div>

          
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-background/80 backdrop-blur-sm border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="text-sm text-muted-foreground text-center">
              © 2024 SkillForge Hub. All rights reserved.
            </div>
          
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;