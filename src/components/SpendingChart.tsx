import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { BarChart3 } from "lucide-react";

interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface SpendingChartProps {
  transactions: Transaction[];
}

const COLORS = [
  "hsl(0 75% 65%)",    // Advanced expense red
  "hsl(15 80% 70%)",   // Orange-red
  "hsl(30 85% 75%)",   // Warm orange
  "hsl(45 90% 65%)",   // Golden yellow
  "hsl(60 85% 60%)",   // Bright yellow
  "hsl(142 70% 55%)",  // Success green
  "hsl(160 75% 60%)",  // Emerald
  "hsl(180 80% 65%)",  // Teal
  "hsl(200 85% 70%)",  // Sky blue
  "hsl(220 90% 75%)",  // Royal blue
];

export const SpendingChart = ({ transactions }: SpendingChartProps) => {
  // Group expenses by category
  const expensesByCategory = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);

  const chartData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  const totalExpenses = chartData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium">{data.name}</p>
          <p className="text-expense font-semibold">
            ${data.value.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">
            {((data.value / totalExpenses) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="glass-strong shadow-elevated border-0 hover:shadow-glow transition-all duration-500 overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-expense opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 rounded-full bg-expense/10 group-hover:bg-expense/20 transition-colors duration-300">
            <BarChart3 className="h-6 w-6 text-expense" />
          </div>
          AI Spending Analysis
          <Badge variant="secondary" className="ml-auto text-xs">
            Real-time
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        {chartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center">
              <BarChart3 className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <p className="text-muted-foreground">No expenses to analyze yet</p>
            <p className="text-sm text-muted-foreground/60">Add some transactions to see your spending patterns</p>
          </div>
        ) : (
          <>
            <div className="h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    {COLORS.map((color, index) => (
                      <radialGradient key={index} id={`gradient-${index}`} cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                        <stop offset="100%" stopColor={color} stopOpacity={1} />
                      </radialGradient>
                    ))}
                  </defs>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={2}
                    stroke="hsl(240 10% 8%)"
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={`url(#gradient-${index % COLORS.length})`}
                        className="hover:opacity-80 transition-opacity duration-300"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Center Label */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">
                    ${totalExpenses.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Spent
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Legend */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              {chartData.map((item, index) => {
                const percentage = ((item.value / totalExpenses) * 100).toFixed(1);
                return (
                  <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-card/30 hover:bg-card/50 transition-all duration-300 group/item">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full shadow-sm group-hover/item:scale-110 transition-transform duration-300" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="font-medium text-foreground truncate">
                        {item.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground">
                        ${item.value.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {percentage}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};