import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";
import { AddTransactionDialog } from "./AddTransactionDialog";
import { TransactionList } from "./TransactionList";
import { SpendingChart } from "./SpendingChart";

interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface Budget {
  category: string;
  allocated: number;
  spent: number;
}

const initialTransactions: Transaction[] = [
  { id: "1", type: "income", amount: 800, category: "Part-time Job", description: "Campus bookstore", date: "2024-01-15" },
  { id: "2", type: "income", amount: 1200, category: "Financial Aid", description: "Scholarship payment", date: "2024-01-10" },
  { id: "3", type: "expense", amount: 450, category: "Tuition", description: "Course materials fee", date: "2024-01-14" },
  { id: "4", type: "expense", amount: 85, category: "Books", description: "Biology textbook", date: "2024-01-12" },
  { id: "5", type: "expense", amount: 32, category: "Food", description: "Groceries", date: "2024-01-13" },
];

const budgets: Budget[] = [
  { category: "Food", allocated: 400, spent: 285 },
  { category: "Entertainment", allocated: 150, spent: 95 },
  { category: "Books", allocated: 300, spent: 185 },
  { category: "Transport", allocated: 100, spent: 45 },
];

export const FinanceDashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const handleAddTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-income/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-expense/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      
      <div className="mx-auto max-w-7xl space-y-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-pulse-glow">
              Student Finance Manager
            </h1>
            <p className="text-lg text-muted-foreground/80">
              Advanced AI-powered financial tracking and analytics
            </p>
          </div>
          <Button 
            onClick={() => setIsDialogOpen(true)} 
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105 px-8 py-3 text-base font-semibold"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Transaction
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="glass-strong shadow-elevated border-0 hover:shadow-glow transition-all duration-500 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-primary opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <CardTitle className="text-sm font-medium text-foreground/80">Total Balance</CardTitle>
              <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                <DollarSign className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-foreground mb-2">
                ${balance.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground/60 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-success" />
                {balance > 0 ? "+" : ""}${(balance - 1500).toLocaleString()} from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-income shadow-income border-0 hover:shadow-elevated transition-all duration-500 group overflow-hidden relative animate-glow">
            <div className="absolute inset-0 bg-income/5 group-hover:bg-income/10 transition-all duration-500"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <CardTitle className="text-sm font-medium text-income-foreground/90">Total Income</CardTitle>
              <div className="p-2 rounded-full bg-income-foreground/10 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-5 w-5 text-income-foreground" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-income-foreground mb-2">
                ${totalIncome.toLocaleString()}
              </div>
              <p className="text-sm text-income-foreground/70 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-expense shadow-expense border-0 hover:shadow-elevated transition-all duration-500 group overflow-hidden relative animate-glow" style={{animationDelay: '1s'}}>
            <div className="absolute inset-0 bg-expense/5 group-hover:bg-expense/10 transition-all duration-500"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <CardTitle className="text-sm font-medium text-expense-foreground/90">Total Expenses</CardTitle>
              <div className="p-2 rounded-full bg-expense-foreground/10 group-hover:scale-110 transition-transform duration-300">
                <TrendingDown className="h-5 w-5 text-expense-foreground" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-expense-foreground mb-2">
                ${totalExpenses.toLocaleString()}
              </div>
              <p className="text-sm text-expense-foreground/70 flex items-center gap-1">
                <TrendingDown className="h-3 w-3" />
                -3.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="glass-strong shadow-elevated border-0 hover:shadow-budget transition-all duration-500 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-budget opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <CardTitle className="text-sm font-medium text-foreground/80">Savings Rate</CardTitle>
              <div className="p-2 rounded-full bg-success/10 group-hover:bg-success/20 transition-colors duration-300">
                <Target className="h-5 w-5 text-success group-hover:scale-110 transition-transform duration-300" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-success mb-2">
                {totalIncome > 0 ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100) : 0}%
              </div>
              <p className="text-sm text-muted-foreground/60">
                Goal: 20% • On track
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Budget Overview */}
        <Card className="glass-strong shadow-elevated border-0 hover:shadow-glow transition-all duration-500 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-budget opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 rounded-full bg-budget/10 group-hover:bg-budget/20 transition-colors duration-300">
                <Target className="h-6 w-6 text-budget" />
              </div>
              Budget Overview
              <Badge variant="secondary" className="ml-auto text-xs">
                AI Optimized
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 relative z-10">
            {budgets.map((budget, index) => {
              const percentage = (budget.spent / budget.allocated) * 100;
              const isOverBudget = percentage > 100;
              const isWarning = percentage > 80;
              
              return (
                <div key={budget.category} className="space-y-3 p-4 rounded-xl bg-card/50 hover:bg-card/70 transition-all duration-300 group/budget">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground group-hover/budget:text-primary transition-colors duration-300">
                      {budget.category}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground">
                        ${budget.spent} / ${budget.allocated}
                      </span>
                      <Badge 
                        variant={isOverBudget ? "destructive" : isWarning ? "default" : "secondary"}
                        className={`font-semibold ${
                          isOverBudget ? 'shadow-expense animate-pulse' : 
                          isWarning ? 'shadow-budget' : 'shadow-card'
                        }`}
                      >
                        {Math.round(percentage)}%
                      </Badge>
                    </div>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={Math.min(percentage, 100)} 
                      className={`h-3 bg-muted/30 ${
                        isOverBudget ? 'animate-pulse' : ''
                      }`}
                    />
                    {isOverBudget && (
                      <div className="absolute inset-0 bg-gradient-to-r from-destructive/20 to-destructive/30 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">
                      Remaining: ${Math.max(0, budget.allocated - budget.spent)}
                    </span>
                    <span className={`font-medium ${
                      isOverBudget ? 'text-destructive' : 
                      isWarning ? 'text-warning' : 'text-success'
                    }`}>
                      {isOverBudget ? 'Over Budget' : 
                       isWarning ? 'Near Limit' : 'On Track'}
                    </span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Charts and Transactions */}
        <div className="grid gap-6 lg:grid-cols-2">
          <SpendingChart transactions={transactions} />
          <TransactionList transactions={transactions.slice(0, 6)} />
        </div>

        <AddTransactionDialog 
          isOpen={isDialogOpen} 
          onClose={() => setIsDialogOpen(false)}
          onAddTransaction={handleAddTransaction}
        />
      </div>
    </div>
  );
};