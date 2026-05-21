import { Users, GraduationCap, DollarSign, BookOpen, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', students: 4000, revenue: 2400 },
  { name: 'Feb', students: 3000, revenue: 1398 },
  { name: 'Mar', students: 2000, revenue: 9800 },
  { name: 'Apr', students: 2780, revenue: 3908 },
  { name: 'May', students: 1890, revenue: 4800 },
  { name: 'Jun', students: 2390, revenue: 3800 },
  { name: 'Jul', students: 3490, revenue: 4300 },
];

const StatCard = ({ title, value, icon: Icon, trend }: { title: string, value: string, icon: any, trend: string }) => (
  <Card className="border-border/50 bg-card/80 backdrop-blur-xl shadow-soft">
    <CardContent className="p-6">
      <div className="flex items-center justify-between space-y-0 pb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <h2 className="text-3xl font-bold">{value}</h2>
        <span className="text-sm font-medium text-emerald-500 flex items-center">
          <TrendingUp className="w-3 h-3 mr-1" />
          {trend}
        </span>
      </div>
    </CardContent>
  </Card>
);

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Super Admin Overview</h1>
        <p className="text-muted-foreground">Monitor your university's metrics and operations in real-time.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Students" value="12,450" icon={GraduationCap} trend="+12%" />
        <StatCard title="Active Faculty" value="842" icon={Users} trend="+2.5%" />
        <StatCard title="Total Revenue" value="$4.2M" icon={DollarSign} trend="+18%" />
        <StatCard title="Active Courses" value="324" icon={BookOpen} trend="+5%" />
      </div>

      <div className="grid gap-4 md:grid-cols-7 lg:grid-cols-7">
        <Card className="col-span-4 border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle>Enrollment & Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent className="pl-0">
            <div className="h-[300px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorStudents)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <span className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full bg-accent flex items-center justify-center font-bold text-xs text-muted-foreground">
                    USR
                  </span>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">New Student Registration</p>
                    <p className="text-sm text-muted-foreground">john.doe@student.edu</p>
                  </div>
                  <div className="ml-auto font-medium text-xs text-muted-foreground">Just now</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
