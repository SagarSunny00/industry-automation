
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  icon?: ReactNode;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
}

export function DashboardCard({ 
  title, 
  icon, 
  className, 
  contentClassName, 
  children 
}: DashboardCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 shadow-subtle hover:shadow-glass", 
      className
    )}>
      <CardHeader className="p-4 sm:p-6 flex flex-row items-center space-y-0 gap-2 bg-accent/40">
        {icon && <span className="text-primary">{icon}</span>}
        <CardTitle className="text-base sm:text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className={cn("p-4 sm:p-6", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}
