
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, Mail, Search, Trash2, Users } from "lucide-react";

// Mock subscriber data
interface Subscriber {
  id: number;
  email: string;
  joinDate: string;
  status: "active" | "unsubscribed";
}

const Newsletter = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isComposeDialogOpen, setIsComposeDialogOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Sample subscribers data
  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    {
      id: 1,
      email: "john.doe@example.com",
      joinDate: "2024-03-15",
      status: "active"
    },
    {
      id: 2,
      email: "jane.smith@example.com",
      joinDate: "2024-03-10",
      status: "active"
    },
    {
      id: 3,
      email: "robert@example.com",
      joinDate: "2024-03-05",
      status: "active"
    },
    {
      id: 4,
      email: "sarah@example.com",
      joinDate: "2024-02-28",
      status: "unsubscribed"
    },
    {
      id: 5,
      email: "michael@example.com",
      joinDate: "2024-02-25",
      status: "active"
    },
    {
      id: 6,
      email: "emily@example.com",
      joinDate: "2024-02-20",
      status: "active"
    },
    {
      id: 7,
      email: "david@example.com",
      joinDate: "2024-02-15",
      status: "active"
    },
    {
      id: 8,
      email: "lisa@example.com",
      joinDate: "2024-02-10",
      status: "unsubscribed"
    }
  ]);

  // Filter subscribers based on search query
  const filteredSubscribers = subscribers.filter(subscriber => 
    subscriber.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Count active subscribers
  const activeSubscribers = subscribers.filter(sub => sub.status === "active").length;

  // Handle sending newsletter email
  const handleSendNewsletter = () => {
    if (!emailSubject || !emailContent) {
      toast({
        title: "Error",
        description: "Please fill in both subject and content fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsComposeDialogOpen(false);
      setEmailSubject("");
      setEmailContent("");
      
      toast({
        title: "Newsletter sent",
        description: `Email sent to ${activeSubscribers} active subscribers`,
      });
    }, 2000);
  };

  // Handle removing a subscriber
  const handleRemoveSubscriber = (id: number) => {
    setSubscribers(subscribers.filter(sub => sub.id !== id));
    
    toast({
      title: "Subscriber removed",
      description: "Subscriber has been removed from the list",
    });
  };

  // Handle toggling subscriber status
  const handleToggleStatus = (id: number) => {
    setSubscribers(subscribers.map(sub => {
      if (sub.id === id) {
        return {
          ...sub,
          status: sub.status === "active" ? "unsubscribed" : "active"
        };
      }
      return sub;
    }));
    
    const subscriber = subscribers.find(sub => sub.id === id);
    const newStatus = subscriber?.status === "active" ? "unsubscribed" : "active";
    
    toast({
      title: "Status updated",
      description: `Subscriber marked as ${newStatus}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Newsletter Manager</h1>
        <Button onClick={() => setIsComposeDialogOpen(true)}>
          <Mail className="mr-2 h-4 w-4" /> Compose Newsletter
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscribers.length}</div>
            <p className="text-xs text-muted-foreground">Across all subscription statuses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSubscribers}</div>
            <p className="text-xs text-muted-foreground">{((activeSubscribers / subscribers.length) * 100).toFixed(1)}% of total subscribers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unsubscribed</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscribers.length - activeSubscribers}</div>
            <p className="text-xs text-muted-foreground">{(((subscribers.length - activeSubscribers) / subscribers.length) * 100).toFixed(1)}% of total subscribers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Signups</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">New subscribers in the last 30 days</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Subscribers</CardTitle>
              <CardDescription>Manage your newsletter subscribers</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search subscribers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscribers.map((subscriber) => (
                <TableRow key={subscriber.id}>
                  <TableCell className="font-medium">{subscriber.email}</TableCell>
                  <TableCell>{new Date(subscriber.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      subscriber.status === "active" 
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {subscriber.status === "active" ? "Active" : "Unsubscribed"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleStatus(subscriber.id)}
                      >
                        {subscriber.status === "active" ? "Unsubscribe" : "Reactivate"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500"
                        onClick={() => handleRemoveSubscriber(subscriber.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredSubscribers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No subscribers found. Try adjusting your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Compose Newsletter Dialog */}
      <Dialog open={isComposeDialogOpen} onOpenChange={setIsComposeDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Compose Newsletter</DialogTitle>
            <DialogDescription>
              Create and send a newsletter to all active subscribers
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">Email Subject</label>
              <Input
                id="subject"
                placeholder="Enter the email subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">Email Content</label>
              <Textarea
                id="content"
                placeholder="Enter the email content (supports HTML)"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                rows={10}
              />
            </div>
          </div>
          <DialogFooter>
            <div className="text-sm text-muted-foreground mr-auto">
              Will be sent to {activeSubscribers} active subscribers
            </div>
            <Button variant="outline" onClick={() => setIsComposeDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendNewsletter} disabled={isLoading}>
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Newsletter
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Newsletter;
