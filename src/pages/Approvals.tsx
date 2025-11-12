import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { mockExpenses } from "@/lib/mockData";
import { CheckCircle, XCircle, MessageCircle, FileText, Search } from "lucide-react";
import { toast } from "sonner";

export default function Approvals() {
  const [selectedExpense, setSelectedExpense] = useState<typeof mockExpenses[0] | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleApprove = (expense: typeof mockExpenses[0]) => {
    toast.success(`Expense ${expense.id} approved! ${expense.source === "personal" ? "Reimbursement" : "Wallet deduction"} processed.`);
    setSelectedExpense(null);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }
    toast.error(`Expense ${selectedExpense?.id} rejected.`);
    setSelectedExpense(null);
    setRejectionReason("");
  };

  const handleAskInfo = (expense: typeof mockExpenses[0]) => {
    toast.info(`Information request sent to ${expense.userName}`);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      approved: { variant: "default", label: "Approved" },
      pending: { variant: "secondary", label: "Pending" },
      rejected: { variant: "destructive", label: "Rejected" },
      proof_pending: { variant: "outline", label: "Proof Pending" },
    };
    const config = variants[status] || variants.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filteredExpenses = mockExpenses.filter(
    (e) =>
      e.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ExpenseTable = ({ status }: { status?: string }) => {
    const expenses = status ? filteredExpenses.filter((e) => e.status === status) : filteredExpenses;

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Expense ID</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Source</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Proof</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                No expenses found
              </TableCell>
            </TableRow>
          ) : (
            expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-mono">{expense.id}</TableCell>
                <TableCell className="font-medium">{expense.userName}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>
                  <Badge variant={expense.source === "company" ? "default" : "secondary"}>{expense.source}</Badge>
                </TableCell>
                <TableCell className="text-right font-semibold">₹{expense.amount.toLocaleString()}</TableCell>
                <TableCell>
                  {expense.proofUrl ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedExpense(expense)}
                      className="gap-1"
                    >
                      <FileText className="w-4 h-4" />
                      View
                    </Button>
                  ) : (
                    <span className="text-muted-foreground text-sm">No proof</span>
                  )}
                </TableCell>
                <TableCell>{expense.submittedOn.toLocaleDateString()}</TableCell>
                <TableCell>{getStatusBadge(expense.status)}</TableCell>
                <TableCell>
                  {expense.status === "pending" && (
                    <div className="flex gap-1">
                      <Button size="sm" variant="default" onClick={() => handleApprove(expense)}>
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          setSelectedExpense(expense);
                          setRejectionReason("");
                        }}
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleAskInfo(expense)}>
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    );
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Expense Approvals</h1>
            <p className="text-muted-foreground">Review and approve expense submissions</p>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search expenses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Expense Submissions</CardTitle>
            <CardDescription>Manage all expense approvals in one place</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending" className="space-y-4">
              <TabsList>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
                <TabsTrigger value="proof_pending">Proof Pending</TabsTrigger>
              </TabsList>

              <TabsContent value="pending">
                <ExpenseTable status="pending" />
              </TabsContent>
              <TabsContent value="approved">
                <ExpenseTable status="approved" />
              </TabsContent>
              <TabsContent value="rejected">
                <ExpenseTable status="rejected" />
              </TabsContent>
              <TabsContent value="proof_pending">
                <ExpenseTable status="proof_pending" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Rejection Dialog */}
        <Dialog open={!!selectedExpense && !selectedExpense.proofUrl} onOpenChange={() => setSelectedExpense(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Expense</DialogTitle>
              <DialogDescription>Provide a reason for rejection</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Textarea
                placeholder="Enter rejection reason..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedExpense(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleReject}>
                Reject Expense
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Proof Preview Dialog */}
        <Dialog open={!!selectedExpense && !!selectedExpense.proofUrl} onOpenChange={() => setSelectedExpense(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Expense Proof - {selectedExpense?.id}</DialogTitle>
              <DialogDescription>
                {selectedExpense?.userName} • {selectedExpense?.category} • ₹
                {selectedExpense?.amount.toLocaleString()}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="bg-muted rounded-lg p-8 text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Proof: {selectedExpense?.proofUrl}</p>
                <p className="text-xs text-muted-foreground mt-2">Mock proof preview</p>
              </div>
              {selectedExpense?.notes && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Notes:</p>
                  <p className="text-sm text-muted-foreground">{selectedExpense.notes}</p>
                </div>
              )}
            </div>
            {selectedExpense?.status === "pending" && (
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedExpense(null)}>
                  Close
                </Button>
                <Button variant="destructive" onClick={() => setRejectionReason("")}>
                  Reject
                </Button>
                <Button onClick={() => selectedExpense && handleApprove(selectedExpense)}>Approve</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
