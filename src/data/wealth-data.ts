export interface Client {
  id: string;
  name: string;
  email: string;
  totalAssets: number;
  portfolioValue: number;
  ytdReturn: number;
  riskProfile: 'Conservative' | 'Moderate' | 'Aggressive';
  lastContact: string;
}

export interface AssetAllocation {
  category: string;
  value: number;
  percentage: number;
  color: string;
}

export interface Transaction {
  id: string;
  clientName: string;
  type: 'Buy' | 'Sell' | 'Dividend' | 'Rebalance';
  asset: string;
  amount: number;
  date: string;
}

export interface PerformanceData {
  month: string;
  value: number;
}

export const clients: Client[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    totalAssets: 2450000,
    portfolioValue: 2450000,
    ytdReturn: 12.4,
    riskProfile: 'Moderate',
    lastContact: '2025-10-15'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'mchen@email.com',
    totalAssets: 5800000,
    portfolioValue: 5800000,
    ytdReturn: 15.8,
    riskProfile: 'Aggressive',
    lastContact: '2025-10-18'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    totalAssets: 1200000,
    portfolioValue: 1200000,
    ytdReturn: 8.2,
    riskProfile: 'Conservative',
    lastContact: '2025-10-12'
  },
  {
    id: '4',
    name: 'David Thompson',
    email: 'dthompson@email.com',
    totalAssets: 3300000,
    portfolioValue: 3300000,
    ytdReturn: 10.5,
    riskProfile: 'Moderate',
    lastContact: '2025-10-19'
  },
  {
    id: '5',
    name: 'Jennifer Lee',
    email: 'jlee@email.com',
    totalAssets: 4100000,
    portfolioValue: 4100000,
    ytdReturn: 13.7,
    riskProfile: 'Aggressive',
    lastContact: '2025-10-17'
  },
  {
    id: '6',
    name: 'Robert Martinez',
    email: 'rmartinez@email.com',
    totalAssets: 890000,
    portfolioValue: 890000,
    ytdReturn: 7.1,
    riskProfile: 'Conservative',
    lastContact: '2025-10-10'
  },
  {
    id: '7',
    name: 'Lisa Anderson',
    email: 'landerson@email.com',
    totalAssets: 6200000,
    portfolioValue: 6200000,
    ytdReturn: 14.2,
    riskProfile: 'Moderate',
    lastContact: '2025-10-20'
  },
  {
    id: '8',
    name: 'James Wilson',
    email: 'jwilson@email.com',
    totalAssets: 1850000,
    portfolioValue: 1850000,
    ytdReturn: 9.8,
    riskProfile: 'Moderate',
    lastContact: '2025-10-16'
  }
];

export const assetAllocation: AssetAllocation[] = [
  {
    category: 'Equities',
    value: 13500000,
    percentage: 52.3,
    color: '#355c7d'
  },
  {
    category: 'Fixed Income',
    value: 6200000,
    percentage: 24.0,
    color: '#f67280'
  },
  {
    category: 'Real Estate',
    value: 3100000,
    percentage: 12.0,
    color: '#c06c84'
  },
  {
    category: 'Commodities',
    value: 1800000,
    percentage: 7.0,
    color: '#6c5b7b'
  },
  {
    category: 'Cash',
    value: 1200000,
    percentage: 4.7,
    color: '#99b898'
  }
];

export const recentTransactions: Transaction[] = [
  {
    id: 't1',
    clientName: 'Lisa Anderson',
    type: 'Buy',
    asset: 'AAPL',
    amount: 50000,
    date: '2025-10-20'
  },
  {
    id: 't2',
    clientName: 'David Thompson',
    type: 'Dividend',
    asset: 'VOO',
    amount: 3200,
    date: '2025-10-19'
  },
  {
    id: 't3',
    clientName: 'Michael Chen',
    type: 'Sell',
    asset: 'TSLA',
    amount: 75000,
    date: '2025-10-18'
  },
  {
    id: 't4',
    clientName: 'Jennifer Lee',
    type: 'Buy',
    asset: 'BND',
    amount: 100000,
    date: '2025-10-17'
  },
  {
    id: 't5',
    clientName: 'Sarah Johnson',
    type: 'Rebalance',
    asset: 'Portfolio',
    amount: 245000,
    date: '2025-10-15'
  }
];

export const performanceData: PerformanceData[] = [
  { month: 'Apr', value: 24200000 },
  { month: 'May', value: 24800000 },
  { month: 'Jun', value: 24500000 },
  { month: 'Jul', value: 25100000 },
  { month: 'Aug', value: 25600000 },
  { month: 'Sep', value: 25300000 },
  { month: 'Oct', value: 25800000 }
];

export const getTotalAUM = () => {
  return clients.reduce((sum, client) => sum + client.portfolioValue, 0);
};

export const getAverageReturn = () => {
  const total = clients.reduce((sum, client) => sum + client.ytdReturn, 0);
  return total / clients.length;
};

export const getTopPerformers = (count: number = 3) => {
  return [...clients]
    .sort((a, b) => b.ytdReturn - a.ytdReturn)
    .slice(0, count);
};
