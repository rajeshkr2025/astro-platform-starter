import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType, icon }) => {
  const changeColor = changeType === 'positive' ? 'text-green-600' :
                      changeType === 'negative' ? 'text-red-600' :
                      'text-gray-600';

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${changeColor} flex items-center gap-1`}>
              {changeType === 'positive' && '↑'}
              {changeType === 'negative' && '↓'}
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className="text-4xl opacity-20">{icon}</div>
        )}
      </div>
    </div>
  );
};

interface PortfolioCardsProps {
  totalAUM: number;
  totalClients: number;
  averageReturn: number;
  newAssets: number;
}

const PortfolioCards: React.FC<PortfolioCardsProps> = ({
  totalAUM,
  totalClients,
  averageReturn,
  newAssets
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total AUM"
        value={formatCurrency(totalAUM)}
        change="+8.2% from last month"
        changeType="positive"
        icon="💰"
      />
      <StatCard
        title="Total Clients"
        value={totalClients.toString()}
        change="+2 new this month"
        changeType="positive"
        icon="👥"
      />
      <StatCard
        title="Avg. YTD Return"
        value={formatPercent(averageReturn)}
        change="Outperforming benchmark"
        changeType="positive"
        icon="📈"
      />
      <StatCard
        title="New Assets (30d)"
        value={formatCurrency(newAssets)}
        change="+15.3% vs last period"
        changeType="positive"
        icon="💵"
      />
    </div>
  );
};

export default PortfolioCards;
