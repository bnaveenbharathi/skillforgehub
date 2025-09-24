import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      image: "SC",
      content: "SkillForge Hub transformed my career completely. The AI-powered learning path helped me transition from marketing to software engineering in just 8 months. The hands-on projects and mock interviews were game-changers.",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Data Scientist at Microsoft",
      image: "MJ", 
      content: "The collaborative projects and peer learning environment at SkillForge Hub are unmatched. I built real solutions for actual companies and gained the confidence to land my dream job at Microsoft.",
      rating: 5
    },
    
  ];

  return (
    <section id="testimonials" className="py-20 section-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Success Stories from Our{" "}
            <span className="text-gradient">Community</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of professionals who have transformed their careers with SkillForge Hub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card-testimonial"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-full flex items-center justify-center text-primary font-semibold">
                    {testimonial.image}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
                <Quote className="h-6 w-6 text-primary/30 flex-shrink-0" />
              </div>
              <p className="text-muted-foreground leading-relaxed italic">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default Testimonials;