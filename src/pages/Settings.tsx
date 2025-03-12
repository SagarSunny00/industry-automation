
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  User,
  Bell,
  Shield,
  Pencil,
  Save,
  Loader2
} from "lucide-react";

interface UserData {
  name: string;
  email: string;
}

const Settings = () => {
  const [userData, setUserData] = useState<UserData>({ name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<UserData>({ name: "", email: "" });
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    systemNotifications: true,
    criticalAlerts: true,
    weeklyReports: false,
  });
  const navigate = useNavigate();
  
  // Check if user is logged in and load user data
  useEffect(() => {
    const user = localStorage.getItem("user");
    
    if (!user) {
      navigate("/login");
      return;
    }
    
    try {
      const parsedUserData = JSON.parse(user) as UserData;
      setUserData(parsedUserData);
      setFormData(parsedUserData);
    } catch (error) {
      navigate("/login");
    }
  }, [navigate]);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle notification settings changes
  const handleNotificationChange = (key: keyof typeof notificationSettings, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }));
  };
  
  // Handle save profile
  const handleSaveProfile = () => {
    setIsSaving(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Update local storage
      localStorage.setItem("user", JSON.stringify(formData));
      
      // Update state
      setUserData(formData);
      setIsEditing(false);
      setIsSaving(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been successfully updated.",
      });
    }, 1000);
  };
  
  // Handle save notification settings
  const handleSaveNotifications = () => {
    setIsSaving(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsSaving(false);
      
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
      });
    }, 1000);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-20 pb-16">
        <div className="container px-4 md:px-6 pt-6 md:pt-10">
          {/* Settings Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your account and preferences
            </p>
          </div>
          
          {/* Settings Tabs */}
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="w-full sm:w-auto bg-background border border-border rounded-lg h-auto p-1">
              <TabsTrigger value="profile" className="flex items-center gap-1 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-1 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-1 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Shield className="h-4 w-4" />
                <span>Security</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-6 animate-fadeIn">
              <div className="bg-card border border-border rounded-lg shadow-subtle overflow-hidden">
                <div className="p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">Profile Information</h2>
                    <p className="text-muted-foreground">
                      Manage your personal information and account details
                    </p>
                  </div>
                  
                  {!isEditing ? (
                    <Button 
                      variant="outline" 
                      className="self-start gap-1"
                      onClick={() => setIsEditing(true)}
                    >
                      <Pencil className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2 self-start">
                      <Button 
                        variant="ghost" 
                        onClick={() => {
                          setIsEditing(false);
                          setFormData(userData);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="gap-1"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="border-t border-border p-6">
                  <div className="max-w-2xl space-y-4">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="input-clean"
                        />
                      ) : (
                        <div className="p-2 bg-background/50 rounded-md border border-border/50">
                          {userData.name}
                        </div>
                      )}
                    </div>
                    
                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="input-clean"
                        />
                      ) : (
                        <div className="p-2 bg-background/50 rounded-md border border-border/50">
                          {userData.email}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Notifications Tab */}
            <TabsContent value="notifications" className="mt-6 animate-fadeIn">
              <div className="bg-card border border-border rounded-lg shadow-subtle overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold">Notification Preferences</h2>
                  <p className="text-muted-foreground">
                    Manage how you receive alerts and notifications
                  </p>
                </div>
                
                <div className="border-t border-border p-6">
                  <div className="max-w-2xl space-y-4">
                    {/* Email Alerts */}
                    <div className="flex items-center justify-between py-3">
                      <div className="space-y-0.5">
                        <h3 className="font-medium">Email Alerts</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive important alerts via email
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.emailAlerts}
                        onCheckedChange={(checked) => 
                          handleNotificationChange("emailAlerts", checked)
                        }
                      />
                    </div>
                    
                    {/* System Notifications */}
                    <div className="flex items-center justify-between py-3 border-t border-border/50">
                      <div className="space-y-0.5">
                        <h3 className="font-medium">System Notifications</h3>
                        <p className="text-sm text-muted-foreground">
                          Show notifications in the dashboard
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.systemNotifications}
                        onCheckedChange={(checked) => 
                          handleNotificationChange("systemNotifications", checked)
                        }
                      />
                    </div>
                    
                    {/* Critical Alerts */}
                    <div className="flex items-center justify-between py-3 border-t border-border/50">
                      <div className="space-y-0.5">
                        <h3 className="font-medium">Critical Alerts</h3>
                        <p className="text-sm text-muted-foreground">
                          Get immediate notifications for critical issues
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.criticalAlerts}
                        onCheckedChange={(checked) => 
                          handleNotificationChange("criticalAlerts", checked)
                        }
                      />
                    </div>
                    
                    {/* Weekly Reports */}
                    <div className="flex items-center justify-between py-3 border-t border-border/50">
                      <div className="space-y-0.5">
                        <h3 className="font-medium">Weekly Reports</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive weekly summary reports via email
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.weeklyReports}
                        onCheckedChange={(checked) => 
                          handleNotificationChange("weeklyReports", checked)
                        }
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-border p-6 flex justify-end">
                  <Button 
                    onClick={handleSaveNotifications}
                    disabled={isSaving}
                    className="gap-1"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Preferences
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Security Tab */}
            <TabsContent value="security" className="mt-6 animate-fadeIn">
              <div className="bg-card border border-border rounded-lg shadow-subtle overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold">Security Settings</h2>
                  <p className="text-muted-foreground">
                    Manage your password and security preferences
                  </p>
                </div>
                
                <div className="border-t border-border p-6">
                  <div className="flex items-center justify-center h-40">
                    <p className="text-muted-foreground">
                      Security settings will be available in the next update.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
