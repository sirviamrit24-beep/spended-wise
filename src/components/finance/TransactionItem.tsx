import { TrendingUp } from 'lucide-react';

interface Transaction {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const isIncome = transaction.type === 'income';
  
  return (
    <div className="flex justify-between items-center py-4 border-b border-border/50 last:border-b-0 hover:bg-card-hover transition-colors rounded-lg px-2">
      <div className="flex items-center space-x-4">
        <div className={`p-2.5 rounded-xl ${
          isIncome 
            ? 'bg-income-soft border border-income/20' 
            : 'bg-expense-soft border border-expense/20'
        }`}>
          <TrendingUp 
            className={`h-4 w-4 ${
              isIncome 
                ? 'text-income' 
                : 'text-expense rotate-180'
            }`}
          />
        </div>
        <div>
          <p className="font-semibold text-foreground">{transaction.name}</p>
          <p className="text-sm text-muted-foreground">
            {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold text-lg ${
          isIncome ? 'text-income' : 'text-expense'
        }`}>
          {isIncome ? '+' : '-'}${transaction.amount.toFixed(2)}
        </p>
      </div>
    </div>
  );
};