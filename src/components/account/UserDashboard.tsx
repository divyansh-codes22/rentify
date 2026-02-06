import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  Package, 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail, 
  Wallet, 
  LogOut,
  MessageCircle,
  Edit,
  Save,
  X
} from "lucide-react";
import { useAuth, UserProfile } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

type TabType = "profile" | "orders" | "contact";

// Mock order data
const mockOrders = [
  { id: "ORD-001", item: "Sony Camera A7III", date: "2024-01-15", status: "Active", amount: 1500 },
  { id: "ORD-002", item: "Gaming Console PS5", date: "2024-01-10", status: "Returned", amount: 800 },
  { id: "ORD-003", item: "Bluetooth Speaker", date: "2024-01-05", status: "Returned", amount: 200 },
];

export function UserDashboard() {
  const { user, logout, updateProfile } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserProfile | null>(null);

  if (!user) return null;

  const handleEdit = () => {
    setEditForm({ ...user });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editForm) {
      updateProfile(editForm);
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    }
  };

  const handleCancel = () => {
    setEditForm(null);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  const tabs = [
    { id: "profile" as TabType, label: "Profile", icon: User },
    { id: "orders" as TabType, label: "My Orders", icon: Package },
    { id: "contact" as TabType, label: "Contact Us", icon: MessageCircle },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Welcome, {user.name.split(" ")[0]}!
        </h1>
        <Button variant="outline" onClick={handleLogout} className="gap-2">
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="h-fit">
          <CardContent className="p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                    activeTab === tab.id
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Content */}
        <div className="md:col-span-3">
          {activeTab === "profile" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Profile Details</CardTitle>
                {!isEditing ? (
                  <Button variant="outline" size="sm" onClick={handleEdit} className="gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCancel} className="gap-2">
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                    <Button variant="accent" size="sm" onClick={handleSave} className="gap-2">
                      <Save className="w-4 h-4" />
                      Save
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Balance Card */}
                <div className="bg-gradient-to-r from-accent to-accent/80 rounded-xl p-6 text-accent-foreground">
                  <div className="flex items-center gap-3 mb-2">
                    <Wallet className="w-6 h-6" />
                    <span className="text-sm font-medium opacity-90">Available Balance</span>
                  </div>
                  <p className="text-3xl font-bold">₹{user.balance.toLocaleString()}</p>
                </div>

                {/* Profile Fields */}
                <div className="grid gap-4">
                  <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
                    <User className="w-5 h-5 text-accent mt-0.5" />
                    <div className="flex-1">
                      <Label className="text-xs text-muted-foreground">Full Name</Label>
                      {isEditing ? (
                        <Input
                          value={editForm?.name || ""}
                          onChange={(e) => setEditForm(prev => prev ? { ...prev, name: e.target.value } : null)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="font-medium text-foreground">{user.name}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
                    <Mail className="w-5 h-5 text-accent mt-0.5" />
                    <div className="flex-1">
                      <Label className="text-xs text-muted-foreground">Email Address</Label>
                      {isEditing ? (
                        <Input
                          type="email"
                          value={editForm?.email || ""}
                          onChange={(e) => setEditForm(prev => prev ? { ...prev, email: e.target.value } : null)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="font-medium text-foreground">{user.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
                    <Phone className="w-5 h-5 text-accent mt-0.5" />
                    <div className="flex-1">
                      <Label className="text-xs text-muted-foreground">Phone Number</Label>
                      {isEditing ? (
                        <Input
                          type="tel"
                          value={editForm?.phone || ""}
                          onChange={(e) => setEditForm(prev => prev ? { ...prev, phone: e.target.value } : null)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="font-medium text-foreground">{user.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
                    <MapPin className="w-5 h-5 text-accent mt-0.5" />
                    <div className="flex-1">
                      <Label className="text-xs text-muted-foreground">House Address</Label>
                      {isEditing ? (
                        <Input
                          value={editForm?.address || ""}
                          onChange={(e) => setEditForm(prev => prev ? { ...prev, address: e.target.value } : null)}
                          placeholder="Enter your address"
                          className="mt-1"
                        />
                      ) : (
                        <p className="font-medium text-foreground">
                          {user.address || "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "orders" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {mockOrders.length > 0 ? (
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-foreground">{order.item}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.id} • {order.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">₹{order.amount}</p>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              order.status === "Active"
                                ? "bg-green-500/20 text-green-600"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No orders yet. Start renting to see your order history!
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "contact" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Have questions or need help? Reach out to us through any of these channels:
                </p>

                <div className="grid gap-4">
                  <a
                    href="mailto:support@rentify.com"
                    className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <Mail className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-medium text-foreground">Email Support</p>
                      <p className="text-sm text-muted-foreground">support@rentify.com</p>
                    </div>
                  </a>

                  <a
                    href="tel:+911800123456"
                    className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <Phone className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-medium text-foreground">Phone Support</p>
                      <p className="text-sm text-muted-foreground">1800-123-456 (Toll Free)</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
                    <CreditCard className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-medium text-foreground">Payment Issues</p>
                      <p className="text-sm text-muted-foreground">payments@rentify.com</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Our support team is available Monday to Saturday, 9 AM to 6 PM IST.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
}
