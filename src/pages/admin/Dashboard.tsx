
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Users, CheckCircle, AlertTriangle, FileText, BarChart as BarChartIcon } from "lucide-react";

const Dashboard = () => {
  // Mock data for demonstration
  const leadData = [
    { month: "Jan", total: 12, converted: 4, priority: 6 },
    { month: "Feb", total: 18, converted: 6, priority: 8 },
    { month: "Mar", total: 25, converted: 10, priority: 12 },
    { month: "Apr", total: 20, converted: 8, priority: 7 },
    { month: "May", total: 28, converted: 12, priority: 9 },
    { month: "Jun", total: 32, converted: 15, priority: 14 },
  ];

  const weeklyData = [
    { day: "Mon", leads: 5 },
    { day: "Tue", leads: 7 },
    { day: "Wed", leads: 10 },
    { day: "Thu", leads: 8 },
    { day: "Fri", leads: 12 },
    { day: "Sat", leads: 6 },
    { day: "Sun", leads: 4 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleString()}</div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Converted Leads</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">58</div>
            <p className="text-xs text-muted-foreground">40.8% conversion rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Priority Leads</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">12 require follow-up</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">3 published this month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="monthly">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Lead Analytics</h2>
          <TabsList>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Lead Overview</CardTitle>
              <CardDescription>
                View and analyze your lead generation performance over the past 6 months.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={leadData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" name="Total Leads" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="converted" name="Converted" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="priority" name="Priority" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="weekly">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Lead Generation</CardTitle>
              <CardDescription>
                View your lead generation performance for the current week.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={weeklyData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="leads" stroke="#4f46e5" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>Your most recent lead submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">John Doe {i}</p>
                    <p className="text-xs text-muted-foreground">johndoe{i}@example.com • Web Development</p>
                  </div>
                  <div className="text-xs text-muted-foreground">{i} hour{i !== 1 ? 's' : ''} ago</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Reminders</CardTitle>
            <CardDescription>Lead follow-ups scheduled for this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full ${i % 2 === 0 ? 'bg-amber-100' : 'bg-indigo-100'} flex items-center justify-center`}>
                    <AlertTriangle className={`h-5 w-5 ${i % 2 === 0 ? 'text-amber-600' : 'text-indigo-600'}`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Follow up with Jane Smith {i}</p>
                    <p className="text-xs text-muted-foreground">Scheduled for {new Date(Date.now() + i * 86400000).toLocaleDateString()}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${i % 2 === 0 ? 'bg-amber-100 text-amber-800' : 'bg-indigo-100 text-indigo-800'}`}>
                    {i % 2 === 0 ? 'High Priority' : 'Medium Priority'}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
