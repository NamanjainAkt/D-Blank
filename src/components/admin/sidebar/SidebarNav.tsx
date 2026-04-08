import * as React from 'react';
import { AdminNavItem } from '@/components/admin/ui/AdminNavItem';
import { cn } from '@/lib/utils';
import { LayoutDashboard, BookOpen, GraduationCap, Gamepad2, UserCheck } from 'lucide-react';

interface SidebarNavProps {
  className?: string;
}

export function SidebarNav({ className }: SidebarNavProps) {
  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/students', label: 'Students', icon: UserCheck },
    { href: '/admin/enrollments', label: 'Enrollments', icon: GraduationCap },
    { href: '/admin/courses', label: 'Courses', icon: BookOpen },
    { href: '/admin/games', label: 'Games', icon: Gamepad2 },
  ];

  return (
    <nav className={cn('flex-1 py-4 px-3', className)} aria-label="Admin navigation">
      <ul className="space-y-1">
        {navItems.map((item) => (
          <li key={item.href}>
            <AdminNavItem {...item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
