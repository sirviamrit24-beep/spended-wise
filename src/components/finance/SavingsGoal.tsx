interface Goal {
  id: number;
  name: string;
  target: number;
  current: number;
  deadline: string;
}

interface SavingsGoalProps {
  goal: Goal;
  onAddFunds: (goalId: number, amount: number) => void;
}

export const SavingsGoal = ({ goal, onAddFunds }: SavingsGoalProps) => {
  const percentage = (goal.current / goal.target) * 100;
  const isComplete = percentage >= 100;
  const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="p-5 bg-gradient-to-br from-card to-success-soft border border-success/10 rounded-xl hover:shadow-card-hover transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-foreground text-lg">{goal.name}</h3>
        <span className="text-sm text-muted-foreground font-medium">
          ${goal.current} / ${goal.target}
        </span>
      </div>
      
      <div className="w-full bg-success-soft rounded-full h-3 mb-4 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-700 ease-out ${
            isComplete ? 'bg-success animate-pulse' : 'bg-primary'
          }`}
          style={{ width: `${Math.min(100, percentage)}%` }}
        />
      </div>
      
      <div className="flex justify-between text-sm mb-4">
        <span className={`font-medium ${daysLeft < 0 ? 'text-expense' : 'text-muted-foreground'}`}>
          {daysLeft < 0 ? `${Math.abs(daysLeft)} days overdue` : `${daysLeft} days left`}
        </span>
        <span className={`font-bold ${isComplete ? 'text-success' : 'text-primary'}`}>
          {Math.round(percentage)}%
        </span>
      </div>
      
      {!isComplete && (
        <div className="flex space-x-2">
          <button 
            onClick={() => onAddFunds(goal.id, 25)}
            className="flex-1 bg-primary text-primary-foreground text-sm font-medium py-2 px-3 rounded-lg hover:bg-primary-glow transition-colors"
          >
            +$25
          </button>
          <button 
            onClick={() => onAddFunds(goal.id, 50)}
            className="flex-1 bg-success text-success-foreground text-sm font-medium py-2 px-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            +$50
          </button>
          <button 
            onClick={() => onAddFunds(goal.id, 100)}
            className="flex-1 bg-income text-income-foreground text-sm font-medium py-2 px-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            +$100
          </button>
        </div>
      )}
      
      {isComplete && (
        <div className="text-center">
          <span className="text-success font-bold text-sm">🎉 Goal Complete!</span>
        </div>
      )}
    </div>
  );
};