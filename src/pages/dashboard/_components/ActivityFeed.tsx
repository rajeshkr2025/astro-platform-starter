import React from 'react';
import type { Transaction } from '../../../data/wealth-data';

interface ActivityFeedProps {
  transactions: Transaction[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ transactions }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'Buy': return '🔵';
      case 'Sell': return '🔴';
      case 'Dividend': return '💎';
      case 'Rebalance': return '⚖️';
      default: return '📝';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'Buy': return 'text-blue-600';
      case 'Sell': return 'text-red-600';
      case 'Dividend': return 'text-green-600';
      case 'Rebalance': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
            <div className="text-2xl flex-shrink-0">
              {getTransactionIcon(transaction.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {transaction.clientName}
                  </p>
                  <p className="text-sm text-gray-600 mt-0.5">
                    <span className={`font-medium ${getTransactionColor(transaction.type)}`}>
                      {transaction.type}
                    </span>
                    {' • '}
                    {transaction.asset}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-gray-900">
                    {formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {formatDate(transaction.date)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
