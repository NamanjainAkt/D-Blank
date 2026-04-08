import * as React from 'react';
import { AdminNavItem } from '@/components/admin/ui/AdminNavItem';
import { cn } from '@/lib/utils';
import { LayoutDashboard, BookOpen, GraduationCap, Gamepad2, UserCheck, Users, Tag } from 'lucide-react';

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

  const teamItems = [
    { href: '/admin/members', label: 'Members', icon: Users },
    { href: '/admin/coupons', label: 'Coupons', icon: Tag },
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
      <div className="mt-8 pt-4 border-t border-white/5">
        <ul className="space-y-1 mt-2">
          {teamItems.map((item) => (
            <li key={item.href}>
              <AdminNavItem {...item} />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
