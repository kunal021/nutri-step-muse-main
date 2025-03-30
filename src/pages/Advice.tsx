import React, { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, ArrowUp, ArrowDown, BarChart4 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

// Form schema for the calculator
const formSchema = z.object({
  currentWeight: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Weight must be a positive number",
    }),
  targetWeight: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Weight must be a positive number",
    }),
  height: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Height must be a positive number",
  }),
  age: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) < 120,
      {
        message: "Age must be between 1 and 120",
      }
    ),
  gender: z.enum(["male", "female"]),
  activityLevel: z.enum([
    "sedentary",
    "light",
    "moderate",
    "active",
    "very-active",
  ]),
});

const activityLevels = {
  sedentary: "Sedentary (little or no exercise)",
  light: "Light (1-3 days/week)",
  moderate: "Moderate (3-5 days/week)",
  active: "Active (6-7 days/week)",
  "very-active": "Very Active (2x per day)",
};

type FormValues = z.infer<typeof formSchema>;

// Predefined weight loss advice
const weightLossAdvice = [
  {
    title: "Create a Calorie Deficit",
    description:
      "Aim for a sustainable calorie deficit of 500-1000 calories per day to lose 1-2 pounds per week. Track your food intake using a food diary or app.",
  },
  {
    title: "Focus on Protein",
    description:
      "Increase protein intake to 1.6-2.2g per kg of body weight to preserve muscle mass while losing fat and help control hunger.",
  },
  {
    title: "Strength Training",
    description:
      "Include resistance training 2-3 times per week to maintain muscle mass while losing weight.",
  },
  {
    title: "Increase Daily Activity",
    description:
      "Add more movement throughout your day - take the stairs, walk during lunch breaks, or stand while working.",
  },
  {
    title: "Prioritize Sleep",
    description:
      "Aim for 7-9 hours of quality sleep per night to regulate hunger hormones and support recovery.",
  },
];

// Predefined weight gain advice
const weightGainAdvice = [
  {
    title: "Calorie Surplus",
    description:
      "Consume 300-500 calories above your daily maintenance level for steady, lean weight gain.",
  },
  {
    title: "Protein Distribution",
    description:
      "Spread protein intake evenly across 4-6 meals daily, aiming for 1.6-2.2g per kg of body weight.",
  },
  {
    title: "Progressive Overload",
    description:
      "Gradually increase workout intensity with heavier weights or more repetitions to stimulate muscle growth.",
  },
  {
    title: "Recovery Nutrition",
    description:
      "Consume a meal with protein and carbohydrates within 45 minutes after training to optimize recovery.",
  },
  {
    title: "Consistency Over Quantity",
    description:
      "Maintain a consistent eating schedule rather than forcing excessive food intake in fewer meals.",
  },
];

const Advice: React.FC = () => {
  const [calculationResult, setCalculationResult] = useState<{
    dailyCalories: number;
    targetCalories: number;
    timeToGoal: number;
    advice: string;
  } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentWeight: "",
      targetWeight: "",
      height: "",
      age: "",
      gender: "male",
      activityLevel: "moderate",
    },
  });

  // Calculate daily calories needed
  const calculateDailyCalories = (values: FormValues) => {
    const { currentWeight, targetWeight, height, age, gender, activityLevel } =
      values;

    // Convert string inputs to numbers
    const weightKg = parseFloat(currentWeight);
    const targetWeightKg = parseFloat(targetWeight);
    const heightCm = parseFloat(height);
    const ageYears = parseInt(age);

    // Calculate BMR using Mifflin-St Jeor equation
    let bmr;
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161;
    }

    // Apply activity multiplier
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      "very-active": 1.9,
    };

    const maintenanceCalories =
      bmr *
      activityMultipliers[activityLevel as keyof typeof activityMultipliers];

    // Determine if weight loss or gain is needed
    const isWeightLoss = targetWeightKg < weightKg;

    // Calculate target calories
    const targetCalories = isWeightLoss
      ? maintenanceCalories - 500 // Deficit for weight loss
      : maintenanceCalories + 500; // Surplus for weight gain

    // Calculate time to goal (in weeks)
    // Assume 1kg of weight change requires approximately 7700 calories
    const weightDifferenceKg = Math.abs(targetWeightKg - weightKg);
    const caloriesPerDay = Math.abs(targetCalories - maintenanceCalories);
    const caloriesPerWeek = caloriesPerDay * 7;
    const caloriesNeeded = weightDifferenceKg * 7700;
    const weeksToGoal = caloriesNeeded / caloriesPerWeek;

    // Generate advice based on weight loss or gain
    const advice = isWeightLoss
      ? "Focus on creating a calorie deficit through diet and exercise. Prioritize protein and strength training to preserve muscle mass."
      : "To gain weight, focus on a calorie surplus with nutrient-dense foods. Combine with strength training to build muscle rather than just fat.";

    return {
      dailyCalories: Math.round(maintenanceCalories),
      targetCalories: Math.round(targetCalories),
      timeToGoal: Math.round(weeksToGoal * 10) / 10, // Round to 1 decimal
      advice,
    };
  };

  // Handle form submission
  const onSubmit = (values: FormValues) => {
    const result = calculateDailyCalories(values);
    setCalculationResult(result);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <main className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6 flex items-center">
              <MessageSquare className="h-6 w-6 mr-2 text-health-green-500" />
              Weight Management Advice
            </h1>

            <Tabs defaultValue="calculator" className="mb-6">
              <TabsList className="mb-4">
                <TabsTrigger value="calculator">Calorie Calculator</TabsTrigger>
                <TabsTrigger value="loss">Weight Loss Tips</TabsTrigger>
                <TabsTrigger value="gain">Weight Gain Tips</TabsTrigger>
              </TabsList>

              <TabsContent value="calculator">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart4 className="h-5 w-5 mr-2 text-health-green-500" />
                        Weight Goal Calculator
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="currentWeight"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Current Weight (kg)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g. 70" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="targetWeight"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Target Weight (kg)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g. 65" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="height"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Height (cm)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g. 175" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="age"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Age</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g. 30" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="gender"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Gender</FormLabel>
                                  <select
                                    className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    {...field}
                                  >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                  </select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="activityLevel"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Activity Level</FormLabel>
                                  <select
                                    className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    {...field}
                                  >
                                    {Object.entries(activityLevels).map(
                                      ([value, label]) => (
                                        <option key={value} value={value}>
                                          {label}
                                        </option>
                                      )
                                    )}
                                  </select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <Button type="submit" className="w-full">
                            Calculate
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Your Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {calculationResult ? (
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-md font-medium mb-2">
                              Daily Calories
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 bg-gray-100 rounded-md">
                                <div className="text-sm text-gray-500">
                                  Maintenance
                                </div>
                                <div className="text-2xl font-bold">
                                  {calculationResult.dailyCalories} cal
                                </div>
                              </div>
                              <div
                                className={`p-4 rounded-md ${
                                  calculationResult.targetCalories <
                                  calculationResult.dailyCalories
                                    ? "bg-red-100"
                                    : "bg-green-100"
                                }`}
                              >
                                <div className="text-sm text-gray-500">
                                  Target
                                </div>
                                <div className="text-2xl font-bold flex items-center">
                                  {calculationResult.targetCalories} cal
                                  {calculationResult.targetCalories <
                                  calculationResult.dailyCalories ? (
                                    <ArrowDown className="h-5 w-5 ml-1 text-red-500" />
                                  ) : (
                                    <ArrowUp className="h-5 w-5 ml-1 text-green-500" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-md font-medium mb-2">
                              Estimated Timeline
                            </h3>
                            <div className="p-4 bg-blue-50 rounded-md">
                              <div className="text-3xl font-bold text-blue-700">
                                {calculationResult.timeToGoal} weeks
                              </div>
                              <div className="text-sm text-gray-600 mt-1">
                                To reach your target weight at a healthy pace
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-md font-medium mb-2">
                              Personalized Advice
                            </h3>
                            <div className="p-4 bg-gray-100 rounded-md">
                              <p>{calculationResult.advice}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center py-10 text-gray-400">
                          <BarChart4 className="h-12 w-12 mb-3" />
                          <p className="text-center">
                            Fill out the calculator to see your personalized
                            results
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="loss">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ArrowDown className="h-5 w-5 mr-2 text-red-500" />
                      Weight Loss Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {weightLossAdvice.map((advice, index) => (
                        <div key={index}>
                          <h3 className="text-lg font-medium mb-1">
                            {advice.title}
                          </h3>
                          <p className="text-gray-600">{advice.description}</p>
                          {index < weightLossAdvice.length - 1 && (
                            <Separator className="mt-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gain">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ArrowUp className="h-5 w-5 mr-2 text-green-500" />
                      Weight Gain Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {weightGainAdvice.map((advice, index) => (
                        <div key={index}>
                          <h3 className="text-lg font-medium mb-1">
                            {advice.title}
                          </h3>
                          <p className="text-gray-600">{advice.description}</p>
                          {index < weightGainAdvice.length - 1 && (
                            <Separator className="mt-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Advice;
