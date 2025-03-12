
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight,
  ChevronRight, 
  Factory, 
  BarChart3, 
  Gauge, 
  Thermometer,
  Shield,
  Zap
} from "lucide-react";

const Index = () => {
  // Add scroll reveal effect
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slideUp');
          entry.target.classList.remove('opacity-0');
          entry.target.classList.remove('translate-y-10');
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Next-generation automation platform
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Intelligent Industry Environment Automation
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl">
              Transform your industrial environment with our cutting-edge automation system. 
              Monitor, control, and optimize all aspects of your facility from a single dashboard.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/signup">
                <Button size="lg" className="gap-1 group">
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="gap-1 group">
                  Sign In
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Powerful Features, Intuitive Interface
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Our automation system combines powerful monitoring capabilities with 
              simple, elegant controls for maximum efficiency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-card rounded-xl shadow-subtle border border-border/50 opacity-0 translate-y-10 reveal">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Thermometer className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Environmental Monitoring</h3>
              </div>
              <p className="text-muted-foreground">
                Real-time tracking of temperature, humidity, air quality, and more. 
                Get instant alerts when conditions fall outside optimal ranges.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="p-6 bg-card rounded-xl shadow-subtle border border-border/50 opacity-0 translate-y-10 reveal [animation-delay:100ms]">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Gauge className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Intuitive Controls</h3>
              </div>
              <p className="text-muted-foreground">
                Simple, elegant controls to manage ventilation, lighting, security, 
                and power settings from a sleek, responsive dashboard.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="p-6 bg-card rounded-xl shadow-subtle border border-border/50 opacity-0 translate-y-10 reveal [animation-delay:200ms]">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Data Analytics</h3>
              </div>
              <p className="text-muted-foreground">
                Comprehensive data visualization and analytics to help you understand 
                trends and optimize for efficiency and comfort.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="p-6 bg-card rounded-xl shadow-subtle border border-border/50 opacity-0 translate-y-10 reveal [animation-delay:300ms]">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Advanced Security</h3>
              </div>
              <p className="text-muted-foreground">
                Multi-level security system with customizable protocols to protect 
                your facility and ensure only authorized access.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="p-6 bg-card rounded-xl shadow-subtle border border-border/50 opacity-0 translate-y-10 reveal [animation-delay:400ms]">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Energy Efficiency</h3>
              </div>
              <p className="text-muted-foreground">
                Smart power management with eco mode to reduce consumption without 
                sacrificing performance or comfort.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="p-6 bg-card rounded-xl shadow-subtle border border-border/50 opacity-0 translate-y-10 reveal [animation-delay:500ms]">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Factory className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Industrial Integration</h3>
              </div>
              <p className="text-muted-foreground">
                Seamlessly integrates with existing industrial systems and equipment 
                for a unified control experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="rounded-2xl bg-gradient-to-r from-primary/80 to-primary p-8 md:p-10 text-white shadow-lg">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-4 max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Ready to transform your industrial environment?
                </h2>
                <p className="text-lg text-white/90">
                  Join thousands of facilities worldwide using our automation system to 
                  increase efficiency, improve safety, and reduce costs.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="text-primary gap-1 group shadow-sm hover:shadow-md transition-shadow"
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-white border-white/40 hover:bg-white/10 gap-1 group"
                  >
                    Sign In
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
