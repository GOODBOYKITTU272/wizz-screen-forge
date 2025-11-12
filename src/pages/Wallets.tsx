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
import { mockWallets, mockUsers } from "@/lib/mockData";
import { PlusCircle, TrendingUp, Wallet } from "lucide-react";
import { toast } from "sonner";

export default function Wallets() {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");

  const cxoUsers = mockUsers.filter((u) => u.role === "cxo");

  const handleAllocate = () => {
    if (!selectedUser || !amount || !purpose) {
      toast.error("Please fill all required fields");
      return;
    }

    const user = cxoUsers.find((u) => u.id === selectedUser);
    toast.success(`₹${parseInt(amount).toLocaleString()} allocated to ${user?.name} successfully!`);
    setOpen(false);
    setSelectedUser("");
    setAmount("");
    setPurpose("");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Wallet Management</h1>
            <p className="text-muted-foreground">Allocate and manage CXO wallet funds</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <PlusCircle className="w-4 h-4" />
                Allocate Funds
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Allocate Wallet Funds</DialogTitle>
                <DialogDescription>Add funds to a CXO wallet</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Select CXO</Label>
                  <Select value={selectedUser} onValueChange={setSelectedUser}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a CXO" />
                    </SelectTrigger>
                    <SelectContent>
                      {cxoUsers.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Amount (₹)</Label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Purpose/Notes</Label>
                  <Textarea
                    placeholder="Describe the purpose of allocation"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAllocate}>Allocate Funds</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Allocated</p>
                  <p className="text-2xl font-bold">
                    ₹{mockWallets.reduce((sum, w) => sum + w.allocated, 0).toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Balance</p>
                  <p className="text-2xl font-bold">
                    ₹{mockWallets.reduce((sum, w) => sum + w.balance, 0).toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-success/10 to-success/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover border-warning">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Proof Pending</p>
                  <p className="text-2xl font-bold text-warning">
                    ₹{mockWallets.reduce((sum, w) => sum + w.proofPending, 0).toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-warning/10 to-warning/20 rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Wallet Details Table */}
        <Card>
          <CardHeader>
            <CardTitle>Wallet Details</CardTitle>
            <CardDescription>Complete breakdown of all CXO wallets</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead className="text-right">Wallet Start</TableHead>
                  <TableHead className="text-right">Allocated</TableHead>
                  <TableHead className="text-right">Company Spent</TableHead>
                  <TableHead className="text-right">Reimbursed</TableHead>
                  <TableHead className="text-right">Wallet End</TableHead>
                  <TableHead className="text-right">Proof Pending</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockWallets.map((wallet) => (
                  <TableRow key={wallet.userId}>
                    <TableCell className="font-medium">{wallet.userName}</TableCell>
                    <TableCell className="text-right">₹{wallet.allocated.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₹{wallet.allocated.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₹{wallet.companySpent.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₹{wallet.reimbursed.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-bold text-primary">
                      ₹{wallet.balance.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-warning font-semibold">
                      ₹{wallet.proofPending.toLocaleString()}
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
