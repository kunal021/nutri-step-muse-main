
import React from 'react';
import { Apple } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FoodItem as FoodItemType, NutritionSummary, calculateMacroPercentage } from '@/utils/data';
import FoodItem from './FoodItem';
import AddFoodModal from './AddFoodModal';

interface NutritionTrackerProps {
  foodItems: FoodItemType[];
  nutritionSummary: NutritionSummary;
  onAddFood: (food: Omit<FoodItemType, 'id' | 'timestamp'>) => void;
  onDeleteFood: (id: string) => void;
}

const NutritionTracker: React.FC<NutritionTrackerProps> = ({ 
  foodItems, 
  nutritionSummary,
  onAddFood,
  onDeleteFood
}) => {
  const caloriePercentage = Math.min(100, Math.round((nutritionSummary.caloriesConsumed / nutritionSummary.calorieGoal) * 100));
  const proteinPercentage = calculateMacroPercentage(nutritionSummary.protein, nutritionSummary.proteinGoal);
  const carbsPercentage = calculateMacroPercentage(nutritionSummary.carbs, nutritionSummary.carbsGoal);
  const fatPercentage = calculateMacroPercentage(nutritionSummary.fat, nutritionSummary.fatGoal);
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center">
            <Apple className="mr-2 h-5 w-5 text-health-green-500" />
            Nutrition Tracker
          </CardTitle>
          <AddFoodModal onAddFood={onAddFood} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Calories</span>
            <span className="text-sm text-muted-foreground">
              {nutritionSummary.caloriesConsumed} / {nutritionSummary.calorieGoal}
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-bar-fill bg-health-green-500" 
              style={{ 
                width: `${caloriePercentage}%`,
                '--progress-value': `${caloriePercentage}%`
              } as React.CSSProperties} 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs">Protein</span>
              <span className="text-xs">{proteinPercentage}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-bar-fill bg-health-blue-500" 
                style={{ 
                  width: `${proteinPercentage}%`,
                  '--progress-value': `${proteinPercentage}%`
                } as React.CSSProperties} 
              />
            </div>
            <div className="text-xs text-gray-500 mt-1 text-center">
              {nutritionSummary.protein}g / {nutritionSummary.proteinGoal}g
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs">Carbs</span>
              <span className="text-xs">{carbsPercentage}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-bar-fill bg-amber-500" 
                style={{ 
                  width: `${carbsPercentage}%`,
                  '--progress-value': `${carbsPercentage}%`
                } as React.CSSProperties} 
              />
            </div>
            <div className="text-xs text-gray-500 mt-1 text-center">
              {nutritionSummary.carbs}g / {nutritionSummary.carbsGoal}g
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs">Fat</span>
              <span className="text-xs">{fatPercentage}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-bar-fill bg-red-500" 
                style={{ 
                  width: `${fatPercentage}%`,
                  '--progress-value': `${fatPercentage}%`
                } as React.CSSProperties} 
              />
            </div>
            <div className="text-xs text-gray-500 mt-1 text-center">
              {nutritionSummary.fat}g / {nutritionSummary.fatGoal}g
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-sm">Today's Food Log</h3>
            <span className="text-xs text-muted-foreground">
              {foodItems.length} items • {nutritionSummary.caloriesConsumed} calories
            </span>
          </div>
          
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            {foodItems.map(item => (
              <FoodItem key={item.id} food={item} onDelete={onDeleteFood} />
            ))}
            
            {foodItems.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                <p>No food logged yet today</p>
                <p className="text-sm mt-1">Add your first meal to start tracking</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionTracker;
