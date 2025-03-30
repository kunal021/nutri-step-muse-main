import React, { useState, useEffect } from "react";
import { Droplet, Plus, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Assuming you have a Select component

const Water = () => {
  const [loading, setLoading] = useState(true);
  const [waterIntake, setWaterIntake] = useState(4);
  const [unit, setUnit] = useState("cups"); // cups or ml
  const [waterGoal, setWaterGoal] = useState(8); // Default goal
  const [customGoal, setCustomGoal] = useState(""); // For custom input

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const addWater = () => {
    if (unit === "cups" && waterIntake < waterGoal * 2) {
      setWaterIntake((prev) => prev + 1);
    } else if (unit === "ml" && waterIntake < waterGoal * 2) {
      setWaterIntake((prev) => prev + 100); // Increment by 100ml
    }
  };

  const removeWater = () => {
    if (waterIntake > 0) {
      setWaterIntake((prev) => (unit === "cups" ? prev - 1 : prev - 100));
    }
  };

  const handleUnitChange = (value: string) => {
    setUnit(value);
    setWaterIntake(0); // Reset intake when unit changes
    setWaterGoal(value === "cups" ? 8 : 2000); // Default goal for cups or ml
  };

  const handleGoalChange = (value: string) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue)) {
      setWaterGoal(parsedValue);
    }
  };

  const waterPercentage = (waterIntake / waterGoal) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Water Intake</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {loading ? (
                <>
                  <Skeleton className="h-64 lg:col-span-1" />
                  <Skeleton className="h-64 lg:col-span-2" />
                </>
              ) : (
                <>
                  <Card className="lg:col-span-1">
                    <CardHeader>
                      <CardTitle className="text-lg font-medium flex items-center">
                        <Droplet className="mr-2 h-5 w-5 text-health-blue-500" />
                        Today's Intake
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center">
                        <div className="relative mb-4">
                          <div className="w-32 h-32 border-4 border-health-blue-500 rounded-full flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-3xl font-bold text-health-blue-500">
                                {unit === "cups"
                                  ? waterIntake
                                  : waterIntake + " ml"}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                of{" "}
                                {unit === "cups"
                                  ? waterGoal
                                  : waterGoal + " ml"}
                              </div>
                            </div>
                          </div>
                          <div
                            className="absolute bottom-0 left-0 right-0 bg-health-blue-200 rounded-full overflow-hidden transition-all"
                            style={{
                              height: `${Math.min(100, waterPercentage)}%`,
                              opacity: 0.3,
                            }}
                          ></div>
                        </div>

                        <div className="flex items-center gap-4 mt-4">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={removeWater}
                            disabled={waterIntake === 0}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={addWater}
                            className="bg-health-blue-500 hover:bg-health-blue-600"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Water
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg font-medium">
                        Water Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <label className="text-sm font-medium">Unit:</label>
                          <Select
                            onValueChange={(value) => handleUnitChange(value)}
                            value={unit}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Select Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cups">Cups</SelectItem>
                              <SelectItem value="ml">
                                Milliliters (ml)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center gap-4">
                          <label className="text-sm font-medium">
                            Set Goal:
                          </label>
                          <Select
                            onValueChange={(value) => handleGoalChange(value)}
                            value={waterGoal.toString()}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Select Goal" />
                            </SelectTrigger>
                            <SelectContent>
                              {unit === "cups" ? (
                                <>
                                  <SelectItem value="6">6 cups</SelectItem>
                                  <SelectItem value="8">8 cups</SelectItem>
                                  <SelectItem value="10">10 cups</SelectItem>
                                </>
                              ) : (
                                <>
                                  <SelectItem value="1500">1500 ml</SelectItem>
                                  <SelectItem value="2000">2000 ml</SelectItem>
                                  <SelectItem value="2500">2500 ml</SelectItem>
                                </>
                              )}
                            </SelectContent>
                          </Select>
                          <input
                            type="number"
                            placeholder="Custom Goal"
                            value={customGoal}
                            onChange={(e) => setCustomGoal(e.target.value)}
                            onBlur={() => handleGoalChange(customGoal)}
                            className="border rounded px-2 py-1 text-sm"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg font-medium">
                        Water History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Today</span>
                            <span>4 / 8 cups</span>
                          </div>
                          <Progress
                            value={(4 / 8) * 100}
                            className="h-2 mt-1"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Yesterday</span>
                            <span>6 / 8 cups</span>
                          </div>
                          <Progress
                            value={(6 / 8) * 100}
                            className="h-2 mt-1"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>2 days ago</span>
                            <span>7 / 8 cups</span>
                          </div>
                          <Progress
                            value={(7 / 8) * 100}
                            className="h-2 mt-1"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>3 days ago</span>
                            <span>5 / 8 cups</span>
                          </div>
                          <Progress
                            value={(5 / 8) * 100}
                            className="h-2 mt-1"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg font-medium">
                        Water Intake Tips
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>Drink a glass of water when you wake up</li>
                        <li>Keep a water bottle with you throughout the day</li>
                        <li>Set reminders to drink water every hour</li>
                        <li>Drink a glass of water before each meal</li>
                      </ul>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Water;
