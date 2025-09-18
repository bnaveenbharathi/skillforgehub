import { ArrowDown, UserPlus, Target, Rocket, Trophy } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Your Profile",
      description: "Sign up and tell us about your background, interests, and career goals.",
      step: "01"
    },
    {
      icon: Target,
      title: "Get Your Learning Path",
      description: "Our AI analyzes your profile and creates a personalized learning journey.",
      step: "02"
    },
    {
      icon: Rocket,
      title: "Learn & Build",
      description: "Follow your path, complete projects, and collaborate with peers.",
      step: "03"
    },
    {
      icon: Trophy,
      title: "Land Your Dream Job",
      description: "Showcase your verified skills and connect with top employers.",
      step: "04"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Your Journey to{" "}
            <span className="text-gradient">Success</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Follow our proven 4-step process to transform your career and achieve your professional goals.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Lines - Hidden on mobile */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5">
              <div className="flex items-center justify-between h-full">
                <div className="w-1/4 h-full bg-gradient-to-r from-transparent to-primary/30" />
                <div className="w-1/4 h-full bg-primary/30" />
                <div className="w-1/4 h-full bg-primary/30" />
                <div className="w-1/4 h-full bg-gradient-to-r from-primary/30 to-transparent" />
              </div>
            </div>

            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg z-10">
                  {step.step}
                </div>

                {/* Card */}
                <div className="card-feature text-center relative z-0 pt-8">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/10 to-primary-glow/10 rounded-2xl mx-auto mb-6 group-hover:glow-primary transition-all duration-300">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-8 mb-8">
                    <ArrowDown className="h-6 w-6 text-primary/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Visual */}
        <div className="mt-20 max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-primary/5 via-primary-glow/5 to-primary/5 rounded-3xl p-8 lg:p-12 border border-primary/10">
            <div className="text-center mb-12">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Accelerate Your Learning Journey
              </h3>
              <p className="text-lg text-muted-foreground">
                From beginner to expert in just 6-12 months with our structured approach
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-2xl p-6 mb-4">
                  <div className="text-3xl font-bold text-primary mb-2">0-3</div>
                  <div className="text-sm text-muted-foreground">MONTHS</div>
                </div>
                <h4 className="font-semibold mb-2">Foundation Building</h4>
                <p className="text-sm text-muted-foreground">Core concepts, basic projects, and skill assessment</p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-2xl p-6 mb-4">
                  <div className="text-3xl font-bold text-primary mb-2">3-9</div>
                  <div className="text-sm text-muted-foreground">MONTHS</div>
                </div>
                <h4 className="font-semibold mb-2">Skill Development</h4>
                <p className="text-sm text-muted-foreground">Advanced projects, collaborations, and real-world experience</p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-2xl p-6 mb-4">
                  <div className="text-3xl font-bold text-primary mb-2">9-12</div>
                  <div className="text-sm text-muted-foreground">MONTHS</div>
                </div>
                <h4 className="font-semibold mb-2">Career Launch</h4>
                <p className="text-sm text-muted-foreground">Portfolio showcase, interviews, and job placement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;