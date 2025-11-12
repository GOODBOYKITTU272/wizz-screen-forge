import { useState } from "react";
import Layout from "@/components/Layout";
import KPICard from "@/components/KPICard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockWallets, mockExpenses } from "@/lib/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { PlusCircle, Wallet, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const categories = ["Marketing", "Travel", "Office Supplies", "Software", "Tech Infrastructure", "Food", "Other"];

export default function MyWallet() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState<"company" | "personal">("company");
  const [notes, setNotes] = useState("");

  // Get wallet for current user
  const userWallet = mockWallets.find((w) => w.userId === user?.id) || mockWallets[0];
  const userExpenses = mockExpenses.filter((e) => e.userId === user?.id);

  const handleSubmit = () => {
    if (!category || !amount) {
      toast.error("Please fill all required fields");
      return;
    }

    toast.success("Expense submitted for CFO approval!");
    setOpen(false);
    setCategory("");
    setAmount("");
    setSource("company");
    setNotes("");
  };

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Wallet</h1>
            <p className="text-muted-foreground">Track your expenses and wallet balance</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <PlusCircle className="w-4 h-4" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit New Expense</DialogTitle>
                <DialogDescription>Add an expense for CFO approval</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Amount (₹) *</Label>
                  <Input type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label>Source *</Label>
                  <Select value={source} onValueChange={(v) => setSource(v as "company" | "personal")}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="company">Company Wallet</SelectItem>
                      <SelectItem value="personal">Personal (Reimbursement)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Proof Upload</Label>
                  <Input type="file" />
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea placeholder="Additional details" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>Submit Expense</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard title="Current Balance" value={`₹${userWallet.balance.toLocaleString()}`} icon={Wallet} />
          <KPICard title="Company Spent" value={`₹${userWallet.companySpent.toLocaleString()}`} icon={DollarSign} />
          <KPICard title="Reimbursed" value={`₹${userWallet.reimbursed.toLocaleString()}`} icon={TrendingUp} />
          <KPICard
            title="Proof Pending"
            value={`₹${userWallet.proofPending.toLocaleString()}`}
            icon={AlertCircle}
            className="border-warning"
          />
        </div>

        {/* Expense History */}
        <Card>
          <CardHeader>
            <CardTitle>My Expense History</CardTitle>
            <CardDescription>All your submitted expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Expense ID</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userExpenses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      No expenses submitted yet
                    </TableCell>
                  </TableRow>
                ) : (
                  userExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-mono">{expense.id}</TableCell>
                      <TableCell className="font-medium">{expense.category}</TableCell>
                      <TableCell>
                        <Badge variant={expense.source === "company" ? "default" : "secondary"}>{expense.source}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">₹{expense.amount.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(expense.status)}</TableCell>
                      <TableCell>{expense.submittedOn.toLocaleDateString()}</TableCell>
                      <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                        {expense.notes}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
