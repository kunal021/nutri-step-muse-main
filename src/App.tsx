import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingScreen from "./components/LoadingScreen";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Nutrition = lazy(() => import("./pages/Nutrition"));
const Activity = lazy(() => import("./pages/Activity"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Water = lazy(() => import("./pages/Water"));
const Calendar = lazy(() => import("./pages/Calendar"));
const Advice = lazy(() => import("./pages/Advice"));
const Tips = lazy(() => import("./pages/Tips"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/water" element={<Water />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/advice" element={<Advice />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
