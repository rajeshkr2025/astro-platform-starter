import React, { useState } from 'react';
import type { Client } from '../../../data/wealth-data';

interface ClientListProps {
  clients: Client[];
}

const ClientList: React.FC<ClientListProps> = ({ clients }) => {
  const [sortField, setSortField] = useState<keyof Client>('portfolioValue');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleSort = (field: keyof Client) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedClients = [...clients].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  const getRiskProfileColor = (profile: string) => {
    switch (profile) {
      case 'Conservative': return 'bg-blue-100 text-blue-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Aggressive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const SortIcon = ({ field }: { field: keyof Client }) => {
    if (sortField !== field) return <span className="text-gray-400">⇅</span>;
    return sortDirection === 'asc' ? <span>↑</span> : <span>↓</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Client Portfolio Overview</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  Client <SortIcon field="name" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('portfolioValue')}
              >
                <div className="flex items-center justify-end gap-1">
                  Portfolio Value <SortIcon field="portfolioValue" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('ytdReturn')}
              >
                <div className="flex items-center justify-end gap-1">
                  YTD Return <SortIcon field="ytdReturn" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Risk Profile
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('lastContact')}
              >
                <div className="flex items-center gap-1">
                  Last Contact <SortIcon field="lastContact" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedClients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{client.name}</div>
                    <div className="text-sm text-gray-500">{client.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    {formatCurrency(client.portfolioValue)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className={`text-sm font-semibold ${client.ytdReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {client.ytdReturn >= 0 ? '+' : ''}{formatPercent(client.ytdReturn)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRiskProfileColor(client.riskProfile)}`}>
                    {client.riskProfile}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(client.lastContact)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientList;
