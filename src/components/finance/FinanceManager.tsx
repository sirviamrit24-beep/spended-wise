import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  TrendingUp, 
  Target, 
  Bell, 
  Plus, 
  Wallet, 
  PiggyBank, 
  CreditCard, 
  BarChart3 
} from 'lucide-react';
import { SummaryCard } from './SummaryCard';
import { TransactionItem } from './TransactionItem';
import { BudgetProgress } from './BudgetProgress';
import { SavingsGoal } from './SavingsGoal';

interface Transaction {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

interface Budget {
  id: number;
  category: string;
  current: number;
  max: number;
  color: string;
}

interface Goal {
  id: number;
  name: string;
  target: number;
  current: number;
  deadline: string;
}

interface Insight {
  id: number;
  text: string;
  type: 'warning' | 'success';
}

interface Notification {
  id: number;
  message: string;
  read: boolean;
}

export const FinanceManager = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, name: 'Coffee Shop', amount: 150.00, category: 'Food', date: '2024-01-15', type: 'expense' },
    { id: 2, name: 'Textbooks', amount: 3200.00, category: 'Education', date: '2024-01-12', type: 'expense' },
    { id: 3, name: 'Part-time Job', amount: 12000.00, category: 'Income', date: '2024-01-10', type: 'income' },
    { id: 4, name: 'Gym Membership', amount: 1500.00, category: 'Health', date: '2024-01-08', type: 'expense' },
    { id: 5, name: 'Public Transport', amount: 800.00, category: 'Transport', date: '2024-01-05', type: 'expense' },
  ]);

  const [budgets, setBudgets] = useState<Budget[]>([
    { id: 1, category: 'Food', current: 4500, max: 8000, color: 'bg-primary' },
    { id: 2, category: 'Transport', current: 2500, max: 3500, color: 'bg-warning' },
    { id: 3, category: 'Entertainment', current: 1200, max: 4000, color: 'bg-success' },
    { id: 4, category: 'Education', current: 6000, max: 10000, color: 'bg-income' },
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, name: 'New Laptop', target: 65000, current: 42000, deadline: '2024-08-15' },
    { id: 2, name: 'Spring Break Trip', target: 25000, current: 12000, deadline: '2024-03-10' },
  ]);

  const [insights, setInsights] = useState<Insight[]>([
    { id: 1, text: 'Your food spending is 15% higher than last month', type: 'warning' },
    { id: 2, text: 'You saved ₹2000 this week compared to your average', type: 'success' },
    { id: 3, text: "You're on track to reach your laptop goal 2 weeks early", type: 'success' },
  ]);

  const [newTransaction, setNewTransaction] = useState({ 
    name: '', 
    amount: '', 
    category: 'Food' 
  });

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: "Budget alert: You've reached 80% of your Food budget", read: false },
    { id: 2, message: 'New insight available for your spending patterns', read: false },
  ]);

  const [showTransactionForm, setShowTransactionForm] = useState(false);

  // Calculate financial metrics
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100) : 0;

  // Sample spending data for chart
  const spendingData = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    amount: Math.max(10, Math.floor(Math.random() * 80 + 10))
  }));

  // Add new transaction
  const addTransaction = () => {
    if (newTransaction.name && newTransaction.amount) {
      const transaction: Transaction = {
        id: Date.now(),
        name: newTransaction.name,
        amount: parseFloat(newTransaction.amount),
        category: newTransaction.category,
        date: new Date().toISOString().split('T')[0],
        type: 'expense'
      };
      setTransactions([transaction, ...transactions]);
      setNewTransaction({ name: '', amount: '', category: 'Food' });
      setShowTransactionForm(false);
      
      // Update budget for the category
      setBudgets(budgets.map(budget => 
        budget.category === newTransaction.category 
          ? { ...budget, current: budget.current + parseFloat(newTransaction.amount) }
          : budget
      ));
    }
  };

  // Add funds to a goal
  const addToGoal = (goalId: number, amount: number) => {
    setGoals(goals.map(goal =>
      goal.id === goalId
        ? { ...goal, current: Math.min(goal.target, goal.current + amount) }
        : goal
    ));
  };

  // Reset budget
  const resetBudget = (budgetId: number) => {
    setBudgets(budgets.map(budget =>
      budget.id === budgetId
        ? { ...budget, current: 0 }
        : budget
    ));
  };

  // Clear notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'budgets', label: 'Budgets', icon: Wallet },
    { id: 'goals', label: 'Goals', icon: Target },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-card shadow-card sticky top-0 z-10 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground p-2.5 rounded-xl shadow-card">
              <Wallet className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              StudentFinances
            </h1>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navigation.map(({ id, label, icon: Icon }) => (
              <button 
                key={id}
                onClick={() => setActiveTab(id)}
                className={`font-medium px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${
                  activeTab === id 
                    ? 'bg-primary text-primary-foreground shadow-card-hover' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                className="bg-accent p-2.5 rounded-xl hover:bg-accent-foreground/10 transition-colors relative"
                onClick={clearNotifications}
              >
                <Bell className="h-5 w-5 text-accent-foreground" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-expense text-expense-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
            </div>

            <div className="w-10 h-10 bg-primary-soft rounded-xl flex items-center justify-center text-primary font-bold cursor-pointer hover:scale-105 transition-transform">
              JS
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <SummaryCard 
                title="Balance" 
                amount={balance.toFixed(2)} 
                icon={<Wallet className="h-6 w-6 text-primary" />} 
                trend="up" 
                trendAmount="2.5%"
                variant="balance"
              />
              <SummaryCard 
                title="Income" 
                amount={totalIncome.toFixed(2)} 
                icon={<TrendingUp className="h-6 w-6 text-income" />} 
                trend="up" 
                trendAmount="5.2%"
                variant="income"
              />
              <SummaryCard 
                title="Expenses" 
                amount={totalExpenses.toFixed(2)} 
                icon={<TrendingUp className="h-6 w-6 text-expense rotate-180" />} 
                trend="up" 
                trendAmount="3.1%"
                variant="expense"
              />
              <SummaryCard 
                title="Savings Rate" 
                amount={savingsRate.toFixed(1)} 
                suffix="%" 
                icon={<PiggyBank className="h-6 w-6 text-success" />} 
                trend="up" 
                trendAmount="1.8%"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Transactions Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Recent Transactions */}
                <div className="bg-card rounded-xl shadow-card border border-border p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Recent Transactions</h2>
                    <button 
                      onClick={() => setActiveTab('transactions')}
                      className="text-primary hover:text-primary-glow text-sm font-semibold transition-colors"
                    >
                      View all →
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {transactions.slice(0, 5).map(transaction => (
                      <TransactionItem key={transaction.id} transaction={transaction} />
                    ))}
                  </div>
                </div>

                {/* Spending Chart */}
                <div className="bg-card rounded-xl shadow-card border border-border p-6">
                  <h2 className="text-xl font-bold mb-6">Weekly Spending</h2>
                  <div className="flex items-end justify-between h-48 bg-gradient-to-t from-primary-soft/30 to-transparent rounded-lg p-4">
                    {spendingData.map((data, index) => (
                      <div key={index} className="flex flex-col items-center space-y-2">
                        <div 
                          className="w-10 bg-gradient-to-t from-primary to-primary-glow rounded-t-lg transition-all duration-500 hover:from-primary-glow hover:to-primary cursor-pointer shadow-card" 
                          style={{ height: `${Math.max(20, (data.amount / 80) * 100)}%` }}
                          title={`₹${data.amount} on ${data.day}`}
                        />
                        <p className="text-sm font-medium text-muted-foreground">{data.day}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Budgets */}
                <div className="bg-card rounded-xl shadow-card border border-border p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Budgets</h2>
                    <button 
                      onClick={() => setActiveTab('budgets')}
                      className="text-primary hover:text-primary-glow text-sm font-semibold transition-colors"
                    >
                      Manage →
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {budgets.map((budget) => (
                      <BudgetProgress 
                        key={budget.id} 
                        budget={budget} 
                        onReset={resetBudget} 
                      />
                    ))}
                  </div>
                </div>

                {/* Goals */}
                <div className="bg-card rounded-xl shadow-card border border-border p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Savings Goals</h2>
                    <button 
                      onClick={() => setActiveTab('goals')}
                      className="text-primary hover:text-primary-glow text-sm font-semibold transition-colors"
                    >
                      View all →
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {goals.slice(0, 2).map(goal => (
                      <SavingsGoal 
                        key={goal.id} 
                        goal={goal} 
                        onAddFunds={addToGoal} 
                      />
                    ))}
                  </div>
                </div>

                {/* AI Insights */}
                <div className="bg-card rounded-xl shadow-card border border-border p-6">
                  <h2 className="text-xl font-bold mb-4">Smart Insights</h2>
                  <div className="space-y-3">
                    {insights.slice(0, 3).map(insight => (
                      <div 
                        key={insight.id} 
                        className={`p-4 rounded-xl border transition-all duration-200 hover:scale-105 ${
                          insight.type === 'warning' 
                            ? 'bg-warning-soft border-warning/20 text-warning-foreground' 
                            : 'bg-success-soft border-success/20 text-success-foreground'
                        }`}
                      >
                        <p className="text-sm font-medium">{insight.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Other tabs placeholder */}
        {activeTab !== 'dashboard' && (
          <div className="bg-card rounded-xl shadow-card border border-border p-12 text-center">
            <div className="text-muted-foreground mb-6">
              {activeTab === 'transactions' && <CreditCard className="h-16 w-16 mx-auto" />}
              {activeTab === 'budgets' && <Wallet className="h-16 w-16 mx-auto" />}
              {activeTab === 'goals' && <Target className="h-16 w-16 mx-auto" />}
            </div>
            <h2 className="text-2xl font-bold mb-4">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
            </h2>
            <p className="text-muted-foreground mb-6">This section is under development</p>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary-glow transition-colors font-semibold shadow-card"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </main>

      {/* Floating Add Transaction Button */}
      <button
        onClick={() => setShowTransactionForm(!showTransactionForm)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground p-4 rounded-full shadow-float hover:scale-110 transition-all duration-300 z-50"
      >
        <Plus className="h-6 w-6" />
      </button>

      {/* Add Transaction Form */}
      {showTransactionForm && (
        <div className="fixed bottom-24 right-6 bg-card rounded-xl shadow-float border border-border p-6 w-80 z-50 animate-in slide-in-from-bottom duration-300">
          <h3 className="font-bold mb-4 text-lg">Add New Transaction</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Description"
              className="w-full px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background transition-all"
              value={newTransaction.name}
              onChange={(e) => setNewTransaction({...newTransaction, name: e.target.value})}
            />
            <input
              type="number"
              placeholder="Amount"
              className="w-full px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background transition-all"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
            />
            <select
              className="w-full px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background transition-all"
              value={newTransaction.category}
              onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
            >
              <option>Food</option>
              <option>Transport</option>
              <option>Entertainment</option>
              <option>Education</option>
              <option>Health</option>
            </select>
            <div className="flex space-x-3">
              <button 
                onClick={addTransaction}
                className="flex-1 bg-primary text-primary-foreground px-4 py-3 rounded-xl hover:bg-primary-glow transition-colors font-semibold flex items-center justify-center shadow-card"
              >
                <Plus className="h-4 w-4 mr-2" /> Add
              </button>
              <button 
                onClick={() => setShowTransactionForm(false)}
                className="px-4 py-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
