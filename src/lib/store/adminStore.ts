import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface AdminState {
  isSidebarCollapsed: boolean;
  isMobileOpen: boolean;
  lastPageTitle: string;
  sidebarWidth: number;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setMobileOpen: (open: boolean) => void;
  setLastPageTitle: (title: string) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    immer((set, get) => ({
      isSidebarCollapsed: true,
      isMobileOpen: false,
      lastPageTitle: 'Dashboard',
      sidebarWidth: 72,
      
      setSidebarCollapsed: (collapsed) => 
        set((state) => {
          state.isSidebarCollapsed = collapsed;
          state.sidebarWidth = collapsed ? 72 : 260;
        }),
      
      toggleSidebar: () => {
        const { isSidebarCollapsed } = get();
        set((state) => {
          state.isSidebarCollapsed = !isSidebarCollapsed;
          state.sidebarWidth = !isSidebarCollapsed ? 72 : 260;
        });
      },
      
      setMobileOpen: (open) => set((state) => { state.isMobileOpen = open; }),
      setLastPageTitle: (title) => set((state) => { state.lastPageTitle = title; }),
    })),
    {
      name: 'admin-storage',
      partialize: (state) => ({
        lastPageTitle: state.lastPageTitle,
      }),
    }
  )
);