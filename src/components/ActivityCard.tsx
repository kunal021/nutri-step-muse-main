
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ActivityCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  change?: string;
  isPositive?: boolean;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  value,
  icon: Icon,
  iconColor,
  change,
  isPositive
}) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {change && (
              <p className={`text-xs flex items-center mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                <span className={`inline-block mr-1 ${isPositive ? 'rotate-0' : 'rotate-180'}`}>↑</span>
                {change} from last week
              </p>
            )}
          </div>
          <div className={`p-3 rounded-full ${iconColor}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
