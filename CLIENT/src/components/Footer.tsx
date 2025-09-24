import { BookOpen, Mail, Phone, MapPin, Github, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    platform: [
      { name: "Features", href: "#features" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Pricing", href: "#pricing" },
      { name: "Success Stories", href: "#testimonials" }
    ],
    resources: [
      { name: "Blog", href: "#" },
      { name: "Documentation", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "Community", href: "#" }
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "Contact", href: "#" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "GDPR", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Instagram, href: "#", label: "Instagram" }
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-accent/20 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        

        {/* Bottom Section */}
        <div className="py-8 border-t border-border/50">
          <div className="flex justify-center gap-10">
            
            {/* Copyright */}
            <div className="text-muted-foreground text-sm text-center">
              © 2025 SkillForge Hub. All rights reserved.
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
  );
};

export default Footer;