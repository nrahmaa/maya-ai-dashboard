import { useEffect, useMemo, useState } from 'react';
import { Search, Bell, Plus } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { fetchStats, type DashboardStats } from '../lib/api';

export default function Header() {
  const location = useLocation();
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchStats();
        setStats(data);
      } catch {
        setStats(null);
      }
    }
    load();
  }, [location.pathname]);

  const getTitle = () => {
    if (location.pathname.startsWith('/dashboard')) return 'Maya AI Dashboard';
    if (location.pathname.startsWith('/issues/')) return 'Issue Details';
    if (location.pathname.startsWith('/issues')) return 'Issue List';
    if (location.pathname.startsWith('/map')) return 'Maya AI Map';
    if (location.pathname.startsWith('/analytics')) return 'Maya AI Analytics';
    return 'Maya AI';
  };

  const totalClusters = useMemo(() => {
    if (!stats) return null;
    return stats.open_issues + stats.in_progress_issues + stats.resolved_issues;
  }, [stats]);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-slate-900">{getTitle()}</h2>
        {location.pathname === '/issues' && totalClusters !== null && (
          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[11px] font-bold">
            {totalClusters} Total
          </span>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search issues, IDs, or locations..."
            className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 relative">
          <Bell size={20} />
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors">
          <Plus size={18} />
          New Report
        </button>
      </div>
    </header>
  );
}
