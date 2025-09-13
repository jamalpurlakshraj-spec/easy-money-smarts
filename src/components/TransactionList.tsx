import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";

interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList = ({ transactions }: TransactionListProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric" 
    });
  };

  return (
    <Card className="glass-strong shadow-elevated border-0 hover:shadow-glow transition-all duration-500 overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-primary opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          Recent Activity
          <Badge variant="secondary" className="ml-auto text-xs">
            Live Updates
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center">
              <Clock className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <p className="text-center text-muted-foreground">
              No transactions yet
            </p>
            <p className="text-sm text-muted-foreground/60 text-center">
              Add your first transaction to start tracking!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction, index) => (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between p-4 rounded-xl bg-card/30 hover:bg-card/50 transition-all duration-300 group/transaction border border-border/50 hover:border-border"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full transition-all duration-300 group-hover/transaction:scale-110 ${
                    transaction.type === "income" 
                      ? "bg-income/10 text-income shadow-income/20" 
                      : "bg-expense/10 text-expense shadow-expense/20"
                  } shadow-lg`}>
                    {transaction.type === "income" ? (
                      <ArrowUpRight className="h-5 w-5" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground group-hover/transaction:text-primary transition-colors duration-300">
                      {transaction.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs font-medium ${
                          transaction.type === "income" 
                            ? "bg-income/10 text-income border-income/20" 
                            : "bg-expense/10 text-expense border-expense/20"
                        }`}
                      >
                        {transaction.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(transaction.date)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold transition-all duration-300 ${
                    transaction.type === "income" 
                      ? "text-income group-hover/transaction:text-income-glow" 
                      : "text-expense group-hover/transaction:text-expense-glow"
                  }`}>
                    {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.type === "income" ? "Credit" : "Debit"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};