import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockCompanyExpenses } from "@/lib/mockData";
import { PlusCircle, Download, FileText } from "lucide-react";
import { toast } from "sonner";

const expenseTypes = [
  "Salary",
  "Tech Infrastructure",
  "Food",
  "Chocolates",
  "Rent",
  "Utilities",
  "Marketing",
  "Office Supplies",
  "Travel",
  "Other",
];

export default function CompanyExpenses() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [vendor, setVendor] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentRef, setPaymentRef] = useState("");
  const [notes, setNotes] = useState("");

  const totalExpense = mockCompanyExpenses.reduce((sum, e) => sum + e.amount, 0);

  const handleSubmit = () => {
    if (!type || !vendor || !amount || !paymentRef) {
      toast.error("Please fill all required fields");
      return;
    }

    toast.success("Company expense recorded successfully!");
    setOpen(false);
    setType("");
    setVendor("");
    setAmount("");
    setPaymentRef("");
    setNotes("");
  };

  const handleExport = (format: "csv" | "pdf") => {
    toast.success(`Exporting company expenses as ${format.toUpperCase()}...`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Company Expenses</h1>
            <p className="text-muted-foreground">Track and manage central company expenses</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <PlusCircle className="w-4 h-4" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Company Expense</DialogTitle>
                <DialogDescription>Record a new company-level expense</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Expense Type *</Label>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {expenseTypes.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Amount (₹) *</Label>
                    <Input type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Vendor/Payee *</Label>
                  <Input placeholder="Enter vendor name" value={vendor} onChange={(e) => setVendor(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label>Payment Reference *</Label>
                  <Input placeholder="Transaction ID / Invoice number" value={paymentRef} onChange={(e) => setPaymentRef(e.target.value)} />
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
                <Button onClick={handleSubmit}>Save Expense</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Card */}
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Company Expenses</p>
                <p className="text-3xl font-bold mt-2">₹{totalExpense.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">This month</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleExport("csv")} className="gap-2">
                  <Download className="w-4 h-4" />
                  CSV
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExport("pdf")} className="gap-2">
                  <Download className="w-4 h-4" />
                  PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expense Register */}
        <Card>
          <CardHeader>
            <CardTitle>Company Expense Register</CardTitle>
            <CardDescription>All recorded company-level expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Payment Ref</TableHead>
                  <TableHead>Proof</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCompanyExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.date.toLocaleDateString()}</TableCell>
                    <TableCell className="font-medium">{expense.type}</TableCell>
                    <TableCell>{expense.vendor}</TableCell>
                    <TableCell className="text-right font-semibold">₹{expense.amount.toLocaleString()}</TableCell>
                    <TableCell className="font-mono text-sm">{expense.paymentRef}</TableCell>
                    <TableCell>
                      {expense.proofUrl ? (
                        <Button variant="ghost" size="sm">
                          <FileText className="w-4 h-4" />
                        </Button>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">{expense.notes}</TableCell>
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
