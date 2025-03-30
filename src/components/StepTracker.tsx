
import React from 'react';
import { Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProgressChart from './ProgressChart';
import { StepData, formatNumber } from '@/utils/data';

interface StepTrackerProps {
  data: StepData;
}

const StepTracker: React.FC<StepTrackerProps> = ({ data }) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center">
            <Activity className="mr-2 h-5 w-5 text-health-blue-500" />
            Step Tracker
          </CardTitle>
          <span className="text-sm text-muted-foreground">Today</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-4">
          <div className="relative flex items-center justify-center my-4">
            <svg className="w-32 h-32">
              <circle
                className="text-gray-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="56"
                cx="64"
                cy="64"
              />
              <circle
                className="text-health-blue-500"
                strokeWidth="8"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="56"
                cx="64"
                cy="64"
                strokeDasharray={56 * 2 * Math.PI}
                strokeDashoffset={
                  56 * 2 * Math.PI * (1 - data.percentage / 100)
                }
                transform="rotate(-90 64 64)"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold">{formatNumber(data.current)}</span>
              <span className="text-sm text-muted-foreground">steps</span>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mt-2">
            <span className="text-sm text-muted-foreground">Goal: {formatNumber(data.goal)} steps</span>
            <span className="text-sm font-medium">{data.percentage}%</span>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Weekly Progress</h4>
          <ProgressChart data={data} type="steps" />
        </div>
      </CardContent>
    </Card>
  );
};

export default StepTracker;
