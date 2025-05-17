
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  PieChart,
  Pie,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  Legend
} from "recharts";

// Sample data for analytics
const monthlyLeadData = [
  { month: "Jan", total: 45, converted: 18, archived: 5 },
  { month: "Feb", total: 52, converted: 22, archived: 8 },
  { month: "Mar", total: 60, converted: 25, archived: 7 },
  { month: "Apr", total: 68, converted: 30, archived: 10 },
  { month: "May", total: 75, converted: 35, archived: 12 },
  { month: "Jun", total: 82, converted: 40, archived: 8 },
];

const weeklyLeadData = [
  { day: "Mon", total: 12, converted: 5, archived: 2 },
  { day: "Tue", total: 18, converted: 7, archived: 3 },
  { day: "Wed", total: 15, converted: 6, archived: 1 },
  { day: "Thu", total: 20, converted: 8, archived: 2 },
  { day: "Fri", total: 25, converted: 10, archived: 4 },
  { day: "Sat", total: 10, converted: 4, archived: 1 },
  { day: "Sun", total: 8, converted: 3, archived: 1 },
];

const yearlyLeadData = [
  { year: "2022", total: 420, converted: 180, archived: 60 },
  { year: "2023", total: 580, converted: 232, archived: 85 },
  { year: "2024 (YTD)", total: 382, converted: 170, archived: 50 },
];

const serviceData = [
  { name: "Web Development", value: 40 },
  { name: "Mobile App Development", value: 25 },
  { name: "UI/UX Design", value: 15 },
  { name: "SEO Optimization", value: 12 },
  { name: "Digital Marketing", value: 8 },
];

const conversionRateData = [
  { month: "Jan", rate: 40 },
  { month: "Feb", rate: 42 },
  { month: "Mar", rate: 41 },
  { month: "Apr", rate: 44 },
  { month: "May", rate: 46 },
  { month: "Jun", rate: 48 },
];

const COLORS = ['#8b5cf6', '#ec4899', '#f97316', '#10b981', '#0ea5e9'];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <div className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleString()}</div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads YTD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">382</div>
            <p className="text-xs text-muted-foreground">+25% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">44.5%</div>
            <p className="text-xs text-muted-foreground">+3.2% from last quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.2 hrs</div>
            <p className="text-xs text-muted-foreground">-15% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="monthly">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Lead Performance</h2>
          <TabsList>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="weekly">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Lead Analysis</CardTitle>
              <CardDescription>
                View your lead generation and conversion rates for the current week
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={weeklyLeadData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" name="Total Leads" fill="#8b5cf6" />
                  <Bar dataKey="converted" name="Converted" fill="#10b981" />
                  <Bar dataKey="archived" name="Archived" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="monthly" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Lead Performance</CardTitle>
              <CardDescription>
                Six-month overview of lead generation and conversion rates
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={monthlyLeadData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" name="Total Leads" fill="#8b5cf6" />
                  <Bar dataKey="converted" name="Converted" fill="#10b981" />
                  <Bar dataKey="archived" name="Archived" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Conversion Rate Trend</CardTitle>
              <CardDescription>
                Six-month trend of lead conversion rates (%)
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={conversionRateData}>
                  <XAxis dataKey="month" />
                  <YAxis domain={[35, 50]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    name="Conversion Rate (%)" 
                    stroke="#8b5cf6" 
                    strokeWidth={2} 
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="yearly">
          <Card>
            <CardHeader>
              <CardTitle>Yearly Lead Performance</CardTitle>
              <CardDescription>
                Year-over-year comparison of lead generation and conversion
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={yearlyLeadData}>
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" name="Total Leads" fill="#8b5cf6" />
                  <Bar dataKey="converted" name="Converted" fill="#10b981" />
                  <Bar dataKey="archived" name="Archived" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Service Distribution</CardTitle>
            <CardDescription>
              Breakdown of leads by service interest
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Lead Source Analysis</CardTitle>
            <CardDescription>
              Where your leads are coming from
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Organic Search", value: 35 },
                      { name: "Direct Traffic", value: 25 },
                      { name: "Social Media", value: 20 },
                      { name: "Referrals", value: 15 },
                      { name: "Email", value: 5 },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>
            Key performance indicators for your lead generation efforts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Average Deal Size</h3>
              <div className="text-2xl font-bold">$8,750</div>
              <div className="text-xs text-green-600">+12% from last quarter</div>
              <p className="text-xs text-muted-foreground">Based on 42 converted leads this quarter</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Lead-to-Opportunity Ratio</h3>
              <div className="text-2xl font-bold">68%</div>
              <div className="text-xs text-green-600">+5% from last quarter</div>
              <p className="text-xs text-muted-foreground">Percentage of leads that become opportunities</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Opportunity-to-Win Ratio</h3>
              <div className="text-2xl font-bold">65%</div>
              <div className="text-xs text-green-600">+3% from last quarter</div>
              <p className="text-xs text-muted-foreground">Percentage of opportunities that convert to sales</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Customer Acquisition Cost</h3>
              <div className="text-2xl font-bold">$1,250</div>
              <div className="text-xs text-green-600">-8% from last quarter</div>
              <p className="text-xs text-muted-foreground">Average cost to acquire a new customer</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Average Sales Cycle</h3>
              <div className="text-2xl font-bold">32 days</div>
              <div className="text-xs text-green-600">-3 days from last quarter</div>
              <p className="text-xs text-muted-foreground">Average time from lead to conversion</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Customer Lifetime Value</h3>
              <div className="text-2xl font-bold">$42,500</div>
              <div className="text-xs text-green-600">+15% from last quarter</div>
              <p className="text-xs text-muted-foreground">Average revenue per customer over time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
