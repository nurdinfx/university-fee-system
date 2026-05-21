import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Users, BookOpen, GraduationCap, 
  Wallet, Library, Bus, Home, Settings, LogOut, Menu, Bell
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';

const SidebarItem = ({ icon: Icon, label, to, isActive }: { icon: any, label: string, to: string, isActive?: boolean }) => (
  <Link to={to} className={cn(
    "flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all",
    isActive ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
  )}>
    <Icon className="w-5 h-5" />
    <span className="font-medium">{label}</span>
  </Link>
);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? '280px' : '0px' }}
        className="flex-shrink-0 bg-card border-r border-border overflow-hidden z-20 flex flex-col"
      >
        <div className="h-16 flex items-center px-6 border-b border-border">
          <BookOpen className="w-8 h-8 text-primary mr-3" />
          <h1 className="text-xl font-bold tracking-tight whitespace-nowrap">UniERP</h1>
        </div>
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" isActive={location.pathname === '/dashboard'} />
          <SidebarItem icon={Users} label="Faculty & Staff" to="/dashboard/teachers" isActive={location.pathname.includes('/teachers')} />
          <SidebarItem icon={GraduationCap} label="Students" to="/dashboard/students" isActive={location.pathname.includes('/students')} />
          <SidebarItem icon={BookOpen} label="Courses & Depts" to="/dashboard/courses" />
          <SidebarItem icon={Wallet} label="Finance" to="/dashboard/finance" />
          <SidebarItem icon={Library} label="Library" to="/dashboard/library" />
          <SidebarItem icon={Home} label="Hostel" to="/dashboard/hostel" />
          <SidebarItem icon={Bus} label="Transport" to="/dashboard/transport" />
        </div>
        <div className="p-4 border-t border-border">
          <SidebarItem icon={Settings} label="Settings" to="/dashboard/settings" />
          <SidebarItem icon={LogOut} label="Logout" to="/login" />
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 z-10">
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md hover:bg-accent text-muted-foreground"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-accent text-muted-foreground relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-primary font-bold">
              SA
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
