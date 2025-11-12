import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockUsers } from "@/lib/mockData";
import { UserPlus, Shield, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { UserRole } from "@/types";

export default function Admin() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("cxo");

  const handleAddUser = () => {
    if (!name || !email || !role) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!email.endsWith("@applywizz.com")) {
      toast.error("Email must be from @applywizz.com domain");
      return;
    }

    toast.success(`User ${name} added successfully with role: ${role.toUpperCase()}`);
    setOpen(false);
    setName("");
    setEmail("");
    setRole("cxo");
  };

  const handleResetPassword = (userName: string) => {
    toast.success(`Password reset link sent to ${userName}`);
  };

  const handleRemoveUser = (userName: string) => {
    toast.error(`User ${userName} removed from system`);
  };

  const getRoleBadge = (role: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      cfo: "default",
      ceo: "default",
      cxo: "secondary",
      admin: "outline",
    };
    return (
      <Badge variant={variants[role] || "secondary"} className="uppercase">
        {role}
      </Badge>
    );
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Role Management</h1>
            <p className="text-muted-foreground">Manage user roles and permissions</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="w-4 h-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Create a new user with assigned role</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input placeholder="Enter full name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    placeholder="user@applywizz.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Must be @applywizz.com domain</p>
                </div>

                <div className="space-y-2">
                  <Label>Role *</Label>
                  <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cfo">CFO</SelectItem>
                      <SelectItem value="ceo">CEO</SelectItem>
                      <SelectItem value="cxo">CXO</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser}>Add User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* User Management Table */}
        <Card>
          <CardHeader>
            <CardTitle>System Users</CardTitle>
            <CardDescription>All registered users and their roles</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">2 days ago</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-success border-success">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleResetPassword(user.name)}>
                          <Shield className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveUser(user.name)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Role Permissions Info */}
        <Card>
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
            <CardDescription>Overview of access levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <Badge className="mt-1">CFO</Badge>
                <div>
                  <p className="font-medium">Full Access</p>
                  <p className="text-sm text-muted-foreground">
                    Dashboard, Wallets, Approvals, Company Expenses, Reports, Audit Logs
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50 border">
                <Badge variant="default" className="mt-1">
                  CEO
                </Badge>
                <div>
                  <p className="font-medium">Read-Only Reports</p>
                  <p className="text-sm text-muted-foreground">Dashboard, Reports (View Only)</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50 border">
                <Badge variant="secondary" className="mt-1">
                  CXO
                </Badge>
                <div>
                  <p className="font-medium">Wallet Management</p>
                  <p className="text-sm text-muted-foreground">View Wallet, Submit Expenses, Track History</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-accent/5 border border-accent/20">
                <Badge variant="outline" className="mt-1">
                  ADMIN
                </Badge>
                <div>
                  <p className="font-medium">User Management</p>
                  <p className="text-sm text-muted-foreground">Role Assignment, User Creation, Permission Control</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
