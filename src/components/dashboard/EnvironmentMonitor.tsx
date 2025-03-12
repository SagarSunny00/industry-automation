
import { useState, useEffect } from "react";
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  AlertCircle, 
  BadgeCheck, 
  RefreshCcw 
} from "lucide-react";
import { DashboardCard } from "./DashboardCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Mock data function to simulate sensor readings
const generateMockData = () => {
  return {
    temperature: parseFloat((Math.random() * 15 + 20).toFixed(1)), // 20-35°C
    humidity: parseFloat((Math.random() * 30 + 40).toFixed(1)),   // 40-70%
    airQuality: parseFloat((Math.random() * 100).toFixed(1)),     // 0-100 (lower is better)
    pressure: parseFloat((Math.random() * 10 + 990).toFixed(1)),  // 990-1000 hPa
    noise: parseFloat((Math.random() * 30 + 50).toFixed(1)),      // 50-80 dB
  };
};

export function EnvironmentMonitor() {
  const [sensorData, setSensorData] = useState(generateMockData());
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Function to refresh data
  const refreshData = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setSensorData(generateMockData());
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 800);
  };

  // Initial data load
  useEffect(() => {
    refreshData();
    
    // Refresh data every 60 seconds
    const interval = setInterval(refreshData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Helper to format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Helper to determine status colors
  const getStatusInfo = (
    value: number, 
    thresholds: { optimal: [number, number], warning: [number, number] }
  ) => {
    if (
      value >= thresholds.optimal[0] && 
      value <= thresholds.optimal[1]
    ) {
      return { color: "text-green-500", status: "Optimal" };
    } else if (
      value >= thresholds.warning[0] && 
      value <= thresholds.warning[1]
    ) {
      return { color: "text-amber-500", status: "Warning" };
    } else {
      return { color: "text-destructive", status: "Critical" };
    }
  };

  // Calculate statuses
  const temperatureStatus = getStatusInfo(sensorData.temperature, {
    optimal: [22, 26],
    warning: [18, 30]
  });
  
  const humidityStatus = getStatusInfo(sensorData.humidity, {
    optimal: [40, 60],
    warning: [30, 70]
  });
  
  const airQualityStatus = getStatusInfo(sensorData.airQuality, {
    optimal: [0, 50],
    warning: [50, 75]
  });

  // Calculate overall system status
  const allStatuses = [temperatureStatus, humidityStatus, airQualityStatus];
  const hasCritical = allStatuses.some(s => s.status === "Critical");
  const hasWarning = allStatuses.some(s => s.status === "Warning");
  
  const systemStatus = hasCritical 
    ? "Critical" 
    : hasWarning 
      ? "Warning" 
      : "Optimal";

  const systemStatusColor = 
    systemStatus === "Critical" 
      ? "text-destructive" 
      : systemStatus === "Warning" 
        ? "text-amber-500" 
        : "text-green-500";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Environment Monitoring</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            Last updated: {formatTime(lastUpdated)}
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshData}
            disabled={isLoading}
            className="h-8 px-2"
          >
            <RefreshCcw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Temperature Card */}
        <DashboardCard 
          title="Temperature" 
          icon={<Thermometer className="h-5 w-5" />}
          className="animate-slideUp [animation-delay:100ms]"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-3xl font-semibold">
                {sensorData.temperature}°C
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`flex items-center gap-1 ${temperatureStatus.color}`}>
                      {temperatureStatus.status === "Optimal" ? (
                        <BadgeCheck className="h-5 w-5" />
                      ) : (
                        <AlertCircle className="h-5 w-5" />
                      )}
                      <span className="text-sm font-medium">{temperatureStatus.status}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Optimal range: 22-26°C</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>15°C</span>
                <span>25°C</span>
                <span>35°C</span>
              </div>
              <Progress 
                value={(sensorData.temperature - 15) / (35 - 15) * 100} 
                className="h-2" 
              />
            </div>
          </div>
        </DashboardCard>

        {/* Humidity Card */}
        <DashboardCard 
          title="Humidity" 
          icon={<Droplets className="h-5 w-5" />}
          className="animate-slideUp [animation-delay:200ms]"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-3xl font-semibold">
                {sensorData.humidity}%
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`flex items-center gap-1 ${humidityStatus.color}`}>
                      {humidityStatus.status === "Optimal" ? (
                        <BadgeCheck className="h-5 w-5" />
                      ) : (
                        <AlertCircle className="h-5 w-5" />
                      )}
                      <span className="text-sm font-medium">{humidityStatus.status}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Optimal range: 40-60%</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>30%</span>
                <span>50%</span>
                <span>70%</span>
              </div>
              <Progress 
                value={(sensorData.humidity - 30) / (70 - 30) * 100} 
                className="h-2" 
              />
            </div>
          </div>
        </DashboardCard>

        {/* Air Quality Card */}
        <DashboardCard 
          title="Air Quality" 
          icon={<Wind className="h-5 w-5" />}
          className="animate-slideUp [animation-delay:300ms]"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-3xl font-semibold">
                {sensorData.airQuality.toFixed(0)}
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`flex items-center gap-1 ${airQualityStatus.color}`}>
                      {airQualityStatus.status === "Optimal" ? (
                        <BadgeCheck className="h-5 w-5" />
                      ) : (
                        <AlertCircle className="h-5 w-5" />
                      )}
                      <span className="text-sm font-medium">{airQualityStatus.status}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Optimal range: 0-50</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
              <Progress 
                value={sensorData.airQuality} 
                className="h-2" 
              />
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* System Status Summary */}
      <div className="mt-6 flex items-center justify-between bg-accent/50 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-2 ${systemStatusColor}`}>
            {systemStatus === "Optimal" ? (
              <BadgeCheck className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span className="font-medium">System Status: {systemStatus}</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {systemStatus === "Optimal" 
            ? "All systems within optimal parameters"
            : systemStatus === "Warning"
              ? "Some parameters require attention"
              : "Critical issues detected - action required"
          }
        </div>
      </div>
    </div>
  );
}
