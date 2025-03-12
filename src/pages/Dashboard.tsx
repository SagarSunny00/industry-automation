
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EnvironmentMonitor } from "@/components/dashboard/EnvironmentMonitor";
import { AutomationControls } from "@/components/dashboard/AutomationControls";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  ChevronDown, 
  Gauge, 
  Sliders, 
  BarChart3, 
  Settings, 
  Bell,
  Users,
  Calendar
} from "lucide-react";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    
    if (!user) {
      navigate("/login");
      return;
    }
    
    try {
      const userData = JSON.parse(user);
      setUserName(userData.name || "User");
    } catch (error) {
      // If there's an error parsing user data, redirect to login
      navigate("/login");
    }
  }, [navigate]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-20 pb-16">
        <div className="container px-4 md:px-6 pt-6 md:pt-10">
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Welcome back, {userName}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
                </button>
              </div>
              <button className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors">
                Quick Actions
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="space-y-6">
            {/* Dashboard Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full sm:w-auto bg-background border border-border rounded-lg h-auto p-1 overflow-x-auto">
                <TabsTrigger value="overview" className="flex items-center gap-1 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Gauge className="h-4 w-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="controls" className="flex items-center gap-1 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Sliders className="h-4 w-4" />
                  <span>Controls</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-1 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <BarChart3 className="h-4 w-4" />
                  <span>Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="team" className="flex items-center gap-1 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Users className="h-4 w-4" />
                  <span>Team</span>
                </TabsTrigger>
                <TabsTrigger value="schedule" className="flex items-center gap-1 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Schedule</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-1 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Tab Content */}
              <TabsContent value="overview" className="mt-6 animate-fadeIn">
                <div className="space-y-8">
                  <EnvironmentMonitor />
                </div>
              </TabsContent>
              
              <TabsContent value="controls" className="mt-6 animate-fadeIn">
                <div className="space-y-8">
                  <AutomationControls />
                </div>
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-6 animate-fadeIn">
                <div className="flex items-center justify-center h-64 bg-accent/30 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Analytics Module</h3>
                    <p className="text-muted-foreground max-w-md">
                      Detailed analytics and reporting features will be available in the next update.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="team" className="mt-6 animate-fadeIn">
                <div className="flex items-center justify-center h-64 bg-accent/30 rounded-lg">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Team Management</h3>
                    <p className="text-muted-foreground max-w-md">
                      Team management and collaboration features will be available in the next update.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="schedule" className="mt-6 animate-fadeIn">
                <div className="flex items-center justify-center h-64 bg-accent/30 rounded-lg">
                  <div className="text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Schedule Module</h3>
                    <p className="text-muted-foreground max-w-md">
                      Scheduling and automation timing features will be available in the next update.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="mt-6 animate-fadeIn">
                <div className="flex items-center justify-center h-64 bg-accent/30 rounded-lg">
                  <div className="text-center">
                    <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">System Settings</h3>
                    <p className="text-muted-foreground max-w-md">
                      Advanced system configuration options will be available in the next update.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
