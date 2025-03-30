
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const NutritionTrackerSkeleton = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          {[0, 1, 2].map((i) => (
            <div key={i}>
              <div className="flex justify-between mb-1">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-8" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
              <div className="mt-1 flex justify-center">
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-3">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-36" />
          </div>
          
          <div className="space-y-2">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-md" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionTrackerSkeleton;
