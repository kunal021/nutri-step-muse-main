
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StepData } from '@/utils/data';

interface ProgressChartProps {
  data: StepData;
  type?: 'steps' | 'calories';
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data, type = 'steps' }) => {
  const chartData = data.weeklyLabels.map((label, index) => ({
    name: label,
    value: data.weeklyData[index]
  }));

  return (
    <div className="h-60 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => value > 999 ? `${(value / 1000).toFixed(0)}k` : value}
          />
          <Tooltip 
            formatter={(value: number) => [
              type === 'steps' 
                ? `${value.toLocaleString()} steps` 
                : `${value.toLocaleString()} cal`,
              type === 'steps' ? 'Steps' : 'Calories'
            ]}
            contentStyle={{ 
              borderRadius: '8px', 
              border: 'none', 
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
            }}
          />
          <Bar 
            dataKey="value" 
            fill={type === 'steps' ? '#3b82f6' : '#22c55e'} 
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
