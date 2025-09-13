import { ArrowUpRight } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  amount: string;
  suffix?: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
  trendAmount: string;
  variant?: 'default' | 'income' | 'expense' | 'balance';
}

export const SummaryCard = ({ 
  title, 
  amount, 
  suffix = '', 
  icon, 
  trend, 
  trendAmount,
  variant = 'default' 
}: SummaryCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'income':
        return 'bg-gradient-to-br from-card to-success-soft border-success/20 hover:shadow-success/10';
      case 'expense':
        return 'bg-gradient-to-br from-card to-expense-soft border-expense/20 hover:shadow-expense/10';
      case 'balance':
        return 'bg-gradient-to-br from-card to-primary-soft border-primary/20 hover:shadow-primary/10';
      default:
        return 'bg-card border-border hover:shadow-lg';
    }
  };

  const getTrendColor = () => {
    if (variant === 'expense') {
      return trend === 'up' ? 'text-expense' : 'text-success';
    }
    return trend === 'up' ? 'text-success' : 'text-expense';
  };

  return (
    <div className={`rounded-xl shadow-card border transition-all duration-300 hover:scale-105 hover:shadow-card-hover p-6 ${getVariantStyles()}`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-muted-foreground text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2 tracking-tight">
            {variant === 'expense' && amount !== '0.00' ? '-' : ''}
            ₹{amount}{suffix}
          </p>
        </div>
        <div className="bg-primary-soft p-3 rounded-xl">
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <ArrowUpRight 
          className={`h-4 w-4 mr-1 transition-transform ${
            trend === 'down' ? 'rotate-180' : ''
          } ${getTrendColor()}`} 
        />
        <span className={`text-sm font-medium ${getTrendColor()}`}>
          {trendAmount} from last week
        </span>
      </div>
    </div>
  );
};