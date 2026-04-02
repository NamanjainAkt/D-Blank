import * as React from 'react';
import { AdminNavItem } from '@/components/admin/ui/AdminNavItem';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, BookOpen, GraduationCap, BarChart3 } from 'lucide-react';

interface SidebarNavProps {
  className?: string;
}

export function SidebarNav({ className }: SidebarNavProps) {
  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/students', label: 'Students', icon: Users },
    { href: '/admin/courses', label: 'Courses', icon: BookOpen },
    { href: '/admin/enrollments', label: 'Enrollments', icon: GraduationCap },
    { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <nav className={cn('flex-1 py-6 px-3 bg-black', className)} aria-label="Admin navigation">
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <AdminNavItem {...item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}