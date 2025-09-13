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
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {transactions.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No transactions yet. Add your first transaction!
          </p>
        ) : (
          transactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  transaction.type === "income" 
                    ? "bg-income/10 text-income" 
                    : "bg-expense/10 text-expense"
                }`}>
                  {transaction.type === "income" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {transaction.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {transaction.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(transaction.date)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === "income" 
                    ? "text-income" 
                    : "text-expense"
                }`}>
                  {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};