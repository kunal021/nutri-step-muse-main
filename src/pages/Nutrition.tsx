import React from "react";
import Header from "@/components/Header";
import NutritionTracker from "@/components/NutritionTracker";
import { useState } from "react";
import { FoodItem } from "@/utils/data";
import { mockFoodItems, mockNutritionSummary } from "@/utils/data";
import { v4 as uuidv4 } from "uuid";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

const Nutrition = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>(mockFoodItems);
  const [nutritionSummary, setNutritionSummary] =
    useState(mockNutritionSummary);

  const handleAddFood = (food: Omit<FoodItem, "id" | "timestamp">) => {
    const newFood: FoodItem = {
      ...food,
      id: uuidv4(),
      timestamp: new Date(),
    };

    setFoodItems((prev) => [newFood, ...prev]);

    // Update nutrition summary
    setNutritionSummary((prev) => ({
      ...prev,
      caloriesConsumed: prev.caloriesConsumed + food.calories,
      protein: prev.protein + food.protein,
      carbs: prev.carbs + food.carbs,
      fat: prev.fat + food.fat,
    }));
  };

  const handleDeleteFood = (id: string) => {
    const foodItem = foodItems.find((item) => item.id === id);

    if (!foodItem) return;

    setFoodItems((prev) => prev.filter((item) => item.id !== id));

    // Update nutrition summary
    setNutritionSummary((prev) => ({
      ...prev,
      caloriesConsumed: prev.caloriesConsumed - foodItem.calories,
      protein: prev.protein - foodItem.protein,
      carbs: prev.carbs - foodItem.carbs,
      fat: prev.fat - foodItem.fat,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <main className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Nutrition Tracking</h1>
            <p className="mb-6 text-gray-600">
              Track your daily nutrition intake and maintain a balanced diet.
            </p>

            <div className="max-w-4xl mx-auto">
              <NutritionTracker
                foodItems={foodItems}
                nutritionSummary={nutritionSummary}
                onAddFood={handleAddFood}
                onDeleteFood={handleDeleteFood}
              />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Nutrition;
