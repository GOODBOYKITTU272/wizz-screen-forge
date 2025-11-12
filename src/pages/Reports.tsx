import Layout from "@/components/Layout";
import KPICard from "@/components/KPICard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockWallets, mockCompanyExpenses } from "@/lib/mockData";
import { Download, Wallet, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import { toast } from "sonner";

export default function Reports() {
  const totalAllocated = mockWallets.reduce((sum, w) => sum + w.allocated, 0);
  const totalCompanySpent = mockWallets.reduce((sum, w) => sum + w.companySpent, 0);
  const totalReimbursed = mockWallets.reduce((sum, w) => sum + w.reimbursed, 0);
  const totalProofPending = mockWallets.reduce((sum, w) => sum + w.proofPending, 0);
  const totalCompanyExpenses = mockCompanyExpenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryData = [
    { category: "Marketing", amount: 47000 },
    { category: "Tech", amount: 70000 },
    { category: "Travel", amount: 28000 },
    { category: "Office", amount: 18000 },
    { category: "Utilities", amount: 12000 },
  ];

  const monthlyData = [
    { month: "Nov", wallet: 70000, company: 920000, reimbursed: 25000, pending: 8000 },
    { month: "Dec", wallet: 110000, company: 1050000, reimbursed: 35000, pending: 12000 },
    { month: "Jan", wallet: totalCompanySpent, company: totalCompanyExpenses, reimbursed: totalReimbursed, pending: totalProofPending },
  ];

  const handleExport = (format: "pdf" | "csv") => {
    toast.success(`Generating ${format.toUpperCase()} report...`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
            <p className="text-muted-foreground">Comprehensive financial overview and insights</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleExport("pdf")} className="gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
            <Button variant="outline" onClick={() => handleExport("csv")} className="gap-2">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard title="Wallet Allocated" value={`₹${totalAllocated.toLocaleString()}`} icon={Wallet} trend="+12%" trendUp />
          <KPICard title="Company Expenses" value={`₹${totalCompanyExpenses.toLocaleString()}`} icon={DollarSign} trend="+8%" trendUp />
          <KPICard title="Reimbursements" value={`₹${totalReimbursed.toLocaleString()}`} icon={TrendingUp} trend="+5%" trendUp />
          <KPICard
            title="Proof Pending"
            value={`₹${totalProofPending.toLocaleString()}`}
            icon={AlertCircle}
            className="border-warning"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Spend by Category</CardTitle>
              <CardDescription>Breakdown of expenses by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Expense Overview</CardTitle>
              <CardDescription>Last 3 months trend</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="wallet" stroke="hsl(var(--chart-1))" name="Wallet Spend" />
                  <Line type="monotone" dataKey="company" stroke="hsl(var(--chart-2))" name="Company Expense" />
                  <Line type="monotone" dataKey="reimbursed" stroke="hsl(var(--chart-3))" name="Reimbursed" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Summary Table */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Summary</CardTitle>
            <CardDescription>Detailed breakdown by month</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead className="text-right">Wallet Distributed</TableHead>
                  <TableHead className="text-right">Company Spend</TableHead>
                  <TableHead className="text-right">Reimbursed</TableHead>
                  <TableHead className="text-right">Proof Pending</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyData.map((data) => (
                  <TableRow key={data.month}>
                    <TableCell className="font-medium">{data.month} 2025</TableCell>
                    <TableCell className="text-right">₹{data.wallet.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₹{data.company.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₹{data.reimbursed.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-warning">₹{data.pending.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-bold">
                      ₹{(data.wallet + data.company + data.reimbursed).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
