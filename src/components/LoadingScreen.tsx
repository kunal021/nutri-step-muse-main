
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-health-green-500" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
