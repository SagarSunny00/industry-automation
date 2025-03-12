
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, 
  Menu, 
  X, 
  Settings, 
  LogOut,
  Factory
} from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Check if user is logged in based on localStorage
  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, [location]);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out-expo ${
        isScrolled || isMobileMenuOpen
          ? "py-3 bg-white/80 dark:bg-black/50 backdrop-blur-xl shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-xl font-semibold"
        >
          <Factory className="h-6 w-6 text-primary animate-float" />
          <span className="relative">
            <span className="animate-fadeIn">IndustryAutomation</span>
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary/20 rounded-full"></span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/settings">
                <Settings className="w-4 h-4 mr-1" />
                Settings
              </NavLink>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="flex items-center gap-1 text-muted-foreground hover:text-destructive"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/login">Sign In</NavLink>
              <Link to="/signup">
                <Button 
                  className="px-4 gap-1 group" 
                  size="sm"
                >
                  Get Started
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5 animate-fadeIn" />
          ) : (
            <Menu className="h-5 w-5 animate-fadeIn" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[57px] bg-background/95 backdrop-blur-lg z-30 animate-fadeIn md:hidden">
          <nav className="flex flex-col items-center justify-center h-full gap-6 pb-20">
            {isLoggedIn ? (
              <>
                <MobileNavLink 
                  to="/dashboard" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </MobileNavLink>
                <MobileNavLink 
                  to="/settings" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Settings
                </MobileNavLink>
                <Button 
                  variant="destructive" 
                  onClick={handleLogout}
                  className="mt-4"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <MobileNavLink 
                  to="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </MobileNavLink>
                <MobileNavLink 
                  to="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </MobileNavLink>
                <Link 
                  to="/signup" 
                  className="w-full max-w-[200px]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button className="w-full mt-4">
                    Create Account
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

// Desktop navigation link
function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`relative px-1 py-1.5 text-sm font-medium transition-colors flex items-center ${
        isActive 
          ? "text-foreground" 
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
      )}
    </Link>
  );
}

// Mobile navigation link
function MobileNavLink({ 
  to, 
  onClick,
  children 
}: { 
  to: string; 
  onClick: () => void;
  children: React.ReactNode 
}) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`text-2xl font-medium transition-colors ${
        isActive 
          ? "text-primary" 
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}
