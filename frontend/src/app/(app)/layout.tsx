'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, CheckSquare, LogOut, Menu, X, PanelsTopLeft } from 'lucide-react';
import { LoadingSpinner } from '@/components/shared/shared.loadingSpinner';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.push('/login');
  }, [user, isLoading, router]);

  useEffect(() => {
    setIsMounted(true);
    if (window.innerWidth >= 1024) {
      setSidebarOpen(true);
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [pathname]);

  if (isLoading || !isMounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <LoadingSpinner label="Authenticating..." />
      </div>
    );
  }

  if (!user) return null;

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/tasks', label: 'Tasks', icon: CheckSquare },
  ];

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      {/* Overlay untuk Mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50 h-full bg-card border-r border-border flex flex-col 
          transition-all duration-300 ease-in-out shrink-0
          w-[260px] /* Lebar absolut yang konsisten */
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:-ml-[260px]'}
        `}
      >
        {/* Header Sidebar */}
        <div className="px-6 flex items-center justify-between h-16 border-b border-border shrink-0">
          <div className="flex items-center gap-2 text-primary">
            <PanelsTopLeft size={22} className="hidden lg:block" />
            <h1 className="text-lg font-bold tracking-tight text-foreground">TaskManager</h1>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="p-1.5 -mr-1.5 rounded-lg hover:bg-accent shrink-0 transition-colors lg:hidden">
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Navigasi Utama */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  active ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground hover:bg-accent hover:text-foreground font-medium'
                }`}
              >
                <Icon size={18} className={active ? 'text-primary' : ''} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Footer (Digabung agar lebih bersih) */}
        <div className="p-4 border-t border-border bg-muted/10 shrink-0">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="h-9 w-9 shrink-0 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm uppercase">{user.name?.charAt(0) || 'U'}</div>
            <div className="flex flex-col overflow-hidden">
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Signed in as</p>
              <p className="text-sm font-semibold truncate text-foreground">{user.name}</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-sm font-medium text-red-500 hover:bg-red-500/10 hover:text-red-600 transition-colors group">
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <header className="h-16 border-b border-border bg-card flex items-center px-4 sm:px-6 shrink-0 z-10">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 -ml-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors group">
            <Menu size={22} className="group-hover:scale-105 transition-transform" />
          </button>
          <div className="ml-3 flex items-center lg:hidden">
            <span className="font-semibold text-sm tracking-wide">TaskManager</span>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 bg-muted/20">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
