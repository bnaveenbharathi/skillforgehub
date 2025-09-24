import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";

const CTA = () => {
  const benefits = [
    "14-day free trial",
    "Cancel anytime",
    "AI-powered learning paths",
    "1-on-1 mentorship included"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary-glow/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-primary/10 shadow-[var(--shadow-strong)] relative overflow-hidden">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full" />
              <div className="absolute bottom-10 right-10 w-16 h-16 bg-primary-glow rounded-full" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/50 rounded-full" />
            </div>

            <div className="relative z-10 text-center">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Sparkles className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm font-medium text-primary">Limited Time Offer</span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Ready to Transform Your{" "}
                <span className="text-gradient">Career?</span>
              </h2>

              {/* Subtext */}
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of professionals who have already accelerated their careers with SkillForge Hub. 
                Start your journey today with our AI-powered platform.
              </p>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-lg mx-auto">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center justify-start sm:justify-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button className="btn-hero w-full sm:w-auto text-lg px-8 py-4">
                  Start Free Trial
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <Button variant="outline" className="btn-hero-outline w-full sm:w-auto">
                  Schedule Demo
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Trusted by students from top universities
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 opacity-60">
                  <span className="text-lg font-semibold">MIT</span>
                  <span className="text-lg font-semibold">Stanford</span>
                  <span className="text-lg font-semibold">Harvard</span>
                  <span className="text-lg font-semibold">Berkeley</span>
                  <span className="text-lg font-semibold">Carnegie Mellon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;