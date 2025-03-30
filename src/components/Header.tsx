
import React from 'react';
import { Bell, User, Menu, Droplet, Calendar, MessageSquare, Sparkle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isActive = (path: string) => {
    return currentPath === path;
  };
  
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <a href="/" className={`px-4 py-2 hover:bg-gray-100 rounded-md transition-colors ${isActive('/') ? 'bg-gray-100 font-medium text-health-green-600' : ''}`}>Dashboard</a>
                  <a href="/nutrition" className={`px-4 py-2 hover:bg-gray-100 rounded-md transition-colors ${isActive('/nutrition') ? 'bg-gray-100 font-medium text-health-green-600' : ''}`}>Nutrition</a>
                  <a href="/activity" className={`px-4 py-2 hover:bg-gray-100 rounded-md transition-colors ${isActive('/activity') ? 'bg-gray-100 font-medium text-health-green-600' : ''}`}>Activity</a>
                  <a href="/water" className={`px-4 py-2 hover:bg-gray-100 rounded-md transition-colors ${isActive('/water') ? 'bg-gray-100 font-medium text-health-green-600' : ''}`}>
                    <span className="flex items-center">
                      <Droplet className="h-4 w-4 mr-2" />
                      Water Intake
                    </span>
                  </a>
                  <a href="/calendar" className={`px-4 py-2 hover:bg-gray-100 rounded-md transition-colors ${isActive('/calendar') ? 'bg-gray-100 font-medium text-health-green-600' : ''}`}>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Calendar
                    </span>
                  </a>
                  <a href="/advice" className={`px-4 py-2 hover:bg-gray-100 rounded-md transition-colors ${isActive('/advice') ? 'bg-gray-100 font-medium text-health-green-600' : ''}`}>
                    <span className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Weight Advice
                    </span>
                  </a>
                  <a href="/tips" className={`px-4 py-2 hover:bg-gray-100 rounded-md transition-colors ${isActive('/tips') ? 'bg-gray-100 font-medium text-health-green-600' : ''}`}>
                    <span className="flex items-center">
                      <Sparkle className="h-4 w-4 mr-2" />
                      Tips & Tricks
                    </span>
                  </a>
                  <a href="/profile" className={`px-4 py-2 hover:bg-gray-100 rounded-md transition-colors ${isActive('/profile') ? 'bg-gray-100 font-medium text-health-green-600' : ''}`}>Profile</a>
                </nav>
              </SheetContent>
            </Sheet>
          )}
          <h1 className="text-xl font-bold text-health-green-600">NutriStep</h1>
        </div>
        
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className={`hover:text-health-green-600 transition-colors ${isActive('/') ? 'font-medium text-health-green-600' : 'text-gray-600'}`}>Dashboard</a>
            <a href="/nutrition" className={`hover:text-health-green-600 transition-colors ${isActive('/nutrition') ? 'font-medium text-health-green-600' : 'text-gray-600'}`}>Nutrition</a>
            <a href="/activity" className={`hover:text-health-green-600 transition-colors ${isActive('/activity') ? 'font-medium text-health-green-600' : 'text-gray-600'}`}>Activity</a>
            <a href="/water" className={`hover:text-health-green-600 transition-colors ${isActive('/water') ? 'font-medium text-health-green-600' : 'text-gray-600'}`}>
              <span className="flex items-center">
                <Droplet className="h-4 w-4 mr-1" />
                Water
              </span>
            </a>
            <a href="/calendar" className={`hover:text-health-green-600 transition-colors ${isActive('/calendar') ? 'font-medium text-health-green-600' : 'text-gray-600'}`}>
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Calendar
              </span>
            </a>
            <a href="/advice" className={`hover:text-health-green-600 transition-colors ${isActive('/advice') ? 'font-medium text-health-green-600' : 'text-gray-600'}`}>
              <span className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                Advice
              </span>
            </a>
            <a href="/tips" className={`hover:text-health-green-600 transition-colors ${isActive('/tips') ? 'font-medium text-health-green-600' : 'text-gray-600'}`}>
              <span className="flex items-center">
                <Sparkle className="h-4 w-4 mr-1" />
                Tips
              </span>
            </a>
            <a href="/profile" className={`hover:text-health-green-600 transition-colors ${isActive('/profile') ? 'font-medium text-health-green-600' : 'text-gray-600'}`}>Profile</a>
          </nav>
        )}
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-gray-100">
            <User className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
