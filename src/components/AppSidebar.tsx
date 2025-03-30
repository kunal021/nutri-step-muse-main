import React from "react";
import { useLocation } from "react-router-dom";
import {
  Home,
  Apple,
  Activity,
  User,
  Droplet,
  Calendar,
  MessageSquare,
  Sparkle,
  Bell,
  PanelLeft,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const AppSidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return currentPath === path;
  };

  return (
    <>
      <div className="fixed top-4 right-4 z-50 ">
        <SidebarTrigger />
      </div>
      <Sidebar>
        <SidebarRail />
        <SidebarHeader className="border-b">
          <div className="px-4 py-3 flex items-center justify-between">
            <h1 className="text-xl font-bold text-health-green-600">
              NutriStep
            </h1>
            {/* <SidebarTrigger /> */}
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/")}>
                  <a href="/">
                    <Home className="mr-2" />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Tracking</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/nutrition")}>
                  <a href="/nutrition">
                    <Apple className="mr-2" />
                    <span>Nutrition</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/activity")}>
                  <a href="/activity">
                    <Activity className="mr-2" />
                    <span>Activity</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/water")}>
                  <a href="/water">
                    <Droplet className="mr-2" />
                    <span>Water Intake</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Planning</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/calendar")}>
                  <a href="/calendar">
                    <Calendar className="mr-2" />
                    <span>Calendar</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Guidance</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/advice")}>
                  <a href="/advice">
                    <MessageSquare className="mr-2" />
                    <span>Weight Advice</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/tips")}>
                  <a href="/tips">
                    <Sparkle className="mr-2" />
                    <span>Tips & Tricks</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t">
          {/* <div className="p-4 flex items-center"> */}
          <SidebarMenuButton asChild isActive={isActive("/profile")}>
            <a href="/profile" className="flex items-center">
              <User className="mr-2" />
              <span>Profile</span>
            </a>
          </SidebarMenuButton>

          {/* <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5 text-gray-600" />
            </Button> */}
          {/* </div> */}
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default AppSidebar;
