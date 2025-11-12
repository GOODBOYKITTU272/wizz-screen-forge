import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import KPICard from "@/components/KPICard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockWallets, mockExpenses } from "@/lib/mockData";
import { Wallet, DollarSign, TrendingUp, AlertCircle, Eye } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return null;

  // Calculate KPIs
  const totalAllocated = mockWallets.reduce((sum, w) => sum + w.allocated, 0);
  const totalCompanySpent = mockWallets.reduce((sum, w) => sum + w.companySpent, 0);
  const totalReimbursed = mockWallets.reduce((sum, w) => sum + w.reimbursed, 0);
  const totalProofPending = mockWallets.reduce((sum, w) => sum + w.proofPending, 0);

  // Chart data
  const spendData = [
    { name: "Company", value: totalCompanySpent },
    { name: "Reimbursed", value: totalReimbursed },
  ];

  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))"];

  const monthlyData = [
    { month: "Nov", amount: 85000 },
    { month: "Dec", amount: 120000 },
    { month: "Jan", amount: totalCompanySpent + totalReimbursed },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      approved: "default",
      pending: "secondary",
      rejected: "destructive",
      proof_pending: "outline",
    };
    return <Badge variant={variants[status] || "default"}>{status.replace("_", " ")}</Badge>;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {user.role === "cfo" ? "CFO Dashboard" : user.role === "ceo" ? "CEO Dashboard" : "Dashboard"}
          </h1>
          <p className="text-muted-foreground">Welcome back, {user.name}</p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total Wallets Distributed"
            value={`₹${totalAllocated.toLocaleString()}`}
            icon={Wallet}
            trend="+12% from last month"
            trendUp
          />
          <KPICard
            title="Company Spend"
            value={`₹${totalCompanySpent.toLocaleString()}`}
            icon={DollarSign}
            trend="+8% from last month"
            trendUp
          />
          <KPICard
            title="Reimbursements Paid"
            value={`₹${totalReimbursed.toLocaleString()}`}
            icon={TrendingUp}
            trend="+5% from last month"
            trendUp
          />
          <KPICard
            title="Pending Proofs"
            value={`₹${totalProofPending.toLocaleString()}`}
            icon={AlertCircle}
            className="border-warning"
          />
        </div>

        {/* Wallet Overview Table */}
        {user.role === "cfo" && (
          <Card>
            <CardHeader>
              <CardTitle>Wallet Overview</CardTitle>
              <CardDescription>Current status of all CXO wallets</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead className="text-right">Allocated</TableHead>
                    <TableHead className="text-right">Company Spent</TableHead>
                    <TableHead className="text-right">Reimbursed</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead className="text-right">Proof Pending</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockWallets.map((wallet) => (
                    <TableRow key={wallet.userId}>
                      <TableCell className="font-medium">{wallet.userName}</TableCell>
                      <TableCell className="text-right">₹{wallet.allocated.toLocaleString()}</TableCell>
                      <TableCell className="text-right">₹{wallet.companySpent.toLocaleString()}</TableCell>
                      <TableCell className="text-right">₹{wallet.reimbursed.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-semibold">₹{wallet.balance.toLocaleString()}</TableCell>
                      <TableCell className="text-right text-warning">₹{wallet.proofPending.toLocaleString()}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/wallets`)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Spend Distribution</CardTitle>
              <CardDescription>Company vs Reimbursed expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={spendData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {spendData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Expense Trend</CardTitle>
              <CardDescription>Last 3 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Expenses */}
        {user.role === "cfo" && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Expense Submissions</CardTitle>
              <CardDescription>Latest expense requests requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Expense ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockExpenses.slice(0, 5).map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-mono">{expense.id}</TableCell>
                      <TableCell>{expense.userName}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>
                        <Badge variant={expense.source === "company" ? "default" : "secondary"}>
                          {expense.source}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">₹{expense.amount.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(expense.status)}</TableCell>
                      <TableCell>{expense.submittedOn.toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-end">
                <Button onClick={() => navigate("/approvals")}>View All Approvals</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
