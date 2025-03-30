import React, { useState, useEffect } from "react";
import {
  Footprints,
  Flame,
  Heart,
  TrendingUp,
  MapPin,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const Activity = () => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("week"); // Filter for week, month, or year
  const [allActivities, setAllActivities] = useState([
    { date: "2025-03-29", steps: 8500, calories: 450, distance: 6.5 },
    { date: "2025-03-28", steps: 9200, calories: 500, distance: 7.2 },
    { date: "2025-03-27", steps: 7800, calories: 400, distance: 5.8 },
    { date: "2025-03-20", steps: 6000, calories: 350, distance: 4.5 },
    { date: "2025-02-15", steps: 10000, calories: 600, distance: 8.0 },
    { date: "2024-12-25", steps: 12000, calories: 700, distance: 9.5 },
  ]);

  const [filteredActivities, setFilteredActivities] = useState([]);

  const [futureSuggestions, setFutureSuggestions] = useState([
    "Go for a 30-minute walk tomorrow morning.",
    "Try a yoga session this weekend.",
    "Plan a hike for next week.",
  ]);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter activities based on the selected filter
    const now = new Date();
    let filtered = [];

    if (filter === "week") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      filtered = allActivities.filter(
        (activity) => new Date(activity.date) >= oneWeekAgo
      );
    } else if (filter === "month") {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(now.getMonth() - 1);
      filtered = allActivities.filter(
        (activity) => new Date(activity.date) >= oneMonthAgo
      );
    } else if (filter === "year") {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(now.getFullYear() - 1);
      filtered = allActivities.filter(
        (activity) => new Date(activity.date) >= oneYearAgo
      );
    }

    setFilteredActivities(filtered);
  }, [filter, allActivities]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="container mx-auto px-4 py-6">
            {loading ? (
              <div className="space-y-6">
                <Skeleton className="h-8 w-40 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <Card key={i}>
                        <CardHeader>
                          <Skeleton className="h-6 w-28" />
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-12 w-full" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-6">Activity Tracking</h1>

                {/* Filter Section */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium">Overview</h2>
                  <Select
                    onValueChange={(value) => setFilter(value)}
                    value={filter}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Step Count */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-medium flex items-center">
                        <Footprints className="mr-2 h-5 w-5 text-health-blue-500" />
                        Step Count
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">
                              Today
                            </span>
                            <span className="text-sm font-medium">
                              8,543 / 10,000
                            </span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">
                              This Week
                            </span>
                            <span className="text-sm font-medium">
                              45,206 / 70,000
                            </span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Calories Burned */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-medium flex items-center">
                        <Flame className="mr-2 h-5 w-5 text-health-green-500" />
                        Calories Burned
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">
                              Today
                            </span>
                            <span className="text-sm font-medium">
                              467 / 600
                            </span>
                          </div>
                          <Progress value={78} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">
                              This Week
                            </span>
                            <span className="text-sm font-medium">
                              2,845 / 4,200
                            </span>
                          </div>
                          <Progress value={68} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Active Minutes */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-medium flex items-center">
                        <Heart className="mr-2 h-5 w-5 text-red-500" />
                        Active Minutes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">
                              Today
                            </span>
                            <span className="text-sm font-medium">45 / 60</span>
                          </div>
                          <Progress value={75} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">
                              This Week
                            </span>
                            <span className="text-sm font-medium">
                              238 / 420
                            </span>
                          </div>
                          <Progress value={57} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Distance Covered */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-medium flex items-center">
                        <MapPin className="mr-2 h-5 w-5 text-purple-500" />
                        Distance Covered
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">
                              Today
                            </span>
                            <span className="text-sm font-medium">6.8 km</span>
                          </div>
                          <Progress value={68} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">
                              This Week
                            </span>
                            <span className="text-sm font-medium">32.5 km</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Heart Rate */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-medium flex items-center">
                        <TrendingUp className="mr-2 h-5 w-5 text-orange-500" />
                        Heart Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">
                              Average Today
                            </span>
                            <span className="text-sm font-medium">78 bpm</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">
                              Weekly Average
                            </span>
                            <span className="text-sm font-medium">75 bpm</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Past Activities */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-medium flex items-center">
                        <Calendar className="mr-2 h-5 w-5 text-purple-500" />
                        Past Activities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {filteredActivities.length > 0 ? (
                          filteredActivities.map((activity, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center"
                            >
                              <span className="text-sm text-muted-foreground">
                                {activity.date}
                              </span>
                              <span className="text-sm font-medium">
                                {activity.steps} steps, {activity.calories} cal,{" "}
                                {activity.distance} km
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            No activities found for this period.
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Future Suggestions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-medium flex items-center">
                        <TrendingUp className="mr-2 h-5 w-5 text-orange-500" />
                        Future Suggestions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2 text-sm">
                        {futureSuggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Activity;
