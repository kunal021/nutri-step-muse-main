
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { FoodItem } from '@/utils/data';

interface AddFoodModalProps {
  onAddFood: (food: Omit<FoodItem, 'id' | 'timestamp'>) => void;
}

const AddFoodModal: React.FC<AddFoodModalProps> = ({ onAddFood }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    servingSize: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.calories) {
      toast({
        title: "Error",
        description: "Food name and calories are required",
        variant: "destructive"
      });
      return;
    }
    
    onAddFood({
      name: formData.name,
      calories: Number(formData.calories) || 0,
      protein: Number(formData.protein) || 0,
      carbs: Number(formData.carbs) || 0,
      fat: Number(formData.fat) || 0,
      servingSize: formData.servingSize || 'serving'
    });
    
    setFormData({
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      servingSize: '',
    });
    
    setOpen(false);
    
    toast({
      title: "Food added",
      description: `${formData.name} has been logged successfully`
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Food
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Food Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                placeholder="e.g. Greek Yogurt"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="calories" className="text-right">
                Calories
              </Label>
              <Input
                id="calories"
                name="calories"
                type="number"
                value={formData.calories}
                onChange={handleChange}
                className="col-span-3"
                placeholder="e.g. 150"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="protein" className="text-right">
                Protein (g)
              </Label>
              <Input
                id="protein"
                name="protein"
                type="number"
                value={formData.protein}
                onChange={handleChange}
                className="col-span-3"
                placeholder="e.g. 15"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="carbs" className="text-right">
                Carbs (g)
              </Label>
              <Input
                id="carbs"
                name="carbs"
                type="number"
                value={formData.carbs}
                onChange={handleChange}
                className="col-span-3"
                placeholder="e.g. 10"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fat" className="text-right">
                Fat (g)
              </Label>
              <Input
                id="fat"
                name="fat"
                type="number"
                value={formData.fat}
                onChange={handleChange}
                className="col-span-3"
                placeholder="e.g. 5"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="servingSize" className="text-right">
                Serving Size
              </Label>
              <Input
                id="servingSize"
                name="servingSize"
                value={formData.servingSize}
                onChange={handleChange}
                className="col-span-3"
                placeholder="e.g. 1 cup"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add Food</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFoodModal;
