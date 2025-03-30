import React from "react";
import { Clock, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FoodItem as FoodItemType, getMealTime } from "@/utils/data";

interface FoodItemProps {
  food: FoodItemType;
  onDelete?: (id: string) => void;
}

const FoodItem: React.FC<FoodItemProps> = ({ food, onDelete }) => {
  const { id, name, calories, protein, carbs, fat, servingSize, timestamp } =
    food;

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50 transition-colors">
      <div className="flex-1">
        <div className="flex justify-start gap-5">
          <h3 className="font-medium text-gray-900">{name}</h3>
          <span className="text-sm font-medium text-health-green-600 pt-[3px]">
            {calories} cal
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <Clock className="h-3 w-3 mr-1" />
          <span className="mr-2">{getMealTime(timestamp)}</span>
          <span>{servingSize}</span>
        </div>
      </div>

      <div className="hidden sm:flex space-x-4 text-xs text-gray-600">
        <div>
          <div className="font-medium">{protein}g</div>
          <div className="text-gray-500">Protein</div>
        </div>
        <div>
          <div className="font-medium">{carbs}g</div>
          <div className="text-gray-500">Carbs</div>
        </div>
        <div>
          <div className="font-medium">{fat}g</div>
          <div className="text-gray-500">Fat</div>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FoodItem;
