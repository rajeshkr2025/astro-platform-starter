import React from 'react';
import type { AssetAllocation } from '../../../data/wealth-data';

interface AssetAllocationProps {
  allocations: AssetAllocation[];
}

const AssetAllocationChart: React.FC<AssetAllocationProps> = ({ allocations }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calculate the total for the donut chart
  const total = allocations.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  // Generate SVG path for each segment
  const getDonutSegment = (percentage: number, startAngle: number, color: string) => {
    const radius = 80;
    const innerRadius = 50;
    const cx = 100;
    const cy = 100;

    const angle = (percentage / 100) * 360;
    const endAngle = startAngle + angle;

    const startRadians = (startAngle - 90) * (Math.PI / 180);
    const endRadians = (endAngle - 90) * (Math.PI / 180);

    const x1 = cx + radius * Math.cos(startRadians);
    const y1 = cy + radius * Math.sin(startRadians);
    const x2 = cx + radius * Math.cos(endRadians);
    const y2 = cy + radius * Math.sin(endRadians);
    const x3 = cx + innerRadius * Math.cos(endRadians);
    const y3 = cy + innerRadius * Math.sin(endRadians);
    const x4 = cx + innerRadius * Math.cos(startRadians);
    const y4 = cy + innerRadius * Math.sin(startRadians);

    const largeArc = angle > 180 ? 1 : 0;

    const pathData = [
      `M ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}`,
      'Z'
    ].join(' ');

    return { pathData, endAngle };
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Asset Allocation</h2>
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Donut Chart */}
        <div className="flex-shrink-0">
          <svg width="200" height="200" viewBox="0 0 200 200">
            {allocations.map((allocation) => {
              const { pathData, endAngle } = getDonutSegment(
                allocation.percentage,
                currentAngle,
                allocation.color
              );
              currentAngle = endAngle;

              return (
                <path
                  key={allocation.category}
                  d={pathData}
                  fill={allocation.color}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                  stroke="white"
                  strokeWidth="2"
                />
              );
            })}
            {/* Center text */}
            <text
              x="100"
              y="95"
              textAnchor="middle"
              className="text-xs fill-gray-500 font-medium"
            >
              Total AUM
            </text>
            <text
              x="100"
              y="110"
              textAnchor="middle"
              className="text-sm fill-gray-900 font-bold"
            >
              {formatCurrency(total)}
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full">
          <div className="space-y-3">
            {allocations.map((allocation) => (
              <div key={allocation.category} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: allocation.color }}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {allocation.category}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    {formatCurrency(allocation.value)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {allocation.percentage.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetAllocationChart;
