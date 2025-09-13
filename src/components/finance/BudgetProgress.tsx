interface Budget {
  id: number;
  category: string;
  current: number;
  max: number;
  color: string;
}

interface BudgetProgressProps {
  budget: Budget;
  onReset: (budgetId: number) => void;
}

export const BudgetProgress = ({ budget, onReset }: BudgetProgressProps) => {
  const percentage = Math.min(100, (budget.current / budget.max) * 100);
  const isOverBudget = percentage > 100;
  const isNearLimit = percentage > 80;

  const getProgressColor = () => {
    if (isOverBudget) return 'bg-expense';
    if (isNearLimit) return 'bg-warning';
    return 'bg-primary';
  };

  const getProgressBg = () => {
    if (isOverBudget) return 'bg-expense-soft';
    if (isNearLimit) return 'bg-warning-soft';
    return 'bg-primary-soft';
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="font-medium text-foreground">{budget.category}</span>
        <span className="text-sm font-semibold">
          <span className={isOverBudget ? 'text-expense' : 'text-foreground'}>
            ₹{budget.current}
          </span>
          <span className="text-muted-foreground"> / ₹{budget.max}</span>
        </span>
      </div>
      
      <div className={`w-full ${getProgressBg()} rounded-full h-2.5 overflow-hidden`}>
        <div 
          className={`${getProgressColor()} h-full rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(100, percentage)}%` }}
        />
      </div>
      
      <div className="flex justify-between items-center">
        <span className={`text-xs font-medium ${
          isOverBudget ? 'text-expense' : isNearLimit ? 'text-warning' : 'text-muted-foreground'
        }`}>
          {Math.round(percentage)}% used
        </span>
        <button 
          onClick={() => onReset(budget.id)}
          className="text-xs text-primary hover:text-primary-glow transition-colors font-medium"
        >
          Reset
        </button>
      </div>
    </div>
  );
};