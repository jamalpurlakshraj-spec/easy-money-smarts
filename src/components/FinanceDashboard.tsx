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
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Student Finance Manager</h1>
            <p className="text-muted-foreground">Track your income, expenses, and budgets</p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)} className="bg-gradient-primary text-white shadow-elevated">
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                ${balance.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {balance > 0 ? "+" : ""}${(balance - 1500).toLocaleString()} from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-income shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-income-foreground">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-income-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-income-foreground">
                ${totalIncome.toLocaleString()}
              </div>
              <p className="text-xs text-income-foreground/80">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-expense shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-expense-foreground">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-expense-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-expense-foreground">
                ${totalExpenses.toLocaleString()}
              </div>
              <p className="text-xs text-expense-foreground/80">
                -3.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
              <Target className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {totalIncome > 0 ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                Goal: 20%
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Budget Overview */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-budget" />
              Budget Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {budgets.map((budget) => {
              const percentage = (budget.spent / budget.allocated) * 100;
              const isOverBudget = percentage > 100;
              
              return (
                <div key={budget.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{budget.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        ${budget.spent} / ${budget.allocated}
                      </span>
                      <Badge variant={isOverBudget ? "destructive" : "secondary"}>
                        {Math.round(percentage)}%
                      </Badge>
                    </div>
                  </div>
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className="h-2"
                  />
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