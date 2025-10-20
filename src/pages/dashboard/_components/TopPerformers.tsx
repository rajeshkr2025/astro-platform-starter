import React from 'react';
import type { Client } from '../../../data/wealth-data';

interface TopPerformersProps {
  clients: Client[];
}

const TopPerformers: React.FC<TopPerformersProps> = ({ clients }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performers (YTD)</h2>
      <div className="space-y-4">
        {clients.map((client, index) => (
          <div key={client.id} className="flex items-center gap-4">
            <div className="text-3xl flex-shrink-0">
              {medals[index]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {client.name}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {formatCurrency(client.portfolioValue)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-600">
                +{client.ytdReturn.toFixed(1)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPerformers;
