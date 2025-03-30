
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const StepTrackerSkeleton = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-12" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-4">
          <div className="relative flex items-center justify-center my-4">
            <Skeleton className="w-32 h-32 rounded-full" />
          </div>
          <div className="flex items-center justify-between w-full mt-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
        
        <div>
          <Skeleton className="h-4 w-28 mb-2" />
          <div className="space-y-2">
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepTrackerSkeleton;
