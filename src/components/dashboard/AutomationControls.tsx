
import { useState } from "react";
import { DashboardCard } from "./DashboardCard";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { 
  Fan, 
  Lightbulb, 
  Power, 
  Lock, 
  Timer, 
  RotateCcw,
  ToggleLeft,
  ArrowRight
} from "lucide-react";

export function AutomationControls() {
  // System control states
  const [ventilation, setVentilation] = useState(false);
  const [lighting, setLighting] = useState(true);
  const [securityLock, setSecurityLock] = useState(true);
  const [powerSaving, setPowerSaving] = useState(false);
  
  // Parameter control states
  const [ventilationSpeed, setVentilationSpeed] = useState(50);
  const [lightingBrightness, setLightingBrightness] = useState(80);
  const [securityLevel, setSecurityLevel] = useState(2);
  
  // Toggle handlers
  const handleVentilationToggle = (checked: boolean) => {
    setVentilation(checked);
    toast({
      title: `Ventilation system ${checked ? 'activated' : 'deactivated'}`,
      description: checked 
        ? `System running at ${ventilationSpeed}% capacity` 
        : "System now in standby mode",
    });
  };
  
  const handleLightingToggle = (checked: boolean) => {
    setLighting(checked);
    toast({
      title: `Lighting system ${checked ? 'activated' : 'deactivated'}`,
      description: checked 
        ? `Brightness set to ${lightingBrightness}%` 
        : "Lights turned off",
    });
  };
  
  const handleSecurityToggle = (checked: boolean) => {
    setSecurityLock(checked);
    toast({
      title: `Security system ${checked ? 'activated' : 'deactivated'}`,
      description: checked 
        ? `Set to level ${securityLevel}` 
        : "Security features disabled",
      variant: !checked ? "destructive" : "default",
    });
  };
  
  const handlePowerSavingToggle = (checked: boolean) => {
    setPowerSaving(checked);
    toast({
      title: `Power saving mode ${checked ? 'enabled' : 'disabled'}`,
      description: checked 
        ? "Systems will operate at reduced capacity" 
        : "Systems operating at normal capacity",
    });
  };
  
  // Slider handlers
  const handleVentilationSpeedChange = (value: number[]) => {
    setVentilationSpeed(value[0]);
    if (ventilation) {
      toast({
        title: "Ventilation speed adjusted",
        description: `Now running at ${value[0]}% capacity`,
      });
    }
  };
  
  const handleLightingBrightnessChange = (value: number[]) => {
    setLightingBrightness(value[0]);
    if (lighting) {
      toast({
        title: "Lighting brightness adjusted",
        description: `Set to ${value[0]}% intensity`,
      });
    }
  };
  
  const handleSecurityLevelChange = (value: number[]) => {
    setSecurityLevel(value[0]);
    if (securityLock) {
      toast({
        title: "Security level adjusted",
        description: `Now at level ${value[0]}`,
      });
    }
  };
  
  // Reset all controls to default
  const handleReset = () => {
    setVentilation(false);
    setLighting(true);
    setSecurityLock(true);
    setPowerSaving(false);
    setVentilationSpeed(50);
    setLightingBrightness(80);
    setSecurityLevel(2);
    
    toast({
      title: "Systems reset to default",
      description: "All automation controls have been restored to factory settings",
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Automation Controls</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleReset}
          className="h-8 gap-1"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Ventilation Control */}
        <DashboardCard 
          title="Ventilation System" 
          icon={<Fan className="h-5 w-5" />}
          className="animate-slideUp [animation-delay:100ms]"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch 
                  checked={ventilation} 
                  onCheckedChange={handleVentilationToggle}
                  className="data-[state=checked]:bg-primary"
                />
                <span className={ventilation ? "text-foreground" : "text-muted-foreground"}>
                  {ventilation ? "Active" : "Standby"}
                </span>
              </div>
              <div className="text-sm font-medium">
                {ventilationSpeed}% Speed
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Fan Speed</label>
              <Slider
                value={[ventilationSpeed]}
                min={0}
                max={100}
                step={5}
                onValueChange={handleVentilationSpeedChange}
                disabled={!ventilation}
                className={`${!ventilation ? "opacity-50" : ""}`}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Min</span>
                <span>Max</span>
              </div>
            </div>
            
            <div className="pt-2 border-t border-border/50 text-sm text-muted-foreground">
              {ventilation 
                ? `Circulating air at ${ventilationSpeed}% capacity` 
                : "System currently in standby mode"}
            </div>
          </div>
        </DashboardCard>
        
        {/* Lighting Control */}
        <DashboardCard 
          title="Lighting System" 
          icon={<Lightbulb className="h-5 w-5" />}
          className="animate-slideUp [animation-delay:200ms]"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch 
                  checked={lighting} 
                  onCheckedChange={handleLightingToggle}
                  className="data-[state=checked]:bg-primary"
                />
                <span className={lighting ? "text-foreground" : "text-muted-foreground"}>
                  {lighting ? "On" : "Off"}
                </span>
              </div>
              <div className="text-sm font-medium">
                {lightingBrightness}% Brightness
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Brightness</label>
              <Slider
                value={[lightingBrightness]}
                min={5}
                max={100}
                step={5}
                onValueChange={handleLightingBrightnessChange}
                disabled={!lighting}
                className={`${!lighting ? "opacity-50" : ""}`}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
            
            <div className="pt-2 border-t border-border/50 text-sm text-muted-foreground">
              {lighting 
                ? `Illumination set to ${lightingBrightness}% intensity` 
                : "Lighting system currently turned off"}
            </div>
          </div>
        </DashboardCard>
        
        {/* Security Control */}
        <DashboardCard 
          title="Security System" 
          icon={<Lock className="h-5 w-5" />}
          className="animate-slideUp [animation-delay:300ms]"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch 
                  checked={securityLock} 
                  onCheckedChange={handleSecurityToggle}
                  className="data-[state=checked]:bg-primary"
                />
                <span className={securityLock ? "text-foreground" : "text-muted-foreground"}>
                  {securityLock ? "Enabled" : "Disabled"}
                </span>
              </div>
              <div className="text-sm font-medium">
                Level {securityLevel}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Security Level</label>
              <Slider
                value={[securityLevel]}
                min={1}
                max={3}
                step={1}
                onValueChange={handleSecurityLevelChange}
                disabled={!securityLock}
                className={`${!securityLock ? "opacity-50" : ""}`}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Basic</span>
                <span>Standard</span>
                <span>Maximum</span>
              </div>
            </div>
            
            <div className="pt-2 border-t border-border/50 text-sm text-muted-foreground">
              {securityLock 
                ? `Security protocols active at level ${securityLevel}` 
                : "Security measures currently disabled"}
            </div>
          </div>
        </DashboardCard>
        
        {/* Power Saving Control */}
        <DashboardCard 
          title="Power Management" 
          icon={<Power className="h-5 w-5" />}
          className="animate-slideUp [animation-delay:400ms]"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch 
                  checked={powerSaving} 
                  onCheckedChange={handlePowerSavingToggle}
                  className="data-[state=checked]:bg-primary"
                />
                <span className={powerSaving ? "text-foreground" : "text-muted-foreground"}>
                  {powerSaving ? "Eco Mode" : "Normal Mode"}
                </span>
              </div>
            </div>
            
            <div className="pt-2 border-t border-border/50 space-y-2">
              <h4 className="text-sm font-medium">Mode Settings</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className={`p-3 rounded-md border ${!powerSaving ? "border-primary bg-primary/5" : "border-border"}`}>
                  <div className="font-medium mb-1 flex items-center gap-2">
                    <ToggleLeft className="h-4 w-4" />
                    Normal
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Full power to all systems
                  </div>
                </div>
                <div className={`p-3 rounded-md border ${powerSaving ? "border-primary bg-primary/5" : "border-border"}`}>
                  <div className="font-medium mb-1 flex items-center gap-2">
                    <Timer className="h-4 w-4" />
                    Eco
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Reduced power consumption
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-2 border-t border-border/50 text-sm text-muted-foreground">
              {powerSaving 
                ? "Systems optimized for efficiency and reduced power consumption" 
                : "Systems operating at normal power levels"}
            </div>
          </div>
        </DashboardCard>
      </div>
      
      <div className="pt-4 flex justify-end">
        <Button className="gap-1 group">
          Configure Advanced Settings
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </div>
    </div>
  );
}
