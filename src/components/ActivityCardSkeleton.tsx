
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ActivityCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-4 w-16 mb-1" />
            <Skeleton className="h-8 w-24 mb-1" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCardSkeleton;
