
export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
  timestamp: Date;
}

export interface NutritionSummary {
  caloriesConsumed: number;
  calorieGoal: number;
  protein: number;
  carbs: number;
  fat: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
}

export interface StepData {
  current: number;
  goal: number;
  percentage: number;
  weeklyData: number[];
  weeklyLabels: string[];
}

export const mockFoodItems: FoodItem[] = [
  {
    id: "1",
    name: "Greek Yogurt",
    calories: 150,
    protein: 15,
    carbs: 10,
    fat: 5,
    servingSize: "1 cup",
    timestamp: new Date(new Date().setHours(8, 30)),
  },
  {
    id: "2",
    name: "Chicken Breast",
    calories: 280,
    protein: 35,
    carbs: 0,
    fat: 10,
    servingSize: "6 oz",
    timestamp: new Date(new Date().setHours(12, 15)),
  },
  {
    id: "3",
    name: "Quinoa Bowl",
    calories: 350,
    protein: 12,
    carbs: 65,
    fat: 8,
    servingSize: "1 bowl",
    timestamp: new Date(new Date().setHours(18, 0)),
  }
];

export const mockNutritionSummary: NutritionSummary = {
  caloriesConsumed: 780,
  calorieGoal: 2000,
  protein: 62,
  carbs: 75,
  fat: 23,
  proteinGoal: 120,
  carbsGoal: 200,
  fatGoal: 60,
};

export const mockStepData: StepData = {
  current: 6824,
  goal: 10000,
  percentage: 68.24,
  weeklyData: [9234, 7841, 8512, 10243, 6824, 0, 0],
  weeklyLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
};

export const getMealTime = (timestamp: Date): string => {
  const hour = timestamp.getHours();
  
  if (hour < 10) return "Breakfast";
  if (hour < 14) return "Lunch";
  if (hour < 18) return "Snack";
  return "Dinner";
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

export const calculateMacroPercentage = (
  macro: number,
  goal: number
): number => {
  return Math.min(100, Math.round((macro / goal) * 100));
};
